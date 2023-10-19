


describe('plugin: checkbox_options', function() {

	it_n('active items should be checked on load', function(done) {

		let test = setup_test('<input value="a,b">', {plugins: ['checkbox_options']});

		click(test.instance.control,function(){
			var checked = test.instance.dropdown.querySelectorAll('input:checked');
			assert.equal(checked.length,2);
			done();
		});

	});
	it_n('CSS checked and unchecked', function(done) {

		let test = setup_test('<select multiple><option value="a" selected>a</option><option value="b">b</option></select>', {
			plugins: {'checkbox_options': {
				className: 'ts',
				checkedClassNames: ['test-checked'],
				uncheckedClassNames: ['test-unchecked']
			}
		}});

		click(test.instance.control,function(){
			//var checked = test.instance.dropdown.querySelectorAll('input:checked');
			//var checked = test.instance.dropdown.querySelector('option[value="a"]');
			//var unchecked = test.instance.dropdown.querySelector('option[value="b"]');

			var checked = test.instance.dropdown.querySelector('input[type="checkbox"].test-checked');
			var unchecked = test.instance.dropdown.querySelector('input[type="checkbox"].test-unchecked');

			assert(checked != null, "found option a DOM");
			assert(unchecked != null, "found option b DOM");
			assert(checked.classList.contains('test-checked'),     "test-checked CSS class on option a");
			assert(unchecked.classList.contains('test-unchecked'), "test-unchecked CSS class on option b");

			var optionA = test.instance.getOption('a');
			var checkboxA = optionA.querySelector('input.ts');
            assert(checkboxA != null, "found checkbox a");

			var optionB = test.instance.getOption('b');
			var checkboxB = optionB.querySelector('input.ts');
			assert(checkboxB != null, "found checkbox b");

			// reverse the selection
			click(optionA,function(){
				click(optionB,function(){
					assert(checked.classList.contains('test-unchecked'), "test-unchecked CSS on option a afterwards");
					assert(unchecked.classList.contains('test-checked'), "test-checked CSS on option b afterwards");
					done();
				});
			});
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


	it_n('adding item after dropdown open should check option', async () => {

		let test = setup_test('AB_Multi', {plugins: ['checkbox_options']});

		await asyncClick( test.instance.control );

		var option = test.instance.getOption('a');
		var checkbox = option.querySelector('input');
		assert.equal(checkbox.checked, false,'checkbox should not be checked');

		test.instance.addItem('a');

		await waitFor(100); // setTimeout in UpdateCheckbox

		//var option = test.instance.getOption('a');
		//var checkbox = option.querySelector('input');

		assert.equal(checkbox.checked, true,'checkbox should be checked');

	});

	it_n('creating item should check option', async () => {

		let test = setup_test('AB_Multi', {
			create: true,
			plugins: ['checkbox_options']
		});

		await asyncClick( test.instance.control );
		await asyncType( 'new-value' );
		await asyncType( '[enter]' );

		await waitFor(100); // setTimeout in UpdateCheckbox

		var option = test.instance.getOption('new-value');
		var checkbox = option.querySelector('input');
		assert.equal(checkbox.checked, true,'checkbox should be checked');
	});


});
