

describe('plugin: dropdown_header', function() {

	it_n('header should be added to dropdown menu', function() {

		var test	= setup_test('AB_Multi',{plugins:['dropdown_header']});
		var header	= test.instance.dropdown.querySelectorAll('.dropdown-header');

		expect(header.length).to.be.equal(1);
	});

});
