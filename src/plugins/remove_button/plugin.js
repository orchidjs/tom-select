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

TomSelect.define('remove_button', function(options) {

	options = Object.assign({
			label     : '&times;',
			title     : 'Remove',
			className : 'remove',
			append    : true
		}, options);


	//options.className = 'remove-single';
	var self			= this;

	// override the render method to add remove button to each item
	if( !options.append ){
		return;
	}

	var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';

	var orig_render = self.render;

	self.hook('instead','render',function( templateName, data){
		var rendered		= orig_render.apply(self,arguments);

		if( templateName == 'item' ){
			var close_button = getDom(html);
			rendered.appendChild(close_button);

			close_button.addEventListener('click',function(evt){
				evt.preventDefault();

				// propagating will trigger the dropdown to show for single mode
				if( self.settings.mode !== 'single' ){
					evt.stopPropagation();
				}

				if (self.isLocked) return;

				var value = rendered.dataset.value;
				self.removeItem(value);
			});
		}

		return rendered;
	});

});
