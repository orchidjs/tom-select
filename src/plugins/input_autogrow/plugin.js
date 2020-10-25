/**
 * Plugin: "input_autogrow" (Tom Select)
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

export default TomSelect.define('input_autogrow', function(options) {

	var self					= this;

	self.hook('after','setup',function(){


		var test_input				= document.createElement('span');
		var control					= this.control_input;
		test_input.style.position	= 'absolute';
		test_input.style.top		= '-99999px';
		test_input.style.left		= '-99999px';
		test_input.style.width		= 'auto';
		test_input.style.padding	= 0;
		test_input.style.whiteSpace	= 'pre';

		self.wrapper.appendChild(test_input);


		var transfer_styles			= [ 'letterSpacing', 'fontSize', 'fontFamily', 'fontWeight', 'textTransform' ];

		for( let i = 0, n = transfer_styles.length; i < n; i++ ){
			let style_name = transfer_styles[i];
			test_input.style[style_name] = control.style[style_name];
		}


		/**
		 * Set the control width
		 *
		 * @param {string} str
		 */
		var resize = function(){
			test_input.textContent	= control.value;
			control.style.width		= test_input.clientWidth+'px';
		};

		control.addEventListener('input', resize );
		control.addEventListener('keyup', resize );
		control.addEventListener('blur', resize );
		control.addEventListener('update', resize );
	});

});
