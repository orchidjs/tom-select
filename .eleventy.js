
module.exports = function(eleventyConfig) {
	// Aliases are in relation to the _includes folder
	eleventyConfig.addLayoutAlias('about', 'layouts/about.html');
	eleventyConfig.addPassthroughCopy({'doc_src/css':'css'});
	eleventyConfig.addPassthroughCopy({'doc_src/images':'images'});
	eleventyConfig.addPassthroughCopy({'doc_src/js':'js'});
	eleventyConfig.addPassthroughCopy({'dist/js/selectize.complete.js':'js/selectize.complete.js'});
	eleventyConfig.addPassthroughCopy({'dist/css/selectize.bootstrap3.css':'css/selectize.bootstrap3.css'});
	eleventyConfig.addPassthroughCopy({'dist/css/selectize.default.css':'css/selectize.default.css'});


    eleventyConfig.addCollection('demosAlpha', function(collection) {
        return collection.getFilteredByGlob("doc_src/pages/examples/*.njk").sort(function(a, b) {
            let nameA = a.data.title.toUpperCase();
            let nameB = b.data.title.toUpperCase();
            if (nameA < nameB) return -1;
            else if (nameA > nameB) return 1;
            else return 0;
        });
    });


	return {
		dir: {
			input: 'doc_src/pages', // relative to project root
			output: 'docs',		// relative to project root
			includes: '../includes', // relative to input path
		}
	};
}
