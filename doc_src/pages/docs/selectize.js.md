---
title: selectize.js
tags: docs
---

Tom Select was forked from <a href="https://github.com/selectize/selectize.js">selectize.js</a> to provide the same usability without the need for jQuery or any other JavaScript framework.


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
- [#1363](https://github.com/selectize/selectize.js/issues/1363) Autofill disable possibility
- [#1447](https://github.com/selectize/selectize.js/issues/1447) Enhancement - dropdownParent
- [#1279](https://github.com/selectize/selectize.js/issues/1279) Adding ability to use load to init opt groups
- [#838](https://github.com/selectize/selectize.js/issues/838) Add option to disable delete on backspace (no_backspace_delete plugin)
- [#239](https://github.com/selectize/selectize.js/issues/239) Preserve custom HTML5 data attributes
- [#1128](https://github.com/selectize/selectize.js/issues/1128) Duplicated options in different optgroups doesn't render correctly
- [#129](https://github.com/selectize/selectize.js/issues/129) Allow duplicate values in an input
- [#470](https://github.com/selectize/selectize.js/issues/470) "No results found" message
- [#999](https://github.com/selectize/selectize.js/issues/999) Don't clear the text box value on blur
- [#1104](https://github.com/selectize/selectize.js/issues/1104) Replace values in single-item selection #



## Development
- examples and documentation generated using 11ty
- babel compiler
