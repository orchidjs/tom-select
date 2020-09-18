describe('Events', function() {

	describe('focus', function() {
		it_n('should work as expected', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b"></option><option value="c"></option></select>', {});
			var counter = 0;
			test.instance.on('focus', function() { counter++; });

			syn.click(test.instance.control).delay(1, function() {

				expect(counter).to.be.equal(1);
				done();

			});
		});
	});

	describe('blur', function() {
		it_n('blur event should be called when clicking on body', function(done) {
			var test = setup_test('<select id="blur-test"><option value="a" selected></option><option value="b"></option><option value="c"></option></select>', {});
			var counter = 0;
			test.instance.on('blur', function() { counter++; });

			syn.click(test.instance.control).delay(0, function() {

				expect(test.instance.isFocused,'should be focused (2)').to.be.equal(true);

				syn.click($('body')).delay(1, function() {

					expect(counter,'onblur event not fired').to.be.equal(1);
					done();
				});
			});

		});
	});

	describe('change', function() {
		it_n('should be triggered once', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b"></option><option value="c"></option></select>', {});
			var counter = 0;
			test.instance.on('change', function() { counter++; });
			test.instance.setValue('b');

			window.setTimeout(function() {
				expect(counter).to.be.equal(1);
				done();
			}, 0);
		});
		it_n('should contain current value', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b"></option><option value="c"></option></select>', {});
			test.instance.on('change', function(value) {
				expect(value).to.be.equal('c');
				done();
			});
			test.instance.setValue('c');
		});
		it_n('should not be triggered when the selected item has not changed', function(done) {
			var test = setup_test('<select><option value="a" selected="selected">a</option></select>');

			var counter = 0;
			test.instance.on('change', function() { counter++; });

			syn.click(test.instance.control).delay(0, function() {
				syn
					.click($('[data-value="a"]', $(test.instance.dropdown)))
					.delay(0, function() {
						expect(counter).to.be.equal(0);
						done();
					});
			});
		});


		it_n('should not be possible to trigger a disabled option', function(done) {
			var test = setup_test(['<select>',
				'<option value="a" disabled>Item A</option>',
				'<option value="b">Item B</option>',
				'</select>'].join(''), {});
			var counter = 0;
			test.instance.on('change', function() { counter++; });

			syn.click(test.instance.control).delay(0, function() {
				syn
					.click($('[data-value="a"]', $(test.instance.dropdown)))
					.delay(0, function() {
						expect(counter).to.be.equal(0);
						done();
					});
			});
		});

		it_n('should not be possible to trigger a option under a disabled optgroup', function(done) {
			var test = setup_test(['<select>',
				'<optgroup label="Group 1">',
				'<option value="a">Item A</option>',
				'</optgroup>',
				'<optgroup label="Group 2" disabled>',
				'<option value="b">Item B</option>',
				'<option value="c">Item C</option>',
				'</optgroup>',
				'</select>'].join(''), {});
			var counter = 0;
			test.instance.on('change', function() { counter++; });

			syn.click(test.instance.control).delay(0, function() {
				syn
					.click($('[data-value="c"]', $(test.instance.dropdown)))
					.delay(0, function() {
						expect(counter).to.be.equal(0);
						done();
					});
			});
		});
	});

	describe('item_add', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a"></option><option value="b"></option><option value="c"></option></select>', {});
			test.instance.on('item_add', function() {
				done();
			});
			test.instance.addItem('b');
		});
		it_n('should contain item\'s value and element', function(done) {
			var test = setup_test('<select><option value="a"></option><option value="b"></option><option value="c"></option></select>', {});
			test.instance.on('item_add', function(value, item) {
				expect(value).to.be.equal('b');
				assert.equal(item.dataset.value, 'b');
				done();
			});
			test.instance.addItem('b');
		});
	});

	describe('item_remove', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select multiple><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('item_remove', function() {
				done();
			});
			test.instance.removeItem('a');
		});
		it_n('should contain item\'s value and element', function(done) {
			var test = setup_test('<select multiple><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('item_remove', function(value, item) {
				expect(value).to.be.equal('b');
				expect(item.dataset.value).to.be.equal('b');
				done();
			});
			test.instance.removeItem('b');
		});
	});

	describe('clear', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('clear', function() {
				done();
			});
			test.instance.clear();
		});
	});

	describe('optgroup_add', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('optgroup_add', function() { done(); });
			test.instance.addOptionGroup('id', {label: 'Group'});
		});
		it_n('should contain optgroup id', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('optgroup_add', function(id, data) {
				expect(id).to.be.equal('id');
				done();
			});
			test.instance.addOptionGroup('id', {label: 'Group'});
		});
		it_n('should contain outgroup data', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			var optgroup = {label: 'Group'};
			test.instance.on('optgroup_add', function(id, data) {
				expect(data).to.eql(optgroup);
				done();
			});
			test.instance.addOptionGroup('id', optgroup);
		});
	});

	describe('optgroup_remove', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('optgroup_remove', function(id) {
				expect(id).to.be.equal('id');
				done();
			});
			test.instance.addOptionGroup('id', {label: 'Group'});
			test.instance.removeOptionGroup('id');
		});
	});

	describe('optgroup_clear', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('optgroup_clear', function() {
				done();
			});
			test.instance.addOptionGroup('id', {label: 'Group'});
			test.instance.clearOptionGroups();
		});
	});

	describe('option_add', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('option_add', function() {
				done();
			});
			test.instance.addOption({value: 'e'});
		});
		it_n('should contain option value', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('option_add', function(value, data) {
				expect(value).to.be.equal('e');
				done();
			});
			test.instance.addOption({value: 'e'});
		});
		it_n('should contain option data', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			var option = {value: 'e'};
			test.instance.on('option_add', function(value, data) {
				expect(option).to.eql(data);
				done();
			});
			test.instance.addOption(option);
		});
	});

	describe('option_remove', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('option_remove', function() {
				done();
			});
			test.instance.removeOption('a');
		});
		it_n('should contain option value', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('option_remove', function(value) {
				expect(value).to.be.equal('a');
				done();
			});
			test.instance.removeOption('a');
		});
	});

	describe('option_clear', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('option_clear', function() {
				done();
			});
			test.instance.clearOptions();
		});
	});

	describe('dropdown_open', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('dropdown_open', function() {
				done();
			});
			test.instance.open();
		});
	});

	describe('dropdown_close', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('dropdown_close', function() {
				done();
			});
			test.instance.open();
			test.instance.close();
		});
	});

	describe('destroy', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select><option value="a" selected></option><option value="b" selected></option><option value="c"></option></select>', {});
			test.instance.on('destroy', function() {
				done();
			});
			test.instance.destroy();
		});
	});

	describe('type', function() {
		it_n('should be triggered', function(done) {
			var test = setup_test('<select></select>', {create: true});
			test.instance.on('type', function() {
				done();
			});
			syn.click(test.instance.control).type('a', $(test.instance.control_input));
		});
		it_n('should contain current value', function(done) {
			var test = setup_test('<select></select>', {create: true});
			test.instance.on('type', function(value) {
				expect(value).to.be.equal('a');
				done();
			});
			syn.click(test.instance.control).type('a', $(test.instance.control_input));
		});
	});

});
