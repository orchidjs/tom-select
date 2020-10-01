module.exports = function(config) {
	// workaround for https://github.com/karma-runner/karma-sauce-launcher/issues/40
	var saucelabsBatchID = Number(process.env.SAUCELABS_BATCH) - 1;
	var saucelabsConcurrency = 4;
	var saucelabsBrowsers = [
		/*
		// mobile
		{platform: 'OS X 10.10', browserName: 'iPhone', version: '8.1'},
		//{platform: 'OS X 10.10 ', browserName: 'iPhone', version: '6.0'},
		{platform: 'OS X 10.10', browserName: 'iPad', version: '8.1'},
		//{platform: 'OS X 10.10', browserName: 'iPad', version: '6.0'},
		{platform: 'Linux', browserName: 'android', version: '4.4'},
		{platform: 'Linux', browserName: 'android', version: '4.3'},
		// desktop (safari)
		{platform: 'OS X 10.8', browserName: 'safari', version: 6},
		{platform: 'OS X 10.9', browserName: 'safari', version: 7},
		{platform: 'OS X 10.10', browserName: 'safari', version: 8},
		// desktop (chrome)
		{platform: 'OS X 10.10', browserName: 'chrome', version: 39},
		{platform: 'OS X 10.10', browserName: 'chrome', version: 38},
		{platform: 'OS X 10.10', browserName: 'chrome', version: 37},
		{platform: 'Windows 7', browserName: 'chrome', version: 39},
		{platform: 'Windows 7', browserName: 'chrome', version: 38},
		{platform: 'Windows 7', browserName: 'chrome', version: 37},
		// desktop (firefox)
		{platform: 'Windows 7', browserName: 'firefox', version: 35},
		{platform: 'Windows 8', browserName: 'firefox', version: 35},
		{platform: 'OS X 10.10', browserName: 'firefox', version: 34},
		{platform: 'OS X 10.10', browserName: 'firefox', version: 33},
		{platform: 'OS X 10.10', browserName: 'firefox', version: 32},
		// desktop (internet explorer)
		{platform: 'Windows 8', browserName: 'iexplore', version: 10},
		{platform: 'Windows 8.1', browserName: 'iexplore', version: 11},
		{platform: 'Windows 7', browserName: 'iexplore', version: 9}
		*/
		{ browserName: 'chrome', browserVersion: 'latest', platformName: 'Windows 7'},
		{ browserName: 'chrome', platform: 'Windows 7', version: '35' },
		{ browserName: 'iphone', platform: 'OS X 10.9', version: '7.1' },
		{ browserName: 'MicrosoftEdge', browserVersion: 'latest', platformName: 'Windows 10',},
	];

	if (process.env.TARGET === 'saucelabs') {
		saucelabsBrowsers = saucelabsBrowsers.slice(saucelabsBatchID * saucelabsConcurrency, saucelabsBatchID * saucelabsConcurrency + saucelabsConcurrency);
		if (!saucelabsBrowsers.length) process.exit(0);
	}

	var customLaunchers = {};
	saucelabsBrowsers.forEach(function(browser, i) {
		browser.base = 'SauceLabs';
		customLaunchers['SL_' + i] = browser;
	});

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

	var targets = {
		'saucelabs': Object.keys(customLaunchers),
		'HeadlessFirefox': ['HeadlessFirefox'],
		'HeadlessChrome': ['HeadlessChrome']
	};

	var reporters = ['mocha','coverage'];
	if( process.env.TRAVIS_CI ){

		if( process.env.TARGET === 'saucelabs' ){
			reporters = ['saucelabs', 'mocha']
		}else{
			reporters = ['mocha', 'coverage', 'coveralls']
		}
	}

	var browsers = targets[process.env.TARGET || 'HeadlessFirefox'];
	if (process.env.BROWSERS) {
		browsers = process.env.BROWSERS.split(',');
	}

	config.set({
		frameworks: ['mocha', 'chai'],
		files: [
			//'build/css/tom-select.default.css',
			'node_modules/jquery/dist/jquery.js',
			'node_modules/microplugin/src/microplugin.js',
			'node_modules/sifter/sifter.js',
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
		],
		preprocessors: {
			'src/**/*.js': ['coverage'],
			'src/*.js': ['coverage']
		},
		coverageReporter: {
			type: process.env.TRAVIS_CI ? 'lcov' : 'text-summary',
			dir: 'coverage/'
		},
		sauceLabs: {
			recordVideo: false,
			startConnect: true,
			tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
			build: process.env.TRAVIS_BUILD_NUMBER,
			testName: process.env.COMMIT_MESSAGE,
			tags: ['tom-select', 'test']
		},
		customLaunchers: customLaunchers,
		reporters: reporters,
		port: 8888,
		colors: true,
		captureTimeout: 0,
		logLevel: config.LOG_INFO,
		browsers: browsers,
		browserDisconnectTolerance: 2,
		browserDisconnectTimeout: 10000,
		browserNoActivityTimeout: 120000,
		singleRun: true
	});
};
