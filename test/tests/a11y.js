describe("A11Y Compliance", function () {
	const html = `<div>
				<label for="a11y-test">
				<select multiple id="a11y-test" class="setup-here" placeholder="a11y test">
					<option value="a">a</option>
					<option value="b">b</option>
					<option value="c">c</option>
				</select>
				</div>`;

	it.skip("setup", (done) => {
		const test = setup_test(html);

		aChecker.getCompliance(test.instance.wrapper, "setup", (results) => {
			const returnCode = aChecker.assertCompliance(results);

			assert.equal(
				returnCode,
				0,
				"A11Y Scan failed." + JSON.stringify(results)
			);

			done();
		});
	}).timeout(5000);

	it.skip("isOpen", (done) => {
		const test = setup_test(html);

		click(test.instance.control, () => {
			assert.equal(test.instance.isOpen, true);

			aChecker.getCompliance(
				test.instance.wrapper,
				"isOpen",
				(results) => {
					const returnCode = aChecker.assertCompliance(results);

					assert.equal(
						returnCode,
						0,
						"A11Y Scan failed." + JSON.stringify(results)
					);

					done();
				}
			);
		});
	});
});
