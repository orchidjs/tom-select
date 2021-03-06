
describe('load', function() {

	it_n('should start loading results if preload:"focus"', function(done) {
		var calls_focus = 0;
		var calls_load = 0;

		var test = setup_test('AB_Single',{
			preload: 'focus',
			load: function(query, load_cb) {
				calls_load++;
				assert.equal(query, '');
				setTimeout(function() {
					load_cb([{value: 'c', text: 'C'}]);
				});
			}
		});

		test.instance.on('focus', function() {
			calls_focus++;
		});

		click(test.instance.control, function() {
			setTimeout(function() {
				assert.equal(calls_focus, 1);
				assert.equal(calls_load, 1);
				done();
			}, 300);
		});
	});


	it_n('should start loading if preload:true', function(done) {

		setup_test('AB_Single',{
			preload: true,
			load: function(query, load_cb) {
				assert.equal(query, '');
				load_cb([{value: 'c', text: 'C'}]);
				done();
			}
		});
	});

	it_n('should not show no_results message while/after loading', function(done) {

		var test = setup_test('<select>',{
			load: function(query, load_cb){

				assert.equal(query, 'c');
				setTimeout(function(){

					load_cb([{value: 'c', text: 'C'}]);

					setTimeout(function(){
						expect(test.instance.isOpen).to.be.equal(true);
						expect(test.instance.dropdown.querySelectorAll('.no-results').length).to.be.equal(0);
						done();
					},200);

				},200);
			}
		});

		click(test.instance.control, function(){
			syn.type('c', test.instance.control_input,function(){

				setTimeout(function(){
					expect(test.instance.dropdown.querySelectorAll('.no-results').length).to.be.equal(0);
				},100);

			});
		});

	});

	it_n('load optgroups', function(done) {

		var test = setup_test('<input>',{
			labelField: 'value',
			searchField: ['value'],
			preload: true,
			load: function(query, loadcb) {

				var options = [
								{optgroup: 'mammal', value: "dog" },
								{optgroup: 'mammal', value: "cat" },
								{optgroup: 'bird', value: 'duck'},
								{optgroup: 'bird', value: 'chicken'},
								{optgroup: 'reptile', value: 'snake'},
								{optgroup: 'reptile', value: 'lizard'},
							];

				var groups = [{value: 'mammal', label: 'Mammal'},
								{value: 'bird', label: 'Bird'},
								{value: 'reptile', label: 'Reptile'}];

				loadcb(options,groups);

				assert.equal(Object.keys(test.instance.options).length, 6);
				assert.equal(Object.keys(test.instance.optgroups).length, 3);
				done();
			}
		});
	});



	it_n('should load results for "a" after loading results for "ab"', function(done) {

		var expected_load_queries = ['ab','a'];

		var test = setup_test('AB_Single',{
			load: function(query, load_cb) {

				var expected_load_query = expected_load_queries.shift();

				assert.equal(query, expected_load_query);

				if( expected_load_queries.length == 0 ){
					done();
				}

				return load_cb();
			}
		});

		click(test.instance.control, function(){
			syn.type('a', test.instance.control_input,function(){
				syn.type('b', test.instance.control_input,function(){
					setTimeout(function(){
						syn.type('\b', test.instance.control_input);
					},400); // greater than load throttle
				});
			});
		});

	});


	it_n('dropdown should not open if query length is less', function(done) {

		var test = setup_test('<select>',{
			load: function(query, load_cb) {
				if ( query.length < 3 ) return load_cb();
			},
			render: {
	 			no_results: (data,escape) => {
	        		if( data.input.length < 3) return;
					return '<div class="no-results">No results found</div>';
				},
				loading: (data,escape) => {
					if( data.input.length < 3 ) return;
					return '<div class="spinner"></div>';
				},
			}
		});

		syn.type('a', test.instance.control_input,function(){
			setTimeout(function(){
				assert.equal(test.instance.isOpen, false);
				done();
			},100);
		});

	});


});
