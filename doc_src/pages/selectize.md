---
title: selectize.js
tags: docs
---

Orchid Select is a fork of selectize.js 


## Features
- support for external control input
- dropdownParent other than 'body'
- disableActiveItems setting can be used to disable deleting selected items with backspace/delete keypresses

## Performance and Usability
- framework agnostic (doesn't require jQuery, Vue or any other JavaScript framework)
- improved keyboard control of selected items
- improved option cache to reduce dom manipulation during searches
- replaced javascript scrolling for dropdown with css scrolling
- ctrl/shift/cmd key detection
- moved autogrow functionality to input_autogrow plugin
- integrated hook system into Selectize class hook('before','onKeyUp',function(){ ... });

## Removed
- support for older browsers -> ES5
- placeholder show/hide
