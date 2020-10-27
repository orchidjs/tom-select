


describe('ESM Module', function(){

	it_n('should initialize without exceptions', function(done) {
		import('/base/src/tom-select.complete.js').then(function(SelectModule){
			var instance = new SelectModule.default('<select>');
			done();
		}).catch(function(err){
			console.log('err',err);
			assert.equal( true, false);
			done();
		});
	});

});
