


describe('ESM Module', function(){

	it_n('should initialize without exceptions', function(done){

		// currently fails on IOS 10 + FFox 82
		if( process.env.TRAVIS_CI && process.env.TARGET === 'browserstack' ){
			this.skip();
		}

		import('/base/src/tom-select.complete.js').then(function(SelectModule){
			var instance = new SelectModule.default('<select>');
			assert.equal( true, true);
			done();

		}).catch(function(err){
			assert.equal( true, false);
			done();

		})
	});

});
