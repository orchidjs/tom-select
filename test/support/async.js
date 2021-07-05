
function mouseEvent(el,evt='click') {
	const event = new MouseEvent(evt, {
		view: window,
		bubbles: true,
		cancelable: true,
		composed: true
	});
	const cancelled = !el.dispatchEvent(event);
	return cancelled;
}


async function asyncClick(el){

	if( mouseEvent(el,'mousedown') ){
		mouseEvent(el,'click');
	}
	
	await waitFor(100);
}

async function asyncType(text,el){
	return new Promise(resolve => {
		syn.type(text,el,()=>{
			resolve();
		});
	});
}


async function waitFor(delay){
	return new Promise(resolve => {
		setTimeout(resolve,delay);
	});

}
