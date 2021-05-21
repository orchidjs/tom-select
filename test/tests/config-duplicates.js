
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

		// remove
		test.instance.removeItem('a');
		assert.equal(test.instance.items.length,2,'should remove first');
		test.instance.removeItem('a');
		assert.equal(test.instance.items.length,1,'should remove second');
		test.instance.removeItem('a');
		assert.equal(0,test.instance.items.length,0,'should remove last');
	});


});
