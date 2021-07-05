/**
 * MicroEvent - to make any js object an event emitter
 *
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * @author Jerome Etienne (https://github.com/jeromeetienne)
 */

type TCallback = (...args:any) => any;

/**
 * Execute callback for each event in space separated list of event names
 *
 */
function forEvents(events:string,callback:(event:string)=>any){
	events.split(/\s+/).forEach((event) =>{
		callback(event);
	});
}

export default class MicroEvent{

	public _events: {[key:string]:TCallback[]};

	constructor(){
		this._events = {};
	}

	on(events:string, fct:TCallback){
		forEvents(events,(event) => {
			this._events[event] = this._events[event] || [];
			this._events[event].push(fct);
		});
	}

	off(events:string, fct:TCallback){
		var n = arguments.length;
		if( n === 0 ){
			this._events = {};
			return;
		}

		forEvents(events,(event) => {

			if (n === 1) return delete this._events[event];

			if (event in this._events === false) return;
			this._events[event].splice(this._events[event].indexOf(fct), 1);
		});
	}

	trigger(events:string, ...args:any){
		var self = this;

		forEvents(events,(event) => {
			if(event in self._events === false) return;
			for( let fct of self._events[event] ){
				fct.apply(self, args );
			}
		});
	}
};
