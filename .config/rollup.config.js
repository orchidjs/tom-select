import resolve from '@rollup/plugin-node-resolve'; // so Rollup can find `node_modules`
import commonjs from '@rollup/plugin-commonjs'; // so Rollup can convert commonjs to an ES module
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from '../package.json';
import path from 'path'


function createConfig( filename, plugins ){

	var config = {
		input: 'src/complete.js',
		output: {
			name: 'TomSelect',
			file: `build/js/${filename}`,
			format: 'umd',
			sourcemap: true,
			banner: `/**
	* tom-select v${pkg.version} -
	* Licensed under the Apache License, Version 2.0 (the "License");
	*/
	`,
			footer: 'var tomSelect = function(el,opts){ return new TomSelect(el,opts); } ',
		},
		plugins: [
			resolve(),
			commonjs(),
			babel({
				babelHelpers: 'bundled',
				configFile: path.resolve(__dirname,'babel.config.json'),
			})
		],
	};

	config.plugins = config.plugins.concat(plugins);

	return config;
};


var config_default = createConfig('tom-select.complete.js',);

// 134kb -> 50.5kb with just compiler()
// 134kb -> 48.1kb with just terser()
// 134kb -> 48.2kb with compiler() & terser()
var config_min = createConfig('tom-select.complete.min.js',[terser()]);


export default [config_default,config_min];
