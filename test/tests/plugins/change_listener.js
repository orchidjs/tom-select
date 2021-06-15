


describe('plugin: change_listener', function() {

	function changeInput(input,value){
		input.value = value;
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent('change', false, true);
		input.dispatchEvent(evt);
	}

	it_n('should update when original input is changed', async ()=> {

		let test = setup_test('<input value="original">', {plugins: ['change_listener']});

		assert.equal( Object.keys(test.instance.options).length, 1);

		var input = test.select;

		changeInput(input,'new value');
		await waitFor(10);
		assert.equal( Object.keys(test.instance.options).length, 2);
		assert.equal( test.instance.items.length, 1,'should have one value = "new value"');
		assert.equal( test.instance.items[0], 'new value');
		assert.isFalse( test.instance.isFocused, 'should not focus');

		test.instance.removeItem('new value');
		await waitFor(10);
		assert.equal( test.instance.items.length, 0);

		changeInput(input,'another value');
		await waitFor(10);
		assert.equal( test.instance.items[0], 'another value');
		assert.equal( test.instance.items.length, 1,'should have one value = "another value"');
	});

	it_n('typing in input with delimiter = " "', async ()=>{

		let test = setup_test('<input value="original">', {plugins: ['change_listener'],delimiter:' ',create:true});

		await asyncClick(test.instance.control);
		assert.isTrue(test.instance.isFocused,'should be focused');

		await asyncType('new[enter]',test.instance.control_input);
		await waitFor(10);

		assert.equal(test.instance.control_input, document.activeElement,'should maintain input focus');
		assert.equal(test.instance.items.length, 2,'should have two items');
		assert.equal(test.instance.items[0], 'original');
		assert.equal(test.instance.items[1], 'new');

	});

});
