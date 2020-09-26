
class TomSelect extends MicroEvent{

	constructor( input, settings ){
		super();

		var i, n, dir, self = this;

		input				= getDom( input );

		if( input.tomselect ){
			throw new Error('Tom Select already initialized on this element');
		}

		input.tomselect		= self;
		settings			= getSettings( input, settings );


		// detect rtl environment
		var computedStyle	= window.getComputedStyle && window.getComputedStyle(input, null);
		dir					= computedStyle.getPropertyValue('direction');

		// setup default state
		Object.assign(self, {
			order            : 0,
			settings         : settings,
			input            : input,
			tabIndex         : input.getAttribute('tabindex') || '',
			is_select_tag    : input.tagName.toLowerCase() === 'select',
			rtl              : /rtl/i.test(dir),

			highlightedValue : null,
			isBlurring       : false,
			isOpen           : false,
			isDisabled       : false,
			isRequired       : input.required,
			isInvalid        : false,
			isLocked         : false,
			isFocused        : false,
			isInputHidden    : false,
			isSetup          : false,
			ignoreFocus      : false,
			ignoreBlur       : false,
			ignoreHover      : false,
			hasOptions       : false,
			currentResults   : null,
			lastValue        : '',
			caretPos         : 0,
			loading          : 0,
			loadedSearches   : {},

			activeOption     : null,
			activeItems      : [],

			optgroups        : {},
			options          : {},
			userOptions      : {},
			items            : [],
			renderCache      : {'item':{},'option':{}},
		});

		// debounce user defined load() if loadThrottle > 0
		if( self.settings.load && self.settings.loadThrottle ){
			self.settings.load = self.loadDebounce(self.settings.load,self.settings.loadThrottle)
		}

		// search system
		self.sifter = new Sifter(this.options, {diacritics: settings.diacritics});

		self.setupOptions(self.settings.options,self.settings.optgroups);
		delete self.settings.optgroups;
		delete self.settings.options;


		// option-dependent defaults
		self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? 'single' : 'multi');
		if (typeof self.settings.hideSelected !== 'boolean') {
			self.settings.hideSelected = self.settings.mode === 'multi';
		}

		// create filter regex
		if( typeof self.settings.createFilter === 'string' ){
			self.settings.createFilter = new RegExp(self.settings.createFilter);
		}

		self.initializePlugins(self.settings.plugins);
		self.setupCallbacks();
		self.setupTemplates();
		self.setup();
	}


	// methods
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


	/**
	 * Creates all elements and sets up event bindings.
	 *
	 */
	setup(){
		var self      = this;
		var settings  = self.settings;


		var wrapper;
		var control;
		var control_input;
		var dropdown;
		var dropdown_content;
		var inputMode;
		var timeout_blur;
		var timeout_focus;
		var classes;
		var classes_plugins;
		var inputId;
		var input			= self.input;

		inputMode			= self.settings.mode;
		classes				= input.getAttribute('class') || '';

		wrapper				= getDom('<div>');
		addClasses( wrapper, settings.wrapperClass, classes, inputMode);


		control				= getDom('<div class="items">');
		addClasses(control,settings.inputClass);
		wrapper.append(control);


		dropdown			= self.render('dropdown');
		addClasses(dropdown, settings.dropdownClass, inputMode);


		dropdown_content	= getDom('<div style="scroll-behavior: smooth;">')
		addClasses(dropdown_content, settings.dropdownContentClass);
		dropdown.append(dropdown_content);

		getDom( settings.dropdownParent || wrapper ).appendChild( dropdown );

		if( settings.controlInput ){
			control_input		= getDom( settings.controlInput );
		}else{
			control_input		= getDom('<input type="text" autocomplete="off" />' );

			// set attributes
			var attrs = ['autocorrect','autocapitalize','autocomplete'];
			for(let i = 0; i<attrs.length; i++){
				let attr = attrs[i];
				if( input.getAttribute(attr) ){
					control_input.setAttribute(attr, input.getAttribute(attr) );
				}
			}
		}

		if( !settings.controlInput ){
			control_input.setAttribute('tabindex', input.disabled ? '-1' : self.tabIndex);
			control.appendChild( control_input );
		}



		if( inputId = input.getAttribute('id') ){
			control_input.setAttribute('id', inputId + '-tomselected');
			var label = document.querySelector("label[for='"+inputId+"']");
			if( label ) label.setAttribute('for', inputId + '-tomselected');
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
			input.setAttribute('multiple','multiple');
		}

		if (self.settings.placeholder) {
			control_input.setAttribute('placeholder', settings.placeholder);
		}

		// if splitOn was not passed in, construct it from the delimiter to allow pasting universally
		if (!self.settings.splitOn && self.settings.delimiter) {
			var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
			self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
		}


		control_input.type		= input.type;

		self.control			= control;
		self.control_input		= control_input;
		self.wrapper			= wrapper;
		self.dropdown			= dropdown;
		self.dropdown_content	= dropdown_content;


		onEvent(dropdown, 'mouseenter', '[data-selectable]', function() { return self.onOptionHover.apply(self, arguments); });
		onEvent(dropdown, 'mousedown', '[data-selectable]', function() { return self.onOptionSelect.apply(self, arguments); });

		control.addEventListener('mousedown', function(evt){

			var target_match = parentMatch( evt.target, '.'+self.settings.itemClass, control);
			if( target_match ){
				evt.delegateTarget = target_match;
				return self.onItemSelect.call(self, evt);
			}
			return self.onMouseDown.call(self, evt);
		});

		control.addEventListener('click', function() { return self.onClick.apply(self, arguments); });


		control_input.addEventListener('mousedown', function(e) { e.stopPropagation(); });
		control_input.addEventListener('keydown', function() { return self.onKeyDown.apply(self, arguments); });
		control_input.addEventListener('keyup', function() { return self.onKeyUp.apply(self, arguments); });
		control_input.addEventListener('keypress', function() { return self.onKeyPress.apply(self, arguments); });
		control_input.addEventListener('resize', function() { self.positionDropdown.apply(self, []); });
		control_input.addEventListener('blur', function() { return self.onBlur.apply(self, arguments); });
		control_input.addEventListener('focus', function() { self.ignoreBlur = false; return self.onFocus.apply(self, arguments); });
		control_input.addEventListener('paste', function() { return self.onPaste.apply(self, arguments); });


		var doc_mousedown = function(e) {
			if (self.isFocused) {

				// clicking anywhere in the control should not close the dropdown
				if( parentMatch(e.target, '.'+self.settings.wrapperClass, self.wrapper) ){
					return false;
				}

				self.blur(e.target);
			}
		};

		var win_scroll = function() {
			if (self.isOpen) {
				self.positionDropdown.apply(self, arguments);
			}
		};

		var win_hover = function() {
			self.ignoreHover = false;
		};

		document.addEventListener('mousedown',doc_mousedown);
		window.addEventListener('sroll',win_scroll);
		window.addEventListener('resize',win_scroll);
		window.addEventListener('mousemove',win_hover);
		self._destroy = function(){
			document.removeEventListener('mousedown',doc_mousedown);
			window.removeEventListener('mousemove',win_hover);
			window.removeEventListener('sroll',win_scroll);
			window.removeEventListener('resize',win_scroll);
		};

		// store original children and tab index so that they can be
		// restored when the destroy() method is called.
		var children = [];
		while( input.children.length > 0 ){
			children.push( input.children[0] );
			input.children[0].remove();
		}
		this.revertSettings = {
			children : children,
			tabindex  : input.getAttribute('tabindex')
		};


		input.setAttribute('tabindex',-1)
		input.setAttribute('hidden','hidden');
		input.insertAdjacentElement('afterend', self.wrapper);

		self.setValue(settings.items);
		delete settings.items;

		// feature detect for the validation API
		if( self.supportsValidity() ){
			input.addEventListener('invalid', function(e) {
				e.preventDefault();
				self.isInvalid = true;
				self.refreshState();
			});
		}

		self.updateOriginalInput();
		self.refreshItems();
		self.refreshState();
		self.isSetup = true;

		if( input.disabled ){
			self.disable();
		}

		self.on('change', this.onChange);

		addClasses(input,'tomselected');
		self.trigger('initialize');

		// preload options
		if (settings.preload === true) {
			self.onSearchChange('');
		}

	}

	supportsValidity(){
		return !/android/i.test(window.navigator.userAgent) && !!document.createElement('input').validity;
	}


	/**
	 * Register options and optgroups
	 *
	 */
	setupOptions(options, optgroups){
		var i, n;

		options = options || [];
		optgroups = optgroups || [];

		// build options table
		for( i = 0, n = options.length; i < n; i++ ){
			this.registerOption(options[i]);
		}


		// build optgroup table
		for( i = 0, n = optgroups.length; i < n; i++ ){
			this.registerOptionGroup(optgroups[i]);
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
			'optgroup': function(data, escape) {
				let optgroup = document.createElement('div');
				optgroup.className = 'optgroup';
				optgroup.appendChild(data.options);
				return optgroup;

			},
			'optgroup_header': function(data, escape) {
				return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
			},
			'option': function(data, escape) {
				return '<div>' + escape(data[field_label]) + '</div>';
			},
			'item': function(data, escape) {
				return '<div>' + escape(data[field_label]) + '</div>';
			},
			'option_create': function(data, escape) {
				return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
			},
			'no_results':function(data,escape){
				return '<div class="no-results">No results found</div>';
			},
			'loading':function(data,escape){
				return '<div class="spinner"></div>';
			},
			'dropdown':function(){
				return '<div style="display:none"></div>';
			}
		};


		self.settings.render = Object.assign({}, templates, self.settings.render);
	}

	/**
	 * Maps fired events to callbacks provided
	 * in the settings used when creating the control.
	 */
	setupCallbacks() {
		var key, fn, callbacks = {
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

			fn = this.settings[callbacks[key]];
			if (fn) this.on(key, fn);

		}
	}

	/**
	 * Triggered when the main control element
	 * has a click event.
	 *
	 * @param {object} e
	 * @return {boolean}
	 */
	onClick(e) {
		var self = this;

		// necessary for mobile webkit devices (manual focus triggering
		// is ignored unless invoked within a click event)
    // also necessary to reopen a dropdown that has been closed by
    // closeAfterSelect
		if (!self.isFocused || !self.isOpen) {
			self.focus();
			e.preventDefault();
		}
	}

	/**
	 * Triggered when the main control element
	 * has a mouse down event.
	 *
	 * @param {object} e
	 * @return {boolean}
	 */
	onMouseDown(e) {
		var self = this;


		if (self.isFocused) {
			// retain focus by preventing native handling. if the
			// event target is the input it should not be modified.
			// otherwise, text selection within the input won't work.
			if (e.target !== self.control_input) {
				if (self.settings.mode === 'single') {
					// toggle dropdown
					self.isOpen ? self.close() : self.open();
				} else {
					self.setActiveItem(null);
				}
				return false;
			}
		} else {
			// give control focus
			window.setTimeout(function() {
				self.focus();
			}, 0);
		}
	}

	/**
	 * Triggered when the value of the control has been changed.
	 * This should propagate the event to the original DOM
	 * input / select element.
	 */
	onChange() {
		triggerEvent(this.input, 'change');
	}

	/**
	 * Triggered on <input> paste.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onPaste(e) {
		var self = this;

		if (self.isFull() || self.isInputHidden || self.isLocked) {
			e.preventDefault();
			return;
		}

		// If a regex or string is included, this will split the pasted
		// input and create Items for each separate value
		if (self.settings.splitOn) {

			// Wait for pasted text to be recognized in value
			setTimeout(function() {
				var pastedText = self.inputValue();
				if(!pastedText.match(self.settings.splitOn)){ return }

				var splitInput = pastedText.trim().split(self.settings.splitOn);
				for (var i = 0, n = splitInput.length; i < n; i++) {
					self.createItem(splitInput[i]);
				}
			}, 0);
		}
	}

	/**
	 * Triggered on <input> keypress.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyPress(e) {
		if (this.isLocked) return e && e.preventDefault();
		var character = String.fromCharCode(e.keyCode || e.which);
		if (this.settings.create && this.settings.mode === 'multi' && character === this.settings.delimiter) {
			this.createItem();
			e.preventDefault();
			return false;
		}
	}

	/**
	 * Triggered on <input> keydown.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyDown(e) {
		var isInput = e.target === this.control_input;
		var self = this;

		if (self.isLocked) {
			if (e.keyCode !== KEY_TAB) {
				e.preventDefault();
			}
			return;
		}

		switch (e.keyCode) {

			// cmd+A: select all
			case KEY_A:
				if( self.isKeyDown(KEY_CTRL,e) ){
					self.selectAll();
					return;
				}
				break;

			// esc: close dropdown
			case KEY_ESC:
				if (self.isOpen) {
					e.preventDefault();
					e.stopPropagation();
					self.close();
				}
				return;

			// down: open dropdown or move selection down
			case KEY_DOWN:
				if (!self.isOpen && self.hasOptions) {
					self.open();
				} else if (self.activeOption) {
					self.ignoreHover = true;
					let next = self.getAdjacent(self.activeOption, 1);
					if (next) self.setActiveOption(next, true );
				}
				e.preventDefault();
				return;

			// up: move selection up
			case KEY_UP:
				if (self.activeOption) {
					self.ignoreHover = true;
					let prev = self.getAdjacent(self.activeOption, -1);
					if (prev) self.setActiveOption(prev, true);
				}
				e.preventDefault();
				return;

			// doc_src select active option
			case KEY_RETURN:
				if (self.isOpen && self.activeOption) {
					self.onOptionSelect({delegateTarget: self.activeOption});
					e.preventDefault();
				}
				return;

			// left: modifiy item selection to the left
			case KEY_LEFT:
				self.advanceSelection(-1, e);
				return;

			// right: modifiy item selection to the right
			case KEY_RIGHT:
				self.advanceSelection(1, e);
				return;

			// tab: select active option and/or create item
			case KEY_TAB:
				if (self.settings.selectOnTab && self.isOpen && self.activeOption) {
					self.onOptionSelect({delegateTarget: self.activeOption});

					// prevent default [tab] behaviour of jump to the next field
					// if select isFull, then the dropdown won't be open and [tab] will work normally
					e.preventDefault();
				}
				if (self.settings.create && self.createItem()) {
					e.preventDefault();
				}
				return;

			// delete|backspace: delete items
			case KEY_BACKSPACE:
			case KEY_DELETE:
				self.deleteSelection(e);
				return;
		}

		if( self.isInputHidden && !self.isKeyDown(KEY_CTRL,e) ){
			e.preventDefault();
			return;
		}
	}

	/**
	 * Triggered on <input> keyup.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyUp(e) {
		var self = this;

		if (self.isLocked) return e && e.preventDefault();
		var value = self.inputValue();
		if (self.lastValue !== value) {
			self.lastValue = value;
			self.onSearchChange(value);
			self.refreshOptions();
			self.trigger('type', value);
		}
	}

	/**
	 * Invokes the user-provide option provider / loader.
	 *
	 * @param {string} value
	 */
	onSearchChange(value) {
		var self = this;
		var fn = self.settings.load;
		if (!fn) return;
		if (self.loadedSearches.hasOwnProperty(value)) return;
		self.loadedSearches[value] = true;
		self.load(function(callback) {
			fn.apply(self, [value, callback]);
		});
	}

	/**
	 * Triggered on <input> focus.
	 *
	 * @param {object} e (optional)
	 * @returns {boolean}
	 */
	onFocus(e) {
		var self = this;
		var wasFocused = self.isFocused;

		if (self.isDisabled) {
			self.blur();
			e && e.preventDefault();
			return false;
		}

		if (self.ignoreFocus) return;
		self.isFocused = true;
		if (self.settings.preload === 'focus') self.onSearchChange('');

		if (!wasFocused) self.trigger('focus');

		if (!self.activeItems.length) {
			self.showInput();
			self.setActiveItem(null);
			self.refreshOptions(!!self.settings.openOnFocus);
		}

		self.refreshState();
	}

	/**
	 * Triggered on <input> blur.
	 *
	 * @param {object} e
	 * @param {Element} dest
	 */
	onBlur(e, dest) {
		var self = this;
		if (!self.isFocused) return;
		self.isFocused = false;
		self.ignoreFocus = false;


		if (!self.ignoreBlur && document.activeElement === self.dropdown_content) {
			// necessary to prevent IE closing the dropdown when the scrollbar is clicked
			self.ignoreBlur = true;
			self.onFocus(e);
			return;
		}

		var deactivate = function() {
			self.close();
			self.setActiveItem(null);
			self.setActiveOption(null);
			self.setCaret(self.items.length);
			self.refreshState();

			// IE11 bug: element still marked as active
			dest && dest.focus && dest.focus();

			self.isBlurring = false;
			self.trigger('blur');
		};

		self.isBlurring = true;
		if (self.settings.create && self.settings.createOnBlur) {
			self.createItem(null, false, deactivate);
		} else {
			deactivate();
		}
	}

	/**
	 * Triggered when the user rolls over
	 * an option in the autocomplete dropdown menu.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onOptionHover(e) {
		if (this.ignoreHover) return;
		this.setActiveOption(e.delegateTarget, false);
	}

	/**
	 * Triggered when the user clicks on an option
	 * in the autocomplete dropdown menu.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onOptionSelect(e) {
		var value, self = this;

		if (e.preventDefault) {
			e.preventDefault();
			e.stopPropagation();
		}

		var target = e.delegateTarget;

		if( !target ){
			return;
		}

		// should not be possible to trigger a option under a disabled optgroup
		if( target.parentNode && target.parentNode.matches('[data-disabled]') ){
			return;
		}


		if( target.classList.contains('create') ){
			self.createItem(null, function() {
				if (self.settings.closeAfterSelect) {
					self.close();
				}
			});
		} else {
			value = target.dataset.value;
			if (typeof value !== 'undefined') {
				self.lastQuery = null;
				self.addItem(value);
				if (self.settings.closeAfterSelect) {
					self.close();
				} else if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
					self.setActiveOption(self.getOption(value));
				}

			}
		}
	}

	/**
	 * Triggered when the user clicks on an item
	 * that has been selected.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onItemSelect(e) {
		var self = this;

		if (self.isLocked) return;
		if (self.settings.mode === 'multi') {
			e.preventDefault();
			self.setActiveItem(e.delegateTarget, e);
		}
	}

	/**
	 * Invokes the provided method that provides
	 * results to a callback---which are then added
	 * as options to the control.
	 *
	 * @param {function} fn
	 */
	load(fn) {
		var self = this;
		addClasses(self.wrapper,self.settings.loadingClass);

		self.loading++;
		fn.call(self, function(options, optgroups) {
			self.loading = Math.max(self.loading - 1, 0);
			self.lastQuery = null;

			self.setupOptions(options,optgroups);

			self.refreshOptions(self.isFocused && !self.isInputHidden);

			if (!self.loading) {
				removeClasses(self.wrapper,self.settings.loadingClass);
			}

			self.trigger('load', options);
		});
	}


	/**
	 * Debounce the user provided load function
	 *
	 */
	loadDebounce(fn,delay){
		var timeout;
		return function() {
			var self = this;
			var args = arguments;
			if( timeout ){
				self.loading = Math.max(self.loading - 1, 0);
			}
			window.clearTimeout(timeout);
			timeout = window.setTimeout(function() {
				timeout = null;
				fn.apply(self, args);
			}, delay);
		};
	}

	/**
	 * Sets the input field of the control to the specified value.
	 *
	 * @param {string} value
	 */
	setTextboxValue(value) {
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
	 * @returns {mixed}
	 */
	getValue() {
		if( this.is_select_tag && this.input.hasAttribute('multiple')) {
			return this.items;
		} else {
			return this.items.join(this.settings.delimiter);
		}
	}

	/**
	 * Resets the selected items to the given value.
	 *
	 * @param {mixed} value
	 */
	setValue(value, silent) {
		var events = silent ? [] : ['change'];

		debounce_events(this, events, function() {
			this.clear(silent);
			this.addItems(value, silent);
		});
	}

	/**
	 * Sets the selected item.
	 *
	 * @param {object} item
	 * @param {object} e (optional)
	 */
	setActiveItem( item, e) {


		var self = this;
		var eventName;
		var i, begin, end, item, swap;
		var last;

		if (this.settings.mode === 'single') return;

		// clear the active selection
		if( !item ){
			removeClasses(this.activeItems,'active');
			this.activeItems = [];
			if (this.isFocused) {
				this.showInput();
			}
			return;
		}

		// modify selection
		eventName = e && e.type.toLowerCase();

		if (eventName === 'mousedown' && this.isKeyDown(KEY_SHIFT,e) && this.activeItems.length) {
			last	= this.getLastActive();
			begin	= Array.prototype.indexOf.call(this.control.children, last);
			end		= Array.prototype.indexOf.call(this.control.children, item);

			if (begin > end) {
				swap  = begin;
				begin = end;
				end   = swap;
			}
			for (i = begin; i <= end; i++) {
				item = this.control.children[i];
				if (this.activeItems.indexOf(item) === -1) {
					this.setActiveItemClass(item);
				}
			}
			e.preventDefault();
		} else if ((eventName === 'mousedown' && this.isKeyDown(KEY_CTRL,e) ) || (eventName === 'keydown' && this.isKeyDown(KEY_SHIFT,e))) {
			if( item.classList.contains('active') ){
				this.removeActiveItem( item );
			} else {
				this.setActiveItemClass(item);
			}
		} else {
			removeClasses(this.activeItems,'active');
			this.activeItems = [];
			this.setActiveItemClass(item);
		}

		// ensure control has focus
		this.hideInput();
		if (!this.isFocused) {
			this.focus();
		}
	}

	/**
	 * Set the active and last-active classes
	 *
	 */
	setActiveItemClass( item ){

		var last_active = this.control.querySelector('.last-active');
		if( last_active ) removeClasses(last_active,'last-active');

		addClasses(item,'active last-active');
		if( this.activeItems.indexOf(item) == -1 ){
			this.activeItems.push( item );
		}
	}

	/**
	 * Remove active item
	 *
	 */
	removeActiveItem( item ){
		var idx = this.activeItems.indexOf(item);
		this.activeItems.splice(idx, 1);
		removeClasses(item,'active');
	}


	/**
	 * Sets the selected item in the dropdown menu
	 * of available options.
	 *
	 * @param {object} option
	 * @param {boolean} scroll
	 */
	setActiveOption(option, scroll ) {
		var height_menu, height_item, y;

		if( option === this.activeOption ){
			return;
		}

		if( this.activeOption ) removeClasses(this.activeOption,'active');
		this.activeOption = null;

		if( !option ) return;

		this.activeOption = option;
		addClasses(option,'active');

		if (scroll || !isset(scroll)) {

			height_menu		= this.dropdown_content.clientHeight;
			scroll			= this.dropdown_content.scrollTop || 0;

			height_item		= this.activeOption.offsetHeight;
			y				= this.activeOption.getBoundingClientRect().top - this.dropdown_content.getBoundingClientRect().top + scroll;

			if (y + height_item > height_menu + scroll) {
				this.dropdown_content.scrollTop = y - height_menu + height_item;

			} else if (y < scroll) {
				this.dropdown_content.scrollTop = y;
			}


		}
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
	 * Hides the input element out of view, while
	 * retaining its focus.
	 */
	hideInput() {

		if( this.settings.controlInput ) return;

		this.setTextboxValue('');
		applyCSS(this.control_input, {opacity: 0, position: 'absolute', left: (this.rtl ? 10000 : -10000)+'px'} );
		this.isInputHidden = true;
	}

	/**
	 * Restores input visibility.
	 */
	showInput() {

		if( this.settings.controlInput ) return;

		applyCSS(this.control_input, {opacity: 1, position: 'relative', left: 0} );
		this.isInputHidden = false;
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
		window.setTimeout(function() {
			self.ignoreFocus = false;
			self.onFocus();
		}, 0);
	}

	/**
	 * Forces the control out of focus.
	 *
	 * @param {Element} dest
	 */
	blur(dest) {
		this.control_input.blur();
		this.onBlur(null, dest);
	}

	/**
	 * Returns a function that scores an object
	 * to show how good of a match it is to the
	 * provided query.
	 *
	 * @param {string} query
	 * @param {object} options
	 * @return {function}
	 */
	getScoreFunction(query) {
		return this.sifter.getScoreFunction(query, this.getSearchOptions());
	}

	/**
	 * Returns search options for sifter (the system
	 * for scoring and sorting results).
	 *
	 * @see https://github.com/brianreavis/sifter.js
	 * @return {object}
	 */
	getSearchOptions() {
		var settings = this.settings;
		var sort = settings.sortField;
		if (typeof sort === 'string') {
			sort = [{field: sort}];
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
	 * Returns an object containing:
	 *
	 *   - query {string}
	 *   - tokens {array}
	 *   - total {int}
	 *   - items {array}
	 *
	 * @param {string} query
	 * @returns {object}
	 */
	search(query) {
		var i, value, score, result, calculateScore;
		var self     = this;
		var settings = self.settings;
		var options  = this.getSearchOptions();

		// validate user-provided result scoring function
		if (settings.score) {
			calculateScore = self.settings.score.call(this, query);
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
	 * @param {boolean} triggerDropdown
	 */
	refreshOptions(triggerDropdown) {
		var i, j, k, n, groups, groups_order, optgroup, optgroups, html, has_create_option;
		var active, active_before, create;

		if (typeof triggerDropdown === 'undefined') {
			triggerDropdown = true;
		}



		var self					= this;
		var query					= self.inputValue();
		var results					= self.search(query);
		var active_before_hash		= self.activeOption && hash_key(self.activeOption.dataset.value);
		var show_dropdown			= false;


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
					option_el = option_el.cloneNode(true);
					removeClasses(option_el,'active');
				}

				groups[optgroup].appendChild(option_el);
			}
		}

		// sort optgroups
		if (this.settings.lockOptgroupOrder) {
			groups_order.sort(function(a, b) {
				var a_order = self.optgroups[a].$order || 0;
				var b_order = self.optgroups[b].$order || 0;
				return a_order - b_order;
			});
		}

		// render optgroup headers & join groups
		html = document.createDocumentFragment();
		for (i = 0, n = groups_order.length; i < n; i++) {
			optgroup = groups_order[i];
			if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].children.length) {

				let group_options = document.createDocumentFragment();
				group_options.appendChild(self.render('optgroup_header', self.optgroups[optgroup]));
				group_options.appendChild(groups[optgroup]);

				let group_html = self.render('optgroup', {group:self.optgroups[optgroup],options:group_options} );

				html.appendChild(group_html);

			} else {
				html.appendChild(groups[optgroup]);
			}
		}

		self.dropdown_content.innerHTML = '';
		self.dropdown_content.appendChild(html);

		// highlight matching terms inline
		if (self.settings.highlight) {
			removeHighlight( self.dropdown_content );
			if (results.query.length && results.tokens.length) {
				for (i = 0, n = results.tokens.length; i < n; i++) {
					highlight( self.dropdown_content, results.tokens[i].regex);
				}
			}
		}

		// add "selected" class to selected options
		if (!self.settings.hideSelected) {
			for (i = 0, n = self.items.length; i < n; i++) {
				let option = self.getOption(self.items[i])
				if( option ){
					addClasses(option,'selected');
				}
			}
		}

		// helper method for adding templates to dropdown
		var add_template = function(template){
			show_dropdown = true;
			let content = self.render(template,{input:query});
			self.dropdown_content.insertBefore(content, self.dropdown_content.firstChild);
			return content;
		};

		// add loading message
		if( self.loading ){
			add_template('loading');

		// add no_results message
		}else if( results.items.length === 0 && self.settings.render['no_results']  && query.length ){
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

				active_before = active_before_hash && self.getOption(active_before_hash);

				if( active_before && self.dropdown_content.contains(active_before) ){
					active = active_before;

				}else if (self.settings.mode === 'single' && self.items.length ){
					active = self.getOption(self.items[0]);

				}else{

					let active_index = 0;
					if( create && !self.settings.addPrecedence ){
						active_index = 1;
					}
					active = self.selectable()[active_index];
				}

			}else{
				active = create;
			}

			self.setActiveOption(active);
			if( triggerDropdown && !self.isOpen ){ self.open(); }

		}else{
			self.setActiveOption(null);
			if( triggerDropdown && self.isOpen ){ self.close(); }
		}
	}

	/**
	 * Return list of selectable options
	 *
	 */
	selectable(){
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
	 * @param {object|array} data
	 */
	addOption(data) {
		var i, n, value, self = this;

		if (Array.isArray(data)) {
			for (i = 0, n = data.length; i < n; i++) {
				self.addOption(data[i]);
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
	 * @param {object} data
	 * @return {boolean|string}
	 */
	registerOption(data) {
		var key = hash_key(data[this.settings.valueField]);
		if (typeof key === 'undefined' || key === null || this.options.hasOwnProperty(key)) return false;
		data.$order = data.$order || ++this.order;
		this.options[key] = data;
		return key;
	}

	/**
	 * Registers an option group to the pool of option groups.
	 *
	 * @param {object} data
	 * @return {boolean|string}
	 */
	registerOptionGroup(data) {
		var key = hash_key(data[this.settings.optgroupValueField]);
		if (!key) return false;

		data.$order = data.$order || ++this.order;
		this.optgroups[key] = data;
		return key;
	}

	/**
	 * Registers a new optgroup for options
	 * to be bucketed into.
	 *
	 * @param {string} id
	 * @param {object} data
	 */
	addOptionGroup(id, data) {
		data[this.settings.optgroupValueField] = id;
		if (id = this.registerOptionGroup(data)) {
			this.trigger('optgroup_add', id, data);
		}
	}

	/**
	 * Removes an existing option group.
	 *
	 * @param {string} id
	 */
	removeOptionGroup(id) {
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
	 * @param {string} value
	 * @param {object} data
	 */
	updateOption(value, data) {
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
		cache_items = self.renderCache['item'];
		cache_options = self.renderCache['option'];

		if (cache_items) {
			delete cache_items[value];
			delete cache_items[value_new];
		}
		if (cache_options) {
			delete cache_options[value];
			delete cache_options[value_new];
		}

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
	 * @param {string} value
	 * @param {boolean} silent
	 */
	removeOption(value, silent) {
		var self = this;
		value = hash_key(value);

		var cache_items = self.renderCache['item'];
		var cache_options = self.renderCache['option'];
		if (cache_items) delete cache_items[value];
		if (cache_options) delete cache_options[value];

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
		var selected			= {};
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
	 * Returns the dom element of the option
	 * matching the given value.
	 *
	 * @param {string} value
	 * @returns {object}
	 */
	getOption(value) {

		// cached ?
		if( this.renderCache['option'].hasOwnProperty(value) ){
			return this.renderCache['option'][value];
		}

		// from existing dropdown menu dom
		return this.getElementWithValue(value, this.selectable());
	}

	/**
	 * Returns the dom element of the next or previous dom element of the same type
	 *
	 * @param {object} option
	 * @param {int} direction  can be 1 for next or -1 for previous
	 * @param {string} type
	 * @return {object|undefined}
	 */
	getAdjacent( option, direction, type = 'option' ){

		if( !option ){
			return;
		}

		var self		= this;
		var type_class	= self.settings.optionClass;
		var parent		= self.dropdown;

		if( type == 'item' ){
			parent		= self.control;
			type_class	= self.settings.itemClass;
		}

		var all			= parent.querySelectorAll('.'+type_class);
		for( let i = 0; i < all.length; i++ ){
			if( all[i] != option ){
				continue;
			}

			if( direction > 0 ){
				return all[i+1];
			}

			return all[i-1];
		}
	}

	/**
	 * Finds the first element with a "data-value" attribute
	 * that matches the given value.
	 *
	 * @param {mixed} value
	 * @param {object} els
	 * @return {object}
	 */
	getElementWithValue(value, els) {
		value = hash_key(value);

		if (typeof value !== 'undefined' && value !== null) {
			for (var i = 0, n = els.length; i < n; i++) {
				if (els[i].getAttribute('data-value') === value) {
					return els[i];
				}
			}
		}
	}

	/**
	 * Returns the dom element of the item
	 * matching the given value.
	 *
	 * @param {string} value
	 * @returns {object}
	 */
	getItem(value) {
		return this.getElementWithValue(value, this.control.children);
	}

	/**
	 * "Selects" multiple items at once. Adds them to the list
	 * at the current caret position.
	 *
	 * @param {string} value
	 * @param {boolean} silent
	 */
	addItems(values, silent) {
		this.buffer = document.createDocumentFragment();

		var children = this.control.children;
		for (var i = 0; i < children.length; i++) {
			this.buffer.appendChild(children[i]);
		}

		var items = Array.isArray(values) ? values : [values];
		for (var i = 0, n = items.length; i < n; i++) {
			this.isPending = (i < n - 1);
			this.addItem(items[i], silent);
		}

		var control = this.control;
		control.insertBefore(this.buffer, control.firstChild);

		this.buffer = null;
	}

	/**
	 * "Selects" an item. Adds it to the list
	 * at the current caret position.
	 *
	 * @param {string} value
	 * @param {boolean} silent
	 */
	addItem(value, silent) {
		var events = silent ? [] : ['change'];

		debounce_events(this, events, function() {
			var item;
			var self = this;
			var inputMode = self.settings.mode;
			var i, active, wasFull;
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

			if( this.control.contains(item) ){ // duplicates
				item = item.cloneNode(true);
			}

			wasFull = self.isFull();
			self.items.splice(self.caretPos, 0, value);
			self.insertAtCaret(item);
			if (!self.isPending || (!wasFull && self.isFull())) {
				self.refreshState();
			}

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
		});
	}

	/**
	 * Removes the selected item matching
	 * the provided value.
	 *
	 * @param {string} value
	 */
	removeItem(value, silent) {
		var i, idx;

		var item	= this.getItem(value);

		if( !item ) return;

		value		= hash_key(item.dataset.value);
		i			= this.items.indexOf(value);

		if (i !== -1) {
			item.remove();
			if( item.classList.contains('active') ){
				idx = this.activeItems.indexOf(item);
				this.activeItems.splice(idx, 1);
				removeClasses(item,'active');
			}

			this.items.splice(i, 1);
			this.lastQuery = null;
			if (!this.settings.persist && this.userOptions.hasOwnProperty(value)) {
				this.removeOption(value, silent);
			}

			if (i < this.caretPos) {
				this.setCaret(this.caretPos - 1);
			}

			this.refreshState();
			this.updateOriginalInput({silent: silent});
			this.positionDropdown();
			this.trigger('item_remove', value, item);
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
	 * @param {string} value
	 * @param {boolean} [triggerDropdown]
	 * @param {function} [callback]
	 * @return {boolean}
	 */
	createItem(input, triggerDropdown) {
		var self  = this;
		var caret = self.caretPos;
		var output;
		input = input || self.inputValue();

		var callback = arguments[arguments.length - 1];
		if (typeof callback !== 'function') callback = function() {};

		if (typeof triggerDropdown !== 'boolean') {
			triggerDropdown = true;
		}

		if (!self.canCreate(input)) {
			callback();
			return false;
		}

		self.lock();

		var created = false;
		var create = function(data) {
			self.unlock();

			if (!data || typeof data !== 'object') return callback();
			var value = hash_key(data[self.settings.valueField]);
			if( typeof value !== 'string' ){
				return callback();
			}

			self.setTextboxValue('');
			self.addOption(data);
			self.setCaret(caret);
			self.addItem(value);
			self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
			callback(data);
			created = true;
		};

		if( typeof self.settings.create === 'function' ){
			output = self.settings.create.apply(this, [input, create]);
		}else{
			output = {};
			output[self.settings.labelField] = input;
			output[self.settings.valueField] = input;
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
		this.lastQuery = null;

		if (this.isSetup) {
			this.addItem(this.items);
		}

		this.refreshState();
		this.updateOriginalInput();
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
		if (!this.isRequired) return false;

		var invalid = !this.items.length;

		this.isInvalid = invalid;
		this.control_input.required = invalid;
		this.input.required = !invalid;
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
	 */
	updateOriginalInput(opts) {
		var i, n, options, label, self = this;
		opts = opts || {};

		if( self.is_select_tag ){
			options = [];
			for (i = 0, n = self.items.length; i < n; i++) {
				label = self.options[self.items[i]][self.settings.labelField] || '';
				options.push('<option value="' + escape_html(self.items[i]) + '" selected="selected">' + escape_html(label) + '</option>');
			}
			if (!options.length && !this.input.hasAttribute('multiple')) {
				options.push('<option value="" selected="selected"></option>');
			}
			self.input.innerHTML = options.join('');
		} else {
			self.input.value = self.getValue();
			self.input.setAttribute('value',self.input.value);
		}

		if (self.isSetup) {
			if (!opts.silent) {
				self.trigger('change', self.input.value );
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
		self.focus();
		self.isOpen = true;
		self.refreshState();
		applyCSS(self.dropdown,{visibility: 'hidden', display: 'block'});
		self.positionDropdown();
		applyCSS(self.dropdown,{visibility: 'visible', display: 'block'});
		self.trigger('dropdown_open', self.dropdown);
	}

	/**
	 * Closes the autocomplete dropdown menu.
	 */
	close() {
		var self = this;
		var trigger = self.isOpen;

		if (self.settings.mode === 'single' && self.items.length) {
			self.hideInput();

			// Do not trigger blur while inside a blur event,
			// this fixes some weird tabbing behavior in FF and IE.
			// See #1164
			if (!self.isBlurring) {
				self.blur(); // close keyboard on iOS
			}
		}

		self.isOpen = false;
		applyCSS(self.dropdown,{display: 'none'});
		self.setActiveOption(null);
		self.refreshState();

		if (trigger) self.trigger('dropdown_close', self.dropdown);
	}

	/**
	 * Calculates and applies the appropriate
	 * position of the dropdown.
	 */
	positionDropdown() {
		var left			= 0;
		var context			= this.control;
		var top				= context.offsetHeight;

		if( this.settings.dropdownParent === 'body' ){

			let rect		= context.getBoundingClientRect();
			top				+= rect.top  + window.scrollY;
			left			= rect.left + window.scrollX;


		}else if( this.settings.dropdownParent ){
			context			= getDom(this.settings.dropdownParent);
			top				= context.offsetHeight;

		}else{
			top				+= context.offsetTop;
			left			= context.offsetLeft;
		}

		applyCSS(this.dropdown,{
			width : context.getBoundingClientRect().width + 'px',
			top   : top + 'px',
			left  : left + 'px'
		});

	}

	/**
	 * Resets / clears all selected items
	 * from the control.
	 *
	 * @param {boolean} silent
	 */
	clear(silent) {

		if (!this.items.length) return;

		var items = this.controlChildren();
		for( let i = 0; i < items.length; i++){
			items[i].remove();
		}

		this.items = [];
		this.lastQuery = null;
		this.setCaret(0);
		this.setActiveItem(null);
		this.updateOriginalInput({silent: silent});
		this.refreshState();
		this.showInput();
		this.trigger('clear');
	}

	/**
	 * A helper method for inserting an element
	 * at the current caret position.
	 *
	 * @param {object} el
	 */
	insertAtCaret(el) {
		var caret	= Math.min(this.caretPos, this.items.length);
		var target	= this.buffer || this.control;

		if (caret === 0) {
			target.insertBefore(el, target.firstChild);
		} else {
			target.insertBefore(el, target.children[caret]);
		}

		this.setCaret(caret + 1);
	}

	/**
	 * Removes the current selected item(s).
	 *
	 * @param {object} e (optional)
	 * @returns {boolean}
	 */
	deleteSelection(e) {
		var i, n, direction, selection, values, caret, tail;
		var self = this;

		direction = (e && e.keyCode === KEY_BACKSPACE) ? -1 : 1;
		selection = getSelection(self.control_input);


		// determine items that will be removed
		values = [];

		if (self.activeItems.length) {

			tail = getTail(self.activeItems, direction);
			caret = nodeIndex(tail);

			if (direction > 0) { caret++; }

			for (i = 0, n = self.activeItems.length; i < n; i++) {
				values.push( self.activeItems[i].dataset.value );
			}
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
		} else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
			if (direction < 0 && selection.start === 0 && selection.length === 0) {
				values.push(self.items[self.caretPos - 1]);
			} else if (direction > 0 && selection.start === self.inputValue().length) {
				values.push(self.items[self.caretPos]);
			}
		}

		// allow the callback to abort
		if (!values.length || (typeof self.settings.onDelete === 'function' && self.settings.onDelete.apply(self, [values,e]) === false)) {
			return false;
		}

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
	 * @param {int} direction
	 * @param {object} e (optional)
	 */
	advanceSelection(direction, e) {
		var selection, idx, last_active;

		if (direction === 0) return;
		if (this.rtl) direction *= -1;


		// add or remove to active items
		if( this.isKeyDown(KEY_CTRL,e) || this.isKeyDown(KEY_SHIFT,e) ){

			last_active			= this.getLastActive(direction);
			let adjacent		= this.getAdjacent(last_active,direction,'item');
			if( adjacent ){
				if( adjacent.classList.contains('active') ){
					this.removeActiveItem(last_active);
				}
				this.setActiveItemClass(adjacent); // mark as last_active !! after removeActiveItem() on last_active
			}

		// move caret to the left or right
		}else if (this.isFocused && !this.isInputHidden) {

			if( !this.inputValue().length ){
				this.setCaret(this.caretPos + direction);
			}

		// move caret before or after selected items
		} else {

			last_active		= this.getLastActive(direction);
			if( last_active ){
				idx = nodeIndex(last_active);
				this.setCaret(direction > 0 ? idx + 1: idx);
				this.setActiveItem(null);
			}
		}
	}

	/**
	 * Get the last active item
	 *
	 */
	getLastActive(direction){

		let last_active = this.control.querySelector('.last-active');
		if( last_active ){
			return last_active;
		}

		return querySelectorEnd(this.control,'.active',direction);
	}


	/**
	 * Moves the caret to the specified index.
	 *
	 * @param {int} i
	 */
	setCaret(i) {
		var self = this;

		if( self.settings.mode === 'single' || self.settings.controlInput ) {
			i = self.items.length;
		} else {
			i = Math.max(0, Math.min(self.items.length, i));
		}

		if (!self.settings.controlInput && !self.isPending) {
			// the input must be moved by leaving it in place and moving the
			// siblings, due to the fact that focus cannot be restored once lost
			// on mobile webkit devices
			var j, child,
			children = this.controlChildren(),
			n = children.length;

			for( j = 0; j < n; j++ ){
				child = children[j];

				if( j < i ){
					self.control_input.insertAdjacentElement('beforebegin', child );
				} else {
					self.control.appendChild(child);
				}
			}
		}

		self.caretPos = i;
	}

	/**
	 * Return list of item dom elements
	 *
	 */
	controlChildren(){
		return Array.prototype.filter.call( this.control.children, node => node.nodeName !== 'INPUT' );
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
		this.input.disabled				= true;
		this.control_input.disabled		= true;
		this.control_input.tabIndex		= -1;
		this.isDisabled					= true;
		this.lock();
	}

	/**
	 * Enables the control so that it can respond
	 * to focus and user input.
	 */
	enable() {
		this.input.disabled				= false;
		this.control_input.disabled		= false;
		this.control_input.tabIndex		= this.tabIndex;
		this.isDisabled					= false;
		this.unlock();
	}

	/**
	 * Completely destroys the control and
	 * unbinds all event listeners so that it can
	 * be garbage collected.
	 */
	destroy() {
		var revertSettings = this.revertSettings;

		this.trigger('destroy');
		this.off();
		this.wrapper.remove();
		this.dropdown.remove();

		this.input.innerHTML = '';
		if( revertSettings.tabindex ){
			this.input.setAttribute('tabindex', revertSettings.tabindex );
		}else{
			this.input.removeAttribute('tabindex' );
		}

		removeClasses(this.input,'tomselected');
		this.input.removeAttribute('hidden');

		for( let i = 0; i < revertSettings.children.length; i++ ){
			this.input.appendChild( revertSettings.children[i] );
		}

		this._destroy();

		delete this.input.tomselect;
	}

	/**
	 * A helper method for rendering "item" and
	 * "option" templates, given the data.
	 *
	 * @param {string} templateName
	 * @param {object} data
	 * @returns {Element}
	 */
	render(templateName, data) {
		var value, id, label;
		var html = '';
		var self = this;
		var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;

		if (templateName === 'option' || templateName === 'item') {
			value = hash_key(data[self.settings.valueField]);

			// pull markup from cache if it exists
			if( self.renderCache[templateName].hasOwnProperty(value) ){
				return self.renderCache[templateName][value];
			}

		}


		// render markup
		html = getDom( self.settings.render[templateName].apply(this, [data, escape_html]) );

		// add mandatory attributes
		if (templateName === 'option' || templateName === 'option_create') {
			if (!data[self.settings.disabledField]) {
				html.setAttribute('data-selectable', '');
			}

		}else if (templateName === 'optgroup') {
			id = data.group[self.settings.optgroupValueField];
			html.setAttribute('data-group', id);
			if(data.group[self.settings.disabledField]) {
				html.setAttribute('data-disabled', '');
			}
		}

		if (templateName === 'option' || templateName === 'item') {
			html.setAttribute('data-value', value );

			// make sure we have some classes if a template is overwritten
			if( templateName === 'item' ){
				addClasses(html,self.settings.itemClass);
			}else{
				addClasses(html,self.settings.optionClass);
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
	 * @param {string} templateName
	 */
	clearCache(templateName) {
		var self = this;
		if (typeof templateName === 'undefined') {
			self.renderCache = {'item':{},'option':{}};
		} else {
			self.renderCache[templateName] = {};
		}
	}

	/**
	 * Determines whether or not to display the
	 * create item prompt, given a user input.
	 *
	 * @param {string} input
	 * @return {boolean}
	 */
	canCreate(input) {
		if (!this.settings.create) return false;
		var filter = this.settings.createFilter;

		return input.length
			&& (typeof filter !== 'function' || filter.call(this, input))
			&& (!(filter instanceof RegExp) || filter.test(input));
	}


	/**
	 * Return true if the requested key is down
	 * Will return false if more than one control character is pressed ( when [ctrl+shift+a] != [ctrl+a] )
	 * The current evt may not always set ( eg calling advanceSelection() )
	 *
	 */
	isKeyDown( key_code, evt ){

		if( !evt ){
			return false;
		}

		if( evt.altKey ){
			return false;
		}

		// if [ctrl+shift], return false
		if( evt[KEY_CTRL_NAME] && evt.shiftKey ){
			return false;
		}

		if( key_code == KEY_CTRL && evt[KEY_CTRL_NAME] ){
			return true;
		}

		if( key_code == KEY_SHIFT && evt.shiftKey ){
			return true;
		}

		return false;
	}

	/**
	 * Wraps this.`method` so that `new_fn` can be invoked 'before', 'after', or 'instead' of the original method
	 *
	 * this.hook('instead','onKeyDown',function( arg1, arg2 ...){
	 *
	 * });
	 *
	 * @param {string} method
	 * @param {string} when
	 * @param {function} new_fn
	 */
	hook( when, method, new_fn ){
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

// mixins
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

if( typeof MicroPlugin === "undefined"){
	throw 'Dependency MicroPlugin is missing. Make sure you either: (1) are using the "complete" version of Tom Select, or (2) require MicroPlugin before you load Tom Select.';
}

MicroPlugin.mixin(TomSelect);
