
/**
 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 *
 * @param {mixed} query
 * @return {Element}
 */
export function getDom( query ){

	if( query.jquery ){
		return query[0];
	}

	if( query instanceof HTMLElement ){
		return query;
	}

	if( query.indexOf('<') > -1 ){
		let div = document.createElement('div');
		div.innerHTML = query.trim(); // Never return a text node of whitespace as the result
		return div.firstChild;
	}

	return document.querySelector(query);
};

/**
 * Dispatch an event
 *
 */
export function triggerEvent( dom_el, event_name ){
	var event = document.createEvent('HTMLEvents');
	event.initEvent(event_name, true, false);
	dom_el.dispatchEvent(event)
};

/**
 * Apply CSS rules to a dom element
 *
 */
export function applyCSS( dom_el, css){
	Object.keys(css).forEach(function(name){
		dom_el.style[name] = css[name];
	});
}


/**
 * Add css classes
 *
 */
export function addClasses( elmts ){

	var classes		= classesArray.apply(null,arguments);
	elmts			= castAsArray(elmts);

	elmts.map( el => {
		classes.map( cls => {
			el.classList.add( cls );
		});
	});
}

/**
 * Remove css classes
 *
 */
 export function removeClasses( elmts ){

 	var classes 	= classesArray.apply(null,arguments);
	elmts		= castAsArray(elmts);

	elmts.map( el => {
		classes.map(cls => {
	 		el.classList.remove( cls );
		});
 	});
 }


/**
 * Return arguments
 *
 */
export function classesArray(){
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

export function castAsArray(arg){
	if( !Array.isArray(arg) ){
 		arg = [arg];
 	}
	return arg;
}

/**
 * Delegate Event
 *
 */
export function onEvent( el, eventName, elementSelector, handler ){

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
		el.addEventListener(event_names[i], _handler, true);
	}

};


/**
 * Get the closest node to the evt.target matching the selector
 * Stops at wrapper
 *
 */
export function parentMatch(target, selector, wrapper ){

	if( wrapper && !wrapper.contains(target) ){
		return;
	}

	while( target && target.matches ){

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
export function querySelectorEnd( el, query, direction){
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
export function getTail( array, direction ){

	if( direction > 0 ){
		return array[array.length-1];
	}

	return array[0];
}

/**
 * Return true if an object is empty
 *
 */
export function isEmptyObject(obj){
	return (Object.keys(obj).length === 0);
}


/**
 * Get the index of an element amongst sibling nodes of the same type
 *
 */
export function nodeIndex( el, amongst ){
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
