
<div class="text-center">
<h1 class="display-2 mt-5">Tom Select</h1>

<a href="https://github.com/orchidjs/tom-select" class="m-1 d-inline-block"><img alt="GitHub forks" src="https://img.shields.io/github/forks/orchidjs/tom-select?label=Github%20forks&style=for-the-badge&color=007ec6"></a>
<a href="https://www.npmjs.com/package/tom-select" class="m-1 d-inline-block"><img alt="npmjs.org" style="height:28px" src="https://img.shields.io/npm/v/tom-select.svg?style=for-the-badge&color=007ec6"></a>
<a href="https://travis-ci.org/orchidjs/tom-select" class="m-1 d-inline-block"><img alt="Travis.org" style="height:28px" src="https://img.shields.io/travis/orchidjs/tom-select?style=for-the-badge"></a>
<a href="https://coveralls.io/github/orchidjs/tom-select" class="m-1 d-inline-block"><img alt="Coveralls Coverage" style="height:28px" src="https://img.shields.io/coveralls/github/orchidjs/tom-select?color=4c1&style=for-the-badge"></a>
<a href="https://github.com/orchidjs/tom-select/issues" class="m-1 d-inline-block"><img alt="GitHub Issues" style="height:28px" src="https://img.shields.io/github/issues/orchidjs/tom-select?style=for-the-badge"></a>
</div>


<div class="row py-5">
<div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 mx-auto">
<h5 class="mt-3">Example</h5>
<link rel="stylesheet" href="/css/tom-select.bootstrap4.css">
<select id="select-tags" multiple placeholder="Best movies and TV shows">
	<option selected>Magnum P.I.</option>
	<option>Blue Bloods</option>
	<option>Quigley Down Under</option>
	<option>Three Men and a Baby</option>
	<option>Mr. Baseball</option>
</select>
<script>
tomSelect("#select-tags",{
	plugins: ['remove_button'],
	create: true,
});
</script>
</div>
</div>

<div class="lead my-5">
Tom Select is a versatile and dynamic &lt;select&gt; UI control.
With autocomplete and native-feeling keyboard navigation, it's useful for tagging, contact lists, country selectors, and so on.
Tom Select was forked from <a href="/docs/selectize.js/">selectize.js</a> to provide the same powerful UI and API but with a framework agnostic design.
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
<input id="tom-select-it" />
<link rel="stylesheet" href="/css/tom-select.default.css">
<script src="/js/tom-select.complete.js"></script>
<script>
var options = {};
tomSelect('#tom-select-it',options);
</script>
```

The available options are [documented here](docs).


## Installation and files

All pre-built files needed to use Tom Select can be found in the ["dist"](https://github.com/orchidjs/tom-select/tree/master/dist) folder

<!--and at [cdnjs](https://cdnjs.com/libraries/selectize.js). -->


- [**JavaScript**](https://github.com/orchidjs/tom-select/tree/master/dist/js)
	- [tom-select.complete.js](https://github.com/orchidjs/tom-select/tree/master/dist/js/tom-select.complete.js) — Includes dependencies and plugins
	- [tom-select.js](https://github.com/orchidjs/tom-select/tree/master/dist/js/tom-select.js) — Does not include sifter or microplugin
- **Themes**
	- [CSS](https://github.com/orchidjs/tom-select/tree/master/dist/css) — Compiled themes
	- [SCSS](https://github.com/orchidjs/tom-select/tree/master/dist/scss) — Uncompiled theme sources


## Custom Builds

By default, all [plugins](/docs/plugins.md) are included. To hand-pick what plugins (if any) to include, run [`grunt`](http://gruntjs.com/) with the "--plugins" flag. After this completes, grab the files you need from the "build" folder.

```shell
# dependencies
yarn install --production=false

# build tom-select
grunt --plugins=
grunt --plugins=*
grunt --plugins=remove_button,restore_on_backspace
```


## License

Copyright &copy; 2013–2020 [Contributors](https://github.com/orchidjs/tom-select/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
