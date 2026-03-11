/**
 * Plugin: "local_virtual_scroll" (Tom Select)
 * Copyright (c) contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Virtual scroll for locally-loaded (non-AJAX) datasets.
 * Maintains a sliding DOM window of pageSize * 3 items maximum.
 * Supports optGroups via a flat list with interleaved headers.
 *
 * When the search query matches an optGroup label, all children of that
 * group are included in the results — even if the individual options don't
 * match the query text.
 */

import type TomSelect from '../../tom-select.ts';
import type { LVSOptions, FlatItem } from './types.ts';
import { highlight, removeHighlight } from '../../contrib/highlight.ts';

export default function (this: TomSelect, userOptions: LVSOptions) {
	const self = this;
	const page_size = userOptions?.pageSize ?? 50;
	const max_dom = userOptions?.maxDomItems ?? page_size * 3;
	const threshold = userOptions?.scrollThreshold ?? 0.9;

	let dropdown_content: HTMLElement;
	let flat_list: FlatItem[] = [];
	let visible_start = 0;
	let visible_end = 0;
	let is_loading = false;
	let sentinel: HTMLElement | null = null;

	// RAF handle + flag to skip the scroll event caused by our own scrollTop writes
	let raf_id: number | null = null;
	let skip_programmatic = false;

	// Plugin controls maxOptions (first page only; we manage the rest)
	self.settings.maxOptions = page_size;

	// ─── Build flat list: Sifter results + optgroup headers interleaved ───
	//
	// When the query matches an optGroup label, ALL options from that group
	// are included regardless of whether the individual option text matches.

	const buildFlatList = (): FlatItem[] => {
		const flat: FlatItem[] = [];
		const results = self.search(self.lastValue);
		const og_field = self.settings.optgroupField;
		const og_label_field =
			(self.settings as any).optgroupLabelField || 'label';
		const query = (self.lastValue || '').trim().toLowerCase();

		// Helper: extract first optgroup value from an option
		const getOg = (option: any): string => {
			let og = option[og_field] || '';
			if (Array.isArray(og)) og = og[0] ?? '';
			return String(og);
		};

		// Find optgroups whose label matches the query
		const matching_og_labels = new Set<string>();
		if (query) {
			for (const key of Object.keys(self.optgroups)) {
				const label = String(
					(self.optgroups[key] as any)[og_label_field] || '',
				).toLowerCase();
				if (label.includes(query)) matching_og_labels.add(key);
			}
		}

		// Build ordered groups + their item sets from Sifter results
		const group_order: string[] = [];
		const group_items = new Map<string, Set<string>>();

		for (const item of results.items) {
			const option = self.options[item.id];
			if (!option) continue;
			const og = getOg(option);
			if (!group_items.has(og)) {
				group_items.set(og, new Set());
				group_order.push(og);
			}
			group_items.get(og)!.add(String(item.id));
		}

		// Ensure matching optgroups appear in group_order (even with no Sifter hits)
		for (const og of matching_og_labels) {
			if (!group_items.has(og)) {
				group_items.set(og, new Set());
				group_order.push(og);
			}
		}

		// Expand matching optgroups: add ALL their options (Set deduplicates)
		if (matching_og_labels.size > 0) {
			for (const id of Object.keys(self.options)) {
				const option = self.options[id];
				const og = getOg(option);
				if (matching_og_labels.has(og)) {
					group_items.get(og)!.add(id);
				}
			}
		}

		// Emit flat list in group order
		for (const og of group_order) {
			const ids = group_items.get(og)!;
			if (ids.size === 0) continue;
			if (og && self.optgroups[og]) {
				flat.push({ type: 'header', optgroup: og });
			}
			for (const id of ids) {
				flat.push({ type: 'option', id, optgroup: og });
			}
		}

		return flat;
	};

	// ─── Render a single flat item to its DOM element ─────────────────────

	const renderFlatItem = (item: FlatItem): HTMLElement | null => {
		if (item.type === 'header') {
			if (!item.el) {
				item.el = self.render(
					'optgroup_header',
					self.optgroups[item.optgroup],
				) as HTMLElement;
			}
			return item.el ?? null;
		}
		return self.getOption(item.id, true) as HTMLElement;
	};

	// ─── Re-apply search highlights to an element ─────────────────────────

	const applyHighlights = (el: HTMLElement) => {
		if (!self.settings.highlight) return;
		removeHighlight(el);
		const results = self.currentResults;
		if (results && results.query.length && results.tokens.length) {
			for (const tok of results.tokens) {
				if (tok.regex) highlight(el, tok.regex);
			}
		}
	};

	// ─── Helpers ─────────────────────────────────────────────────────────

	const measureHeight = (elements: HTMLElement[]): number =>
		elements.reduce((h, el) => h + (el.offsetHeight ?? 0), 0);

	const updateSentinel = () => {
		// dropdown_content is set only after 'initialize' fires;
		// refreshOptions runs during construction before that — skip silently.
		if (!dropdown_content) return;
		if (sentinel) {
			sentinel.remove();
			sentinel = null;
		}
		if (visible_end < flat_list.length) {
			sentinel = self.render('loading_more', {}) as HTMLElement;
			if (sentinel) dropdown_content.append(sentinel);
		}
	};

	const renderRange = (from: number, to: number): HTMLElement[] => {
		const els: HTMLElement[] = [];
		for (let i = from; i < to; i++) {
			const item = flat_list[i];
			if (!item) continue;
			const el = renderFlatItem(item);
			if (el) els.push(el);
		}
		return els;
	};

	/** Write scrollTop without triggering our own scroll handler logic */
	const setScrollTop = (value: number) => {
		skip_programmatic = true;
		dropdown_content.scrollTop = value;
	};

	// ─── Load N pages forward (scroll down) ──────────────────────────────

	const loadNext = (pages: number) => {
		if (is_loading || visible_end >= flat_list.length) return;
		is_loading = true;
		if (sentinel) {
			sentinel.remove();
			sentinel = null;
		}

		const from = visible_end;
		const to = Math.min(flat_list.length, visible_end + page_size * pages);
		const new_els = renderRange(from, to);
		for (const el of new_els) dropdown_content.append(el);
		for (const el of new_els) applyHighlights(el);
		visible_end = to;

		// Recycle items from top to stay within max_dom
		const dom_count = visible_end - visible_start;
		if (dom_count > max_dom) {
			const n = dom_count - max_dom;
			const remove_els = renderRange(visible_start, visible_start + n);
			const removed_h = measureHeight(remove_els);
			for (const el of remove_els) el.remove();
			visible_start += n;
			setScrollTop(dropdown_content.scrollTop + removed_h);
		}

		is_loading = false;
		updateSentinel();
	};

	// ─── Load N pages backward (scroll up) ───────────────────────────────

	const loadPrev = (pages: number) => {
		if (is_loading || visible_start <= 0) return;
		is_loading = true;

		const from = Math.max(0, visible_start - page_size * pages);
		const to = visible_start;
		const new_els = renderRange(from, to);

		// Prepend before current first child
		const first_child = dropdown_content.firstChild;
		for (const el of new_els)
			dropdown_content.insertBefore(el, first_child);
		for (const el of new_els) applyHighlights(el);

		// Compensate scrollTop so existing content stays in place
		setScrollTop(dropdown_content.scrollTop + measureHeight(new_els));
		visible_start = from;

		// Recycle items from bottom to stay within max_dom
		const dom_count = visible_end - visible_start;
		if (dom_count > max_dom) {
			const n = dom_count - max_dom;
			const remove_els = renderRange(visible_end - n, visible_end);
			for (const el of remove_els) el.remove();
			visible_end -= n;
		}

		is_loading = false;
		updateSentinel();
	};

	// ─── Scroll handler with RAF debounce ─────────────────────────────────

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = dropdown_content;
		const pct_bottom = (scrollTop + clientHeight) / scrollHeight;
		const pct_top = scrollTop / scrollHeight;

		// Always load exactly 1 page per RAF frame.
		// The RAF debounce already coalesces rapid scroll events, so there is no
		// need to load multiple pages at once — that only causes long DOM operations.
		if (pct_bottom >= threshold) {
			loadNext(1);
		} else if (pct_top <= 1 - threshold) {
			loadPrev(1);
		}
	};

	// ─── Reset virtual state on each refreshOptions ───────────────────────

	self.hook('before', 'refreshOptions', () => {
		self.settings.maxOptions = page_size;
	});

	self.hook('after', 'refreshOptions', () => {
		flat_list = buildFlatList();
		visible_start = 0;
		visible_end = Math.min(flat_list.length, page_size);
		is_loading = false;
		if (raf_id !== null) {
			cancelAnimationFrame(raf_id);
			raf_id = null;
		}

		// Re-render first page from flat_list to keep DOM in sync.
		// refreshOptions may render items in optgroup wrappers or a different
		// order than our flat list; clearing and re-rendering ensures consistency.
		if (dropdown_content && flat_list.length > 0) {
			dropdown_content.innerHTML = '';
			const first_page = renderRange(0, visible_end);
			for (const el of first_page) dropdown_content.append(el);
			// Re-apply highlights: the core applied them before we cleared the DOM,
			// and items from optgroup expansion never went through the core highlight pass.
			applyHighlights(dropdown_content);
		}

		updateSentinel();
	});

	// ─── Initialize: set templates and attach scroll listener ────────────

	self.on('initialize', () => {
		dropdown_content = self.dropdown_content;
		// Disable overflow-anchor so the browser doesn't auto-compensate scrollTop
		// when we insert/remove items — we handle the compensation manually.
		(dropdown_content.style as any)['overflow-anchor'] = 'none';

		self.settings.render = Object.assign(
			{},
			{
				loading_more: () =>
					'<div class="loading-more-results">Carregando mais resultados...</div>',
			},
			self.settings.render,
		);

		dropdown_content.addEventListener('scroll', () => {
			if (skip_programmatic) {
				skip_programmatic = false;
				return;
			}
			if (raf_id !== null) cancelAnimationFrame(raf_id);
			raf_id = requestAnimationFrame(() => {
				raf_id = null;
				handleScroll();
			});
		});
	});
}
