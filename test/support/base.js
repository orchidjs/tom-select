window.expect = chai.expect;
window.assert = chai.assert;
window.has_focus = function(elem) {
	return !!(elem === document.activeElement);
};

var sandbox = document.createElement('form');
document.body.appendChild(sandbox);
var test_number = 0;

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


var it_n = function(){
	arguments[0] = (test_number++) + ' - ' + arguments[0];
	it.apply( this, arguments);
}

$(sandbox).on('submit', function(e) { e.preventDefault(); });

var click = function(el, cb) {
	syn.click(el).delay(100, cb);
};
