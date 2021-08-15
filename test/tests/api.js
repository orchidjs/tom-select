

	describe('API', function() {

		describe('disable()', function() {
			var test;

			before(function() {
				test = setup_test('<select tabindex="4">', {});
				expect(String(test.instance.control_input.tabIndex)).to.be.equal('4');
				test.instance.disable();
			});
			it_n('should set "tabindex" prop to -1', function() {
				expect(String(test.instance.control_input.tabIndex)).to.be.equal('-1');
			});
			it_n('should set "disabled" class', function() {
				expect(test.instance.control.classList.contains('disabled')).to.be.equal(true);
			});
			it_n('should set isDisabled property to true', function() {
				expect(test.instance.isDisabled).to.be.equal(true);
			});
			it_n('should add "disabled" attribute on inputs', function() {
				expect(test.instance.input.disabled).to.be.equal(true);
				expect( $(test.instance.control_input).is(':disabled')).to.be.equal(true);
			});
		});

		describe('setMaxItems(2)', function(){
			var test;
			before(function(done) {
				test = setup_test('<select>', {});
				test.instance.setMaxItems(2);
				window.setTimeout(function() { done(); }, 5);
			});
			it_n('should set maxItems setting to 2', function() {
				expect(test.instance.settings.maxItems).to.be.equal(2);
			});
		});

		describe('setMaxItems(0)', function(){
			var test;
			before(function(done) {
				test = setup_test('<select>', {});
				test.instance.setMaxItems(0);
				window.setTimeout(function() { done(); }, 5);
			});
			it_n('should set maxItems setting to null', function() {
				expect(test.instance.settings.maxItems).to.be.equal(null);
			});
		});

		describe('enable()', function() {
			var test;

			before(function() {
				test = setup_test('<select disabled tabindex="2">', {});
				expect(String(test.instance.control_input.tabIndex)).to.be.equal('-1');
				test.instance.enable();
			});
			it_n('should restore original "tabindex" prop', function() {
				expect(String(test.instance.control_input.tabIndex)).to.be.equal('2');
			});
			it_n('should remove "disabled" class', function() {
				expect(test.instance.control.classList.contains('disabled')).to.be.equal(false);
			});
			it_n('should set isDisabled property to false', function() {
				expect(test.instance.isDisabled).to.be.equal(false);
			});
			it_n('should remove "disabled" attribute on inputs', function() {
				expect(test.instance.input.disabled).to.be.equal(false);
				expect( $(test.instance.control_input).is(':disabled')).to.be.equal(false);
			});
		});

		describe('focus() and blur()', function() {

			it_n('should focus and blur',function(done) {
				var test = setup_test('<select>', {});
				test.instance.focus();

				window.setTimeout(function() {

					assert.isTrue(test.instance.isFocused,'should set isFocused property to true');
					assert.isTrue(has_focus(test.instance.control_input), 'should give the control focus');

					test.instance.blur();

					window.setTimeout(()=>{
						assert.isFalse(test.instance.isFocused, 'should set isFocused property to false');
						assert.isFalse(has_focus(test.instance.control_input), 'should remove focus from the control');
						done();
					},5);
				}, 5);
			});
		});

		describe('createItem()', function() {

			it_n('should fail if boolean returned by "create" callback', function() {
				var test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					create: function(input) {
						return false;
					}
				});

				test.instance.control_input.value = 'test';
				test.instance.createItem();
				expect(test.instance.items.length).to.be.equal(0);
			});

			it_n('should fail if string returned by "create" callback', function() {

				var test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					create: function(input) {
						return 'hello';
					}
				});

				test.instance.control_input.value = 'test';
				test.instance.createItem();
				expect(test.instance.items.length).to.be.equal(0);
			});


			it_n('should fail if invalid object returned by "create" callback', function() {

				var test = setup_test('<select>', {
					create: function(input) {
						return {value:null};
					}
				});

				test.instance.createItem('test');
				expect(test.instance.items.length).to.be.equal(0);
			});


			it_n('should add option upon completion (synchronous)', function() {
				var test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					create: function(input) {
						return {value: input};
					}
				});

				test.instance.control_input.value = 'test';
				test.instance.createItem();
				expect(test.instance.options).to.have.property('test');
			});

			it_n('should add option upon completion (asynchronous)', function(done) {
				var test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					create: function(input, callback) {
						window.setTimeout(function() {
							callback({value: input});
							expect(test.instance.options).to.have.property('test');
							done();
						}, 0);
					}
				});

				test.instance.control_input.value = 'test';
				test.instance.createItem();
			});

			it_n('should not create two items', function(){
				var test = setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					create: function(input, callback) {
						callback({value: 'test'});
						return {value:'test2'};
					}
				});

				test.instance.createItem('test');

				assert.equal(test.instance.items.length,1);
			});
		});

		describe('addOptionGroup()', function() {
			var test;

			before(function() {
				test = setup_test('<select>', {valueField: 'value', labelField: 'value', optgroupValueField: 'grpval'});
			});
			it_n('should register group', function() {
				var data = {label: 'Group Label'};
				test.instance.addOptionGroup('group_id', data);
				expect(test.instance.optgroups).to.have.property('group_id');
			});
			it_n('should add implicit $order property', function() {
				test.instance.addOptionGroup('group1', {});
				test.instance.addOptionGroup('group2', {});
				assert.equal(test.instance.optgroups['group1'].$order, 2);
				assert.equal(test.instance.optgroups['group2'].$order, 3);
			});
		});

		describe('removeOptionGroup()', function() {
			var test;

			before(function() {
				test = setup_test('<select>', {valueField: 'value', labelField: 'value'});
			});
			it_n('should remove group', function() {
				var data = {label: 'Group Label'};
				test.instance.addOptionGroup('group_id', data);
				test.instance.removeOptionGroup('group_id');
				expect(test.instance.optgroups).to.not.have.property('group_id');
			});
		});

		describe('clearOptionGroups()', function() {
			var test;

			before(function() {
				test = setup_test('<select>', {valueField: 'value', labelField: 'value'});
			});
			it_n('should clear all groups', function() {
				var data = {label: 'Group Label'};
				test.instance.addOptionGroup('group_id', data);
				test.instance.addOptionGroup('group_id2', data);
				test.instance.clearOptionGroups();
				expect(test.instance.optgroups).to.deep.equal({});
			});
		});

		describe('clearOptions()', function() {

			it_n('options should be empty', function(done) {
				var test = setup_test('AB_Multi', {});
				assert.equal( Object.keys(test.instance.options).length, 3);
				test.instance.clearOptions();
				assert.equal( Object.keys(test.instance.options).length, 0);
				done();
			});

			it_n('options should not be empty', function(done) {
				var test = setup_test('AB_Multi', {});
				assert.equal( Object.keys(test.instance.options).length, 3);
				test.instance.addItem('b');
				test.instance.clearOptions();
				assert.equal( Object.keys(test.instance.options).length, 1);
				done();
			});
		});


		describe('selectAll()', function() {

			it_n('should select all', function(done) {
				var test = setup_test('AB_Multi', {});
				assert.equal( test.instance.activeItems.length, 0 );
				test.instance.addItem('a');
				test.instance.addItem('b');
				assert.equal( test.instance.activeItems.length, 0 );
				test.instance.selectAll();
				assert.equal( test.instance.activeItems.length, 2 );
				done();
			});

		});

		describe('deleteSelection()', function() {

			it_n('should select then delete two items', function(done) {
				var test = setup_test('AB_Multi', {});
				assert.equal( test.instance.activeItems.length, 0 );
				assert.equal( test.instance.items.length, 0 );
				test.instance.addItem('a');
				test.instance.addItem('b');
				assert.equal( test.instance.items.length, 2 );
				assert.equal( test.instance.activeItems.length, 0 );
				test.instance.selectAll();
				assert.equal( test.instance.activeItems.length, 2 );
				test.instance.deleteSelection();
				assert.equal( test.instance.activeItems.length, 0 );
				assert.equal( test.instance.items.length, 0 );
				done();
			});

		});

		describe('addOption()', function() {
			var test;
			before(function() {
				test = setup_test('<select>', {valueField: 'value', labelField: 'value'});
			});

			it_n('should add implicit $order property', function() {
				var opt1 = {value: 'hello'};
				var opt2 = {value: 'world'};
				test.instance.addOption(opt1);
				test.instance.addOption(opt2);
				assert.equal(test.instance.options['hello'].$order, 1);
				assert.equal(test.instance.options['world'].$order, 2);
			});
			it_n('should allow string values', function() {
				test.instance.addOption({value: 'stringtest'});
				expect(test.instance.options).to.have.property('stringtest');
			});
			it_n('should not allow null / undefined values', function() {
				test.instance.addOption({value: undefined});
				test.instance.addOption({value: null});
				expect(test.instance.options).to.not.have.property('undefined');
				expect(test.instance.options).to.not.have.property('null');
				expect(test.instance.options).to.not.have.property('');
			});
			it_n('should allow integer values', function() {
				test.instance.addOption({value: 0});
				test.instance.addOption({value: 1});
				expect(test.instance.options).to.have.property('0');
				expect(test.instance.options).to.have.property('1');
			});
			it_n('should allow arrays of options', function() {
				test.instance.addOption([{value: 'a'}, {value: 'b'}]);
				expect(test.instance.options).to.have.property('a');
				expect(test.instance.options).to.have.property('b');
			});
			it_n('should not override existing options', function() {
				test.instance.addOption([{value: 'a'}, {value: 'b'}]);
				test.instance.addOption({value: 'a', test: 'hello'});
				expect(test.instance.options.a).to.not.have.property('test');
			});
		});

		describe('addItem()', function() {
			var test;

			before(function() {
				test = setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					options: [
						{value: 0},
						{value: 1},
						{value: 'undefined'},
						{value: 'null'},
						{value: 'a'},
						{value: 'b'},
						{value: 'c'},
						{value: 'x'},
						{value: '$1'},
						{value: '\''},
						{value: '"'},
						{value: '\\\''},
						{value: '\\"'},
					]
				});
			});
			it_n('should update "items" array', function() {
				test.instance.addItem('b');
				expect(test.instance.items.indexOf('b')).to.be.equal(0);
			});
			it_n('should not give control focus', function(done) {
				test.instance.addItem(0);
				window.setTimeout(function() {
					expect(test.instance.isFocused).to.be.equal(false);
					done();
				}, 0);
			});
			it_n('should not allow duplicate entries', function() {
				test.instance.addItem('a');
				test.instance.addItem('a');
				expect(test.instance.items.indexOf('a')).to.be.equal(test.instance.items.lastIndexOf('a'));
			});
			it_n('should not allow undefined / null values', function() {
				test.instance.addItem(undefined);
				test.instance.addItem(null);
				expect(test.instance.items.indexOf('undefined')).to.be.equal(-1);
				expect(test.instance.items.indexOf('null')).to.be.equal(-1);
			});
			it_n('should allow integer values', function() {
				test.instance.addItem(0);
				expect(test.instance.items.indexOf('0')).to.not.be.equal(-1);
			});
			it_n('should not fire "change" if silent is truthy', function(done) {
				var watcher = function(e) { throw new Error('Change fired'); };
				test.instance.on('change', watcher);
				test.instance.addItem('x', true);
				expect(test.instance.items.indexOf('x')).to.not.be.equal(-1);
				window.setTimeout(function() {
					test.instance.off('change', watcher);
					done();
				}, 0);
			});
			it_n('should update DOM (1)', function() {
				test.instance.addItem('c');
				expect( $(test.instance.control).find('[data-value=c]').length).to.be.equal(1);

				test.instance.addItem('$1');
				var found = false;
				$(test.instance.control).children().each(function() {
					if (this.getAttribute('data-value') === '$1') {
						found = true;
						return false;
					}
				});
				expect(found).to.be.equal(true);
			});

		});

		describe('addItems()',function(){

			// this test ensures <option> elements are ordered properly in the original <select> element
			it_n('should add items in order',function(done){

				var test = setup_test('AB_Multi', {
					create:true,
				});

				test.instance.addOption([{value: 'new1'}, {value: 'new2'}]);
				test.instance.addItems(['a','new1','b','new2']);

				var selected		= test.html.querySelectorAll('option[selected]');
				var option_a		= test.html.querySelector('option[value="a"]');
				var option_new1		= test.html.querySelector('option[value="new1"]');
				var option_b		= test.html.querySelector('option[value="b"]');
				var option_new2		= test.html.querySelector('option[value="new2"]');

				assert.equal(selected.length, 4,'should have four selected options');
				assert.equal(test.instance.items.length, 4,'should have four items');
				assert.equal(option_a.nextSibling, option_new1 ,'"new1" should be after "a"');
				assert.equal(option_new1.nextSibling, option_b ,'"b" should be after "new1"');
				assert.equal(option_b.nextSibling, option_new2 ,'"new2" should be after "b"');
				done();

			});

			it_n('should add items when last item is a duplicate',function(done){

				var test = setup_test('AB_Multi', {
					create:true,
				});

				test.instance.createItem('new1');
				test.instance.createItem('new2');
				test.instance.addItems(['a','new1','b','new2']);

				var selected		= test.html.querySelectorAll('option[selected]');
				assert.equal(selected.length, 4,'should have four selected options');
				assert.equal(test.instance.items.length, 4,'should have four items');
				done();
			});

		});

		describe('updateOption()', function() {
			var test;

			before(function() {
				test = setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					options: [
						{value: 0},
						{value: 1},
						{value: 'a'},
						{value: 'b'},
						{value: 'c'},
						{value: 'd'},
						{value: 'e'},
						{value: 'f'},
						{value: 'x'},
						{value: 'null'},
						{value: 'undefined'},
						{value: '\''},
						{value: '"'},
						{value: '\\\''},
						{value: '\\"'},
					],
					items: ['e','f']
				});
				test.instance.refreshOptions();
			});


			it_n('should update option data', function() {
				var option_el_before = test.instance.getOption('c');
				test.instance.setActiveOption(option_el_before);

				test.instance.updateOption('c', {value: 'c', test: 'test'});

				var option_el_after = test.instance.getOption('c');
				assert.notStrictEqual( option_el_before, option_el_after, 'option DOM element should be new');
				assert.isOk( option_el_after.classList.contains('active'), 'new option el should be active');

				expect(test.instance.options).to.have.property('c');
				expect(test.instance.options['c'].test).to.equal('test');
			});


			it_n('should update indexes', function() {
				test.instance.updateOption('e', {value: 'e_updated'});
				expect(test.instance.options).to.not.have.property('e');
				expect(test.instance.options).to.have.property('e_updated');
				expect(test.instance.items.indexOf('e')).to.be.equal(-1);
				expect(test.instance.items.indexOf('e_updated')).to.be.equal(0);
			});

			it_n('should maintain implicit $order property', function() {
				var order_orig = test.instance.options['x'].$order;
				assert.isNumber(order_orig);
				test.instance.updateOption('x', {value: 'x', something: 'x'});
				assert.equal(test.instance.options['x'].$order, order_orig);
			});

			it_n('should allow integer values', function() {
				test.instance.updateOption(0, {value: '0_updated'});
				test.instance.updateOption(1, {value: '1_updated'});
				expect(test.instance.options).to.not.have.property('0');
				expect(test.instance.options).to.not.have.property('1');
				expect(test.instance.options).to.have.property('0_updated');
				expect(test.instance.options).to.have.property('1_updated');
			});

			it_n('should throw error if value not set in data', function() {
				expect(function() {
					test.instance.updateOption('c', {value: undefined, test: 'test'});
					test.instance.updateOption('d', {value: null, test: 'test'});
				}).to.throw(Error);
			});

			it_n('should ignore undefined / null value references', function() {
				test.instance.updateOption(undefined, {value: 'undefined', test: 'test'});
				test.instance.updateOption(null, {value: 'null', test: 'test'});
				expect(test.instance.options['undefined']).to.not.have.property('test');
				expect(test.instance.options['null']).to.not.have.property('test');
			});

			it_n('should update item DOM (2)', function() {
				test.instance.updateOption('f', {value: 'f_updated'});
				assert.equal( test.instance.control.querySelectorAll('.item[data-value="f"]').length, 0);
				assert.equal( test.instance.control.querySelectorAll('.item[data-value="f_updated"]').length, 1);
			});

			it_n('should not update options if attempting to update invalid option', function() {
				var opts_before =  Object.assign({}, test.instance.options);
				test.instance.updateOption('invalid', {value: 'f_invalid'});
				expect(opts_before).to.deep.equal(test.instance.options);
			});

		});

		describe('getOption()', function() {
			
			function optionTest(){
				test = setup_test('<select>', {
					valueField: 'value',
					labelField: 'value',
					searchField:'value',
					options: [
						{value: 0},
						{value: 1},
						{value: 'a'},
						{value: 'b'},
						{value: '\''},
						{value: '\\'},
						{value: '"'},
						{value: '\\\''},
						{value: '\\"'},
					]
				});
				test.instance.refreshOptions(true);
				return test;
			}


			it_n('should allow string values', function() {
				var test = optionTest();
				var a = test.instance.getOption('a');
				expect(test.instance.getOption('a')).to.be.ok;
				expect(test.instance.getOption('b')).to.be.ok;
			});
			it_n('should allow integer values', function() {
				var test = optionTest();
				expect(test.instance.getOption(0)).to.be.ok;
				expect(test.instance.getOption(1)).to.be.ok;
			});
			it_n('should allow values with quotation marks', function() {
				var test = optionTest();
				expect(test.instance.getOption('\'')).to.be.ok;
				expect(test.instance.getOption('"')).to.be.ok;
			});
			it_n('should allow values with backslashes', function() {
				var test = optionTest();
				expect(test.instance.getOption('\\')).to.be.ok;
				expect(test.instance.getOption('\\\'')).to.be.ok;
				expect(test.instance.getOption('\\"')).to.be.ok;
			});
			it_n('should not allow undefined / null values', function() {
				var test = optionTest();
				expect(test.instance.getOption(null)).to.be.equal(null);
				expect(test.instance.getOption(undefined)).to.be.equal(null);
			});

			it_n('should return cached option',function(){
				var test = optionTest();

				test.instance.control_input.value = 'a';
				test.instance.refreshOptions(true);
				var option_before = test.instance.getOption('a');

				test.instance.control_input.value = 'b';
				test.instance.refreshOptions(true);
				var option_after = test.instance.getOption('a');

				assert.equal(option_before,option_after);

			});

			it_n('should create option with getOption(a,true)',function(){
				var test	= setup_test('AB_Multi');
				
				var option	= test.instance.getOption('a');
				assert.isNull(option);

				var option	= test.instance.getOption('a',true);
				assert.isNotNull(option);

			});

		});

		describe('getItem()', function() {
			var test;

			before(function() {
				test = setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					options: [
						{value: 0},
						{value: 1},
						{value: 'a'},
						{value: 'b'},
						{value: '\''},
						{value: '"'},
						{value: '\\\''},
						{value: '\\"'}
					],
					items: ['0','1','a','b','\'','"','\\\'','\\"']
				});
			});
			it_n('should allow string values', function() {
				expect(test.instance.getItem('a')).to.be.ok;
				//expect(test.instance.getItem('a').length).to.be.equal(1);
				expect(test.instance.getItem('b')).to.be.ok;
				//expect(test.instance.getItem('b').length).to.be.equal(1);
			});
			it_n('should allow integer values', function() {
				expect(test.instance.getItem(0)).to.be.ok;
				//expect(test.instance.getItem(0).length).to.be.equal(1);
				expect(test.instance.getItem(1)).to.be.ok;
				//expect(test.instance.getItem(1).length).to.be.equal(1);
			});
			it_n('should allow values with quotation marks', function() {
				expect(test.instance.getItem('\'')).to.be.ok;
				//expect(test.instance.getItem('\'').length).to.be.equal(1);
				expect(test.instance.getItem('"')).to.be.ok;
				//expect(test.instance.getItem('"').length).to.be.equal(1);
			});
			it_n('should allow values with backslashes', function() {
				expect(test.instance.getItem('\\\'')).to.be.ok;
				//expect(test.instance.getItem('\\\'').length).to.be.equal(1);
				expect(test.instance.getItem('\\"')).to.be.ok;
				//expect(test.instance.getItem('\\"').length).to.be.equal(1);
			});
			it_n('should not allow undefined / null values', function() {
				expect(test.instance.getItem(null)).to.be.equal(null);
				//expect(test.instance.getItem(null).length).to.be.equal(0);
				expect(test.instance.getItem(undefined)).to.be.equal(null);
				//expect(test.instance.getItem(undefined).length).to.be.equal(0);
			});

			it_n('should get empty item',()=>{
				var test = setup_test('<select><option value="">empty</option><option value="a">a</option></select>',{allowEmptyOption:true});
				assert.isOk( test.instance.getItem('') );
			});
		});

		describe('clear()', function() {

			function clearTest(){
				return setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					options: [
						{value: 0},
						{value: 1},
						{value: 2},
						{value: 3},
					],
					items: ['1','2','3']
				});
			}

			it_n('should empty "activeItems" array', function() {
				var test = clearTest();
				test.instance.setActiveItem(test.instance.getItem('1'));
				expect(test.instance.activeItems.length).to.be.equal(1);
				test.instance.clear();
				expect(test.instance.activeItems.length).to.be.equal(0);
			});

			it_n('should refresh option list (dropdown)', function(done) {
				// test = setup_test('<select multiple>', {
				// 	valueField: 'value',
				// 	labelField: 'value',
				// 	options: [
				// 		{value: 0},
				// 		{value: 1},
				// 		{value: 2},
				// 		{value: 3},
				// 	],
				// 	items: ['1','2','3']
				// });

				var test = clearTest();
				test.instance.focus();
				window.setTimeout(function() {
					test.instance.clear();
					test.instance.focus();
					window.setTimeout(function() {
						expect( test.instance.dropdown_content.querySelectorAll('[data-value="1"]').length).to.be.equal(1);
						expect( test.instance.dropdown_content.querySelectorAll('[data-value="2"]').length).to.be.equal(1);
						expect( test.instance.dropdown_content.querySelectorAll('[data-value="3"]').length).to.be.equal(1);
						done();
					}, 0);
				}, 0);
			});

			it_n('should empty "items" array', function() {
				var test = clearTest();
				test.instance.clear();
				expect(test.instance.items.length).to.be.equal(0);
			});

			it_n('should update DOM (3)', function() {
				var test = clearTest();
				test.instance.clear();
				expect( test.instance.control.querySelectorAll('[data-value="1"]').length).to.be.equal(0);
				expect( test.instance.control.querySelectorAll('[data-value="2"]').length).to.be.equal(0);
				expect( test.instance.control.querySelectorAll('[data-value="3"]').length).to.be.equal(0);
			});

			it_n('should not fire "change" if silent is truthy', function(done) {
				var test = clearTest();
				var watcher = function(e) { throw new Error('Change fired'); };
				test.instance.on('change', watcher);
				test.instance.clear(true);
				window.setTimeout(function() {
					test.instance.off('change', watcher);
					done();
				}, 0);
			});

			it_n('should not give control focus', function(done) {
				var test = clearTest();
				test.instance.clear();
				window.setTimeout(function() {
					expect(test.instance.isFocused).to.be.equal(false);
					done();
				}, 0);
			});

			it_n('should empty "items" array', function() {
				var test = clearTest();
				test.instance.clear();
				expect(test.instance.items.length).to.be.equal(0);
			});

			it_n('should create empty option and el.value should be empty after clear() on single', async function(){
				var test = setup_test('<select><option>a</option></select>');
				await asyncClick(test.instance.control);
				test.instance.clear();
				assert.isEmpty(test.select.value);
				assert.isOk(test.instance.input.querySelector('option[value=""]'));
			});

			it_n('should remove user created option', function() {

				var test = setup_test('AB_Multi', {
					create: true,
					persist: false,
				});

				var len_opts_before = Object.keys(test.instance.options).length;
				test.instance.createItem('test');
				expect( Object.keys(test.instance.options).length).to.be.equal(len_opts_before+1);
				test.instance.clear();
				expect( Object.keys(test.instance.options).length).to.be.equal(len_opts_before);
			});

		});

		describe('search()', function() {
			it_n('should throw error if "score" setting does not return a function', function() {
				var test;

				expect(function() {
					test = setup_test('<select multiple>', {
						valueField: 'value',
						labelField: 'value',
						options: [
							{value: 0},
							{value: 1}
						],
						score: function() { }
					});
					test.instance.search('hello');
				}).to.throw(Error);
			});
			it_n('should not throw error if "score" setting does return a function', function() {
				var test;

				expect(function() {
					test = setup_test('<select multiple>', {
						valueField: 'value',
						labelField: 'value',
						options: [
							{value: 0},
							{value: 1}
						],
						score: function(query) {
							return function(item) { return 0; };
						}
					});
					test.instance.search('hello');
				}).to.not.throw(Error);
			});
		});

		describe('getScoreFunction()', function() {
			it_n('should return an function that returns a number', function() {
				var test = setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					searchField: 'value',
					options: []
				});
				var fn = test.instance.getScoreFunction('test');
				expect(typeof fn).to.be.equal('function');
				expect(typeof fn({value: 'test'})).to.be.equal('number');
				expect(fn({value: 'test'})).to.be.above(0);
			});
		});

		describe('destroy()', function() {
			var has_namespaced_event = function($el, ns) {
				var i, n, key;
				var data = ($._data || $.data).apply($, [$(window)[0], 'events']);
				ns = ns.replace(/^./, '');
				for (key in data) {
					if (data.hasOwnProperty(key)) {
						for (i = 0, n = data[key].length; i < n; i++) {
							if (data[key][i].namespace.indexOf(ns) !== -1) {
								return true;
							}
						}
					}
				}

				return false;
			};
			it_n('should remove control from DOM', function() {
				var test = setup_test('<select>', {});
				test.instance.destroy();
				expect($.contains(document.documentElement, test.instance.wrapper)).to.be.equal(false);
			});
			it_n('should delete "instance" reference on original input element', function() {
				var test = setup_test('<select>', {});
				test.instance.destroy();
				expect(test.instance.input.instance).to.be.equal(undefined);
			});
			/*
			it_n('should unbind events on window', function() {
				var test = setup_test('<select>', {});
				test.instance.destroy();
				expect(has_namespaced_event($(window), test.instance.eventNS)).to.be.equal(false);
			});
			it_n('should unbind events on document', function() {
				var test = setup_test('<select>', {});
				test.instance.destroy();
				expect(has_namespaced_event($(document), test.instance.eventNS)).to.be.equal(false);
			});
			it_n('should unbind events on <body>', function() {
				var test = setup_test('<select>', {});
				test.instance.destroy();
				expect(has_namespaced_event($('body'), test.instance.eventNS)).to.be.equal(false);
			});
			*/
			it_n('should restore original options and tabindex', function() {
				var children = '<optgroup label="Swedish Cars">' +
					'<option value="volvo">Volvo</option>' +
					'<option value="saab">Saab</option>' +
				'</optgroup>' +
				'<optgroup label="German Cars">' +
					'<option value="mercedes">Mercedes</option>' +
					'<option value="audi">Audi</option>' +
				'</optgroup>';
				var test = setup_test('<select tabindex="9999">' + children + '</select>', {});
				test.instance.destroy();
				expect(test.select.innerHTML,'restoring children failed').to.be.equal(children);
				expect(test.select.tabIndex,'restoring tabindex failed').to.be.equal(9999);
			});
		});

		describe('clearCache()', function() {
			var test;

			before(()=>{
				test = setup_test('<select multiple>', {
						valueField: 'value',
						labelField: 'value',
						options: [
							{value: 0},
							{value: 1},
							{value: 2},
							{value: 3},
						],
						items: ['1','2','3']
					});
					test.instance.advanceSelection(1);
					test.instance.refreshOptions(true);
					test.instance.refreshItems();
			});


			it_n('should clear the whole renderCache', function () {
				var option_el_before = test.instance.getOption('0');

				assert.isOk(option_el_before);
				expect( Object.keys(test.instance.renderCache['item']).length === 0).to.be.equal(false);
				expect( Object.keys(test.instance.renderCache['option']).length === 0).to.be.equal(false);

				test.instance.clearCache();

				var option_el_after = test.instance.getOption('0');
				assert.isNull(option_el_after,'should clear option dom after clearCache()');
				expect( Object.keys(test.instance.renderCache['item']).length).to.be.equal(0);
				expect( Object.keys(test.instance.renderCache['option']).length).to.be.equal(0);
			});

			it_n('should allow clearing just one template type from the renderCache', function () {
				test.instance.render('item', test.instance.options[0]);
				test.instance.render('option', test.instance.options[0]);
				var option_el_before = test.instance.getOption('0');
				assert.isOk(option_el_before);
				expect( Object.keys(test.instance.renderCache['option']).length === 0,'option cache empty').to.be.equal(false);
				expect( Object.keys(test.instance.renderCache['item']).length === 0,'item cache empty').to.be.equal(false);

				test.instance.clearCache('option');

				var option_el_after = test.instance.getOption('0');
				assert.isNull(option_el_after,'should clear option dom after clearCache()');
				expect( Object.keys(test.instance.renderCache['option']).length === 0, 'option cache not emptied').to.be.equal(true);
				expect( Object.keys(test.instance.renderCache['item']).length === 0, 'item cache emptied').to.be.equal(false);
			});

			it_n('should return identical item dom', function () {
				var first	= test.instance.render('item', test.instance.options[0]);
				var second	= test.instance.render('item', test.instance.options[0]);
				expect(first).to.be.equal(second);

			});

			it_n('should return different item dom after clearCache()', function () {
				var first	= test.instance.render('item', test.instance.options[0]);
				test.instance.clearCache('item');
				var second	= test.instance.render('item', test.instance.options[0]);
				expect(first).to.not.be.equal(second);

			});


		});


		describe('removeItem()', function() {

			it_n('should remove user created option', function() {

				var test = setup_test('<select>', {
					create: true,
					persist: false,
				});

				var len_opts_before = Object.keys(test.instance.options).length;
				test.instance.createItem('test');
				expect( Object.keys(test.instance.options).length).to.be.equal(len_opts_before+1);
				test.instance.removeItem('test');
				expect( Object.keys(test.instance.options).length).to.be.equal(len_opts_before);
			});

			it_n('should not remove user created option', function() {

				var test = setup_test('<select>', {
					create: true,
				});

				var len_opts_before = Object.keys(test.instance.options).length;
				test.instance.createItem('test');
				expect( Object.keys(test.instance.options).length).to.be.equal(len_opts_before+1);
				test.instance.removeItem('test');
				expect( Object.keys(test.instance.options).length).to.be.equal(len_opts_before+1);
			});

			it_n('should remove item with value=0',function(){

				test = setup_test('<select multiple>', {
					valueField: 'value',
					labelField: 'value',
					searchField:'value',
					options: [
						{value: 2},
						{value: 1},
						{value: 0},
					],
					items: ['2','1','0']
				});
				test.instance.refreshOptions(true);
				assert.equal( test.instance.items.length, 3);
				test.instance.removeItem(0);
				assert.equal( test.instance.items.length, 2);
				assert.equal( test.instance.items[0], '2');
				assert.equal( test.instance.items[1], '1');
			});

		});

		describe('controlChilden()', function() {
			it_n('controlChilden() should return empty array',function(){
				const test = setup_test('AB_Multi');
				assert.equal(test.instance.controlChildren().length,0);
			});
		});

	});
