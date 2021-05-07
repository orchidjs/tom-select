---
title: selectize.js
tags: docs
---

<div class="lead">
Tom Select was forked from <a href="https://github.com/selectize/selectize.js">selectize.js</a> with four main objectives: modernizing the code base, decoupling from jQuery, expanding functionality, and addressing issue backlogs.
</div>

## Highlights as of v1.1.0

### New
- support for external control input
- dropdownParent other than 'body'
- no_backspace_delete plugin
- framework agnostic design (works without jQuery or any other JavaScript framework)
- improved keyboard control of selected items
- improved option cache to reduce dom manipulation during searches
- animated scrolling with css instead of JavaScript
- improved ctrl/shift/cmd key detection
- autogrow functionality moved to input_autogrow plugin
- [integrated plugin hooks](plugins.md)


### Fixed
- [#1363](https://github.com/selectize/selectize.js/issues/1363) Autofill disable possibility
- [#1447](https://github.com/selectize/selectize.js/issues/1447) Enhancement - dropdownParent
- [#1279](https://github.com/selectize/selectize.js/issues/1279) Adding ability to use load to init opt groups
- [#838](https://github.com/selectize/selectize.js/issues/838) Add option to disable delete on backspace (no_backspace_delete plugin)
- [#239](https://github.com/selectize/selectize.js/issues/239) Preserve custom HTML5 data attributes
- [#1128](https://github.com/selectize/selectize.js/issues/1128) Duplicated options in different optgroups doesn't render correctly
- [#129](https://github.com/selectize/selectize.js/issues/129) Allow duplicate values in an input
- [#470](https://github.com/selectize/selectize.js/issues/470) "No results found" message
- [#999](https://github.com/selectize/selectize.js/issues/999) Don't clear the text box value on blur
- [#1104](https://github.com/selectize/selectize.js/issues/1104) Replace values in single-item selection
- [#1132](https://github.com/selectize/selectize.js/issues/1132) Can't enter 'ą' character in tags mode
- [#102](https://github.com/selectize/selectize.js/issues/102) Listen to original select changes (via 'change_listener' plugin)
- [#905](https://github.com/selectize/selectize.js/issues/905) Support for Bootstrap 4


### Breaking Changes
- .ts-* css class names instead of .selectize-* (customizable with scss & js)
- scss instead of less
- dataAttr defaults to null instead of "data-data"
- options must be appended to optgroup within custom optgroup template
- removed support for older browsers including IE11


### Development Environment
- code converted to <a href="https://www.typescriptlang.org/">TypeScript</a> (Tom Select 1.1+)
- compiled with <a href="https://babeljs.io/">Babel</a>
- bundled with <a href="https://rollupjs.org/guide/en/">rollup.js</a>
- examples and documentation generated using <a href="https://www.11ty.dev/">11ty</a>
- tests run on <a href="https://automate.browserstack.com/dashboard/v2/public-build/QXZ2Z2JUaUlSV2REcHRZYzIzQThxemRnNXNQZ0c3Lzh3d01FWE4vSk1oMD0tLVFFTGlUdmxaMWNIL3hCTUJXZk1qanc9PQ==--f7c82c941ca5c14a22f826b97bc02da17c071d5e">Browserstack</a>
