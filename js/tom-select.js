/**
 * Tom Select (v1.0.0-b.2)
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

/*jshint curly:false */
/*jshint browser:true */

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['sifter','microplugin'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory( require('sifter'), require('microplugin'));
	} else {
		root.TomSelect = factory( root.Sifter, root.MicroPlugin);
	}
}(this, function( Sifter, MicroPlugin) {
	'use strict';

	"use strict";
	
	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
	
	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
	
	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
	
	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
	
	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
	
	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
	
	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	
	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
	
	function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
	
	function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
	
	function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
	
	function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }
	
	function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
	
	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
	
	var highlight = function highlight(element, pattern) {
	  if (typeof pattern === 'string' && !pattern.length) return;
	  var regex = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;
	
	  var highlight = function highlight(node) {
	    var skip = 0; // Wrap matching part of text node with highlighting <span>, e.g.
	    // Soccer  ->  <span class="highlight">Soc</span>cer  for regex = /soc/i
	
	    if (node.nodeType === 3) {
	      var pos = node.data.search(regex);
	
	      if (pos >= 0 && node.data.length > 0) {
	        var match = node.data.match(regex);
	        var spannode = document.createElement('span');
	        spannode.className = 'highlight';
	        var middlebit = node.splitText(pos);
	        var endbit = middlebit.splitText(match[0].length);
	        var middleclone = middlebit.cloneNode(true);
	        spannode.appendChild(middleclone);
	        middlebit.parentNode.replaceChild(spannode, middlebit);
	        skip = 1;
	      }
	    } // Recurse element node, looking for child text nodes to highlight, unless element 
	    // is childless, <script>, <style>, or already highlighted: <span class="hightlight">
	    else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && (node.className !== 'highlight' || node.tagName !== 'SPAN')) {
	        for (var i = 0; i < node.childNodes.length; ++i) {
	          i += highlight(node.childNodes[i]);
	        }
	      }
	
	    return skip;
	  };
	
	  highlight(element);
	};
	/**
	 * removeHighlight fn copied from highlight v5 and
	 * edited to remove with(), pass js strict mode, and use without jquery
	 */
	
	
	var removeHighlight = function removeHighlight(el) {
	  var elements = document.querySelectorAll("span.highlight");
	  Array.prototype.forEach.call(elements, function (el, i) {
	    var parent = el.parentNode;
	    parent.replaceChild(el.firstChild, el);
	    parent.normalize();
	  });
	};
	
	var MicroEvent = function MicroEvent() {};
	
	MicroEvent.prototype = {
	  on: function on(event, fct) {
	    this._events = this._events || {};
	    this._events[event] = this._events[event] || [];
	
	    this._events[event].push(fct);
	  },
	  off: function off(event, fct) {
	    var n = arguments.length;
	    if (n === 0) return delete this._events;
	    if (n === 1) return delete this._events[event];
	    this._events = this._events || {};
	    if (event in this._events === false) return;
	
	    this._events[event].splice(this._events[event].indexOf(fct), 1);
	  },
	  trigger: function trigger(event
	  /* , args... */
	  ) {
	    this._events = this._events || {};
	    if (event in this._events === false) return;
	
	    for (var i = 0; i < this._events[event].length; i++) {
	      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
	    }
	  }
	};
	var IS_MAC = /Mac/.test(navigator.userAgent);
	var KEY_A = 65;
	var KEY_COMMA = 188;
	var KEY_RETURN = 13;
	var KEY_ESC = 27;
	var KEY_LEFT = 37;
	var KEY_UP = 38;
	var KEY_RIGHT = 39;
	var KEY_DOWN = 40;
	var KEY_BACKSPACE = 8;
	var KEY_DELETE = 46;
	var KEY_SHIFT = 16;
	var KEY_CTRL = IS_MAC ? 18 : 17;
	var KEY_TAB = 9;
	var KEY_CTRL_NAME = IS_MAC ? 'metaKey' : 'ctrlKey';
	
	var getSettings = function getSettings(input, settings_user) {
	  var settings = Object.assign({}, TomSelect.defaults, settings_user);
	  var attr_data = settings.dataAttr;
	  var field_label = settings.labelField;
	  var field_value = settings.valueField;
	  var field_disabled = settings.disabledField;
	  var field_optgroup = settings.optgroupField;
	  var field_optgroup_label = settings.optgroupLabelField;
	  var field_optgroup_value = settings.optgroupValueField;
	  var tag_name = input.tagName.toLowerCase();
	  var placeholder = input.getAttribute('placeholder') || input.getAttribute('data-placeholder');
	
	  if (!placeholder && !settings.allowEmptyOption) {
	    var option = input.querySelector('option[value=""]');
	
	    if (option) {
	      placeholder = option.textContent;
	    }
	  }
	
	  var settings_element = {
	    'placeholder': placeholder,
	    'options': [],
	    'optgroups': [],
	    'items': []
	  };
	  /**
	   * Initialize from a <select> element.
	   *
	   */
	
	  var init_select = function init_select() {
	    var i, n, tagName, children;
	    var options = settings_element.options;
	    var optionsMap = {};
	
	    var readData = function readData(el) {
	      var data = Object.assign({}, el.dataset); // get plain object from DOMStringMap
	
	      var json = attr_data && data[attr_data];
	
	      if (typeof json === 'string' && json.length) {
	        data = Object.assign(data, JSON.parse(json));
	      }
	
	      return data;
	    };
	
	    var addOption = function addOption(option, group) {
	      var value = hash_key(option.value);
	      if (!value && !settings.allowEmptyOption) return; // if the option already exists, it's probably been
	      // duplicated in another optgroup. in this case, push
	      // the current group to the "optgroup" property on the
	      // existing option so that it's rendered in both places.
	
	      if (optionsMap.hasOwnProperty(value)) {
	        if (group) {
	          var arr = optionsMap[value][field_optgroup];
	
	          if (!arr) {
	            optionsMap[value][field_optgroup] = group;
	          } else if (!Array.isArray(arr)) {
	            optionsMap[value][field_optgroup] = [arr, group];
	          } else {
	            arr.push(group);
	          }
	        }
	
	        return;
	      }
	
	      var option_data = readData(option);
	      option_data[field_label] = option_data[field_label] || option.textContent;
	      option_data[field_value] = option_data[field_value] || value;
	      option_data[field_disabled] = option_data[field_disabled] || option.disabled;
	      option_data[field_optgroup] = option_data[field_optgroup] || group;
	      optionsMap[value] = option_data;
	      options.push(option_data);
	
	      if (option.selected) {
	        settings_element.items.push(value);
	      }
	    };
	
	    var addGroup = function addGroup(optgroup) {
	      var i, n, id, optgroup_data, options;
	      id = optgroup.getAttribute('label');
	
	      if (id) {
	        optgroup_data = readData(optgroup);
	        optgroup_data[field_optgroup_label] = id;
	        optgroup_data[field_optgroup_value] = id;
	        optgroup_data[field_disabled] = optgroup.disabled;
	        settings_element.optgroups.push(optgroup_data);
	      }
	
	      var options = optgroup.children;
	
	      for (i = 0, n = options.length; i < n; i++) {
	        addOption(options[i], id);
	      }
	    };
	
	    settings_element.maxItems = input.hasAttribute('multiple') ? null : 1;
	    children = input.children;
	
	    for (i = 0, n = children.length; i < n; i++) {
	      tagName = children[i].tagName.toLowerCase();
	
	      if (tagName === 'optgroup') {
	        addGroup(children[i]);
	      } else if (tagName === 'option') {
	        addOption(children[i]);
	      }
	    }
	  };
	  /**
	   * Initialize from a <input type="text"> element.
	   *
	   */
	
	
	  var init_textbox = function init_textbox() {
	    var i, n, values, option;
	    var data_raw = input.getAttribute(attr_data);
	
	    if (!data_raw) {
	      var value = input.value.trim() || '';
	      if (!settings.allowEmptyOption && !value.length) return;
	      values = value.split(settings.delimiter);
	
	      for (i = 0, n = values.length; i < n; i++) {
	        option = {};
	        option[field_label] = values[i];
	        option[field_value] = values[i];
	        settings_element.options.push(option);
	      }
	
	      settings_element.items = values;
	    } else {
	      settings_element.options = JSON.parse(data_raw);
	
	      for (i = 0, n = settings_element.options.length; i < n; i++) {
	        settings_element.items.push(settings_element.options[i][field_value]);
	      }
	    }
	  };
	
	  if (tag_name === 'select') {
	    init_select();
	  } else {
	    init_textbox();
	  }
	
	  return Object.assign({}, TomSelect.defaults, settings_element, settings_user); //return extend( true, {}, TomSelect.defaults, settings_element, settings_user);
	};
	
	var isset = function isset(object) {
	  return typeof object !== 'undefined';
	};
	/**
	 * Converts a scalar to its best string representation
	 * for hash keys and HTML attribute values.
	 *
	 * Transformations:
	 *   'str'     -> 'str'
	 *   null      -> ''
	 *   undefined -> ''
	 *   true      -> '1'
	 *   false     -> '0'
	 *   0         -> '0'
	 *   1         -> '1'
	 *
	 * @param {string} value
	 * @returns {string|null}
	 */
	
	
	var hash_key = function hash_key(value) {
	  if (typeof value === 'undefined' || value === null) return null;
	  if (typeof value === 'boolean') return value ? '1' : '0';
	  return value + '';
	};
	/**
	 * Escapes a string for use within HTML.
	 *
	 * @param {string} str
	 * @returns {string}
	 */
	
	
	var escape_html = function escape_html(str) {
	  return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	};
	/**
	 * Escapes "$" characters in replacement strings.
	 *
	 * @param {string} str
	 * @returns {string}
	 */
	
	
	var escape_replace = function escape_replace(str) {
	  return (str + '').replace(/\$/g, '$$$$');
	};
	/**
	 * Debounce all fired events types listed in `types`
	 * while executing the provided `fn`.
	 *
	 * @param {object} self
	 * @param {array} types
	 * @param {function} fn
	 */
	
	
	var debounce_events = function debounce_events(self, types, fn) {
	  var type;
	  var trigger = self.trigger;
	  var event_args = {}; // override trigger method
	
	  self.trigger = function () {
	    var type = arguments[0];
	
	    if (types.indexOf(type) !== -1) {
	      event_args[type] = arguments;
	    } else {
	      return trigger.apply(self, arguments);
	    }
	  }; // invoke provided function
	
	
	  fn.apply(self, []);
	  self.trigger = trigger; // trigger queued events
	
	  for (type in event_args) {
	    if (event_args.hasOwnProperty(type)) {
	      trigger.apply(self, event_args[type]);
	    }
	  }
	};
	/**
	 * Determines the current selection within a text input control.
	 * Returns an object containing:
	 *   - start
	 *   - length
	 *
	 * @param {object} input
	 * @returns {object}
	 */
	
	
	var getSelection = function getSelection(input) {
	  return {
	    start: input.selectionStart,
	    length: input.selectionEnd - input.selectionStart
	  };
	};
	
	var getDom = function getDom(query) {
	  if (query.jquery) {
	    return query[0];
	  }
	
	  if (query instanceof HTMLElement) {
	    return query;
	  }
	
	  if (query.indexOf('<') > -1) {
	    var div = document.createElement('div');
	    div.innerHTML = query.trim(); // Never return a text node of whitespace as the result
	
	    return div.firstChild;
	  }
	
	  return document.querySelector(query);
	};
	/**
	 * Dispatch an event
	 *
	 */
	
	
	var triggerEvent = function triggerEvent(dom_el, event_name) {
	  var event = document.createEvent('HTMLEvents');
	  event.initEvent(event_name, true, false);
	  dom_el.dispatchEvent(event);
	};
	/**
	 * Apply CSS rules to a dom element
	 *
	 */
	
	
	var applyCSS = function applyCSS(dom_el, css) {
	  Object.keys(css).forEach(function (name) {
	    dom_el.style[name] = css[name];
	  });
	};
	/**
	 * Add css classes
	 *
	 */
	
	
	var addClasses = function addClasses(el) {
	  var classes = classesArray.apply(null, arguments);
	  el = castAsArray(el);
	
	  for (var i = 0; i < el.length; i++) {
	    var _el$i$classList;
	
	    (_el$i$classList = el[i].classList).add.apply(_el$i$classList, _toConsumableArray(classes));
	  }
	};
	/**
	 * Remove css classes
	 *
	 */
	
	
	var removeClasses = function removeClasses(el) {
	  var classes = classesArray.apply(null, arguments);
	  el = castAsArray(el);
	
	  for (var i = 0; i < el.length; i++) {
	    var _el$i$classList2;
	
	    (_el$i$classList2 = el[i].classList).remove.apply(_el$i$classList2, _toConsumableArray(classes));
	  }
	};
	/**
	 * Return arguments
	 *
	 */
	
	
	var classesArray = function classesArray() {
	  var classes = [];
	
	  for (var i = 1; i < arguments.length; i++) {
	    var _classes = arguments[i];
	
	    if (typeof _classes === 'string') {
	      _classes = _classes.trim().split(/[\11\12\14\15\40]/);
	    }
	
	    if (Array.isArray(_classes)) {
	      classes = classes.concat(_classes);
	    }
	  }
	
	  return classes.filter(Boolean);
	};
	
	var castAsArray = function castAsArray(arg) {
	  if (!Array.isArray(arg)) {
	    arg = [arg];
	  }
	
	  return arg;
	};
	/**
	 * Delegate Event
	 *
	 */
	
	
	var onEvent = function onEvent(el, eventName, elementSelector, handler) {
	  var event_names = eventName.split(/\s/); // create intermediate handler that can be used for all event names
	  // loop parent nodes from the target to the delegation node
	
	  var _handler = function _handler(e) {
	    var target_match = parentMatch(e.target, elementSelector, el);
	
	    if (target_match) {
	      e.delegateTarget = target_match;
	      handler.call(target_match, e);
	    }
	  };
	
	  for (var i = 0; i < event_names.length; i++) {
	    el.addEventListener(event_names[i], _handler, true);
	  }
	};
	/**
	 * Get the closest node to the evt.target matching the selector
	 * Stops at el
	 *
	 */
	
	
	var parentMatch = function parentMatch(target, selector, el) {
	  while (target && target.matches) {
	    if (target.matches(selector)) {
	      return target;
	    }
	
	    if (target == el) {
	      break;
	    }
	
	    target = target.parentNode;
	  }
	};
	/**
	 * Get the first or last item from a querySelectorAll result
	 *
	 * > 0 - right (last)
	 * < 0 - left (first)
	 *
	 */
	
	
	var querySelectorEnd = function querySelectorEnd(el, query, direction) {
	  var result = el.querySelectorAll(query);
	
	  if (!result) {
	    return;
	  }
	
	  return getTail(result, direction);
	};
	/**
	 * Get the first or last item from an array
	 *
	 */
	
	
	var getTail = function getTail(array, direction) {
	  if (direction > 0) {
	    return array[array.length - 1];
	  }
	
	  return array[0];
	};
	/**
	 * Return true if an object is empty
	 *
	 */
	
	
	var isEmptyObject = function isEmptyObject(obj) {
	  return Object.keys(obj).length === 0;
	};
	/**
	 * Get the index of an element amongst sibling nodes of the same type
	 *
	 */
	
	
	var nodeIndex = function nodeIndex(el, amongst) {
	  if (!el) return -1;
	  amongst = amongst || el.nodeName;
	  var i = 0;
	
	  while (el = el.previousElementSibling) {
	    if (el.matches(amongst)) {
	      i++;
	    }
	  }
	
	  return i;
	};
	
	var TomSelect = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(TomSelect, _MicroEvent);
	
	  var _super = _createSuper(TomSelect);
	
	  function TomSelect(input, settings) {
	    var _this;
	
	    _classCallCheck(this, TomSelect);
	
	    _this = _super.call(this);
	
	    var i,
	        n,
	        dir,
	        self = _assertThisInitialized(_this);
	
	    input = getDom(input);
	
	    if (input.tomselect) {
	      throw new Error('Tom Select already initialized on this element');
	    }
	
	    input.tomselect = self;
	    settings = getSettings(input, settings); // detect rtl environment
	
	    var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
	    dir = computedStyle.getPropertyValue('direction'); // setup default state
	
	    Object.assign(self, {
	      order: 0,
	      settings: settings,
	      input: input,
	      tabIndex: input.getAttribute('tabindex') || '',
	      is_select_tag: input.tagName.toLowerCase() === 'select',
	      rtl: /rtl/i.test(dir),
	      highlightedValue: null,
	      isBlurring: false,
	      isOpen: false,
	      isDisabled: false,
	      isRequired: input.required,
	      isInvalid: false,
	      isLocked: false,
	      isFocused: false,
	      isInputHidden: false,
	      isSetup: false,
	      ignoreFocus: false,
	      ignoreBlur: false,
	      ignoreHover: false,
	      hasOptions: false,
	      currentResults: null,
	      lastValue: '',
	      caretPos: 0,
	      loading: 0,
	      loadedSearches: {},
	      activeOption: null,
	      activeItems: [],
	      optgroups: {},
	      options: {},
	      userOptions: {},
	      items: [],
	      renderCache: {
	        'item': {},
	        'option': {}
	      }
	    }); // debounce user defined load() if loadThrottle > 0
	
	    if (self.settings.load && self.settings.loadThrottle) {
	      self.settings.load = self.loadDebounce(self.settings.load, self.settings.loadThrottle);
	    } // search system
	
	
	    self.sifter = new Sifter(_this.options, {
	      diacritics: settings.diacritics
	    });
	    self.setupOptions(self.settings.options, self.settings.optgroups);
	    delete self.settings.optgroups;
	    delete self.settings.options; // option-dependent defaults
	
	    self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? 'single' : 'multi');
	
	    if (typeof self.settings.hideSelected !== 'boolean') {
	      self.settings.hideSelected = self.settings.mode === 'multi';
	    } // create filter regex
	
	
	    if (typeof self.settings.createFilter === 'string') {
	      self.settings.createFilter = new RegExp(self.settings.createFilter);
	    }
	
	    self.initializePlugins(self.settings.plugins);
	    self.setupCallbacks();
	    self.setupTemplates();
	    self.setup();
	    return _this;
	  } // methods
	  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	  /**
	   * Creates all elements and sets up event bindings.
	   *
	   */
	
	
	  _createClass(TomSelect, [{
	    key: "setup",
	    value: function setup() {
	      var self = this;
	      var settings = self.settings;
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
	      var input = self.input;
	      inputMode = self.settings.mode;
	      classes = input.getAttribute('class') || '';
	      wrapper = getDom('<div>');
	      addClasses(wrapper, settings.wrapperClass, classes, inputMode);
	      control = getDom('<div class="items">');
	      addClasses(control, settings.inputClass);
	      wrapper.append(control);
	      dropdown = self.render('dropdown');
	      addClasses(dropdown, settings.dropdownClass, inputMode);
	      dropdown_content = getDom('<div style="scroll-behavior: smooth;">');
	      addClasses(dropdown_content, settings.dropdownContentClass);
	      dropdown.append(dropdown_content);
	      getDom(settings.dropdownParent || wrapper).appendChild(dropdown);
	
	      if (settings.controlInput) {
	        control_input = getDom(settings.controlInput);
	      } else {
	        control_input = getDom('<input type="text" autocomplete="off" />'); // set attributes
	
	        var attrs = ['autocorrect', 'autocapitalize', 'autocomplete'];
	
	        for (var i = 0; i < attrs.length; i++) {
	          var attr = attrs[i];
	
	          if (input.getAttribute(attr)) {
	            control_input.setAttribute(attr, input.getAttribute(attr));
	          }
	        }
	      }
	
	      if (!settings.controlInput) {
	        control_input.setAttribute('tabindex', input.disabled ? '-1' : self.tabIndex);
	        control.appendChild(control_input);
	      }
	
	      if (inputId = input.getAttribute('id')) {
	        control_input.setAttribute('id', inputId + '-tomselected');
	        var label = document.querySelector("label[for='" + inputId + "']");
	        if (label) label.setAttribute('for', inputId + '-tomselected');
	      }
	
	      if (self.settings.copyClassesToDropdown) {
	        addClasses(dropdown, classes);
	      }
	
	      wrapper.style.width = input.style.width;
	
	      if (self.plugins.names.length) {
	        classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
	        addClasses([wrapper, dropdown], classes_plugins);
	      }
	
	      if ((settings.maxItems === null || settings.maxItems > 1) && self.is_select_tag) {
	        input.setAttribute('multiple', 'multiple');
	      }
	
	      if (self.settings.placeholder) {
	        control_input.setAttribute('placeholder', settings.placeholder);
	      } // if splitOn was not passed in, construct it from the delimiter to allow pasting universally
	
	
	      if (!self.settings.splitOn && self.settings.delimiter) {
	        var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	        self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
	      }
	
	      control_input.type = input.type;
	      self.control = control;
	      self.control_input = control_input;
	      self.wrapper = wrapper;
	      self.dropdown = dropdown;
	      self.dropdown_content = dropdown_content;
	      onEvent(dropdown, 'mouseenter', '[data-selectable]', function () {
	        return self.onOptionHover.apply(self, arguments);
	      });
	      onEvent(dropdown, 'mousedown', '[data-selectable]', function () {
	        return self.onOptionSelect.apply(self, arguments);
	      });
	      control.addEventListener('mousedown', function (evt) {
	        var target_match = parentMatch(evt.target, '.' + self.settings.itemClass, control);
	
	        if (target_match) {
	          evt.delegateTarget = target_match;
	          return self.onItemSelect.call(self, evt);
	        }
	
	        return self.onMouseDown.call(self, evt);
	      });
	      control.addEventListener('click', function () {
	        return self.onClick.apply(self, arguments);
	      });
	      control_input.addEventListener('mousedown', function (e) {
	        e.stopPropagation();
	      });
	      control_input.addEventListener('keydown', function () {
	        return self.onKeyDown.apply(self, arguments);
	      });
	      control_input.addEventListener('keyup', function () {
	        return self.onKeyUp.apply(self, arguments);
	      });
	      control_input.addEventListener('keypress', function () {
	        return self.onKeyPress.apply(self, arguments);
	      });
	      control_input.addEventListener('resize', function () {
	        self.positionDropdown.apply(self, []);
	      });
	      control_input.addEventListener('blur', function () {
	        return self.onBlur.apply(self, arguments);
	      });
	      control_input.addEventListener('focus', function () {
	        self.ignoreBlur = false;
	        return self.onFocus.apply(self, arguments);
	      });
	      control_input.addEventListener('paste', function () {
	        return self.onPaste.apply(self, arguments);
	      });
	
	      var doc_mousedown = function doc_mousedown(e) {
	        if (self.isFocused) {
	          // clicking anywhere in the control should not close the dropdown
	          if (parentMatch(e.target, '.' + self.settings.wrapperClass, self.wrapper)) {
	            return false;
	          }
	
	          self.blur(e.target);
	        }
	      };
	
	      var win_scroll = function win_scroll() {
	        if (self.isOpen) {
	          self.positionDropdown.apply(self, arguments);
	        }
	      };
	
	      var win_hover = function win_hover() {
	        self.ignoreHover = false;
	      };
	
	      document.addEventListener('mousedown', doc_mousedown);
	      window.addEventListener('sroll', win_scroll);
	      window.addEventListener('resize', win_scroll);
	      window.addEventListener('mousemove', win_hover);
	
	      self._destroy = function () {
	        document.removeEventListener('mousedown', doc_mousedown);
	        window.removeEventListener('mousemove', win_hover);
	        window.removeEventListener('sroll', win_scroll);
	        window.removeEventListener('resize', win_scroll);
	      }; // store original children and tab index so that they can be
	      // restored when the destroy() method is called.
	
	
	      var children = [];
	
	      while (input.children.length > 0) {
	        children.push(input.children[0]);
	        input.children[0].remove();
	      }
	
	      this.revertSettings = {
	        children: children,
	        tabindex: input.getAttribute('tabindex')
	      };
	      input.setAttribute('tabindex', -1);
	      input.setAttribute('hidden', 'hidden');
	      input.insertAdjacentElement('afterend', self.wrapper);
	      self.setValue(settings.items);
	      delete settings.items; // feature detect for the validation API
	
	      if (self.supportsValidity()) {
	        input.addEventListener('invalid', function (e) {
	          e.preventDefault();
	          self.isInvalid = true;
	          self.refreshState();
	        });
	      }
	
	      self.updateOriginalInput();
	      self.refreshItems();
	      self.refreshState();
	      self.isSetup = true;
	
	      if (input.disabled) {
	        self.disable();
	      }
	
	      self.on('change', this.onChange);
	      addClasses(input, 'tomselected');
	      self.trigger('initialize'); // preload options
	
	      if (settings.preload === true) {
	        self.onSearchChange('');
	      }
	    }
	  }, {
	    key: "supportsValidity",
	    value: function supportsValidity() {
	      return !/android/i.test(window.navigator.userAgent) && !!document.createElement('input').validity;
	    }
	    /**
	     * Register options and optgroups
	     *
	     */
	
	  }, {
	    key: "setupOptions",
	    value: function setupOptions(options, optgroups) {
	      var i, n;
	      options = options || [];
	      optgroups = optgroups || []; // build options table
	
	      for (i = 0, n = options.length; i < n; i++) {
	        this.registerOption(options[i]);
	      } // build optgroup table
	
	
	      for (i = 0, n = optgroups.length; i < n; i++) {
	        this.registerOptionGroup(optgroups[i]);
	      }
	    }
	    /**
	     * Sets up default rendering functions.
	     */
	
	  }, {
	    key: "setupTemplates",
	    value: function setupTemplates() {
	      var self = this;
	      var field_label = self.settings.labelField;
	      var field_optgroup = self.settings.optgroupLabelField;
	      var templates = {
	        'optgroup': function optgroup(data, escape) {
	          var optgroup = document.createElement('div');
	          optgroup.className = 'optgroup';
	          optgroup.appendChild(data.options);
	          return optgroup;
	        },
	        'optgroup_header': function optgroup_header(data, escape) {
	          return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
	        },
	        'option': function option(data, escape) {
	          return '<div>' + escape(data[field_label]) + '</div>';
	        },
	        'item': function item(data, escape) {
	          return '<div>' + escape(data[field_label]) + '</div>';
	        },
	        'option_create': function option_create(data, escape) {
	          return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
	        },
	        'no_results': function no_results(data, escape) {
	          return '<div class="no-results">No results found</div>';
	        },
	        'loading': function loading(data, escape) {
	          return '<div class="spinner"></div>';
	        },
	        'dropdown': function dropdown() {
	          return '<div style="display:none"></div>';
	        }
	      };
	      self.settings.render = Object.assign({}, templates, self.settings.render);
	    }
	    /**
	     * Maps fired events to callbacks provided
	     * in the settings used when creating the control.
	     */
	
	  }, {
	    key: "setupCallbacks",
	    value: function setupCallbacks() {
	      var key,
	          fn,
	          callbacks = {
	        'initialize': 'onInitialize',
	        'change': 'onChange',
	        'item_add': 'onItemAdd',
	        'item_remove': 'onItemRemove',
	        'clear': 'onClear',
	        'option_add': 'onOptionAdd',
	        'option_remove': 'onOptionRemove',
	        'option_clear': 'onOptionClear',
	        'optgroup_add': 'onOptionGroupAdd',
	        'optgroup_remove': 'onOptionGroupRemove',
	        'optgroup_clear': 'onOptionGroupClear',
	        'dropdown_open': 'onDropdownOpen',
	        'dropdown_close': 'onDropdownClose',
	        'type': 'onType',
	        'load': 'onLoad',
	        'focus': 'onFocus',
	        'blur': 'onBlur'
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
	
	  }, {
	    key: "onClick",
	    value: function onClick(e) {
	      var self = this; // necessary for mobile webkit devices (manual focus triggering
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
	
	  }, {
	    key: "onMouseDown",
	    value: function onMouseDown(e) {
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
	        window.setTimeout(function () {
	          self.focus();
	        }, 0);
	      }
	    }
	    /**
	     * Triggered when the value of the control has been changed.
	     * This should propagate the event to the original DOM
	     * input / select element.
	     */
	
	  }, {
	    key: "onChange",
	    value: function onChange() {
	      triggerEvent(this.input, 'change');
	    }
	    /**
	     * Triggered on <input> paste.
	     *
	     * @param {object} e
	     * @returns {boolean}
	     */
	
	  }, {
	    key: "onPaste",
	    value: function onPaste(e) {
	      var self = this;
	
	      if (self.isFull() || self.isInputHidden || self.isLocked) {
	        e.preventDefault();
	        return;
	      } // If a regex or string is included, this will split the pasted
	      // input and create Items for each separate value
	
	
	      if (self.settings.splitOn) {
	        // Wait for pasted text to be recognized in value
	        setTimeout(function () {
	          var pastedText = self.inputValue();
	
	          if (!pastedText.match(self.settings.splitOn)) {
	            return;
	          }
	
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
	
	  }, {
	    key: "onKeyPress",
	    value: function onKeyPress(e) {
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
	
	  }, {
	    key: "onKeyDown",
	    value: function onKeyDown(e) {
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
	          if (self.isKeyDown(KEY_CTRL, e)) {
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
	            var next = self.getAdjacent(self.activeOption, 1);
	            if (next) self.setActiveOption(next, true);
	          }
	
	          e.preventDefault();
	          return;
	        // up: move selection up
	
	        case KEY_UP:
	          if (self.activeOption) {
	            self.ignoreHover = true;
	            var prev = self.getAdjacent(self.activeOption, -1);
	            if (prev) self.setActiveOption(prev, true);
	          }
	
	          e.preventDefault();
	          return;
	        // doc_src select active option
	
	        case KEY_RETURN:
	          if (self.isOpen && self.activeOption) {
	            self.onOptionSelect({
	              delegateTarget: self.activeOption
	            });
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
	            self.onOptionSelect({
	              delegateTarget: self.activeOption
	            }); // prevent default [tab] behaviour of jump to the next field
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
	
	      if (self.isInputHidden && !self.isKeyDown(KEY_CTRL, e)) {
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
	
	  }, {
	    key: "onKeyUp",
	    value: function onKeyUp(e) {
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
	
	  }, {
	    key: "onSearchChange",
	    value: function onSearchChange(value) {
	      var self = this;
	      var fn = self.settings.load;
	      if (!fn) return;
	      if (self.loadedSearches.hasOwnProperty(value)) return;
	      self.loadedSearches[value] = true;
	      self.load(function (callback) {
	        fn.apply(self, [value, callback]);
	      });
	    }
	    /**
	     * Triggered on <input> focus.
	     *
	     * @param {object} e (optional)
	     * @returns {boolean}
	     */
	
	  }, {
	    key: "onFocus",
	    value: function onFocus(e) {
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
	
	  }, {
	    key: "onBlur",
	    value: function onBlur(e, dest) {
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
	
	      var deactivate = function deactivate() {
	        self.close();
	        self.setActiveItem(null);
	        self.setActiveOption(null);
	        self.setCaret(self.items.length);
	        self.refreshState(); // IE11 bug: element still marked as active
	
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
	
	  }, {
	    key: "onOptionHover",
	    value: function onOptionHover(e) {
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
	
	  }, {
	    key: "onOptionSelect",
	    value: function onOptionSelect(e) {
	      var value,
	          self = this;
	
	      if (e.preventDefault) {
	        e.preventDefault();
	        e.stopPropagation();
	      }
	
	      var target = e.delegateTarget;
	
	      if (!target) {
	        return;
	      } // should not be possible to trigger a option under a disabled optgroup
	
	
	      if (target.parentNode && target.parentNode.matches('[data-disabled]')) {
	        return;
	      }
	
	      if (target.classList.contains('create')) {
	        self.createItem(null, function () {
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
	
	  }, {
	    key: "onItemSelect",
	    value: function onItemSelect(e) {
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
	
	  }, {
	    key: "load",
	    value: function load(fn) {
	      var self = this;
	      addClasses(self.wrapper, self.settings.loadingClass);
	      self.loading++;
	      fn.call(self, function (options, optgroups) {
	        self.loading = Math.max(self.loading - 1, 0);
	        self.lastQuery = null;
	        self.setupOptions(options, optgroups);
	        self.refreshOptions(self.isFocused && !self.isInputHidden);
	
	        if (!self.loading) {
	          removeClasses(self.wrapper, self.settings.loadingClass);
	        }
	
	        self.trigger('load', options);
	      });
	    }
	    /**
	     * Debounce the user provided load function
	     *
	     */
	
	  }, {
	    key: "loadDebounce",
	    value: function loadDebounce(fn, delay) {
	      var timeout;
	      return function () {
	        var self = this;
	        var args = arguments;
	
	        if (timeout) {
	          self.loading = Math.max(self.loading - 1, 0);
	        }
	
	        window.clearTimeout(timeout);
	        timeout = window.setTimeout(function () {
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
	
	  }, {
	    key: "setTextboxValue",
	    value: function setTextboxValue(value) {
	      var input = this.control_input;
	      var changed = input.value !== value;
	
	      if (changed) {
	        input.value = value;
	        triggerEvent(input, 'update');
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
	
	  }, {
	    key: "getValue",
	    value: function getValue() {
	      if (this.is_select_tag && this.input.hasAttribute('multiple')) {
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
	
	  }, {
	    key: "setValue",
	    value: function setValue(value, silent) {
	      var events = silent ? [] : ['change'];
	      debounce_events(this, events, function () {
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
	
	  }, {
	    key: "setActiveItem",
	    value: function setActiveItem(item, e) {
	      var self = this;
	      var eventName;
	      var i, begin, end, item, swap;
	      var last;
	      if (this.settings.mode === 'single') return; // clear the active selection
	
	      if (!item) {
	        removeClasses(this.activeItems, 'active');
	        this.activeItems = [];
	
	        if (this.isFocused) {
	          this.showInput();
	        }
	
	        return;
	      } // modify selection
	
	
	      eventName = e && e.type.toLowerCase();
	
	      if (eventName === 'mousedown' && this.isKeyDown(KEY_SHIFT, e) && this.activeItems.length) {
	        last = this.getLastActive();
	        begin = Array.prototype.indexOf.call(this.control.children, last);
	        end = Array.prototype.indexOf.call(this.control.children, item);
	
	        if (begin > end) {
	          swap = begin;
	          begin = end;
	          end = swap;
	        }
	
	        for (i = begin; i <= end; i++) {
	          item = this.control.children[i];
	
	          if (this.activeItems.indexOf(item) === -1) {
	            this.setActiveItemClass(item);
	          }
	        }
	
	        e.preventDefault();
	      } else if (eventName === 'mousedown' && this.isKeyDown(KEY_CTRL, e) || eventName === 'keydown' && this.isKeyDown(KEY_SHIFT, e)) {
	        if (item.classList.contains('active')) {
	          this.removeActiveItem(item);
	        } else {
	          this.setActiveItemClass(item);
	        }
	      } else {
	        removeClasses(this.activeItems, 'active');
	        this.activeItems = [];
	        this.setActiveItemClass(item);
	      } // ensure control has focus
	
	
	      this.hideInput();
	
	      if (!this.isFocused) {
	        this.focus();
	      }
	    }
	    /**
	     * Set the active and last-active classes
	     *
	     */
	
	  }, {
	    key: "setActiveItemClass",
	    value: function setActiveItemClass(item) {
	      var last_active = this.control.querySelector('.last-active');
	      if (last_active) removeClasses(last_active, 'last-active');
	      addClasses(item, 'active last-active');
	
	      if (this.activeItems.indexOf(item) == -1) {
	        this.activeItems.push(item);
	      }
	    }
	    /**
	     * Remove active item
	     *
	     */
	
	  }, {
	    key: "removeActiveItem",
	    value: function removeActiveItem(item) {
	      var idx = this.activeItems.indexOf(item);
	      this.activeItems.splice(idx, 1);
	      removeClasses(item, 'active');
	    }
	    /**
	     * Sets the selected item in the dropdown menu
	     * of available options.
	     *
	     * @param {object} option
	     * @param {boolean} scroll
	     */
	
	  }, {
	    key: "setActiveOption",
	    value: function setActiveOption(option, scroll) {
	      var height_menu, height_item, y;
	
	      if (option === this.activeOption) {
	        return;
	      }
	
	      if (this.activeOption) removeClasses(this.activeOption, 'active');
	      this.activeOption = null;
	      if (!option) return;
	      this.activeOption = option;
	      addClasses(option, 'active');
	
	      if (scroll || !isset(scroll)) {
	        height_menu = this.dropdown_content.clientHeight;
	        scroll = this.dropdown_content.scrollTop || 0;
	        height_item = this.activeOption.offsetHeight;
	        y = this.activeOption.getBoundingClientRect().top - this.dropdown_content.getBoundingClientRect().top + scroll;
	
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
	
	  }, {
	    key: "selectAll",
	    value: function selectAll() {
	      if (this.settings.mode === 'single') return;
	      this.activeItems = this.controlChildren();
	
	      if (this.activeItems.length) {
	        addClasses(this.activeItems, 'active');
	        this.hideInput();
	        this.close();
	      }
	
	      this.focus();
	    }
	    /**
	     * Hides the input element out of view, while
	     * retaining its focus.
	     */
	
	  }, {
	    key: "hideInput",
	    value: function hideInput() {
	      if (this.settings.controlInput) return;
	      this.setTextboxValue('');
	      applyCSS(this.control_input, {
	        opacity: 0,
	        position: 'absolute',
	        left: (this.rtl ? 10000 : -10000) + 'px'
	      });
	      this.isInputHidden = true;
	    }
	    /**
	     * Restores input visibility.
	     */
	
	  }, {
	    key: "showInput",
	    value: function showInput() {
	      if (this.settings.controlInput) return;
	      applyCSS(this.control_input, {
	        opacity: 1,
	        position: 'relative',
	        left: 0
	      });
	      this.isInputHidden = false;
	    }
	    /**
	     * Get the input value
	     */
	
	  }, {
	    key: "inputValue",
	    value: function inputValue() {
	      return this.control_input.value.trim();
	    }
	    /**
	     * Gives the control focus.
	     */
	
	  }, {
	    key: "focus",
	    value: function focus() {
	      var self = this;
	      if (self.isDisabled) return;
	      self.ignoreFocus = true;
	      self.control_input.focus();
	      window.setTimeout(function () {
	        self.ignoreFocus = false;
	        self.onFocus();
	      }, 0);
	    }
	    /**
	     * Forces the control out of focus.
	     *
	     * @param {Element} dest
	     */
	
	  }, {
	    key: "blur",
	    value: function blur(dest) {
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
	
	  }, {
	    key: "getScoreFunction",
	    value: function getScoreFunction(query) {
	      return this.sifter.getScoreFunction(query, this.getSearchOptions());
	    }
	    /**
	     * Returns search options for sifter (the system
	     * for scoring and sorting results).
	     *
	     * @see https://github.com/brianreavis/sifter.js
	     * @return {object}
	     */
	
	  }, {
	    key: "getSearchOptions",
	    value: function getSearchOptions() {
	      var settings = this.settings;
	      var sort = settings.sortField;
	
	      if (typeof sort === 'string') {
	        sort = [{
	          field: sort
	        }];
	      }
	
	      return {
	        fields: settings.searchField,
	        conjunction: settings.searchConjunction,
	        sort: sort,
	        nesting: settings.nesting
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
	
	  }, {
	    key: "search",
	    value: function search(query) {
	      var i, value, score, result, calculateScore;
	      var self = this;
	      var settings = self.settings;
	      var options = this.getSearchOptions(); // validate user-provided result scoring function
	
	      if (settings.score) {
	        calculateScore = self.settings.score.call(this, query);
	
	        if (typeof calculateScore !== 'function') {
	          throw new Error('Tom Select "score" setting must be a function that returns a function');
	        }
	      } // perform search
	
	
	      if (query !== self.lastQuery) {
	        self.lastQuery = query;
	        result = self.sifter.search(query, Object.assign(options, {
	          score: calculateScore
	        }));
	        self.currentResults = result;
	      } else {
	        result = Object.assign({}, self.currentResults);
	      } // filter out selected items
	
	
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
	
	  }, {
	    key: "refreshOptions",
	    value: function refreshOptions(triggerDropdown) {
	      var i, j, k, n, groups, groups_order, optgroup, optgroups, html, has_create_option;
	      var active, active_before, create;
	
	      if (typeof triggerDropdown === 'undefined') {
	        triggerDropdown = true;
	      }
	
	      var self = this;
	      var query = self.inputValue();
	      var results = self.search(query);
	      var active_before_hash = self.activeOption && hash_key(self.activeOption.dataset.value);
	      var show_dropdown = false; // build markup
	
	      n = results.items.length;
	
	      if (typeof self.settings.maxOptions === 'number') {
	        n = Math.min(n, self.settings.maxOptions);
	      }
	
	      if (n > 0) {
	        show_dropdown = true;
	      } // render and group available options individually
	
	
	      groups = {};
	      groups_order = [];
	
	      for (i = 0; i < n; i++) {
	        // get option dom element, don't re-render if we
	        var option = self.options[results.items[i].id];
	        var opt_value = hash_key(option[self.settings.valueField]);
	        var option_el = self.getOption(opt_value);
	
	        if (!option_el) {
	          option_el = self.render('option', option);
	        }
	
	        optgroup = option[self.settings.optgroupField] || '';
	        optgroups = Array.isArray(optgroup) ? optgroup : [optgroup];
	
	        for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
	          optgroup = optgroups[j];
	
	          if (!self.optgroups.hasOwnProperty(optgroup)) {
	            optgroup = '';
	          }
	
	          if (!groups.hasOwnProperty(optgroup)) {
	            groups[optgroup] = document.createDocumentFragment();
	            groups_order.push(optgroup);
	          } // a child could only have one parent, so if you have more parents clone the child
	
	
	          if (j > 0) {
	            option_el = option_el.cloneNode(true);
	            removeClasses(option_el, 'active');
	          }
	
	          groups[optgroup].appendChild(option_el);
	        }
	      } // sort optgroups
	
	
	      if (this.settings.lockOptgroupOrder) {
	        groups_order.sort(function (a, b) {
	          var a_order = self.optgroups[a].$order || 0;
	          var b_order = self.optgroups[b].$order || 0;
	          return a_order - b_order;
	        });
	      } // render optgroup headers & join groups
	
	
	      html = document.createDocumentFragment();
	
	      for (i = 0, n = groups_order.length; i < n; i++) {
	        optgroup = groups_order[i];
	
	        if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].children.length) {
	          var group_options = document.createDocumentFragment();
	          group_options.appendChild(self.render('optgroup_header', self.optgroups[optgroup]));
	          group_options.appendChild(groups[optgroup]);
	          var group_html = self.render('optgroup', {
	            group: self.optgroups[optgroup],
	            options: group_options
	          });
	          html.appendChild(group_html);
	        } else {
	          html.appendChild(groups[optgroup]);
	        }
	      }
	
	      self.dropdown_content.innerHTML = '';
	      self.dropdown_content.appendChild(html); // highlight matching terms inline
	
	      if (self.settings.highlight) {
	        removeHighlight(self.dropdown_content);
	
	        if (results.query.length && results.tokens.length) {
	          for (i = 0, n = results.tokens.length; i < n; i++) {
	            highlight(self.dropdown_content, results.tokens[i].regex);
	          }
	        }
	      } // add "selected" class to selected options
	
	
	      if (!self.settings.hideSelected) {
	        for (i = 0, n = self.items.length; i < n; i++) {
	          var _option = self.getOption(self.items[i]);
	
	          if (_option) {
	            addClasses(_option, 'selected');
	          }
	        }
	      } // helper method for adding templates to dropdown
	
	
	      var add_template = function add_template(template) {
	        show_dropdown = true;
	        var content = self.render(template, {
	          input: query
	        });
	        self.dropdown_content.insertBefore(content, self.dropdown_content.firstChild);
	        return content;
	      }; // add loading message
	
	
	      if (self.loading) {
	        add_template('loading'); // add no_results message
	      } else if (results.items.length === 0 && self.settings.render['no_results'] && query.length) {
	        add_template('no_results');
	      } // add create option
	
	
	      has_create_option = self.canCreate(query);
	
	      if (has_create_option) {
	        create = add_template('option_create');
	      } // activate
	
	
	      self.hasOptions = results.items.length > 0 || has_create_option;
	
	      if (show_dropdown) {
	        if (results.items.length > 0) {
	          active_before = active_before_hash && self.getOption(active_before_hash);
	
	          if (active_before && self.dropdown_content.contains(active_before)) {
	            active = active_before;
	          } else if (self.settings.mode === 'single' && self.items.length) {
	            active = self.getOption(self.items[0]);
	          } else {
	            var active_index = 0;
	
	            if (create && !self.settings.addPrecedence) {
	              active_index = 1;
	            }
	
	            active = self.selectable()[active_index];
	          }
	        } else {
	          active = create;
	        }
	
	        self.setActiveOption(active);
	
	        if (triggerDropdown && !self.isOpen) {
	          self.open();
	        }
	      } else {
	        self.setActiveOption(null);
	
	        if (triggerDropdown && self.isOpen) {
	          self.close();
	        }
	      }
	    }
	    /**
	     * Return list of selectable options
	     *
	     */
	
	  }, {
	    key: "selectable",
	    value: function selectable() {
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
	
	  }, {
	    key: "addOption",
	    value: function addOption(data) {
	      var i,
	          n,
	          value,
	          self = this;
	
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
	
	  }, {
	    key: "registerOption",
	    value: function registerOption(data) {
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
	
	  }, {
	    key: "registerOptionGroup",
	    value: function registerOptionGroup(data) {
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
	
	  }, {
	    key: "addOptionGroup",
	    value: function addOptionGroup(id, data) {
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
	
	  }, {
	    key: "removeOptionGroup",
	    value: function removeOptionGroup(id) {
	      if (this.optgroups.hasOwnProperty(id)) {
	        delete this.optgroups[id];
	        this.clearCache();
	        this.trigger('optgroup_remove', id);
	      }
	    }
	    /**
	     * Clears all existing option groups.
	     */
	
	  }, {
	    key: "clearOptionGroups",
	    value: function clearOptionGroups() {
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
	
	  }, {
	    key: "updateOption",
	    value: function updateOption(value, data) {
	      var self = this;
	      var item, item_new;
	      var value_new, index_item, cache_items, cache_options, order_old;
	      value = hash_key(value);
	      value_new = hash_key(data[self.settings.valueField]); // sanity checks
	
	      if (value === null) return;
	      if (!self.options.hasOwnProperty(value)) return;
	      if (typeof value_new !== 'string') throw new Error('Value must be set in option data');
	      order_old = self.options[value].$order; // update references
	
	      if (value_new !== value) {
	        delete self.options[value];
	        index_item = self.items.indexOf(value);
	
	        if (index_item !== -1) {
	          self.items.splice(index_item, 1, value_new);
	        }
	      }
	
	      data.$order = data.$order || order_old;
	      self.options[value_new] = data; // invalidate render cache
	
	      cache_items = self.renderCache['item'];
	      cache_options = self.renderCache['option'];
	
	      if (cache_items) {
	        delete cache_items[value];
	        delete cache_items[value_new];
	      }
	
	      if (cache_options) {
	        delete cache_options[value];
	        delete cache_options[value_new];
	      } // update the item if it's selected
	
	
	      if (self.items.indexOf(value_new) !== -1) {
	        item = self.getItem(value);
	        item_new = self.render('item', data);
	        if (item.classList.contains('active')) addClasses(item_new, 'active');
	        item.parentNode.insertBefore(item_new, item);
	        item.remove();
	      } // invalidate last query because we might have updated the sortField
	
	
	      self.lastQuery = null; // update dropdown contents
	
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
	
	  }, {
	    key: "removeOption",
	    value: function removeOption(value, silent) {
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
	
	  }, {
	    key: "clearOptions",
	    value: function clearOptions() {
	      this.loadedSearches = {};
	      this.userOptions = {};
	      this.clearCache();
	      var selected = {};
	
	      for (var key in this.options) {
	        if (this.options.hasOwnProperty(key) && this.items.indexOf(key) >= 0) {
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
	
	  }, {
	    key: "getOption",
	    value: function getOption(value) {
	      // cached ?
	      if (this.renderCache['option'].hasOwnProperty(value)) {
	        return this.renderCache['option'][value];
	      } // from existing dropdown menu dom
	
	
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
	
	  }, {
	    key: "getAdjacent",
	    value: function getAdjacent(option, direction) {
	      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'option';
	
	      if (!option) {
	        return;
	      }
	
	      var self = this;
	      var type_class = self.settings.optionClass;
	      var parent = self.dropdown;
	
	      if (type == 'item') {
	        parent = self.control;
	        type_class = self.settings.itemClass;
	      }
	
	      var all = parent.querySelectorAll('.' + type_class);
	
	      for (var i = 0; i < all.length; i++) {
	        if (all[i] != option) {
	          continue;
	        }
	
	        if (direction > 0) {
	          return all[i + 1];
	        }
	
	        return all[i - 1];
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
	
	  }, {
	    key: "getElementWithValue",
	    value: function getElementWithValue(value, els) {
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
	
	  }, {
	    key: "getItem",
	    value: function getItem(value) {
	      return this.getElementWithValue(value, this.control.children);
	    }
	    /**
	     * "Selects" multiple items at once. Adds them to the list
	     * at the current caret position.
	     *
	     * @param {string} value
	     * @param {boolean} silent
	     */
	
	  }, {
	    key: "addItems",
	    value: function addItems(values, silent) {
	      this.buffer = document.createDocumentFragment();
	      var children = this.control.children;
	
	      for (var i = 0; i < children.length; i++) {
	        this.buffer.appendChild(children[i]);
	      }
	
	      var items = Array.isArray(values) ? values : [values];
	
	      for (var i = 0, n = items.length; i < n; i++) {
	        this.isPending = i < n - 1;
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
	
	  }, {
	    key: "addItem",
	    value: function addItem(value, silent) {
	      var events = silent ? [] : ['change'];
	      debounce_events(this, events, function () {
	        var item;
	        var self = this;
	        var inputMode = self.settings.mode;
	        var i, active, wasFull;
	        value = hash_key(value);
	
	        if (self.items.indexOf(value) !== -1) {
	          if (inputMode === 'single') {
	            self.close();
	          }
	
	          if (inputMode === 'single' || !self.settings.duplicates) {
	            return;
	          }
	        }
	
	        if (!self.options.hasOwnProperty(value)) return;
	        if (inputMode === 'single') self.clear(silent);
	        if (inputMode === 'multi' && self.isFull()) return;
	        item = self.render('item', self.options[value]);
	
	        if (this.control.contains(item)) {
	          // duplicates
	          item = item.cloneNode(true);
	        }
	
	        wasFull = self.isFull();
	        self.items.splice(self.caretPos, 0, value);
	        self.insertAtCaret(item);
	
	        if (!self.isPending || !wasFull && self.isFull()) {
	          self.refreshState();
	        }
	
	        if (self.isSetup) {
	          var options = self.selectable(); // update menu / remove the option (if this is not one item being added as part of series)
	
	          if (!self.isPending) {
	            var option = self.getOption(value);
	            var next = self.getAdjacent(option, 1);
	            self.refreshOptions(self.isFocused && inputMode !== 'single');
	
	            if (next) {
	              self.setActiveOption(next);
	            }
	          } // hide the menu if the maximum number of items have been selected or no options are left
	
	
	          if (!options.length || self.isFull()) {
	            self.close();
	          } else if (!self.isPending) {
	            self.positionDropdown();
	          }
	
	          self.trigger('item_add', value, item);
	
	          if (!self.isPending) {
	            self.updateOriginalInput({
	              silent: silent
	            });
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
	
	  }, {
	    key: "removeItem",
	    value: function removeItem(value, silent) {
	      var i, idx;
	      var item = this.getItem(value);
	      if (!item) return;
	      value = hash_key(item.dataset.value);
	      i = this.items.indexOf(value);
	
	      if (i !== -1) {
	        item.remove();
	
	        if (item.classList.contains('active')) {
	          idx = this.activeItems.indexOf(item);
	          this.activeItems.splice(idx, 1);
	          removeClasses(item, 'active');
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
	        this.updateOriginalInput({
	          silent: silent
	        });
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
	
	  }, {
	    key: "createItem",
	    value: function createItem(input, triggerDropdown) {
	      var self = this;
	      var caret = self.caretPos;
	      var output;
	      input = input || self.inputValue();
	      var callback = arguments[arguments.length - 1];
	      if (typeof callback !== 'function') callback = function callback() {};
	
	      if (typeof triggerDropdown !== 'boolean') {
	        triggerDropdown = true;
	      }
	
	      if (!self.canCreate(input)) {
	        callback();
	        return false;
	      }
	
	      self.lock();
	      var created = false;
	
	      var create = function create(data) {
	        self.unlock();
	        if (!data || _typeof(data) !== 'object') return callback();
	        var value = hash_key(data[self.settings.valueField]);
	
	        if (typeof value !== 'string') {
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
	
	      if (typeof self.settings.create === 'function') {
	        output = self.settings.create.apply(this, [input, create]);
	      } else {
	        output = {};
	        output[self.settings.labelField] = input;
	        output[self.settings.valueField] = input;
	      }
	
	      if (!created) {
	        create(output);
	      }
	
	      return true;
	    }
	    /**
	     * Re-renders the selected item lists.
	     */
	
	  }, {
	    key: "refreshItems",
	    value: function refreshItems() {
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
	
	  }, {
	    key: "refreshState",
	    value: function refreshState() {
	      var self = this;
	      self.refreshValidityState();
	      var isFull = self.isFull();
	      var isLocked = self.isLocked;
	      self.wrapper.classList.toggle('rtl', self.rtl);
	      var classList = self.control.classList;
	      classList.toggle('focus', self.isFocused);
	      classList.toggle('disabled', self.isDisabled);
	      classList.toggle('required', self.isRequired);
	      classList.toggle('invalid', self.isInvalid);
	      classList.toggle('locked', isLocked);
	      classList.toggle('full', isFull);
	      classList.toggle('not-full', !isFull);
	      classList.toggle('input-active', self.isFocused && !self.isInputHidden);
	      classList.toggle('dropdown-active', self.isOpen);
	      classList.toggle('has-options', isEmptyObject(self.options));
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
	
	  }, {
	    key: "refreshValidityState",
	    value: function refreshValidityState() {
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
	
	  }, {
	    key: "isFull",
	    value: function isFull() {
	      return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
	    }
	    /**
	     * Refreshes the original <select> or <input>
	     * element to reflect the current state.
	     */
	
	  }, {
	    key: "updateOriginalInput",
	    value: function updateOriginalInput(opts) {
	      var i,
	          n,
	          options,
	          label,
	          self = this;
	      opts = opts || {};
	
	      if (self.is_select_tag) {
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
	        self.input.setAttribute('value', self.input.value);
	      }
	
	      if (self.isSetup) {
	        if (!opts.silent) {
	          self.trigger('change', self.input.value);
	        }
	      }
	    }
	    /**
	     * Shows the autocomplete dropdown containing
	     * the available options.
	     */
	
	  }, {
	    key: "open",
	    value: function open() {
	      var self = this;
	      if (self.isLocked || self.isOpen || self.settings.mode === 'multi' && self.isFull()) return;
	      self.focus();
	      self.isOpen = true;
	      self.refreshState();
	      applyCSS(self.dropdown, {
	        visibility: 'hidden',
	        display: 'block'
	      });
	      self.positionDropdown();
	      applyCSS(self.dropdown, {
	        visibility: 'visible',
	        display: 'block'
	      });
	      self.trigger('dropdown_open', self.dropdown);
	    }
	    /**
	     * Closes the autocomplete dropdown menu.
	     */
	
	  }, {
	    key: "close",
	    value: function close() {
	      var self = this;
	      var trigger = self.isOpen;
	
	      if (self.settings.mode === 'single' && self.items.length) {
	        self.hideInput(); // Do not trigger blur while inside a blur event,
	        // this fixes some weird tabbing behavior in FF and IE.
	        // See #1164
	
	        if (!self.isBlurring) {
	          self.blur(); // close keyboard on iOS
	        }
	      }
	
	      self.isOpen = false;
	      applyCSS(self.dropdown, {
	        display: 'none'
	      });
	      self.setActiveOption(null);
	      self.refreshState();
	      if (trigger) self.trigger('dropdown_close', self.dropdown);
	    }
	    /**
	     * Calculates and applies the appropriate
	     * position of the dropdown if dropdownParent = 'body'.
	     * Otherwise, position is determined by css
	     */
	
	  }, {
	    key: "positionDropdown",
	    value: function positionDropdown() {
	      if (this.settings.dropdownParent !== 'body') {
	        return;
	      }
	
	      var context = this.control;
	      var rect = context.getBoundingClientRect();
	      var top = context.offsetHeight + rect.top + window.scrollY;
	      var left = rect.left + window.scrollX;
	      applyCSS(this.dropdown, {
	        width: rect.width + 'px',
	        top: top + 'px',
	        left: left + 'px'
	      });
	    }
	    /**
	     * Resets / clears all selected items
	     * from the control.
	     *
	     * @param {boolean} silent
	     */
	
	  }, {
	    key: "clear",
	    value: function clear(silent) {
	      if (!this.items.length) return;
	      var items = this.controlChildren();
	
	      for (var i = 0; i < items.length; i++) {
	        items[i].remove();
	      }
	
	      this.items = [];
	      this.lastQuery = null;
	      this.setCaret(0);
	      this.setActiveItem(null);
	      this.updateOriginalInput({
	        silent: silent
	      });
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
	
	  }, {
	    key: "insertAtCaret",
	    value: function insertAtCaret(el) {
	      var caret = Math.min(this.caretPos, this.items.length);
	      var target = this.buffer || this.control;
	
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
	
	  }, {
	    key: "deleteSelection",
	    value: function deleteSelection(e) {
	      var i, n, direction, selection, values, caret, tail;
	      var self = this;
	      direction = e && e.keyCode === KEY_BACKSPACE ? -1 : 1;
	      selection = getSelection(self.control_input); // determine items that will be removed
	
	      values = [];
	
	      if (self.activeItems.length) {
	        tail = getTail(self.activeItems, direction);
	        caret = nodeIndex(tail);
	
	        if (direction > 0) {
	          caret++;
	        }
	
	        for (i = 0, n = self.activeItems.length; i < n; i++) {
	          values.push(self.activeItems[i].dataset.value);
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
	      } // allow the callback to abort
	
	
	      if (!values.length || typeof self.settings.onDelete === 'function' && self.settings.onDelete.apply(self, [values, e]) === false) {
	        return false;
	      } // perform removal
	
	
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
	
	  }, {
	    key: "advanceSelection",
	    value: function advanceSelection(direction, e) {
	      var selection, idx, last_active;
	      if (direction === 0) return;
	      if (this.rtl) direction *= -1; // add or remove to active items
	
	      if (this.isKeyDown(KEY_CTRL, e) || this.isKeyDown(KEY_SHIFT, e)) {
	        last_active = this.getLastActive(direction);
	        var adjacent = this.getAdjacent(last_active, direction, 'item');
	
	        if (adjacent) {
	          if (adjacent.classList.contains('active')) {
	            this.removeActiveItem(last_active);
	          }
	
	          this.setActiveItemClass(adjacent); // mark as last_active !! after removeActiveItem() on last_active
	        } // move caret to the left or right
	
	      } else if (this.isFocused && !this.isInputHidden) {
	        if (!this.inputValue().length) {
	          this.setCaret(this.caretPos + direction);
	        } // move caret before or after selected items
	
	      } else {
	        last_active = this.getLastActive(direction);
	
	        if (last_active) {
	          idx = nodeIndex(last_active);
	          this.setCaret(direction > 0 ? idx + 1 : idx);
	          this.setActiveItem(null);
	        }
	      }
	    }
	    /**
	     * Get the last active item
	     *
	     */
	
	  }, {
	    key: "getLastActive",
	    value: function getLastActive(direction) {
	      var last_active = this.control.querySelector('.last-active');
	
	      if (last_active) {
	        return last_active;
	      }
	
	      return querySelectorEnd(this.control, '.active', direction);
	    }
	    /**
	     * Moves the caret to the specified index.
	     *
	     * @param {int} i
	     */
	
	  }, {
	    key: "setCaret",
	    value: function setCaret(i) {
	      var self = this;
	
	      if (self.settings.mode === 'single' || self.settings.controlInput) {
	        i = self.items.length;
	      } else {
	        i = Math.max(0, Math.min(self.items.length, i));
	      }
	
	      if (!self.settings.controlInput && !self.isPending) {
	        // the input must be moved by leaving it in place and moving the
	        // siblings, due to the fact that focus cannot be restored once lost
	        // on mobile webkit devices
	        var j,
	            child,
	            children = this.controlChildren(),
	            n = children.length;
	
	        for (j = 0; j < n; j++) {
	          child = children[j];
	
	          if (j < i) {
	            self.control_input.insertAdjacentElement('beforebegin', child);
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
	
	  }, {
	    key: "controlChildren",
	    value: function controlChildren() {
	      return Array.prototype.filter.call(this.control.children, function (node) {
	        return node.nodeName !== 'INPUT';
	      });
	    }
	    /**
	     * Disables user input on the control. Used while
	     * items are being asynchronously created.
	     */
	
	  }, {
	    key: "lock",
	    value: function lock() {
	      this.close();
	      this.isLocked = true;
	      this.refreshState();
	    }
	    /**
	     * Re-enables user input on the control.
	     */
	
	  }, {
	    key: "unlock",
	    value: function unlock() {
	      this.isLocked = false;
	      this.refreshState();
	    }
	    /**
	     * Disables user input on the control completely.
	     * While disabled, it cannot receive focus.
	     */
	
	  }, {
	    key: "disable",
	    value: function disable() {
	      this.input.disabled = true;
	      this.control_input.disabled = true;
	      this.control_input.tabIndex = -1;
	      this.isDisabled = true;
	      this.lock();
	    }
	    /**
	     * Enables the control so that it can respond
	     * to focus and user input.
	     */
	
	  }, {
	    key: "enable",
	    value: function enable() {
	      this.input.disabled = false;
	      this.control_input.disabled = false;
	      this.control_input.tabIndex = this.tabIndex;
	      this.isDisabled = false;
	      this.unlock();
	    }
	    /**
	     * Completely destroys the control and
	     * unbinds all event listeners so that it can
	     * be garbage collected.
	     */
	
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var revertSettings = this.revertSettings;
	      this.trigger('destroy');
	      this.off();
	      this.wrapper.remove();
	      this.dropdown.remove();
	      this.input.innerHTML = '';
	
	      if (revertSettings.tabindex) {
	        this.input.setAttribute('tabindex', revertSettings.tabindex);
	      } else {
	        this.input.removeAttribute('tabindex');
	      }
	
	      removeClasses(this.input, 'tomselected');
	      this.input.removeAttribute('hidden');
	
	      for (var i = 0; i < revertSettings.children.length; i++) {
	        this.input.appendChild(revertSettings.children[i]);
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
	
	  }, {
	    key: "render",
	    value: function render(templateName, data) {
	      var value, id, label;
	      var html = '';
	      var self = this;
	      var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
	
	      if (templateName === 'option' || templateName === 'item') {
	        value = hash_key(data[self.settings.valueField]); // pull markup from cache if it exists
	
	        if (self.renderCache[templateName].hasOwnProperty(value)) {
	          return self.renderCache[templateName][value];
	        }
	      } // render markup
	
	
	      html = getDom(self.settings.render[templateName].apply(this, [data, escape_html])); // add mandatory attributes
	
	      if (templateName === 'option' || templateName === 'option_create') {
	        if (!data[self.settings.disabledField]) {
	          html.setAttribute('data-selectable', '');
	        }
	      } else if (templateName === 'optgroup') {
	        id = data.group[self.settings.optgroupValueField];
	        html.setAttribute('data-group', id);
	
	        if (data.group[self.settings.disabledField]) {
	          html.setAttribute('data-disabled', '');
	        }
	      }
	
	      if (templateName === 'option' || templateName === 'item') {
	        html.setAttribute('data-value', value); // make sure we have some classes if a template is overwritten
	
	        if (templateName === 'item') {
	          addClasses(html, self.settings.itemClass);
	        } else {
	          addClasses(html, self.settings.optionClass);
	        } // update cache
	
	
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
	
	  }, {
	    key: "clearCache",
	    value: function clearCache(templateName) {
	      var self = this;
	
	      if (typeof templateName === 'undefined') {
	        self.renderCache = {
	          'item': {},
	          'option': {}
	        };
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
	
	  }, {
	    key: "canCreate",
	    value: function canCreate(input) {
	      if (!this.settings.create) return false;
	      var filter = this.settings.createFilter;
	      return input.length && (typeof filter !== 'function' || filter.call(this, input)) && (!(filter instanceof RegExp) || filter.test(input));
	    }
	    /**
	     * Return true if the requested key is down
	     * Will return false if more than one control character is pressed ( when [ctrl+shift+a] != [ctrl+a] )
	     * The current evt may not always set ( eg calling advanceSelection() )
	     *
	     */
	
	  }, {
	    key: "isKeyDown",
	    value: function isKeyDown(key_code, evt) {
	      if (!evt) {
	        return false;
	      }
	
	      if (evt.altKey) {
	        return false;
	      } // if [ctrl+shift], return false
	
	
	      if (evt[KEY_CTRL_NAME] && evt.shiftKey) {
	        return false;
	      }
	
	      if (key_code == KEY_CTRL && evt[KEY_CTRL_NAME]) {
	        return true;
	      }
	
	      if (key_code == KEY_SHIFT && evt.shiftKey) {
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
	
	  }, {
	    key: "hook",
	    value: function hook(when, method, new_fn) {
	      var self = this;
	      var orig_method = self[method];
	
	      self[method] = function () {
	        var result, result_new;
	
	        if (when === 'after') {
	          result = orig_method.apply(self, arguments);
	        }
	
	        result_new = new_fn.apply(self, arguments);
	
	        if (when === 'instead') {
	          return result_new;
	        }
	
	        if (when === 'before') {
	          result = orig_method.apply(self, arguments);
	        }
	
	        return result;
	      };
	    }
	  }]);
	
	  return TomSelect;
	}(MicroEvent);
	
	; // mixins
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	if (typeof MicroPlugin === "undefined") {
	  throw 'Dependency MicroPlugin is missing. Make sure you either: (1) are using the "complete" version of Tom Select, or (2) require MicroPlugin before you load Tom Select.';
	}
	
	MicroPlugin.mixin(TomSelect);
	TomSelect.count = 0;
	TomSelect.defaults = {
	  options: [],
	  optgroups: [],
	  plugins: [],
	  delimiter: ',',
	  splitOn: null,
	  // regexp or string for splitting up values from a paste command
	  persist: true,
	  diacritics: true,
	  create: false,
	  createOnBlur: false,
	  createFilter: null,
	  highlight: true,
	  openOnFocus: true,
	  maxOptions: 50,
	  maxItems: null,
	  hideSelected: null,
	  duplicates: false,
	  addPrecedence: false,
	  selectOnTab: false,
	  preload: false,
	  allowEmptyOption: false,
	  closeAfterSelect: false,
	  scrollDuration: 60,
	  loadThrottle: 300,
	  loadingClass: 'loading',
	  dataAttr: null,
	  //'data-data',
	  optgroupField: 'optgroup',
	  valueField: 'value',
	  labelField: 'text',
	  disabledField: 'disabled',
	  optgroupLabelField: 'label',
	  optgroupValueField: 'value',
	  lockOptgroupOrder: false,
	  sortField: '$order',
	  searchField: ['text'],
	  searchConjunction: 'and',
	  mode: null,
	  wrapperClass: 'ts-control',
	  inputClass: 'ts-input',
	  dropdownClass: 'ts-dropdown',
	  dropdownContentClass: 'ts-dropdown-content',
	  itemClass: 'item',
	  optionClass: 'option',
	  dropdownParent: null,
	  controlInput: null,
	  copyClassesToDropdown: true,
	
	  /*
	  load                 : null, // function(query, callback) { ... }
	  score                : null, // function(search) { ... }
	  onInitialize         : null, // function() { ... }
	  onChange             : null, // function(value) { ... }
	  onItemAdd            : null, // function(value, $item) { ... }
	  onItemRemove         : null, // function(value) { ... }
	  onClear              : null, // function() { ... }
	  onOptionAdd          : null, // function(value, data) { ... }
	  onOptionRemove       : null, // function(value) { ... }
	  onOptionClear        : null, // function() { ... }
	  onOptionGroupAdd     : null, // function(id, data) { ... }
	  onOptionGroupRemove  : null, // function(id) { ... }
	  onOptionGroupClear   : null, // function() { ... }
	  onDropdownOpen       : null, // function(dropdown) { ... }
	  onDropdownClose      : null, // function(dropdown) { ... }
	  onType               : null, // function(str) { ... }
	  onDelete             : null, // function(values) { ... }
	  */
	  render: {
	    /*
	    item: null,
	    optgroup: null,
	    optgroup_header: null,
	    option: null,
	    option_create: null
	    */
	  }
	};
	TomSelect.define('change_listener', function (options) {
	  var self = this;
	  var changed = false;
	  self.input.addEventListener('change', function () {
	    // prevent infinite loops
	    if (changed) {
	      changed = false;
	      return;
	    }
	
	    changed = true;
	    var settings = getSettings(self.input, {});
	    self.setupOptions(settings.options, settings.optgroups);
	    self.setValue(settings.items);
	  });
	});
	TomSelect.define('drag_drop', function (options) {
	  if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
	  if (this.settings.mode !== 'multi') return;
	  var self = this;
	  var orig_lock = self.lock;
	  var orig_unlock = self.unlock;
	  self.hook('instead', 'lock', function () {
	    var sortable = self.control.dataset.sortable;
	    if (sortable) sortable.disable();
	    return orig_lock.apply(self, arguments);
	  });
	  self.hook('instead', 'unlock', function () {
	    var sortable = self.control.dataset.sortable;
	    if (sortable) sortable.enable();
	    return orig_unlock.apply(self, arguments);
	  });
	  self.hook('after', 'setup', function () {
	    var $control = $(self.control).sortable({
	      items: '[data-value]',
	      forcePlaceholderSize: true,
	      disabled: self.isLocked,
	      start: function start(e, ui) {
	        ui.placeholder.css('width', ui.helper.css('width'));
	        $control.css({
	          overflow: 'visible'
	        });
	      },
	      stop: function stop() {
	        $control.css({
	          overflow: 'hidden'
	        });
	        var values = [];
	        $control.children('[data-value]').each(function () {
	          values.push($(this).attr('data-value'));
	        });
	        self.setValue(values);
	      }
	    });
	  });
	});
	TomSelect.define('dropdown_header', function (options) {
	  var self = this;
	  options = Object.assign({
	    title: 'Untitled',
	    headerClass: 'dropdown-header',
	    titleRowClass: 'dropdown-header-title',
	    labelClass: 'dropdown-header-label',
	    closeClass: 'dropdown-header-close',
	    html: function html(data) {
	      return '<div class="' + data.headerClass + '">' + '<div class="' + data.titleRowClass + '">' + '<span class="' + data.labelClass + '">' + data.title + '</span>' + '<a href="javascript:void(0)" class="' + data.closeClass + '">&times;</a>' + '</div>' + '</div>';
	    }
	  }, options);
	  self.hook('after', 'setup', function () {
	    var header = getDom(options.html(options));
	    self.dropdown.insertBefore(header, self.dropdown.firstChild);
	  });
	});
	TomSelect.define('input_autogrow', function (options) {
	  var self = this;
	  self.hook('after', 'setup', function () {
	    var test_input = document.createElement('span');
	    var control = this.control_input;
	    test_input.style.position = 'absolute';
	    test_input.style.top = '-99999px';
	    test_input.style.left = '-99999px';
	    test_input.style.width = 'auto';
	    test_input.style.padding = 0;
	    test_input.style.whiteSpace = 'pre';
	    self.wrapper.appendChild(test_input);
	    var transfer_styles = ['letterSpacing', 'fontSize', 'fontFamily', 'fontWeight', 'textTransform'];
	
	    for (var i = 0, n = transfer_styles.length; i < n; i++) {
	      var style_name = transfer_styles[i];
	      test_input.style[style_name] = control.style[style_name];
	    }
	    /**
	     * Set the control width
	     *
	     * @param {string} str
	     */
	
	
	    var resize = function resize() {
	      test_input.textContent = control.value;
	      control.style.width = test_input.clientWidth + 'px';
	    };
	
	    control.addEventListener('input', resize);
	    control.addEventListener('keyup', resize);
	    control.addEventListener('blur', resize);
	    control.addEventListener('update', resize);
	  });
	});
	TomSelect.define('no_backspace_delete', function (options) {
	  this.hook('instead', 'setActiveItem', function () {});
	  this.hook('instead', 'selectAll', function () {});
	  this.hook('instead', 'deleteSelection', function () {});
	});
	TomSelect.define('optgroup_columns', function (options) {
	  var self = this;
	  var orig_keydown = self.onKeyDown;
	  self.hook('instead', 'onKeyDown', function (evt) {
	    var index, option, options, optgroup;
	
	    if (!self.isOpen || !(evt.keyCode === KEY_LEFT || evt.keyCode === KEY_RIGHT)) {
	      return orig_keydown.apply(self, arguments);
	    }
	
	    self.ignoreHover = true;
	    optgroup = parentMatch(self.activeOption, '[data-group]');
	    index = nodeIndex(self.activeOption, '[data-selectable]');
	
	    if (evt.keyCode === KEY_LEFT) {
	      optgroup = optgroup.previousSibling;
	    } else {
	      optgroup = optgroup.nextSibling;
	    }
	
	    if (!optgroup) {
	      return;
	    }
	
	    options = optgroup.querySelectorAll('[data-selectable]');
	    option = options[Math.min(options.length - 1, index)];
	
	    if (option) {
	      self.setActiveOption(option);
	    }
	  });
	});
	TomSelect.define('remove_button', function (options) {
	  options = Object.assign({
	    label: '&times;',
	    title: 'Remove',
	    className: 'remove',
	    append: true
	  }, options); //options.className = 'remove-single';
	
	  var self = this; // override the render method to add remove button to each item
	
	  if (!options.append) {
	    return;
	  }
	
	  var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';
	  self.hook('after', 'setupTemplates', function () {
	    var orig_render_item = self.settings.render.item;
	
	    self.settings.render.item = function () {
	      var rendered = getDom(orig_render_item.apply(self, arguments));
	      var close_button = getDom(html);
	      rendered.appendChild(close_button);
	      close_button.addEventListener('mousedown', function (evt) {
	        evt.preventDefault();
	        evt.stopPropagation();
	      });
	      close_button.addEventListener('click', function (evt) {
	        evt.preventDefault();
	        evt.stopPropagation(); // propagating will trigger the dropdown to show for single mode
	
	        if (self.settings.mode !== 'single') {
	          evt.stopPropagation();
	        }
	
	        if (self.isLocked) return;
	        var value = rendered.dataset.value;
	        self.removeItem(value);
	        self.refreshOptions(false);
	      });
	      return rendered;
	    };
	  });
	});
	TomSelect.define('restore_on_backspace', function (options) {
	  var self = this;
	
	  options.text = options.text || function (option) {
	    return option[self.settings.labelField];
	  };
	
	  var orig_keydown = self.onKeyDown;
	  self.hook('instead', 'onKeyDown', function (evt) {
	    var index, option;
	
	    if (evt.keyCode === KEY_BACKSPACE && self.control_input.value === '' && !self.activeItems.length) {
	      index = self.caretPos - 1;
	
	      if (index >= 0 && index < self.items.length) {
	        option = self.options[self.items[index]];
	
	        if (self.deleteSelection(evt)) {
	          self.setTextboxValue(options.text.call(self, option));
	          self.refreshOptions(true);
	        }
	
	        evt.preventDefault();
	        return;
	      }
	    }
	
	    return orig_keydown.apply(self, arguments);
	  });
	});
	//# sourceMappingURL=tom-select.js.map
	

	return TomSelect;
}));

var tomSelect = function(el,opts){
	return new TomSelect(el,opts);
}
