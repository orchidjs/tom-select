
describe('plugin: no_backspace_delete', function() {

	it_n('should not delete item on backspace', function(done) {

		let test = setup_test('<input value="a,b">', {plugins: ['no_backspace_delete']});

		assert.equal( test.instance.items.length, 2 );
		assert.equal( test.instance.activeItems.length, 0, 'no active items' );

		syn.click(test.instance.control_input,function(){
			syn.type('\b', test.instance.control_input, function() {

				assert.equal( test.instance.items.length, 2, 'item was deleted');
				done();

			});
		});

	});

	it_n('should delete active item on backspace', function(done) {

		let test = setup_test('<input value="a,b">', {plugins: ['no_backspace_delete']});

		syn.click(test.instance.control_input,function(){

			test.instance.setActiveItem(test.instance.getItem('b'));
			assert.equal( test.instance.items.length, 2 );
			assert.equal( test.instance.activeItems.length, 1, 'no active items' );

			syn.type('\b', test.instance.control_input, function() {

				assert.equal( test.instance.items.length, 1, 'item not deleted' );
				done();

			});
		});

	});


});
