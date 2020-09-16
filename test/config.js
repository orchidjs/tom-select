(function() {

	describe('Configuration settings', function() {

		describe('hideSelected', function() {

			it_n('option should still be shown when selected', function(done) {

				var test		= setup_test('AB_Multi',{hideSelected:false});

				click(test.instance.control, function() {

					var options		= test.instance.dropdown.querySelectorAll('.option');
					expect(options.length).to.be.equal(3);
					expect(test.instance.items.length).to.be.equal(0);

					click($('[data-value=a]', test.instance.dropdown_content), function() {
						options		= test.instance.dropdown.querySelectorAll('.option');
						expect(options.length).to.be.equal(3);
						expect(test.instance.items.length).to.be.equal(1);

						done();
					});
				});
			});


			it_n('option should not be shown when selected', function(done) {

				var test		= setup_test('<input>',{hideSelected:true,options:[{value:'a'},{value:'b'},{value:'c'}]});

				click(test.instance.control, function() {

					var options		= test.instance.dropdown.querySelectorAll('.option');
					expect(options.length).to.be.equal(3);
					expect(test.instance.items.length).to.be.equal(0);

					click($('[data-value=a]', test.instance.dropdown_content), function() {
						options		= test.instance.dropdown.querySelectorAll('.option');
						expect(options.length).to.be.equal(2);
						expect(test.instance.items.length).to.be.equal(1);

						done();
					});
				});
			});


		});
	});

})();
