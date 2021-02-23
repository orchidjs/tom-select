describe('plugin: invalid', function() {

	it_n('throw error when attempting to load invalid plugin', function() {

		let errors = 0 ;
		try {
			setup_test('<input>', {plugins: ['invalid']});
		} catch (error) {
			errors++;
		}

		assert.equal(errors,1);
	});

});
