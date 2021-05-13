
async function asyncClick(el){
	return new Promise(resolve => {
		syn.click(el).delay(100,()=>{
			resolve();
		});
	});
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
