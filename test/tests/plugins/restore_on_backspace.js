

describe('plugin: restore_on_backspace', function() {

	it_n('should fill control_input.value when item deleted', function(done) {

		var test = setup_test('AB_Multi',{plugins:['restore_on_backspace']});

		test.instance.addItem('a');
		test.instance.addItem('b');
		assert.equal( test.instance.items.length, 2 );

		syn.click(test.instance.control_input,function(){
			syn.type('a\b\b', test.instance.control_input, function() {
				assert.equal( test.instance.items.length, 1 );
				assert.equal( test.instance.items[0], 'a' );
				assert.equal( test.instance.control_input.value, 'b' );
				done();

			});
		});

	});

	it_n('should fill control_input.value when active item deleted', function(done) {

		var test = setup_test('AB_Multi',{hidePlaceholder:true,plugins:['restore_on_backspace']});

		click(test.instance.control_input,function(){

			test.instance.addItem('a');
			test.instance.addItem('b');
			assert.equal( test.instance.items.length, 2 );
			test.instance.setActiveItem(test.instance.getItem('a'));

			syn.type('\b', test.instance.control_input, function() {
				assert.equal( test.instance.items.length, 1, 'items.length not 1' );
				assert.equal( test.instance.items[0], 'b', 'first item not b' );
				assert.equal( test.instance.control_input.value, 'a', 'input value not a');
				done();

			});
		});

	});

});
