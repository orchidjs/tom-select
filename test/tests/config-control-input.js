
describe('Control Input', function() {

	describe('controlInput = null', function() {
		it_n('should initialize without control input',async function(){
			var test = setup_test('AB_Multi', {
				controlInput: null,
			});
			
			assert.isNotOk( test.html.querySelector('input'), 'should initialize without control input');
		});

		it_n('should select option with [enter] keypress (single)', async () => {

			var test = setup_test('AB_Single',{
				controlInput: null,
			});

			await asyncClick( test.instance.control );
			assert.isTrue( test.instance.isOpen );
			assert.equal(test.instance.activeOption.dataset.value,'a');

			await asyncType('[enter]', test.instance.control);
			assert.isFalse( test.instance.isOpen );
			assert.equal( test.instance.items.length, 1);
			assert.equal( test.instance.items[0], 'a');

			await asyncType('[down]', test.instance.control);
			assert.isTrue( test.instance.isOpen );
			
			await asyncType('[down][enter]', test.instance.control);
			assert.equal( test.instance.items.length, 1);
			assert.equal( test.instance.items[0], 'b');
		
		});

		it_n('only open after arrow down when openOnFocus=false', async () => {

			var test = setup_test('AB_Single',{
				controlInput: null,
				openOnFocus: false,
			});

			await asyncClick(test.instance.control);
			assert.isFalse(test.instance.isOpen);
			
			await asyncType('[down]', test.instance.control);
			assert.isTrue(test.instance.isOpen);
		});

	});

});
