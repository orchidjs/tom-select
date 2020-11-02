describe('DOM Events', function() {
	describe('"change"', function() {
		it_n('should be triggered once by addItem()', function(done) {
			var test = setup_test('<select>', {
				valueField: 'value',
				labelField: 'value',
				options: [
					{value: 'a'},
					{value: 'b'},
				],
				items: ['a']
			});

			var counter = 0;
			test.instance.on('change', function() { counter++; });
			test.instance.addItem('b');

			window.setTimeout(function() {
				expect(counter).to.be.equal(1);
				done();
			}, 0);
		});
		it_n('should be triggered once by removeItem()', function(done) {
			var test = setup_test('<select multiple>', {
				valueField: 'value',
				labelField: 'value',
				options: [
					{value: 'a'},
					{value: 'b'},
				],
				items: ['a','b']
			});

			var counter = 0;
			test.instance.on('change', function() { counter++; });
			test.instance.removeItem('b');

			window.setTimeout(function() {
				expect(counter).to.be.equal(1);
				done();
			}, 0);
		});
		it_n('should be triggered once by clear()', function(done) {
			var test = setup_test('<select multiple>', {
				valueField: 'value',
				labelField: 'value',
				options: [
					{value: 'a'},
					{value: 'b'},
				],
				items: ['a','b']
			});

			var counter = 0;
			test.instance.on('change', function() { counter++; });
			test.instance.clear();

			window.setTimeout(function() {
				expect(counter).to.be.equal(1);
				done();
			}, 0);
		});
	});
});
