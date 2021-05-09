
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

	it_n('loads data',function(done){

		var test = setup_test('<input>',{
			plugins:['virtual_scroll'],
			labelField: 'value',
			valueField: 'value',
			searchField: 'value',
			loadThrottle: 1,
			maxOptions: 50,
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

		click(test.instance.control, function(){
			syn.type('a', test.instance.control_input,function(){

				// wait for data to load
				setTimeout(function(){
					assert.equal( Object.keys(test.instance.options).length,20);

					// scroll to bottom
					test.instance.dropdown_content.scroll({top:1000});

					// wait for more data to load
					setTimeout(function(){
						assert.equal( Object.keys(test.instance.options).length, 40);
						done();
					},500); // greater than load throttle + scroll time

				},10); // greater than load throttle
			});
		});

	});

});
