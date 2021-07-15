


describe('plugin: dropdown_input', function() {

	it_n('dropdown should open onclick', function(done) {
		let test = setup_test('<input value="a,b" tabindex="1" placeholder="test placeholder" />', {plugins: ['dropdown_input']});

		assert.isTrue( test.instance.dropdown.contains(test.instance.control_input), 'control_input should be in dropdown');

		syn.click(test.instance.control).delay(0,function(){
			assert.equal(test.instance.isOpen, true);
			done();
		});
	});

	it_n('dropdown should open onclick without available options', function(done) {
		let test = setup_test('<select multiple><option selected>A</option></select>', {plugins: ['dropdown_input']});
		syn.click(test.instance.control).delay(0,function(){
			assert.equal(test.instance.isOpen, true);
			done();
		});

	});

	it_n('should select option with [enter] keypress (single)', async () => {

		var test = setup_test('AB_Single');

		await asyncClick(test.instance.control);
		
		assert.equal(test.instance.activeOption.dataset.value,'a');

		await asyncType('a', test.instance.control_input);
		await asyncType('[enter]', test.instance.control_input);
		
		assert.equal( test.instance.items.length, 1);
		assert.equal( test.instance.items[0], 'a');
		assert.equal( test.instance.control_input.value, '', 'control_input.value != ""' );

		await asyncType('[b]', test.instance.control_input);
		await asyncType('[enter]', test.instance.control_input);

		assert.equal( test.instance.items.length, 1);
		assert.equal( test.instance.items[0], 'b');
		assert.equal( test.instance.control_input.value, '', 'control_input.value != ""' );
	
	});


	it_n('only open after arrow down when openOnFocus=false', async () => {

		var test = setup_test('AB_Single',{
			openOnFocus: false,
		});

		await asyncClick(test.instance.control);
		assert.isFalse(test.instance.isOpen);
		
		await asyncType('[down]', test.instance.control_input);
		assert.isTrue(test.instance.isOpen);
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
				assert.equal(test.instance.loading,1);
				syn.type('b', test.instance.control_input,function(){
					assert.equal(test.instance.loading,1);
					setTimeout(function(){
						syn.type('\b', test.instance.control_input,function(){
							assert.equal(test.instance.loading,1);
						});
					},400); // greater than load throttle
				});
			});
		});

	});	
});
