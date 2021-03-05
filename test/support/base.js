window.expect = chai.expect;
window.assert = chai.assert;
window.has_focus = function(elem) {
	return !!(elem === document.activeElement);
};

var sandbox = document.createElement('div');
document.body.appendChild(sandbox);

var IS_MAC      		= /Mac/.test(navigator.userAgent);
var shortcut_key		= IS_MAC ? 'meta' : 'ctrl';
var test_number			= 0;
var $current_test_label = $('<h1 style="white-space:nowrap;overflow:hidden"></h1>').prependTo(sandbox);


var teardownLast = function(){
	if( window.test_last ){
		window.test_last.instance.destroy();
		window.test_last.$html.remove();
		//sandbox.innerHTML = '';
		window.test_last = null;
	}
}

var test_html = {
	AB_Multi			: '<select multiple><option value="a">a</option><option value="b">b</option><option value="c">c</option></select>',
	AB_Single			: '<select><option value="a">a</option><option value="b">b</option><option value="c">c</option></select>',
}

window.setup_test = function(html, options, callback) {
	teardownLast();

	if( html in test_html ){
		html = test_html[html];
	}


	var $html			= $(html).appendTo(sandbox);
	var $select			= $html.find('.setup-here');
	if( $select.length === 0 ){
		$select = $html;
	}

	var instance = tomSelect($select,options);
	var test = window.test_last = {
		$html: $html,
		$select: $select,
		callback: callback,
		instance: instance
	};

	return test;
};

/**
 * Create a test with two options
 *
 */
window.ABTestSingle = function(options){
	return setup_test('ABTestSingle', options);
};


after(function() {
	window.teardownLast();
});


var it_n = function(label,orig_func){
	var new_func;

	label = (test_number++) + ' - ' + label

	if( orig_func.length > 0 ){
		new_func = function(done){
			$current_test_label.text(label);
			return orig_func.call(this,done);
		};
	}else{
		new_func = function(){
			$current_test_label.text(label);
			return orig_func.call(this);
		};
	}

	it.call( this, label, new_func );
}


var click = function(el, cb) {
	syn.click(el).delay(100, cb);
};
