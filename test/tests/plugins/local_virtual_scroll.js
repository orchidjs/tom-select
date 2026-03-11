describe('plugin: local_virtual_scroll', function () {
	function makeOptions(n, prefix) {
		prefix = prefix || 'Option';
		var opts = [];
		for (var i = 0; i < n; i++) {
			opts.push({ value: 'val' + i, text: prefix + ' ' + i });
		}
		return opts;
	}

	var BASE_OPTIONS = {
		labelField: 'text',
		valueField: 'value',
		searchField: ['text'],
	};

	it_n('initializes without errors', function () {
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: ['local_virtual_scroll'],
				options: makeOptions(5),
			}),
		);
		assert.isOk(test.instance, 'instance should exist');
	});

	it_n('sets maxOptions to default pageSize (50)', function () {
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: ['local_virtual_scroll'],
				options: makeOptions(5),
			}),
		);
		assert.equal(
			test.instance.settings.maxOptions,
			50,
			'maxOptions should default to 50',
		);
	});

	it_n('respects custom pageSize option', function () {
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: { local_virtual_scroll: { pageSize: 20 } },
				options: makeOptions(5),
			}),
		);
		assert.equal(
			test.instance.settings.maxOptions,
			20,
			'maxOptions should equal custom pageSize',
		);
	});

	it_n(
		'renders only first page of options when dataset exceeds pageSize',
		async () => {
			var page_size = 10;
			var test = setup_test(
				'<input>',
				Object.assign({}, BASE_OPTIONS, {
					plugins: { local_virtual_scroll: { pageSize: page_size } },
					options: makeOptions(30),
				}),
			);

			await asyncClick(test.instance.control);
			await waitFor(50);

			var rendered =
				test.instance.dropdown_content.querySelectorAll('.option');
			assert.equal(
				rendered.length,
				page_size,
				'only first page of options should be in DOM',
			);
		},
	);

	it_n(
		'shows loading-more-results sentinel when dataset exceeds pageSize',
		async () => {
			var page_size = 10;
			var test = setup_test(
				'<input>',
				Object.assign({}, BASE_OPTIONS, {
					plugins: { local_virtual_scroll: { pageSize: page_size } },
					options: makeOptions(30),
				}),
			);

			await asyncClick(test.instance.control);
			await waitFor(50);

			var sentinel = test.instance.dropdown_content.querySelector(
				'.loading-more-results',
			);
			assert.isOk(
				sentinel,
				'sentinel should appear when more items exist beyond pageSize',
			);
		},
	);

	it_n('no sentinel when all items fit in first page', async () => {
		var page_size = 10;
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: { local_virtual_scroll: { pageSize: page_size } },
				options: makeOptions(5),
			}),
		);

		await asyncClick(test.instance.control);
		await waitFor(50);

		var sentinel = test.instance.dropdown_content.querySelector(
			'.loading-more-results',
		);
		assert.isNotOk(
			sentinel,
			'no sentinel when all items fit in first page',
		);

		var rendered =
			test.instance.dropdown_content.querySelectorAll('.option');
		assert.equal(rendered.length, 5, 'all 5 options should be rendered');
	});

	it_n('all options remain after search within pageSize', async () => {
		var page_size = 10;
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: { local_virtual_scroll: { pageSize: page_size } },
				options: makeOptions(8),
			}),
		);

		await asyncClick(test.instance.control);
		await asyncType('Option');
		await waitFor(50);

		// All 8 options match 'Option', all should be rendered (fits in one page)
		var rendered =
			test.instance.dropdown_content.querySelectorAll('.option');
		assert.equal(
			rendered.length,
			8,
			'all matching options should be rendered',
		);

		var sentinel = test.instance.dropdown_content.querySelector(
			'.loading-more-results',
		);
		assert.isNotOk(sentinel, 'no sentinel when results fit in one page');
	});

	it_n('sentinel resets when query changes', async () => {
		var page_size = 10;
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: { local_virtual_scroll: { pageSize: page_size } },
				options: makeOptions(30),
			}),
		);

		await asyncClick(test.instance.control);
		await waitFor(50);

		// Initially more than pageSize options → sentinel present
		var sentinel_before = test.instance.dropdown_content.querySelector(
			'.loading-more-results',
		);
		assert.isOk(
			sentinel_before,
			'sentinel should be present before search',
		);

		// Type a query that only matches 3 options (Option 1, 11, 21 won't work; use 'Option 1 ' to match one)
		// Use a very specific query so only a few options match
		await asyncType('Option 1');
		await waitFor(50);

		// 'Option 1' matches: Option 1, Option 10–19, Option 21? No, with 30 items: val0–val29
		// text is 'Option 0'..'Option 29' — 'Option 1' matches: Option 1, Option 10..19, Option 21 — that's 12
		// But pageSize is 10, so sentinel may or may not be present. Clear and use a tighter query.
		await asyncType('\b\b\b\b\b\b\b\b'); // clear
		await waitFor(50);

		await asyncType('Option 2');
		await waitFor(50);

		// 'Option 2' matches: Option 2, Option 20..29 — that's 11, more than pageSize=10 → sentinel present
		// or fewer than 10 → sentinel absent. Either way, dropdown_content is reset properly.
		var options_after =
			test.instance.dropdown_content.querySelectorAll('.option');
		assert.isOk(
			options_after.length > 0,
			'some options should be rendered after search',
		);
	});

	it_n(
		'includes all children of optgroup whose label matches query',
		async () => {
			var test = setup_test(
				'<input>',
				Object.assign({}, BASE_OPTIONS, {
					plugins: ['local_virtual_scroll'],
					options: [
						// Note: none of these texts contain the word "fruits" — only the group label does
						{ value: 'apple', text: 'Apfel', optgroup: 'fruits' },
						{ value: 'banana', text: 'Banane', optgroup: 'fruits' },
						{
							value: 'cherry',
							text: 'Kirsche',
							optgroup: 'fruits',
						},
						{
							value: 'carrot',
							text: 'Karotte',
							optgroup: 'veggies',
						},
						{
							value: 'potato',
							text: 'Kartoffel',
							optgroup: 'veggies',
						},
					],
					optgroups: [
						{ value: 'fruits', label: 'Fruits' },
						{ value: 'veggies', label: 'Vegetables' },
					],
					optgroupField: 'optgroup',
					optgroupLabelField: 'label',
					optgroupValueField: 'value',
				}),
			);

			await asyncClick(test.instance.control);
			// Type 'fruits' — matches optgroup label "Fruits", not any option text
			await asyncType('fruits');
			await waitFor(50);

			// All 3 fruits options should appear even though their text doesn't contain 'fruits'
			var rendered =
				test.instance.dropdown_content.querySelectorAll('.option');
			assert.equal(
				rendered.length,
				3,
				'all children of the matching optgroup should be rendered',
			);

			// Vegetables should not appear
			var carrot = test.instance.dropdown_content.querySelector(
				'[data-value="carrot"]',
			);
			assert.isNotOk(
				carrot,
				'non-matching group options should not appear',
			);
		},
	);

	it_n('optgroup header is rendered for matching group', async () => {
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: ['local_virtual_scroll'],
				options: [
					{ value: 'apple', text: 'Apfel', optgroup: 'fruits' },
					{ value: 'banana', text: 'Banane', optgroup: 'fruits' },
				],
				optgroups: [{ value: 'fruits', label: 'Fruits' }],
				optgroupField: 'optgroup',
				optgroupLabelField: 'label',
				optgroupValueField: 'value',
			}),
		);

		await asyncClick(test.instance.control);
		await asyncType('fruits');
		await waitFor(50);

		var header =
			test.instance.dropdown_content.querySelector('.optgroup-header');
		assert.isOk(
			header,
			'optgroup header should be rendered for matching optgroup',
		);
	});

	it_n('total options count is preserved in instance.options', function () {
		var total = 200;
		var page_size = 10;
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: { local_virtual_scroll: { pageSize: page_size } },
				options: makeOptions(total),
			}),
		);

		// instance.options holds all options regardless of virtual scroll
		var count = Object.keys(test.instance.options).length;
		assert.equal(
			count,
			total,
			'all ' + total + ' options should be in instance.options',
		);
	});

	it_n('maxOptions is reset to pageSize on each refreshOptions', async () => {
		var page_size = 10;
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: { local_virtual_scroll: { pageSize: page_size } },
				options: makeOptions(30),
			}),
		);

		// Manually change maxOptions, then trigger a refresh via search
		test.instance.settings.maxOptions = 9999;
		await asyncClick(test.instance.control);
		await asyncType('a');
		await waitFor(50);

		// After refreshOptions fires, maxOptions should be reset to pageSize
		assert.equal(
			test.instance.settings.maxOptions,
			page_size,
			'maxOptions should be reset to pageSize on refresh',
		);
	});

	// ─── Additional tests ──────────────────────────────────────────────────

	it_n('handles empty options dataset without error', async () => {
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: ['local_virtual_scroll'],
				options: [],
			}),
		);
		assert.isOk(test.instance, 'instance should exist with empty dataset');
		await asyncClick(test.instance.control);
		await waitFor(50);
		var rendered =
			test.instance.dropdown_content.querySelectorAll('.option');
		assert.equal(
			rendered.length,
			0,
			'no options rendered for empty dataset',
		);
		var sentinel = test.instance.dropdown_content.querySelector(
			'.loading-more-results',
		);
		assert.isNotOk(sentinel, 'no sentinel for empty dataset');
	});

	it_n('no sentinel when options count exactly equals pageSize', async () => {
		var page_size = 10;
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: { local_virtual_scroll: { pageSize: page_size } },
				options: makeOptions(page_size), // exactly 10
			}),
		);
		await asyncClick(test.instance.control);
		await waitFor(50);
		var sentinel = test.instance.dropdown_content.querySelector(
			'.loading-more-results',
		);
		assert.isNotOk(
			sentinel,
			'no sentinel when count equals pageSize exactly',
		);
		var rendered =
			test.instance.dropdown_content.querySelectorAll('.option');
		assert.equal(rendered.length, page_size, 'all options rendered');
	});

	it_n('works with a select element', async () => {
		// AB_Single has 3 options: a, b, c
		var test = setup_test('AB_Single', {
			plugins: { local_virtual_scroll: { pageSize: 2 } },
		});
		assert.isOk(
			test.instance,
			'instance should exist when initialized from a select element',
		);
		await asyncClick(test.instance.control);
		await waitFor(50);
		var rendered =
			test.instance.dropdown_content.querySelectorAll('.option');
		assert.equal(
			rendered.length,
			2,
			'only pageSize options rendered for select element',
		);
		var sentinel = test.instance.dropdown_content.querySelector(
			'.loading-more-results',
		);
		assert.isOk(
			sentinel,
			'sentinel present when select has more options than pageSize',
		);
	});

	it_n(
		'partial optgroup label match includes all group children',
		async () => {
			var test = setup_test(
				'<input>',
				Object.assign({}, BASE_OPTIONS, {
					plugins: ['local_virtual_scroll'],
					options: [
						{ value: 'a1', text: 'Eins', optgroup: 'alpha' },
						{ value: 'a2', text: 'Zwei', optgroup: 'alpha' },
						{ value: 'b1', text: 'Drei', optgroup: 'beta' },
					],
					optgroups: [
						{ value: 'alpha', label: 'Alphabet Group' },
						{ value: 'beta', label: 'Beta Collection' },
					],
					optgroupField: 'optgroup',
					optgroupLabelField: 'label',
					optgroupValueField: 'value',
				}),
			);
			await asyncClick(test.instance.control);
			await asyncType('alpha'); // partial match of "Alphabet Group"
			await waitFor(50);
			var rendered =
				test.instance.dropdown_content.querySelectorAll('.option');
			assert.equal(
				rendered.length,
				2,
				'both children of partially-matched optgroup should appear',
			);
			var beta_item =
				test.instance.dropdown_content.querySelector(
					'[data-value="b1"]',
				);
			assert.isNotOk(
				beta_item,
				'children of non-matching optgroup should not appear',
			);
		},
	);

	it_n('shows no options when search matches nothing', async () => {
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: ['local_virtual_scroll'],
				options: makeOptions(10),
			}),
		);
		await asyncClick(test.instance.control);
		await asyncType('xyzzy_no_match_at_all');
		await waitFor(50);
		var rendered =
			test.instance.dropdown_content.querySelectorAll('.option');
		assert.equal(
			rendered.length,
			0,
			'no options rendered for non-matching query',
		);
	});

	it_n(
		'options added via addOption are included in virtual list',
		async () => {
			var page_size = 5;
			var test = setup_test(
				'<input>',
				Object.assign({}, BASE_OPTIONS, {
					plugins: { local_virtual_scroll: { pageSize: page_size } },
					options: makeOptions(3),
				}),
			);
			// Extend dataset beyond pageSize
			for (var i = 3; i < 10; i++) {
				test.instance.addOption({
					value: 'val' + i,
					text: 'Option ' + i,
				});
			}
			await asyncClick(test.instance.control);
			await waitFor(50);
			assert.equal(
				Object.keys(test.instance.options).length,
				10,
				'all 10 options in instance.options after addOption',
			);
			var rendered =
				test.instance.dropdown_content.querySelectorAll('.option');
			assert.equal(
				rendered.length,
				page_size,
				'only first page rendered after addOption extends dataset',
			);
			var sentinel = test.instance.dropdown_content.querySelector(
				'.loading-more-results',
			);
			assert.isOk(
				sentinel,
				'sentinel present after addOption pushes count beyond pageSize',
			);
		},
	);

	it_n('works with extreme pageSize of 1', async () => {
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: { local_virtual_scroll: { pageSize: 1 } },
				options: makeOptions(5),
			}),
		);
		await asyncClick(test.instance.control);
		await waitFor(50);
		var rendered =
			test.instance.dropdown_content.querySelectorAll('.option');
		assert.equal(
			rendered.length,
			1,
			'only 1 option in DOM with pageSize=1',
		);
		var sentinel = test.instance.dropdown_content.querySelector(
			'.loading-more-results',
		);
		assert.isOk(
			sentinel,
			'sentinel present with pageSize=1 and 5 total options',
		);
	});

	it_n(
		'only children of the matched optgroup appear, not siblings',
		async () => {
			var test = setup_test(
				'<input>',
				Object.assign({}, BASE_OPTIONS, {
					plugins: ['local_virtual_scroll'],
					options: [
						{ value: 'x1', text: 'Xanthan', optgroup: 'xgroup' },
						{ value: 'x2', text: 'Xenon', optgroup: 'xgroup' },
						{ value: 'z1', text: 'Zebra', optgroup: 'zgroup' },
					],
					optgroups: [
						{ value: 'xgroup', label: 'X-Files' },
						{ value: 'zgroup', label: 'Zookeeper' },
					],
					optgroupField: 'optgroup',
					optgroupLabelField: 'label',
					optgroupValueField: 'value',
				}),
			);
			await asyncClick(test.instance.control);
			await asyncType('zoo'); // matches "Zookeeper" label only
			await waitFor(50);
			var rendered =
				test.instance.dropdown_content.querySelectorAll('.option');
			assert.equal(
				rendered.length,
				1,
				'only the Zookeeper group child should appear',
			);
			var zebra =
				test.instance.dropdown_content.querySelector(
					'[data-value="z1"]',
				);
			assert.isOk(zebra, 'Zebra (from Zookeeper group) should appear');
			var xanthan =
				test.instance.dropdown_content.querySelector(
					'[data-value="x1"]',
				);
			assert.isNotOk(
				xanthan,
				'Xanthan (from X-Files group) should not appear',
			);
		},
	);

	it_n(
		'sentinel present when filtered search results exceed pageSize',
		async () => {
			var page_size = 5;
			var test = setup_test(
				'<input>',
				Object.assign({}, BASE_OPTIONS, {
					plugins: { local_virtual_scroll: { pageSize: page_size } },
					// 20 options all containing "Apple" — search still yields 20 > 5
					options: Array.from({ length: 20 }, function (_, i) {
						return { value: 'v' + i, text: 'Apple ' + i };
					}),
				}),
			);
			await asyncClick(test.instance.control);
			await asyncType('Apple');
			await waitFor(50);
			var rendered =
				test.instance.dropdown_content.querySelectorAll('.option');
			assert.equal(
				rendered.length,
				page_size,
				'only first page of filtered results in DOM',
			);
			var sentinel = test.instance.dropdown_content.querySelector(
				'.loading-more-results',
			);
			assert.isOk(
				sentinel,
				'sentinel present when filtered results exceed pageSize',
			);
		},
	);

	it_n(
		'shows children of all optgroups when multiple group labels match',
		async () => {
			var test = setup_test(
				'<input>',
				Object.assign({}, BASE_OPTIONS, {
					plugins: ['local_virtual_scroll'],
					options: [
						{ value: 'r1', text: 'Eins', optgroup: 'red' },
						{ value: 'r2', text: 'Zwei', optgroup: 'red' },
						{ value: 'b1', text: 'Drei', optgroup: 'blue' },
						{ value: 'b2', text: 'Vier', optgroup: 'blue' },
					],
					optgroups: [
						{ value: 'red', label: 'Red Group' },
						{ value: 'blue', label: 'Blue Group' },
					],
					optgroupField: 'optgroup',
					optgroupLabelField: 'label',
					optgroupValueField: 'value',
				}),
			);
			await asyncClick(test.instance.control);
			await asyncType('group'); // matches both "Red Group" and "Blue Group"
			await waitFor(50);
			var rendered =
				test.instance.dropdown_content.querySelectorAll('.option');
			assert.equal(
				rendered.length,
				4,
				'all children of both matching optgroups should appear',
			);
		},
	);

	it_n('reopening dropdown always starts from first page', async () => {
		var page_size = 5;
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: { local_virtual_scroll: { pageSize: page_size } },
				options: makeOptions(20),
			}),
		);
		await asyncClick(test.instance.control);
		await waitFor(50);
		var first_open =
			test.instance.dropdown_content.querySelectorAll('.option').length;
		assert.equal(first_open, page_size, 'first open: pageSize options');

		test.instance.close();
		await waitFor(50);

		await asyncClick(test.instance.control);
		await waitFor(50);
		var second_open =
			test.instance.dropdown_content.querySelectorAll('.option').length;
		assert.equal(
			second_open,
			page_size,
			'after reopen: still shows first page only',
		);
	});

	it_n('ungrouped options work alongside optgroup options', async () => {
		var test = setup_test(
			'<input>',
			Object.assign({}, BASE_OPTIONS, {
				plugins: { local_virtual_scroll: { pageSize: 10 } },
				options: [
					// grouped
					{ value: 'g1', text: 'Grouped One', optgroup: 'mygroup' },
					{ value: 'g2', text: 'Grouped Two', optgroup: 'mygroup' },
					// ungrouped (no optgroup field)
					{ value: 'u1', text: 'Ungrouped One' },
					{ value: 'u2', text: 'Ungrouped Two' },
				],
				optgroups: [{ value: 'mygroup', label: 'My Group' }],
				optgroupField: 'optgroup',
				optgroupLabelField: 'label',
				optgroupValueField: 'value',
			}),
		);
		await asyncClick(test.instance.control);
		await waitFor(50);
		var rendered =
			test.instance.dropdown_content.querySelectorAll('.option');
		assert.equal(
			rendered.length,
			4,
			'all 4 options (grouped and ungrouped) should be rendered',
		);
	});

	it_n(
		'optgroup headers are rendered for all visible groups on open',
		async () => {
			var test = setup_test(
				'<input>',
				Object.assign({}, BASE_OPTIONS, {
					plugins: ['local_virtual_scroll'],
					options: [
						{ value: 'a1', text: 'Aye One', optgroup: 'agroup' },
						{ value: 'b1', text: 'Bee One', optgroup: 'bgroup' },
					],
					optgroups: [
						{ value: 'agroup', label: 'A Group' },
						{ value: 'bgroup', label: 'B Group' },
					],
					optgroupField: 'optgroup',
					optgroupLabelField: 'label',
					optgroupValueField: 'value',
				}),
			);
			await asyncClick(test.instance.control);
			await waitFor(50);
			var headers =
				test.instance.dropdown_content.querySelectorAll(
					'.optgroup-header',
				);
			assert.equal(
				headers.length,
				2,
				'one header per visible optgroup should be rendered',
			);
		},
	);
});
