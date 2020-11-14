


describe('ESM Module', function(d1){

	this.timeout(7000);

	it_n('should initialize without exceptions', function(done){

		import('/base/build/esm/tom-select.complete.js').then(function(SelectModule){
			var instance = new SelectModule.default('<select>');
			assert.equal( true, true);
			done();

		}).catch(function(err){
			assert.equal( true, false,'import tom-select.complete.js failed');
			done();

		});
	});


	it_n('isKeyDown', function(done){

		var last_keydown;
		document.body.addEventListener('keydown',function(evt){
			last_keydown = evt;
		});

		import('/base/build/esm/utils.js').then(function(util_module){

			syn.type('[alt]', document.body, function(evt) {
				assert.equal( util_module.isKeyDown('shiftKey',last_keydown), false, 'should return false if [alt] is pressed');
				syn.type('[alt-up]', document.body);
			});

			syn.type('[alt][shift]', document.body, function() {
				assert.equal( util_module.isKeyDown('shiftKey',last_keydown), false, 'should return false if [alt][shift] is pressed');
				syn.type('[alt-up][shift-up]', document.body);
			});

			syn.type('['+shortcut_key+'][shift]', document.body, function() {
				assert.equal( util_module.isKeyDown('shiftKey',last_keydown), false, 'should return false if ['+shortcut_key+'][shift] is pressed');
				assert.equal( util_module.isKeyDown('ctrlKey',last_keydown), false, 'should return false if ['+shortcut_key+'][shift] is pressed');
				syn.type('['+shortcut_key+'-up][shift-up]', document.body);
			});

			syn.type('[shift]', document.body, function() {
				assert.equal( util_module.isKeyDown('shiftKey',last_keydown), true, 'should return true if [shift] is pressed');
				syn.type('[shift-up]', document.body);
			});

			syn.type('['+shortcut_key+']', document.body, function() {
				assert.equal( util_module.isKeyDown(shortcut_key+'Key',last_keydown), true, 'should return true if ['+shortcut_key+'] is pressed');
				syn.type('['+shortcut_key+'-up]', document.body);
			});
			done();

		}).catch(function(err){
			assert.equal( true, false, 'import utils.js failed');
			done();

		});

	});

});
