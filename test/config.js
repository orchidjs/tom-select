

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

		it_n('should allow duplicate options when hideSelected=false and duplicates=true',function(done){
			var test		= setup_test('AB_Multi',{hideSelected:false,duplicates:true});

			click(test.instance.control, function() {

				var options		= test.instance.dropdown.querySelectorAll('.option');
				expect(options.length).to.be.equal(3);
				expect(test.instance.items.length).to.be.equal(0);

				click($('[data-value=a]', test.instance.dropdown_content), function() {

					click($('[data-value=a]', test.instance.dropdown_content), function() {
						options		= test.instance.dropdown.querySelectorAll('.option');
						expect(options.length).to.be.equal(3);
						expect(test.instance.items.length).to.be.equal(2);

						done();
					});
				});
			});
		});

	});

	describe('copyClassesToDropdown',function(){

		it_n('class should be copied', function() {
			var test		= setup_test('<input class="classA classB">',{copyClassesToDropdown:true});
			expect(test.instance.dropdown.classList.contains('classA')).to.be.true
		});

		it_n('class should not be copied', function() {
			var test		= setup_test('<input class="classA classB">',{copyClassesToDropdown:false});
			expect(test.instance.dropdown.classList.contains('classA')).to.be.false

		});

	});

	describe('onInitialize',function(){

		it_n('onInitialize should be called', function(done) {
			setup_test('<input>',{
				onInitialize:function(){
					expect(true).to.be.true
					done();
				}
			});
		});

	});

});
