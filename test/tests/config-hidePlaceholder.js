
describe('hidePlaceholder', function() {

	it_n('should hide placeholder when option selected', async () => {

		var test = setup_test('AB_Multi',{
			hidePlaceholder: true,
			placeholder: 'test-placeholder',
		});
		
		await asyncClick(test.instance.control);
		assert.isTrue( test.instance.isOpen );
		assert.equal( test.instance.control_input.placeholder, 'test-placeholder','placeholder should match setting');
		
		var option = test.instance.dropdown_content.querySelector('[data-value="a"]');
		
		await asyncClick(option);
		assert.equal( test.instance.items.length, 1);
		assert.equal( test.instance.control_input.placeholder, '', 'placeholder should be empty');
		
		await asyncType( '\b', test.instance.control_input);
		assert.equal( test.instance.items.length, 0);
		assert.equal( test.instance.control_input.placeholder, 'test-placeholder', 'placeholder should match setting');
		
	});

});
