
/**
 * Create a new DOM element from an HTML string
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 *
 * @param {String} html representing a single element
 * @return {Element}
 */
var htmlToElement = function( html ){
	
	if( html.jquery ){
		return html[0];
	}

	if( html instanceof HTMLElement ){
		return html;
	}

	var div = document.createElement('div');
	div.innerHTML = html.trim(); // Never return a text node of whitespace as the result
	return div.firstChild; 
};


/**
 * Return a dom element from either a dom query string, jQuery object or a dom element
 *
 */
var getDom = function( query ){

	if( query.jquery ){
		return query[0];
	}

	if( query instanceof HTMLElement ){
		return query;
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
 * Merge the contents of two or more objects together into the first object.
 *
 */
var deepAssign = function(obj1){
	var extended = {};
	var i;

	if( Array.isArray(obj1) ){
		extended = [];
	}


	// Merge the object into the extended object
	// If deep merge and property is an object, merge properties
	var merge = function (obj) {

		var prop;
		for ( prop in obj ) {

			if( !obj.hasOwnProperty(prop) ){
				continue;
			}

			if( obj[prop] === null ){ 
				continue;
			}

			// create array
			if( !(prop in extended) && Array.isArray(obj[prop]) ){
				extended[prop] = [];
			}

			// deep copy if object
			if( typeof(obj[prop]) === 'object' ){
				if( obj[prop].jquery ){
					extended[prop] = obj[prop];
				}else{
					extended[prop] = deepAssign( extended[prop], obj[prop] );
				}
			}else{
				extended[prop] = obj[prop];
			}

		}
	};

	// Loop through each object and conduct a merge
	for( i = 0; i < arguments.length; i++){
		merge(arguments[i]);
	}

	return extended;

};