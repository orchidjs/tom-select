document.addEventListener('DOMContentLoaded', function() {


	// theme switcher
	var theme_match		= String(window.location).match(/[?&]theme=([a-z0-9]+)/);
	var theme			= (theme_match && theme_match[1]) || 'default';
	var themes			= ['default','bootstrap3'];
	var link			= document.createElement('link');
	link.setAttribute('rel','stylesheet');
	link.setAttribute('href','../dist/css/selectize.' + theme + '.css');
	document.getElementsByTagName('head')[0].appendChild(link);


	var themes_div	= document.createElement('div');
	themes_div.classList.add('theme-selector')
	document.getElementsByTagName('h1')[0].insertAdjacentElement('afterend', themes_div);

	for (var i = 0; i < themes.length; i++) {

		let a = document.createElement('a');
		a.setAttribute('href','?theme=' + themes[i]);
		a.textContent = themes[i];
		if( themes[i] === theme ){
			a.classList.add('active');
		}
		themes_div.appendChild(a);
	}


	// add info about script and current value below each demo
	var demos = document.querySelectorAll('.demo');
	for(let i = 0; i < demos.length; i++){

		let demo	= demos[i];

		ShowValue(demo);

		let div		= document.createElement('div');
		demo.appendChild(div);
		div.style.display = 'flex';

		ShowScript(demo,div);
		ShowHtml(demo,div);

	}


	/**
	 * Display demo script
	 *
	 */
	function ShowScript(demo,appendto){

		let div		= document.createElement('div');
		div.style.flexGrow = 1;
		div.style.margin = '1rem';
		appendto.appendChild(div);
		div.innerHTML = '<h4 style="margin:0">JavaScript</h4>';

		var scripts = demo.querySelectorAll('script');
		for(let i = 0; i < scripts.length; i++){
			let script	= scripts[i];
			let code = script.text;
			if (code && code.length) {
				let lines = code.split('\n');
				let indent = null;

				for (let j = 0; j < lines.length; j++) {
					if (/^[	 ]*$/.test(lines[j])) continue;
					if (!indent) {
						let lineindent = lines[j].match(/^([ 	]+)/);
						if (!lineindent) break;
						indent = lineindent[1];
					}
					lines[j] = lines[j].replace(new RegExp('^' + indent), '');
				}

				code = lines.join('\n').trim().replace(/	/g, '    ');

				let pre		= document.createElement('pre');
				pre.classList.add('js');
				pre.textContent = code;
				div.appendChild(pre);
			}

		}
	}


	/**
	 * Display demo script
	 *
	 */
	function ShowHtml(demo,appendto){

		let div		= document.createElement('div');
		div.style.flexGrow = 1;
		div.style.margin = '1rem';
		appendto.appendChild(div);
		div.innerHTML = '<h4 style="margin:0">HTML</h4>';

		var inputs = demo.querySelectorAll('input,select');
		for(let i = 0; i < inputs.length; i++){
			let input	= inputs[i];
			let code = input.outerHTML;
			if (code && code.length) {
				let lines = code.split('\n');
				let indent = null;

				for (let j = 0; j < lines.length; j++) {
					if (/^[	 ]*$/.test(lines[j])) continue;
					if (!indent) {
						let lineindent = lines[j].match(/^([ 	]+)/);
						if (!lineindent) break;
						indent = lineindent[1];
					}
					lines[j] = lines[j].replace(new RegExp('^' + indent), '');
				}

				code = lines.join('\n').trim().replace(/	/g, '    ');

				let pre		= document.createElement('pre');
				pre.classList.add('js');
				pre.textContent = code;
				div.appendChild(pre);
			}

		}
	}

	/**
	 * Show current input values
	 *
	 */
	function ShowValue(demo){


		var selectized = demo.querySelectorAll('select.selectized,input.selectized');
		for(let i = 0; i < selectized.length; i++){

			let el		= selectized[i];
			let div		= document.createElement('div');
			div.classList.add('value');
			let update	= function(){
				div.textContent = 'Current Value: ' + JSON.stringify(el.value);
			};

			el.addEventListener('change',update);
			update();
			demo.appendChild( div);
		}
	}

});
