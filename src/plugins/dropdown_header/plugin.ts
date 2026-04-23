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

	const escape_html = (value:string) => {
		return String(value)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	};

	const sanitize_classes = (value:string) => {
		return String(value).replace(/[^A-Za-z0-9_\-\s]/g, '').trim();
	};

	const options = Object.assign({
		title         : 'Untitled',
		headerClass   : 'dropdown-header',
		titleRowClass : 'dropdown-header-title',
		labelClass    : 'dropdown-header-label',
		closeClass    : 'dropdown-header-close',

		html: (data:DHOptions) => {
			return (
				'<div class="' + sanitize_classes(data.headerClass) + '">' +
					'<div class="' + sanitize_classes(data.titleRowClass) + '">' +
						'<span class="' + sanitize_classes(data.labelClass) + '">' + escape_html(data.title) + '</span>' +
						'<a class="' + sanitize_classes(data.closeClass) + '">&times;</a>' +
					'</div>' +
				'</div>'
			);
		}
	}, userOptions);

	self.on('initialize',()=>{
		var header = getDom(options.html(options));

		var close_class = sanitize_classes(options.closeClass).split(/\s+/)[0];
		var close_link = close_class ? header.querySelector('.'+close_class) : null;
		if( close_link ){
			close_link.addEventListener('click',(evt)=>{
				preventDefault(evt,true);
				self.close();
			});
		}

		self.dropdown.insertBefore(header, self.dropdown.firstChild);
	});

};
