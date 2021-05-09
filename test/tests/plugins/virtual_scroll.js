
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

	it_n('loads data',async ()=>{

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
				var url_params		= this.getUrl(query);
				var data			= DataProvider(url_params[0],url_params[1]);
				this.setNextUrl(query,[query,url_params[1]+1]);
				callback(data.data);
			}
		});

		
		await asyncClick(test.instance.control);
		await asyncType('a',test.instance.control_input);
		await waitFor(100); // wait for data to load
		assert.equal( Object.keys(test.instance.options).length,20);

		test.instance.dropdown_content.scroll({top:1000}); // scroll to bottom
		await waitFor(500); // wait for scroll + more data to load
		assert.equal( Object.keys(test.instance.options).length, 40);

	});

});
