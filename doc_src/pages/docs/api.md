---
title: API
tags: docs
---


Instances of Tom Select can be controlled programmatically via the methods described in this section.

```js
var control = tomSelect('#select');
control.addOption({value:'test'});
control.addItem('test');
```


## Option Methods

<table class="table table-striped">
	<tr>
		<th width="120px">Method</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><code>addOption(data)</code></td>
		<td>Adds an available option, or array of options. If it already exists, nothing will happen. Note: this does not refresh the options list dropdown (use refreshOptions() for that).</td>
	</tr>
	<tr>
		<td><code>updateOption(value, data)</code></td>
		<td>Updates an option available for selection. If it is visible in the selected items or options dropdown, it will be re-rendered automatically.</td>
	</tr>
	<tr>
		<td><code>removeOption(value)</code></td>
		<td>Removes the option identified by the given value.</td>
	</tr>
	<tr>
		<td><code>clearOptions()</code></td>
		<td>Removes all options from the control.</td>
	</tr>
	<tr>
		<td><code>getOption(value)</code></td>
		<td>Retrieves the dom element for the option identified by the given value.</td>
	</tr>
	<tr>
		<td><code>getAdjacent(dom_element, direction)</code></td>
		<td>Retrieves the dom element for the previous or next option, relative to the currently highlighted option. The <code>direction</code> argument should be 1 for "next" or -1 for "previous".</td>
	</tr>
	<tr>
		<td><code>refreshOptions(triggerDropdown)</code></td>
		<td>Refreshes the list of available options shown in the autocomplete dropdown menu.</td>
	</tr>
</table>

## Item Methods
<table class="table table-striped">
	<tr>
		<th width="120px">Method</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><code>clear(silent)</code></td>
		<td>Resets / clears all selected items from the control. If <code>silent</code> is truthy, no change event will be fired on the original input.</td>
	</tr>
	<tr>
		<td><code>getItem(value)</code></td>
		<td>Returns the dom element of the item matching the given value.</td>
	</tr>
	<tr>
		<td><code>addItem(value, silent)</code></td>
		<td>"Selects" an item. Adds it to the list at the current caret position. If <code>silent</code> is truthy, no change event will be fired on the original input.</td>
	</tr>
	<tr>
		<td><code>removeItem(value, silent)</code></td>
		<td>Removes the selected item matching the provided value. If <code>silent</code> is truthy, no change event will be fired on the original input.</td>
	</tr>
	<tr>
		<td><code>createItem(value, [triggerDropdown], [callback])</code></td>
		<td>Invokes the <code>create</code> method provided in the settings that should provide the data for the new item, given the user input. Once this completes, it will be added to the item list.</td>
	</tr>
	<tr>
		<td><code>refreshItems()</code></td>
		<td>Re-renders the selected item lists.</td>
	</tr>
</table>

## Optgroup Methods
<table class="table table-striped">
	<tr>
		<th width="120px">Method</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><code>addOptionGroup(id, data)</code></td>
		<td>Registers a new optgroup for options to be bucketed into. The <code>id</code> argument refers to a value of the property in option identified by the <code>optgroupField</code> setting.</td>
	</tr>
	<tr>
		<td><code>removeOptionGroup(id)</code></td>
		<td>Removes a single option group.</td>
	</tr>
	<tr>
		<td><code>clearOptionGroups()</code></td>
		<td>Removes all existing option groups.</td>
	</tr>
</table>

## Event Methods
<table class="table table-striped">
	<tr>
		<th width="120px">Method</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><code>on(event, handler)</code></td>
		<td>Adds an event listener.</td>
	</tr>
	<tr>
		<td><code>off(event, handler)</code></td>
		<td>Removes an event listener.</td>
	</tr>
	<tr>
		<td><code>off(event)</code></td>
		<td>Removes all event listeners.</td>
	</tr>
	<tr>
		<td><code>trigger(event, ...)</code></td>
		<td>Triggers event listeners.</td>
	</tr>
</table>

## Dropdown Methods
<table class="table table-striped">
	<tr>
		<th width="120px">Method</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><code>open()</code></td>
		<td>Shows the autocomplete dropdown containing the available options.</td>
	</tr>
	<tr>
		<td><code>close()</code></td>
		<td>Closes the autocomplete dropdown menu.</td>
	</tr>
	<tr>
		<td><code>positionDropdown()</code></td>
		<td>Calculates and applies the appropriate position of the dropdown.</td>
	</tr>
</table>

## Other Methods
<table class="table table-striped">
	<tr>
		<th width="120px">Method</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><code>destroy()</code></td>
		<td>Destroys the control and unbinds event listeners so that it can be garbage collected.</td>
	</tr>
	<tr>
		<td><code>load(fn)</code></td>
		<td>Loads options by invoking the provided function. The function should accept one argument (callback) and invoke the callback with the results once they are available.</td>
	</tr>
	<tr>
		<td><code>focus()</code></td>
		<td>Brings the control into focus.</td>
	</tr>
	<tr>
		<td><code>blur()</code></td>
		<td>Forces the control out of focus.</td>
	</tr>
	<tr>
		<td><code>lock()</code></td>
		<td>Disables user input on the control (note: the control can still receive focus).</td>
	</tr>
	<tr>
		<td><code>unlock()</code></td>
		<td>Re-enables user input on the control.</td>
	</tr>
	<tr>
		<td><code>disable()</code></td>
		<td>Disables user input on the control completely. While disabled, it cannot receive focus.</td>
	</tr>
	<tr>
		<td><code>enable()</code></td>
		<td>Enables the control so that it can respond to focus and user input.</td>
	</tr>
	<tr>
		<td><code>getValue()</code></td>
		<td>Returns the value of the control. If multiple items can be selected with a "select" input tag (e.g. <a href="/docs#maxItems">&lt;select multiple&gt;</a>), this returns an array. Otherwise, returns a string (separated by <code>delimiter</code> if "multiple").</td>
	</tr>
	<tr>
		<td><code>setValue(value, silent)</code></td>
		<td>Resets the selected items to the given value.</td>
	</tr>
	<tr>
		<td><code>setCaret(index)</code></td>
		<td>Moves the caret to the specified position (<code>index</code> being the index in the list of selected items).</td>
	</tr>
	<tr>
		<td><code>isFull()</code></td>
		<td>Returns whether or not the user can select more items.</td>
	</tr>
	<tr>
		<td><code>clearCache(template)</code></td>
		<td>Clears the render cache. Takes an optional template argument (e.g. <code>option</code> , <code>item</code>) to clear only that cache.</td>
	</tr>
	<tr>
		<td><code>updatePlaceholder()</code></td>
		<td>When the `settings.placeholder` value is changed, the new placeholder will be displayed.</td>
		<!-- Proposed change: accept an optional string. If given, just takes it to update the placeholder. Will avoid to refer to settings. -->
	</tr>
	<tr>
		<td><code>setTextboxValue(str)</code></td>
		<td>Sets the value of the input field.</td>
	</tr>
</table>

## Related Objects

#### Search

<table class="table table-striped">
	<tr>
		<th width="120px">Option</th>
		<th>Description</th>
		<th width="60px">Type</th>
	</tr>
	<tr>
		<td><code>options</code></td>
		<td>Original search options.</td>
		<td><code>object</code></td>
	</tr>
	<tr>
		<td><code>query</code></td>
		<td>The raw user input.</td>
		<td><code>string</code></td>
	</tr>
	<tr>
		<td><code>tokens</code></td>
		<td>An array containing parsed search tokens. A token is an object containing two properties: <code>string</code> and <code>regex</code> .</td>
		<td><code>array</code></td>
	</tr>
	<tr>
		<td><code>total</code></td>
		<td>The total number of results.</td>
		<td><code>int</code></td>
	</tr>
	<tr>
		<td><code>items</code></td>
		<td>A list of matched results. Each result is an object containing two properties: <code>score</code> and <code>id</code> .</td>
		<td><code>array</code></td>
	</tr>
</table>
