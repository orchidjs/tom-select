

describe('A11Y Compliance', function() {
	/*
	var html = `<div>
				<label for="a11y-test">
				<select multiple id="a11y-test" class="setup-here" placeholder="a11y test">
					<option value="a">a</option>
					<option value="b">b</option>
					<option value="c">c</option>
				</select>
				</div>`;

	it_n('setup', function(done) {

		var test = setup_test(html);

		aChecker.getCompliance(test.instance.wrapper, 'setup', function (results) {

		    var returnCode = aChecker.assertCompliance(results);
		    assert.equal( returnCode, 0, "A11Y Scan failed." + JSON.stringify(results) );
		    done();
		});

	});

	it_n('isOpen', function(done) {

		var test = setup_test(html);

		click(test.instance.control, function(){

			assert.equal(test.instance.isOpen,true);

			aChecker.getCompliance(test.instance.wrapper, 'isOpen', function (results) {

			    var returnCode = aChecker.assertCompliance(results);
			    assert.equal( returnCode, 0, "A11Y Scan failed." + JSON.stringify(results) );
			    done();
			});
		});

	});

	*/
});


describe('aria-busy', function() {

	var listbox_busy = function(instance){
		return instance.dropdown_content.getAttribute('aria-busy');
	};

	var set_input = function(instance, value){
		instance.control_input.value = value;
		instance.control_input.dispatchEvent(new Event('input'));
	};

	it_n('should mark the listbox busy from the keystroke until the dropdown is refreshed', async () => {

		var test = setup_test('AB_Single');
		test.instance.settings.refreshThrottle = 50; // setup_test() forces 0

		await asyncClick(test.instance.control);
		assert.isNull(listbox_busy(test.instance));

		set_input(test.instance, 'a');
		assert.equal(listbox_busy(test.instance), 'true');

		await waitFor(100);
		assert.isNull(listbox_busy(test.instance));
	});

	it_n('should keep the listbox busy until load() calls back', async () => {
		var loaded;

		var test = setup_test('<select>',{
			loadThrottle: 50,
			load: function(query, load_cb) {
				loaded = load_cb;
			}
		});

		await asyncClick(test.instance.control);
		set_input(test.instance, 'a');
		assert.equal(listbox_busy(test.instance), 'true');

		await waitFor(100); // greater than load throttle
		assert.equal(listbox_busy(test.instance), 'true');

		loaded([{value: 'a', text: 'a'}]);
		assert.isNull(listbox_busy(test.instance));
	});

	it_n('should keep the listbox busy while preloading', async () => {
		var loaded;

		var test = setup_test('<select>',{
			preload: true,
			loadThrottle: 0,
			load: function(query, load_cb) {
				loaded = load_cb;
			}
		});

		assert.equal(listbox_busy(test.instance), 'true');

		loaded([{value: 'a', text: 'a'}]);
		assert.isNull(listbox_busy(test.instance));
	});

	it_n('should not leave the listbox busy if shouldLoad() returns false', async () => {

		var test = setup_test('AB_Single',{
			shouldLoad: function(query) {
				return query.length > 1;
			},
			load: function(query, load_cb) {
				assert.fail('load() should not be called');
			}
		});

		await asyncClick(test.instance.control);
		set_input(test.instance, 'a');
		assert.isNull(listbox_busy(test.instance));
	});

	it_n('should not leave the listbox busy if the search was already loaded', async () => {
		var loaded;

		var test = setup_test('<select>',{
			loadThrottle: 10,
			load: function(query, load_cb) {
				loaded = load_cb;
			}
		});

		await asyncClick(test.instance.control);

		set_input(test.instance, 'a');
		await waitFor(50); // greater than load throttle
		loaded([{value: 'a', text: 'a'}]);

		set_input(test.instance, 'ab');
		await waitFor(50);
		loaded();
		assert.isNull(listbox_busy(test.instance));

		set_input(test.instance, 'a');
		assert.isNull(listbox_busy(test.instance));
	});

	it_n('should keep the listbox busy if an outdated load() calls back before a newer one', async () => {
		var callbacks = {};

		var test = setup_test('<select>',{
			loadThrottle: 0,
			load: function(query, load_cb) {
				callbacks[query] = load_cb;
			}
		});

		await asyncClick(test.instance.control);
		set_input(test.instance, 'a');
		set_input(test.instance, 'ab');

		callbacks['a']([{value: 'a', text: 'a'}]);
		assert.equal(listbox_busy(test.instance), 'true');

		callbacks['ab']([{value: 'ab', text: 'ab'}]);
		assert.isNull(listbox_busy(test.instance));
	});

	it_n('should keep the listbox busy if load() calls back while a newer keystroke is waiting to refresh', async () => {
		var callbacks = {};

		var test = setup_test('<select>',{
			loadThrottle: 0,
			load: function(query, load_cb) {
				callbacks[query] = load_cb;
			}
		});
		test.instance.settings.refreshThrottle = 50; // setup_test() forces 0

		await asyncClick(test.instance.control);
		set_input(test.instance, 'a');
		await waitFor(100); // greater than refresh throttle

		set_input(test.instance, 'ab');
		callbacks['a']([{value: 'a', text: 'a'}]);
		assert.equal(listbox_busy(test.instance), 'true');

		await waitFor(100);
		assert.equal(listbox_busy(test.instance), 'true');

		callbacks['ab']([{value: 'ab', text: 'ab'}]);
		assert.isNull(listbox_busy(test.instance));
	});

});
