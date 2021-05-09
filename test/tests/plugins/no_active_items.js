
describe('plugin: no_active_items', function() {

	it_n('should not activate item on click', function(done) {

		let test = setup_test('<input value="a,b">', {plugins: ['no_active_items']});
		var item = test.instance.getItem('a');

		assert.equal( test.instance.items.length, 2 , 'no items' );

		click(item,function(){
			assert.equal( test.instance.activeItems.length, 0 , 'has active item' );
			done();
		});

	});

});
