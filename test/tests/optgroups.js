
describe('optgroups', function() {

	var options = [
					{optgroup: 'mammal', value: "dog" },
					{optgroup: 'mammal', value: "cat" },
					{optgroup: 'bird', value: 'duck'},
					{optgroup: 'bird', value: 'chicken'},
					{optgroup: 'reptile', value: 'snake'},
					{optgroup: 'reptile', value: 'lizard'},
				];

	var groups = [
					{value: 'tetrapods', label: 'Tetrapods'},
					{value: 'mammal', label: 'Mammal'},
					{value: 'bird', label: 'Bird'},
					{value: 'reptile', label: 'Reptile'},
				];


	it_n('init', function(){

		var test = setup_test('<input>',{
			labelField: 'value',
			searchField: ['value'],
			options: options,
			optgroups: groups
		});

		assert.equal(Object.keys(test.instance.options).length, 6);
		assert.equal(Object.keys(test.instance.optgroups).length, 4);
	});


	it_n('load optgroups', function(done) {
		var test = setup_test('<input>',{
			labelField: 'value',
			searchField: ['value'],
			preload: true,
			load: function(query, loadcb) {

				loadcb(options,groups);

				assert.equal(Object.keys(test.instance.options).length, 6);
				assert.equal(Object.keys(test.instance.optgroups).length, 4);
				done();
			}
		});
	});

	it_n('duplicates & mode=single', async function(){

		var test = setup_test('<select>',{
			labelField: 'value',
			searchField: ['value'],
			options: options,
			optgroups: groups,
			duplicates: true,
			items:['dog'],
			lockOptgroupOrder: true,
			closeAfterSelect: true,
		});

		async function TestGroupValue(group,value){

			assert.isTrue(test.instance.isOpen, 'should be open to start');
			var clone = test.instance.dropdown_content.querySelector(`[data-group="${group}"]`).querySelector(`[data-value="${value}"]`);
			await asyncClick(clone);
			assert.isFalse(test.instance.isOpen, 'should be closed after select');
			await asyncClick(test.instance.control);
			assert.isTrue(test.instance.isOpen, 'should be open after click');
			assert.equal( test.instance.activeOption.dataset.value, value );
			assert.isOk( test.instance.activeOption.closest(`[data-group="${group}"]`), `activeOption should be in ${group} group` );

		}


		await asyncClick(test.instance.control);


		assert.equal(Object.keys(test.instance.options).length, 6);
		assert.equal(Object.keys(test.instance.optgroups).length, 4);
		assert.equal(test.instance.dropdown_content.querySelectorAll('.option').length, 6);
		assert.equal(test.instance.dropdown_content.querySelector('[data-group="mammal"]').querySelectorAll('.active').length , 1, 'active option should be in mammal group');

		test.instance.options.dog.optgroup = ['mammal','tetrapods'];
		test.instance.refreshOptions(false);

		assert.equal(Object.keys(test.instance.options).length, 6);
		assert.equal(test.instance.dropdown_content.querySelectorAll('.option').length,7);
		assert.equal(test.instance.dropdown_content.querySelector('[data-group="mammal"]').querySelectorAll('.active').length , 1, 'active option should still be in mammal group');


		test.instance.options.cat.optgroup = ['mammal','tetrapods'];
		test.instance.refreshOptions(false);

		// clicking on duplicates: dog
		await TestGroupValue('mammal','dog');
		await TestGroupValue('tetrapods','dog');

		await TestGroupValue('mammal','cat');
		await TestGroupValue('tetrapods','cat');

	});



});
