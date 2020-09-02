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


	});

})();
