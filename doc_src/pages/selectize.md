---
title: selectize.js
tags: docs
---

Orchid Select was forked from selectize.js to provide the same usability without the need for jQuery or any other JavaScript framework.


## New
- support for external control input
- dropdownParent other than 'body'
- no_backspace_delete plugin

## Performance and Usability
- framework agnostic (doesn't require jQuery, Vue or any other JavaScript framework)
- improved keyboard control of selected items
- improved option cache to reduce dom manipulation during searches
- replaced javascript scrolling for dropdown with css scrolling
- ctrl/shift/cmd key detection
- moved autogrow functionality to input_autogrow plugin
- integrated hook system into Selectize class hook('before','onKeyUp',function(){ ... });

## Development
- scss instead of less
	- autoprefixer
	- nanocss
- examples and documentation generated using 11ty
- babel compiler
- gulp instead of grunt?

## Removed
- support for older browsers ES5
- placeholder show/hide

## Breaking
- dataAttr defaults to null instead of "data-data"

## Issues / Pull requests
- selectize/selectize.js#1363 Autofill disable possibility
- selectize/selectize.js#1447 Enhancement - dropdownParent
- selectize/selectize.js#1279 Adding ability to use load to init opt groups
- selectize/selectize.js#838 Add option to disable delete on backspace (no_backspace_delete plugin)
- selectize/selectize.js#239 Preserve custom HTML5 data attributes
- selectize/selectize.js#1128 Duplicated options in different optgroups doesn't render correctly
