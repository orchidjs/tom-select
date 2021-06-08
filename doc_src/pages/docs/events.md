---
title: Events API
tags: docs
---

In the [usage documentation](/docs), a few callbacks are listed that
allow you to listen for certain events. Callbacks aren't always ideal though;
specifically when you wish to have multiple handlers.

Tom Select instances have a basic event emitter interface that mimics jQuery, Backbone.js, et al:

```js
var handler = function() { /* ... */ };
var select = new TomSelect('#input-id');
select.on('event_name', handler);
select.off('event_name');
select.off('event_name', handler);
```

### List of Events

<table class="table table-striped">
<thead>
	<tr>
		<th width="200px" align="left">Event</th>
		<th width="150px" align="left">Params</th>
		<th align="left">Description</th>
	</tr>
</thead>
	<tr>
		<td><code>"initialize"</code></td>
		<td></td>
		<td>Invoked once the control is completely initialized.</td>
	</tr>
	<tr>
		<td><code>"change"</code></td>
		<td><code>value</code></td>
		<td>Invoked when the value of the control changes.</td>
	</tr>
	<tr>
		<td><code>"focus"</code></td>
		<td></td>
		<td>Invoked when the control gains focus.</td>
	</tr>
	<tr>
		<td><code>"blur"</code></td>
		<td></td>
		<td>Invoked when the control loses focus.</td>
	</tr>
	<tr>
		<td><code>"item_add"</code></td>
		<td><code>value</code>, <code>item</code></td>
		<td>Invoked when an item is added (i.e., when an option is selected)</td>
	</tr>
	<tr>
		<td><code>"item_remove"</code></td>
		<td><code>value</code>, <code>$item</code></td>
		<td>Invoked when an item is deselected.</td>
	</tr>
	<tr>
		<td><code>"item_select"</code></td>
		<td><code>item</code></td>
		<td>Invoked when an item is selected.</td>
	</tr>
	<tr>
		<td><code>"clear"</code></td>
		<td></td>
		<td>Invoked when the control is manually cleared via the clear() method.</td>
	</tr>
	<tr>
		<td><code>"option_add"</code></td>
		<td><code>value</code>, <code>data</code></td>
		<td>Invoked when a new option is added to the available options list.</td>
	</tr>
	<tr>
		<td><code>"option_remove"</code></td>
		<td><code>value</code></td>
		<td>Invoked when an option is removed from the available options.</td>
	</tr>
    <tr>
        <td><code>"option_clear"</code></td>
        <td></td>
        <td>Invoked when all options are removed from the control.</td>
    </tr>
    <tr>
        <td><code>"optgroup_add"</code></td>
        <td><code>id</code>, <code>data</code></td>
        <td>Invoked when a new option is added to the available options list.</td>
    </tr>
    <tr>
        <td><code>"optgroup_remove"</code></td>
        <td><code>id</code></td>
        <td>Invoked when an option group is removed.</td>
    </tr>
    <tr>
        <td><code>"optgroup_clear"</code></td>
        <td></td>
        <td>Invoked when all option groups are removed.</td>
    </tr>
	<tr>
		<td><code>"dropdown_open"</code></td>
		<td><code>dropdown</code></td>
		<td>Invoked when the dropdown opens.</td>
	</tr>
	<tr>
		<td><code>"dropdown_close"</code></td>
		<td><code>dropdown</code></td>
		<td>Invoked when the dropdown closes.</td>
	</tr>
	<tr>
		<td><code>"type"</code></td>
		<td><code>str</code></td>
		<td>Invoked when the user types while filtering options.</td>
	</tr>
	<tr>
		<td><code>"load"</code></td>
		<td><code>data</code></td>
		<td>Invoked when new options have been loaded and added to the control (via the <code>load</code>  option or <code>load</code>  API method).</td>
	</tr>
	<tr>
		<td><code>"destroy"</code></td>
		<td></td>
		<td>Invoked right before the control is destroyed.</td>
	</tr>
</table>
