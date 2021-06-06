

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


	it_n('three optgroups should be displayed', async () => {

		var test = optgroup_test();
		await asyncType('a',test.instance.control_input);

		var optgroups = test.instance.dropdown_content.querySelectorAll('.optgroup');
		expect(optgroups.length).to.be.equal(3);

	});

	it_n('[right] keypress should move focus to second optgroup', async () => {
		var test = optgroup_test();

		// 1) move right to audi
		await asyncType('a[right]',test.instance.control_input);

		var optgroup			= test.instance.activeOption.parentNode;
		expect(optgroup.dataset.group).to.be.equal('audi');

		// 2) move left to chevy
		await asyncType('[left]',test.instance.control_input);

		var optgroup			= test.instance.activeOption.parentNode;
		expect(optgroup.dataset.group).to.be.equal('chevrolet');

	});

});
