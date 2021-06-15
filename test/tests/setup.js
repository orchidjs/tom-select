
	describe('Setup', function() {

		it_n('should not allow duplicate initialization', function() {

			let test = setup_test('<input type="text">', {});
			let errors = 0 ;
			try {
				tomSelect(test.select);

			} catch (error) {
				errors++;
			}

			expect(errors).to.be.equal(1);
		});

		describe('<input type="text">', function() {

			it_n('should complete without exceptions', function() {
				setup_test('<input type="text">');
			});

			it_n('should complete without exceptions - id with quotes', function() {
				setup_test('<input id="fo\"o\'bar">');
			});

			it_n('should populate items,options from "dataAttr" if available', function() {
				var data = [{val: 'a', lbl: 'Hello'}, {val: 'b', lbl: 'World'}];
				var test = setup_test('<input type="text" value="c,d,e" data-hydrate="' + JSON.stringify(data).replace(/"/g,'&quot;') + '">', {
					dataAttr: 'data-hydrate',
					valueField: 'val',
					labelField: 'lbl'
				});

				expect(test.instance.getValue()).to.be.equal('a,b');
				assert.deepEqual(test.instance.items, ['a','b']);

				assert.equal( test.instance.options['a'].val,'a');
				assert.equal( test.instance.options['a'].lbl,'Hello');
				assert.equal( test.instance.options['a'].$order,1);

				assert.equal( test.instance.options['b'].val,'b');
				assert.equal( test.instance.options['b'].lbl,'World');
				assert.equal( test.instance.options['b'].$order,2);

			});

			it_n('should populate options from data attributes',function(){

				var test = setup_test('<select><option value="a" data-test="b">c</option></select>');
				var option = test.instance.input.querySelector('option[value="a"]');


				assert.equal( test.instance.options['a'].value,'a');
				assert.equal( test.instance.options['a'].test,'b');
				assert.equal( test.instance.options['a'].text,'c');
				assert.equal( test.instance.options['a'].$order,1);
				assert.equal( test.instance.options['a'].disabled,false);
				assert.equal( test.instance.options['a'].optgroup,undefined);
				assert.equal( test.instance.options['a'].$option,option);

			});

			it_n('should treat bool values as integers', function() {
				var test = setup_test('<input type="text">', {
					options:[{value: true, label: 'Hello'}, {value: false, label: 'World'}]
				});

				assert.equal( test.instance.options[1].value,true);
				assert.equal( test.instance.options[1].label,'Hello');
				assert.equal( test.instance.options[1].$order,1);

				assert.equal( test.instance.options[0].value,false);
				assert.equal( test.instance.options[0].label,'World');
				assert.equal( test.instance.options[0].$order,2);

			});


			describe('getValue()', function() {
				it_n('should return value as a string', function() {
					var test = setup_test('<input type="text" value="a,b">', {delimiter: ','});
					expect(test.instance.getValue()).to.be.a('string');
				});
				it_n('should return "" when empty', function() {
					var test = setup_test('<input type="text" value="">', {delimiter: ','});
					expect(test.instance.getValue()).to.be.equal('');
				});
				it_n('should return proper value when not empty', function() {
					var test = setup_test('<input type="text" value="a,b">', {delimiter: ','});
					expect(test.instance.getValue()).to.be.equal('a,b');
				});
			});

			describe('<input type="text" attributes>', function() {
				it_n('should propagate original input attributes to the generated input', function() {
					var test = setup_test('<input type="text" autocorrect="off" autocapitalize="none" autocomplete="new-password">', {});
					expect(test.instance.control_input.getAttribute('autocorrect')).to.be.equal('off');
					expect(test.instance.control_input.getAttribute('autocapitalize')).to.be.equal('none');
					expect(test.instance.control_input.getAttribute('autocomplete')).to.be.equal('new-password');
				});
				it_n('should not add attributes if not present in the original', function() {
					var test = setup_test('<input type="text">', {});
					expect(test.instance.control_input.getAttribute('autocorrect')).to.be.equal(null);
					expect(test.instance.control_input.getAttribute('autocapitalize')).to.be.equal(null);
					expect(test.instance.control_input.getAttribute('autocomplete')).to.be.equal('off');
				});

			});


		});


		describe('<input type="number">', function() {
			it_n('should complete without exceptions', function(done) {
				var test = setup_test('<input type="number">', {});

				assert.equal(test.instance.control_input.getAttribute('type'), 'number');
				done();

			});
		});


		describe('<select>', function() {
			it_n('should complete without exceptions', function() {
				var test = setup_test('<select></select>', {});
			});
			it_n('should allow for values optgroups with duplicated options', function() {
				var test = setup_test(['<select>',
					'<optgroup data-val="Group 1" label="Group 1">',
					'<option value="a">Item A</option>',
					'<option value="b">Item B</option>',
					'</optgroup>',
					'<optgroup data-val="Group 2" label="Group 2">',
					'<option value="a">Item A</option>',
					'<option value="b">Item B</option>',
					'</optgroup>',
					'</select>'].join(''), {
					optgroupValueField: 'val',
					optgroupField: 'grp',
					disabledField: 'dis'
				});

				assert.equal( test.instance.options['a'].text,'Item A');
				assert.equal( test.instance.options['a'].value,'a');
				assert.deepEqual( test.instance.options['a'].grp,['Group 1', 'Group 2']);
				assert.equal( test.instance.options['a'].$order,1);
				assert.equal( test.instance.options['a'].dis,false);

				assert.equal( test.instance.options['b'].text,'Item B');
				assert.equal( test.instance.options['b'].value,'b');
				assert.deepEqual( test.instance.options['b'].grp,['Group 1', 'Group 2']);
				assert.equal( test.instance.options['b'].$order,2);
				assert.equal( test.instance.options['b'].dis,false);


				assert.deepEqual(test.instance.optgroups, {
					'Group 1': {label: 'Group 1', val: 'Group 1', $order: 3, dis: false},
					'Group 2': {label: 'Group 2', val: 'Group 2', $order: 4, dis: false}
				}, '2');
			});
			it_n('should respect disabled flags of option and optgroup', function() {
				var test = setup_test(['<select>',
					'<optgroup data-val="Group 1" label="Group 1">',
					'<option value="a" disabled>Item A</option>',
					'<option value="b">Item B</option>',
					'</optgroup>',
					'<optgroup data-val="Group 2" label="Group 2" disabled>',
					'<option value="a">Item A</option>',
					'<option value="b">Item B</option>',
					'</optgroup>',
					'</select>'].join(''), {
					optgroupValueField: 'val',
					optgroupField: 'grp',
					disabledField: 'dis'
				});

				assert.equal( test.instance.options['a'].text,'Item A');
				assert.equal( test.instance.options['a'].value,'a');
				assert.deepEqual( test.instance.options['a'].grp,['Group 1', 'Group 2']);
				assert.equal( test.instance.options['a'].$order,1);
				assert.equal( test.instance.options['a'].dis,true);

				assert.equal( test.instance.options['b'].text,'Item B');
				assert.equal( test.instance.options['b'].value,'b');
				assert.deepEqual( test.instance.options['b'].grp,['Group 1', 'Group 2']);
				assert.equal( test.instance.options['b'].$order,2);
				assert.equal( test.instance.options['b'].dis,false);

				assert.deepEqual(test.instance.optgroups, {
					'Group 1': {label: 'Group 1', val: 'Group 1', $order: 3, dis: false},
					'Group 2': {label: 'Group 2', val: 'Group 2', $order: 4, dis: true}
				}, '2');
			});

			it_n('should render optgroups with duplicated options correctly', function(done) {
				var test = setup_test(['<select>',
					'<optgroup label="Group 1">',
					'<option value="a">Item A</option>',
					'<option value="b">Item B</option>',
					'</optgroup>',
					'<optgroup label="Group 2">',
					'<option value="a">Item A</option>',
					'<option value="b">Item B</option>',
					'</optgroup>',
					'</select>'].join(''), {});
				test.instance.refreshOptions(true);
				assert.equal(test.instance.dropdown_content.querySelectorAll('.optgroup').length, 2, 'expect 2 optgroups');
				assert.equal(test.instance.dropdown_content.querySelectorAll('.option').length, 4, 'expect 4 options');
				done();
			});

			it_n('display non-optgroup items and optgroups with lockOptgroupOrder = true', function(done) {
				var test = setup_test(`<select>
					<option>Item</option>
					<optgroup label="Group 1">
					<option value="a">Item A</option>
					<option value="b">Item B</option>
					</optgroup>
					<optgroup label="Group 2">
					<option value="a">Item A</option>
					<option value="b">Item B</option>
					</optgroup>
					</select>`,{lockOptgroupOrder:true});
				test.instance.refreshOptions(true);
				assert.equal(test.instance.dropdown_content.querySelectorAll('.optgroup').length, 2, 'expect 2 optgroups');
				assert.equal(test.instance.dropdown_content.querySelectorAll('.option').length, 5, 'expect 5 options');
				done();
			});


			it_n('optgroup without label', function(done) {
				var test = setup_test(`<select>
					<optgroup>
					<option>Item</option>
					</optgroup>
					</select>`);
				test.instance.refreshOptions(true);
				assert.equal(test.instance.dropdown_content.querySelectorAll('.optgroup').length, 1, 'expect 1 optgroups');
				assert.equal(test.instance.dropdown_content.querySelectorAll('.option').length, 1, 'expect 1 options');
				done();
			});


			it_n('optgroups with the same label', function(done) {
				var test = setup_test(`<select>
					<optgroup label="Group">
					<option value="a">Item A</option>
					</optgroup>
					<optgroup label="Group">
					<option value="b">Item B</option>
					</optgroup>
					</select>`);
				test.instance.refreshOptions(true);
				assert.equal(test.instance.dropdown_content.querySelectorAll('.optgroup').length, 2, 'expect 2 optgroups');
				assert.equal(test.instance.dropdown_content.querySelectorAll('.option').length, 2, 'expect 2 options');
				done();
			});


			it_n('should add options in text form (no html entities)', function() {
				var test = setup_test('<select><option selected value="a">&lt;hi&gt;</option></select>', {});
				expect(test.instance.options['a'].text).to.be.equal('<hi>');
			});

			it_n('should keep options in original order if no sort given', function(done) {
				var test = setup_test([
					'<select multiple>',
						'<option value="">Select a state...</option>',
						'<option value="AL">Alabama</option>',
						'<option value="AK">Alaska</option>',
						'<option value="AZ">Arizona</option>',
						'<option value="AR">Arkansas</option>',
						'<option value="CA" selected>California</option>',
						'<option value="CO">Colorado</option>',
						'<option value="CT">Connecticut</option>',
						'<option value="DE">Delaware</option>',
						'<option value="DC">District of Columbia</option>',
						'<option value="FL">Florida</option>',
						'<option value="GA">Georgia</option>',
						'<option value="HI">Hawaii</option>',
						'<option value="ID">Idaho</option>',
						'<option value="IL">Illinois</option>',
						'<option value="IN">Indiana</option>',
						'<option value="IA">Iowa</option>',
						'<option value="KS">Kansas</option>',
						'<option value="KY">Kentucky</option>',
						'<option value="LA">Louisiana</option>',
						'<option value="ME">Maine</option>',
						'<option value="MD">Maryland</option>',
						'<option value="MA">Massachusetts</option>',
						'<option value="MI">Michigan</option>',
						'<option value="MN">Minnesota</option>',
						'<option value="MS">Mississippi</option>',
						'<option value="MO">Missouri</option>',
						'<option value="MT">Montana</option>',
						'<option value="NE">Nebraska</option>',
						'<option value="NV">Nevada</option>',
						'<option value="NH">New Hampshire</option>',
						'<option value="NJ">New Jersey</option>',
						'<option value="NM">New Mexico</option>',
						'<option value="NY">New York</option>',
						'<option value="NC">North Carolina</option>',
						'<option value="ND">North Dakota</option>',
						'<option value="OH">Ohio</option>',
						'<option value="OK">Oklahoma</option>',
						'<option value="OR">Oregon</option>',
						'<option value="PA">Pennsylvania</option>',
						'<option value="RI">Rhode Island</option>',
						'<option value="SC">South Carolina</option>',
						'<option value="SD">South Dakota</option>',
						'<option value="TN">Tennessee</option>',
						'<option value="TX">Texas</option>',
						'<option value="UT">Utah</option>',
						'<option value="VT">Vermont</option>',
						'<option value="VA">Virginia</option>',
						'<option value="WA">Washington</option>',
						'<option value="WV">West Virginia</option>',
						'<option value="WI">Wisconsin</option>',
						'<option value="01">01</option>',
						'<option value="10">10</option>',
						'<option value="WY" selected>Wyoming</option>',
					'</select>'
				].join(), {maxOptions:51});

				var order_expected = ['AL','AK','AZ','AR','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','01','10'];
				var order_actual = [];

				test.instance.refreshOptions(true);

				$(test.instance.dropdown).find('[data-value]').each(function(i, el) {
					order_actual.push($(el).attr('data-value'));
				});

				expect(order_actual).to.eql(order_expected);
				done();

			});
			it_n('should respect option disabled flag', function (done) {
				var test = setup_test(['<select>',
					'<option value="a">Item A</option>',
					'<option value="b" disabled>Item B</option>',
					'</select>'].join(''), {});

				test.instance.refreshOptions(true);

				expect($(test.instance.dropdown).find('.option')).to.has.length(2);
				expect($(test.instance.dropdown).find('[data-selectable]')).to.has.length(1);
				done();

			});
			describe('getValue()', function() {
				it_n('should return "" when empty', function() {
					var test = setup_test('<select>', {});
					expect(test.instance.getValue()).to.be.equal('');
				});
				it_n('should return proper value when not empty', function() {
					var test = setup_test('<select><option selected value="a">A</option></select>', {});
					expect(test.instance.getValue()).to.be.equal('a');
				});
			});
		});

		describe('<select multiple>', function() {
			it_n('should complete without exceptions', function() {
				var test = setup_test('<select>', {});
			});
			describe('getValue()', function() {
				it_n('should return [] when empty', function() {
					var test = setup_test('<select multiple>', {});
					expect(test.instance.getValue()).to.deep.equal([]);
				});
				it_n('should return proper value as array when not empty', function() {
					var test = setup_test('<select multiple><option selected value="a">A</option></select>', {});
					expect(test.instance.getValue()).to.deep.equal(['a']);
				});
			});
		});

		describe('<select disabled>', function() {
			var test;

			before(function() {
				test = setup_test('<select disabled>', {});
			});
			it_n('should have "disabled" class', function() {
				expect(test.instance.control.classList.contains('disabled')).to.be.equal(true);
			});
			it_n('should have isDisabled property set to true', function() {
				expect(test.instance.isDisabled).to.be.equal(true);
			});
		});


		describe('<select> (custom string render)', function() {

			it_n('should render the custom option element', function(done) {

				const test = setup_test(`<select>
					<option value="">Select an option...</option>
					<option value="a">A</option>
					<optgroup>
						<option value="b">B</option>
					</optgroup>
				</select>`, {
					render: {
						option: function(item, escape) {
							return '<div class="option custom-option">' + escape(item.text) + '</div>'
						},
						optgroup_header: null,
					}
				});


				test.instance.focus();

				window.setTimeout(function() {
					assert.equal( test.instance.dropdown.querySelectorAll('.custom-option').length, 2);
					done();
				}, 5);
			});
		});

		describe('<select> (custom dom render)', function() {
			var test;

			beforeEach(function() {
				test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
				'</select>', {
					render: {
						option: function(item, escape) {
							var div = document.createElement('div');

							div.className = 'option custom-option';
							div.innerHTML = escape(item.text);

							return div;
						}
					}
				});
			});

			it_n('should render the custom option element', function(done) {
				test.instance.focus();

				window.setTimeout(function() {
					expect($(test.instance.dropdown_content).find('.custom-option').length).to.be.equal(1);
					done();
				}, 5);
			});
		});

		describe('<select> (custom jquery render)', function() {
			var test;

			beforeEach(function() {
				test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
				'</select>', {
					render: {
						option: function(item, escape) {
							return $('<div class="option custom-option">').text(item.text);
						}
					}
				});
			});

			it_n('should render the custom option element', function(done) {
				test.instance.focus();

				window.setTimeout(function() {
					expect($(test.instance.dropdown_content).find('.custom-option').length).to.be.equal(1);
					done();
				}, 5);
			});
		});


		describe('rtl detection', function() {

			it_n('should not be rtl', function() {
				var test = setup_test('<select>', {});
				expect(test.instance.rtl).to.be.equal(false);
			});

			it_n('should detect rtl', function() {
				var test = setup_test('<select dir="rtl">', {});
				expect(test.instance.rtl).to.be.equal(true);
			});

			it_n('should detect parent rtl', function() {
				var test = setup_test('<div dir="rtl"><select class="setup-here"></select></div>', {});
				expect(test.instance.rtl).to.be.equal(true);
			});

		});


		describe('external control input', function() {
			var test, control;

			before(()=>{
				test		= setup_test('<div><select class="setup-here"><option>a</option><option>b</option></select><input id="external-control"></div>',{controlInput:'#external-control'});
				control		= document.getElementById('external-control');
			});

			it_n('should filter options when typing in external control', function(done) {

				syn.type('a',control,function(){
					assert.equal(test.instance.dropdown_content.children.length, 1);
					done();
				});

			});

			it_n('should not hide external control', function() {
				test.instance.hideInput();
				assert.equal(test.instance.isInputHidden, false);
			});


			it_n('should not move caret position', function(done) {
				test.instance.addItem('a');
				test.instance.addItem('b');
				var caretpos = test.instance.caretPos;

				syn.type('[left]',control,function(){
					assert.equal(test.instance.caretPos, caretpos);
					done();
				});
			});


		});


	});
