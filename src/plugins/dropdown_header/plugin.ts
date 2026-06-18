/**
 * Plugin: "dropdown_header" (Tom Select)
 * Copyright (c) contributors
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
 */

import type TomSelect from '../../tom-select.ts';
import { getDom } from '../../vanilla.ts';
import { preventDefault } from '../../utils.ts';
import { DHOptions } from './types.ts';

export default function(this:TomSelect, userOptions:DHOptions) {
	const self = this;

	const options = Object.assign({
		title         : 'Untitled',
		headerClass   : 'dropdown-header',
		titleRowClass : 'dropdown-header-title',
		labelClass    : 'dropdown-header-label',
		closeClass    : 'dropdown-header-close',

		html: (data:DHOptions) => {
			const header = document.createElement('div');
			const titleRow = document.createElement('div');
			const label = document.createElement('span');
			const close = document.createElement('a');
			const headerClass = (data.headerClass || '').split(/\s+/).filter(token => /^[A-Za-z0-9_-]+$/.test(token)).join(' ');
			const titleRowClass = (data.titleRowClass || '').split(/\s+/).filter(token => /^[A-Za-z0-9_-]+$/.test(token)).join(' ');
			const labelClass = (data.labelClass || '').split(/\s+/).filter(token => /^[A-Za-z0-9_-]+$/.test(token)).join(' ');
			const closeClass = (data.closeClass || '').split(/\s+/).filter(token => /^[A-Za-z0-9_-]+$/.test(token)).join(' ');

			header.className = headerClass || 'dropdown-header';
			titleRow.className = titleRowClass || 'dropdown-header-title';
			label.className = labelClass || 'dropdown-header-label';
			close.className = closeClass || 'dropdown-header-close';
			label.textContent = data.title || '';
			close.textContent = '\u00d7';

			titleRow.append(label, close);
			header.appendChild(titleRow);

			return header;
		}
	}, userOptions);

	self.on('initialize',()=>{
		var header = getDom(options.html(options));

		var close_link = header.querySelector('.'+options.closeClass);
		if( close_link ){
			close_link.addEventListener('click',(evt)=>{
				preventDefault(evt,true);
				self.close();
			});
		}

		self.dropdown.insertBefore(header, self.dropdown.firstChild);
	});

};
