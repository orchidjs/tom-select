/**
 * Plugin: "drag_drop" (Tom Select)
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
import { TomOption, TomItem } from '../../types/index.ts';
import { escape_html, preventDefault } from '../../utils.ts';
import { getDom, setAttr } from '../../vanilla.ts';
import {DIOptions} from './types.ts';


const insertAfter = (referenceNode:Element, newNode:Element) => {
	referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}

const insertBefore = (referenceNode:Element, newNode:Element) => {
	referenceNode.parentNode?.insertBefore(newNode, referenceNode);
}

const isBefore = (referenceNode:Element|undefined|null, newNode:Element|undefined|null) =>{
	
	do{
		newNode = newNode?.previousElementSibling;

		if( referenceNode == newNode ){
			return true;
		}

	}while( newNode && newNode.previousElementSibling );

	return false;
}

export default function(this:TomSelect, options?: DIOptions) {
	var self = this;
	if (self.settings.mode !== 'multi') return;

	var orig_lock		= self.lock;
	var orig_unlock		= self.unlock;
	let sortable = true;
	let drag_item:TomItem|undefined;

	const updateValuesByItemsOrder = () => {
		const values:string[] = [];
		self.control.querySelectorAll(`[data-value]`).forEach((el:Element)=> {
			if( (<HTMLOptionElement>el).dataset.value ){
				let value = (<HTMLOptionElement>el).dataset.value;
				if( value ){
					values.push(value);
				}
			}
		});

		self.setValue(values);
	}

	/**
	 * Add draggable attribute to item
	 */
	self.hook('after','setupTemplates',() => {
		var orig_render_item = self.settings.render.item;

		self.settings.render.item = (data:TomOption, escape:typeof escape_html) => {
			const item = getDom(orig_render_item.call(self, data, escape)) as TomItem;

			if (options?.dragDropIcon) {
				item.insertAdjacentHTML('afterbegin', options.dragDropIcon);
			}

			setAttr(item,{'draggable':'true'});


			// prevent doc_mousedown (see tom-select.ts)
			const mousedown = (evt:Event) => {
				if( !sortable ) preventDefault(evt);
				evt.stopPropagation();
			}

			const dragStart = (evt: DragEvent) => {
				drag_item = item;
				if (evt.dataTransfer) {
					evt.dataTransfer.effectAllowed = 'move';
					evt.dataTransfer.setData("text", data.value)
				}
				
				setTimeout(() => {
					item.classList.add('ts-dragging');
				}, 0);
				
			}

			const dragOver = (evt: DragEvent) =>{
				evt.preventDefault();
				if (evt.dataTransfer) {
					evt.dataTransfer.dropEffect = 'move';
				}
				item.classList.add('ts-drag-over');
				moveitem(item,drag_item);
			}

			const dragLeave = () => {
				item.classList.remove('ts-drag-over');
			}

			const moveitem = (targetitem:TomItem, dragitem:TomItem|undefined) => {
				if( dragitem === undefined ) return;
				
				if( isBefore(dragitem,item) ){
					insertAfter(targetitem,dragitem);
				}else{
					insertBefore(targetitem,dragitem);
				}
			}

			const dragend = () => {
				document.querySelectorAll('.ts-drag-over').forEach(el=> el.classList.remove('ts-drag-over'));
				drag_item?.classList.remove('ts-dragging');
				drag_item = undefined;

				updateValuesByItemsOrder();
			}

			item.addEventListener('mousedown', mousedown);
			item.addEventListener('dragstart', dragStart);
			item.addEventListener('dragenter', dragOver)
			item.addEventListener('dragover', dragOver);
			item.addEventListener('dragleave', dragLeave);
			item.addEventListener('dragend', dragend);

			return item;
		}	
	});



	self.hook('instead','lock',()=>{
		sortable = false;
		return orig_lock.call(self);
	});

	self.hook('instead','unlock',()=>{
		sortable = true;
		return orig_unlock.call(self);
	});

	self.on('initialize', () => {
		// prevent browser from default drop action
		self.control.addEventListener('drop', evt => evt.preventDefault());

		self.control.addEventListener('keydown', (evt: KeyboardEvent) => {
			const activeItem: TomItem | undefined = self.activeItems[0];
			let targetItem: Element | null = null;

			if (activeItem) {
				if (evt.key === 'ArrowLeft') {
					targetItem = activeItem.previousElementSibling;
				} else if (evt.key === 'ArrowRight') {
					targetItem = activeItem.nextElementSibling;
				}

				if (targetItem && targetItem.hasAttribute('draggable')) {
					if (isBefore(activeItem, targetItem)) {
						insertAfter(targetItem, activeItem);
					} else {
						insertBefore(targetItem, activeItem);
					}

					updateValuesByItemsOrder();
				}
			}
		});
	});
};
