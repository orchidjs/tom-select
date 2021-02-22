
describe('plugin: input_autogrow', function() {

	it_n('width of control should change as text changes', function(done) {

		let test = setup_test('<input value="test">', {plugins: ['input_autogrow']});

		syn.type('a', test.instance.control_input, function() {
			let width_orig	= test.instance.control_input.clientWidth;

			syn.type('a', test.instance.control_input, function() {
				let width_now	= test.instance.control_input.clientWidth;

				expect(width_now).to.be.above(width_orig);
				done();
			});
		});

	});

	it_n('width of control should not change without selected items', function(done) {

		let test = setup_test('<input>', {plugins: ['input_autogrow']});

		syn.type('a', test.instance.control_input, function() {
			let width_orig	= test.instance.control_input.clientWidth;

			syn.type('a', test.instance.control_input, function() {
				let width_now	= test.instance.control_input.clientWidth;

				assert.equal(width_now,width_orig);
				done();
			});
		});

	});

});
