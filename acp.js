// Ajax Comment Posting
// WordPress plugin
// version 2.0

jQuery(document).ready(function($){

	jQuery.noConflict();

	/* acp_lang[]:
	   [0]: 'Loading...'
	   [1]: 'Please enter your name.'
	   [2]: 'Please enter your email address.'
	   [3]: 'Please enter a valid email address.'
	   [4]: 'Please enter your comment'
	   [5]: 'Your comment has been added.'
	   [6]: 'ACP error!'
	*/

	// initialise
	var form, err, reply;
	function acp_initialise() {
	    jQuery('#commentform').after('<div id="error"></div>');
	    jQuery('#submit').after('<img src="'+acp_path+'loading.gif" id="loading" alt="'+acp_lang[0]+'" />');
	    jQuery('#loading').hide();
	    form = jQuery('#commentform');
	    err = jQuery('#error');
	    reply = false;
	}
	acp_initialise();
	
	jQuery('.comment-reply-link').live('click', function() {
		// checks if it's a reply to a comment
	        reply = jQuery(this).parents('.depth-1').attr('id');
		err.empty();
	    });

	jQuery('#cancel-comment-reply-link').live('click', function() {
		reply = false;
	    });	
	
        jQuery('#commentform').live('submit', function(evt) {

		err.empty();
    
		if(form.find('#author')[0]) {
		    // if not logged in, validate name and email
		    if(form.find('#author').val() == '') {
			err.html('<span class="error">'+acp_lang[1]+'</span>');
			return false;
		    }
		    if(form.find('#email').val() == '') {
			err.html('<span class="error">'+acp_lang[2]+'</span>');
			return false;
		    }
		    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		    if(!filter.test(form.find('#email').val())) {
			err.html('<span class="error">'+acp_lang[3]+'</span>');
			if (evt.preventDefault) {evt.preventDefault();}
			return false;
		    }
		} // end if

		if(form.find('#comment').val() == '') {
		    err.html('<span class="error">'+acp_lang[4]+'</span>');
		    return false;
		}
	
		jQuery(this).ajaxSubmit({
			
			beforeSubmit: function() {
			    jQuery('#loading').show();
			    jQuery('#submit').attr('disabled','disabled');
			}, // end beforeSubmit
		    
			    error: function(request){
			    err.empty();
			    var data = request.responseText.match(/<p>(.*)<\/p>/);
			    err.html('<span class="error">'+ data[1] +'</span>');
			    jQuery('#loading').hide();
			    jQuery('#submit').removeAttr("disabled");
			    return false;
			}, // end error()
		    
			    success: function(data) {
			    try {
				// if the comments is a reply, replace the parent comment's div with it
				// if not, append the new comment at the bottom
				var response = jQuery("<ol>").html(data);
				if(reply != false) {
				    jQuery('#'+reply).replaceWith(response.find('#'+reply));
				    jQuery('.commentlist').after(response.find('#respond'));
				    acp_initialise();
				} else {				    
				    if (jQuery(document).find('.commentlist')[0]) {
					response.find('.commentlist li:last').hide().appendTo(jQuery('.commentlist')).slideDown('slow');
				    } else {
					jQuery('#respond').before(response.find('.commentlist'));
				    }
				    if (jQuery(document).find('#comments')[0]) {
					jQuery('#comments').html(response.find('#comments'));
				    } else {
					jQuery('.commentlist').before(response.find('#comments'));
				    }
				}
				form.find('#comment').val('');
				err.html('<span class="success">'+acp_lang[5]+'</span>');
				jQuery('#submit').removeAttr("disabled");
				jQuery('#loading').hide();
				
			    } catch (e) {
				jQuery('#loading').hide();
				jQuery('#submit').removeAttr("disabled");
				alert(acp_lang[6]+'\n\n'+e);
			    } // end try
						   
			} // end success()
			
		    }); // end ajaxSubmit()
		
		return false; 
		
	    }); // end form.submit()

    }); // end document.ready()
										
