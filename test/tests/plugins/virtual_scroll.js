
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

		// load first set of data for "a"
		await asyncClick(test.instance.control);
		await asyncType('a');
		await waitFor(100); // wait for data to load
		assert.equal( Object.keys(test.instance.options).length,20,'should load first set of data');
		const loadingMoreIndicator = test.instance.dropdown_content.querySelector('.loading-more-results');
		assert.isNotNull( loadingMoreIndicator, 'should have loading_more template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.no-more-results').length, 0 ,'should not have no-more-results template');
		assert.equal( test.instance.dropdown_content.querySelectorAll('.option').length, 21 ,'Should display 20 options plus .loading-more-results');

		assert.equal( load_calls, 1);

		const lastOption = loadingMoreIndicator.previousElementSibling;

		// load second set of data for "a"
		test.instance.setActiveOption(loadingMoreIndicator); // scroll to bottom
		await waitFor(500); // wait for scroll + more data to load
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
		await asyncType('\bb');
		await waitFor(500); // wait for data to load
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
