module.exports = function(config) {

	var customLaunchers = {};

	if (process.env.TARGET === 'browserstack') {

		// define browsers
		// https://www.browserstack.com/automate/capabilities
		customLaunchers = {

			// ios
			bs_ios_ffox:{
				base: 'BrowserStack',
				os : 'OS X',
				os_version : 'Catalina',
				browser : 'Firefox',
				browser_version : 'latest',
			},

			bs_ios_safari13:{
				base: 'BrowserStack',
				os : 'OS X',
				os_version : 'Catalina',
				browser : 'Safari',
				browser_version : 'latest',
			},

			bs_ios_safari12:{
				base: 'BrowserStack',
				os : 'OS X',
				os_version : 'Mojave',
				browser : 'Safari',
				browser_version : 'latest',
			},

			bs_ios_safari11:{
				base: 'BrowserStack',
				os : 'OS X',
				os_version : 'High Sierra',
				browser : 'Safari',
				browser_version : 'latest',
			},

			iphone11:{
				base: 'BrowserStack',
				os: 'iOS',
				os_version: '14',
				device: 'iPhone 11',
				browser: 'iPhone',
				real_mobile: 'true',
			},


			// win
			bs_win10_edge:{
				base: 'BrowserStack',
				os : 'Windows',
				os_version : '10',
				browser : 'Edge',
				browser_version : 'latest',
			},

			bs_win8_edge:{
				base: 'BrowserStack',
				os : 'Windows',
				os_version : '8.1',
				browser : 'Edge',
				browser_version : '80',
			},

			bs_win7_edge:{
				base: 'BrowserStack',
				os : 'Windows',
				os_version : '7',
				browser : 'Edge',
				browser_version : '80.0',
			},

			// android
			bs_android:{
				base: 'BrowserStack',
				os : 'Android',
				os_version : '10.0',
				device : 'Samsung Galaxy S20',
				real_mobile : 'true',
				browser : 'Android',
			},


		};

	}else{
		customLaunchers['HeadlessFirefox'] = {
										base: 'Firefox',
										flags: [
											'-headless',
										]
									};

		customLaunchers['HeadlessChrome'] = {
										base: 'ChromeHeadless',
										flags: [
											'--disable-translate',
											'--disable-extensions',
											'--remote-debugging-port=9223'
										]
									};
	}

	var targets = {
		'browserstack': Object.keys(customLaunchers),
		'HeadlessFirefox': ['HeadlessFirefox'],
		'HeadlessChrome': ['HeadlessChrome']
	};

	var reporters = ['mocha','coverage'];
	if( process.env.TRAVIS_CI ){
		reporters = ['mocha', 'coverage', 'coveralls']
	}

	var browsers = targets[process.env.TARGET || 'HeadlessFirefox'];
	if( process.env.BROWSERS ){
		browsers = process.env.BROWSERS.split(',');
	}


	config.set({
		frameworks: ['mocha', 'chai'],
		files: [
			'build/css/tom-select.default.css',
			'node_modules/jquery/dist/jquery.js',
			'node_modules/microplugin/src/microplugin.js',
			'node_modules/syn/dist/global/syn.js',
			'test/support/*.js',
			'src/contrib/*.js',
			'src/constants.js',
			'src/utils.js',
			'src/vanilla.js',
			'src/settings.js',
			'src/tom-select.js',
			'src/defaults.js',
			'src/.wrapper.js',
			'src/plugins/remove_button/plugin.js',
			'src/plugins/restore_on_backspace/plugin.js',
			'src/plugins/dropdown_header/plugin.js',
			'src/plugins/optgroup_columns/plugin.js',
			'src/plugins/no_backspace_delete/plugin.js',
			'src/plugins/change_listener/plugin.js',
			'test/*.js'
			//'test/events.js'
		],
		preprocessors: {
			'src/*.js': ['coverage']
		},
		coverageReporter: {
			reporters:[
				{type: 'lcov'},
				{type: 'text-summary'},
				
			],
			dir: 'coverage/'
		},
		browserStack: {
			tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
			build: process.env.TRAVIS_BUILD_NUMBER,
			project: process.env.TRAVIS_CI ? 'tom-select': '',
			name:  process.env.TRAVIS_CI ? 'tom-select': '',
		},
		customLaunchers: customLaunchers,
		reporters: reporters,
		colors: true,
		logLevel: config.LOG_INFO,
		browsers: browsers,
		singleRun: true
	});
};
