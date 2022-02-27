describe('plugin: caret_position', function() {

	it_n('should move caret when [left] or [right] pressed', function(done) {
		var test = setup_test('<input type="text" value="a,b,c,d">', {
			plugins:['caret_position'],
			create: true
		});

		click(test.instance.control, function() {
			syn.type('[left][left]whatt', test.instance.control_input, function() {
				expect(test.instance.caretPos).to.be.equal(2);
				done();
			});
		});
	});

	it_n('should move caret left when [left] pressed, then should select item after control when ['+shortcut_key+'][right] pressed', function(done) {
		var test = setup_test('AB_Multi',{
			plugins:['caret_position'],
		});

		test.instance.addItem('a');
		test.instance.addItem('b');
		var itemb = test.instance.getItem('b');
		var itema = test.instance.getItem('a');

		click(test.instance.control, function() {

			syn.type('[left]['+shortcut_key+'][right]['+shortcut_key+'-up]', test.instance.control_input, function() {

				assert.equal( test.instance.activeItems.length , 1);
				assert.equal( test.instance.activeItems[0] , itemb);
				assert.equal( itemb.previousElementSibling, test.instance.control_input );

				done();
			});
		});

	});
	
	it_n('should move caret before selected item when [left] pressed', function(done) {
		var test = setup_test('AB_Multi',{
			plugins:['caret_position'],
		});

		test.instance.addItem('a');
		test.instance.addItem('b');
		var itema = test.instance.getItem('a');
		var itemb = test.instance.getItem('b');

		click(test.instance.control, function() {

			test.instance.setActiveItem(itemb);
			
			expect( itemb.nextElementSibling ).to.be.equal( test.instance.control_input );

			syn.type('[left]', test.instance.control_input, function() {
				expect( itemb.previousElementSibling ).to.be.equal( test.instance.control_input );
				done();
			});
		});

	});
	
	
	it_n('should remove first item when left then backspace pressed', function(done) {

		var test = setup_test('AB_Multi',{
			plugins:['caret_position'],
		});
		
		test.instance.addItem('a');
		test.instance.addItem('b');
		assert.equal( test.instance.items.length, 2 );

		click(test.instance.control, function() {
			syn.type('[left]\b', test.instance.control_input, function() {

				assert.equal( test.instance.items.length, 1 );
				assert.equal( test.instance.items[0], 'b' );
				done();
			});
		});

	});

	it_n('move after active item', async() => {

		var test = setup_test('AB_Multi',{
			plugins:['caret_position'],
		});
		
		test.instance.addItem('a');
		test.instance.addItem('b');
		assert.equal( test.instance.items.length, 2 );
		
		var itemb = test.instance.getItem('b');
		await asyncClick(itemb);
		
		assert.isTrue( itemb.classList.contains('last-active') );

		assert.equal(test.instance.caretPos,2);
		await asyncType('[left]');
		assert.equal(test.instance.caretPos,1);
		await asyncType('[left]');
		assert.equal(test.instance.caretPos,0);

	});
	
});
