---
title: Plugin API
tags: docs
---

Feature can be added to Tom Select without modifying via the [microplugin](https://github.com/brianreavis/microplugin.js) interface.
This helps protect against code bloat, allows for leaner builds and allows for addons to be sanely isolated
The plugin system is lean, makes very few assumptions, and gives the developer complete control.

**[Plugin Examples](/plugins)**

## Plugin Usage

#### Without Options

```js
new TomSelect('#select',{
	plugins: ['plugin_a', 'plugin_b']
});
```

#### With Options

```js
new TomSelect('#select',{
	plugins: {
		'plugin_a': { /* ... */ },
		'plugin_b': { /* ... */ }
	}
});
```

For a more detailed description of plugin option formats and how the plugin system works, check out the [microplugin](https://github.com/brianreavis/microplugin.js) documentation.


## Including Plugins

Plugins can be included in your projects in four different ways:

#### tom-select.complete.js
Using <code>tom-select.complete.js</code> in your projects will give you immediate access to all plugins

#### tom-select.popular.js
Save some bandwidth with a bundle that's about 4kb smaller. <code>tom-select.popular.js</code> includes dropdown_input, remove_button, no_backspace_delete, and restore_on_backspace plugins.

#### tom-select.base.js
If you don't need any plugins, or want to load plugins individually, use <code>tom-select.base.js</code>.
Add plugins to your project by including their js files: <code>/js/plugins/remove_button.js</code>, <code>/js/plugins/dropdown_header.js</code>, etc.

#### tom-select.custom.js
Use NPM to hand-pick plugins and create <code>/build/js/tom-select.custom.js</code>

```shell
# clone the repo
git clone https://github.com/orchidjs/tom-select.git
cd tom-select

# install dev dependencies
npm install

# create /build/js/tom-select.custom.js
npm run build -- --plugins=remove_button,restore_on_backspace
```


## Creating Plugins

**A few notes:**
- All plugins live in their own folders in ["src/plugins"](https://github.com/orchidjs/tom-select/tree/master/src/plugins).
- Plugin names should follow the format: `/[a-z_]+$`
- JS source should live in a "plugin.js" file (required).
- CSS should live in a "plugin.scss" file (optional). It will be bundled at build time.
- Plugins are initialized right before the control is setup.
  This means that if you want to listen for events on any of the control's
  elements, you should override the `setup()` method (see ["DOM Events"](#dom-events)).


### Boilerplate

```js
TomSelect.define('plugin_name', function(plugin_options) {
	// options: plugin-specific options
	// this: TomSelect instance
});
```

#### Adding Dependencies

```js
TomSelect.define('plugin_name', function(plugin_options) {
	this.require('another_plugin');
});
```

#### Method Hooks

Execute plugin code 'before' or 'after' existing methods

```js
TomSelect.define('plugin_name', function(plugin_options) {
	this.hook('after','setup',function(){
		// .. additional setup
	});
});
```

#### Overriding Methods
Use the 'instead' hook to override existing methods.

**Note:** If the method you're overriding returns a value, make sure the
overridden function returns a value as well.

```js
TomSelect.define('plugin_name', function(plugin_options) {
	var original_setup = this.setup;
	this.hook('instead','setup',function(){
		// .. custom setup
		return original_setup.apply(this, arguments);
	});
});
```


#### DOM Events
If you want to add event listeners to dom elements, add them after the `setup()` method.

```js
TomSelect.define('plugin_name', function(plugin_options) {
	this.hook('after','setup',function(){
		this.control.addEventListener('click',function(evt){
			alert('the control was clicked');
		});
	});
});
```
