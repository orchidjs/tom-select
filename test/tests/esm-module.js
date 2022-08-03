


describe('ESM Module', function(d1){

	this.timeout(10000);

	it_n('should initialize without exceptions', async () =>{

		import('/base/build/esm/tom-select.complete.js').then(function(SelectModule){
			var instance = new SelectModule.default('<select>');
			assert.isTrue(true);

		}).catch(function(err){
			assert.fail('import tom-select.complete.js failed');

		});
	});


	it_n('isKeyDown', async() => {

		var last_keydown;
		document.body.addEventListener('keydown',function(evt){
			last_keydown = evt;
		});

		const util_module = await import('/base/build/esm/utils.js');

		await asyncType('[alt]', document.body);
		await waitFor(100);
		assert.equal( util_module.isKeyDown('shiftKey',last_keydown), false, 'should return false if [alt] is pressed');
		await asyncType('[alt-up]', document.body);

		await asyncType('[alt][shift]', document.body);
		await waitFor(100);
		assert.equal( util_module.isKeyDown('shiftKey',last_keydown), false, 'should return false if [alt][shift] is pressed');
		await asyncType('[alt-up][shift-up]', document.body);


		await asyncType('['+shortcut_key+'][shift]', document.body);
		await waitFor(100);
		assert.equal( util_module.isKeyDown('shiftKey',last_keydown), false, 'should return false if ['+shortcut_key+'][shift] is pressed');
		assert.equal( util_module.isKeyDown('ctrlKey',last_keydown), false, 'should return false if ['+shortcut_key+'][shift] is pressed');
		await asyncType('['+shortcut_key+'-up][shift-up]', document.body);


		await asyncType('[shift]', document.body);
		await waitFor(100);
		assert.equal( util_module.isKeyDown('shiftKey',last_keydown), true, 'should return true if [shift] is pressed');
		await asyncType('[shift-up]', document.body);


		await asyncType('['+shortcut_key+']', document.body);
		await waitFor(100);
		assert.equal( util_module.isKeyDown(shortcut_key+'Key',last_keydown), true, 'should return true if ['+shortcut_key+'] is pressed');
		await asyncType('['+shortcut_key+'-up]', document.body);



	});

});
