describe('Validation', function(){

	describe('<select required>', function(){
		var form, button, test;


		beforeEach(function() {
			test = setup_test(`<form><select class="setup-here" required>
				<option value="">Select an option...</option>
				<option value="a">A</option>
			</select>
			<button type="submit">
			</form>`);

			form = test.html;
			button = document.getElementsByTagName('button')[0];

			form.addEventListener('submit', function(e) { e.preventDefault(); });
		});

		it_n('should have isRequired property set to true', function() {
			expect(test.instance.isRequired).to.be.equal(true);
		});

		it_n('should have the required class', function() {
			expect(test.instance.control.classList.contains('required')).to.be.equal(true);
		});

		it_n('should pass validation if an element is selected',function(done) {
			test.instance.addItem('a');

			syn.click(button,function(){
				assert.equal( form.checkValidity(), true);
				done();
			});
		});


		it_n('should not pass validation if no element is selected',function(done) {

			syn.click(button,function(){
				assert.equal(form.checkValidity(),false);
				done();
			});

		});

		it_n('should have "invalid" class when validation fails', function(done) {
			test.select.checkValidity();

			var classList = test.instance.control.classList;

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
			syn.click(button, function() {
				assert.equal(test.instance.control.classList.contains('invalid'),true);
				test.instance.addItem('a');
				assert.equal(test.instance.control.classList.contains('invalid'),false);

				done();
			});
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
});
