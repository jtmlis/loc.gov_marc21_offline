function resizeBox(){
         
        //when called, remove the existing boxed-blurb size
        jQuery(".boxed-blurb").css("height", "");
    
	var heights = jQuery(".boxed-blurb").map(function() {
			return jQuery(this).height();
		}).get(),

		maxHeight = Math.max.apply(null, heights);
	// maxHeight = maxHeight + 10;                

        // if no maxHeight, or very large, set a default
        if(maxHeight === '' || maxHeight === null || maxHeight >= 1000){
            maxHeight = 350;
        }
                
	jQuery(".boxed-blurb").css("height", maxHeight);
        
        //adjust header-blurb sizes
        //less than 850px do not make heights match
        jQuery(".header-blurb").css("height", "");
    
	var headerHeights = jQuery(".header-blurb").map(function() {
			return jQuery(this).height();
		}).get(),

		maxHeaderBlurbHeight = Math.max.apply(null, headerHeights);
	// maxHeight = maxHeight + 10;                

        // if no maxHeight, or very large, set a default        
        var clientWidth = jQuery(window).width();
        
        if(clientWidth > 840){

            if(maxHeaderBlurbHeight === '' || maxHeaderBlurbHeight === null || maxHeaderBlurbHeight >= 1000){
                maxHeaderBlurbHeight = 350;
            }

            jQuery(".header-blurb").css("height", maxHeaderBlurbHeight);            
            
        }       
        
        
}

//jQuery(window).load(function() { - deprecated
jQuery(window).on("load", function() {
	resizeBox();
});
     
jQuery(window).bind('resize', function(){        
	//remove the height element
	jQuery(".boxed-blurb").css("height", "");        
        jQuery(".header-blurb").css("height", "");
	resizeBox();
});
