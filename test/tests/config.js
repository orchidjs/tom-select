

describe('Configuration settings', function() {

	describe('hideSelected', function() {

		it_n('option should still be shown when selected', function(done) {

			var test		= setup_test('AB_Multi',{hideSelected:false,closeAfterSelect:true});

			click(test.instance.control, function() {

				var options		= test.instance.dropdown.querySelectorAll('.option');
				expect(options.length).to.be.equal(3);
				expect(test.instance.items.length).to.be.equal(0);

				var option_a = test.instance.dropdown_content.querySelector('[data-value="a"]');

				click( option_a, function() {
					options		= test.instance.dropdown.querySelectorAll('.option');
					expect(options.length).to.be.equal(3);
					expect(test.instance.items.length).to.be.equal(1);

					assert.isFalse( test.instance.isOpen, 'should be closed after selected');
					assert.equal(option_a, test.instance.activeOption, 'active option should be set after closing');

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

				click( test.instance.dropdown_content.querySelector('[data-value="a"]'), function() {
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

				click( test.instance.dropdown_content.querySelector('[data-value="a"]'), function() {

					click( test.instance.dropdown_content.querySelector('[data-value="a"]'), function() {
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
