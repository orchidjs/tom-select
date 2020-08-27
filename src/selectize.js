var Selectize = function( input, settings ){
	var i, n, dir, self = this;

	input				= getDom( input );
	input.selectize		= self;
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
		tagType          : input.tagName.toLowerCase() === 'select' ? TAG_SELECT : TAG_INPUT,
		rtl              : /rtl/i.test(dir),

		eventNS          : '.selectize' + (++Selectize.count),
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
		keysDown         : {},
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
		renderCache      : {},
		onSearchChange   : settings.loadThrottle === null ? self.onSearchChange : debounce(self.onSearchChange, settings.loadThrottle)
	});


	// search system
	self.sifter = new Sifter(this.options, {diacritics: settings.diacritics});

	// build options table
	if (self.settings.options) {
		for (i = 0, n = self.settings.options.length; i < n; i++) {
			self.registerOption(self.settings.options[i]);
		}
		delete self.settings.options;
	}

	// build optgroup table
	if (self.settings.optgroups) {
		for (i = 0, n = self.settings.optgroups.length; i < n; i++) {
			self.registerOptionGroup(self.settings.optgroups[i]);
		}
		delete self.settings.optgroups;
	}

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
};

// mixins
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

MicroEvent.mixin(Selectize);

if(typeof MicroPlugin !== "undefined"){
	MicroPlugin.mixin(Selectize);
}else{
	logError("Dependency MicroPlugin is missing",
		{explanation:
			"Make sure you either: (1) are using the \"standalone\" "+
			"version of Selectize, or (2) require MicroPlugin before you "+
			"load Selectize."}
	);
}


// methods
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Object.assign(Selectize.prototype, {

	/**
	 * Creates all elements and sets up event bindings.
	 *
	 */
	setup: function() {
		var self      = this;
		var settings  = self.settings;
		var eventNS   = self.eventNS;
		var $window   = $(window);
		var $document = $(document);

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

		inputMode         = self.settings.mode;
		classes           = self.input.getAttribute('class') || '';

		wrapper				= htmlToElement('<div>');
		addClasses( wrapper, settings.wrapperClass, classes, inputMode);


		control				= htmlToElement('<div class="items">');
		addClasses(control,settings.inputClass);
		wrapper.append(control);



		dropdown			= htmlToElement('<div style="display:none">');
		addClasses(dropdown, settings.dropdownClass, inputMode);


		dropdown_content	= htmlToElement('<div style="scroll-behavior: smooth;">')
		addClasses(dropdown_content, settings.dropdownContentClass);
		dropdown.append(dropdown_content);

		getDom( settings.dropdownParent || wrapper ).appendChild( dropdown );

		control_input		= htmlToElement( settings.controlInput || '<input type="text" autocomplete="off" />' );

		if( !settings.controlInput ){
			control_input.setAttribute('tabindex', self.input.disabled ? '-1' : self.tabIndex);
			control.appendChild( control_input );
		}



		if( inputId = self.input.getAttribute('id') ){
			control_input.setAttribute('id', inputId + '-selectized');
			var label = document.querySelector("label[for='"+inputId+"']");
			if( label ) label.setAttribute('for', inputId + '-selectized');
		}

		if(self.settings.copyClassesToDropdown) {
			addClasses( dropdown, classes);
		}

		wrapper.style.width = self.input.style.width;

		if (self.plugins.names.length) {
			classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
			addClasses( wrapper, classes_plugins);
			addClasses( dropdown, classes_plugins );
		}

		if ((settings.maxItems === null || settings.maxItems > 1) && self.tagType === TAG_SELECT) {
			self.input.setAttribute('multiple','multiple');
		}

		if (self.settings.placeholder) {
			control_input.setAttribute('placeholder', settings.placeholder);
		}

		// if splitOn was not passed in, construct it from the delimiter to allow pasting universally
		if (!self.settings.splitOn && self.settings.delimiter) {
			var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
			self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
		}

		if( self.input.getAttribute('autocorrect') ){
			control_input.setAttribute('autocorrect', self.input.getAttribute('autocorrect') );
		}

		if( self.input.getAttribute('autocapitalize') ){
			control_input.setAttribute('autocapitalize', self.input.getAttribute('autocapitalize'));
		}
		control_input.type		= self.input.type;

		self.$control          = $(control);

		self.control			= control;
		self.control_input		= control_input;
		self.wrapper			= wrapper;
		self.dropdown			= dropdown;
		self.dropdown_content	= dropdown_content;


		onEvent(dropdown, 'mouseenter', '[data-selectable]', function() { return self.onOptionHover.apply(self, arguments); });
		onEvent(dropdown, 'mousedown click', '[data-selectable]', function() { return self.onOptionSelect.apply(self, arguments); });

		control.addEventListener('mousedown', function(evt){

			var target_match = targetMatch( evt, '.item', control);
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




		$document.on('keydown' + eventNS, function(e) {

			switch( e.keyCode ){
				case KEY_CTRL:
				case KEY_SHIFT:
				case KEY_CMD:
					self.hideInput();
					self.keysDown[e.keyCode] = true;
			}
		});

		$document.on('keyup' + eventNS, function(e) {

			switch( e.keyCode ){
				case KEY_CTRL:
				case KEY_SHIFT:
				case KEY_CMD:
					delete self.keysDown[e.keyCode];
			}

			if( isEmptyObject(self.keysDown) ){
				self.showInput();
			}

		});

		$document.on('mousedown' + eventNS, function(e) {
			if (self.isFocused) {
				// prevent events on the dropdown scrollbar from causing the control to blur
				if (e.target === self.dropdown || e.target.parentNode === self.dropdown) {
					return false;
				}
				// blur on click outside
				if (!self.$control.has(e.target).length && e.target !== self.control ){
					self.blur(e.target);
				}
			}
		});

		$window.on(['scroll' + eventNS, 'resize' + eventNS].join(' '), function() {
			if (self.isOpen) {
				self.positionDropdown.apply(self, arguments);
			}
		});
		$window.on('mousemove' + eventNS, function() {
			self.ignoreHover = false;
		});

		// store original children and tab index so that they can be
		// restored when the destroy() method is called.
		var children = [];
		while( self.input.children.length > 0 ){
			children.push( self.input.children[0] );
			self.input.children[0].remove();
		}
		this.revertSettings = {
			children : children,
			tabindex  : self.input.getAttribute('tabindex')
		};


		self.input.setAttribute('tabindex',-1)
		self.input.setAttribute('hidden','hidden');
		self.input.insertAdjacentElement('afterend', self.wrapper);

		if (Array.isArray(settings.items)) {
			self.setValue(settings.items);
			delete settings.items;
		}

		// feature detect for the validation API
		if( self.supportsValidity() ){
			self.input.addEventListener('invalid' + eventNS, function(e) {
				e.preventDefault();
				self.isInvalid = true;
				self.refreshState();
			});
		}

		self.updateOriginalInput();
		self.refreshItems();
		self.refreshState();
		self.isSetup = true;

		if( self.input.disabled ){
			self.disable();
		}

		self.on('change', this.onChange);

		self.input.dataset.selectize = self;
		addClasses(self.input,'selectized');
		self.trigger('initialize');

		// preload options
		if (settings.preload === true) {
			self.onSearchChange('');
		}

	},

	supportsValidity: function(){
		return !/android/i.test(window.navigator.userAgent) && !!document.createElement('input').validity;
	},

	/**
	 * Sets up default rendering functions.
	 */
	setupTemplates: function() {
		var self = this;
		var field_label = self.settings.labelField;
		var field_optgroup = self.settings.optgroupLabelField;

		var templates = {
			'optgroup': function(data) {
				return '<div class="optgroup">' + data.html + '</div>';
			},
			'optgroup_header': function(data, escape) {
				return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
			},
			'option': function(data, escape) {
				return '<div class="option">' + escape(data[field_label]) + '</div>';
			},
			'item': function(data, escape) {
				return '<div class="item">' + escape(data[field_label]) + '</div>';
			},
			'option_create': function(data, escape) {
				return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
			}
		};


		self.settings.render = Object.assign({}, templates, self.settings.render);
	},

	/**
	 * Maps fired events to callbacks provided
	 * in the settings used when creating the control.
	 */
	setupCallbacks: function() {
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
			if (callbacks.hasOwnProperty(key)) {
				fn = this.settings[callbacks[key]];
				if (fn) this.on(key, fn);
			}
		}
	},

	/**
	 * Triggered when the main control element
	 * has a click event.
	 *
	 * @param {object} e
	 * @return {boolean}
	 */
	onClick: function(e) {
		var self = this;

		// necessary for mobile webkit devices (manual focus triggering
		// is ignored unless invoked within a click event)
    // also necessary to reopen a dropdown that has been closed by
    // closeAfterSelect
		if (!self.isFocused || !self.isOpen) {
			self.focus();
			e.preventDefault();
		}
	},

	/**
	 * Triggered when the main control element
	 * has a mouse down event.
	 *
	 * @param {object} e
	 * @return {boolean}
	 */
	onMouseDown: function(e) {
		var self = this;
		var defaultPrevented = false; //e.isDefaultPrevented();
		//console.log('default prevented',defaultPrevented);

		if (self.isFocused) {
			// retain focus by preventing native handling. if the
			// event target is the input it should not be modified.
			// otherwise, text selection within the input won't work.
			if (e.target !== self.control_input) {
				if (self.settings.mode === 'single') {
					// toggle dropdown
					self.isOpen ? self.close() : self.open();
				} else if (!defaultPrevented) {
					self.setActiveItem(null);
				}
				return false;
			}
		} else {
			// give control focus
			if (!defaultPrevented) {
				window.setTimeout(function() {
					self.focus();
				}, 0);
			}
		}
	},

	/**
	 * Triggered when the value of the control has been changed.
	 * This should propagate the event to the original DOM
	 * input / select element.
	 */
	onChange: function() {
		triggerEvent(this.input, 'change');
	},

	/**
	 * Triggered on <input> paste.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onPaste: function(e) {
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
				var pastedText = self.control_input.value;
				if(!pastedText.match(self.settings.splitOn)){ return }

				var splitInput = pastedText.trim().split(self.settings.splitOn);
				for (var i = 0, n = splitInput.length; i < n; i++) {
					self.createItem(splitInput[i]);
				}
			}, 0);
		}
	},

	/**
	 * Triggered on <input> keypress.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyPress: function(e) {
		if (this.isLocked) return e && e.preventDefault();
		var character = String.fromCharCode(e.keyCode || e.which);
		if (this.settings.create && this.settings.mode === 'multi' && character === this.settings.delimiter) {
			this.createItem();
			e.preventDefault();
			return false;
		}
	},

	/**
	 * Triggered on <input> keydown.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyDown: function(e) {
		var isInput = e.target === this.control_input;
		var self = this;

		if (self.isLocked) {
			if (e.keyCode !== KEY_TAB) {
				e.preventDefault();
			}
			return;
		}

		switch (e.keyCode) {
			case KEY_A:
				if (self.isKeyDown(KEY_CMD,e) ) {
					self.selectAll();
					return;
				}
				break;
			case KEY_ESC:
				if (self.isOpen) {
					e.preventDefault();
					e.stopPropagation();
					self.close();
				}
				return;
			case KEY_N:
				if (!e.ctrlKey || e.altKey) break;
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
			case KEY_P:
				if (!e.ctrlKey || e.altKey) break;
			case KEY_UP:
				if (self.activeOption) {
					self.ignoreHover = true;
					let prev = self.getAdjacent(self.activeOption, -1);
					if (prev) self.setActiveOption(prev, true);
				}
				e.preventDefault();
				return;
			case KEY_RETURN:
				if (self.isOpen && self.activeOption) {
					self.onOptionSelect({delegateTarget: self.activeOption});
					e.preventDefault();
				}
				return;
			case KEY_LEFT:
				self.advanceSelection(-1, e);
				return;
			case KEY_RIGHT:
				self.advanceSelection(1, e);
				return;
			case KEY_TAB:
				if (self.settings.selectOnTab && self.isOpen && self.activeOption) {
					self.onOptionSelect({delegateTarget: self.activeOption});

					// Default behaviour is to jump to the next field, we only want this
					// if the current field doesn't accept any more entries
					if (!self.isFull()) {
						e.preventDefault();
					}
				}
				if (self.settings.create && self.createItem()) {
					e.preventDefault();
				}
				return;
			case KEY_BACKSPACE:
			case KEY_DELETE:
				self.deleteSelection(e);
				return;
		}

		if( self.isInputHidden && !(IS_MAC ? e.metaKey : e.ctrlKey)) {
			e.preventDefault();
			return;
		}
	},

	/**
	 * Triggered on <input> keyup.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onKeyUp: function(e) {
		var self = this;

		if (self.isLocked) return e && e.preventDefault();
		var value = self.control_input.value || '';
		if (self.lastValue !== value) {
			self.lastValue = value;
			self.onSearchChange(value);
			self.refreshOptions();
			self.trigger('type', value);
		}
	},

	/**
	 * Invokes the user-provide option provider / loader.
	 *
	 * Note: this function is debounced in the Selectize
	 * constructor (by `settings.loadThrottle` milliseconds)
	 *
	 * @param {string} value
	 */
	onSearchChange: function(value) {
		var self = this;
		var fn = self.settings.load;
		if (!fn) return;
		if (self.loadedSearches.hasOwnProperty(value)) return;
		self.loadedSearches[value] = true;
		self.load(function(callback) {
			fn.apply(self, [value, callback]);
		});
	},

	/**
	 * Triggered on <input> focus.
	 *
	 * @param {object} e (optional)
	 * @returns {boolean}
	 */
	onFocus: function(e) {
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
	},

	/**
	 * Triggered on <input> blur.
	 *
	 * @param {object} e
	 * @param {Element} dest
	 */
	onBlur: function(e, dest) {
		var self = this;
		if (!self.isFocused) return;
		self.isFocused = false;

		if (self.ignoreFocus) {
			return;
		} else if (!self.ignoreBlur && document.activeElement === self.dropdown_content) {
			// necessary to prevent IE closing the dropdown when the scrollbar is clicked
			self.ignoreBlur = true;
			self.onFocus(e);
			return;
		}

		var deactivate = function() {
			self.close();
			self.setTextboxValue('');
			self.setActiveItem(null);
			self.setActiveOption(null);
			self.setCaret(self.items.length);
			self.refreshState();

			// IE11 bug: element still marked as active
			dest && dest.focus && dest.focus();

			self.isBlurring = false;
			self.ignoreFocus = false;
			self.trigger('blur');
		};

		self.isBlurring = true;
		self.ignoreFocus = true;
		if (self.settings.create && self.settings.createOnBlur) {
			self.createItem(null, false, deactivate);
		} else {
			deactivate();
		}
	},

	/**
	 * Triggered when the user rolls over
	 * an option in the autocomplete dropdown menu.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onOptionHover: function(e) {
		if (this.ignoreHover) return;
		this.setActiveOption(e.currentTarget, false);
	},

	/**
	 * Triggered when the user clicks on an option
	 * in the autocomplete dropdown menu.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onOptionSelect: function(e) {
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
	},

	/**
	 * Triggered when the user clicks on an item
	 * that has been selected.
	 *
	 * @param {object} e
	 * @returns {boolean}
	 */
	onItemSelect: function(e) {
		var self = this;

		if (self.isLocked) return;
		if (self.settings.mode === 'multi') {
			e.preventDefault();
			self.setActiveItem(e.delegateTarget, e);
		}
	},

	/**
	 * Invokes the provided method that provides
	 * results to a callback---which are then added
	 * as options to the control.
	 *
	 * @param {function} fn
	 */
	load: function(fn) {
		var self = this;
		self.wrapper.classList.add(self.settings.loadingClass);

		self.loading++;
		fn.apply(self, [function(results) {
			self.loading = Math.max(self.loading - 1, 0);
			if (results && results.length) {
				self.addOption(results);
				self.refreshOptions(self.isFocused && !self.isInputHidden);
			}
			if (!self.loading) {
				self.wrapper.classList.remove(self.settings.loadingClass);
			}
			self.trigger('load', results);
		}]);
	},

	/**
	 * Sets the input field of the control to the specified value.
	 *
	 * @param {string} value
	 */
	setTextboxValue: function(value) {
		var input = this.control_input;
		var changed = input.value !== value;
		if (changed) {
			input.value = value;
			triggerEvent(input,'update');
			this.lastValue = value;
		}
	},

	/**
	 * Returns the value of the control. If multiple items
	 * can be selected (e.g. <select multiple>), this returns
	 * an array. If only one item can be selected, this
	 * returns a string.
	 *
	 * @returns {mixed}
	 */
	getValue: function() {
		if (this.tagType === TAG_SELECT && this.input.hasAttribute('multiple')) {
			return this.items;
		} else {
			return this.items.join(this.settings.delimiter);
		}
	},

	/**
	 * Resets the selected items to the given value.
	 *
	 * @param {mixed} value
	 */
	setValue: function(value, silent) {
		var events = silent ? [] : ['change'];

		debounce_events(this, events, function() {
			this.clear(silent);
			this.addItems(value, silent);
		});
	},

	/**
	 * Sets the selected item.
	 *
	 * @param {object} item
	 * @param {object} e (optional)
	 */
	setActiveItem: function( item, e) {

		// this prevents removing items with backspace
		if( this.settings.disableActiveItems ) return;

		var self = this;
		var eventName;
		var i, begin, end, item, swap;
		var $last;

		if (this.settings.mode === 'single') return;

		// clear the active selection
		if( !item ){
			$(this.activeItems).removeClass('active');
			this.activeItems = [];
			if (this.isFocused) {
				this.showInput();
			}
			return;
		}

		// modify selection
		eventName = e && e.type.toLowerCase();

		if (eventName === 'mousedown' && this.isKeyDown(KEY_SHIFT,e) && this.activeItems.length) {
			$last = this.$control.children('.active:last');
			begin = Array.prototype.indexOf.apply(this.control.children, [$last[0]]);
			end   = Array.prototype.indexOf.apply(this.control.children, [item]);
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
			$(this.activeItems).removeClass('active');
			this.activeItems = [];
			this.setActiveItemClass(item);
		}

		// ensure control has focus
		this.hideInput();
		if (!this.isFocused) {
			this.focus();
		}
	},

	/**
	 * Set the active and last-active classes
	 *
	 */
	setActiveItemClass: function( item ){

		var last_active = this.control.querySelector('.last-active');
		if( last_active ) last_active.classList.remove('last-active');

		addClasses(item,'active last-active');
		if( this.activeItems.indexOf(item) == -1 ){
			this.activeItems.push( item );
		}
	},

	/**
	 * Remove active item
	 *
	 */
	removeActiveItem: function( item ){
		var idx = this.activeItems.indexOf(item);
		this.activeItems.splice(idx, 1);
		item.classList.remove('active');
	},


	/**
	 * Sets the selected item in the dropdown menu
	 * of available options.
	 *
	 * @param {object} option
	 * @param {boolean} scroll
	 * @param {boolean} animate
	 */
	setActiveOption: function(option, scroll ) {
		var height_menu, height_item, y;

		if (this.activeOption) this.activeOption.classList.remove('active');
		this.activeOption = null;

		if( !option ) return;

		this.activeOption = option;
		addClasses(this.activeOption,'active');

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
	},

	/**
	 * Selects all items (CTRL + A).
	 */
	selectAll: function() {
		var i,n;

		if (this.settings.mode === 'single') return;
		if (this.settings.disableActiveItems) return;

		this.activeItems = this.controlChildren();
		n = this.activeItems.length;

		if( n ){
			for( i = 0; i < n; i++){
				addClasses( this.activeItems[i], 'active' );
			}

			this.hideInput();
			this.close();
		}
		this.focus();
	},

	/**
	 * Hides the input element out of view, while
	 * retaining its focus.
	 */
	hideInput: function() {

		if( this.settings.controlInput ) return;

		this.setTextboxValue('');
		applyCSS(this.control_input, {opacity: 0, position: 'absolute', left: (this.rtl ? 10000 : -10000)+'px'} );
		this.isInputHidden = true;
	},

	/**
	 * Restores input visibility.
	 */
	showInput: function() {

		if( this.settings.controlInput ) return;

		applyCSS(this.control_input, {opacity: 1, position: 'relative', left: 0} );
		this.isInputHidden = false;
	},

	/**
	 * Gives the control focus.
	 */
	focus: function() {
		var self = this;
		if (self.isDisabled) return;

		self.ignoreFocus = true;
		self.control_input.focus();
		window.setTimeout(function() {
			self.ignoreFocus = false;
			self.onFocus();
		}, 0);
	},

	/**
	 * Forces the control out of focus.
	 *
	 * @param {Element} dest
	 */
	blur: function(dest) {
		this.control_input.blur();
		this.onBlur(null, dest);
	},

	/**
	 * Returns a function that scores an object
	 * to show how good of a match it is to the
	 * provided query.
	 *
	 * @param {string} query
	 * @param {object} options
	 * @return {function}
	 */
	getScoreFunction: function(query) {
		return this.sifter.getScoreFunction(query, this.getSearchOptions());
	},

	/**
	 * Returns search options for sifter (the system
	 * for scoring and sorting results).
	 *
	 * @see https://github.com/brianreavis/sifter.js
	 * @return {object}
	 */
	getSearchOptions: function() {
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
	},

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
	search: function(query) {
		var i, value, score, result, calculateScore;
		var self     = this;
		var settings = self.settings;
		var options  = this.getSearchOptions();

		// validate user-provided result scoring function
		if (settings.score) {
			calculateScore = self.settings.score.apply(this, [query]);
			if (typeof calculateScore !== 'function') {
				throw new Error('Selectize "score" setting must be a function that returns a function');
			}
		}

		// perform search
		if (query !== self.lastQuery) {
			self.lastQuery			= query;
			result					= self.sifter.search(query, Object.assign(options, {score: calculateScore}));
			self.currentResults		= result;
		} else {
			result = extend( {}, self.currentResults);
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
	},

	/**
	 * Refreshes the list of available options shown
	 * in the autocomplete dropdown menu.
	 *
	 * @param {boolean} triggerDropdown
	 */
	refreshOptions: function(triggerDropdown) {
		var i, j, k, n, groups, groups_order, option, option_html, optgroup, optgroups, html, html_children, has_create_option;
		var active, active_before, create;

		if (typeof triggerDropdown === 'undefined') {
			triggerDropdown = true;
		}

		var self					= this;
		var query					= self.control_input.value.trim();
		var results					= self.search(query);
		var active_before_hash		= self.activeOption && hash_key(self.activeOption.dataset.value);


		// build markup
		n = results.items.length;
		if (typeof self.settings.maxOptions === 'number') {
			n = Math.min(n, self.settings.maxOptions);
		}

		// render and group available options individually
		groups = {};
		groups_order = [];

		for (i = 0; i < n; i++) {
			option      = self.options[results.items[i].id];
			option_html = self.render('option', option);
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
				groups[optgroup].appendChild(option_html);
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
		html = htmlToElement('<div>');
		for (i = 0, n = groups_order.length; i < n; i++) {
			optgroup = groups_order[i];
			if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].children.length) {
				// render the optgroup header and options within it,
				// then pass it to the wrapper template
				html_children = document.createDocumentFragment();
				html_children.appendChild(self.render('optgroup_header', self.optgroups[optgroup]));
				html_children.appendChild(groups[optgroup]);


				html.appendChild(self.render('optgroup', Object.assign({}, self.optgroups[optgroup], {
					html: domToString(html_children),
					dom:  html_children
				})));
			} else {
				html.appendChild(groups[optgroup]);
			}
		}

		self.dropdown_content.innerHTML = html.innerHTML;

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
					option.classList.add('selected');
				}
			}
		}

		// add create option
		has_create_option = self.canCreate(query);
		if (has_create_option) {
			create = self.render('option_create', {input: query});
			self.dropdown_content.insertBefore(create, self.dropdown_content.firstChild);
		}

		// activate
		self.hasOptions = results.items.length > 0 || has_create_option;
		if (self.hasOptions) {
			if (results.items.length > 0) {
				active_before = active_before_hash && self.getOption(active_before_hash);

				if( active_before ){
					active = active_before;
				}else if (self.settings.mode === 'single' && self.items.length ){
					active = self.getOption(self.items[0]);
				}

				if( !active ){
					if( create && !self.settings.addPrecedence ){
						active = self.getAdjacent(create, 1);
					}else{
						active = self.selectable()[0];
					}
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
	},

	/**
	 * Return list of selectable options
	 *
	 */
	selectable: function(){
		return this.dropdown_content.querySelectorAll('[data-selectable]');
	},



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
	addOption: function(data) {
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
	},

	/**
	 * Registers an option to the pool of options.
	 *
	 * @param {object} data
	 * @return {boolean|string}
	 */
	registerOption: function(data) {
		var key = hash_key(data[this.settings.valueField]);
		if (typeof key === 'undefined' || key === null || this.options.hasOwnProperty(key)) return false;
		data.$order = data.$order || ++this.order;
		this.options[key] = data;
		return key;
	},

	/**
	 * Registers an option group to the pool of option groups.
	 *
	 * @param {object} data
	 * @return {boolean|string}
	 */
	registerOptionGroup: function(data) {
		var key = hash_key(data[this.settings.optgroupValueField]);
		if (!key) return false;

		data.$order = data.$order || ++this.order;
		this.optgroups[key] = data;
		return key;
	},

	/**
	 * Registers a new optgroup for options
	 * to be bucketed into.
	 *
	 * @param {string} id
	 * @param {object} data
	 */
	addOptionGroup: function(id, data) {
		data[this.settings.optgroupValueField] = id;
		if (id = this.registerOptionGroup(data)) {
			this.trigger('optgroup_add', id, data);
		}
	},

	/**
	 * Removes an existing option group.
	 *
	 * @param {string} id
	 */
	removeOptionGroup: function(id) {
		if (this.optgroups.hasOwnProperty(id)) {
			delete this.optgroups[id];
			this.renderCache = {};
			this.trigger('optgroup_remove', id);
		}
	},

	/**
	 * Clears all existing option groups.
	 */
	clearOptionGroups: function() {
		this.optgroups = {};
		this.renderCache = {};
		this.trigger('optgroup_clear');
	},

	/**
	 * Updates an option available for selection. If
	 * it is visible in the selected items or options
	 * dropdown, it will be re-rendered automatically.
	 *
	 * @param {string} value
	 * @param {object} data
	 */
	updateOption: function(value, data) {
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

			if( item.classList.contains('active') ) item_new.classList.add('active');

			item.parentNode.insertBefore(item_new, item);
			item.remove();
		}

		// invalidate last query because we might have updated the sortField
		self.lastQuery = null;

		// update dropdown contents
		if (self.isOpen) {
			self.refreshOptions(false);
		}
	},

	/**
	 * Removes a single option.
	 *
	 * @param {string} value
	 * @param {boolean} silent
	 */
	removeOption: function(value, silent) {
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
	},

	/**
	 * Clears all options.
	 */
	clearOptions: function() {

		this.loadedSearches		= {};
		this.userOptions		= {};
		this.renderCache		= {};
		var selected			= {};
		for( key in this.options){
    		if( this.options.hasOwnProperty(key) && this.items.indexOf(key) >= 0 ){
				selected[key] = this.options[key];
			}
		}

		this.options = this.sifter.items = selected;
		this.lastQuery = null;
		this.trigger('option_clear');
	},

	/**
	 * Returns the jQuery element of the option
	 * matching the given value.
	 *
	 * @param {string} value
	 * @returns {object}
	 */
	getOption: function(value) {
		return this.getElementWithValue(value, this.selectable());
	},

	/**
	 * Returns the dom element of the next or previous dom element of the same type
	 *
	 * @param {object} option
	 * @param {int} direction  can be 1 for next or -1 for previous
	 * @return {object|undefined}
	 */
	getAdjacent: function( option, direction) {

		if( !option ){
			return;
		}

		const fn			= direction > 0 ? 'nextElementSibling' : 'previousElementSibling';
		const node_name		= option.nodeName;

		do{
			option = option[fn];

			if( option && option.nodeName === node_name ){
				return option;
			}

		}while( option );
	},

	/**
	 * Finds the first element with a "data-value" attribute
	 * that matches the given value.
	 *
	 * @param {mixed} value
	 * @param {object} els
	 * @return {object}
	 */
	getElementWithValue: function(value, els) {
		value = hash_key(value);

		if (typeof value !== 'undefined' && value !== null) {
			for (var i = 0, n = els.length; i < n; i++) {
				if (els[i].getAttribute('data-value') === value) {
					return els[i];
				}
			}
		}
	},

	/**
	 * Returns the jQuery element of the item
	 * matching the given value.
	 *
	 * @param {string} value
	 * @returns {object}
	 */
	getItem: function(value) {
		return this.getElementWithValue(value, this.control.children);
	},

	/**
	 * "Selects" multiple items at once. Adds them to the list
	 * at the current caret position.
	 *
	 * @param {string} value
	 * @param {boolean} silent
	 */
	addItems: function(values, silent) {
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
	},

	/**
	 * "Selects" an item. Adds it to the list
	 * at the current caret position.
	 *
	 * @param {string} value
	 * @param {boolean} silent
	 */
	addItem: function(value, silent) {
		var events = silent ? [] : ['change'];

		debounce_events(this, events, function() {
			var item;
			var self = this;
			var inputMode = self.settings.mode;
			var i, active, wasFull;
			value = hash_key(value);

			if (self.items.indexOf(value) !== -1) {
				if (inputMode === 'single') self.close();
				return;
			}

			if (!self.options.hasOwnProperty(value)) return;
			if (inputMode === 'single') self.clear(silent);
			if (inputMode === 'multi' && self.isFull()) return;

			item = self.render('item', self.options[value]);
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
	},

	/**
	 * Removes the selected item matching
	 * the provided value.
	 *
	 * @param {string} value
	 */
	removeItem: function(value, silent) {
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
				item.classList.remove('active');
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
	},

	/**
	 * Invokes the `create` method provided in the
	 * selectize options that should provide the data
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
	createItem: function(input, triggerDropdown) {
		var self  = this;
		var caret = self.caretPos;
		input = input || self.control_input.value.trim() || '';

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

		var setup = (typeof self.settings.create === 'function') ? this.settings.create : function(input) {
			var data = {};
			data[self.settings.labelField] = input;
			data[self.settings.valueField] = input;
			return data;
		};

		var create = once(function(data) {
			self.unlock();

			if (!data || typeof data !== 'object') return callback();
			var value = hash_key(data[self.settings.valueField]);
			if (typeof value !== 'string') return callback();

			self.setTextboxValue('');
			self.addOption(data);
			self.setCaret(caret);
			self.addItem(value);
			self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
			callback(data);
		});

		var output = setup.apply(this, [input, create]);
		if (typeof output !== 'undefined') {
			create(output);
		}

		return true;
	},

	/**
	 * Re-renders the selected item lists.
	 */
	refreshItems: function() {
		this.lastQuery = null;

		if (this.isSetup) {
			this.addItem(this.items);
		}

		this.refreshState();
		this.updateOriginalInput();
	},

	/**
	 * Updates all state-dependent attributes
	 * and CSS classes.
	 */
	refreshState: function() {
		this.refreshValidityState();
		this.refreshClasses();
	},

	/**
	 * Update the `required` attribute of both input and control input.
	 *
	 * The `required` property needs to be activated on the control input
	 * for the error to be displayed at the right place. `required` also
	 * needs to be temporarily deactivated on the input since the input is
	 * hidden and can't show errors.
	 */
	refreshValidityState: function() {
		if (!this.isRequired) return false;

		var invalid = !this.items.length;

		this.isInvalid = invalid;
		this.control_input.required = invalid;
		this.input.required = !invalid;
	},

	/**
	 * Updates all state-dependent CSS classes.
	 */
	refreshClasses: function() {
		var self     = this;
		var isFull   = self.isFull();

		var isLocked = self.isLocked;

		self.wrapper.classList.toggle('rtl',self.rtl);

		self.$control
			.toggleClass('focus', self.isFocused)
			.toggleClass('disabled', self.isDisabled)
			.toggleClass('required', self.isRequired)
			.toggleClass('invalid', self.isInvalid)
			.toggleClass('locked', isLocked)
			.toggleClass('full', isFull).toggleClass('not-full', !isFull)
			.toggleClass('input-active', self.isFocused && !self.isInputHidden)
			.toggleClass('dropdown-active', self.isOpen)
			.toggleClass('has-options', isEmptyObject(self.options) )
			.toggleClass('has-items', self.items.length > 0);

	},

	/**
	 * Determines whether or not more items can be added
	 * to the control without exceeding the user-defined maximum.
	 *
	 * @returns {boolean}
	 */
	isFull: function() {
		return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
	},

	/**
	 * Refreshes the original <select> or <input>
	 * element to reflect the current state.
	 */
	updateOriginalInput: function(opts) {
		var i, n, options, label, self = this;
		opts = opts || {};

		if (self.tagType === TAG_SELECT) {
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
	},

	/**
	 * Shows the autocomplete dropdown containing
	 * the available options.
	 */
	open: function() {
		var self = this;

		if (self.isLocked || self.isOpen || (self.settings.mode === 'multi' && self.isFull())) return;
		self.focus();
		self.isOpen = true;
		self.refreshState();
		applyCSS(self.dropdown,{visibility: 'hidden', display: 'block'});
		self.positionDropdown();
		applyCSS(self.dropdown,{visibility: 'visible', display: 'block'});
		self.trigger('dropdown_open', self.dropdown);
	},

	/**
	 * Closes the autocomplete dropdown menu.
	 */
	close: function() {
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
	},

	/**
	 * Calculates and applies the appropriate
	 * position of the dropdown.
	 */
	positionDropdown: function() {
		var offset, $control, control;

		if( this.settings.dropdownParent === 'body' ){
			$control		= this.$control;
			offset			= $control.offset();
			offset.top		+= $control.outerHeight(true);
			control			= $control[0];

		}else if( this.settings.dropdownParent ){
			control			= getDom(this.settings.dropdownParent);
			offset			= {top:control.offsetHeight,left:0}

		}else{
			$control		= this.$control;
			offset			= $control.position();
			offset.top		+= $control.outerHeight(true);
			control			= $control[0];
		}

		applyCSS(this.dropdown,{
			width : control.getBoundingClientRect().width + 'px',
			top   : offset.top + 'px',
			left  : offset.left + 'px'
		});

	},

	/**
	 * Resets / clears all selected items
	 * from the control.
	 *
	 * @param {boolean} silent
	 */
	clear: function(silent) {

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
	},

	/**
	 * A helper method for inserting an element
	 * at the current caret position.
	 *
	 * @param {object} el
	 */
	insertAtCaret: function(el) {
		var caret	= Math.min(this.caretPos, this.items.length);
		var target	= this.buffer || this.control;

		if (caret === 0) {
			target.insertBefore(el, target.firstChild);
		} else {
			target.insertBefore(el, target.children[caret]);
		}

		this.setCaret(caret + 1);
	},

	/**
	 * Removes the current selected item(s).
	 *
	 * @param {object} e (optional)
	 * @returns {boolean}
	 */
	deleteSelection: function(e) {
		var i, n, direction, selection, values, caret, option_select, tail;
		var self = this;

		direction = (e && e.keyCode === KEY_BACKSPACE) ? -1 : 1;
		selection = getSelection(self.control_input);

		if (self.activeOption && !self.settings.hideSelected) {
			let option = self.getAdjacent(self.activeOption, -1);
			if( option ){
				option_select = option.dataset.value;
			}
		}

		// determine items that will be removed
		values = [];

		if (self.activeItems.length) {

			tail = getTail(self.activeItems, direction);
			caret = nodeIndex(tail);

			if (direction > 0) { caret++; }

			for (i = 0, n = self.activeItems.length; i < n; i++) {
				values.push($(self.activeItems[i]).attr('data-value'));
			}
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
		} else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
			if (direction < 0 && selection.start === 0 && selection.length === 0) {
				values.push(self.items[self.caretPos - 1]);
			} else if (direction > 0 && selection.start === self.control_input.value.length) {
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

		// select previous option
		if (option_select) {
			let option = self.getOption(option_select);
			if( option ){
				self.setActiveOption(option);
			}
		}

		return true;
	},

	/**
	 * Selects the previous / next item (depending on the `direction` argument).
	 *
	 * > 0 - right
	 * < 0 - left
	 *
	 * @param {int} direction
	 * @param {object} e (optional)
	 */
	advanceSelection: function(direction, e) {
		var selection, idx, valueLength, cursorAtEdge, last_active;

		if (direction === 0) return;
		if (this.rtl) direction *= -1;

		selection = getSelection(this.control_input);


		// add or remove to active items
		if( this.isKeyDown(KEY_CTRL,e) || this.isKeyDown(KEY_SHIFT,e) ){

			last_active			= this.getLastActive(direction);
			let adjacent		= this.getAdjacent(last_active,direction);
			if( adjacent ){
				if( adjacent.classList.contains('active') ){
					this.removeActiveItem(last_active);
				}
				this.setActiveItemClass(adjacent); // mark as last_active !! after removeActiveItem() on last_active
			}

		// move caret to the left or right
		}else if (this.isFocused && !this.isInputHidden) {
			valueLength = this.control_input.value.length;
			cursorAtEdge = direction < 0
				? selection.start === 0 && selection.length === 0
				: selection.start === valueLength;

			if (cursorAtEdge && !valueLength) {
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
	},

	/**
	 * Get the last active item
	 *
	 */
	getLastActive: function(direction){

		let last_active = this.control.querySelector('.last-active');
		if( last_active ){
			return last_active;
		}

		return querySelectorEnd(this.control,'.active',direction);
	},


	/**
	 * Moves the caret to the specified index.
	 *
	 * @param {int} i
	 */
	setCaret: function(i) {
		var self = this;

		if (self.settings.mode === 'single') {
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
	},

	/**
	 * Return list of item dom elements
	 *
	 */
	controlChildren: function(){
		return Array.prototype.filter.call( this.control.children, node => node.nodeName !== 'INPUT' );
	},

	/**
	 * Disables user input on the control. Used while
	 * items are being asynchronously created.
	 */
	lock: function() {
		this.close();
		this.isLocked = true;
		this.refreshState();
	},

	/**
	 * Re-enables user input on the control.
	 */
	unlock: function() {
		this.isLocked = false;
		this.refreshState();
	},

	/**
	 * Disables user input on the control completely.
	 * While disabled, it cannot receive focus.
	 */
	disable: function() {
		this.input.disabled				= true;
		this.control_input.disabled		= true;
		this.control_input.tabIndex		= -1;
		this.isDisabled					= true;
		this.lock();
	},

	/**
	 * Enables the control so that it can respond
	 * to focus and user input.
	 */
	enable: function() {
		this.input.disabled				= false;
		this.control_input.disabled		= false;
		this.control_input.tabIndex		= this.tabIndex;
		this.isDisabled					= false;
		this.unlock();
	},

	/**
	 * Completely destroys the control and
	 * unbinds all event listeners so that it can
	 * be garbage collected.
	 */
	destroy: function() {
		var eventNS = this.eventNS;
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

		this.input.classList.remove('selectized');
		this.input.removeAttribute('hidden');

		for( let i = 0; i < revertSettings.children.length; i++ ){
			this.input.appendChild( revertSettings.children[i] );
		}

		this.input.removeAttribute('data-selectize');

		if (--Selectize.count == 0 && Selectize.$testInput) {
			Selectize.$testInput.remove();
			Selectize.$testInput = undefined;
		}

		$(window).off(eventNS);
		$(document).off(eventNS);
		$(document.body).off(eventNS);

		delete this.input.selectize;
	},

	/**
	 * A helper method for rendering "item" and
	 * "option" templates, given the data.
	 *
	 * @param {string} templateName
	 * @param {object} data
	 * @returns {string}
	 */
	render: function(templateName, data) {
		var value, id, label;
		var html = '';
		var cache = false;
		var self = this;
		var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;

		if (templateName === 'option' || templateName === 'item') {
			value = hash_key(data[self.settings.valueField]);
			cache = !!value;
		}

		// pull markup from cache if it exists
		if (cache) {
			if (!isset(self.renderCache[templateName])) {
				self.renderCache[templateName] = {};
			}
			if (self.renderCache[templateName].hasOwnProperty(value)) {
				return self.renderCache[templateName][value];
			}
		}

		// render markup
		html = htmlToElement( self.settings.render[templateName].apply(this, [data, escape_html]) );

		// add mandatory attributes
		if (templateName === 'option' || templateName === 'option_create') {
			if (!data[self.settings.disabledField]) {
				html.setAttribute('data-selectable', '');
			}
		}
		else if (templateName === 'optgroup') {
			id = data[self.settings.optgroupValueField] || '';
			html.setAttribute('data-group', id);
			if(data[self.settings.disabledField]) {
				html.setAttribute('data-disabled', '');
			}
		}
		if (templateName === 'option' || templateName === 'item') {
			html.setAttribute('data-value', value || '');
		}

		if( templateName === 'item' ){ // make sure we have an item class even if the item template is overwritten
			html.classList.add('item');
		}

		// update cache
		if (cache) {
			self.renderCache[templateName][value] = html;
		}

		return html;
	},

	/**
	 * Clears the render cache for a template. If
	 * no template is given, clears all render
	 * caches.
	 *
	 * @param {string} templateName
	 */
	clearCache: function(templateName) {
		var self = this;
		if (typeof templateName === 'undefined') {
			self.renderCache = {};
		} else {
			delete self.renderCache[templateName];
		}
	},

	/**
	 * Determines whether or not to display the
	 * create item prompt, given a user input.
	 *
	 * @param {string} input
	 * @return {boolean}
	 */
	canCreate: function(input) {
		if (!this.settings.create) return false;
		var filter = this.settings.createFilter;

		return input.length
			&& (typeof filter !== 'function' || filter.apply(this, [input]))
			&& (!(filter instanceof RegExp) || filter.test(input));
	},


	/**
	 * Return true if the requested key is down
	 *
	 */
	isKeyDown: function( key_code, evt ){

		if( key_code in this.keysDown ){
			return true;
		}

		if( evt ){
			if( key_code == KEY_CTRL && evt[KEY_CTRL_NAME] ){
				return true;
			}

			if( key_code == KEY_CMD && evt[KEY_CMD_NAME] ){
				return true;
			}

			if( key_code == KEY_SHIFT && evt.shiftKey ){
				return true;
			}
		}

		return false;
	}




});
