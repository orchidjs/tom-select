


describe('plugin: dropdown_input', function() {

	it_n('dropdown should open onclick', async () => {
		let test = setup_test('<input value="a,b" tabindex="1" placeholder="test placeholder" />', {plugins: ['dropdown_input']});
		let placeholder = test.instance.control.querySelector('.items-placeholder');

		assert.isFalse( isVisible(placeholder),'items-placeholder should not be visible');
		assert.isTrue( test.instance.dropdown.contains(test.instance.control_input), 'control_input should be in dropdown');

		await asyncClick(test.instance.control);
		assert.equal(test.instance.isOpen, true);
		assert.equal(document.activeElement, test.instance.control_input);

	});

	it_n('dropdown should open onclick without available options', async () => {
		let test = setup_test('<select multiple><option selected>A</option></select>', {plugins: ['dropdown_input']});
		await asyncClick(test.instance.control);
		assert.equal(test.instance.isOpen, true);

	});

	it_n('should select option with [enter] keypress (single)', async () => {

		var test = setup_test('AB_Single', {plugins: ['dropdown_input']});

		await asyncClick(test.instance.control);

		assert.equal(test.instance.activeOption.dataset.value,'a');

		await asyncType('a');
		await asyncType('[enter]');

		assert.equal( test.instance.items.length, 1);
		assert.equal( test.instance.items[0], 'a');
		assert.equal( test.instance.control_input.value, '', 'control_input.value != ""' );
		assert.equal(test.instance.isOpen, false);

		await asyncType('[down]');
		assert.equal(test.instance.isOpen, true);

		await asyncType('[b]');
		await asyncType('[enter]');

		assert.equal( test.instance.items.length, 1);
		assert.equal( test.instance.items[0], 'b');
		assert.equal( test.instance.control_input.value, '', 'control_input.value != ""' );

	});


	it_n('only open after arrow down when openOnFocus=false', async () => {

		var test = setup_test('AB_Single',{
			plugins: ['dropdown_input'],
			openOnFocus: false,
		});

		await asyncClick(test.instance.control);
		assert.isFalse(test.instance.isOpen);

		await asyncType('[down]');
		assert.isTrue(test.instance.isOpen);
	});


	it_n('should load results for "a" after loading results for "ab"', function(done) {

		var expected_load_queries = ['ab','a'];

		var test = setup_test('AB_Single',{
			plugins: ['dropdown_input'],
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

	it_n('[esc] to close & [down] to open',async () =>{

		var test = setup_test('AB_Multi',{
			plugins: ['dropdown_input'],
		});

		let placeholder = test.instance.control.querySelector('.items-placeholder');
		assert.isTrue( isVisible(placeholder),'items-placeholder should be visible');

		await asyncClick( test.instance.control );
		assert.isTrue( test.instance.isOpen );
		assert.isFalse( isVisible(placeholder),'items-placeholder should not be visible');

		await asyncType('[escape]');
		assert.isFalse( test.instance.isOpen, 'not closed' );

		await asyncType('[down]');
		assert.isTrue( test.instance.isOpen, 'not re-opened' );

	});

	it_n('clicking outside should close', async () => {

		var test = setup_test('AB_Multi',{
			plugins: ['dropdown_input'],
		});

		await asyncClick( test.instance.control );
		assert.isTrue( test.instance.isOpen );

		await asyncClick( document.body );
		assert.isFalse( test.instance.isOpen );

	});

	it_n('should select all items when ['+shortcut_key+'-a] pressed', async () => {

		var test = setup_test('AB_Multi',{
			plugins: ['dropdown_input'],
		});

		test.instance.addItem('a');
		test.instance.addItem('b');

		await asyncClick(test.instance.control);
		assert.equal( test.instance.activeItems.length, 0 );

		await asyncType('['+shortcut_key+']a['+shortcut_key+'-up]');
		assert.equal( test.instance.activeItems.length, 2 );

	});

	it_n('create new items on paste', async () => {

		var test = setup_test('AB_Multi',{
			plugins: ['dropdown_input'],
			create:true,
			maxItems: 3,
		});

		const ev = new Event('input');

		await asyncClick(test.instance.control);
		assert.equal( test.instance.items.length, 0);

		test.instance.control_input.value = 'a-new,b-new,a';
		test.instance.onPaste(ev);

		await waitFor(10);

		assert.equal( test.instance.items.length, 3);
	});
});
