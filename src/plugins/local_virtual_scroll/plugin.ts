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
 * Scroll handling uses requestAnimationFrame debounce + multi-page math:
 *   fast scroll → more pages loaded at once → no cascade of jumps.
 */

import type TomSelect from '../../tom-select.ts';
import type { LVSOptions, FlatItem } from './types.ts';

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

	// ─── Debug helper ────────────────────────────────────────────────────
	const dbg = (...args: any[]) =>
		console.log(`[LVS ${performance.now().toFixed(1)}ms]`, ...args);
	dbg('plugin init — pageSize:', page_size, 'maxDom:', max_dom, 'threshold:', threshold);

	// Plugin controls maxOptions (first page only; we manage the rest)
	self.settings.maxOptions = page_size;

	// ─── Build flat list: Sifter results + optgroup headers interleaved ───

	const buildFlatList = (): FlatItem[] => {
		const flat: FlatItem[] = [];
		const results = self.search(self.lastValue);
		let current_group: string | null = null;

		for (const item of results.items) {
			const option = self.options[item.id];
			if (!option) continue;

			// Use first optgroup when multiple are assigned
			let og_val: string = option[self.settings.optgroupField] || '';
			if (Array.isArray(og_val)) og_val = og_val[0] ?? '';
			og_val = String(og_val);

			if (og_val !== current_group && og_val && self.optgroups[og_val]) {
				flat.push({ type: 'header', optgroup: og_val });
				current_group = og_val;
			}
			flat.push({
				type: 'option',
				id: String(item.id),
				optgroup: og_val,
			});
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
	//
	// pages > 1 when the user scrolled fast and we need to catch up at once.

	const loadNext = (pages: number) => {
		if (is_loading || visible_end >= flat_list.length) {
			dbg('loadNext SKIP — is_loading:', is_loading, 'visible_end:', visible_end, 'flat:', flat_list.length);
			return;
		}
		dbg('loadNext START — pages:', pages, 'visible:', visible_start, '->', visible_end, 'flat:', flat_list.length);
		is_loading = true;
		if (sentinel) {
			sentinel.remove();
			sentinel = null;
		}

		const from = visible_end;
		const to = Math.min(flat_list.length, visible_end + page_size * pages);
		const new_els = renderRange(from, to);
		for (const el of new_els) dropdown_content.append(el);
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
		dbg('loadNext DONE — visible:', visible_start, '->', visible_end);
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

	// ─── Scroll handler with RAF debounce + multi-page math ───────────────
	//
	// All scroll events within the same animation frame are coalesced into
	// one call.  We estimate how far past the window the user scrolled and
	// load that many pages at once, so a fast scroll produces a single
	// large jump rather than many small ones.

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = dropdown_content;
		const pct_bottom = (scrollTop + clientHeight) / scrollHeight;
		const pct_top = scrollTop / scrollHeight;
		dbg('handleScroll — pct_bottom:', pct_bottom.toFixed(3), 'pct_top:', pct_top.toFixed(3), 'threshold:', threshold);

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
		if (raf_id !== null) { cancelAnimationFrame(raf_id); raf_id = null; }
		dbg('after:refreshOptions — flat_list:', flat_list.length, 'dc defined:', !!dropdown_content);
		updateSentinel();
	});

	// ─── Initialize: set templates and attach scroll listener ────────────

	self.on('initialize', () => {
		dropdown_content = self.dropdown_content;
		// Disable overflow-anchor so the browser doesn't auto-compensate scrollTop
		// when we insert/remove items — we handle the compensation manually.
		(dropdown_content.style as any)['overflow-anchor'] = 'none';
		dbg('initialize — dropdown_content:', !!dropdown_content);

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
				dbg('scroll — skipping programmatic');
				skip_programmatic = false;
				return;
			}
			const { scrollTop, scrollHeight, clientHeight } = dropdown_content;
			dbg('scroll — raw: scrollTop', scrollTop.toFixed(0), 'pct_bottom', ((scrollTop + clientHeight) / scrollHeight).toFixed(3));
			if (raf_id !== null) cancelAnimationFrame(raf_id);
			raf_id = requestAnimationFrame(() => {
				raf_id = null;
				dbg('RAF fired');
				handleScroll();
			});
		});
	});
}
