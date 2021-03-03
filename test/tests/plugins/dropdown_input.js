


describe('plugin: dropdown_input', function() {

	it_n('dropdown should open onclick', function(done) {
		let test = setup_test('<input value="a,b" tabindex="1" placeholder="test placeholder" />', {plugins: ['dropdown_input']});

		// confirm controlInput is in dropdown
		assert.equal( test.instance.dropdown.contains(test.instance.settings.controlInput), true);

		// confirm placeholder has been applied to dropdown input
		assert.equal( test.instance.settings.controlInput.getAttribute('placeholder'), 'test placeholder');

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

	it_n('[enter] on wrapper should open', function(done) {

		let test = setup_test('<input value="a,b" tabindex="1" />', {plugins: ['dropdown_input']});
		var adjacent = document.getElementById('adjacent-input');

		assert.equal(test.instance.wrapper.tabIndex, 1);

		syn.type('[enter]',test.instance.wrapper,function(){
			assert.equal(test.instance.isOpen, true);
			done();
		});

	});

});
