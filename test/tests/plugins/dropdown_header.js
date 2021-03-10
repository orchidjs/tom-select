

describe('plugin: dropdown_header', function() {

	it_n('header should be added to dropdown menu', function() {

		var test	= setup_test('AB_Multi',{plugins:['dropdown_header']});
		var header	= test.instance.dropdown.querySelectorAll('.dropdown-header');

		expect(header.length).to.be.equal(1);
	});

	it_n('dropdown should close when clicking on close button', function(done) {

		var test	= setup_test('AB_Multi',{plugins:['dropdown_header']});
		var header	= test.instance.dropdown.querySelector('.dropdown-header');
		var button	= header.querySelector('.dropdown-header-close');

		click(test.instance.control, function(){
			assert.equal(test.instance.isOpen,true);
			click(button,function(){
				assert.equal(test.instance.isOpen,false);
				done();
			});

		});

	});

});
