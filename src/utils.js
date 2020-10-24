/**
 * Determines if the provided value has been defined.
 *
 * @param {mixed} object
 * @returns {boolean}
 */
var isset = function(object) {
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
var hash_key = function(value) {
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
var escape_html = function(str) {
	return (str + '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
};


/**
 * Debounce all fired events types listed in `types`
 * while executing the provided `fn`.
 *
 * @param {object} self
 * @param {array} types
 * @param {function} fn
 */
var debounce_events = function(self, types, fn) {
	var type;
	var trigger = self.trigger;
	var event_args = {};

	// override trigger method
	self.trigger = function() {
		var type = arguments[0];
		if (types.indexOf(type) !== -1) {
			event_args[type] = arguments;
		} else {
			return trigger.apply(self, arguments);
		}
	};

	// invoke provided function
	fn.apply(self, []);
	self.trigger = trigger;

	// trigger queued events
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
var getSelection = function(input) {
	return {
		start	: input.selectionStart,
		length	: input.selectionEnd - input.selectionStart,
	};
};

export { isset, hash_key, escape_html, debounce_events, getSelection};
