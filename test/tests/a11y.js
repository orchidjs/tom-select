

describe('A11Y Compliance', function() {

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


});
