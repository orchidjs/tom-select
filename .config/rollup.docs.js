import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve'; // so Rollup can resolve imports without file extensions and `node_modules`
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

var configs = [];

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

var babel_config = babel({
	extensions: extensions,
	babelHelpers: 'bundled',
	configFile: path.resolve(__dirname,'babel.config.json'),
	exclude:'node_modules/**'
});

var resolve_config = resolve({
	extensions: extensions,
});

var terser_config = terser({
  mangle: true,
  toplevel: true, // removes tomSelect footer
  format: {
    semicolons: false,
  },
});

// bootstrap tabs for docs
configs.push({
	input: 'doc_src/js/index.js',
	output: {
		file: path.resolve(__dirname,'../build/docs/js/index.bundle.js'),
		name: 'bootstrap',
		format: 'umd',
		sourcemap: true,
		preserveModules: false,
	},
	plugins:[
		babel_config,
		terser_config,
		alias({
			entries: [
				{ find: '@popperjs/core', replacement: 'node_modules/@popperjs/core/dist/esm/index.js' },
			],
			resolve_config
	    })
	]


});


export default configs;
