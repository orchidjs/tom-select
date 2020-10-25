import resolve from '@rollup/plugin-node-resolve'; // so Rollup can find `node_modules`
import commonjs from '@rollup/plugin-commonjs'; // so Rollup can convert commonjs to an ES module
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import bundleSize from '@atomico/rollup-plugin-sizes';
import visualizer from 'rollup-plugin-visualizer';
import pkg from '../package.json';
import path from 'path'

function createConfig( input, output, plugins ){

	var config = {
		input: input,
		output: {
			name: 'TomSelect',
			file: `build/js/${filename}`,
			format: 'umd',
			sourcemap: true,
			banner: `/**
 * Tom Select v${pkg.version}
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
			}),
			bundleSize(),
			visualizer({
          		filename: `stats/${filename}.html`,
        	}),
		],
	};

	config.plugins = config.plugins.concat(plugins);

	return config;
}

function configCore( filename, input, plugins ){

	var config = {
		input: input,
		output: {
			name: 'TomSelect',
			file: `build/js/${filename}`,
			format: 'umd',
			sourcemap: true,
			banner: `/**
 * tom-select v${pkg.version}
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
			}),
			bundleSize(),
			visualizer({
          		filename: `stats/${filename}.html`,
        	}),
		],
	};

	config.plugins = config.plugins.concat(plugins);

	return config;
};


var config_complete			= configCore('tom-select.complete.js','src/tom-select.complete.js');
var config_complete_min		= configCore('tom-select.complete.min.js','src/tom-select.complete.js',[terser({mangle:true})]);
var config_base				= configCore('tom-select.base.js','src/tom-select.js');
var config_base_min			= configCore('tom-select.base.js','src/tom-select.js',[terser({mangle:true})]);


export default [config_complete, config_complete_min, config_base, config_base_min];
