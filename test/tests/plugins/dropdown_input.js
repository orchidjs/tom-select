


describe('plugin: dropdown_input', function() {

	it_n('dropdown should open onclick', function(done) {
		let test = setup_test('AB_Multi', {plugins: ['dropdown_input']});

		// confirm controlInput is in dropdown
		assert.equal( test.instance.dropdown.contains(test.instance.settings.controlInput), true);

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

});
