/*
Selenium tests
For reference:
	https://nehalist.io/selenium-tests-with-mocha-and-chai-in-javascript/
	https://medium.com/dailyjs/how-to-setup-selenium-on-node-environment-ee33023da72d
	https://mykzilla.org/2017/08/30/headless-firefox-in-node-js-with-selenium-webdriver/

Chromedriver Issue "DevToolsActivePort file doesn't exist"
occurs when install with npm install chromedriver or when copied to /home/<user>/.local/bin

*/

const process = require('process');
const webdriver = require('selenium-webdriver');
const { assert } = require('chai');
const firefox = require('selenium-webdriver/firefox');

describe('Selenium Tests', function() {
	const driver = new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless()).build();


	/**
	 * Helper function for tabbing
	 *
	 */
	async function tabKey(){
		var currentEl = await driver.switchTo().activeElement();
		await currentEl.sendKeys(webdriver.Key.TAB);
	}


	// tabbing is not handled properly in karma+syn
	it('should tab into and out of instance',async function(){
		var isOpen;

		var path = 'file://'+process.cwd()+'/test/html/select-multi.html';

		await driver.get(path);
		await driver.sleep(2000);

		var input_before	= await driver.findElement(webdriver.By.id('input-before'));
		var input_after		= await driver.findElement(webdriver.By.id('input-after'));
		var select			= await driver.findElement(webdriver.By.id('setup-here'));


		await input_before.click();
		isOpen = await driver.executeScript('return window.tomselect.isOpen');
		assert.equal(isOpen,false,'instance should not be open when other input is focused');

		await tabKey()
		isOpen = await driver.executeScript('return window.tomselect.isOpen');
		assert.equal(isOpen,true,'instance should open when focused with [tab]');

		await tabKey()
		isOpen = await driver.executeScript('return window.tomselect.isOpen');
		assert.equal(isOpen,false,'instance should close when blurred with [tab]');

		await tabKey()
		isOpen = await driver.executeScript('return window.tomselect.isOpen');
		assert.equal(isOpen,false,'instance should not reopen and focus should move to next input');

	});


	after(async () => driver.quit());
});
