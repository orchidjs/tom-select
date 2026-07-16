
describe('plugin: virtual_scroll', function() {


	function DataProvider(query,page=0){
		var data = [];

		for( let i =0; i < 20; i++){
			data.push({value:`${query}-${page}-${i}`});
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

		let load_calls = 0;

		const test = setup_test('<input>',{
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

		let executor = (resolve) => test.instance.on('load', () => {
			test.instance.off('load');
			resolve();
		});

		// load first set of data for "a"
		let dataLoaded = new Promise(executor);
		await asyncClick(test.instance.control);
		await asyncType('a');
		await dataLoaded;
		assert.equal( Object.keys(test.instance.options).length,20,'should load first set of data');
		const loadingMoreIndicator = test.instance.dropdown_content.querySelector('.loading-more-results');
		assert.isNotNull( loadingMoreIndicator, 'should have loading_more template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.no-more-results').length, 0 ,'should not have no-more-results template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.option').length, 21 ,'Should display 20 options plus .loading-more-results');

		assert.equal( load_calls, 1);

		const lastOption = loadingMoreIndicator.previousElementSibling;

		// load second set of data for "a"
		dataLoaded = new Promise(executor);
		test.instance.setActiveOption(loadingMoreIndicator); // scroll to bottom
		await dataLoaded;
		assert.equal( Object.keys(test.instance.options).length, 40,'should load second set of data');
		assert.equal( lastOption, test.instance.activeOption, 'previous dataset’s last option should be active')
		assert.equal( test.instance.dropdown_content.querySelectorAll('.loading-more-results').length, 0, 'should not have loading_more template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.no-more-results').length, 1 ,'should have no-more-results template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.option').length, 31 ,'Should display 30 options plus .no-more-results');
		assert.equal( load_calls, 2);


		// don't load any more data for "a"
		test.instance.scroll(2000,'auto'); // scroll to bottom
		await waitFor(500); // wait for scroll + more data to load
		assert.equal( Object.keys(test.instance.options).length, 40,'should not have more data');
		assert.equal( load_calls, 2);


		// load first set of data for "b"
		dataLoaded = new Promise(executor);
		await asyncType('\bb');
		await dataLoaded;
		assert.equal( Object.keys(test.instance.options).length,20,'should load new set of data for "b"');
		assert.equal( load_calls, 3);
	});



	it_n('keyboard navigation',async ()=>{

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
			},
			shouldLoadMore:function(){
				if( this.activeOption && this.activeOption == this.dropdown_content.querySelector('.loading-more-results') ){
					return true;
				}
				return false;
			}
		});

		// load first set of data for "a"
		await asyncClick(test.instance.control);
		await asyncType('a');
		await waitFor(100); // wait for data to load

		var loading_more = test.instance.dropdown_content.querySelector('.loading-more-results');
		assert.equal( Object.keys(test.instance.options).length,20,'should load first set of data');
		assert.isOk( loading_more, 'should have loading-more-reuslts template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.no-more-results').length, 0 ,'should not have no-more-results template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.option').length, 21 ,'Should display 20 options plus .loading-more-results');

		assert.equal( load_calls, 1);

		// get index of loading_more tempalte
		var selectable	= test.instance.selectable();
		var index		= [].indexOf.call(selectable, loading_more);


		var len = test.instance.selectable().length - 1;
		for(var i = 0; i < len; i ++ ){
			await asyncType('[down]');
		}

		await waitFor(500); // wait for scroll + more data to load


		var selectable	= test.instance.selectable();
		var index		= [].indexOf.call(selectable, test.instance.activeOption);
		assert.equal(index,index,'active option should be first of newest options');
		assert.equal( Object.keys(test.instance.options).length, 40,'should load second set of data');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.loading-more-results').length, 0, 'should not have loading-more-reuslts template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.no-more-results').length, 1 ,'should have no-more-results template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.option').length, 31 ,'Should display 30 options plus .no-more-results');
		assert.equal( load_calls, 2);

	});


	it_n('restore preloaded options after search is cleared',async ()=>{

		var load_calls = 0;

		var test = setup_test('<input>',{
			plugins:['virtual_scroll'],
			labelField: 'value',
			valueField: 'value',
			searchField: 'value',
			preload: true,
			loadThrottle: 1,
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

		// wait for preload to complete
		await waitFor(100);
		assert.equal( Object.keys(test.instance.options).length, 20, 'should have preloaded options');
		assert.equal( load_calls, 1);

		// search for "a"
		await asyncClick(test.instance.control);
		await asyncType('a');
		await waitFor(100);
		assert.equal( load_calls, 2);

		// clear search - preloaded options should be restored
		await asyncType('\b');
		await waitFor(100);
		assert.equal( Object.keys(test.instance.options).length, 20, 'should restore preloaded options after clearing search');

		// verify none of the search results leaked through
		var option_keys = Object.keys(test.instance.options);
		var has_search_results = option_keys.some(k => k.startsWith('a-'));
		assert.isFalse( has_search_results, 'should not contain stale search results');
	});


	it_n('recovers when a stale preload response resolves after a search has already started',async ()=>{

		var load_calls = 0;
		var resolvePreload;

		var test = setup_test('<input>',{
			plugins:['virtual_scroll'],
			labelField: 'value',
			valueField: 'value',
			searchField: 'value',
			preload: 'focus',
			loadThrottle: 1,
			firstUrl: function(query){
				return [query,0];
			},
			load: function(query, callback) {
				load_calls++;
				var url_params		= this.getUrl(query);
				var self			= this;

				// Hold back the preload's response so it can be resolved later, after the user
				// has already started (and received results for) a search - simulating a slow
				// network response for a request fired on focus, immediately followed by typing.
				if( query === '' ){
					resolvePreload = function(){
						var data = DataProvider(url_params[0],url_params[1]);
						self.setNextUrl(query,[query,url_params[1]+1]);
						callback(data.data);
					};
					return;
				}

				var data = DataProvider(url_params[0],url_params[1]);
				this.setNextUrl(query,[query,url_params[1]+1]);
				callback(data.data);
			}
		});

		// Focus triggers the preload, but its response is deliberately not resolved yet.
		await asyncClick(test.instance.control);
		assert.equal( load_calls, 1, 'preload should have been requested');

		// Type a search before the preload resolves - this fetches and displays its own results.
		await asyncType('a');
		await waitFor(100);
		assert.equal( load_calls, 2, 'search should have been requested');
		assert.equal( Object.keys(test.instance.options).length, 20, 'should show only the search results');

		// The stale preload response now lands, after the query has already moved on.
		resolvePreload();
		await waitFor(100);

		// Clearing the search must not wipe the options, even though the preload never
		// completed while the query was actually empty.
		await asyncType('\b');
		await waitFor(100);

		assert.isAbove( Object.keys(test.instance.options).length, 0, 'options should not be wiped out after clearing search');
		assert.equal( load_calls, 3, 'clearing the search should re-request the preload since it never completed');
	});


	it_n('virtual scroll works after clearing search',async ()=>{

		var load_calls = 0;

		var test = setup_test('<input>',{
			plugins:['virtual_scroll'],
			labelField: 'value',
			valueField: 'value',
			searchField: 'value',
			preload: true,
			loadThrottle: 1,
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

		// wait for preload
		await waitFor(100);
		assert.equal( load_calls, 1);

		// search and clear
		await asyncClick(test.instance.control);
		await asyncType('a');
		await waitFor(100);
		await asyncType('\b');
		await waitFor(100);

		// scroll to bottom - should trigger loading more
		test.instance.scroll(1000,'auto');
		await waitFor(500);
		assert.isAbove( Object.keys(test.instance.options).length, 20, 'should load more options after clearing search and scrolling');
	});


	it_n('keep default options',async ()=>{


		var test = setup_test('AB_Multi',{
			plugins:['virtual_scroll'],
			loadThrottle: 1,
			firstUrl: function(query){
				return [query,0];
			},
			load: function(query, callback) {
				callback({});
			}
		});

		const values_before = Object.keys(test.instance.options);

		// load first set of data for "a"
		await asyncClick(test.instance.control);
		await asyncType('a');
		await waitFor(100); // wait for data to load
		assert.deepEqual( Object.keys(test.instance.options), values_before);
	});
});
