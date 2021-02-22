
describe('plugin: no_backspace_delete', function() {

	it_n('should not delete item on backspace', function(done) {

		let test = setup_test('AB_Multi', {plugins: ['no_backspace_delete']});

		test.instance.addItem('a');
		test.instance.addItem('b');
		test.instance.setActiveItem(test.instance.getItem('b'));

		assert.equal( test.instance.items.length, 2 );
		assert.equal( test.instance.activeItems.length, 0 );

		syn.click(test.instance.control_input,function(){
			syn.type('\b', test.instance.control_input, function() {

				assert.equal( test.instance.items.length, 2 );
				done();

			});
		});

	});


});
