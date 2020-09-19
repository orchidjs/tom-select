


describe('plugin: remove_button', function() {

	it_n('should remove item when remove button is clicked', function(done) {

		let test = setup_test('AB_Multi', {plugins: ['remove_button']});

		test.instance.addItem('a');
		test.instance.addItem('b');
		assert.equal( test.instance.items.length, 2 );

		var itema			= test.instance.getItem('b');
		var remove_button	= itema.querySelector('.remove');

		expect(remove_button.classList.contains('remove')).to.be.equal(true);

		syn.click( remove_button, function() {
			assert.equal( test.instance.items.length, 1 );
			assert.equal( test.instance.items[0], 'a' );
			done();

		});

	});


});

describe('plugin: no_backspace_delete', function() {

	it_n('should not delete item on backspace', function(done) {

		let test = setup_test('AB_Multi', {plugins: ['no_backspace_delete']});

		test.instance.addItem('a');
		test.instance.addItem('b');
		test.instance.setActiveItem(test.instance.getItem('b'));

		assert.equal( test.instance.items.length, 2 );
		assert.equal( test.instance.activeItems.length, 0 );

		syn.click(test.instance.control_input,function(){
			syn.type('\b', test.instance.control_input, function() {

				assert.equal( test.instance.items.length, 2 );
				done();

			});
		});

	});


});


describe('plugin: restore_on_backspace', function() {

	it_n('should fill control_input.value when item deleted', function(done) {

		var test = setup_test('AB_Multi',{plugins:['restore_on_backspace']});

		test.instance.addItem('a');
		test.instance.addItem('b');
		assert.equal( test.instance.items.length, 2 );

		syn.click(test.instance.control_input,function(){
			syn.type('\b', test.instance.control_input, function() {
				assert.equal( test.instance.items.length, 1 );
				assert.equal( test.instance.items[0], 'a' );
				assert.equal( test.instance.control_input.value, 'b' );
				done();

			});
		});

	});

});


describe('plugin: dropdown_header', function() {

	it_n('header should be added to dropdown menu', function() {

		var test	= setup_test('AB_Multi',{plugins:['dropdown_header']});
		var header	= test.instance.dropdown.querySelectorAll('.dropdown-header');

		expect(header.length).to.be.equal(1);
	});

});


describe('plugin: optgroup_columns', function() {

	var optgroup_test = function(){
		return setup_test('<input>',{
						options: [
							{id: 'avenger', make: 'dodge', model: 'Avenger'},
							{id: 'caliber', make: 'dodge', model: 'Caliber'},
							{id: 'caravan-grand-passenger', make: 'dodge', model: 'Caravan Grand Passenger'},
							{id: 'challenger', make: 'dodge', model: 'Challenger'},
							{id: 'ram-1500', make: 'dodge', model: 'Ram 1500'},
							{id: 'viper', make: 'dodge', model: 'Viper'},
							{id: 'a3', make: 'audi', model: 'A3'},
							{id: 'a6', make: 'audi', model: 'A6'},
							{id: 'r8', make: 'audi', model: 'R8'},
							{id: 'rs-4', make: 'audi', model: 'RS 4'},
							{id: 's4', make: 'audi', model: 'S4'},
							{id: 's8', make: 'audi', model: 'S8'},
							{id: 'tt', make: 'audi', model: 'TT'},
							{id: 'avalanche', make: 'chevrolet', model: 'Avalanche'},
							{id: 'aveo', make: 'chevrolet', model: 'Aveo'},
							{id: 'cobalt', make: 'chevrolet', model: 'Cobalt'},
							{id: 'silverado', make: 'chevrolet', model: 'Silverado'},
							{id: 'suburban', make: 'chevrolet', model: 'Suburban'},
							{id: 'tahoe', make: 'chevrolet', model: 'Tahoe'},
							{id: 'trail-blazer', make: 'chevrolet', model: 'TrailBlazer'},
						],
						optgroups: [
							{$order: 3, id: 'dodge', name: 'Dodge'},
							{$order: 2, id: 'audi', name: 'Audi'},
							{$order: 1, id: 'chevrolet', name: 'Chevrolet'}
						],
						labelField: 'model',
						valueField: 'id',
						optgroupField: 'make',
						optgroupLabelField: 'name',
						optgroupValueField: 'id',
						lockOptgroupOrder: true,
						searchField: ['model'],
						plugins: ['optgroup_columns'],
						openOnFocus: false
					});
	};


	it_n('three optgroups should be displayed', function() {

		var test = optgroup_test();
		syn.type('a', test.instance.control_input, function() {
			var optgroups = test.instance.dropdown_content.querySelectorAll('.optgroup');
			expect(optgroups.length).to.be.equal(3);
		});

	});

	it_n('[right] keypress should move focus to second optgroup', function() {
		var test = optgroup_test();

		// 1) move right to audi
		syn.type('a[right]', test.instance.control_input, function() {

			var optgroup			= parentMatch(test.instance.activeOption,'[data-group]');
			expect(optgroup.dataset.group).to.be.equal('audi');

			// 2) move left to chevy
			syn.type('[left]', test.instance.control_input, function() {

				var optgroup			= parentMatch(test.instance.activeOption,'[data-group]');
				expect(optgroup.dataset.group).to.be.equal('chevrolet');

			});

		});

	});

});



describe('plugin: change_listener', function() {

	it_n('Tom Select should update when original input is changed', function() {

		let test = setup_test('<input value="original">', {plugins: ['change_listener']});

		assert.equal( Object.keys(test.instance.options).length, 1);

		var input = test.$select[0];
		input.value = 'new value';
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent('change', false, true);
		input.dispatchEvent(evt);

		assert.equal( Object.keys(test.instance.options).length, 2);
		assert.equal( test.instance.items.length, 1);
		assert.equal( test.instance.items[0], 'new value');

	});

});
