# Tom Select

This is a **fork** of the [original bundle](https://github.com/orchidjs/tom-select). It exists as a public service to 
attempt to merge and release some of the outstanding PRs from that project and improve forward-compatibility.
I am not an expert in most of the tech used here - I see myself strictly as a steward.
If you want something merged, you need to provide a PR and it needs to pass the pipelines.
I'm happy to merge passing PRs and release when appropriate.

---

Tom Select is a dynamic, framework agnostic, and lightweight (~16kb gzipped) &lt;select&gt; UI control.
With autocomplete and native-feeling keyboard navigation, it's useful for tagging, contact lists, country selectors, and so on.
Tom Select was forked from [selectize.js](https://tom-select.js.org/docs/selectize.js/) with the goal of modernizing the code base, decoupling from jQuery, and expanding functionality.


### Features

- **Smart Option Searching / Ranking**<br>Options are efficiently scored and sorted on-the-fly (using [sifter](https://github.com/orchidjs/sifter.js)). Want to search an item's title *and* description? No problem.
- **Caret between items**<br>Order matters sometimes. With the <a href="https://tom-select.js.org/plugins/caret-position">Caret Position Plugin</a>, you can use the <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> arrow keys to move between selected items</li>
- **Select &amp; delete multiple items at once**<br>Hold down <kbd>command</kbd> on Mac or <kbd>ctrl</kbd> on Windows to select more than one item to delete.
- **Díåcritîçs supported**<br>Great for international environments.
- **Item creation**<br>Allow users to create items on the fly (async saving is supported; the control locks until the callback is fired).
- **Remote data loading**<br>For when you have thousands of options and want them provided by the server as the user types.
- **Extensible**<br> [Plugin API](https://tom-select.js.org/docs/plugins/) for developing custom features (uses [microplugin](https://github.com/brianreavis/microplugin.js)).
- **Accessible**, **Touch Support**, **Clean API**, ...

## Usage

```html
<input id="tom-select-it" />
<link rel="stylesheet" href="/css/tom-select.default.css">
<script src="/js/tom-select.complete.js"></script>
<script>
var config = {};
new TomSelect('#tom-select-it',config);
</script>
```

Available configuration settings are [documented here](https://tom-select.js.org/docs)

## License

Copyright &copy; 2013–2021 [Contributors](https://github.com/orchidjs/tom-select/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
