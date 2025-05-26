/**
 * Plugin: "restore_on_backspace" (Tom Select)
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
import { TomOption } from '../../types/index.ts';

type TPluginOptions = {
	text?:(option:TomOption)=>string,
};

export default function(this:TomSelect, userOptions:TPluginOptions) {
	const self = this;

	const options = Object.assign({
		text: (option:TomOption) => {
			return option[self.settings.labelField];
		}
	},userOptions);

	self.on('item_remove',function(value:string){
		if( !self.isFocused ){
			return;
		}

		if( self.control_input.value.trim() === '' && !self.isInputHidden){
			var option = self.options[value];
			if( option ){
				self.setTextboxValue(options.text.call(self, option));
			}
		}
	});

};
