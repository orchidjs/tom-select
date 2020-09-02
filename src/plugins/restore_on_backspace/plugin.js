/**
 * Plugin: "restore_on_backspace" (selectize.js)
 * Copyright (c) 2013 Brian Reavis & contributors
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
 * @author Brian Reavis <brian@thirdroute.com>
 */

Selectize.define('restore_on_backspace', function(options) {
	var self = this;

	options.text = options.text || function(option) {
		return option[self.settings.labelField];
	};

	self.hook('instead','onKeyDown',function(orig_args, orig_keydown){
		var index, option;
		var evt = orig_args[0];
		if (evt.keyCode === KEY_BACKSPACE && self.control_input.value === '' && !self.activeItems.length) {
			index = self.caretPos - 1;
			if (index >= 0 && index < self.items.length) {
				option = self.options[self.items[index]];
				if (self.deleteSelection(evt)) {
					self.setTextboxValue(options.text.apply(self, [option]));
					self.refreshOptions(true);
				}
				evt.preventDefault();
				return;
			}
		}
		return orig_keydown.apply(self, orig_args);
	});

});
