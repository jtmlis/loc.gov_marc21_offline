

jQuery(function($){
	var _once;
	var searchForm = $('#search_form'),
		advancedSearch = $('#advanced_search'),
		searchHandler = function(event){
			var target,
				parent,
				id;
			target = $(event.target);
			id = $(target).attr('href');
            if(id.match(/advanced/)){
				$(searchForm).toggleClass('advanced');
                if($(searchForm).hasClass('advanced')){
                    $(target).text('Basic');
                }else{
                    $(target).text('Advanced');
                }
			    event.preventDefault();
                return;
			}
            $('li', $(target).parent().parent()).removeClass('selected');
            $(target).parent().addClass('selected');
			if(id.match(/all$/)){
				$(searchForm).removeClass().addClass('all');
			}else if(id.match(/collection/)){
				$(searchForm).removeClass().addClass('collection');
			} 
			event.preventDefault();
		};
		
    
    if(!_once){
        _once = true;
    	$('a[href*=#show_search_]', searchForm).each(function(){
    		$(this).bind('click', searchHandler);
    	});
    	
    	$(searchForm).bind('submit', function(event){
    		event.preventDefault();
    		event.stopPropagation();
    		
    		var search = event.currentTarget,
    			params = {
    				q: search.q.value
    			},
    			url = '?';
    		if(search.q.value == '') return false;
    		/*if(search.sp.value != '1'){
    			params.sp = search.sp.value;
    		}*/
    		if(search.c.value != ''){
    			params.c = search.c.value;
    		}
    		if(search.st.value != 'list'){
    			params.st = search.st.value;
    		}
    		/*if(search.sb.value != 'sort_title'){
    			params.sb = search.sb.value;
    		}*/
    		if(search.co.value != '' && !($(searchForm).hasClass('all'))){
    			params.co = search.co.value;
    		}
    		if(search.fi.value !== 'all'){
    			params.fi = search.fi.value;
    		}
    		if(search.op.value !== 'AND'){
    			params.op = search.op.value;
    		}
    		if(search.va.value !== 'all'){
    			params.va = search.va.value;
    		}
            if(search.sg.value !== 'false'){
    			params.sg = search.sg.value;
    		}
    		url = url+serialize(params);
    		window.location = search.action + url;
    		return false;
    	});
    }
	
	var serialize = function(a){
		var s = [ ];

		function add( key, value ){
			s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		};
		// Serialize the key/values
		for ( var j in a )
			// If the value is an array then the key names need to be repeated
			if ( $.isArray(a[j]) )
				$.each( a[j], function(){
					add( j, this );
				});
			else
				add( j, jQuery.isFunction(a[j]) ? a[j]() : a[j] );
				
		return s.join('&');
	};
});


jQuery(function($){
    
    var auto;
    //fix IE png issues
    $('#search_arrow > img').ifixpng();
    
    var common_settings = { 
        serviceUrl:'/pictures/suggest/',
        minChars:2, 
        delimiter: /(,|;)\s*/, // regex or character
        //maxHeight:400,
        width:425,
        zIndex: 9999,
        deferRequestBy: 100, //miliseconds
        noCache: false, //default is false, set to true to disable caching
        autoSubmit: true
    };
    if(!$('#search_tabs li.selected #search_all').length){

        auto = $('#ppocsearch').ppocsuggest($.extend({ 
            params: { co: $('#co_input').attr('value')}
        }, common_settings));
    }else{
        auto = $('#ppocsearch').ppocsuggest(common_settings);
    }
    
    $('#search_all').bind('click', function(){
        auto.disable();auto.clearCache();
        auto = null;
        auto = $('#ppocsearch').ppocsuggest(common_settings);
        auto.enable();
    });
    $('#search_collection').bind('click', function(){
        auto.disable();auto.clearCache();
        auto = null;
        auto = $('#ppocsearch').ppocsuggest($.extend({ 
            params: { co: $('#co_input').attr('value')}
        },common_settings));
        auto.enable();
    });
    
    
});
