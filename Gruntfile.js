var fs = require('fs');

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-replace');

	require('load-grunt-tasks')(grunt); //babel

	grunt.registerTask('default', [
		'clean:pre',
		'bower:install',
		'copy:less',
		'copy:less_plugins',

		'copy:scss',
		'copy:scss_plugins',

		'concat:less_theme_dependencies',
		'concat:less_plugins',
		'concat:js',
		'babel',
		'less:uncompressed',
		'sass:build',
		'postcss',
		'replace',
		'build_complete',
		'uglify',
		//'clean:post',
	]);

	grunt.registerTask('js', [
		'clean:js',
		'bower:install',
		'concat:js',
		'babel',
		'replace:js',
		'build_complete',
		'uglify',
		'clean:post',
	]);

	grunt.registerTask('serve', [
			'shell:builddocs',
			'connect',
			'watch'
	])

	grunt.registerTask('build_complete', '', function() {
		var files, i, n, source, name, path, modules = [];

		// amd definitions must be changed to be not anonymous
		// @see https://github.com/brianreavis/selectize.js/issues/89
		files = [];
		for (i = 0, n = files_js_dependencies.length; i < n; i++) {
			path = files_js_dependencies[i];
			name = path.match(/([^\/]+?).js$/)[1];
			source = grunt.file.read(path).replace('define(factory);', 'define(\'' + name + '\', factory);');
			modules.push(source);
		}

		path = 'build/js/selectize.js';
		source = grunt.file.read(path).replace(/define\((.*?)factory\);/, 'define(\'selectize\', $1factory);');
		modules.push(source);

		// write output
		path = 'build/js/selectize.complete.js';
		grunt.file.write(path, modules.join('\n\n'));
		grunt.log.writeln('Built "' + path + '".');
	});

	var files_js = [
		'src/contrib/*.js',
		'src/*.js',
		'!src/.wrapper.js',
		'!src/defaults.js',
		'!src/selectize.js',
		'src/selectize.js',
		'src/defaults.js',
	];

	var files_js_dependencies = [
		'node_modules/sifter/sifter.js',
		'node_modules/microplugin/src/microplugin.js',
	];

	var less_imports		= [];
	var less_plugin_files	= [];
	var scss_plugin_files	= [];

	// enumerate plugins
	(function() {
		var selector_plugins = grunt.option('plugins');
		if( !selector_plugins ){
			selector_plugins = '*'; // default to all plugins
		}


		if (selector_plugins.indexOf(',') !== -1) {
			selector_plugins = '{' + selector_plugins.split(/\s*,\s*/).join(',') + '}';
		}

		// javascript
		files_js.push('src/plugins/' + selector_plugins + '/*.js');

		// less (css)
		var matched_files = grunt.file.expand(['src/plugins/' + selector_plugins + '/plugin.less']);
		for (var i = 0, n = matched_files.length; i < n; i++) {
			var plugin_name = matched_files[i].match(/src\/plugins\/(.+?)\//)[1];
			less_imports.push('@import "plugins/' +  plugin_name + '";');
			less_plugin_files.push({src: matched_files[i], dest: 'build/less/plugins/' + plugin_name + '.less'});
		}

		// scss (css)
		var matched_files = grunt.file.expand(['src/plugins/' + selector_plugins + '/plugin.scss']);
		for (var i = 0, n = matched_files.length; i < n; i++) {
			var plugin_name = matched_files[i].match(/src\/plugins\/(.+?)\//)[1];
			scss_plugin_files.push({src: matched_files[i], dest: 'build/scss/plugins/' + plugin_name + '.scss'});
		}

	})();

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					copy: false,
					clean: false,
					layout: 'byComponent',
					action: 'install'
				}
			}
		},
		clean: {
			pre: ['build/*'],
			post: ['build/**/*.tmp.*','build/**/*.tmp'],
			js: ['build/*.js']
		},
		copy: {
			less: {
				files: [{
					expand: true,
					flatten: true,
					src: ['src/less/*.less'],
					dest: 'build/less'
				}]
			},
			less_plugins: {
				files: less_plugin_files
			},
			scss:{
				files: [{
					'build/scss/selectize.scss': ['src/scss/selectize.scss'],
					'build/scss/selectize.default.scss': ['src/scss/selectize.default.scss'],
					'build/scss/selectize.bootstrap3.scss': ['src/scss/selectize.bootstrap3.scss'],
				}]
			},
			scss_plugins:{
				files: scss_plugin_files
			},
		},
		replace: {
			options: {
				prefix: '@@',
				variables: {
					'version': '<%= pkg.version %>',
					'js': '<%= grunt.file.read("build/js/selectize.js").replace(/\\n/g, "\\n\\t") %>',
					'css': '<%= grunt.file.read("build/css/selectize.css") %>',
				},
			},
			main: {
				files: [
					{
						src: ['src/less/.wrapper.css'],
						dest: 'build/css/selectize.css'
					}
				]
			},
			js: {
				files: [
					{src: ['src/.wrapper.js'], dest: 'build/js/selectize.js'},
				]
			},
			css_post: {
				files: [
					{expand: true, flatten: false, src: ['build/css/*.css'], dest: ''},
					{expand: true, flatten: false, src: ['build/less/*.less'], dest: ''},
					{expand: true, flatten: false, src: ['build/less/plugins/*.less'], dest: ''},
					{expand: true, flatten: false, src: ['build/css-scss/*.css'], dest: ''},
				]
			}
		},
		less: {
			options: {},
			uncompressed: {
				files: {
					'build/css/selectize.css': ['build/less/selectize.less'],
					'build/css/selectize.default.css': ['build/less/selectize.default.less'],
					'build/css/selectize.bootstrap3.css': ['build/less/selectize.bootstrap3.tmp.less']
				}
			}
		},
		sass: {
			build: {
				options:{
					style:'expanded',
				//	ext: '.css',
				},
				files: [{
					'build/css-scss/selectize.css': ['src/scss/selectize.scss'],
					'build/css-scss/selectize.default.css': ['src/scss/selectize.default.scss'],
					'build/css-scss/selectize.bootstrap3.css': ['src/scss/-selectize.bootstrap3.scss'],
				}]
			}
		},
		postcss: {
			options: {
				/*
				map: true, // inline sourcemaps

				// or
				map: {
					inline: false, // save all sourcemaps as separate files...
					annotation: 'build/css/maps/' // ...to the specified directory
				},
				*/

				processors: [
					//require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')(), // {browsers: 'last 2 versions'}add vendor prefixes
					require('cssnano')() // minify the result
				]
			},
			build: {
				files: [{
					'build/css-scss/selectize.min.css': ['build/css-scss/selectize.css'],
					'build/css-scss/selectize.default.min.css': ['build/css-scss/selectize.default.css'],
					'build/css-scss/selectize.bootstrap3.min.css': ['build/css-scss/selectize.bootstrap3.css'],
				}]
			}
		},
		concat: {
			options: {
				stripBanners: true,
				separator: grunt.util.linefeed + grunt.util.linefeed
			},
			js: {
				files: {
					'build/js/selectize.js': files_js,
				}
			},
			less_plugins: {
				options: {
					banner: less_imports.join('\n') + grunt.util.linefeed + grunt.util.linefeed
				},
				files: {
					'build/less/selectize.less': ['build/less/selectize.less']
				}
			},
			less_theme_dependencies: {
				options: {stripBanners: false},
				files: {
					'build/less/selectize.bootstrap3.tmp.less': [
						'bower_components/bootstrap3/less/variables.less',
						'bower_components/bootstrap3/less/mixins/nav-divider.less',
						'build/less/selectize.bootstrap3.less'
					]
				}
			}
		},
		babel: {
			options: {
				sourceMap: true
			},
			build: {
				files: {
					'build/js/selectize.js': ['build/js/selectize.js']
				}
			}
		},
		connect: {
			server:{
				options: {
					base: 'build-docs',
				}
			}
		},
		shell: {
			builddocs: {
				command: 'npx @11ty/eleventy',
			},
		},
		uglify: {
			main: {
				options: {
					'banner': '/*! selectize.js - v<%= pkg.version %> | https://github.com/selectize/selectize.js | Apache License (v2) */\n',
					'report': 'gzip',
					'ascii-only': true
				},
				files: {
					'build/js/selectize.min.js': ['build/js/selectize.js'],
					'build/js/selectize.complete.min.js': ['build/js/selectize.complete.js']
				}
			}
		},
		watch: {
			docs:{
				files:[
					'doc_src/**',
				],
				tasks:[
					'shell:builddocs',
				]
			},
			src:{
				files: [
					'src/**',
				],
				tasks: [
					'default',
					'shell:builddocs',
				]
			}
		}
	});
};
