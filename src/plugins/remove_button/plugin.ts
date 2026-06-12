/**
 * Plugin: "remove_button" (Tom Select)
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
import { escape_html, preventDefault, addEvent } from '../../utils.ts';
import { TomOption, TomItem } from '../../types/index.ts';
import { RBOptions } from './types.ts';

export default function(this:TomSelect, userOptions:RBOptions) {
	const self = this;

	const options = Object.assign({
			label     : '×',
			title     : 'Remove',
			className : 'remove',
			tabindex  : -1,
			role      : 'button',
			html      : (data:RBOptions) => {
				const el = document.createElement('div');

				el.className = data.className || '';
				el.title = data.title || '';
				el.setAttribute('role', data.role || 'button');
				el.tabIndex = data.tabindex ?? -1;
				el.textContent = data.label || '';

				return el;
			}
		}, userOptions);


	self.hook('after','setupTemplates',() => {

		var orig_render_item = self.settings.render.item;

		self.settings.render.item = (data:TomOption, escape:typeof escape_html) => {

			var item = getDom(orig_render_item.call(self, data, escape)) as TomItem;

			var close_button = getDom(options.html(options));
			item.appendChild(close_button);

			addEvent(close_button,'mousedown',(evt) => {
				preventDefault(evt,true);
			});

			addEvent(close_button,'click',(evt) => {

				if( self.isLocked ) return;

				// propagating will trigger the dropdown to show for single mode
				preventDefault(evt,true);

				if( self.isLocked ) return;
				if( !self.shouldDelete([item],evt as MouseEvent) ) return;

				self.removeItem(item);
				self.refreshOptions(false);
				self.inputState();
			});

			return item;
		};

	});


};
