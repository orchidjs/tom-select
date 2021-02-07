import resolve from '@rollup/plugin-node-resolve'; // so Rollup can find `node_modules`
import commonjs from '@rollup/plugin-commonjs'; // so Rollup can convert commonjs to an ES module
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import bundleSize from '@atomico/rollup-plugin-sizes';
import visualizer from 'rollup-plugin-visualizer';
import pkg from '../package.json';
import path from 'path';
import fs from 'fs';

var tom_select_path	= path.resolve( 'src/tom-select.ts' );
var configs = [];
const banner = `/**
* Tom Select v${pkg.version}
* Licensed under the Apache License, Version 2.0 (the "License");
*/
`;

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

var babel_config = babel({
	extensions: extensions,
	babelHelpers: 'bundled',
	configFile: path.resolve(__dirname,'babel.config.json'),
});

var resolve_config = resolve({
	extensions: extensions,
	// pass custom options to the resolve plugin
	moduleDirectories: [
		'node_modules',
	],
});


// esm
configs.push({
	input: path.resolve(__dirname,'../src/tom-select.complete.ts'),
	output:{
		dir: path.resolve(__dirname,'../build/esm'),
		format: 'esm',
		preserveModules: true,
		sourcemap: true,
		banner: banner,
	},
	plugins:[babel_config,resolve_config]
});



var terser_config = terser({
  mangle: true,
  //toplevel: true, // removes tomSelect footer
  format: {
    semicolons: false,
    comments: function (node, comment) {
      var text = comment.value;
      var type = comment.type;
      if (type == "comment2") {
        // multiline comment
        return /\* Tom Select/i.test(text);
      }
    },
  },
});



function createConfig( input, output, plugins ){

	var config = {
		input: input,
		output: {
			format: 'umd',
			sourcemap: true,
			banner: banner
		}
	};

	Object.assign(config.output, output);

	config.plugins = [
			resolve_config,
			babel_config,
			commonjs(),
			bundleSize(),
			visualizer({
				sourcemap: true,
				filename: `stats/${config.output.file}.html`,
        	})
		];

	config.plugins	= config.plugins.concat(plugins);

	return config;
}

function configCore( input, filename, plugins ){

	var output = {
		name: 'TomSelect',
		file: `build/js/${filename}`,
		footer: 'var tomSelect=function(el,opts){return new TomSelect(el,opts);} ',
	};

	var config = createConfig( input, output, plugins);

	configs.push( config );
};


function pluginConfig( input, output ){

	var config		= createConfig( input, output, [] );

	// prevents tom-select.ts from being bundled in with plugin.js umd
	config.output.globals = {}
	config.output.globals[tom_select_path] = 'TomSelect';
	config.external = [tom_select_path,'TomSelect'];
	configs.push( config );
}

// plugins
var plugin_dir = path.resolve(__dirname,'../src/plugins');
var files = fs.readdirSync( plugin_dir );
files.map(function(file){
	let input	= path.resolve(__dirname,'../src/plugins',file,'plugin.ts');
	let output	= {file:`build/js/plugins/${file}.js`,'name':file};
	pluginConfig( input, output);
});


// custom
var custom_file = path.resolve(__dirname,'../src/tom-select.custom.js');
if( fs.existsSync(custom_file) ){
	configCore(custom_file,'tom-select.custom.js');
	configCore(custom_file,'tom-select.custom.min.js',[terser_config]);
}

// tom-select.base
configCore('src/tom-select.ts','tom-select.base.js')
configCore('src/tom-select.ts','tom-select.base.min.js',[terser_config]);

// tom-select.complete
configCore('src/tom-select.complete.ts','tom-select.complete.js');
configCore('src/tom-select.complete.ts','tom-select.complete.min.js',[terser_config]);



export default configs;
