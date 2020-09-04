/**
 * Plugin: "drag_drop" (selectize.js)
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
 */

Selectize.define('drag_drop', function(options) {
	if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
	if (this.settings.mode !== 'multi') return;
	var self = this;

	var orig_lock		= self.lock;
	var orig_unlock		= self.unlock;

	self.hook('instead','lock',function(){
		var sortable = self.control.dataset.sortable;
		if (sortable) sortable.disable();
		return orig_lock.apply(self, arguments);
	});

	self.hook('instead','unlock',function(){
		var sortable = self.control.dataset.sortable;
		if (sortable) sortable.enable();
		return orig_unlock.apply(self, arguments);
	});

	self.hook('after','setup',function(){
		var $control = $(self.control).sortable({
			items: '[data-value]',
			forcePlaceholderSize: true,
			disabled: self.isLocked,
			start: function(e, ui) {
				ui.placeholder.css('width', ui.helper.css('width'));
				$control.css({overflow: 'visible'});
			},
			stop: function() {
				$control.css({overflow: 'hidden'});

				var values = [];
				$control.children('[data-value]').each(function() {
					values.push($(this).attr('data-value'));
				});

				self.setValue(values);
			}
		});

	});

});
