
/**
 * Add Content-Security-Policy to each page
 * 	<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://* data:; style-src 'self' unpkg.com cdnjs.cloudflare.com hashes-style; script-src 'self' hashes-script;font-src 'self' cdnjs.cloudflare.com;">
 *
 * based on csp functionality in https://github.com/google/eleventy-high-performance-blog
 *
 */
module.exports = function( eleventyConfig, config = {} ) {

	const crypto = require('crypto');
	const { JSDOM } = require('jsdom');
	var csp = config.csp;


	// add meta tag to each html page
	eleventyConfig.addTransform("csp", async (rawContent, outputPath) => {

		if( outputPath && outputPath.endsWith(".html") ){

			var this_csp = Object.assign({}, csp);

			const dom = new JSDOM(rawContent);
			let hashes = await CSPHashes(dom,'script');
			this_csp['script-src'] = this_csp['script-src'].concat( hashes );
			this_csp['style-src'] = this_csp['style-src'].concat( await CSPHashes(dom,'style') );


			var meta_tag = dom.window.document.createElement('meta');
			meta_tag.setAttribute('http-equiv','Content-Security-Policy');
			meta_tag.setAttribute('content', serializeCSP(this_csp) );
			dom.window.document.querySelector('head').append(meta_tag);

			return dom.serialize();

		}

		return rawContent;
	});

	// create array of sha256 hashes for all inline content matching type
	async function CSPHashes(dom,type){
		var hashes		= [];

		dom.window.document.querySelectorAll(type).forEach( (element) => {
			if( element.hasAttribute('csp-hash') ){
				const hash = 'sha256-'+crypto.createHash('sha256').update(element.textContent).digest('base64')
				element.setAttribute("csp-hash", hash);
				hashes.push(`'${hash}'`);
			}else if( element.textContent.trim() == '' && element.getAttribute('src') === null ){
				element.remove();
			}
		});

		return hashes;
	}

	function serializeCSP(csp) {
		var policy = [];
		for(let src in csp){
			policy.push(src + " "+csp[src].join(" "));
		}
		return policy.join(";");
	}

}
