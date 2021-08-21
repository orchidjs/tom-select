describe('Validation', function(){

	describe('<select required>', function(){
		var form, button, test;

		function test_required(){
			test = setup_test(`<form><select class="setup-here" required>
				<option value="">Select an option...</option>
				<option value="a">A</option>
			</select>
			<button type="submit">button</button>
			</form>`,
			{
				allowEmptyOption: true,
			});

			form = test.html;
			button = document.getElementsByTagName('button')[0];

			form.addEventListener('submit', function(e) { e.preventDefault(); });
		};

		it_n('should have isRequired property set to true', function() {
			test_required();
			expect(test.instance.isRequired).to.be.equal(true);
		});

		it_n('should have the required class', function() {
			test_required();
			expect(test.instance.wrapper.classList.contains('required')).to.be.equal(true);
		});


		it_n('validity should update when changing values',async () => {
			test_required();

			assert.isFalse(test.select.checkValidity(),'select should be invalid');
			assert.isFalse(form.checkValidity(),'form should be invalid');

			
			test.instance.addItem('a');
			await waitFor(10);
			assert.isTrue(test.select.checkValidity(),'select should be valid');
			assert.isTrue(form.checkValidity(),'form should be valid');
			
			test.instance.removeItem('a');
			await waitFor(10);
			assert.isFalse(test.select.checkValidity(),'select should be invalid');
			assert.isFalse(form.checkValidity(),'form should be invalid');
		});

		it_n('should have "invalid" class when validation fails', function(done) {
			test_required();
			test.select.checkValidity();

			var classList = test.instance.wrapper.classList;

			assert.equal(classList.contains('invalid'),true,'invalid class missing');

			// maintain "invalid" class
			syn.click(button,function(){
				syn.click(test.instance.control,function(){
					assert.equal(classList.contains('invalid'),true,'invalid class missing after clicking control');
					syn.click(document.body,function(){
						assert.equal(classList.contains('invalid'),true,'invalid class missing after clicking body');
						done();
					});
				});
			});


		});

		it_n('should clear the invalid class after an item is selected',function(done) {
			test_required();
			syn.click(button, function() {
				assert.equal(test.instance.wrapper.classList.contains('invalid'),true);
				test.instance.addItem('a');
				assert.equal(test.instance.wrapper.classList.contains('invalid'),false);

				done();
			});
		});


		it_n('should not submit form (<select required> w/ hidden controlInput)', function() {
			
			var test_required = `<form>
					<select class="setup-here" name="n" required />
						<option value="">select..</option>
						<option value="a">A</option>
					</select>
					<button type="submit" id="submit"></button>
				</form>`;
				
			var test = setup_test(test_required,{
				controlInput: '<input />',
				create:true
			});
			
			test.html.addEventListener('submit',(evt)=>{
				throw 'form should not be submitted';
			});

			assert.isFalse(test.instance.isValid,'should start out as invalid');
			document.getElementById('submit').click(); // should not refresh page (which would error the test)			
			assert.isFalse(test.instance.isValid,'should be invalid');
		});

	});

	describe('<select> (not required)', function(){
		var form, button, test;

		beforeEach(function() {
			test = setup_test(`<form><select class="setup-here">
				<option value="">Select an option...</option>
				<option value="a">A</option>
				</select>
				<button type="submit">
				</form>`);
			form = test.html;
			button = document.getElementsByTagName('button')[0];
		});

		it_n('should have isRequired property set to false', function() {
			expect(test.instance.isRequired).to.be.equal(false);
		});
		
		it_n('should not have the required class', function() {
			expect(test.instance.control.classList.contains('required')).to.be.equal(false);
		});

		it_n('should pass validation if no element is selected',function(done) {

			button.addEventListener('click',function(evt){
				expect(form.checkValidity()).to.be.true;
				evt.preventDefault();
				done();
			});

			syn.click(button);
		});

	});
	
	describe('<input pattern>',function(){
		
		it_n('should be invalid if pattern does not match', function() {

			var test_required = `<form>
				<input class="setup-here" pattern="[a-z]+" name="n" value="a" required />
				<button type="submit" id="submit"></button>
				</form>`;

			var test = setup_test(test_required,{create:true});

			test.html.addEventListener('submit',(evt)=>{
				throw 'form should not be submitted';
			});

			assert.isTrue(test.instance.isValid,'should start out as valid');
			test.instance.createItem('BB');
			assert.isFalse(test.instance.isValid,'should be invalid');
			document.getElementById('submit').click(); // should not refresh page (which would error the test)
		});
		

		it_n('should be valid if pattern matches', function() {

			var test = setup_test('<input pattern="[a-z]+" value="AA" required />',{create:true});

			assert.isFalse(test.instance.isValid,'should start out as invalid');
			test.instance.clear();
			test.instance.createItem('bb');
			test.instance.refreshState();
			assert.isTrue(test.instance.isValid,'should finish as valid');
		});		
		
	});
});
