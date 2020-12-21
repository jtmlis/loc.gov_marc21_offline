/**
 * @author chth
 * @projectDescription 
 * 		provides basic tabs for description page.
 */
(function($){

	$(document).ready(function(){
		//info is our context for all searchs
		//to reduce the scope of the selectors
		var info = $("#info");
		$("#marc, #copies", info).hide();
		$("#marc, #onsite", info).hide();
		
		$("#bibtabs li a", info).bind('click', function(event){
			var active = event.target.hash;
			$('li.active', info).toggleClass('active');
			$(event.target).parent().toggleClass('active');
			$('> div', info).hide();
			$(active, info).show();
			event.stopPropagation();
			event.preventDefault();
		});
	});

})(jQuery);