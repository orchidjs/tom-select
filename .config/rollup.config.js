import resolve from '@rollup/plugin-node-resolve'; // so Rollup can resolve imports without file extensions and `node_modules`
import commonjs from '@rollup/plugin-commonjs'; // so Rollup can convert commonjs to an ES module
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from '../package.json';
import path from 'path';
import fs from 'fs';

const tom_select_path_js	= path.resolve( 'src/tom-select.js' );
const tom_select_path_ts	= path.resolve( 'src/tom-select.ts' );
const configs				= [];

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
	exclude:'node_modules/**/*.js'
});

var resolve_config = resolve({
	extensions: extensions,
});


// esm & cjs
const inputs = [
	'tom-select.ts',
	'tom-select.complete.ts',
	'tom-select.popular.ts',
	'utils.ts',
];

inputs.forEach((slug)=>{

	let input = path.resolve(__dirname,'../src',slug)

	// esm
	configs.push({
		input: input,
		output:{
			//file: path.resolve(__dirname,'../build/esm',slug),
			dir: path.resolve(__dirname,'../build/esm'),
			format: 'esm',
			preserveModules: false,
			sourcemap: true,
			banner: banner,
		},
		plugins:[babel_config,resolve_config,],
		//external: ['@orchidjs/sifter/dist/esm/sifter.js'],
	});

	// cjs
	configs.push({
		input: input,
		output:{
			dir: path.resolve(__dirname,'../build/cjs'),
			format: 'cjs',
			preserveModules: false,
			sourcemap: true,
			banner: banner,
			exports: "auto",
		},
		plugins:[babel_config,resolve_config],
		//external: ['@orchidjs/sifter/dist/esm/sifter.js'],
	});

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
	config.output.globals[tom_select_path_js]	= 'TomSelect';
	config.output.globals[tom_select_path_ts]	= 'TomSelect';

	config.external = [tom_select_path_js,tom_select_path_ts,'TomSelect'];
	configs.push( config );
}

// plugins
var plugin_dir = path.resolve(__dirname,'../src/plugins');
var files = fs.readdirSync( plugin_dir );
files.map(function(file){
	let input	= path.resolve(__dirname,'../src/plugins',file,'plugin.ts');
	let output	= {file:`build/js/plugins/${file}.js`,'name':file};
	pluginConfig( input, output);


	// esm
	configs.push({
		input: input,
		output:{
			file: path.resolve(__dirname,'../build/esm/plugins',file,'plugin.js'),
			format: 'esm',
			preserveModules: false,
			sourcemap: true,
			banner: banner,
		},
		plugins:[babel_config,resolve_config,],
		external: ['../../tom-select.js'],
	});

});


// custom
var custom_file = path.resolve(__dirname,'../src/tom-select.custom.ts');
if( fs.existsSync(custom_file) ){
	configCore('src/tom-select.custom.ts','tom-select.custom.js');
	configCore('src/tom-select.custom.ts','tom-select.custom.min.js',[terser_config]);
}

// tom-select.base
configCore('src/tom-select.ts','tom-select.base.js')
configCore('src/tom-select.ts','tom-select.base.min.js',[terser_config]);

// tom-select.complete
configCore('src/tom-select.complete.ts','tom-select.complete.js');
configCore('src/tom-select.complete.ts','tom-select.complete.min.js',[terser_config]);

// tom-select.popular
configCore('src/tom-select.popular.ts','tom-select.popular.js');
configCore('src/tom-select.popular.ts','tom-select.popular.min.js',[terser_config]);



export default configs;
