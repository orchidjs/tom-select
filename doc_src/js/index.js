document.addEventListener('DOMContentLoaded', function() {

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var target = this.dataset.target;
	})

	// don't show theme optinos unless we're displaying a demo
	var demo_divs = document.querySelectorAll('.demo');
	if( demo_divs.length == 0 ){
		return;
	}


	// theme switcher
	var themes			= ['default','bootstrap3','bootstrap4'];
	var theme			= localStorage.getItem('theme') || 'default';

	var themes_div	= document.createElement('div');
	themes_div.classList.add('theme-selector')
	var container	= document.getElementById('main-container')
	container.insertBefore(themes_div, container.firstChild);

	SetTheme(theme);


	// add info about script and current value below each demo
	for(let i = 0; i < demo_divs.length; i++){
		let demo	= demo_divs[i];
		ShowValue(demo);
	}

	/**
	 * Set the  current theme
	 *
	 */
	function SetTheme(theme){

		localStorage.setItem('theme',theme);

		themes_div.innerHTML = '';
		for( let i = 0; i < themes.length; i++) {

			let a = document.createElement('a');
			a.textContent = themes[i];
			a.className = 'btn btn-link btn-sm'
			if( themes[i] === theme ){
				a.classList.add('active');
			}
			themes_div.appendChild(a);

			a.addEventListener('click',function(evt){
				evt.preventDefault();
				SetTheme(themes[i]);
			});
		}


		var link			= document.getElementById('selectize-theme');
		if( link ) link.parentNode.removeChild(link);

		link				= document.createElement('link');
		link.id				= 'selectize-theme';

		link.setAttribute('rel','stylesheet');
		link.setAttribute('href','/css/selectize.' + theme + '.css');
		document.getElementsByTagName('head')[0].appendChild(link);
	}


	/**
	 * Show current input values
	 *
	 */
	function ShowValue(demo){

		var demo_html = demo.querySelector('.demo-html');

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
			demo_html.appendChild( div);
		}
	}

});
