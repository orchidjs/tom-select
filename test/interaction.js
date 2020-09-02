(function() {

	var click = function(el, cb) {
		syn.click(el).delay(100, cb);
	};




	// These tests are functional simulations of
	// user interaction, using syn.js. For more information:
	//
	// @see http://v3.javascriptmvc.com/docs.html#&who=syn
	// @see http://bitovi.com/blog/2010/07/syn-a-standalone-synthetic-event-library.html

	describe('Interaction', function() {

		describe('dropdown', function() {

			it_n('should keep dropdown open after selection made if closeAfterSelect: false', function(done) {

				var test = setup_test('AB_Multi',{});

				click(test.selectize.control, function() {
					click($('[data-value=a]', test.selectize.dropdown_content), function() {
						expect(test.selectize.isOpen).to.be.equal(true);
						expect(test.selectize.isFocused).to.be.equal(true);
						done();
					});
				});
			});

			it_n('should close dropdown after selection made if closeAfterSelect: true', function(done) {

				var test = setup_test('AB_Multi',{closeAfterSelect: true});

				click(test.selectize.control, function() {
					click( $('[data-value=a]', test.selectize.dropdown_content), function() {
						expect(test.selectize.isOpen).to.be.equal(false);
						expect(test.selectize.isFocused).to.be.equal(true);
						done();
					});
				});
			});

			it_n('should reopen dropdown if clicked after being closed by closeAfterSelect: true', function(done) {

				var test = setup_test('AB_Multi',{closeAfterSelect: true});

				click(test.selectize.control, function() {
					click($('[data-value=a]', test.selectize.dropdown_content), function() {
						click(test.selectize.control, function () {
								expect(test.selectize.isOpen).to.be.equal(true);
								expect(test.selectize.isFocused).to.be.equal(true);
								done();
						});
					});
				});
			});


			it_n('should close dropdown after selection made if closeAfterSelect: true and in single mode' , function(done) {

				var test = setup_test('AB_Single',{closeAfterSelect: true});

				click(test.selectize.control, function() {
					expect(test.selectize.isOpen).to.be.equal(true);
					click($('[data-value=a]', test.selectize.dropdown_content), function() {
						expect(test.selectize.isOpen).to.be.equal(false);
						done();
					});
				});
			});


			it_n('should blur dropdown after selection made if closeAfterSelect: true and in single mode' , function(done) {

				var test = setup_test('AB_Single',{closeAfterSelect: true});

				click(test.selectize.control, function() {
					expect(test.selectize.isFocused).to.be.equal(true);
					click($('[data-value=a]', test.selectize.dropdown_content), function() {
						expect(test.selectize.isFocused).to.be.equal(false);
						done();
					});
				});
			});

			it_n('should close dropdown after [escape] key press', function(done) {

				var test = setup_test('AB_Multi');

				click(test.selectize.control, function() {
					expect(test.selectize.isOpen).to.be.equal(true);

					syn.type('[escape]', test.selectize.control_input, function() {
						expect(test.selectize.isOpen).to.be.equal(false);
						done();
					});

				});
			});


			it_n('should change activeOption with [down] and [up] keypress', function(done) {

				var test = setup_test('AB_Multi');

				click(test.selectize.control, function() {
					expect(test.selectize.activeOption.dataset.value).to.be.equal('a');

					syn.type('[down]', test.selectize.control_input, function() {
						expect(test.selectize.activeOption.dataset.value).to.be.equal('b');

						syn.type('[up]', test.selectize.control_input, function() {
							expect(test.selectize.activeOption.dataset.value).to.be.equal('a');
							done();
						});

					});

				});
			});


		});


		describe('clicking control', function() {

			it_n('should give it focus', function(done) {

				var test = setup_test('AB_Single',{});

				click(test.selectize.control, function() {
					expect(test.selectize.isFocused).to.be.equal(true);
					done();
				});
			});

			it_n('should start loading results if preload:"focus"', function(done) {
				var calls_focus = 0;
				var calls_load = 0;

				var test = setup_test('AB_Single',{
					preload: 'focus',
					load: function(query, done) {
						calls_load++;
						assert.equal(query, '');
						setTimeout(function() {
							done([{value: 'c', text: 'C'}]);
						});
					}
				});

				test.selectize.on('focus', function() {
					calls_focus++;
				});
				click(test.selectize.control, function() {
					setTimeout(function() {
						assert.equal(calls_focus, 1);
						assert.equal(calls_load, 1);
						done();
					}, 300);
				});
			});

			it_n('should open dropdown menu', function(done) {
				var test = setup_test('AB_Single',{});

				click(test.selectize.control, function() {
					expect(test.selectize.isOpen).to.be.equal(true);
					expect($(test.selectize.dropdown).is(':visible')).to.be.equal(true);
					done();
				});
			});

		});

		describe('clicking label', function() {

			it_n('should give it focus to select', function(done) {

				var inputId		= "labeledSelect";
				var label		= $('<label for="'+inputId+'">select</label>').appendTo('form');
				var test = setup_test('<select id="'+inputId+'">' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});


				syn.click(label)
					.delay(0, function() {
						label.remove();
						expect(test.selectize.isFocused).to.be.equal(true);
						done();
					});
			});

			it_n('should give it focus to input', function(done) {

				var inputId		= "labeledInput";
				var label		= $('<label for="'+inputId+'">input</label>').appendTo('form');
				var test		= setup_test('<input id="'+inputId+'" type="text" value="a,b,c,d">', {});

				syn.click(label)
					.delay(0, function() {
						label.remove();
						expect(test.selectize.isFocused).to.be.equal(true);
						done();
					});
			});

		});

		describe('clicking option', function() {

			it_n('should select it', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				click(test.selectize.control, function() {
					click($('[data-value="b"]', test.selectize.dropdown), function() {
						expect(test.selectize.input.value).to.be.equal('b');
						expect(test.selectize.input.textContent).to.be.equal('B');
						done();
					});
				});
			});

			it_n('should close dropdown', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				click(test.selectize.control, function() {
					click($('[data-value="b"]', test.selectize.dropdown), function() {
						expect(test.selectize.isOpen).to.be.equal(false);
						expect($(test.selectize.dropdown).is(':visible')).to.be.equal(false);
						done();
					});
				});
			});

		});

		describe('typing in input', function() {

			it_n('should filter results', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				click(test.selectize.control, function() {
					syn.type('a', test.selectize.control_input)
					.delay(0, function() {
						expect($('[data-value="a"]', $(test.selectize.dropdown)).length).to.be.equal(1);
						expect($('[data-value="b"]', $(test.selectize.dropdown)).length).to.be.equal(0);
						done();
					});
				});
			});

			it_n('should hide dropdown if no results present', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				click(test.selectize.control, function() {
					syn.type('awaw', test.selectize.control_input)
					.delay(0, function() {
						expect(test.selectize.isOpen).to.be.equal(false);
						expect($(test.selectize.dropdown).is(':visible')).to.be.equal(false);
						done();
					});
				});
			});

			it_n('should not hide dropdown if "create" option enabled and no results present', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {create: true});

				click(test.selectize.control, function() {
					syn.type('awaw', test.selectize.control_input)
					.delay(0, function() {
						expect(test.selectize.isOpen).to.be.equal(true);
						expect($(test.selectize.dropdown).is(':visible')).to.be.equal(true);
						done();
					});
				});
			});

			it_n('should restore dropdown visibility when backing out of a query without results (backspace)', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {});

				click(test.selectize.control, function() {
					syn.type('awf', test.selectize.control_input)
					.type('\b\b\b', test.selectize.control_input, function() {
						expect(test.selectize.isOpen).to.be.equal(true);
						expect($(test.selectize.dropdown).is(':visible')).to.be.equal(true);
						done();
					});
				});
			});

			it_n('should move caret when [left] or [right] pressed', function(done) {
				var test = setup_test('<input type="text" value="a,b,c,d">', {create: true});

				click(test.selectize.control, function() {
					syn.type('[left][left]whatt', test.selectize.control_input, function() {
						expect(test.selectize.caretPos).to.be.equal(2);
						done();
					});
				});
			});

			it_n('should not create input if comma entered in single select mode', function(done) {
				var test = setup_test('<select>' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select>', {create: true});

				click(test.selectize.control, function() {
					syn.type('asdf,asdf', test.selectize.control_input, function() {
						expect(test.selectize.isOpen).to.be.equal(true);
						expect(test.selectize.options).to.not.have.property('asdf');
						done();
					});
				});
			});

			it_n('should not delete any dropdown option text if duplicate match occurs', function(done) {
				var test = setup_test('<select>' +
					'<option></option>' +
					'<option value="a"></option>' +
					'<option value="b">Isabel Street</option>' +
				'</select>', {});

				click(test.selectize.control, function() {
					// Here, the 'S' in St will also match the 's' in Isabel (a duplicate match)
					syn.type('Isabel St', test.selectize.control_input, function() {
						expect($(test.selectize.dropdown_content).find('.option[data-value=b]').text()).to.be.equal('Isabel Street');
						done();
					});
				});
			});

		});

		describe('selecting items',function(){

			it_n('should select previous item when [ctrl][left] pressed', function(done) {
				var test = setup_test('AB_Multi');

				test.selectize.addItem('a');
				test.selectize.addItem('b');
				test.selectize.setActiveItem(test.selectize.getItem('b'));

				click(test.selectize.control, function() {

					syn.type('[ctrl][left][ctrl-up]', test.selectize.control_input, function() {
						expect( test.selectize.activeItems.length ).to.be.equal(2);
						done();
					});
				});

			});

			it_n('should select next item when [ctrl][right] pressed, then unselect when [ctrl][left] pressed', function(done) {
				var test = setup_test('AB_Multi');

				test.selectize.addItem('a');
				test.selectize.addItem('b');
				test.selectize.setActiveItem(test.selectize.getItem('a'));

				click(test.selectize.control, function() {

					syn.type('[ctrl][right][ctrl-up]', test.selectize.control_input, function() {
						expect( test.selectize.activeItems.length ).to.be.equal(2);

						syn.type('[ctrl][left][ctrl-up]', test.selectize.control_input, function() {
							expect( test.selectize.activeItems.length ).to.be.equal(1);
							done();
						});

					});
				});

			});

			it_n('should not select next item when [ctrl][right] pressed at the end of item list', function(done) {
				var test = setup_test('AB_Multi');

				test.selectize.addItem('a');
				test.selectize.addItem('b');
				test.selectize.setActiveItem(test.selectize.getItem('b'));

				click(test.selectize.control, function() {

					syn.type('[ctrl][right][ctrl-up]', test.selectize.control_input,function() {
						expect( test.selectize.activeItems.length ).to.be.equal(1);
						done();
					});
				});

			});

			it_n('should move caret before selected item when [left] pressed', function(done) {
				var test = setup_test('AB_Multi');

				test.selectize.addItem('a');
				test.selectize.addItem('b');
				test.selectize.setActiveItem(test.selectize.getItem('b'));

				let last_active			= test.selectize.getLastActive();
				expect( last_active.nextElementSibling ).to.be.equal( test.selectize.control_input );

				click(test.selectize.control, function() {

					syn.type('[left]', test.selectize.control_input, function() {
						let last_active			= test.selectize.getLastActive();
						expect( last_active.previousElementSibling ).to.be.equal( test.selectize.control_input );
						done();
					});
				});

			});


			it_n('clicking item should activate it', function() {
				var test = setup_test('AB_Multi');

				test.selectize.addItem('a');
				var item = test.selectize.getItem('a');
				expect(item.classList.contains('active')).to.be.equal(false);

				click(item,function(){
					expect(item.classList.contains('active')).to.be.equal(true);
				});
			});


			it_n('should select option with [return] keypress', function(done) {

				var test = setup_test('AB_Multi');

				click(test.selectize.control, function() {
					expect(test.selectize.activeOption.dataset.value).to.be.equal('a');

					syn.type('[enter]', test.selectize.control_input, function() {
						expect(test.selectize.items.length).to.be.equal(1);
						expect(test.selectize.items[0]).to.be.equal('a');
						done();

					});

				});

			});

			it_n('should select option with [tab] keypress when selectOnTab = true', function(done) {

				var test = setup_test('AB_Multi',{selectOnTab:true});

				click(test.selectize.control, function() {
					expect(test.selectize.activeOption.dataset.value).to.be.equal('a');

					syn.type('[tab]', test.selectize.control_input, function() {
						expect(test.selectize.items.length).to.be.equal(1);
						expect(test.selectize.items[0]).to.be.equal('a');
						done();

					});

				});
			});

			it_n('should select all items when [ctrl-a] pressed', function(done) {

				var test = setup_test('AB_Multi');

				test.selectize.addItem('a');
				test.selectize.addItem('b');

				click(test.selectize.control, function() {
					assert.equal( test.selectize.activeItems.length, 0 );

					syn.type('[ctrl]a[ctrl-up]', test.selectize.control_input, function() {
						assert.equal( test.selectize.activeItems.length, 2 );
						done();

					});

				});
			});

			var ShiftMousedown = function(first_item,last_item){

				it_n('should select multiple items with [shift] + mousedown', function(done) {

					var test = setup_test('AB_Multi');

					test.selectize.addItem('a');
					test.selectize.addItem('b');
					test.selectize.addItem('c');
					var itema = test.selectize.getItem(first_item);
					var itemc = test.selectize.getItem(last_item);

					assert.equal( test.selectize.activeItems.length, 0 );

					// 1) hold shift down
					syn.type('[shift]', test.selectize.control_input, function(){

						// 2) click first item
						click(itema,function(){
							assert.equal( test.selectize.activeItems.length, 1 );

							// 3) click last item
							click(itemc,function(){
								assert.equal( test.selectize.activeItems.length, 3 );

								// 4) release shift key
								syn.type('[shift-up]', test.selectize.control_input, function(){});
								done();
							});
						});

					});

				});
			}
			ShiftMousedown('a','c');
			ShiftMousedown('c','a');


			it_n('should toggle active item when [ctrl] + mousedown', function(done) {

				var test = setup_test('AB_Multi');

				test.selectize.addItem('a');
				var itema = test.selectize.getItem('a');

				assert.equal( test.selectize.activeItems.length, 0 );

				// 1) hold ctrl down
				syn.type('[ctrl]', test.selectize.control_input, function() {

					// 2) activate itema
					click(itema,function(){
						assert.equal( test.selectize.activeItems.length, 1 );

						// 3) de-activate itema with a click
						click(itema,function(){
							assert.equal( test.selectize.activeItems.length, 0 );

							// 4) release ctrl key
							syn.type('[ctrl-up]', test.selectize.control_input, function() {});
							done();

						});
					});

				});

			});

			it_n('should remove active item when delete pressed', function(done) {

				var test = setup_test('AB_Multi');

				test.selectize.addItem('a');
				test.selectize.addItem('b');
				test.selectize.setActiveItem(test.selectize.getItem('b'));
				assert.equal( test.selectize.items.length, 2 );

				syn.type('\b', test.selectize.control_input, function() {

					assert.equal( test.selectize.items.length, 1 );
					assert.equal( test.selectize.items[0], 'a' );
					done();

				});

			});

		});

		describe('blurring the input', function() {
			it_n('should close dropdown when createOnBlur is true', function(done) {

				var test = setup_test('AB_Multi',{
					createOnBlur: true,
					create: function(value){
						return {
							value: value,
							text: value
						};
					}
				});

				click(test.selectize.control, function() {
					syn
						.type('fooo', test.selectize.control_input)
						.delay(0, function() {
							expect(test.selectize.isOpen).to.be.equal(true);
							expect($(test.selectize.dropdown).is(':visible')).to.be.equal(true);

							syn
								.click($("body"))
								.delay(5, function() {
									expect(test.selectize.isOpen).to.be.equal(false);
									expect($(test.selectize.dropdown).is(':visible')).to.be.equal(false);
									done();
								});
						});
				});

			});
		});

		describe('creating items',function(){

			it_n('should create item when clicking on create option', function(done) {

				var test = setup_test('AB_Multi', {create: true});

				// 1) focus on control
				click(test.selectize.control, function() {

					// 2) type "d"
					syn.type('d', test.selectize.control_input, function() {

						// 2) hit enter to create
						syn.type('[enter]', test.selectize.control_input, function() {
							expect(test.selectize.items[0]).to.be.equal('d');
							done();
						});

					});

				});
			});


			describe('filtering created items', function() {

				var text = 'abc';

				function execFilterTest(filter, done, expectation) {

					var test		= setup_test('<select multiple="multiple"></select>', {create: true, createFilter: filter});
					var selectize	= test.selectize;

					click(selectize.control, function() {
						syn
							.type(text, selectize.control_input)
							.type(selectize.settings.delimiter, selectize.control_input )
							.delay(0, function() {
								expectation(selectize);
								done();
							})
					});
				}

				function execFilterTests(heading, filters, expectation) {
					for (var i = 0; i < filters.length; i++) {
						(function(filter) {
							it_n(heading, function(done) {
								execFilterTest(filter, done, expectation);
							});
						})(filters[i]);
					}
				}

				execFilterTests('should add an item  normally if there is no createFilter', [undefined, null, ''], function(selectize) {
					expect(selectize.getItem(text)).to.be.ok;
				});

				execFilterTests('should add an item if the input matches the createFilter', ['a', /a/, function() { return true; }], function(selectize) {
					expect(selectize.getItem(text)).to.be.ok;
				});

				execFilterTests('should not add an item or display the create label if the input does not match the createFilter (A)', ['foo', /foo/, function() { return false; }], function(selectize) {
					expect(selectize.getItem(text)).to.be.equal(undefined);
				});

				execFilterTests('should not add an item or display the create label if the input does not match the createFilter (B)', ['foo', /foo/, function() { return false; }], function(selectize) {
					expect($(selectize.dropdown_content).filter('.create').length).to.be.equal(0);
				});

			});


		});

	});

})();
