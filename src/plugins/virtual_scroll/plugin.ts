/**
 * Plugin: "virtual_scroll" (Tom Select)
 * Copyright (c) contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import type TomSelect from '../../tom-select.ts';
import { TomOption } from '../../types/index.ts';
import { addClasses, removeClasses } from '../../vanilla.ts';

export default function(this:TomSelect) {
	const self							= this;
	const orig_canLoad					= self.canLoad;
	const orig_clearActiveOption		= self.clearActiveOption;
	const orig_loadCallback				= self.loadCallback;
	const orig_load						= self.load;

	var pagination:{[key:string]:any}	= {};
	var dropdown_content:HTMLElement;
	var loading_more					= false;
	var load_more_opt:HTMLElement;
	var default_values: string[]		= [];
	var default_values_loaded			= false;
	var default_pagination:any;
	var default_options: TomOption[]	= [];
	var html_values: string[]			= [];
	var preload_requested				= false;

	if( !self.settings.shouldLoadMore ){

		// return true if additional results should be loaded
		self.settings.shouldLoadMore = ():boolean=>{

			const scroll_percent = dropdown_content.clientHeight / (dropdown_content.scrollHeight - dropdown_content.scrollTop);
			if( scroll_percent > 0.9 ){
				return true;
			}

			if( self.activeOption ){
				var selectable	= self.selectable();
				var index		= Array.from(selectable).indexOf(self.activeOption);
				if( index >= (selectable.length-2) ){
					return true;
				}
			}

			return false;
		}
	}


	if( !self.settings.firstUrl ){
		throw 'virtual_scroll plugin requires a firstUrl() method';
	}


	// in order for virtual scrolling to work,
	// options need to be ordered the same way they're returned from the remote data source
	self.settings.sortField			= [{field:'$order'},{field:'$score'}];


	// can we load more results for given query?
	const canLoadMore = (query:string):boolean => {

		if( self.settings.maxOptions !== null
			&& typeof self.settings.maxOptions === 'number'
			&& dropdown_content.children.length >= self.settings.maxOptions
		){
			return false;
		}

		if( (query in pagination) && pagination[query] ){
			return true;
		}

		return false;
	};

	const clearFilter = (option:TomOption, value:string):boolean => {
		if( self.items.indexOf(value) >= 0 || default_values.indexOf(value) >= 0 ){
			return true;
		}
		return false;
	};


	// set the next url that will be
	self.setNextUrl = (value:string,next_url:any):void => {
		pagination[value] = next_url;
	};

	// getUrl() to be used in settings.load()
	self.getUrl = (query:string):any =>{

		if( query in pagination ){
			const next_url = pagination[query];
			pagination[query] = false;
			return next_url;
		}

		// if the user goes back to a previous query
		// we need to load the first page again
		self.clearPagination();

		return self.settings.firstUrl.call(self,query);
	};

	// clear pagination
	self.clearPagination = ():void =>{
		pagination = {};
	};

	// don't clear the active option (and cause unwanted dropdown scroll)
	// while loading more results
	self.hook('instead','clearActiveOption',()=>{

		if( loading_more ){
			return;
		}

		return orig_clearActiveOption.call(self);
	});

	// override the canLoad method
	self.hook('instead','canLoad',(query:string)=>{

		// first time the query has been seen
		if( !(query in pagination) ){
			return orig_canLoad.call(self,query);
		}

		return canLoadMore(query);
	});


	// handle a load() response, knowing which query the request was originally issued for
	const loadCallbackForQuery = ( query:string, was_loading_more:boolean, options:TomOption[], optgroups:TomOption[] ):void => {

		loading_more = was_loading_more;

		// The response belongs to a query the user has since changed, so applying it would
		// overwrite the options displayed for the active query. Discard it, performing only the
		// loading bookkeeping loadCallback() would otherwise do. Reset the stored pagination for
		// the abandoned query - the load function may have already advanced it past pages that
		// were never applied - so a later request for the same query starts from the first page.
		if( query !== self.lastValue ){
			self.loading = Math.max(self.loading - 1, 0);
			if( !self.loading ){
				removeClasses(self.wrapper,self.settings.loadingClass);
			}
			pagination[query] = self.settings.firstUrl.call(self,query);

			// if the discarded response was the preload, allow preload() to run again
			if( query === '' && !default_values_loaded ){
				self.wrapper.classList.remove('preloaded');
			}

			loading_more = false;
			return;
		}

		if( !loading_more ){
			// When searching (non-empty query), keep selected items and HTML default options,
			// but remove preloaded remote options so they don't bleed into search results.
			// For empty query, use clearFilter (keeps default_values + items).
			const activeFilter = query !== ''
				? (_option: TomOption, value: string) => self.items.indexOf(value) >= 0 || html_values.indexOf(value) >= 0
				: clearFilter;
			self.clearOptions(activeFilter);
		}else if( load_more_opt ){
			const first_option = options[0];
			if( first_option !== undefined ){
				load_more_opt.dataset.value		= first_option[self.settings.valueField];
			}
		}

		orig_loadCallback.call( self, options, optgroups);

		// After the initial preload (empty query), snapshot default_values and option objects
		// so they can be restored when the user clears their search.
		if( !loading_more && !default_values_loaded && query === '' ){
			default_values_loaded = true;
			default_values = Object.keys(self.options);
			default_pagination = pagination[''];
			default_options = Object.values(self.options);
		}

		loading_more = false;
	};

	// bind the query (and whether this request is loading more results) into the callback of
	// each load() request - loadCallback() alone cannot tell which request a response answers
	self.hook('instead','load',(query:string)=>{
		const was_loading_more	= loading_more;
		const outer_callback	= self.loadCallback;
		self.loadCallback = ( options:TomOption[], optgroups:TomOption[] ):void => {
			loadCallbackForQuery( query, was_loading_more, options, optgroups );
		};
		try{
			return orig_load.call( self, query );
		}finally{
			self.loadCallback = outer_callback;
		}
	});

	// fallback for loadCallback() invoked directly rather than through a load() request
	self.hook('instead','loadCallback',( options:TomOption[], optgroups:TomOption[])=>{
		loadCallbackForQuery( self.lastValue, loading_more, options, optgroups );
	});

	// track that a preload was requested, so recovery from a discarded preload response
	// doesn't issue empty-query requests when preloading was never enabled
	self.hook('before','preload',()=>{
		preload_requested = true;
	});


	// as the “loading_more” element will be removed from the dropdown,
	// we activate the previous option if needed
	// to avoid the dropdown being scrolled back to the first one
	self.hook('before','refreshOptions',()=>{

		if (self.activeOption && "option" !== self.activeOption.getAttribute("role")) {
			self.setActiveOption(self.activeOption.previousElementSibling as HTMLElement);
		}

	});


	// add templates to dropdown
	//	loading_more if we have another url in the queue
	//	no_more_results if we don't have another url in the queue
	self.hook('after','refreshOptions',()=>{

		const query		= self.lastValue;
		var option;

		if( canLoadMore(query) ){

			option = self.render('loading_more',{query:query});
			if( option ){
				option.setAttribute('data-selectable',''); // so that navigating dropdown with [down] keypresses can navigate to this node
				load_more_opt = option;
			}

		}else if( (query in pagination) && !dropdown_content.querySelector('.no-results') ){
			option = self.render('no_more_results',{query:query});
		}

		if( option ){
			addClasses(option,self.settings.optionClass);
			dropdown_content.append( option );
		}

	});


	// Restore preloaded options and pagination when clearing search
	const restoreDefaults = ():void => {
		if( !default_values_loaded ) {
			// There is nothing to restore. If a preload was requested but its response was
			// discarded as stale (which removes the 'preloaded' class), request it again so the
			// first page is fetched; if a preload is still in flight, or was never requested at
			// all, do nothing - clearing the search must not issue requests of its own.
			if( preload_requested && !self.wrapper.classList.contains('preloaded') && self.isFocused ){
				self.preload();
			}
			return;
		}
		// Re-add preloaded option objects (clearOptions can only remove, not restore)
		self.addOptions(default_options);
		// Remove any search results that are not part of the preloaded defaults
		self.clearOptions(clearFilter);
		if( default_pagination ) {
			pagination[''] = default_pagination;
		}
	};

	self.on('type',(query:string) => {
		if( query === '' ){
			restoreDefaults();
			self.refreshOptions(false);
		}
	});

	self.on('dropdown_close', restoreDefaults);

	// add scroll listener and default templates
	self.on('initialize',()=>{
		html_values = Object.keys(self.options);
		default_values = Object.keys(self.options);
		dropdown_content = self.dropdown_content;

		// default templates
		self.settings.render = Object.assign({}, {
			loading_more:() => {
				return `<div class="loading-more-results">Loading more results ... </div>`;
			},
			no_more_results:() =>{
				return `<div class="no-more-results">No more results</div>`;
			}
		},self.settings.render);


		// watch dropdown content scroll position
		dropdown_content.addEventListener('scroll',()=>{

			if( !self.settings.shouldLoadMore.call(self) ){
				return;
			}

			// !important: this will get checked again in load() but we still need to check here otherwise loading_more will be set to true
			if( !canLoadMore(self.lastValue) ){
				return;
			}

			// don't call load() too much
			if( loading_more ) return;


			loading_more = true;
			self.load.call(self,self.lastValue);
		});
	});

};
