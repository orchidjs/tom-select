


describe('plugin: change_listener', function() {

	it_n('Tom Select should update when original input is changed', function() {

		let test = setup_test('<input value="original">', {plugins: ['change_listener']});

		assert.equal( Object.keys(test.instance.options).length, 1);

		var input = test.$select[0];
		input.value = 'new value';
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent('change', false, true);
		input.dispatchEvent(evt);

		assert.equal( Object.keys(test.instance.options).length, 2);
		assert.equal( test.instance.items.length, 1);
		assert.equal( test.instance.items[0], 'new value');

	});

});
