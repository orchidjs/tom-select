/**
 * Plugin: "dropdown_input" (Tom Select)
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

import TomSelect from '../../tom-select.js';
import * as constants from '../../constants.js';
import { getDom, setAttr } from '../../vanilla';
import { addEvent } from '../../utils';


TomSelect.define('dropdown_input',function(this:TomSelect) {
	var self = this;

	var input = self.settings.controlInput || '<input type="text" autocomplete="off" class="dropdown-input" />';
	input = getDom( input ) as HTMLInputElement;

	if (self.settings.placeholder) {
		setAttr(input,{placeholder:self.settings.placeholder});
	}

	self.settings.controlInput = input;
	self.settings.shouldOpen = true; // make sure the input is shown even if there are no options to display in the dropdown

	self.on('initialize',()=>{

		// open/close dropdown when tabbing focus on wrapper
		addEvent(self.wrapper,'focus', (evt) => {
			self.onFocus(evt as MouseEvent)
		});
		
		const setTabIndex = () => {
			setAttr(self.wrapper,{tabindex:self.input.disabled ? '-1' : self.tabIndex});
		};
		
		self.on('dropdown_close',setTabIndex);
		self.on('dropdown_open',() => setAttr(self.wrapper,{tabindex:'-1'}) );
		setTabIndex();


		// keyboard navigation
		addEvent(self.wrapper,'keypress',(evt) => {

			if( self.control.contains(evt.target as HTMLElement) ){
				return;
			}

			if( self.dropdown.contains(evt.target as HTMLElement) ){
				return;
			}

			// open dropdown on enter when wrapper is tab-focused
			switch( (<KeyboardEvent>evt).keyCode ){
				case constants.KEY_RETURN:
					self.onClick();
				return;
			}

		});

		let div = getDom('<div class="dropdown-input-wrap">');
		div.appendChild(input);
		self.dropdown.insertBefore(div, self.dropdown.firstChild);
	});

});
