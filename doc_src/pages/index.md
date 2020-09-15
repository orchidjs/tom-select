
<h1 class="display-3 mt-0">Orchid Select</h1>


[![NPM version](http://img.shields.io/npm/v/selectize.svg?style=flat)](https://www.npmjs.org/package/selectize)
[![CDNJS version](http://img.shields.io/cdnjs/v/selectize.js.svg?style=flat)](https://cdnjs.com/libraries/selectize.js)
[![Build Status](https://travis-ci.org/OrchidJS/Orchid-Select.svg?branch=master)](https://travis-ci.org/OrchidJS/Orchid-Select)
[![Coverage Status](https://coveralls.io/repos/github/OrchidJS/Orchid-Select/badge.svg?branch=master)](https://coveralls.io/github/OrchidJS/Orchid-Select?branch=master)
[![dependencies Status](https://david-dm.org/orchidjs/orchid-select/status.svg)](https://david-dm.org/orchidjs/orchid-select)

<div class="lead my-4">
Orchid Select is an extensible and dynamic &lt;select&gt; UI control.
With autocomplete and native-feeling keyboard navigation, it's useful for tagging, contact lists, country selectors, and so on.
Orchid Select was forked from <a href="https://github.com/selectize/selectize.js">selectize.js</a> to provide the same powerful UI and API but with a framework agnostic design.
</div>

<div class="w-50 mx-auto">
<h3>Example</h3>
<link rel="stylesheet" href="/css/selectize.bootstrap4.css">
<select id="select-tags" multiple autocomplete="off" placeholder="How cool is this?">
	<option selected>Awesome</option>
	<option selected>Neat</option>
	<option>Meh</option>
	<option>Terrible</option>
</select>
<script>
new Selectize("#select-tags",{
persist: false,
createOnBlur: true,
create: true
});
</script>
</div>


## Features

- **Smart Option Searching / Ranking**<br>Options are efficiently scored and sorted on-the-fly (using [sifter](https://github.com/brianreavis/sifter.js)). Want to search an item's title *and* description? No problem.
- **Caret between items**<br>Order matters sometimes. Use the <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> arrow keys to move between selected items.</li>
- **Select &amp; delete multiple items at once**<br>Hold down <kbd>option</kbd> on Mac or <kbd>ctrl</kbd> on Windows to select more than one item to delete.
- **Díåcritîçs supported**<br>Great for international environments.
- **Item creation**<br>Allow users to create items on the fly (async saving is supported; the control locks until the callback is fired).
- **Remote data loading**<br>For when you have thousands of options and want them provided by the server as the user types.
- **Clean API &amp; code**<br>Interface with it and make modifications easily. Pull requests welcome!
- **Extensible**<br> [Plugin API](docs/plugins.md) for developing custom features (uses [microplugin](https://github.com/brianreavis/microplugin.js)).
- **Touch Support**<br> Plays nice with iOS 5+ devices.

## Usage

```html
<input id="selectize-it" />
<link rel="stylesheet" href="/css/selectize.default.css">
<script src="/js/selectize.complete.js"></script>
<script>
var options = {};
new Selectize('#selectize-it',{});
</script>
```

The available options are [documented here](usage.md).


## Installation and files

All pre-built files needed to use Orchid Select can be found in the ["dist"](https://github.com/orchidjs/orchid-select/tree/master/dist) folder and at [cdnjs](https://cdnjs.com/libraries/selectize.js).


- [**JavaScript**](https://github.com/orchidjs/orchid-select/tree/master/dist/js)
	- [selectize.complete.js](https://github.com/orchidjs/orchid-select/tree/master/dist/js/selectize.complete.js) — Includes dependencies and plugins
	- [selectize.js](https://github.com/orchidjs/orchid-select/tree/master/dist/js/selectize.js) — Does not include sifter or microplugin
- **Themes**
	- [CSS](https://github.com/orchidjs/orchid-select/tree/master/dist/css) — Compiled themes
	- [SCSS](https://github.com/orchidjs/orchid-select/tree/master/dist/scss) — Uncompiled theme sources


## Custom Builds

By default, all [plugins](src/plugins) are included. To hand-pick what plugins (if any) to include, run [`grunt`](http://gruntjs.com/) with the "--plugins" flag. After this completes, grab the files you need from the "build" folder.

```shell
# dependencies
yarn install --production=false

# build selectize
grunt --plugins=
grunt --plugins=*
grunt --plugins=remove_button,restore_on_backspace
```


## License

Copyright &copy; 2013–2020 [Contributors](https://github.com/selectize/selectize.js/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
