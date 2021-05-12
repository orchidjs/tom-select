


describe('plugin: checkbox_options', function() {

	it_n('active items should be checked on load', function(done) {

		let test = setup_test('<input value="a,b">', {plugins: ['checkbox_options']});

		click(test.instance.control,function(){
			var checked = test.instance.dropdown.querySelectorAll('input:checked');
			assert.equal(checked.length,2);
			done();
		});

	});

	it_n('checkbox should be updated after option is clicked', function(done) {

		let test = setup_test('AB_Multi', {plugins: ['checkbox_options']});
		click(test.instance.control_input,function(){

			var option = test.instance.getOption('a');
			var checkbox = option.querySelector('input');

			// check/active
			click(option,function(){
				assert.deepEqual(test.instance.items, ['a']);
				assert.equal(checkbox.checked, true,'checkbox not checked');

				// uncheck
				click(option,function(){
					assert.deepEqual(test.instance.items, []);
					assert.equal(checkbox.checked, false,'checkbox checked');
					done();

				});

			});

		});

	});

	it_n('checkbox should be checked after checkbox is clicked', function(done) {

		let test = setup_test('AB_Multi', {plugins: ['checkbox_options']});
		click(test.instance.control_input,function(){

			var option = test.instance.getOption('a');
			var checkbox = option.querySelector('input');

			// check/active
			click(checkbox,function(){
				assert.deepEqual(test.instance.items, ['a']);
				assert.equal(checkbox.checked, true,'checkbox not checked');

				// uncheck
				click(checkbox,function(){
					assert.deepEqual(test.instance.items, []);
					assert.equal(checkbox.checked, false,'checkbox checked');
					done();

				});
			});
		});
	});


	it_n('removing item before dropdown open should not check option', function(done) {

		let test = setup_test('<input value="a">', {plugins: ['checkbox_options']});
		test.instance.removeItem('a');

		click(test.instance.control_input,function(){
			var option = test.instance.getOption('a');
			var checkbox = option.querySelector('input');
			assert.equal(checkbox.checked, false,'checkbox checked');
			done();
		});

	});


});
