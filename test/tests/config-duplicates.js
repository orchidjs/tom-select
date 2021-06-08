
describe('duplicates', function() {

	it_n('should add and remove duplicates',async function(){
		var test = setup_test('AB_Multi',{
			duplicates: true,
		});

		// add
		assert.equal(0,test.instance.items.length,0,'should start empty');
		test.instance.addItem('a');
		assert.equal(test.instance.items.length,1,'should add one');
		assert.equal(test.instance.input.querySelectorAll('option[value="a"]').length, 1, 'should have 1 option w/ value=a in original select');

		test.instance.addItem('a');
		assert.equal(test.instance.items.length,2,'should add second');
		assert.equal(test.instance.input.querySelectorAll('option[value="a"]').length, 2,'should have 3 options w/ value=a in original select');

		test.instance.addItem('a');
		assert.equal(test.instance.items.length,3,'should have all three');
		assert.equal(test.instance.input.querySelectorAll('option[value="a"]').length, 3, 'should have 3 option w/ value=a in original select');

		// remove items in order
		const items = test.instance.controlChildren();
		await asyncClick(test.instance.control_input);

		while( items.length ){
			items.pop();
			await asyncType('\b',test.instance.control_input);
			const items_after = test.instance.controlChildren();
			assert.deepEqual( items, items_after);
		}
	});

	it_n('should initialize with duplicates (input)',async ()=>{
		var test = setup_test('<input value="a,a">',{duplicates:true});
		assert.equal(test.instance.items.length,2);
	});

	it_n('should initialize with duplicates (select)',async ()=>{
		var test = setup_test('<select multiple><option selected>a</option><option selected>a</option></select>',{duplicates:true});
		assert.equal(test.instance.items.length,2);
	});

});
