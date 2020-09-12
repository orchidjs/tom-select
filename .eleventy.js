
module.exports = function(eleventyConfig) {
	// Aliases are in relation to the _includes folder
	eleventyConfig.addLayoutAlias('about', 'layouts/about.html');
	eleventyConfig.addPassthroughCopy({'doc_src/css':'css'});
	eleventyConfig.addPassthroughCopy({'doc_src/images':'images'});
	eleventyConfig.addPassthroughCopy({'doc_src/js':'js'});
	eleventyConfig.addPassthroughCopy({'build/js/selectize.complete.js':'js/selectize.complete.js'});
	eleventyConfig.addPassthroughCopy({'build/css/selectize.bootstrap3.css':'css/selectize.bootstrap3.css'});
	eleventyConfig.addPassthroughCopy({'build/css/selectize.default.css':'css/selectize.default.css'});


	eleventyConfig.addCollection('demosAlpha', function(collection) {
		return collection.getFilteredByGlob("doc_src/pages/examples/*.njk").sort(function(a, b) {
			let nameA = a.data.title.toUpperCase();
			let nameB = b.data.title.toUpperCase();
			if (nameA < nameB) return -1;
			else if (nameA > nameB) return 1;
			else return 0;
		});
	});

	let markdownIt = require('markdown-it');

	let options = {
		html: true,
		breaks: false,
		//linkify: true
	};

	md = markdownIt(options)
	md.use(require('markdown-it-anchor'));
	let orig_normalizeLink = md.normalizeLink;
	md.normalizeLink = function(url){

		// change "usage.md" to "usage"
		if( url.substr(-3) === '.md' ){
			url = url.substr(0,url.length - 3);
		}

		// change "usage" to "../usage"
		if( url.indexOf(':') == -1 && url.indexOf('/') != 0 && url.indexOf('#') == -1 ){
			url = '../'+url;
		}

		return orig_normalizeLink.call(this,url);
	}

	eleventyConfig.setLibrary('md', md );

	return {
		dir: {
			input: 'doc_src/pages', // relative to project root
			output: 'build/docs',	// relative to project root
			includes: '../includes', // relative to input path
		}
	};
}
