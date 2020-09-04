document.addEventListener('DOMContentLoaded', function() {


	// theme switcher
	var theme_match		= String(window.location).match(/[?&]theme=([a-z0-9]+)/);
	var theme			= (theme_match && theme_match[1]) || 'default';
	var themes			= ['default','bootstrap3'];
	var link			= document.createElement('link');
	link.setAttribute('rel','stylesheet');
	link.setAttribute('href','../build/css/selectize.' + theme + '.css');
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

		ShowValue(demos[i]);
		ShowScript(demos[i]);

	}


	/**
	 * Display demo script
	 *
	 */
	function ShowScript(demo){

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
				demo.appendChild(pre);
				//script.insertAdjacentElement('afterend', pre);
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
