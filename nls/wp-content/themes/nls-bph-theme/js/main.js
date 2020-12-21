if ( jQuery ) {
	( function ( $ ) {
		"use strict";
		$( document ).ready( function() {
			$( '#megamenu' ).accessibleMegaMenu();
			/**
			 * Prevent the megamenu from flashing after page load.
			 */
			$( '#megamenu .init' ).removeClass( 'init' );
                       
			$( '#validate_form' ).validate( {
				errorPlacement: function( error, element ) {
                                        error.insertBefore('#validate_form');
					error.attr( 'aria-role', 'alert' );
				},
				errorElement: "p",
                                focusInvalid:false,
			});
			$( 'form' ).attr( 'novalidate', 'novalidate' );
                        

                        $.validator.messages.required = function (param, input){
                            //if error not already displayed, then return it
                            if($('#'+input.id+'1')[0]){                                                                                            
                                //do nothing
                            }else{
                                return '<a href="#'+input.id+'" class="errorMessage" id="'+input.id+'1">error: '+ input.name + ' field is required </a>';
                            }

                        }; 

                        //on submit if errorMessage class exists, focus
                        $( '#validate_form' ).submit(function(event){
                           
                            if($("a.errorMessage")[0]){                                
                                $("a.errorMessage")[0].focus();
                            }
                        });
                    
                        //add nav and aria-label to ul quick links
                        $('ul#menu-quick-links').wrap('<nav aria-label="Quick Links"></nav>');
                           
                        // video player can be a slow loader
                        // keep checking until the accessible controls have loaded
                        // which means video is loaded and dom elements can be removed
                        var existCondition = setInterval(function(){
                            if($('h2.accessible-controls').length){
                                    clearInterval(existCondition);
                                    editVideoPlayer();
                            };
                            if($('div.ml-share-div').length){
                                $('div.ml-share-div').remove();
                            }
                        }, 500); //check every 500 ms until class exists

                        function editVideoPlayer(){

                            console.log('editVideoPlayer called');

                            $('div.loc-video-controller-inner ul').addClass('on-off');
                            
                            $('div.loc-video-controller-inner ul li button').removeAttr('tabindex');

                            //removes blank tabable target around the video
                            $('.jwplayer').removeAttr('tabindex');

                            $('h2.accessible-controls').remove();
                            
                            $('h2.share-button').remove();
                            
                            $('button[aria-label="Play"]').addClass('togglePlayPause');
                                                        
                            $('.togglePlayPause span').text('Play');
                            
                                                        
                            //upper case 'Seconds'
                            var forward = $('span:contains("Forward")');                            
                            forward.text('Forward 10 Seconds');
                            
                            var rewind = $('span:contains("Rewind")');                            
                            rewind.text('Rewind 10 Seconds');                            
                            
                            /* original single video instance
                            $('.togglePlayPause').click(function(){                            
                                
                                var text = $('.togglePlayPause span').text();
                                
                                if(text === 'Play'){
                                    $('.togglePlayPause span').text('Pause');
                                    $('.togglePlayPause').attr("aria-label", "Pause");
                                }else{
                                    $('.togglePlayPause span').text('Play');
                                    $('.togglePlayPause').attr("aria-label", "Play");
                                }

                            });                            
                            */
                           
                            // 01102017 - reconfigured for multi audio/video on a page
                            $('.togglePlayPause').click(function(){                            
                                
                                var text = $('span', this).text();
                                
                                if(text === 'Play'){                                    
                                    $('span', this).text('Pause');
                                    $(this).attr("aria-label", "Pause");
                                }else{                                   
                                    $('span', this).text('Play');
                                    $(this).attr("aria-label", "Play");
                                }
                            });                             
                            

                                                       
                            $('button[aria-label="Pause"]').parent().remove();
                            
                            $('span.jw-text.jw-reset.jw-text-elapsed').attr("aria-label", "Time elapsed of video");
                            
                            $('span.jw-text.jw-reset.jw-text-duration').attr("aria-label", "Total Time of video");
                            
                            //prepend a div to the video
                            $('<div class="videoTitle"><h3></h3></div>').insertBefore('div.largeview.mediaobject.video-object');

                            var videoCustomTitle = $('span.videoCustomTitle').text();
                            var videoTitle;
                            if(videoCustomTitle){
                                videoTitle = videoCustomTitle;
                            }else{
                                videoTitle = $('.jw-title-primary.jw-reset').text();                                
                            }
                            
                            $('.videoTitle h3').text(videoTitle);

                            //miev jan 2018                            
                            //if a multi video page - use custom titles                               
                            $('.videoTitle').each(function(i){                                   
                               //find nearest videoobject span text
                               var newText = $(this).next('.video-object').children('span').text();                                   
                               //console.log('output: '+ newText + (i+1));                                   
                               $('h3', this).text(newText);
                            });                                                                                                
                            //end multi                            
                            
                            
                            $('.jw-title-primary.jw-reset').parent().remove();
                                                        
                            $('.loc-video-controller-inner').removeAttr('aria-role');                            
                            
                        }   
                        
                        //remove link from phone number in menu
                        $('ul.utility-menu.top-utility-links.second-row li:last-of-type a').
                                replaceWith($('ul.utility-menu.top-utility-links.second-row li:last-of-type a').text());
                                                
                        $('button.a11y-toggle-contrast').attr("aria-label", "Change page contrast");
                        
                                               
                        //hide contrast tooltip                                                
                        $('button span.offscreen').remove();
                       
                        // remove inline slider style
                        // slider can be a slow loader
                        /*
                        var sliderExistCondition = setInterval(function(){
                            if($('h2.accessible-controls').length){
                                    clearInterval(sliderExistCondition);                                    
                            };
                            if($('div.ms-slide-info').length){
                                $('div.ms-slide-info').css("min-height","");
                            }
                        }, 500); //check every 500 ms until class exists
                        */    
                       
                        $('ul#menu-miscellaneous-menu li a').append(' <i class="icon external"><span>External</span></i></a>');
                       
                        $('ul#menu-miscellaneous-menu li a:contains("Facebook")').before('<i class="icon facebook"></i> ');
                       
                        resizeBox();
		});
                
	}( jQuery ) );
}