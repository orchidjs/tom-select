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
		basePath: '../',
		frameworks: ['mocha', 'chai'],
		files: [
			{
				pattern: 'src/**/*',
				included: false,
				type: 'module',
			},
			{
				pattern: 'test/esm-module.js',
				type: 'module',
				included: true,
			},

			'build/js/tom-select.complete.js',
			'node_modules/syn/dist/global/syn.js',
			'node_modules/jquery/dist/jquery.js',
			'build/css/tom-select.default.css',
			'test/support/*.js',
			'test/*.js'
			//'test/events.js'
		],
		preprocessors: {
			'build/**/*.js': ['sourcemap','coverage'],
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
