var crypto = require('crypto');
const { JSDOM } = require("jsdom");

module.exports = function(eleventyConfig) {
	// Aliases are in relation to the _includes folder
	eleventyConfig.addLayoutAlias('about', 'layouts/about.html');
	eleventyConfig.addPassthroughCopy({'doc_src/css':'css'});
	eleventyConfig.addPassthroughCopy({'doc_src/js':'js'});
	eleventyConfig.addPassthroughCopy({'build/js':'js'});
	eleventyConfig.addPassthroughCopy({'build/css':'css'});
	eleventyConfig.addPassthroughCopy({'build/esm':'esm'});


	const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
	eleventyConfig.addPlugin(syntaxHighlight);

	function GlobCollection(name, glob){
		eleventyConfig.addCollection(name, function(collection) {
			return collection.getFilteredByGlob(glob)
				.filter(function(page){
					return !page.data.exclude;
				})
				.sort(function(a, b) {
					let nameA = a.data.title.toUpperCase();
					let nameB = b.data.title.toUpperCase();
					if (nameA < nameB) return -1;
					else if (nameA > nameB) return 1;
					else return 0;
			});
		});
	}

	GlobCollection('plugins','doc_src/pages/plugins/*.njk')
	GlobCollection('demosAlpha','doc_src/pages/examples/*.njk')

	// link shortcode
	eleventyConfig.addNunjucksShortcode('nav_link', function(item) {
		var title = '';
		if( item.title ){
			title = item.title;
		}else if( item.data.nav_title ){
			title = item.data.nav_title;
		}else{
			title = item.data.title;
		}

		if( this.page.url == item.url || this.page.filePathStem == item.filePathStem  ){
			return `<span class="nav-link active">${title}</span>`;
		}

		return `<a class="nav-link" href="${item.url}">${title}</a>`;
	});



	// csp hashes
	// based on https://github.com/google/eleventy-high-performance-blog
	eleventyConfig.addTransform("csp", async (rawContent, outputPath) => {
		let content = rawContent;

		if( outputPath && outputPath.endsWith(".html") ){
			content = await AddCSP(content,'script');
			content = await AddCSP(content,'style');
		}

		return content;
	});

	async function AddCSP(content,type){

		const dom			= new JSDOM(content);
		const csp_js		= [...dom.window.document.querySelectorAll(type)];



		const hashes = csp_js.map((element) => {
			if( element.hasAttribute('csp-hash') ){
				const hash = 'sha256-'+crypto.createHash('sha256').update(element.textContent).digest('base64')
				element.setAttribute("csp-hash", hash);
				return `'${hash}'`;
			}else if( element.textContent.trim() == '' && element.getAttribute('src') === null ){
				element.remove();
			}
		});

		const csp = dom.window.document.querySelector("meta[http-equiv='Content-Security-Policy']");
		if( csp ){
			csp.setAttribute("content", csp.getAttribute("content").replace("hashes-"+type, hashes.join(" ")));
		}

		content = dom.serialize();

		return content;
	}



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
			data: '../data',		// relative to input path
			input: 'doc_src/pages', // relative to project root
			output: 'build/docs',	// relative to project root
			includes: '../includes', // relative to input path
		}
	};
}
