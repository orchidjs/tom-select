
/**
 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 *
 * @param {mixed} query
 * @return {Element}
 */
var getDom = function( query ){

	if( query.jquery ){
		return query[0];
	}

	if( query instanceof HTMLElement ){
		return query;
	}

	if( query.indexOf('<') > -1 ){
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
var triggerEvent = function( dom_el, event_name ){
	var event = document.createEvent('HTMLEvents');
	event.initEvent(event_name, true, false);
	dom_el.dispatchEvent(event)
};

/**
 * Apply CSS rules to a dom element
 *
 */
var applyCSS = function( dom_el, css){
	Object.keys(css).forEach(function(name){
		dom_el.style[name] = css[name];
	});
}


/**
 * Add css classes
 *
 */
var addClasses = function( el ){

	var classes		= classesArray.apply(null,arguments);
	el				= castAsArray(el);

	for( let i = 0; i< el.length; i++){
		el[i].classList.add( ...classes );
	}
}

/**
 * Remove css classes
 *
 */
 var removeClasses = function( el ){

 	var classes 	= classesArray.apply(null,arguments);
	el				= castAsArray(el);

 	for( let i =0; i< el.length; i++){
 		el[i].classList.remove( ...classes );
 	}
 }


/**
 * Return arguments
 *
 */
var classesArray = function(){
	var classes = [];
	for( let i = 1; i < arguments.length; i++ ){
		let _classes = arguments[i];
		if( typeof _classes === 'string' ){
			_classes = _classes.trim().split(/[\11\12\14\15\40]/);
		}
		if( Array.isArray(_classes) ){
			classes = classes.concat(_classes);
		}
	}

	return classes.filter(Boolean);
}

var castAsArray = function(arg){
	if( !Array.isArray(arg) ){
 		arg = [arg];
 	}
	return arg;
}

/**
 * Delegate Event
 *
 */
var onEvent = function( el, eventName, elementSelector, handler ){

	let event_names	= eventName.split(/\s/);

	// create intermediate handler that can be used for all event names
	// loop parent nodes from the target to the delegation node
	let _handler = function(e) {
		var target_match = parentMatch(e.target, elementSelector, el);
		if( target_match ){
			e.delegateTarget = target_match;
			handler.call(target_match, e);
		}
	};

	for( let i = 0; i<event_names.length; i++){
		el.addEventListener(event_names[i], _handler, false);
	}

};


/**
 * Get the closest node to the evt.target matching the selector
 * Stops at el
 *
 */
var parentMatch = function(target, selector, el ){
	while( target && target.matches && target != el ){

		if( target.matches(selector) ){
			return target;
		}

		target = target.parentNode;
	}
}

/**
 * Get the first or last item from a querySelectorAll result
 *
 * > 0 - right (last)
 * < 0 - left (first)
 *
 */
var querySelectorEnd = function( el, query, direction){
	var result = el.querySelectorAll(query);
	if( !result ){
		return;
	}

	return getTail(result,direction);
};


/**
 * Get the first or last item from an array
 *
 */
var getTail = function( array, direction ){

	if( direction > 0 ){
		return array[array.length-1];
	}

	return array[0];
}

/**
 * Return true if an object is empty
 *
 */
var isEmptyObject = function(obj){
	return (Object.keys(obj).length === 0);
}


/**
 * Get the index of an element amongst sibling nodes of the same type
 *
 */
var nodeIndex = function( el, amongst ){
	if (!el) return -1;

	amongst = amongst || el.nodeName;

	var i = 0;
	while( el = el.previousElementSibling ){

		if( el.matches(amongst) ){
			i++;
		}
	}
	return i;
}



/**
 * Copied from jQuery source
 *
 */
var hasOwn 		= ( {} ).hasOwnProperty;
var fnToString	= hasOwn.toString;
var getProto	= Object.getPrototypeOf;
var ObjectFunctionString = fnToString.call( Object );

var isPlainObject = function( obj ) {
	var proto, Ctor;

	// Detect obvious negatives
	// Use toString instead of jQuery.type to catch host objects
	if ( !obj || toString.call( obj ) !== "[object Object]" ) {
		return false;
	}

	proto = getProto( obj );

	// Objects with no prototype (e.g., `Object.create( null )`) are plain
	if ( !proto ) {
		return true;
	}

	// Objects with prototype are plain iff they were constructed by a global Object function
	Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
	return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
};


var isFunction = function( obj ) {

	// Support: Chrome <=57, Firefox <=52
	// In some browsers, typeof returns "function" for HTML <object> elements
	// (i.e., `typeof document.createElement( "object" ) === "function"`).
	// We don't want to classify *any* DOM node as a function.
	return typeof obj === "function" && typeof obj.nodeType !== "number";
};

var extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};
