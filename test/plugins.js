(function() {

	describe('plugins', function() {

		describe('remove_button', function() {

			it_n('should remove item when remove button is clicked', function(done) {

				let test = setup_test('AB_Multi', {plugins: ['remove_button']});

				test.selectize.addItem('a');
				test.selectize.addItem('b');
				assert.equal( test.selectize.items.length, 2 );

				var itema			= test.selectize.getItem('b');
				var remove_button	= itema.querySelector('.remove');

				expect(remove_button.classList.contains('remove')).to.be.equal(true);

				syn.click( remove_button, function() {
					assert.equal( test.selectize.items.length, 1 );
					assert.equal( test.selectize.items[0], 'a' );
					done();

				});

			});


		});


		describe('restore_on_backspace', function() {

			it_n('should fill control_input.value when item deleted', function(done) {

				var test = setup_test('AB_Multi',{plugins:['restore_on_backspace']});

				test.selectize.addItem('a');
				test.selectize.addItem('b');
				assert.equal( test.selectize.items.length, 2 );

				syn.click(test.selectize.control_input,function(){
					syn.type('\b', test.selectize.control_input, function() {

						window.setTimeout(function(){
							assert.equal( test.selectize.items.length, 1 );
							assert.equal( test.selectize.items[0], 'a' );
							assert.equal( test.selectize.control_input.value, 'b' );
							done();
						},100);

					});
				});

			});

		});


		describe('dropdown_header', function() {

			it_n('header should be added to dropdown menu', function() {

				var test	= setup_test('AB_Multi',{plugins:['dropdown_header']});
				var header	= test.selectize.dropdown.querySelectorAll('.selectize-dropdown-header');

				expect(header.length).to.be.equal(1);
			});

		});


		describe('optgroup_columns', function() {

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
				syn.type('a', test.selectize.control_input, function() {
					var optgroups = test.selectize.dropdown_content.querySelectorAll('.optgroup');
					expect(optgroups.length).to.be.equal(3);
				});

			});

			it_n('[right] keypress should move focus to second optgroup', function() {
				var test = optgroup_test();

				// 1) move right to audi
				syn.type('a[right]', test.selectize.control_input, function() {

					var optgroup			= parentMatch(test.selectize.activeOption,'[data-group]');
					expect(optgroup.dataset.group).to.be.equal('audi');

					// 2) move left to chevy
					syn.type('[left]', test.selectize.control_input, function() {

						var optgroup			= parentMatch(test.selectize.activeOption,'[data-group]');
						expect(optgroup.dataset.group).to.be.equal('chevrolet');

					});

				});

			});

		});


	});

})();
