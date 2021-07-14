


describe('plugin: dropdown_input', function() {

	it_n('dropdown should open onclick', function(done) {
		let test = setup_test('<input value="a,b" tabindex="1" placeholder="test placeholder" />', {plugins: ['dropdown_input']});

		assert.isTrue( test.instance.dropdown.contains(test.instance.control_input), 'control_input should be in dropdown');

		syn.click(test.instance.control).delay(0,function(){
			assert.equal(test.instance.isOpen, true);
			done();
		});
	});

	it_n('dropdown should open onclick without available options', function(done) {
		let test = setup_test('<select multiple><option selected>A</option></select>', {plugins: ['dropdown_input']});
		syn.click(test.instance.control).delay(0,function(){
			assert.equal(test.instance.isOpen, true);
			done();
		});

	});

	it_n('should select option with [enter] keypress (single)', async () => {

		var test = setup_test('AB_Single');

		await asyncClick(test.instance.control);
		
		assert.equal(test.instance.activeOption.dataset.value,'a');

		await asyncType('a', test.instance.control_input);
		await asyncType('[enter]', test.instance.control_input);
		
		assert.equal( test.instance.items.length, 1);
		assert.equal( test.instance.items[0], 'a');
		assert.equal( test.instance.control_input.value, '', 'control_input.value != ""' );

		await asyncType('[b]', test.instance.control_input);
		await asyncType('[enter]', test.instance.control_input);

		assert.equal( test.instance.items.length, 1);
		assert.equal( test.instance.items[0], 'b');
		assert.equal( test.instance.control_input.value, '', 'control_input.value != ""' );
	
	});

});
