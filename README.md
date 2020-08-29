# Orchid Select

[![NPM version](http://img.shields.io/npm/v/selectize.svg?style=flat)](https://www.npmjs.org/package/selectize)
[![CDNJS version](http://img.shields.io/cdnjs/v/selectize.js.svg?style=flat)](https://cdnjs.com/libraries/selectize.js)
[![Build Status](https://travis-ci.org/OrchidJS/Select.svg?branch=master)](https://travis-ci.org/OrchidJS/Select)
[![Coverage Status](https://coveralls.io/repos/github/OrchidJS/Select/badge.svg?branch=master)](https://coveralls.io/github/OrchidJS/Select?branch=master)

Orchid Select is an extensible and dynamic &lt;select&gt; UI control.
With autocomplete and native-feeling keyboard navigation, it's useful for tagging, contact lists, country selectors, and so on.
Orchid Select was forked from [Selectize.js](https://github.com/selectize/selectize.js) to provide the same powerful UI and API but with a framework agnostic approach.

- [Demos](http://selectize.github.io/selectize.js/)
- [Examples](examples/)
- [Usage Documentation](docs/usage.md)
- [API Documentation](docs/api.md)
- [Plugin Documentation](docs/plugins.md)
- [Browser Test Matrix](https://saucelabs.com/u/selectize)

### Features

- **Smart Option Searching / Ranking**<br>Options are efficiently scored and sorted on-the-fly (using [sifter](https://github.com/brianreavis/sifter.js)). Want to search an item's title *and* description? No problem.
- **Caret between items**<br>Order matters sometimes. Use the <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> arrow keys to move between selected items.</li>
- **Select &amp; delete multiple items at once**<br>Hold down <kbd>option</kbd> on Mac or <kbd>ctrl</kbd> on Windows to select more than one item to delete.
- **Díåcritîçs supported**<br>Great for international environments.
- **Item creation**<br>Allow users to create items on the fly (async saving is supported; the control locks until the callback is fired).
- **Remote data loading**<br>For when you have thousands of options and want them provided by the server as the user types.
- **Clean API &amp; code**<br>Interface with it and make modifications easily. Pull requests welcome!
- **Extensible**<br> [Plugin API](docs/plugins.md) for developing custom features (uses [microplugin](https://github.com/brianreavis/microplugin.js)).
- **Touch Support**<br> Plays nice with iOS 5+ devices.

### Dependencies

- [sifter](https://github.com/brianreavis/sifter.js) (bundled in ["standalone" build](dist/js/standalone))
- [microplugin](https://github.com/brianreavis/microplugin.js) (bundled in ["standalone" build](dist/js/standalone))

### Installation and files

All pre-built files needed to use Orchid Select can be found in the
["dist"](dist/) folder.

If you're looking to get started with minimal fuss, include
`selectize.standalone.min.js` (bundles Sifter and Microplugin
dependencies – also available un-minified for debugging, just remove the
`.min` part) and `css/selectize.default.css`.

Selectize is available at [cdnjs](https://cdnjs.com/libraries/selectize.js).

- [**js/**](dist/js)
	- [selectize.js](dist/js/selectize.standalone.js) — With dependencies
	- [selectize.js](dist/js/selectize.js) — Without dependencies
- [**less/**](dist/less)
	- [selectize.less](dist/less/selectize.less) — Core styles
	- [selectize.default.less](dist/less/selectize.default.less) — Default theme
	- [selectize.bootstrap3.less](dist/less/selectize.bootstrap3.less) — Bootstrap 3 theme
	- [**plugins/**](dist/less/plugins) — Individual plugin styles
- [**css/**](dist/css)
	- [selectize.css](dist/css/selectize.css) — Core styles
	- [selectize.default.css](dist/css/selectize.default.css) — Default theme (with core styles)
	- [selectize.bootstrap3.css](dist/css/selectize.bootstrap3.css) - Bootstrap 3 theme

### Usage

```js
new Selectize('#select',options);
```

The available options are [documented here](docs/usage.md).


### Custom Builds

By default, all [plugins](src/plugins) are included. To hand-pick what plugins (if any) to include, run [`grunt`](http://gruntjs.com/) with the "--plugins" flag. After this completes, grab the files you need from the ["dist"](dist) folder.

```sh
# dependencies
yarn install --production=false

# build selectize
grunt --plugins=
grunt --plugins=*
grunt --plugins=remove_button,restore_on_backspace
```

### Contributing
When issuing a pull request:

* please **do not include/commit changes in the `dist/` folder** to avoid
  merge conflicts.  A good way to include the right files is to use
  `git gui` or `git add` when committing to select the files you want to
  add to your commit.

* please **include tests** with your feature so that we're not tempted to
  break it in the future!

Add an entry to the top of the CHANGELOG, and update the documentation
in `docs/` as needed. (Refactors and documentation changes don't need a
changelog entry.)

Squash your commits together in one or a few complete, logical commits,
with a concise and descriptive message. One commit means one
feature/bugfix/thing that has changed, or a diff bringing the code one
step forward to a better, working state.

Once your commit is nice and clean, and you want to *discard the other
changes*, you can use `git checkout .` (that will erase changes to
tracked files) and `git clean [-i/--interactive]` (to erase untracked
files).  **However, be careful with those commands, as their function
is to erase things/changes.**


#### Tests
Please ensure all the tests pass:

```sh
$ yarn test # headless Firefox
$ BROWSERS=Firefox yarn test
$ BROWSERS=Firefox,Chrome yarn test
$ BROWSERS=Firefox,Chrome,Safari yarn test
```

#### Local environment
To run Selectize locally:

```sh
$ yarn start
```

You can then run the examples in `http://localhost:8000/examples/`.

However, be careful not to add the `dist/` files in your commit, as
Grunt automatically regenerates the files in `dist/` as the source is
changed.

## License

Copyright &copy; 2013–2016 [Brian Reavis](http://twitter.com/brianreavis) & [Contributors](https://github.com/selectize/selectize.js/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
