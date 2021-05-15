
import MicroEvent from './contrib/microevent.js';
import MicroPlugin from './contrib/microplugin.js';
import Sifter from '@orchidjs/sifter/dist/esm/sifter.js';
import { escape_regex } from '@orchidjs/sifter/dist/esm/utils.js';
import { TomSettings } from './types/settings';
import { TomInput, TomArgObject, TomOption, TomOptions, TomCreateFilter, TomCreateCallback } from './types/index';
import {highlight, removeHighlight} from './contrib/highlight.js';
import * as constants from './constants.js';
import getSettings from './getSettings.js';
import {
	hash_key,
	escape_html,
	debounce_events,
	getSelection,
	preventDefault,
	addEvent,
	loadDebounce,
	isKeyDown,
	getId,
	addSlashes
} from './utils';

import {
	getDom,
	escapeQuery,
	triggerEvent,
	applyCSS,
	addClasses,
	removeClasses,
	parentMatch,
	getTail,
	isEmptyObject,
	nodeIndex,
	setAttr
} from './vanilla';

var instance_i = 0;

export default class TomSelect extends MicroPlugin(MicroEvent){

	public control_input			: HTMLInputElement;
	public wrapper					: HTMLElement;
	public dropdown					: HTMLElement;
	public control					: HTMLElement;
	public dropdown_content			: HTMLElement;

	public order					: number = 0;
	public settings					: TomSettings;
	public input					: TomInput;
	public tabIndex					: number;
	public is_select_tag			: boolean;
	public rtl						: boolean;
	private inputId					: string;

	private _destroy				: () => void;
	public sifter					: Sifter;


	public tab_key					: boolean = false;
	public isOpen					: boolean = false;
	public isDisabled				: boolean = false;
	public isRequired				: boolean;
	public isInvalid				: boolean = false;
	public isLocked					: boolean = false;
	public isFocused				: boolean = false;
	public isInputHidden			: boolean = false;
	public isSetup					: boolean = false;
	public ignoreFocus				: boolean = false;
	public hasOptions				: boolean = false;
	public currentResults			: ReturnType<Sifter['search']> = null;
	public lastValue				: string = '';
	public caretPos					: number = 0;
	public loading					: number = 0;
	public loadedSearches			: { [key: string]: boolean } = {};

	public activeOption				: HTMLElement = null;
	public activeItems				: HTMLElement[] = [];

	public optgroups				: TomOptions = {};
	public options					: TomOptions = {};
	public userOptions				: {[key:string]:boolean} = {};
	public items					: string[] = [];
	public renderCache				: {'item':{[key:string]:HTMLElement},'option':{[key:string]:HTMLElement}} = {'item':{},'option':{}};



	constructor( input_arg: string|TomInput, settings:TomSettings ){
		super();

		instance_i++;

		var dir;
		var input				= getDom( input_arg ) as TomInput;

		if( input.tomselect ){
			throw new Error('Tom Select already initialized on this element');
		}


		input.tomselect			= this;


		// detect rtl environment
		var computedStyle		= window.getComputedStyle && window.getComputedStyle(input, null);
		dir						= computedStyle.getPropertyValue('direction');

		// setup default state
		this.settings			= getSettings( input, settings );
		this.input				= input;
		this.tabIndex			= input.tabIndex || 0;
		this.is_select_tag		= input.tagName.toLowerCase() === 'select';
		this.rtl				= /rtl/i.test(dir);
		this.inputId			= getId(input, 'tomselect-'+instance_i);
		this.isRequired			= input.required;


		// search system
		this.sifter = new Sifter(this.options, {diacritics: this.settings.diacritics});

		this.setupOptions(this.settings.options,this.settings.optgroups);
		delete this.settings.optgroups;
		delete this.settings.options;


		// option-dependent defaults
		this.settings.mode = this.settings.mode || (this.settings.maxItems === 1 ? 'single' : 'multi');
		if (typeof this.settings.hideSelected !== 'boolean') {
			this.settings.hideSelected = this.settings.mode === 'multi';
		}

		if( typeof this.settings.hidePlaceholder !== 'boolean' ){
			this.settings.hidePlaceholder = this.settings.mode !== 'multi';
		}

		// set up createFilter callback
		var filter = this.settings.createFilter;
		if( typeof filter !== 'function' ){

			if( typeof filter === 'string' ){
				filter = new RegExp(filter);
			}

			if( filter instanceof RegExp ){
				this.settings.createFilter = (input) => (filter as RegExp).test(input);
			}else{
				this.settings.createFilter = () => true;
			}
		}


		this.initializePlugins(this.settings.plugins);
		this.setupCallbacks();
		this.setupTemplates();
		this.setup();
	}


	// methods
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


	/**
	 * Creates all elements and sets up event bindings.
	 *
	 */
	setup(){


		var self = this;
		var settings:TomSettings = self.settings;
		var wrapper: HTMLElement;
		var control: HTMLElement;
		var control_input: HTMLInputElement;
		var dropdown: HTMLElement;
		var dropdown_content: HTMLElement;
		var inputMode: string;
		var classes;
		var classes_plugins;
		var input					= self.input;
		var control_id: string;
		const passive_event			= { passive: true };
		const listboxId: string		= self.inputId +'-ts-dropdown';



		inputMode			= self.settings.mode;
		classes				= input.getAttribute('class') || '';

		wrapper				= getDom('<div>');
		addClasses( wrapper, settings.wrapperClass, classes, inputMode);


		control				= getDom('<div class="items">');
		addClasses(control,settings.inputClass);
		wrapper.append(control);


		dropdown			= self.render('dropdown');
		addClasses(dropdown, settings.dropdownClass, inputMode);

		dropdown_content	= getDom(`<div role="listbox" id="${listboxId}" tabindex="-1">`);
		addClasses(dropdown_content, settings.dropdownContentClass);
		dropdown.append(dropdown_content);

		getDom( settings.dropdownParent || wrapper ).appendChild( dropdown );

		if( settings.controlInput ){
			control_input		= getDom( settings.controlInput ) as HTMLInputElement;
		}else{
			control_input		= getDom('<input type="text" autocomplete="off" size="1" />' ) as HTMLInputElement;

			// set attributes
			var attrs = ['autocorrect','autocapitalize','autocomplete'];
			for( const attr of attrs ){
				if( input.getAttribute(attr) ){
					setAttr(control_input,{[attr]:input.getAttribute(attr)});
				}
			}
		}

		if( !settings.controlInput ){
			control_input.tabIndex = input.disabled ? -1 : self.tabIndex;
			control.appendChild( control_input );
		}


		setAttr(control_input,{
			role:'combobox',
			haspopup:'listbox',
			'aria-expanded':'false',
			'aria-controls':listboxId
		});

		control_id = getId(control_input,self.inputId + '-tomselected');

		let query = "label[for='"+escapeQuery(self.inputId)+"']";
		let label = document.querySelector(query);
		if( label ){
			setAttr(label,{for:control_id});
			let label_id = getId(label,self.inputId+'-ts-label');
			setAttr(dropdown_content,{'aria-labelledby':label_id});
		}


		if(self.settings.copyClassesToDropdown) {
			addClasses( dropdown, classes);
		}

		wrapper.style.width = input.style.width;

		if (self.plugins.names.length) {
			classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
			addClasses( [wrapper,dropdown], classes_plugins);
		}

		if ((settings.maxItems === null || settings.maxItems > 1) && self.is_select_tag ){
			setAttr(input,{multiple:'multiple'});
		}

		if (self.settings.placeholder) {
			setAttr(control_input,{placeholder:settings.placeholder});
		}

		// if splitOn was not passed in, construct it from the delimiter to allow pasting universally
		if (!self.settings.splitOn && self.settings.delimiter) {
			self.settings.splitOn = new RegExp('\\s*' + escape_regex(self.settings.delimiter) + '+\\s*');
		}

		// debounce user defined load() if loadThrottle > 0
		// after initializePlugins() so plugins can create/modify user defined loaders
		if( this.settings.load && this.settings.loadThrottle ){
			this.settings.load = loadDebounce(this.settings.load,this.settings.loadThrottle)
		}


		self.control			= control;
		self.control_input		= control_input;
		self.wrapper			= wrapper;
		self.dropdown			= dropdown;
		self.dropdown_content	= dropdown_content;

		self.control_input.type	= input.type;

		// clicking on an option should select it
		addEvent(dropdown,'click',(evt) => {
			const option = parentMatch(evt.target as HTMLElement, '[data-selectable]');
			if( option ){
				self.onOptionSelect( evt as MouseEvent, option );
			}
		});

		addEvent(control,'click', (evt) => {

			var target_match = parentMatch( evt.target as HTMLElement, '.'+self.settings.itemClass, control);
			if( target_match && self.onItemSelect(evt as MouseEvent, target_match) ){
				return;
			}

			// retain focus (see control_input mousedown)
			if( control_input.value != '' ){
				return;
			}

			self.onClick(evt as MouseEvent);
		});


		// retain focus by preventing native handling. if the
		// event target is the input it should not be modified.
		// otherwise, text selection within the input won't work.
		addEvent(control_input,'mousedown',	(e) =>{
			if( control_input.value !== '' ){
				e.stopPropagation();
			}
		});


		addEvent(control_input,'keydown',	(e) => self.onKeyDown(e as KeyboardEvent) );
		addEvent(control_input,'keyup',		(e) => self.onKeyUp(e as KeyboardEvent) );
		addEvent(control_input,'keypress',	(e) => self.onKeyPress(e as KeyboardEvent) );
		addEvent(control_input,'resize',	() => self.positionDropdown(), passive_event);
		addEvent(control_input,'blur',		(e) => self.onBlur(e as MouseEvent) );
		addEvent(control_input,'focus',		(e) => self.onFocus(e as MouseEvent) );
		addEvent(control_input,'paste',		(e) => self.onPaste(e as MouseEvent) );


		const doc_mousedown = (e:MouseEvent) => {

			// blur if target is outside of this instance
			// dropdown is not always inside wrapper
			if( !wrapper.contains(e.target as HTMLElement) && !dropdown.contains(e.target as HTMLElement) ){
				if (self.isFocused) {
					self.blur();
				}
				self.inputState();
				return;
			}

			// clicking anywhere in the control should not blur the control_input & close the dropdown
			preventDefault(e,true);
		};

		var win_scroll = () => {
			if (self.isOpen) {
				self.positionDropdown();
			}
		};


		addEvent(document,'mousedown',doc_mousedown);
		addEvent(window,'sroll', win_scroll, passive_event);
		addEvent(window,'resize', win_scroll, passive_event);

		self._destroy = () => {
			document.removeEventListener('mousedown',doc_mousedown);
			window.removeEventListener('sroll',win_scroll);
			window.removeEventListener('resize',win_scroll);
		};

		// store original html and tab index so that they can be
		// restored when the destroy() method is called.
		this.revertSettings = {
			innerHTML : input.innerHTML,
			tabIndex : input.tabIndex
		};


		input.tabIndex = -1;
		setAttr(input,{	hidden:'hidden'});
		input.insertAdjacentElement('afterend', self.wrapper);


		self.setValue(settings.items);
		delete settings.items;

		addEvent(input,'invalid', (e) => {
			preventDefault(e);
			if( !self.isInvalid ){
				self.isInvalid = true;
				self.refreshState();
			}
		});

		self.updateOriginalInput();
		self.refreshItems();
		self.refreshState();
		self.inputState();
		self.isSetup = true;

		if( input.disabled ){
			self.disable();
		}

		self.on('change', this.onChange);

		addClasses(input,'tomselected');
		self.trigger('initialize');

		// preload options
		if (settings.preload === true) {
			self.load('');
		}

	}


	/**
	 * Register options and optgroups
	 *
	 */
	setupOptions(options:TomOption[] = [], optgroups:TomOption[] = []){

		// build options table
		for( const option of options ){
			this.registerOption(option);
		}


		// build optgroup table
		for( const optgroup of optgroups ){
			this.registerOptionGroup(optgroup);
		}
	}

	/**
	 * Sets up default rendering functions.
	 */
	setupTemplates() {
		var self = this;
		var field_label = self.settings.labelField;
		var field_optgroup = self.settings.optgroupLabelField;

		var templates = {
			'optgroup': (data:TomOption, escape:typeof escape_html) => {
				let optgroup = document.createElement('div');
				optgroup.className = 'optgroup';
				optgroup.appendChild(data.options);
				return optgroup;

			},
			'optgroup_header': (data:TomOption, escape:typeof escape_html) => {
				return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
			},
			'option': (data:TomOption, escape:typeof escape_html) => {
				return '<div>' + escape(data[field_label]) + '</div>';
			},
			'item': (data:TomOption, escape:typeof escape_html) => {
				return '<div>' + escape(data[field_label]) + '</div>';
			},
			'option_create': (data:TomOption, escape:typeof escape_html) => {
				return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
			},
			'no_results':(data:TomOption,escape:typeof escape_html) => {
				return '<div class="no-results">No results found</div>';
			},
			'loading':(data:TomOption,escape:typeof escape_html) => {
				return '<div class="spinner"></div>';
			},
			'not_loading':() => {},
			'dropdown':() => {
				return '<div></div>';
			}
		};


		self.settings.render = Object.assign({}, templates, self.settings.render);
	}

	/**
	 * Maps fired events to callbacks provided
	 * in the settings used when creating the control.
	 */
	setupCallbacks() {
		var key, fn;
		var callbacks:{[key:string]:string} = {
			'initialize'      : 'onInitialize',
			'change'          : 'onChange',
			'item_add'        : 'onItemAdd',
			'item_remove'     : 'onItemRemove',
			'clear'           : 'onClear',
			'option_add'      : 'onOptionAdd',
			'option_remove'   : 'onOptionRemove',
			'option_clear'    : 'onOptionClear',
			'optgroup_add'    : 'onOptionGroupAdd',
			'optgroup_remove' : 'onOptionGroupRemove',
			'optgroup_clear'  : 'onOptionGroupClear',
			'dropdown_open'   : 'onDropdownOpen',
			'dropdown_close'  : 'onDropdownClose',
			'type'            : 'onType',
			'load'            : 'onLoad',
			'focus'           : 'onFocus',
			'blur'            : 'onBlur'
		};

		for (key in callbacks) {

			fn = this.settings[callbacks[key] as (keyof TomSettings)];
			if (fn) this.on(key, fn);

		}
	}

	/**
	 * Triggered when the main control element
	 * has a click event.
	 *
	 */
	onClick(e:MouseEvent|KeyboardEvent):void {
		var self = this;

		if( self.activeItems.length > 0 ){
			self.clearActiveItems();
			self.focus();
			return;
		}

		if( self.isFocused && self.isOpen ){
			self.blur();
		} else {
			self.focus();
		}
	}

	/**
	 * @deprecated v1.7
	 *
	 */
	onMouseDown(e:MouseEvent|KeyboardEvent):void {}

	/**
	 * Triggered when the value of the control has been changed.
	 * This should propagate the event to the original DOM
	 * input / select element.
	 */
	onChange() {
		triggerEvent(this.input, 'input');
		triggerEvent(this.input, 'change');
	}

	/**
	 * Triggered on <input> paste.
	 *
	 */
	onPaste(e:MouseEvent|KeyboardEvent):void {
		var self = this;

		if (self.isFull() || self.isInputHidden || self.isLocked) {
			preventDefault(e);
			return;
		}

		// If a regex or string is included, this will split the pasted
		// input and create Items for each separate value
		if (self.settings.splitOn) {

			// Wait for pasted text to be recognized in value
			setTimeout(() => {
				var pastedText = self.inputValue();
				if( !pastedText.match(self.settings.splitOn)){
					return
				}

				var splitInput = pastedText.trim().split(self.settings.splitOn);
				for( const piece of splitInput ){
					self.createItem(piece);
				}
			}, 0);
		}
	}

	/**
	 * Triggered on <input> keypress.
	 *
	 */
	onKeyPress(e:KeyboardEvent):void {
		var self = this;
		if(self.isLocked){
			preventDefault(e);
			return;
		}
		var character = String.fromCharCode(e.keyCode || e.which);
		if (self.settings.create && self.settings.mode === 'multi' && character === self.settings.delimiter) {
			self.createItem();
			preventDefault(e);
			return;
		}
	}

	/**
	 * Triggered on <input> keydown.
	 *
	 */
	onKeyDown(e:KeyboardEvent):void {
		var self = this;

		if (self.isLocked) {
			if (e.keyCode !== constants.KEY_TAB) {
				preventDefault(e);
			}
			return;
		}

		switch (e.keyCode) {

			// ctrl+A: select all
			case constants.KEY_A:
				if( isKeyDown(constants.KEY_SHORTCUT,e) ){
					self.selectAll();
					return;
				}
				break;

			// esc: close dropdown
			case constants.KEY_ESC:
				if (self.isOpen) {
					preventDefault(e,true);
					self.close();
				}
				self.clearActiveItems();
				return;

			// down: open dropdown or move selection down
			case constants.KEY_DOWN:
				if (!self.isOpen && self.hasOptions) {
					self.open();
				} else if (self.activeOption) {
					let next = self.getAdjacent(self.activeOption, 1);
					if (next) self.setActiveOption(next);
				}
				preventDefault(e);
				return;

			// up: move selection up
			case constants.KEY_UP:
				if (self.activeOption) {
					let prev = self.getAdjacent(self.activeOption, -1);
					if (prev) self.setActiveOption(prev);
				}
				preventDefault(e);
				return;

			// doc_src select active option
			case constants.KEY_RETURN:
				if (self.isOpen && self.activeOption) {
					self.onOptionSelect(e,self.activeOption);
					preventDefault(e);

				// if the option_create=null, the dropdown might be closed
				}else if (self.settings.create && self.createItem()) {
					preventDefault(e);
				}
				return;

			// left: modifiy item selection to the left
			case constants.KEY_LEFT:
				self.advanceSelection(-1, e);
				return;

			// right: modifiy item selection to the right
			case constants.KEY_RIGHT:
				self.advanceSelection(1, e);
				return;

			// tab: select active option and/or create item
			case constants.KEY_TAB:
				if( self.settings.selectOnTab ){
					if( self.isOpen && self.activeOption) {
						self.tab_key = true;
						self.onOptionSelect(e,self.activeOption);

						// prevent default [tab] behaviour of jump to the next field
						// if select isFull, then the dropdown won't be open and [tab] will work normally
						preventDefault(e);
						self.tab_key = false;
					}
					if (self.settings.create && self.createItem()) {
						preventDefault(e);
					}
				}
				return;

			// delete|backspace: delete items
			case constants.KEY_BACKSPACE:
			case constants.KEY_DELETE:
				self.deleteSelection(e);
				return;
		}

		// don't enter text in the control_input when active items are selected
		if( self.isInputHidden && !isKeyDown(constants.KEY_SHORTCUT,e) ){
			preventDefault(e);
		}
	}

	/**
	 * Triggered on <input> keyup.
	 *
	 */
	onKeyUp(e:MouseEvent|KeyboardEvent):void {
		var self = this;

		if (self.isLocked){
			preventDefault(e);
			return;
		}

		var value = self.inputValue();
		if (self.lastValue !== value) {
			self.lastValue = value;

			if( self.settings.shouldLoad.call(self,value) ){
				self.load(value);
			}

			self.refreshOptions();
			self.trigger('type', value);
		}
	}


	/**
	 * Triggered on <input> focus.
	 *
	 */
	onFocus(e?:MouseEvent|KeyboardEvent):void {
		var self = this;
		var wasFocused = self.isFocused;

		if (self.isDisabled) {
			self.blur();
			preventDefault(e);
			return;
		}

		if (self.ignoreFocus) return;
		self.isFocused = true;
		if (self.settings.preload === 'focus') self.load('');

		if (!wasFocused) self.trigger('focus');

		if (!self.activeItems.length) {
			self.showInput();
			self.setActiveItem();
			self.refreshOptions(!!self.settings.openOnFocus);
		}

		self.refreshState();
	}

	/**
	 * Triggered on <input> blur.
	 *
	 */
	onBlur(e:MouseEvent|KeyboardEvent):void {
		var self = this;
		if (!self.isFocused) return;
		self.isFocused = false;
		self.ignoreFocus = false;

		var deactivate = () => {
			self.close();
			self.setActiveItem();
			self.setCaret(self.items.length);
			self.trigger('blur');
		};

		if (self.settings.create && self.settings.createOnBlur) {
			self.createItem(null, false, deactivate);
		} else {
			deactivate();
		}
	}


	/**
	 * Triggered when the user clicks on an option
	 * in the autocomplete dropdown menu.
	 *
	 */
	onOptionSelect( evt:MouseEvent|KeyboardEvent, option:HTMLElement ){
		var value, self = this;

		if( !option ){
			return;
		}

		// should not be possible to trigger a option under a disabled optgroup
		if( option.parentElement && option.parentElement.matches('[data-disabled]') ){
			return;
		}


		if( option.classList.contains('create') ){
			self.createItem(null, true, () => {
				if (self.settings.closeAfterSelect) {
					self.close();
				}
			});
		} else {
			value = option.dataset.value;
			if (typeof value !== 'undefined') {
				self.lastQuery = null;
				self.addItem(value);
				if (self.settings.closeAfterSelect) {
					self.close();
				} else if (!self.settings.hideSelected && evt.type && /mouse/.test(evt.type)) {
					self.setActiveOption(self.getOption(value));
				}

			}
		}
	}

	/**
	 * Triggered when the user clicks on an item
	 * that has been selected.
	 *
	 */
	onItemSelect( evt?:MouseEvent, item?:HTMLElement ):boolean{
		var self = this;

		if( !self.isLocked && self.settings.mode === 'multi' ){
			preventDefault(evt);
			self.setActiveItem(item, evt);
			return true;
		}
		return false;
	}

	/**
	 * Determines whether or not to invoke
	 * the user-provided option provider / loader
	 *
	 * Note, there is a subtle difference between
	 * this.canLoad() and this.settings.shouldLoad();
	 *
	 *	- settings.shouldLoad() is a user-input validator.
	 *	When false is returned, the not_loading template
	 *	will be added to the dropdown
	 *
	 *	- canLoad() is lower level validator that checks
	 * 	the Tom Select instance. There is no inherent user
	 *	feedback when canLoad returns false
	 *
	 */
	canLoad(value:string):boolean{

		if( !this.settings.load ) return false;
		if( this.loadedSearches.hasOwnProperty(value) ) return false;

		return true;
	}

	/**
	 * Invokes the user-provided option provider / loader.
	 *
	 */
	load(value:string):void {
		const self = this;

		if( !self.canLoad(value) ) return;

		addClasses(self.wrapper,self.settings.loadingClass);
		self.loading++;

		const callback = self.loadCallback.bind(self,value);
		self.settings.load.call(self, value, callback);
	}

	/**
	 * Invoked by the user-provided option provider
	 *
	 */
	loadCallback( value, options:TomOption[], optgroups:TomOption[] ):void{
		const self = this;
		self.loading = Math.max(self.loading - 1, 0);
		self.lastQuery = null;

		self.clearActiveOption(); // when new results load, focus should be on first option
		self.setupOptions(options,optgroups);

		self.refreshOptions(self.isFocused && !self.isInputHidden);

		if (!self.loading) {
			removeClasses(self.wrapper,self.settings.loadingClass);
		}

		self.trigger('load', options, optgroups);
	}


	/**
	 * Sets the input field of the control to the specified value.
	 *
	 */
	setTextboxValue(value:string = '') {
		var input = this.control_input;
		var changed = input.value !== value;
		if (changed) {
			input.value = value;
			triggerEvent(input,'update');
			this.lastValue = value;
		}
	}

	/**
	 * Returns the value of the control. If multiple items
	 * can be selected (e.g. <select multiple>), this returns
	 * an array. If only one item can be selected, this
	 * returns a string.
	 *
	 */
	getValue():string|string[] {

		if( this.is_select_tag && this.input.hasAttribute('multiple')) {
			return this.items;
		}

		return this.items.join(this.settings.delimiter);
	}

	/**
	 * Resets the selected items to the given value.
	 *
	 */
	setValue( value:string|string[], silent?:boolean ):void{
		var events = silent ? [] : ['change'];

		debounce_events(this, events,() => {
			this.clear(silent);
			this.addItems(value, silent);
		});
	}


	/**
	 * Resets the number of max items to the given value
	 *
	 */
	setMaxItems(value:number){
		if(value === 0) value = null; //reset to unlimited items.
		this.settings.maxItems = value;
		this.refreshState();
	}

	/**
	 * Sets the selected item.
	 *
	 */
	setActiveItem( item?:HTMLElement, e?:MouseEvent|KeyboardEvent ){
		var self = this;
		var eventName;
		var i, begin, end, swap;
		var last;

		if (self.settings.mode === 'single') return;

		// clear the active selection
		if( !item ){
			self.clearActiveItems();
			if (self.isFocused) {
				self.showInput();
			}
			return;
		}

		// modify selection
		eventName = e && e.type.toLowerCase();

		if (eventName === 'click' && isKeyDown('shiftKey',e) && self.activeItems.length) {
			last	= self.getLastActive();
			begin	= Array.prototype.indexOf.call(self.control.children, last);
			end		= Array.prototype.indexOf.call(self.control.children, item);

			if (begin > end) {
				swap  = begin;
				begin = end;
				end   = swap;
			}
			for (i = begin; i <= end; i++) {
				item = self.control.children[i] as HTMLElement;
				if (self.activeItems.indexOf(item) === -1) {
					self.setActiveItemClass(item);
				}
			}
			preventDefault(e);
		} else if ((eventName === 'click' && isKeyDown(constants.KEY_SHORTCUT,e) ) || (eventName === 'keydown' && isKeyDown('shiftKey',e))) {
			if( item.classList.contains('active') ){
				self.removeActiveItem( item );
			} else {
				self.setActiveItemClass(item);
			}
		} else {
			self.clearActiveItems();
			self.setActiveItemClass(item);
		}

		// ensure control has focus
		self.hideInput();
		if (!self.isFocused) {
			self.focus();
		}
	}

	/**
	 * Set the active and last-active classes
	 *
	 */
	setActiveItemClass( item:HTMLElement ){

		var last_active = this.control.querySelector('.last-active');
		if( last_active ) removeClasses(last_active as HTMLElement,'last-active');

		addClasses(item,'active last-active');
		if( this.activeItems.indexOf(item) == -1 ){
			this.activeItems.push( item );
		}
	}

	/**
	 * Remove active item
	 *
	 */
	removeActiveItem( item:HTMLElement ){
		var idx = this.activeItems.indexOf(item);
		this.activeItems.splice(idx, 1);
		removeClasses(item,'active');
	}

	/**
	 * Clears all the active items
	 *
	 */
	clearActiveItems(){
		removeClasses(this.activeItems,'active');
		this.activeItems = [];
	}

	/**
	 * Sets the selected item in the dropdown menu
	 * of available options.
	 *
	 */
	setActiveOption( option:HTMLElement ){
		var height_menu, height_item, y;

		if( option === this.activeOption ){
			return;
		}

		this.clearActiveOption();
		if( !option ) return;

		this.activeOption = option;
		setAttr(this.control_input,{'aria-activedescendant':option.getAttribute('id')});
		setAttr(option,{'aria-selected':'true'});
		addClasses(option,'active');

		height_menu		= this.dropdown_content.clientHeight;
		let scrollTop	= this.dropdown_content.scrollTop || 0;

		height_item		= this.activeOption.offsetHeight;
		y				= this.activeOption.getBoundingClientRect().top - this.dropdown_content.getBoundingClientRect().top + scrollTop;

		if (y + height_item > height_menu + scrollTop) {
			this.dropdown_content.scrollTop = y - height_menu + height_item;

		} else if (y < scrollTop) {
			this.dropdown_content.scrollTop = y;
		}
	}


	/**
	 * Clears the active option
	 *
	 */
	clearActiveOption(){
		if( this.activeOption ){
			removeClasses(this.activeOption,'active');
			this.activeOption.removeAttribute('aria-selected');
		}
		this.activeOption = null;
		this.control_input.removeAttribute('aria-activedescendant');
	}


	/**
	 * Selects all items (CTRL + A).
	 */
	selectAll() {

		if (this.settings.mode === 'single') return;

		this.activeItems = this.controlChildren();

		if( this.activeItems.length ){
			addClasses( this.activeItems, 'active' );

			this.hideInput();
			this.close();
		}
		this.focus();
	}

	/**
	 * Determines if the control_input should be in a hidden or visible state
	 *
	 */
	inputState(){
		var self = this;

		if( self.settings.controlInput ) return;

		if( self.activeItems.length > 0 || (!self.isFocused && this.settings.hidePlaceholder && self.items.length > 0) ){
			self.setTextboxValue();
			self.isInputHidden = true;
			addClasses(self.wrapper,'input-hidden');
		}else{
			self.isInputHidden = false;
			removeClasses(self.wrapper,'input-hidden');
		}
	}

	/**
	 * Hides the input element out of view, while
	 * retaining its focus.
	 * @deprecated 1.3
	 */
	hideInput() {
		this.inputState();
	}

	/**
	 * Restores input visibility.
	 * @deprecated 1.3
	 */
	showInput() {
		this.inputState();
	}

	/**
	 * Get the input value
	 */
	inputValue(){
		return this.control_input.value.trim();
	}

	/**
	 * Gives the control focus.
	 */
	focus() {
		var self = this;
		if (self.isDisabled) return;

		self.ignoreFocus = true;
		self.control_input.focus();
		setTimeout(() => {
			self.ignoreFocus = false;
			self.onFocus();
		}, 0);
	}

	/**
	 * Forces the control out of focus.
	 *
	 */
	blur():void {
		this.control_input.blur();

		this.onBlur(null);
	}

	/**
	 * Returns a function that scores an object
	 * to show how good of a match it is to the
	 * provided query.
	 *
	 * @return {function}
	 */
	getScoreFunction(query:string) {
		return this.sifter.getScoreFunction(query, this.getSearchOptions());
	}

	/**
	 * Returns search options for sifter (the system
	 * for scoring and sorting results).
	 *
	 * @see https://github.com/orchidjs/sifter.js
	 * @return {object}
	 */
	getSearchOptions() {
		var settings = this.settings;
		var sort = settings.sortField;
		if (typeof settings.sortField === 'string') {
			sort = [{field: settings.sortField}];
		}

		return {
			fields      : settings.searchField,
			conjunction : settings.searchConjunction,
			sort        : sort,
			nesting     : settings.nesting
		};
	}

	/**
	 * Searches through available options and returns
	 * a sorted array of matches.
	 *
	 */
	search(query:string) : ReturnType<Sifter['search']>{
		var i, result, calculateScore;
		var self     = this;
		var settings = self.settings;
		var options  = this.getSearchOptions();

		// validate user-provided result scoring function
		if (settings.score) {
			calculateScore = self.settings.score.call(self,query);
			if (typeof calculateScore !== 'function') {
				throw new Error('Tom Select "score" setting must be a function that returns a function');
			}
		}

		// perform search
		if (query !== self.lastQuery) {
			self.lastQuery			= query;
			result					= self.sifter.search(query, Object.assign(options, {score: calculateScore}));
			self.currentResults		= result;
		} else {
			result					= Object.assign( {}, self.currentResults);
		}

		// filter out selected items
		if (settings.hideSelected) {
			for (i = result.items.length - 1; i >= 0; i--) {
				if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
					result.items.splice(i, 1);
				}
			}
		}

		return result;
	}

	/**
	 * Refreshes the list of available options shown
	 * in the autocomplete dropdown menu.
	 *
	 */
	refreshOptions( triggerDropdown:boolean = true ){
		var i, j, k, n, groups_order, optgroup, optgroups, html, has_create_option;
		var active, create;
		var groups: {[key:string]:DocumentFragment};


		var self					= this;
		var query					= self.inputValue();
		var results					= self.search(query);
		var active_before_hash		= self.activeOption && hash_key(self.activeOption.dataset.value);
		var show_dropdown			= self.settings.shouldOpen || false;


		// build markup
		n = results.items.length;
		if (typeof self.settings.maxOptions === 'number') {
			n = Math.min(n, self.settings.maxOptions);
		}

		if( n > 0 ){
			show_dropdown = true;
		}

		// render and group available options individually
		groups = {};
		groups_order = [];

		for (i = 0; i < n; i++) {

			// get option dom element, don't re-render if we
			let option			= self.options[results.items[i].id];
			let opt_value		= hash_key(option[self.settings.valueField]);
			let option_el		= self.getOption(opt_value);
			if( !option_el ){
				option_el = self.render('option', option);
			}

			// toggle 'selected' class
			if( !self.settings.hideSelected ){
				option_el.classList.toggle('selected', self.items.includes(opt_value) );
			}

			optgroup    = option[self.settings.optgroupField] || '';
			optgroups   = Array.isArray(optgroup) ? optgroup : [optgroup];

			for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
				optgroup = optgroups[j];
				if (!self.optgroups.hasOwnProperty(optgroup)) {
					optgroup = '';
				}
				if (!groups.hasOwnProperty(optgroup)) {
					groups[optgroup] = document.createDocumentFragment();
					groups_order.push(optgroup);
				}

				// a child could only have one parent, so if you have more parents clone the child
				if( j > 0 ){
					option_el = option_el.cloneNode(true) as HTMLElement;
					removeClasses(option_el,'active');
					option_el.removeAttribute('aria-selected');
				}

				groups[optgroup].appendChild(option_el);
			}
		}

		// sort optgroups
		if (this.settings.lockOptgroupOrder) {
			groups_order.sort((a, b) => {
				var a_order = self.optgroups[a] && self.optgroups[a].$order || 0;
				var b_order = self.optgroups[b] && self.optgroups[b].$order || 0;
				return a_order - b_order;
			});
		}

		// render optgroup headers & join groups
		html = document.createDocumentFragment();
		for( optgroup of groups_order ){
			if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].children.length) {

				let group_options = document.createDocumentFragment();
				group_options.append(self.render('optgroup_header', self.optgroups[optgroup]));
				group_options.append(groups[optgroup]);

				let group_html = self.render('optgroup', {group:self.optgroups[optgroup],options:group_options} );

				html.append(group_html);

			} else {
				html.append(groups[optgroup]);
			}
		}

		self.dropdown_content.innerHTML = '';
		self.dropdown_content.append(html);

		// highlight matching terms inline
		if (self.settings.highlight) {
			removeHighlight( self.dropdown_content );
			if (results.query.length && results.tokens.length) {
				for( const tok of results.tokens ){
					highlight( self.dropdown_content, tok.regex);
				}
			}
		}

		// helper method for adding templates to dropdown
		var add_template = (template:string) => {
			let content = self.render(template,{input:query});
			if( content ){
				show_dropdown = true;
				self.dropdown_content.insertBefore(content, self.dropdown_content.firstChild);
			}
			return content;
		};

		// invalid query
		if( !self.settings.shouldLoad.call(self,query) ){
			add_template('not_loading');

		// add loading message
		}else if( self.loading ){
			add_template('loading');

		// add no_results message
		}else if( results.items.length === 0 ){
			add_template('no_results');

		}



		// add create option
		has_create_option = self.canCreate(query);
		if (has_create_option) {
			create = add_template('option_create');
		}


		// activate
		self.hasOptions = results.items.length > 0 || has_create_option;
		if( show_dropdown ){

			if (results.items.length > 0) {

				active = active_before_hash && self.getOption(active_before_hash);

				if( !active && self.settings.mode === 'single' && self.items.length ){
					active = self.getOption(self.items[0]);
				}

				if( !active || !self.dropdown_content.contains(active)  ){

					let active_index = 0;
					if( create && !self.settings.addPrecedence ){
						active_index = 1;
					}
					active = self.selectable()[active_index] as HTMLElement;
				}

			}else{
				active = create;
			}

			self.setActiveOption(active);
			if( triggerDropdown && !self.isOpen ){ self.open(); }

		}else{
			self.clearActiveOption();
			if( triggerDropdown && self.isOpen ){
				self.close(false); // if create_option=null, we wan't the dropdown to close but not reset the textbox value
			}
		}
	}

	/**
	 * Return list of selectable options
	 *
	 */
	selectable():NodeList{
		return this.dropdown_content.querySelectorAll('[data-selectable]');
	}



	/**
	 * Adds an available option. If it already exists,
	 * nothing will happen. Note: this does not refresh
	 * the options list dropdown (use `refreshOptions`
	 * for that).
	 *
	 * Usage:
	 *
	 *   this.addOption(data)
	 *
	 */
	addOption(data:TomOption|TomOption[]):void {
		var value, self = this;

		if (Array.isArray(data)) {
			for( const dat of data ){
				self.addOption(dat);
			}
			return;
		}

		if (value = self.registerOption(data)) {
			self.userOptions[value] = true;
			self.lastQuery = null;
			self.trigger('option_add', value, data);
		}
	}

	/**
	 * Registers an option to the pool of options.
	 *
	 */
	registerOption(data:TomOption):false|string {
		var key = hash_key(data[this.settings.valueField]);
		if ( key === null || this.options.hasOwnProperty(key)) return false;

		data.$order			= data.$order || ++this.order;
		data.$id			= this.inputId + '-opt-' + data.$order;
		this.options[key]	= data;
		return key;
	}

	/**
	 * Registers an option group to the pool of option groups.
	 *
	 * @return {boolean|string}
	 */
	registerOptionGroup(data:TomOption) {
		var key = hash_key(data[this.settings.optgroupValueField]);

		if ( key === null ) return false;

		data.$order = data.$order || ++this.order;
		this.optgroups[key] = data;
		return key;
	}

	/**
	 * Registers a new optgroup for options
	 * to be bucketed into.
	 *
	 */
	addOptionGroup(id:string, data:TomOption) {
		var hashed_id;
		data[this.settings.optgroupValueField] = id;

		if( hashed_id = this.registerOptionGroup(data) ){
			this.trigger('optgroup_add', hashed_id, data);
		}
	}

	/**
	 * Removes an existing option group.
	 *
	 */
	removeOptionGroup(id:string) {
		if (this.optgroups.hasOwnProperty(id)) {
			delete this.optgroups[id];
			this.clearCache();
			this.trigger('optgroup_remove', id);
		}
	}

	/**
	 * Clears all existing option groups.
	 */
	clearOptionGroups() {
		this.optgroups = {};
		this.clearCache();
		this.trigger('optgroup_clear');
	}

	/**
	 * Updates an option available for selection. If
	 * it is visible in the selected items or options
	 * dropdown, it will be re-rendered automatically.
	 *
	 */
	updateOption(value:string, data:TomOption) {
		var self = this;
		var item, item_new;
		var value_new, index_item, cache_items, cache_options, order_old;

		value     = hash_key(value);
		value_new = hash_key(data[self.settings.valueField]);

		// sanity checks
		if (value === null) return;
		if (!self.options.hasOwnProperty(value)) return;
		if (typeof value_new !== 'string') throw new Error('Value must be set in option data');

		order_old = self.options[value].$order;

		// update references
		if (value_new !== value) {
			delete self.options[value];
			index_item = self.items.indexOf(value);
			if (index_item !== -1) {
				self.items.splice(index_item, 1, value_new);
			}
		}
		data.$order = data.$order || order_old;
		self.options[value_new] = data;

		// invalidate render cache
		self.removeValue(value);
		self.removeValue(value_new);


		// update the item if it's selected
		if (self.items.indexOf(value_new) !== -1) {
			item		= self.getItem(value);
			item_new	= self.render('item', data);

			if( item.classList.contains('active') ) addClasses(item_new,'active');

			item.parentNode.insertBefore(item_new, item);
			item.remove();
		}

		// invalidate last query because we might have updated the sortField
		self.lastQuery = null;

		// update dropdown contents
		if (self.isOpen) {
			self.refreshOptions(false);
		}
	}

	/**
	 * Removes a single option.
	 *
	 */
	removeOption(value:string, silent?:boolean):void {
		var self = this;
		value = hash_key(value);

		self.removeValue(value);

		delete self.userOptions[value];
		delete self.options[value];
		self.lastQuery = null;
		self.trigger('option_remove', value);
		self.removeItem(value, silent);
	}

	/**
	 * Clears all options.
	 */
	clearOptions() {

		this.loadedSearches		= {};
		this.userOptions		= {};
		this.clearCache();
		var selected:TomOptions	= {};
		for( let key in this.options){
    		if( this.options.hasOwnProperty(key) && this.items.indexOf(key) >= 0 ){
				selected[key] = this.options[key];
			}
		}

		this.options = this.sifter.items = selected;
		this.lastQuery = null;
		this.trigger('option_clear');
	}


	/**
	 * Removes a value from item and option caches
	 *
	 */
	removeValue(value:string){
		const self				= this;
		const option_el			= self.getOption(value);
		const cache_items		= self.renderCache['item'];
		const cache_options		= self.renderCache['option'];

		if( option_el ) option_el.remove();
		if (cache_items) delete cache_items[value];
		if (cache_options) delete cache_options[value];

	}


	/**
	 * Returns the dom element of the option
	 * matching the given value.
	 *
	 * @returns {object}
	 */
	getOption(value:string):HTMLElement {

		value = hash_key(value);

		if( value ){
			const option = this.dropdown_content.querySelector(`[data-selectable][data-value="${addSlashes(value)}"]`);
			if( option ){
				return option as HTMLElement;
			}
		}

		if( this.renderCache['option'].hasOwnProperty(value) ){
			return this.renderCache['option'][value];
		}
	}

	/**
	 * Returns the dom element of the next or previous dom element of the same type
	 * Note: adjacent options may not be adjacent DOM elements (optgroups)
	 *
	 */
	getAdjacent( option:HTMLElement, direction:number, type:string = 'option' ) : HTMLElement|void{
		var self = this, all;

		if( !option ){
			return;
		}

		if( type == 'item' ){
			all			= self.controlChildren();
		}else{
			all			= self.dropdown_content.querySelectorAll('[data-selectable]');
		}

		for( let i = 0; i < all.length; i++ ){
			if( all[i] != option ){
				continue;
			}

			if( direction > 0 ){
				return all[i+1] as HTMLElement;
			}

			return all[i-1] as HTMLElement;
		}
	}


	/**
	 * Returns the dom element of the item
	 * matching the given value.
	 *
	 */
	getItem(value:string):HTMLElement {
		value = hash_key(value);
		if( value ){
			value = addSlashes(value);
			return this.control.querySelector(`[data-value="${value}"]`);
		}
	}

	/**
	 * "Selects" multiple items at once. Adds them to the list
	 * at the current caret position.
	 *
	 */
	addItems( values:string|string[], silent?:boolean ):void{
		var self = this;
		self.buffer = document.createDocumentFragment();

		for( const child of self.control.children ){
			self.buffer.appendChild(child);
		}

		var items = Array.isArray(values) ? values : [values];
		items = items.filter(x => self.items.indexOf(x) === -1);
		for (let i = 0, n = items.length; i < n; i++) {
			self.isPending = (i < n - 1);
			self.addItem(items[i], silent);
		}

		var control = self.control;
		control.insertBefore(self.buffer, control.firstChild);

		self.buffer = null;
	}

	/**
	 * "Selects" an item. Adds it to the list
	 * at the current caret position.
	 *
	 */
	addItem( value:string, silent?:boolean ):void{
		var events = silent ? [] : ['change'];

		debounce_events(this, events, () => {
			var item;
			var self = this;
			var inputMode = self.settings.mode;
			var wasFull;
			value = hash_key(value);

			if( self.items.indexOf(value) !== -1 ){

				if( inputMode === 'single' ){
					self.close();
				}

				if( inputMode === 'single' || !self.settings.duplicates ){
					return;
				}
			}

			if (!self.options.hasOwnProperty(value)) return;
			if (inputMode === 'single') self.clear(silent);
			if (inputMode === 'multi' && self.isFull()) return;

			item = self.render('item', self.options[value]);

			if( self.control.contains(item) ){ // duplicates
				item = item.cloneNode(true) as HTMLElement;
			}

			wasFull = self.isFull();
			self.items.splice(self.caretPos, 0, value);
			self.insertAtCaret(item);

			if (self.isSetup) {
				let options = self.selectable();

				// update menu / remove the option (if this is not one item being added as part of series)
				if (!self.isPending) {
					let option = self.getOption(value);
					let next = self.getAdjacent(option, 1);
					self.refreshOptions(self.isFocused && inputMode !== 'single');
					if( next ){
						self.setActiveOption(next);
					}
				}

				// hide the menu if the maximum number of items have been selected or no options are left
				if ( !options.length || self.isFull()) {
					self.close();
				} else if (!self.isPending) {
					self.positionDropdown();
				}

				self.trigger('item_add', value, item);

				if (!self.isPending) {
					self.updateOriginalInput({silent: silent});
				}
			}

			if (!self.isPending || (!wasFull && self.isFull())) {
				self.refreshState();
			}

		});
	}

	/**
	 * Removes the selected item matching
	 * the provided value.
	 *
	 */
	removeItem( value:string, silent?:boolean ){
		var i, idx, self = this;

		var item	= self.getItem(value);

		if( !item ) return;

		value		= hash_key(item.dataset.value);
		i			= self.items.indexOf(value);

		if (i !== -1) {
			item.remove();
			if( item.classList.contains('active') ){
				idx = self.activeItems.indexOf(item);
				self.activeItems.splice(idx, 1);
				removeClasses(item,'active');
			}

			self.items.splice(i, 1);
			self.lastQuery = null;
			if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
				self.removeOption(value, silent);
			}

			if (i < self.caretPos) {
				self.setCaret(self.caretPos - 1);
			}

			self.updateOriginalInput({silent: silent});
			self.refreshState();
			self.positionDropdown();
			self.trigger('item_remove', value, item);
		}
	}

	/**
	 * Invokes the `create` method provided in the
	 * TomSelect options that should provide the data
	 * for the new item, given the user input.
	 *
	 * Once this completes, it will be added
	 * to the item list.
	 *
	 */
	createItem( input?:string, triggerDropdown:boolean=true, callback?:TomCreateCallback ):boolean{
		var self  = this;
		var caret = self.caretPos;
		var output;
		input = input || self.inputValue();

		if (typeof callback !== 'function') callback = () => {};

		if (!self.canCreate(input)) {
			callback();
			return false;
		}

		self.lock();

		var created = false;
		var create = (data:TomOption) => {
			self.unlock();

			if (!data || typeof data !== 'object') return callback();
			var value = hash_key(data[self.settings.valueField]);
			if( typeof value !== 'string' ){
				return callback();
			}

			self.setTextboxValue();
			self.addOption(data);
			self.setCaret(caret);
			self.addItem(value);
			self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
			callback(data);
			created = true;
		};

		if( typeof self.settings.create === 'function' ){
			output = self.settings.create.call(this, input, create);
		}else{
			output = {
				[self.settings.labelField]: input,
				[self.settings.valueField]: input,
			};
		}

		if( !created ){
			create(output);
		}

		return true;
	}

	/**
	 * Re-renders the selected item lists.
	 */
	refreshItems() {
		var self = this;
		self.lastQuery = null;

		if (self.isSetup) {
			self.addItems(self.items);
		}

		self.updateOriginalInput();
		self.refreshState();
	}

	/**
	 * Updates all state-dependent attributes
	 * and CSS classes.
	 */
	refreshState() {
		var self     = this;

		self.refreshValidityState();

		var isFull   = self.isFull();

		var isLocked = self.isLocked;

		self.wrapper.classList.toggle('rtl',self.rtl);

		var classList = self.control.classList;

		classList.toggle('focus', self.isFocused)
		classList.toggle('disabled', self.isDisabled)
		classList.toggle('required', self.isRequired)
		classList.toggle('invalid', self.isInvalid)
		classList.toggle('locked', isLocked)
		classList.toggle('full', isFull)
		classList.toggle('not-full', !isFull)
		classList.toggle('input-active', self.isFocused && !self.isInputHidden)
		classList.toggle('dropdown-active', self.isOpen)
		classList.toggle('has-options', isEmptyObject(self.options) )
		classList.toggle('has-items', self.items.length > 0);

	}


	/**
	 * Update the `required` attribute of both input and control input.
	 *
	 * The `required` property needs to be activated on the control input
	 * for the error to be displayed at the right place. `required` also
	 * needs to be temporarily deactivated on the input since the input is
	 * hidden and can't show errors.
	 */
	refreshValidityState() {
		var self = this;

		if( !self.input.checkValidity ){
			return;
		}

		// if required, make sure the input required attribute = true so checkValidity() will work
		if( this.isRequired ){
			self.input.required = true;
		}

		var invalid = !self.input.checkValidity();

		self.isInvalid = invalid;
		self.control_input.required = invalid;

		if( this.isRequired ){
			self.input.required = !invalid;
		}
	}

	/**
	 * Determines whether or not more items can be added
	 * to the control without exceeding the user-defined maximum.
	 *
	 * @returns {boolean}
	 */
	isFull() {
		return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
	}

	/**
	 * Refreshes the original <select> or <input>
	 * element to reflect the current state.
	 *
	 */
	updateOriginalInput( opts:TomArgObject = {} ){
		var i, value, option, self = this;

		if( self.is_select_tag ){

			// remove selected attribute from options whose values are not in self.items
			self.input.querySelectorAll('option[selected]').forEach((option:HTMLOptionElement) => {
				if( self.items.indexOf(option.value) == -1 ){
					option.selected = false;
					option.removeAttribute('selected');
				}
			});

			// order selected <option> tags for values in self.items
			for( i = self.items.length - 1; i >= 0; i-- ){
				value = self.items[i];

				var option = self.options[value].$option;
				if( !option ){
					const label = self.options[value][self.settings.labelField] || '';
					option = getDom('<option value="' + escape_html(value) + '">' + escape_html(label) + '</option>');
					self.options[value].$option = option;
				}

				option.selected = true;
				setAttr(option,{selected:'true'});
				self.input.prepend(option);
			}

		} else {
			self.input.value = self.getValue() as string;
		}

		if (self.isSetup) {
			if (!opts.silent) {
				self.trigger('change', self.getValue() );
			}
		}
	}

	/**
	 * Shows the autocomplete dropdown containing
	 * the available options.
	 */
	open() {
		var self = this;

		if (self.isLocked || self.isOpen || (self.settings.mode === 'multi' && self.isFull())) return;
		self.isOpen = true;
		setAttr(self.control_input,{'aria-expanded': 'true'});
		self.refreshState();
		applyCSS(self.dropdown,{visibility: 'hidden', display: 'block'});
		self.positionDropdown();
		applyCSS(self.dropdown,{visibility: 'visible', display: 'block'});
		self.focus();
		self.trigger('dropdown_open', self.dropdown);
	}

	/**
	 * Closes the autocomplete dropdown menu.
	 */
	close(setTextboxValue=true) {
		var self = this;
		var trigger = self.isOpen;

		if( setTextboxValue ){

			// before blur() to prevent form onchange event
			self.setTextboxValue();

			if (self.settings.mode === 'single' && self.items.length) {
				self.hideInput();

				// Do not trigger blur while inside a blur event,
				// this fixes some weird tabbing behavior in FF and IE.
				// See #selectize.js#1164
				if( !self.tab_key ){
					self.blur(); // close keyboard on iOS
				}
			}
		}

		self.isOpen = false;
		setAttr(self.control_input,{'aria-expanded': 'false'});
		applyCSS(self.dropdown,{display: 'none'});
		self.clearActiveOption();
		self.refreshState();

		if (trigger) self.trigger('dropdown_close', self.dropdown);
	}

	/**
	 * Calculates and applies the appropriate
	 * position of the dropdown if dropdownParent = 'body'.
	 * Otherwise, position is determined by css
	 */
	positionDropdown(){

		if( this.settings.dropdownParent !== 'body' ){
			return;
		}

		var context			= this.control;
		var rect			= context.getBoundingClientRect();
		var top				= context.offsetHeight + rect.top  + window.scrollY;
		var left			= rect.left + window.scrollX;


		applyCSS(this.dropdown,{
			width : rect.width + 'px',
			top   : top + 'px',
			left  : left + 'px'
		});

	}

	/**
	 * Resets / clears all selected items
	 * from the control.
	 *
	 */
	clear(silent:boolean) {
		var self = this;

		if (!self.items.length) return;

		var items = self.controlChildren();
		for( const item of items ){
			item.remove();
		}

		self.items = [];
		self.lastQuery = null;
		self.setCaret(0);
		self.setActiveItem();
		self.updateOriginalInput({silent: silent});
		self.refreshState();
		self.showInput();
		self.trigger('clear');
	}

	/**
	 * A helper method for inserting an element
	 * at the current caret position.
	 *
	 */
	insertAtCaret(el:HTMLElement) {
		var self = this;
		var caret	= Math.min(self.caretPos, self.items.length);
		var target	= self.buffer || self.control;

		if (caret === 0) {
			target.insertBefore(el, target.firstChild);
		} else {
			target.insertBefore(el, target.children[caret]);
		}

		self.setCaret(caret + 1);
	}

	/**
	 * Removes the current selected item(s).
	 *
	 */
	deleteSelection(e:KeyboardEvent):boolean {
		var direction, selection, values, caret, tail;
		var self = this;

		direction = (e && e.keyCode === constants.KEY_BACKSPACE) ? -1 : 1;
		selection = getSelection(self.control_input);


		// determine items that will be removed
		values = [];

		if (self.activeItems.length) {

			tail = getTail(self.activeItems, direction);
			caret = nodeIndex(tail);

			if (direction > 0) { caret++; }

			for( const item of self.activeItems ){
				values.push( item.dataset.value );
			}

		} else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
			if (direction < 0 && selection.start === 0 && selection.length === 0) {
				values.push(self.items[self.caretPos - 1]);
			} else if (direction > 0 && selection.start === self.inputValue().length) {
				values.push(self.items[self.caretPos]);
			}
		}

		// allow the callback to abort
		if (!values.length || (typeof self.settings.onDelete === 'function' && self.settings.onDelete.call(self,values,e) === false)) {
			return false;
		}

		preventDefault(e,true);

		// perform removal
		if (typeof caret !== 'undefined') {
			self.setCaret(caret);
		}
		while (values.length) {
			self.removeItem(values.pop());
		}

		self.showInput();
		self.positionDropdown();
		self.refreshOptions(false);

		return true;
	}

	/**
	 * Selects the previous / next item (depending on the `direction` argument).
	 *
	 * > 0 - right
	 * < 0 - left
	 *
	 */
	advanceSelection(direction:number, e?:MouseEvent|KeyboardEvent) {
		var idx, last_active, adjacent, self = this;

		if (self.rtl) direction *= -1;
		if( self.inputValue().length ) return;


		// add or remove to active items
		if( isKeyDown(constants.KEY_SHORTCUT,e) || isKeyDown('shiftKey',e) ){

			last_active			= self.getLastActive(direction);
			if( last_active ){

				if( !last_active.classList.contains('active') ){
					adjacent			= last_active;
				}else{
					adjacent			= self.getAdjacent(last_active,direction,'item');
				}

			// if no active item, get items adjacent to the control input
			}else if( direction > 0 ){
				adjacent			= self.control_input.nextElementSibling;
			}else{
				adjacent			= self.control_input.previousElementSibling;
			}


			if( adjacent ){
				if( adjacent.classList.contains('active') ){
					self.removeActiveItem(last_active);
				}
				self.setActiveItemClass(adjacent); // mark as last_active !! after removeActiveItem() on last_active
			}

		// move caret to the left or right
		}else if( self.isFocused && !self.activeItems.length ){

			self.setCaret(self.caretPos + direction);

		// move caret before or after selected items
		}else{

			last_active		= self.getLastActive(direction);
			if( last_active ){
				idx = nodeIndex(last_active);
				self.setCaret(direction > 0 ? idx + 1: idx);
				self.setActiveItem();
			}
		}

	}

	/**
	 * Get the last active item
	 *
	 */
	getLastActive(direction?:number){

		let last_active = this.control.querySelector('.last-active');
		if( last_active ){
			return last_active;
		}


		var result = this.control.querySelectorAll('.active');
		if( result ){
			return getTail(result,direction);
		}
	}


	/**
	 * Moves the caret to the specified index.
	 *
	 * The input must be moved by leaving it in place and moving the
	 * siblings, due to the fact that focus cannot be restored once lost
	 * on mobile webkit devices
	 *
	 */
	setCaret(new_pos:number) {
		var self = this;

		if( self.settings.mode === 'single' || self.settings.controlInput ) {
			new_pos = self.items.length;
		} else {
			new_pos = Math.max(0, Math.min(self.items.length, new_pos));

			if( new_pos != self.caretPos && !self.isPending ){

				self.controlChildren().forEach((child,j) => {
					if( j < new_pos ){
						self.control_input.insertAdjacentElement('beforebegin', child );
					} else {
						self.control.appendChild( child );
					}
				});
			}
		}

		self.caretPos = new_pos;
	}

	/**
	 * Return list of item dom elements
	 *
	 */
	controlChildren():HTMLElement[]{
		return Array.from( this.control.getElementsByClassName(this.settings.itemClass) ) as HTMLElement[];
	}

	/**
	 * Disables user input on the control. Used while
	 * items are being asynchronously created.
	 */
	lock() {
		this.close();
		this.isLocked = true;
		this.refreshState();
	}

	/**
	 * Re-enables user input on the control.
	 */
	unlock() {
		this.isLocked = false;
		this.refreshState();
	}

	/**
	 * Disables user input on the control completely.
	 * While disabled, it cannot receive focus.
	 */
	disable() {
		var self = this;
		self.input.disabled				= true;
		self.control_input.disabled		= true;
		self.control_input.tabIndex		= -1;
		self.isDisabled					= true;
		self.lock();
	}

	/**
	 * Enables the control so that it can respond
	 * to focus and user input.
	 */
	enable() {
		var self = this;
		self.input.disabled				= false;
		self.control_input.disabled		= false;
		self.control_input.tabIndex		= self.tabIndex;
		self.isDisabled					= false;
		self.unlock();
	}

	/**
	 * Completely destroys the control and
	 * unbinds all event listeners so that it can
	 * be garbage collected.
	 */
	destroy() {
		var self = this;
		var revertSettings = self.revertSettings;

		self.trigger('destroy');
		self.off();
		self.wrapper.remove();
		self.dropdown.remove();

		self.input.innerHTML = revertSettings.innerHTML;
		self.input.tabIndex = revertSettings.tabIndex;

		removeClasses(self.input,'tomselected');
		self.input.removeAttribute('hidden');
		self.input.required = this.isRequired;

		self._destroy();

		delete self.input.tomselect;
	}

	/**
	 * A helper method for rendering "item" and
	 * "option" templates, given the data.
	 *
	 */
	render( templateName:string, data?:any ):null|HTMLElement{
		var value, id, html;
		var self = this;

		if (templateName === 'option' || templateName === 'item') {
			value = hash_key(data[self.settings.valueField]);

			// pull markup from cache if it exists
			if( self.renderCache[templateName].hasOwnProperty(value) ){
				return self.renderCache[templateName][value];
			}

		}

		var template = self.settings.render[templateName];
		if( typeof template !== 'function' ){
			return null;
		}

		// render markup
		html = template.call(this, data, escape_html);

		if( !html ){
			return html;
		}

		html = getDom( html );

		// add mandatory attributes
		if (templateName === 'option' || templateName === 'option_create') {

			if( data[self.settings.disabledField] ){
				setAttr(html,{'aria-disabled':'true'});
			}else{
				setAttr(html,{'data-selectable': ''});
			}

		}else if (templateName === 'optgroup') {
			id = data.group[self.settings.optgroupValueField];
			setAttr(html,{'data-group': id});
			if(data.group[self.settings.disabledField]) {
				setAttr(html,{'data-disabled': ''});
			}
		}

		if (templateName === 'option' || templateName === 'item') {
			setAttr(html,{'data-value': value });


			// make sure we have some classes if a template is overwritten
			if( templateName === 'item' ){
				addClasses(html,self.settings.itemClass);
			}else{
				addClasses(html,self.settings.optionClass);
				setAttr(html,{
					role:'option',
					id:data.$id
				});
			}

			// update cache
			self.renderCache[templateName][value] = html;

		}

		return html;
	}

	/**
	 * Clears the render cache for a template. If
	 * no template is given, clears all render
	 * caches.
	 *
	 */
	clearCache( templateName?:'item'|'option' ):void{
		var self = this;

		if( templateName === void 0 ){
			self.renderCache = {'item':{},'option':{}};
		} else {
			self.renderCache[templateName] = {};
		}

		// remove options from DOM
		if(templateName === void 0 || 'option' ){
			for( let key in this.options){
				const el = this.getOption(key);
				if( el ) el.remove();
			}
		}
	}

	/**
	 * Determines whether or not to display the
	 * create item prompt, given a user input.
	 *
	 */
	canCreate( input:string ):boolean {
		return this.settings.create && input.length && (this.settings.createFilter as TomCreateFilter ).call(this, input);
	}


	/**
	 * Wraps this.`method` so that `new_fn` can be invoked 'before', 'after', or 'instead' of the original method
	 *
	 * this.hook('instead','onKeyDown',function( arg1, arg2 ...){
	 *
	 * });
	 */
	hook( when:string, method:string, new_fn:()=>any ){
		var self = this;
		var orig_method = self[method];


		self[method] = function(){
			var result, result_new;

			if( when === 'after' ){
				result = orig_method.apply(self, arguments);
			}

			result_new = new_fn.apply(self, arguments );

			if( when === 'instead' ){
				return result_new;
			}

			if( when === 'before' ){
				result = orig_method.apply(self, arguments);
			}

			return result;
		};

	}

};
