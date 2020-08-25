$.fn.selectize = function(settings_user) {

	return this.each(function() {
		if (this.selectize) return;
		
		var instance = new Selectize(this, settings_user );
	});
};

