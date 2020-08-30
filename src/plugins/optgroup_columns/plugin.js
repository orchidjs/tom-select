/**
 * Plugin: "optgroup_columns" (selectize.js)
 * Copyright (c) 2013 Simon Hewitt & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Simon Hewitt <si@sjhewitt.co.uk>
 */

Selectize.define('optgroup_columns', function(options) {
	var self = this;

	options = Object.assign({
		equalizeWidth  : true,
		equalizeHeight : true
	}, options);

	var orig_keydown = self.onKeyDown;

	this.onKeyDown = function(e) {
		var index, option, options, optgroup;

		if( !this.isOpen || !(e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
			return orig_keydown.apply(this, arguments);
		}

		self.ignoreHover	= true;
		optgroup			= parentMatch(this.activeOption,'[data-group]');
		index				= nodeIndex(this.activeOption,'[data-selectable]');

		if( e.keyCode === KEY_LEFT ){
			optgroup = optgroup.previousSibling;
		} else {
			optgroup = optgroup.nextSibling;
		}

		if( !optgroup ){
			return;
		}

		options				= optgroup.querySelectorAll('[data-selectable]');
		option				= options[ Math.min(options.length - 1, index) ];

		if( option ){
			this.setActiveOption(option);
		}

	};

	var getScrollbarWidth = function() {
		var div;
		var width = getScrollbarWidth.width;
		var doc = document;

		if (typeof width === 'undefined') {
			div = doc.createElement('div');
			div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
			div = div.firstChild;
			doc.body.appendChild(div);
			width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
			doc.body.removeChild(div);
		}
		return width;
	};

	var equalizeSizes = function() {
		var i, n, height_max, width, width_last, width_parent, optgroups;

		optgroups	= self.dropdown_content.querySelectorAll('[data-group]');
		n = optgroups.length;

		if (!n || !self.dropdown_content.clientWidth ) return;

		if (options.equalizeHeight) {
			height_max = 0;
			for (i = 0; i < n; i++) {
				height_max = Math.max(height_max, optgroups[i].clientHeight );
			}
			for( i = 0; i < n; i++){
				optgroups[i].style.height = height_max + 'px';
			}
		}


		if (!n || !self.dropdown_content.clientWidth ) return;

		if (options.equalizeWidth) {
			width_parent = self.dropdown_content.clientWidth - getScrollbarWidth();
			width = Math.round(width_parent / n);

			for( i = 0; i < n; i++ ){
				optgroups[i].style.width = width + 'px';
			}

			if (n > 1) {
				width_last = width_parent - width * (n - 1);
				optgroups[n-1].style.width = width_last+'px';
			}
		}
	};

	if (options.equalizeHeight || options.equalizeWidth) {
		hook.after(this, 'positionDropdown', equalizeSizes);
		hook.after(this, 'refreshOptions', equalizeSizes);
	}


});
