window.expect = chai.expect;
window.assert = chai.assert;
window.has_focus = function(elem) {
	return !!(elem === document.activeElement);
};

var sandbox = document.createElement('form');
document.body.appendChild(sandbox);
var test_number = 0;

var test_html = {
	AB_Multi			: '<select multiple><option value="a"></option><option value="b"></option><option value="c"></option></select>',
	AB_Single			: '<select><option value="a"></option><option value="b"></option><option value="c"></option></select>',
}

window.setup_test = function(html, options, callback) {
	if (window.test_last) window.test_last.teardown();

	if( html in test_html ){
		html = test_html[html];
	}

	var $select = $(html).appendTo(sandbox).selectize(options);
	var instance = $select[0].selectize;
	var test = window.test_last = {
		$select: $select,
		callback: callback,
		selectize: instance,
		teardown: function() {
			instance.destroy();
			$select.remove();
			window.test_last = null;
		}
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
	if (window.test_last) {
		window.test_last.teardown();
	}
});


var it_n = function(){
	arguments[0] = (test_number++) + ' - ' + arguments[0];
	it.apply( this, arguments);
}

$(sandbox).on('submit', function(e) { e.preventDefault(); });
