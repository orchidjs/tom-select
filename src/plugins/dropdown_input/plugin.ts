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

import TomSelect from '../../tom-select';
import * as constants from '../../constants';
import { getDom, addClasses, removeClasses } from '../../vanilla';
import { preventDefault } from '../../utils';

export default function(this:TomSelect) {
	const self = this;
	const dropdownInputWrap = getDom('<div class="dropdown-input-wrap">');

	const moveToDropdown = ()=>{
		if (!dropdownInputWrap.contains(self.focus_node)) {
			dropdownInputWrap.append(self.focus_node);
			addClasses( self.focus_node, 'dropdown-input');
			self.ignoreFocus = true;
			setTimeout(() => {
				self.focus_node.focus();
				self.ignoreFocus = false;
			}, 0);
			self.control_input.placeholder = self.settings.placeholder;
			self.isInputHidden = false;
			removeClasses( self.wrapper, 'input-hidden');		
		}
	}
	const moveToControl = ()=>{
		if (!self.control.contains(self.focus_node)) {
			removeClasses( self.focus_node, 'dropdown-input');
			self.control.append(self.focus_node);
			self.ignoreFocus = true;
			setTimeout(() => {
				self.focus_node.focus();
				self.ignoreFocus = false;
			}, 0);
			self.inputState();
		}
	}

	self.settings.shouldOpen = true; // make sure the input is shown even if there are no options to display in the dropdown

	self.hook('before','setup',()=>{
		self.dropdown.insertBefore(dropdownInputWrap, self.dropdown.firstChild);
	});

	self.on('initialize',()=>{
		// Change parent depending on if dropdown is visible
		self.on('dropdown_open', moveToDropdown);
		self.on('dropdown_close', moveToControl);
		// Make sure we can still open on keydown
		self.focus_node.addEventListener('keydown', (evt:KeyboardEvent) =>{
			switch( evt.keyCode ){
				case constants.KEY_DOWN:
					if (!self.isOpen) {
						preventDefault(evt,true);
						self.open();
					}
				return;					
			}
		});
	});

};
