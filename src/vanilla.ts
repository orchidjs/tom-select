
/**
 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 *
 * param query should be {}
 */
export function getDom( query:any ):HTMLElement{

	if( query.jquery ){
		return query[0];
	}

	if( query instanceof HTMLElement ){
		return query;
	}

	if( query.indexOf('<') > -1 ){
		let div = document.createElement('div');
		div.innerHTML = query.trim(); // Never return a text node of whitespace as the result
		return div.firstChild as HTMLElement;
	}

	return document.querySelector(query);
};

export function escapeQuery(query:string):string{
	return query.replace(/['"\\]/g, '\\$&');
}

/**
 * Dispatch an event
 *
 */
export function triggerEvent( dom_el:HTMLElement, event_name:string ):void{
	var event = document.createEvent('HTMLEvents');
	event.initEvent(event_name, true, false);
	dom_el.dispatchEvent(event)
};

/**
 * Apply CSS rules to a dom element
 *
 */
export function applyCSS( dom_el:HTMLElement, css:{ [key: string]: string|number }):void{
	Object.assign(dom_el.style, css);
}


/**
 * Add css classes
 *
 */
export function addClasses( elmts:HTMLElement|HTMLElement[], ...classes:string[]|string[][] ){

	var norm_classes 	= classesArray(classes);
	elmts				= castAsArray(elmts);

	elmts.map( el => {
		norm_classes.map( cls => {
			el.classList.add( cls );
		});
	});
}

/**
 * Remove css classes
 *
 */
 export function removeClasses( elmts:HTMLElement|HTMLElement[], ...classes:string[]|string[][] ){

 	var norm_classes 	= classesArray(classes);
	elmts				= castAsArray(elmts);

	elmts.map( el => {
		norm_classes.map(cls => {
	 		el.classList.remove( cls );
		});
 	});
 }


/**
 * Return arguments
 *
 */
export function classesArray(args:string[]|string[][]):string[]{
	var classes:string[] = [];
	for( let _classes of args ){
		if( typeof _classes === 'string' ){
			_classes = _classes.trim().split(/[\11\12\14\15\40]/);
		}
		if( Array.isArray(_classes) ){
			classes = classes.concat(_classes);
		}
	}

	return classes.filter(Boolean);
}


/**
 * Create an array from arg if it's not already an array
 *
 */
export function castAsArray(arg:any):Array<any>{
	if( !Array.isArray(arg) ){
 		arg = [arg];
 	}
	return arg;
}


/**
 * Get the closest node to the evt.target matching the selector
 * Stops at wrapper
 *
 */
export function parentMatch( target:HTMLElement, selector:string, wrapper?:HTMLElement ):HTMLElement|void{

	if( wrapper && !wrapper.contains(target) ){
		return;
	}

	while( target && target.matches ){

		if( target.matches(selector) ){
			return target;
		}

		target = target.parentNode as HTMLElement;
	}
}


/**
 * Get the first or last item from an array
 *
 * > 0 - right (last)
 * < 0 - left (first)
 *
 */
export function getTail( list:Array<any>|NodeList, direction:number ):any{

	if( direction > 0 ){
		return list[list.length-1];
	}

	return list[0];
}

/**
 * Return true if an object is empty
 *
 */
export function isEmptyObject(obj:object):boolean{
	return (Object.keys(obj).length === 0);
}


/**
 * Get the index of an element amongst sibling nodes of the same type
 *
 */
export function nodeIndex( el:Element, amongst?:string ):number{
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
