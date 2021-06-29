
describe('plugin: virtual_scroll', function() {


	function DataProvider(query,page=0){
		var data = [];

		for( let i =0; i < 20; i++){
			data.push({value:`z-${page}-${query.repeat(i+1)}`});
		}

		return {data:data,next_page:page+1};
	}


	it_n('throws error without firstUrl setting', ()=> {

		let errors = 0 ;
		try {
			setup_test('<input>', {plugins: ['virtual_scroll']});
		} catch (error) {
			errors++;
		}

		assert.equal(errors,1);
	});

	it_n('load more data while scrolling',async ()=>{

		var load_calls = 0;

		var test = setup_test('<input>',{
			plugins:['virtual_scroll'],
			labelField: 'value',
			valueField: 'value',
			searchField: 'value',
			loadThrottle: 1,
			maxOptions: 30,
			firstUrl: function(query){
				return [query,0];
			},
			load: function(query, callback) {
				load_calls++;
				var url_params		= this.getUrl(query);
				var data			= DataProvider(url_params[0],url_params[1]);
				this.setNextUrl(query,[query,url_params[1]+1]);
				callback(data.data);
			}
		});

		// load first set of data for "a"
		await asyncClick(test.instance.control);
		await asyncType('a',test.instance.control_input);
		await waitFor(100); // wait for data to load
		assert.equal( Object.keys(test.instance.options).length,20,'should load first set of data');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.loading-more-results').length, 1, 'should have loading-more-reuslts template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.no-more-results').length, 0 ,'should not have no-more-results template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.option').length, 21 ,'Should display 20 options plus .loading-more-results');

		assert.equal( load_calls, 1);


		// load second set of data for "a"
		test.instance.scroll(1000,'auto'); // scroll to bottom
		await waitFor(500); // wait for scroll + more data to load
		assert.equal( Object.keys(test.instance.options).length, 40,'should load second set of data');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.loading-more-results').length, 0, 'should not have loading-more-reuslts template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.no-more-results').length, 1 ,'should have no-more-results template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.option').length, 31 ,'Should display 30 options plus .no-more-results');
		assert.equal( load_calls, 2);


		// don't load any more data for "a"
		test.instance.scroll(2000,'auto'); // scroll to bottom
		await waitFor(500); // wait for scroll + more data to load
		assert.equal( Object.keys(test.instance.options).length, 40,'should not have more data');
		assert.equal( load_calls, 2);


		// load first set of data for "b"
		await asyncType('\bb',test.instance.control_input);
		await waitFor(100); // wait for data to load
		assert.equal( Object.keys(test.instance.options).length,20,'should load new set of data for "b"');
		assert.equal( load_calls, 3);
	});

});
