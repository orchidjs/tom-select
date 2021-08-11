


	// These tests are functional simulations of
	// user interaction, using syn.js. For more information:
	//
	// @see http://v3.javascriptmvc.com/docs.html#&who=syn
	// @see http://bitovi.com/blog/2010/07/syn-a-standalone-synthetic-event-library.html

	describe('Interaction', function() {

		describe('dropdown', function() {

			it_n('should keep dropdown open after selection made if closeAfterSelect: false', function(done) {

				var test = setup_test('AB_Multi',{});

				click(test.instance.control, function() {
					click($('[data-value=a]', test.instance.dropdown_content), function() {
						expect(test.instance.isOpen).to.be.equal(true);
						expect(test.instance.isFocused).to.be.equal(true);
						done();
					});
				});
			});

			it_n('should keep dropdown open when clicking on dropdown if dropdownParent=body', function(done) {

				var test = setup_test('AB_Multi',{dropdownParent:'body'});

				click(test.instance.control, function() {
					click($('[data-value=a]', test.instance.dropdown_content), function() {
						expect(test.instance.isOpen).to.be.equal(true);
						expect(test.instance.isFocused).to.be.equal(true);
						done();
					});
				});
			});

			it_n('should reopen dropdown if clicked after being closed by closeAfterSelect: true', function(done) {

				var test = setup_test('AB_Multi',{closeAfterSelect: true});

				click(test.instance.control, function() {
					click($('[data-value=a]', test.instance.dropdown_content), function() {

						assert.equal(test.instance.isOpen, false, 'should be closed after select');
						assert.equal(test.instance.isFocused, true, 'should be closed w/ focus after select');

						click(test.instance.control, function () {

							assert.equal(test.instance.isOpen, true, 'should be open after click');
							assert.equal(test.instance.isFocused, true, 'should be focused after click');

							done();
						});
					});
				});
			});


			it_n('should close dropdown after selection made if closeAfterSelect: true and in single mode' , function(done) {

				var test = setup_test('AB_Single',{closeAfterSelect: true});

				click(test.instance.control, function() {
					expect(test.instance.isOpen).to.be.equal(true);
					click($('[data-value=a]', test.instance.dropdown_content), function() {
						expect(test.instance.isOpen).to.be.equal(false);
						done();
					});
				});
			});


			it_n('should blur dropdown after selection made if closeAfterSelect: true and in single mode' , function(done) {

				var test = setup_test('AB_Single',{closeAfterSelect: true});

				click(test.instance.control, function() {
					expect(test.instance.isFocused).to.be.equal(true);
					click($('[data-value=a]', test.instance.dropdown_content), function() {
						expect(test.instance.isFocused).to.be.equal(false);
						done();
					});
				});
			});

			it_n('should close dropdown and clear active items after [escape] key press', async () => {

				var test = setup_test('AB_Multi',{items:['a']});

				await asyncClick(test.instance.control);
				test.instance.setActiveItem(test.instance.getItem('a'));

				assert.equal( test.instance.isOpen, true, 'not open' );
				assert.equal( test.instance.items.length, 1 , 'should have 1 item' );
				assert.equal( test.instance.activeItems.length, 1 , 'should 1 active item' );

				await asyncType('[escape]', test.instance.control_input);
				assert.equal( test.instance.isOpen, false, 'not closed' );
				assert.equal( test.instance.activeItems.length, 0 , 'not cleared' );
				assert.equal( test.instance.control_input.value,'','should clear control_input');

			});

			it_n('should close dropdown and clear control_input after [escape] key press', async () => {

				var test = setup_test('AB_Multi',{items:['a']});

				await asyncClick(test.instance.control);
				await asyncType('b', test.instance.control_input);

				assert.equal( test.instance.isOpen, true, 'not open' );
				assert.equal( test.instance.control_input.value,'b','should type "b"');

				await asyncType('[escape]', test.instance.control_input);
				assert.equal( test.instance.isOpen, false, 'not closed' );
				assert.equal( test.instance.control_input.value,'','should clear control_input');

			});


			it_n('should change activeOption with [down] and [up] keypress', function(done) {

				var test = setup_test(`<select>
										<optgroup>
											<option>a</option>
										</optgroup>
										<optgroup>
											<option>b</option>
										</optgroup>
										</select>
										`);

				click(test.instance.control, function() {
					assert.equal( test.instance.activeOption.dataset.value, 'a', 'activeOption should be "a" to start');

					syn.type('[down]', test.instance.control_input, function() {
						assert.equal( test.instance.activeOption.dataset.value, 'b', 'activeOption should be changed to "b"');

						syn.type('[up]', test.instance.control_input, function() {
							assert.equal( test.instance.activeOption.dataset.value, 'a', 'activeOption should be changed back to "a"');
							done();
						});

					});

				});
			});

			it_n('should not close dropdown when clicking on dropdown header', function(done) {

				var select = `<select><optgroup label="Swedish Cars">
								<option value="volvo">Volvo</option>
								<option value="saab">Saab</option>
							</optgroup>
							</select>`;

				var test = setup_test(select,{
					render:{
						'optgroup_header': function(data, escape) {
							return '<input class="optgroup-header">';
						},
					}
				});

				click(test.instance.control, function() {
					expect(test.instance.isOpen).to.be.equal(true);

					var header = test.instance.dropdown.querySelector('.optgroup-header')

					click(header,function(){
						expect(test.instance.isOpen).to.be.equal(true);
						done();
					});

				});

			});

		});


		describe('clicking control', function() {

			it_n('should toggle focus', function(done) {

				var test = setup_test('AB_Single_Long',{
					items: ['p']
				});

				click(test.instance.control, function() {
					assert.equal(test.instance.isFocused,true);
					assert.equal(test.instance.isOpen,true);
					expect( isVisible(test.instance.dropdown) ).to.be.equal(true);
					assert.equal( test.instance.activeOption.dataset.value,'p','activeOption should be "p"');
					assert.isAbove(test.instance.dropdown_content.scrollTop, 0, 'dropdown should be scrolled to activeOption');

					click(test.instance.control, function() {
						assert.equal(test.instance.isFocused,false);
						assert.equal(test.instance.isOpen,false);
						done();
					});
				});
			});

			it_n('should toggle focus clicking item in single mode control', function(done) {

				var test = setup_test('AB_Single',{
					items:['a']
				});

				var itema = test.instance.getItem('a');

				click(itema, function() {
					assert.equal(test.instance.isFocused,true);
					assert.equal(test.instance.isOpen,true);

					click(itema, function() {
						assert.equal(test.instance.isFocused,false);
						assert.equal(test.instance.isOpen,false);
						done();
					});
				});
			});


			it_n('should remain open but clear active item on click', function(done) {
				var test = setup_test('AB_Multi');

				click(test.instance.control, () => {
					test.instance.addItem('a');
					test.instance.setActiveItem(test.instance.getItem('a'));

					assert.equal( test.instance.activeItems.length, 1);
					assert.equal( test.instance.isOpen, true);

					click(test.instance.control_input, () => {

						assert.equal( test.instance.activeItems.length, 0);
						assert.equal( test.instance.isOpen, true);
						assert.equal( test.instance.isFocused, true);

						done();
					});
				});
			});
		});

		describe('clicking label', function() {

			it_n('should give focus to select', function(done) {

				var test = setup_test(`<label for="labeledSelect" id="select-label">select</label><select class="setup-here" id="labeledSelect">
					<option value="a">A</option>
					<option value="b">B</option>
				</select>`);

				var label = document.getElementById('select-label');

				label.click();

				setTimeout(()=>{
					expect(test.instance.isFocused).to.be.equal(true);
					done();
				},1);
			});


			it_n('should give focus to input', function(done) {

				var test		= setup_test(`<label for="labeledInput" id="input-label">input</label>
					<input id="labeledInput" type="text" value="a,b,c,d" class="setup-here">`);

				var label = document.getElementById('input-label');

				label.click();

				setTimeout(()=>{
					expect(test.instance.isFocused).to.be.equal(true);
					done();
				},1);
			});

		});

		describe('selecting option', function() {

			it_n('should select option when clicked', async () =>{
				var test = setup_test('<div id="test-wrap"><select class="setup-here">' +
					'<option value="">Select an option...</option>' +
					'<option value="a">A</option>' +
					'<option value="b">B</option>' +
				'</select></div>');

				var clicked = false;
				document.getElementById('test-wrap').addEventListener('click',()=>{
					clicked = true;
				});


				await asyncClick(test.instance.control);
				assert.equal(test.instance.input.querySelectorAll('option').length, 3,'should keep original options');
				assert.isTrue( test.instance.isOpen, 'Should be open' );
				var option_before = test.instance.input.querySelector('option[value="b"]');


				await asyncClick( test.instance.dropdown.querySelector('[data-value="b"]') );
				var option_after = test.instance.input.querySelector('option[value="b"]');
				assert.equal(option_before, option_after,'should not recreate original <option>');
				assert.equal(test.instance.input.value,'b','should select "b" value');
				assert.equal(test.instance.dropdown_content.querySelectorAll('.selected').length,1,'only one dropdown option should have selected class');
				assert.isFalse(clicked,'should not trigger click evt on div');
				assert.isFalse( test.instance.isOpen, 'Should close dropdown' );
				assert.isFalse( isVisible(test.instance.dropdown), 'Should close dropdown' );

				await asyncClick(test.instance.control);
				assert.isTrue( test.instance.isOpen, 'Should be open' );

				await asyncClick( test.instance.dropdown.querySelector('[data-value="a"]') );
				var option_after = test.instance.input.querySelector('option[value="b"]');
				assert.equal(option_before, option_after,'should not recreate original <option>');
				assert.equal(test.instance.input.value,'a','should select "a" value');
				assert.equal(test.instance.dropdown_content.querySelectorAll('.selected').length,1,'only one dropdown option should have selected class');
				assert.isFalse(clicked,'should not trigger click evt on div');

			});

			it_n('should update original select when required', async () => {
				var test = setup_test(`<select required><option value="a" selected>A</option><option value="b">B</option></select>`);

				await asyncClick(test.instance.control);
				await asyncClick( test.instance.dropdown.querySelector('[data-value="b"]') );
				assert.equal(test.select.value,'b');
			});

			it_n('should order selected options',function(done){
				var test = setup_test('AB_Multi',{create:true});

				click(test.instance.control, function() {

					var option_a = test.html.querySelector('option[value="a"]');
					var option_b = test.html.querySelector('option[value="b"]');
					assert.equal(option_a.nextSibling, option_b,'should be original order');

					click($('[data-value="b"]', test.instance.dropdown), function() {

						syn.type('new',test.instance.control_input,function(){
							syn.type('[enter]',test.instance.control_input, function(){
								click($('[data-value="a"]', test.instance.dropdown), function() {
									var selected = test.html.querySelectorAll('option[selected]');
									assert.equal(selected.length, 3,'should have three selected options');
									assert.equal(option_b.nextSibling.value, 'new' ,'"new" should be after "b"');
									assert.equal(option_b.nextSibling.nextSibling, option_a ,'"a" should be after "b"');
									done();
								});
							});
						});
					});
				});

			});

			it_n('should remove user created option when selecting other option', async () => {

				var test = setup_test('AB_Single', {
					create: true,
					persist: false,
				});

				var len_opts_before = Object.keys(test.instance.options).length;
				test.instance.createItem('test');
				expect( Object.keys(test.instance.options).length).to.be.equal(len_opts_before+1);
				
				await asyncClick(test.instance.control);
				assert.isTrue(test.instance.isOpen);
				var option = test.instance.getOption('a');
				await asyncClick(option);
				
				expect( Object.keys(test.instance.options).length).to.be.equal(len_opts_before);
			});
			
		});

		describe('typing in input', function() {

			it_n('should filter results', function(done) {
				var test = setup_test('AB_Single', {});

				click(test.instance.control, function() {
					syn.type('a', test.instance.control_input)
					.delay(0, function() {
						assert.equal(test.instance.control_input.value,'a','control_input should have value="a"');
						expect($('[data-value="a"]', test.instance.dropdown).length).to.be.equal(1);
						expect($('[data-value="b"]', test.instance.dropdown).length).to.be.equal(0);

						click(test.instance.control_input,function(){
							assert.equal(test.instance.control_input.value,'a','should not clear control_input');
							done();
						});
					});
				});
			});

			it_n('should refreshOptions when deleting filter', function(done) {
				var test = setup_test('AB_Single');

				click(test.instance.control, function() {
					syn.type('a', test.instance.control_input)
					.delay(0, function() {
						assert.equal(test.instance.dropdown_content.children.length,1);

						syn.type('\b',test.instance.control_input)
						.delay(0, function() {
							assert.equal(test.instance.dropdown_content.children.length,3);
							done();
						});

					});
				});
			});


			it_n('should hide dropdown if no results present and no_result template is null', function(done) {
				var test = setup_test('AB_Multi', {
					render:{'no_results':null}
				});

				click(test.instance.control, function() {
					syn.type('awaw', test.instance.control_input)
					.delay(0, function() {
						expect(test.instance.isOpen).to.be.equal(false);
						expect( isVisible(test.instance.dropdown) ).to.be.equal(false);
						done();
					});
				});
			});


			it_n('should show no_results message if no results present', function(done) {
				var test = setup_test('AB_Multi');

				click(test.instance.control, function() {
					syn.type('awaw', test.instance.control_input)
					.delay(0, function() {
						expect(test.instance.isOpen).to.be.equal(true);
						expect(test.instance.dropdown.children.length).to.be.equal(1);
						expect(test.instance.dropdown.querySelectorAll('.no-results').length).to.be.equal(1);
						done();
					});
				});
			});


			it_n('should not hide dropdown if "create" option enabled and no results present', function(done) {
				var test = setup_test('AB_Multi', {create: true});

				click(test.instance.control, function() {
					syn.type('awaw', test.instance.control_input)
					.delay(0, function() {
						expect(test.instance.isOpen).to.be.equal(true);
						expect( isVisible(test.instance.dropdown) ).to.be.equal(true);
						done();
					});
				});
			});

			it_n('should restore dropdown visibility when backing out of a query without results (backspace)', function(done) {
				var test = setup_test('AB_Multi', {});

				click(test.instance.control, function() {
					syn.type('awf', test.instance.control_input)
					.type('\b\b\b', test.instance.control_input, function() {
						expect(test.instance.isOpen).to.be.equal(true);
						expect( isVisible(test.instance.dropdown) ).to.be.equal(true);
						done();
					});
				});
			});

			it_n('should move caret when [left] or [right] pressed', function(done) {
				var test = setup_test('<input type="text" value="a,b,c,d">', {create: true});

				click(test.instance.control, function() {
					syn.type('[left][left]whatt', test.instance.control_input, function() {
						expect(test.instance.caretPos).to.be.equal(2);
						done();
					});
				});
			});

			it_n('should not move caret when [left] or [right] pressed and control_input is not empty', function(done) {
				var test = setup_test('<input type="text" value="a,b,c,d">', {create: true});

				click(test.instance.control, function() {
					syn.type('whatt[left]', test.instance.control_input, function() {
						expect(test.instance.caretPos).to.be.equal(4);
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

				click(test.instance.control, function() {
					syn.type('asdf,asdf', test.instance.control_input, function() {
						expect(test.instance.isOpen).to.be.equal(true);
						expect(test.instance.options).to.not.have.property('asdf');
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

				click(test.instance.control, function() {
					// Here, the 'S' in St will also match the 's' in Isabel (a duplicate match)
					syn.type('Isabel St', test.instance.control_input, function() {
						expect($(test.instance.dropdown_content).find('.option[data-value=b]').text()).to.be.equal('Isabel Street');
						done();
					});
				});
			});

			it_n('should search user defined field', function(done) {
				var test = setup_test(`<select>
					<option value="aa" data-fieldx="a" data-fieldy="a">a</option>
					<option value="ab" data-fieldx="a" data-fieldy="b">b</option>
				</select>`, {
					searchField:['value','fieldx','fieldy'],
				});

				click(test.instance.control, function() {

					syn.type('fieldx:', test.instance.control_input, function() {
						assert.equal( test.instance.dropdown_content.querySelectorAll('.option').length, 2 );
						test.instance.setTextboxValue();

						syn.type('fieldx:a', test.instance.control_input, function() {
							assert.equal( test.instance.dropdown_content.querySelectorAll('.option').length, 2 );
							test.instance.setTextboxValue();

							syn.type('fieldy:a', test.instance.control_input, function() {
								assert.equal( test.instance.dropdown_content.querySelectorAll('.option').length, 1 );
								done();
							});
						});
					});

				});
			});


		});

		describe('selecting items',function(){

			it_n('should select previous item when ['+shortcut_key+'][left] pressed', function(done) {
				var test = setup_test('AB_Multi');

				test.instance.addItem('a');
				test.instance.addItem('b');

				click(test.instance.control, function() {

					test.instance.setActiveItem(test.instance.getItem('b'));

					syn.type('['+shortcut_key+'][left]['+shortcut_key+'-up]', test.instance.control_input, function() {
						expect( test.instance.activeItems.length ).to.be.equal(2);
						done();
					});
				});

			});

			it_n('should select next item when ['+shortcut_key+'][right] pressed, then unselect when ['+shortcut_key+'][left] pressed', function(done) {
				var test = setup_test('AB_Multi');

				test.instance.addItem('a');
				test.instance.addItem('b');

				click(test.instance.control, function() {

					test.instance.setActiveItem(test.instance.getItem('a'));

					syn.type('['+shortcut_key+'][right]['+shortcut_key+'-up]', test.instance.control_input, function() {
						expect( test.instance.activeItems.length ).to.be.equal(2);

						syn.type('['+shortcut_key+'][left]['+shortcut_key+'-up]', test.instance.control_input, function() {
							expect( test.instance.activeItems.length ).to.be.equal(1);
							done();
						});

					});
				});

			});

			it_n('should select item before control when ['+shortcut_key+'][left] pressed', function(done) {
				var test = setup_test('AB_Multi');

				test.instance.addItem('a');
				test.instance.addItem('b');
				var itemb = test.instance.getItem('b');

				click(test.instance.control, function() {

					syn.type('['+shortcut_key+'][left]['+shortcut_key+'-up]', test.instance.control_input, function() {
						assert.equal( test.instance.activeItems.length , 1);
						assert.equal( test.instance.activeItems[0] , itemb);

						done();
					});
				});

			});

			it_n('should move caret left when [left] pressed, then should select item after control when ['+shortcut_key+'][right] pressed', function(done) {
				var test = setup_test('AB_Multi');

				test.instance.addItem('a');
				test.instance.addItem('b');
				var itemb = test.instance.getItem('b');
				var itema = test.instance.getItem('a');

				click(test.instance.control, function() {

					syn.type('[left]['+shortcut_key+'][right]['+shortcut_key+'-up]', test.instance.control_input, function() {

						assert.equal( test.instance.activeItems.length , 1);
						assert.equal( test.instance.activeItems[0] , itemb);
						assert.equal( itemb.previousElementSibling, test.instance.control_input );

						done();
					});
				});

			});


			it_n('should not select next item when ['+shortcut_key+'][right] pressed at the end of item list', function(done) {
				var test = setup_test('AB_Multi');

				test.instance.addItem('a');
				test.instance.addItem('b');

				click(test.instance.control, function() {

					test.instance.setActiveItem(test.instance.getItem('b'));

					syn.type('['+shortcut_key+'][right]['+shortcut_key+'-up]', test.instance.control_input,function() {
						expect( test.instance.activeItems.length ).to.be.equal(1);
						done();
					});
				});

			});

			it_n('should move caret before selected item when [left] pressed', function(done) {
				var test = setup_test('AB_Multi');

				test.instance.addItem('a');
				test.instance.addItem('b');

				click(test.instance.control, function() {

					test.instance.setActiveItem(test.instance.getItem('b'));

					let last_active			= test.instance.getLastActive();
					expect( last_active.nextElementSibling ).to.be.equal( test.instance.control_input );

					syn.type('[left]', test.instance.control_input, function() {
						let last_active			= test.instance.getLastActive();
						expect( last_active.previousElementSibling ).to.be.equal( test.instance.control_input );
						done();
					});
				});

			});


			it_n('clicking item should activate it', async () => {
				var test = setup_test('AB_Multi');

				test.instance.addItem('a');
				var item = test.instance.getItem('a');
				expect(item.classList.contains('active')).to.be.equal(false);

				await asyncClick(item);
				expect(item.classList.contains('active')).to.be.equal(true);
			});


			it_n('should select option with [enter] keypress (single)', function(done) {

				var test = setup_test('AB_Single');

				click(test.instance.control, function() {
					expect(test.instance.activeOption.dataset.value).to.be.equal('a');

					syn.type('a', test.instance.control_input, function() {
						syn.type('[enter]', test.instance.control_input, function() {
							assert.equal( test.instance.items.length, 1);
							assert.equal( test.instance.items[0], 'a');
							assert.equal( test.instance.control_input.value, '', 'control_input.value != ""' );
							done();
						});
					});
				});
			});


			// differs from above "single" test with the value of the control_input after selection
			it_n('should select option with [enter] keypress (multiple)', function(done) {

				var test = setup_test('AB_Multi');

				click(test.instance.control, function() {
					expect(test.instance.activeOption.dataset.value).to.be.equal('a');

					syn.type('a', test.instance.control_input, function() {
						syn.type('[enter]', test.instance.control_input, function() {
							assert.equal( test.instance.items.length, 1);
							assert.equal( test.instance.items[0], 'a');
							assert.equal( test.instance.control_input.value, 'a', 'control_input.value != "a"' );
							done();
						});
					});
				});
			});

			it_n('should select option with [tab] keypress when selectOnTab = true', function(done) {

				var test = setup_test('AB_Single',{selectOnTab:true});

				click(test.instance.control, function() {
					expect(test.instance.activeOption.dataset.value).to.be.equal('a');

					syn.type('[tab]', test.instance.control_input, function() {
						assert.equal( test.instance.items.length, 1, 'item.length != 1' );
						assert.equal( test.instance.items[0], 'a', 'item[0] != a' );
						assert.equal( test.instance.isFocused, true, 'isFocused != true' );
						done();

					});

				});
			});

			it_n('should not select option with [tab] keypress when selectOnTab = false (default)', function(done) {
				var test = setup_test(`<div>
					<select multiple class="setup-here">
						<option value="a">a</option>
						<option value="b">b</option>
						<option value="c">c</option>
					</select>
					<input id="next-input"/>
					</div>`
				);

				click(test.instance.control, function() {
					expect(test.instance.activeOption.dataset.value).to.be.equal('a');

					syn.type('[tab]', test.instance.control_input, function() {
						assert.equal(test.instance.items.length,0);
						assert.isFalse(test.instance.isFocused);
						assert.equal(document.activeElement,document.getElementById('next-input'));
						done();

					});

				});
			});


			it_n('should select all items when ['+shortcut_key+'-a] pressed', function(done) {

				var test = setup_test('AB_Multi');

				test.instance.addItem('a');
				test.instance.addItem('b');

				click(test.instance.control, function() {
					assert.equal( test.instance.activeItems.length, 0 );

					syn.type('['+shortcut_key+']a['+shortcut_key+'-up]', test.instance.control_input, function() {
						assert.equal( test.instance.activeItems.length, 2 );
						done();

					});

				});
			});


			it_n('should not close dropdown when ['+shortcut_key+'-a] pressed no items', function(done) {

				var test = setup_test('AB_Multi');

				click(test.instance.control, function() {
					assert.equal( test.instance.items.length, 0 );
					assert.equal( test.instance.isOpen, true );

					syn.type('['+shortcut_key+']a['+shortcut_key+'-up]', test.instance.control_input, function() {
						assert.equal( test.instance.items.length, 0 );
						assert.equal( test.instance.isOpen, true );
						done();

					});

				});
			});



			var ShiftMousedown = function(first_item,last_item){

				it_n('should select multiple items with [shift] + mousedown', function(done) {

					var test = setup_test('AB_Multi');

					test.instance.addItem('a');
					test.instance.addItem('b');
					test.instance.addItem('c');
					var itema = test.instance.getItem(first_item);
					var itemc = test.instance.getItem(last_item);

					assert.equal( test.instance.activeItems.length, 0 );

					// 1) hold shift down
					syn.type('[shift]', test.instance.control_input, function(){

						// 2) click first item
						click(itema,function(){
							assert.equal( test.instance.activeItems.length, 1 );

							// 3) click last item
							click(itemc,function(){
								assert.equal( test.instance.activeItems.length, 3 );

								// 4) release shift key
								syn.type('[shift-up]', test.instance.control_input, function(){});
								done();
							});
						});

					});

				});
			};

			ShiftMousedown('a','c');
			ShiftMousedown('c','a');


			it_n('should toggle active item when ['+shortcut_key+'] + mousedown', function(done) {

				var test = setup_test('AB_Multi');

				test.instance.addItem('a');
				var itema = test.instance.getItem('a');

				assert.equal( test.instance.activeItems.length, 0 );

				// 1) hold ctrl down
				syn.type('['+shortcut_key+']', test.instance.control_input, function() {

					// 2) activate itema
					click(itema,function(){
						assert.equal( test.instance.activeItems.length, 1 );

						// 3) de-activate itema with a click
						click(itema,function(){
							assert.equal( test.instance.activeItems.length, 0 );

							// 4) release ctrl key
							syn.type('['+shortcut_key+'-up]', test.instance.control_input, function() {});
							done();

						});
					});

				});

			});

			var DeleteActiveItem = function(keypress){

				it_n('should remove active item when delete pressed', function(done) {

					var test = setup_test('AB_Multi');

					test.instance.addItem('a');
					test.instance.addItem('b');
					test.instance.setActiveItem(test.instance.getItem('b'));
					assert.equal( test.instance.items.length, 2 );
					assert.equal( test.instance.activeItems.length, 1 );

					syn.type(keypress, test.instance.control_input, function() {

						assert.equal( test.instance.items.length, 1 );
						assert.equal( test.instance.items[0], 'a' );
						done();

					});

				});
			};
			DeleteActiveItem('\b');
			DeleteActiveItem('[delete]');


			it_n('should remove item when backspace pressed', function(done) {

				var select				= document.createElement('select');
				select.multiple			= true;
				select.innerHTML		= '<option selected value="a">a</option>';

				var option_b			= document.createElement('option');
				option_b.value			= "b";
				option_b.textContent	= "b";
				option_b.selected		= true;

				select.append(option_b);


				var test = setup_test(select);

				//test.instance.addItem('a');
				//test.instance.addItem('b');
				assert.equal( test.instance.items.length, 2 ,'items.length should = 2' );
				assert.equal( Array.from(test.instance.input.options).filter(option => option.getAttribute('selected')).length, 2,'getAttribute(selected).length should = 2' );
				assert.equal( Array.from(test.instance.input.options).filter(option => option.selected).length, 2,'option.selected.length should = 2' );


				click(test.instance.control, function() {
					syn.type('\b', test.instance.control_input, function() {

						var option_after = test.instance.input.querySelector('option[value="b"]');
						assert.equal( test.instance.items.length, 1 );
						assert.equal( test.instance.items[0], 'a' );
						assert.equal( option_b, option_after, 'should not remove original <option>' );
						assert.equal( Array.from(test.instance.input.options).filter(option => option.getAttribute('selected') ).length, 1, 'getAttribute(selected).length should = 1' );
						assert.equal( Array.from(test.instance.input.options).filter(option => option.selected).length, 1, 'option.selected.length should = 1' );

						syn.type('\b', test.instance.control_input, function() {

							var option_after = test.instance.input.querySelector('option[value="b"]');
							assert.equal( test.instance.items.length, 0 );
							assert.equal( option_b, option_after, 'should not remove original <option>' );
							assert.equal( Array.from(test.instance.input.options).filter(option => option.getAttribute('selected') ).length, 0, 'getAttribute(selected).length should = 0' );
							assert.equal( Array.from(test.instance.input.options).filter(option => option.selected).length, 0, 'option.selected.length should = 0' );

							done();
						});


					});
				});

			});

			it_n('should remove first item when left then backspace pressed', function(done) {

				var test = setup_test('AB_Multi');

				test.instance.addItem('a');
				test.instance.addItem('b');
				assert.equal( test.instance.items.length, 2 );

				click(test.instance.control, function() {
					syn.type('[left]\b', test.instance.control_input, function() {

						assert.equal( test.instance.items.length, 1 );
						assert.equal( test.instance.items[0], 'b' );
						done();
					});
				});

			});


			it_n('should prevent typing when there are active items', function(done) {

				var test = setup_test('AB_Multi');
				test.instance.addItem('a');

				click(test.instance.control, function() {

					test.instance.setActiveItem(test.instance.getItem('a'));

					syn.type('a', test.instance.control_input, function() {
						assert.equal( test.instance.control_input.value, '' );
						done();
					});
				});

			});


			it_n('should create item on [enter] when option_create template is null', function(done) {

				var test = setup_test('AB_Single',{
					create:true,
					render:{
						no_results: null,
						option_create: null,
					}
				});

				click(test.instance.control, function() {
					syn.type('abcd[enter]',test.instance.control_input,function(){
						assert.equal( test.instance.items.length, 1);
						assert.equal( test.instance.items[0], 'abcd');
						done();
					});
				});
			});

			it_n('should not create item on [tab] when option_create template is null', function(done) {

				var test = setup_test('AB_Multi',{
					create:true,
					render:{
						no_results: null,
						option_create: null,
					}
				});

				click(test.instance.control, function() {
					syn.type('abcd[tab]',test.instance.control_input,function(){
						assert.equal( test.instance.items.length, 0);
						done();
					});
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

				click(test.instance.control, function() {
					syn
						.type('fooo', test.instance.control_input)
						.delay(0, function() {
							expect(test.instance.isOpen).to.be.equal(true);
							expect( isVisible(test.instance.dropdown) ).to.be.equal(true);

							syn
								.click(document.body)
								.delay(5, function() {
									expect(test.instance.isOpen).to.be.equal(false);
									expect( isVisible(test.instance.dropdown) ).to.be.equal(false);
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
				click(test.instance.control, function() {

					// 2) type "d"
					syn.type('d', test.instance.control_input, function() {

						// 3) click on create option to create
						var create_option = test.instance.dropdown.querySelector('.create');
						click(create_option,function(){
							expect(test.instance.items[0]).to.be.equal('d');
							done();
						});

					});

				});
			});

			it_n('create item should be focused when addPrecedence=true', function(done) {

				var test = setup_test('AB_Multi', {create: true,addPrecedence: true});

				click(test.instance.control, function() {
					syn.type('b', test.instance.control_input, function() {
						assert.equal( test.instance.activeOption.classList.contains('create'), true);
						done();
					});

				});
			});

			it_n('create item should be focused when addPrecedence=false (default)', function(done) {

				var test = setup_test('AB_Multi', {create: true});

				click(test.instance.control, function() {
					syn.type('b', test.instance.control_input, function() {
						assert.equal( test.instance.activeOption.classList.contains('create'), false);
						done();
					});

				});
			});


			it_n('should focus create option with [up] keypress', function(done) {

				var test = setup_test('<select><option>aa</option><option>bb</option></select>',{create:true});

				click(test.instance.control, function() {
					assert.equal( test.instance.activeOption.dataset.value, 'aa', 'activeOption should be "aa" to start');

					syn.type('a', test.instance.control_input, function() {

						assert.equal( test.instance.activeOption.dataset.value, 'aa', 'activeOption should still be "aa"');

						syn.type('[up]', test.instance.control_input, function() {
							assert.equal( test.instance.activeOption.classList.contains('create'), true, 'activeOption should be create option');

							syn.type('[enter]', test.instance.control_input, function() {
								assert.equal(test.instance.items[0],'a','should create "a"');
								done();
							});

						});
					});
				});
			});



			describe('filtering created items', function() {

				var text = 'abc';

				function execFilterTest(filter, done, expectation) {

					var test		= setup_test('<select multiple="multiple"></select>', {create: true, createFilter: filter});
					var instance	= test.instance;

					click(instance.control, function() {
						syn
							.type(text, instance.control_input)
							.type(instance.settings.delimiter, instance.control_input )
							.delay(0, function() {
								expectation(instance);
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

				execFilterTests('should add an item  normally if there is no createFilter', [undefined, null, ''], function(instance) {
					expect(instance.getItem(text)).to.be.ok;
				});

				execFilterTests('should add an item if the input matches the createFilter', ['a', /a/, function() { return true; }], function(instance) {
					expect(instance.getItem(text)).to.be.ok;
				});

				execFilterTests(
					'should not add an item or display the create label if the input does not match the createFilter (A)',
					['foo', /foo/, function() { return false; }],
					function(instance) {
						expect(instance.getItem(text)).to.be.equal(null);
					}
				);

				execFilterTests('should not add an item or display the create label if the input does not match the createFilter (B)', ['foo', /foo/, function() { return false; }], function(instance) {
					expect($(instance.dropdown_content).filter('.create').length).to.be.equal(0);
				});

			});


		});


		describe('locking', function() {

			it_n('typing should not show dropdown when locked', function(done) {

				var test = setup_test('AB_Multi',{});
				test.instance.lock();

				syn.type('a', test.instance.control_input, function() {
					expect(test.instance.isOpen).to.be.equal(false);
					done();
				});

			});
		});


		describe('openOnFocus', function() {

			it_n('only open after arrow down when openOnFocus=false', function(done) {

				var test = setup_test('AB_Single',{
					openOnFocus: false,
				});

				click(test.instance.control, function(){
					expect(test.instance.isOpen).to.be.equal(false);
					syn.type('[down]', test.instance.control_input, function() {
						expect(test.instance.isOpen).to.be.equal(true);
						done();
					});
				});
			});

			it_n('[enter] should not add item when dropdown isn\'t open', function(done) {

				var test = setup_test('AB_Multi',{
					openOnFocus: false,
				});

				click(test.instance.control, function(){
					expect(test.instance.isOpen).to.be.equal(false);
					syn.type('[enter]', test.instance.control_input, function() {
						expect(test.instance.items.length).to.be.equal(0);
						done();
					});
				});
			});

		});

		describe('paste', function() {

			it_n('create new items on paste', function(done) {
				var test = setup_test('AB_Multi',{
					create:true,
					maxItems: 2,
				});

				const ev = new Event('input');


				click(test.instance.control, function(){

					assert.equal( test.instance.items.length, 0);

					test.instance.control_input.value = 'a-new,b-new';
					test.instance.onPaste(ev);

					setTimeout(()=>{
						assert.equal( test.instance.items.length, 2);

						test.instance.control_input.value = 'c-new,d-new';
						test.instance.onPaste(ev);

						setTimeout(()=>{
							assert.equal( test.instance.items.length, 2,'should not paste when full');
							done();
						},10);

					},10);
				});

			});
		});



		it_n('shadow root',async ()=>{
			setup_test('<div><div id="shadow-wrapper"><select id="select-tags" multiple><option value="a">a</option><option value="b">b</option></div>');

			function styleText(href){
				var sheet = document.querySelector(`link[href*="${href}"]`).sheet;
				return Array.from(sheet.cssRules).map(rule => rule.cssText).join(' ');
			}

			var wrapper			= document.getElementById('shadow-wrapper');
			var select			= document.getElementById('select-tags');
			var shadowRoot		= wrapper.attachShadow({mode: 'open'});
			var style			= document.createElement('style');
			style.textContent	= styleText('tom-select.default.css');

			shadowRoot.appendChild(style);
			shadowRoot.appendChild(select.parentNode.removeChild(select));
			var instance = new TomSelect(select);

			await asyncClick(instance.control_input);
			assert.isTrue(instance.isOpen,'should be open');
		});

	});
