
describe('Control Input', function() {

	describe('controlInput = null', function() {
		it_n('should initialize without control input',async function(){
			var test = setup_test('AB_Multi', {
				controlInput: null,
			});
			
			assert.isNotOk( test.html.querySelector('input'), 'should initialize without control input');
		});
	});

});
