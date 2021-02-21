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
import { getDom } from '../../vanilla';



TomSelect.define('dropdown_input',function() {
	var self = this;

	var input = getDom('<input type="text" autocomplete="off" class="dropdown-input" />' );
	self.settings.controlInput = input;
	self.settings.shouldOpen = true; // make sure the input is shown even if there are no options to display in the dropdown

	self.hook('after','setup',()=>{
		self.dropdown.insertBefore(input, self.dropdown.firstChild);
	});

});
