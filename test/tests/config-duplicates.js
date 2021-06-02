
describe('duplicates', function() {

	it_n('should add and remove duplicates',async function(){
		var test = setup_test('AB_Multi',{
			duplicates: true,
		});

		// add
		assert.equal(0,test.instance.items.length,0,'should start empty');
		test.instance.addItem('a');
		assert.equal(test.instance.items.length,1,'should add one');
		test.instance.addItem('a');
		assert.equal(test.instance.items.length,2,'should add second');
		test.instance.addItem('a');

		assert.equal(test.instance.items.length,3,'should have all three');



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


});
