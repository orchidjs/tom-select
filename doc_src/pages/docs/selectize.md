---
title: selectize.js
tags: docs
---

Tom Select was forked from selectize.js to provide the same usability without the need for jQuery or any other JavaScript framework.


## New Features
- support for external control input
- dropdownParent other than 'body'
- no_backspace_delete plugin

## Performance and Usability
- framework agnostic (doesn't require jQuery, Vue or any other JavaScript framework)
- improved keyboard control of selected items
- improved option cache to reduce dom manipulation during searches
- animated scrolling with css instead of JavaScript
- ctrl/shift/cmd key detection
- moved autogrow functionality to input_autogrow plugin
- [integrated plugin hooks](plugins.md)

## Breaking Changes
- removed support for older browsers ES5
- removed placeholder show/hide
- dataAttr defaults to null instead of "data-data"
- options are appended to optgroup template programmatically
- .tomselect-* css class names (customizable with scss)
- scss instead of less
	- autoprefixer
	- nanocss

## Issues / Pull requests
- selectize/selectize.js#1363 Autofill disable possibility
- selectize/selectize.js#1447 Enhancement - dropdownParent
- selectize/selectize.js#1279 Adding ability to use load to init opt groups
- selectize/selectize.js#838 Add option to disable delete on backspace (no_backspace_delete plugin)
- selectize/selectize.js#239 Preserve custom HTML5 data attributes
- selectize/selectize.js#1128 Duplicated options in different optgroups doesn't render correctly
- selectize/selectize.js#129 Allow duplicate values in an input
- selectize/selectize.js#470 "No results found" message


## Development
- examples and documentation generated using 11ty
- babel compiler
