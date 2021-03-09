


describe('plugin: clear_button', function() {

	it_n('should remove all item when button is clicked', function(done) {

		let test = setup_test('AB_Multi', {plugins: ['clear_button']});

		test.instance.addItem('a');
		test.instance.addItem('b');
		assert.equal( test.instance.items.length, 2 );

		var button			= test.instance.control.querySelector('.clear-button');

		syn.click( button, function() {
			assert.equal( test.instance.items.length, 0 );
			done();
		});

	});

});
