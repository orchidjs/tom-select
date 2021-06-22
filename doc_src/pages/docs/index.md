---
title: Usage Documentation
tags: docs
---

```html
<script src="tom-select.complete.js"></script>
<link href="tom-select.bootstrap4.css" rel="stylesheet" />
<input id="select" />
<script>
var config = {};
new TomSelect('#select',config);
</script>
```

### Glossary

- Config / configuration: settings passed to the object constructor
- Settings: the current settings. Accessible with the `settings` property of the select object.
- Options: the list of objects to display.
  Each object must have a property with an unique **value** to identify the option; the property name is defined by the `valueField` setting.
  Option objects must also have a property with the **label** to display (as tag, in the drop down, etc.); the property name is defined by the `labelField` setting.
  The options can have other properties, ignored, unless referenced by other settings, like `sortField` or `searchField`.
- Items: the list of selected options. Or more exactly, the list of the values of the selected options.

## General Configuration

<table class="table table-striped">
	<thead>
	<tr>
		<th>Setting</a></th>
		<th>Description</th>
		<th>Type</th>
		<th>Default</th>
	</tr>
	</thead>

<tr>
<td><code>options</code></td>
<td>
By default this is populated from the original &lt;input&gt; or &lt;select&gt;
element.

```js
options: [
	{ value: "opt1", text: "Option 1" },
	{ value: "opt2", text: "Option 2" },
]
```
</td>
<td><code>array</code></td>
<td><code>[]</code></td>
</tr>


<tr><td><code>items</code></td>
<td>An array of the initial selected values. By default this is populated from the original input element.

```js
items: ["opt1"]
```
</td>
<td><code>array</code></td>
<td><code>[]</code></td>
</tr>


<tr>
	<td><code>create</code></td>
	<td>Determines if the user is allowed to create new items that aren't in the
		initial list of options. This setting can be any of the
		following: <code>true</code>, <code>false</code>, or a function.

```js
create: true
```

```js
create: function(input){
	return {value:input,text:input}
}
```

```js
create: function(input,callback){
	callback({value:input,text:input});
}
```
</td>
<td><code>boolean/function</code></td>
<td><code>false</code></td>
</tr>


<tr>
	<td><code>createOnBlur</code></td>
	<td>
		If true, when user exits the field (clicks outside of input), a new option is created and selected (if <code>create</code> setting is enabled).
	<td><code>boolean</code></td>
	<td><code>false</code></td>
</tr>


<tr>
	<td><code>createFilter</code></td>
	<td>
		Specifies a RegExp or a string containing a regular expression that the current search filter must match to be allowed to be created. May also be a predicate function that takes the filter text and returns whether it is allowed.</td>
	<td><code>RegExp|string|function</code></td>
	<td><code>null</code></td>
</tr>


<tr>
	<td><code>delimiter</code></td>
	<td>The string to separate items by. When typing an item in a multi-selection control allowing creation, then the delimiter, the item is added. If you paste delimiter-separated items in such control, the items are added at once. The delimiter is also used in the <code>getValue</code> API call on a text &lt;input&gt; tag to separate the multiple values.</td>
	<td><code>string</code></td>
	<td><code>','</code></td>
</tr>


<tr>
	<td><code>highlight</code></td>
	<td>Toggles match highlighting within the dropdown menu.</td>
	<td><code>boolean</code></td>
	<td><code>true</code></td>
</tr>
	<tr>
		<td><code>persist</code></td>
		<td>If false, items created by the user will not show up as available options once they are unselected.</td>
		<td><code>boolean</code></td>
		<td><code>true</code></td>
	</tr>
	<tr>
		<td><code>openOnFocus</code></td>
		<td>Show the dropdown immediately when the control receives focus.</td>
		<td><code>boolean</code></td>
		<td><code>true</code></td>
	</tr>
	<tr>
		<td><code>maxOptions</code></td>
		<td>The max number of options to display in the dropdown.</td>
		<td><code>int</code></td>
		<td><code>50</code></td>
	</tr>
	<tr name="maxItems">
		<td><code>maxItems</code></td>
		<td>The max number of items the user can select. 1 makes the control mono-selection, null allows an unlimited number of items.</td>
		<td><code>int</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>hideSelected</code></td>
		<td>If true, the items that are currently selected will not be shown in the dropdown list of available options. This defaults to <code>true</code> when in a multi-selection control, to <code>false</code> otherwise.</td>
		<td><code>boolean</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>closeAfterSelect</code></td>
		<td>If true, the dropdown will be closed after a selection is made.</td>
		<td><code>boolean</code></td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>allowEmptyOption</code></td>
		<td>If true, any options with a "" value will be treated like normal. This defaults to false to accommodate the common &lt;select&gt; practice of having the first empty option to act as a placeholder.</td>
		<td><code>boolean</code></td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>loadThrottle</code></td>
		<td>The number of milliseconds to wait before requesting options from the server or null. If null, throttling is disabled. Useful when loading options dynamically while the user types a search / filter expression.</td>
		<td><code>int</code></td>
		<td><code>300</code></td>
	</tr>
	<tr>
		<td><code>loadingClass</code></td>
		<td>The class name added to the wrapper element while awaiting the fulfillment of load requests.</td>
		<td><code>string</code></td>
		<td><code>'loading'</code></td>
	</tr>
	<tr>
		<td><code>placeholder</code></td>
		<td>The placeholder of the control. Defaults to input element's placeholder, unless this one is specified.</td>
		<td><code>string</code></td>
		<td><code>undefined</code></td>
	</tr>
	<tr>
		<td><code>hidePlaceholder</code></td>
		<td>If true, the placeholder will be hidden when the control has one or more items (selected options) and is not focused.
		This defaults to <code>false</code> when in a multi-selection control, and to <code>true</code> otherwise.</td>
		<td><code>boolean</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>preload</code></td>
		<td>If true, the <code>load</code> function will be called upon control initialization (with an empty search). Alternatively it can be set to <code>'focus'</code> to call the <code>load</code> function when control receives focus.</td>
		<td><code>boolean/string</code></td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>dropdownParent</code></td>
		<td>The element the dropdown menu is appended to. If null, the dropdown will be appended as a child of the control.</td>
		<td><code>string</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>addPrecedence</code></td>
		<td>If true, the "Add..." option is the default selection in the dropdown.</td>
		<td><code>boolean</code></td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>selectOnTab</code></td>
		<td>If true, the tab key will choose the currently selected item.</td>
		<td><code>boolean</code></td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>diacritics</code></td>
		<td>Enable or disable international character support.</td>
		<td><code>boolean</code></td>
		<td><code>true</code></td>
	</tr>
	<tr>
		<td><code>controlInput</code></td>
		<td>Supply a custom &lt;input&gt; element</td>
		<td><code>&lt;input&gt; element</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>duplicates</code></td>
		<td>Allow selecting the same option more than once. <code>hideSelected</code> should also be set to false.</td>
		<td><code>boolean</td>
		<td><code>false</code></td>
	</tr>
</table>

## Data / Searching

<table class="table table-striped">
<thead>
	<tr>
		<th>Setting</a></th>
		<th>Description</th>
		<th>Type</th>
		<th>Default</th>
	</tr>
</thead>
	<tr>
		<td><code>options</code></td>
		<td>See above</td>
		<td><code>array</code></td>
		<td><code>[]</code></td>
	</tr>
	<tr>
		<td><code>optgroups</code></td>
		<td>
			Option groups that options will be bucketed into. If your
			element is a &lt;select&gt; with &lt;optgroup&gt;s this
			property gets populated automatically. Make sure each object
			in the array has a property named whatever
			<code>optgroupValueField</code> is set to.
		</td>
		<td><code>array</code></td>
		<td><code>[]</code></td>
	</tr>
	<tr>
		<td><code>dataAttr</code></td>
		<td>The &lt;option&gt; attribute from which to read JSON data about the option.</td>
		<td><code>string</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>valueField</code></td>
		<td>The name of the property to use as the <code>value</code> when an item is selected.</td>
		<td><code>string</code></td>
		<td><code>'value'</code></td>
	</tr>
	<tr>
		<td><code>optgroupValueField</code></td>
		<td>The name of the option group property that serves as its unique identifier.</td>
		<td><code>string</code></td>
		<td><code>'value'</code></td>
	</tr>
	<tr>
		<td><code>labelField</code></td>
		<td>The name of the property to render as an option / item label (not needed when custom rendering functions are defined).</td>
		<td><code>string</code></td>
		<td><code>'text'</code></td>
	</tr>
	<tr>
		<td><code>optgroupLabelField</code></td>
		<td>The name of the property to render as an option group label (not needed when custom rendering functions are defined).</td>
		<td><code>string</code></td>
		<td><code>'label'</code></td>
	</tr>
	<tr>
		<td><code>optgroupField</code></td>
		<td>The name of the property to group items by.</td>
		<td><code>string</code></td>
		<td><code>'optgroup'</code></td>
	</tr>
	<tr>
		<td><code>disabledField</code></td>
		<td>The name of the property to disabled option and optgroup.</td>
		<td><code>string</code></td>
		<td><code>'disabled'</code></td>
	</tr>
	<tr>
		<td><code>sortField</code></td>
		<td>
			<p>A single field or an array of fields to sort by. Each item in the array should be an object containing at least a <code>field</code> property. Optionally, <code>direction</code> can be set to <code>'asc'</code> or <code>'desc'</code>. The order of the array defines the sort precedence.</p>
			<p>Unless present, a special `$score` field will be automatically added to the beginning of the sort list. This will make results sorted primarily by match quality (descending).</p>
			<p>You can override the `$score` function. For more information, see the <a href="https://github.com/orchidjs/sifter.js#sifterjs">sifter documentation</a>.</p>
		</td>
		<td><code>string|array</code></td>
		<td><code>'$order'</code></td>
	</tr>
	<tr>
		<td><code>searchField</td>
		<td>An array of property names to analyze when filtering options.

```js
searchField: ['text','text2']
```

Weights can be given to each field to improve search results

```js
searchField: [{field:'text',weight:2},{field:'text2',weight:0.5}]
```

</td>
		<td><code>array</code></td>
		<td><code>['text']</code></td>
	</tr>
	<tr>
		<td><code>searchConjunction</td>
		<td>When searching for multiple terms (separated by space), this is the operator used. Can be <code>'and'</code> or <code>'or'</code> .</td>
		<td><code>string</code></td>
		<td><code>'and'</code></td>
	</tr>
	<tr>
		<td><code>lockOptgroupOrder</td>
		<td>If truthy, all optgroups will be displayed in the same order as they were added (by the `$order` property). Otherwise, it will order based on the score of the results in each.</td>
		<td><code>boolean</code></td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>copyClassesToDropdown</code></td>
		<td>Copy the original input classes to the dropdown element.</td>
		<td><code>boolean</code></td>
		<td><code>true</code></td>
	</tr>
</table>

## Callbacks


```js
new TomSelect('#select',{
	onInitialize:function(){
		// the onInitialize callback is invoked once the control is completely initialized.
	}
});
```

<table class="table table-striped">
<thead>
	<tr>
		<th>Setting</a></th>
		<th>Description</th>
	</tr>
</thead>
	<tr>
		<td><code>load(query, callback)</code></td>
		<td>Invoked when new options should be loaded from the server. Called with the current query string and a callback function to call with the results when they are loaded (or nothing when an error arises).
		<a href="/examples/remote">Remote data examples</a></td>
	</tr>
	<tr>
		<td><code>shouldLoad(query)</code></td>
		<td>Use the <code>shouldLoad()</code> callback to implement minimum input length or other input validation.
		If the callback returns false, <code>load()</code> will not be called and the <code>not_loading</code> template will be added to the dropdown instead of the <code>loading</code> or <code>no_results</code> templates.
		</td>
	</tr>
	<tr>
		<td><code>score(search)</code></td>
		<td>Overrides the scoring function used to sort available options.
		The provided function should return a <strong>function</strong> that returns a number greater than or equal to zero to represent the <code>score</code> of an item (the function's first argument).
		If 0, the option is declared not a match.
		See the <a href="/examples/remote/">remote data examples</a> for a sample implementation.</td>
	</tr>
	<tr>
		<td><code>onInitialize()</code></td>
		<td>Invoked once the control is completely initialized.</td>
	</tr>
	<tr>
		<td><code>onFocus()</code></td>
		<td>Invoked when the control gains focus.</td>
	</tr>
	<tr>
		<td><code>onBlur()</code></td>
		<td>Invoked when the control loses focus.</td>
	</tr>
	<tr>
		<td><code>onChange(value)</code></td>
		<td>Invoked when the value of the control changes.</td>
	</tr>
	<tr>
		<td><code>onItemAdd(value, $item)</code></td>
		<td>Invoked when an item is selected.</td>
	</tr>
	<tr>
		<td><code>onItemRemove(value)</code></td>
		<td>Invoked when an item is deselected.</td>
	</tr>
	<tr>
		<td><code>onClear()</code></td>
		<td>Invoked when the control is manually cleared via the clear() method.</td>
	</tr>
	<tr>
		<td><code>onDelete(values, event)</code></td>
		<td>Invoked when the user attempts to delete the current selection. Selected items will not be deleted if the callback returns <code>false</code>.</td>
	</tr>
	<tr>
		<td><code>onOptionAdd(value, data)</code></td>
		<td>Invoked when a new option is added to the available options list.</td>
	</tr>
	<tr>
		<td><code>onOptionRemove(value)</code></td>
		<td>Invoked when an option is removed from the available options.</td>
	</tr>
	<tr>
		<td><code>onDropdownOpen(dropdown)</code></td>
		<td>Invoked when the dropdown opens.</td>
	</tr>
	<tr>
		<td><code>onDropdownClose(dropdown)</code></td>
		<td>Invoked when the dropdown closes.</td>
	</tr>
	<tr>
		<td><code>onType(str)</code></td>
		<td>Invoked when the user types while filtering options.</td>
	</tr>
	<tr>
		<td><code>onLoad(options, optgroup)</code></td>
		<td>Invoked when new options have been loaded and added to the control (via the <code>load</code> option or <code>load</code> API method).</td>
	</tr>
</table>

## Render Templates

Nearly every piece of HTML in Tom Select is customizable with a render template.
Each template is defined by a function that is passed two arguments (<code>data</code> and <code>escape</code>) and returns HTML (string or DOM element) with a single root element. The <code>escape</code> argument is a function that takes a string and escapes all special HTML characters. This is very important to use to prevent XSS vulnerabilities.

```js
new TomSelect('#input',{
	optionClass: 'option',
	itemClass: 'item',
	render:{
		option: function(data, escape) {
			return '<div>' + escape(data.text) + '</div>';
		},
		item: function(data, escape) {
			return '<div>' + escape(data.text) + '</div>';
		},
		option_create: function(data, escape) {
			return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
		},
		no_results:function(data,escape){
			return '<div class="no-results">No results found for "'+escape(data.input)+'"</div>';
		},
		not_loading:function(data,escape){
			// no default content
		},
		optgroup: function(data) {
			let optgroup = document.createElement('div');
			optgroup.className = 'optgroup';
			optgroup.appendChild(data.options);
			return optgroup;
		},
		optgroup_header: function(data, escape) {
			return '<div class="optgroup-header">' + escape(data.label) + '</div>';
		},
		loading:function(data,escape){
			return '<div class="spinner"></div>';
		},
		dropdown:function(){
			return '<div></div>';
		}
	}
});
```

<table class="table table-striped">
<thead>
	<tr>
		<th>Setting</a></th>
		<th>Description</th>
		<th>Type</th>
		<th>Default</th>
	</tr>
</thead>
	<tr>
		<td><code>render.option</code></td>
		<td>An option in the dropdown list of available options.</td>
		<td><code>function</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>render.item</code></td>
		<td>An item the user has selected.</td>
		<td><code>function</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>render.option_create</code></td>
		<td>The "create new" option at the bottom of the dropdown. The data contains one property: <code>input</code> (which is what the user has typed).</td>
		<td><code>function</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>render.optgroup_header</code></td>
		<td>The header of an option group.</td>
		<td><code>function</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>render.optgroup</code></td>
		<td>The wrapper for an optgroup. The <code>html</code> property in the data will be the raw html of the optgroup's header and options.</td>
		<td><code>function</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>render.no_results</code></td>
		<td>Displayed when no options are found matching a user's search. Can be set to null to disable displaying a "no results found" message.</td>
		<td><code>function</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>render.loading</code></td>
		<td>Displayed when the load() method is called and hidden once results are returned.</td>
		<td><code>function</code></td>
		<td><code>null</code></td>
	</tr>
	<tr>
		<td><code>render.dropdown</code></td>
		<td>Where dropdown content will be displayed.</td>
		<td><code>function</code></td>
		<td><code>null</code></td>
	</tr>
</table>
