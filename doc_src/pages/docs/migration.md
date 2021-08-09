---
title: Migrating to v2
tags: docs
---

Review changes to the Tom Select API to help you migrate from v1 to v2.

## Core
* Caret position functionality (using <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> arrow keys to move between selected items) moved to caret_position plugin
* ```addOption()``` no longer treats new options as "user created" (see <a href="https://tom-select.js.org/docs/#persist">persist</a> option) by default. Use ```addOption(option, true)``` for registering user created options.
* Closing control via <kbd>esc</kbd> key, <kbd>enter</kbd>, etc no longer blurs focus to maintain keyboard control
* Added sync() method
* Original &lt;input&gt; or &lt;select&gt; element uses 'hidden-accessible' styling instead of 'hidden'
* controlInput=null instead of controlInput='&lt;input&gt;' for hidden control input
* Deprecated isInvalid. Use isValid instead

## CSS
* Renamed ```.ts-control``` to ```.ts-wrapper``` to align css class with name in JavaScript
* Renamed ```.ts-input``` to ```.ts-control``` to align css class with name in JavaScript
* Multiple CSS classes are now toggled on the wrapper element instead of the control element: ```.focus```, ```.disabled```, ```.required```, ```.invalid```, ```.locked```, ```.full```, ```.not-full```, ```.input-active```, ```.dropdown-active```, ```.has-options```, ```.has-items```
* Removed bootstrap3 style

## Options
* ```copyClassesToDropdown``` defaults to false
