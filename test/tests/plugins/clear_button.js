


describe('plugin: clear_button', function() {

	it_n('should remove all item when button is clicked', function(done) {

		var on_change_calls = 0;
		let test = setup_test('AB_Multi', {
			plugins: ['clear_button'],
			onChange:function(){
				on_change_calls++;
			}
		});

		test.instance.addItem('a');
		test.instance.addItem('b');

		on_change_calls = 0;
		assert.equal( test.instance.items.length, 2 );

		var button			= test.instance.control.querySelector('.clear-button');

		syn.click( button, function() {
			assert.equal( test.instance.items.length, 0, 'should clear items array'  );
			assert.equal( on_change_calls, 1,'should only call onChange once' );
			done();
		});

	});

});
