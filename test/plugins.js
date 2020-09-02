(function() {

	describe('plugins', function() {

		describe('remove_button', function() {

			it_n('should remove item when remove button is clicked', function(done) {

				let test = setup_test('AB_Multi', {plugins: ['remove_button']});

				test.selectize.addItem('a');
				test.selectize.addItem('b');
				assert.equal( test.selectize.items.length, 2 );

				var itema			= test.selectize.getItem('b');
				var remove_button	= itema.querySelector('.remove');

				expect(remove_button.classList.contains('remove')).to.be.equal(true);

				syn.click( remove_button, function() {
					assert.equal( test.selectize.items.length, 1 );
					assert.equal( test.selectize.items[0], 'a' );
					done();

				});

			});


		});


		describe('restore_on_backspace', function() {

			it_n('should fill control_input.value when item deleted', function(done) {

				var test = setup_test('AB_Multi',{plugins:['restore_on_backspace']});

				test.selectize.addItem('a');
				test.selectize.addItem('b');
				assert.equal( test.selectize.items.length, 2 );

				syn.click(test.selectize.control_input,function(){
					syn.type('\b', test.selectize.control_input, function() {

						window.setTimeout(function(){
							assert.equal( test.selectize.items.length, 1 );
							assert.equal( test.selectize.items[0], 'a' );
							assert.equal( test.selectize.control_input.value, 'b' );
							done();
						},100);

					});
				});

			});

		});


		describe('dropdown_header', function() {

			it_n('header should be added to dropdown menu', function() {

				var test	= setup_test('AB_Multi',{plugins:['dropdown_header']});
				var header	= test.selectize.dropdown.querySelectorAll('.selectize-dropdown-header');

				expect(header.length).to.be.equal(1);
			});

		});

	});

})();
