/**
 *
 * @name Poetry in Translation common page script
 * @version 1
 * @author Adam David Kline (info@adkline.com)
 * @copyright (c) 2014 A. S. Kline
 * @fileoverview Common page functions (jQuery required)
 *
 */
//---------------------------------------------------------GLOBAL FUNCTIONS & VARS
//Global functions and vars
/*global $:false */
/*global window */
/*global document */
/*global location */
/*global setInterval */

//---------------------------------------------------------NAME-SPACE OBJECT WRAPPING GLOBAL VARS
var pitMainScript = {
	
	//-------------------------------------------------AJAX NAME-SPACE FUNCTIONS
	
    viewIndexEntriesAjax: function (sort_by, webp_support) {
        //Post Ajax inputData to process.php file
        $.post(pit_base_url + 'inc/index/model/ajax.php?t=' + Math.random() + '&sort_by=' + sort_by + '&webp_support=' + webp_support, function (result) {
			$('#browse_menu').html(result);
			if ($('#content .scroll-reveal').length) {
				//Scroll reveal
				ScrollReveal().reveal('.row.scroll-reveal .card');
				ScrollReveal().reveal('h2.scroll-reveal');
			}
			//Tessellate works cards
			pitMainScript.tessellate();
			$('html, body').animate({
				scrollTop: $("#browse_by").offset().top - 100
			}, 50);
        });
    },
	
	//Retrieve images from thumbnail library
	imageRetrieveAjax: function(category, sort_type) {
		$.post(pit_base_url + "inc/searchimages/model/ajax.php?t=" + Math.random() + "&category=" + category + "&sort_type=" + sort_type, function (result) {
			$('#image-wrapper').html(result);
			pitMainScript.scroll_offset('#image-wrapper');
			//Scroll reveal
			ScrollReveal().reveal('.row.scroll-reveal-image .card', {
				interval: 16,
				scale: 0.85,
				viewOffset: {
					top: 60
				}
			});
        });
    },
		
	//Search images from thumbnail library
	imageSearchAjax: function(search_term) {
		$.post(pit_base_url + "inc/searchimages/model/ajax.php?t=" + Math.random() + "&search_term=" + search_term, function (result) {
			$('#image-wrapper').html(result);
			pitMainScript.scroll_offset('#image-wrapper');
			//Scroll reveal
			ScrollReveal().reveal('.row.scroll-reveal-image .card', {
				interval: 16,
				scale: 0.85,
				viewOffset: {
					top: 60
				}
			});
        });
    },
			
	//Record cookie choice in SQLite database as per GDPR compliance
	cookieAjax: function(cookie_setting) {
		$.post(pit_base_url + "inc/cookie/model/ajax.php?t=" + Math.random() + "&cookie_setting=" + cookie_setting, function (result) {
			location.reload();
        });
    },
	
	//-------------------------------------------------COOKIES NAME-SPACE FUNCTIONS
	
	cookieCheckSet: function(cookie_check_type) {
        /*jshint strict: true */
        "use strict";
        var cookie_checkbox_id, //id's of cookie selection checkboxes
			cb, //Cookie checkboxarray index for looping through entries
			cookie_setting = "",
			element_array = [ //id of cookie checkbox, value to add to cookie setting string
				['i_facebook_cookies',
				'f'],
				['i_twitter_cookies',
				't'],
				['i_disqus_cookies',
				'd']
			];
		//Iterate through checkboxes to see which are checked
        for (cb = 0; cb < element_array.length; cb += 1) {
			cookie_checkbox_id = element_array[cb][0];
			//If privacy page has just been loaded, check cookie status and check boxes accordingly
			if (cookie_check_type === 'onload') {
				if($.cookie('pit-cookie-gdpr') === null || $.cookie('pit-cookie-gdpr') === "" || $.cookie('pit-cookie-gdpr') === "null" || $.cookie('pit-cookie-gdpr') === undefined) {
					//No cookies
				} else {
					//If all cookies are approved, or one specific cookie is approved, check relevant boxes
					if ($.cookie('pit-cookie-gdpr') === "1" || $.cookie('pit-cookie-gdpr').indexOf(element_array[cb][1]) >= 0) {
						$("#" + cookie_checkbox_id).prop('checked', true);
					}
				}
			//Else if cookie checkbox has been clicked, set cookie
			} else if (cookie_check_type === 'onclick') {
				if($("#" + cookie_checkbox_id).is(':checked')) {
					cookie_setting = cookie_setting + element_array[cb][1];
				}			
			}
		}
		if (cookie_check_type === 'onclick') {
			//If all cookies checkboxes are checked, set cookie to 1 (all options checked)
			if (cookie_setting.length === element_array.length) {
				cookie_setting = 1;
			//If no cookie checkboxes are checked, set cookie to 0 (no options checked)
			} else if (cookie_setting.length === 0) {
				cookie_setting = 0;		
			}			
			//Set cookie
			$.cookie("pit-cookie-gdpr", cookie_setting, {
			   expires : 365,
			   path    : '/', 
			   domain  : 'poetryintranslation.com',
			   secure  : true
			});
			pitMainScript.cookieAjax(cookie_setting);
		}				
	},
	
	//-------------------------------------------------ELEMENT PROPERTIES NAME-SPACE FUNCTIONS
	
	//Check element visibility
	isVisible: function(element) {
		var element = $(element);
		return (element.css('display') !== 'none' && element.css('visibility') !== 'hidden' && element.css('opacity') !== 0);
	},
	
	//-------------------------------------------------LOGO NAME-SPACE FUNCTIONS
	
	//Function to change size of logo and navbar on scroll
	checkLogo: function(pit_base_url) {
		screentop = $(document).scrollTop();
		if (screentop > 250) {
			//Only do something if scroll event has not already been triggered and xs mobile view is not showing
			if (!$('#navbar').hasClass('navbar-min')) {
				$('#navbar').addClass('navbar-min');
				if ($('#poem-nav').length) {
					$('#poem-nav').addClass('poem-nav-min');
				}				
				$(".logo").attr('src', pit_base_url + 'pics/logo-min.png').one("load",function(){ //fires (only once) when loaded
					$(".logo").css('height','2.5rem');
				}).each(function(){
					if(this.complete) {//trigger load if cached in certain browsers
						$(this).trigger("load");
					}
				});
			}
        } else {
			//Only do something if scroll event has not already been triggered
			if ($('#navbar').hasClass('navbar-min')) {
				$('#navbar').removeClass('navbar-min');
				if ($('#poem-nav').length) {
					$('#poem-nav').removeClass('poem-nav-min');
				}
				$(".logo").attr('src', pit_base_url + 'pics/logo.png').one("load",function(){ //fires (only once) when loaded
					$(".logo").css('height','2.9rem');
				}).each(function(){
					if(this.complete) {//trigger load if cached in certain browsers
						$(this).trigger("load");
					}
				});
			}
        }		
	},
	
	//-------------------------------------------------INDEX PAGE WORK CARDS NAME-SPACE FUNCTIONS
	
    //Function to tessellate li's containing details of works
    tessellate: function() {
    /*jshint strict: true */
    "use strict";
    var list; //var to hold list of work li's on index page
        //Only run if in desktop view
        if (($('#md').is(":visible") || $('#lg').is(":visible") || $('#xl').is(":visible")) && $('#archive').length) {
            //For each grid-item in an archive div
            $('#archive .grid-item').each(function () {
				//If element is supposed to be on left but is stacked to right, float right
				if ($(this).css('float') === 'left' && ($(this).position().left - $('#archive').position().left) > 300) {
					$(this).css('float', 'right');
				//If element is supposed to be on right but is stacked to left, float left
                } else if ($(this).css('float') === 'right' && ($(this).position().left - $('#archive').position().left) < 300) {
					$(this).css('float', 'left');
				}
            });
        } else {
            //If in mobile view remove all floats
            $('.grid-item').css('float', '');
        }
		//Run scroll-reveal (if present) after everything is resized
		if ($('#content .scroll-reveal').length) {
			//Scroll reveal
			ScrollReveal().reveal('.row.scroll-reveal .card', {
				interval: 16,
				scale: 0.85,
				reset: false
			});
			ScrollReveal().reveal('h2.scroll-reveal', {
				duration: 200,
				origin: 'right',
				distance: '10%',
				interval: 16,
				scale: 0
			});
		}
    },
	
	//-------------------------------------------------SCROLL BEHAVIOUR NAME-SPACE FUNCTIONS
	
    //Function to move to anchor on page load with adjustment for fixed header div
    scroll_offset: function(hash) {
		/*jshint strict: true */
		"use strict";
		var $root = $('body,html'), //Dom root definition
		target = $(hash); //Smooth scrolling link target var
        if (hash.substring(1, 10) === 'highlight') {
            //Check if target is search term (i.e. dynamic target). If so, trim #highlight from start of hash
            hash = hash.substring(10, hash.length);
            //Decode search term and swap + for " "
            hash = decodeURIComponent(hash.replace(/\+/g, ' '));
            //Highlight all occurences of search term in main text
            $('#content').highlight(hash, { wordsOnly: true });
            //Replace apostrophe with single closing quote if no text highlighted, and try again
            if ( $( ".highlight" ).length === 0) {
                hash = hash.replace(/'/g , "’");
                $('#content').highlight(hash, { wordsOnly: true });
            }
            //Scroll to first incidence of highlighted text
            target = $(".highlight:first");
        } else if (target.length === 0) {
            //Check if target labelled by id exists, if not set to name
            target = $('[name="' + hash.slice(1) + '"]');
        }
        //If target exists at this point scroll to the correct position
        if (target.length !== 0) {
			//Check if scroll target has a tabindex, if not, assign one.
            if (target.attr('tabindex') === undefined) {
                target.attr('tabindex', -1);
            }
            $root.animate({
                scrollTop:  target.offset().top - 90
            }, 1000);
        }
    }
};

//---------------------------------------------------------JQUERY FUNCTION

$(function () {
    /*jshint strict: true */
    "use strict";
    var hash, // holds page hash in browser nav bar for smooth link scrolling
        target, // smooth scrolling link target var
        filetype, //filetype var for ajax filesize request on download pages
        fileurl, //filetype var for ajax filesize request on download pages
        data, //data var for ajax filesize request on download pages
		cookie_setting, //cookie setting - 1 on, 0 off
		cookie_check_type, //Check cookie status on load or on checkbox click
        index, //array index for looping through download file sizes
        filesize, //var to filesize of downloads
        poem_menu_url, //url code for poem menu system
        poem_menu_icon, //poem menu icon class for poem menu system
        element_array = [], //poem menu link list array
        li; //poem menu link array index for looping through entries

    /* LOAD ADDITIONAL SCRIPTS */	
	
	//If audio-player exists on page, load relevant js and css files, and activate player
	if ($(".audio-player-wrapper").length) {
		$("<link>").appendTo("head").attr({type:"text/css",rel:"stylesheet"}).attr("href", pit_base_url + "css/vendor/audioplayer.min.css");
		$.getScript(pit_base_url + "js/vendor/audioplayer.min.js", function() {
			$(function() {
				$('audio').audioPlayer();
			});
		});
	}	
	
	//If video-player exists on page, load relevant js files, and activate player
	if ($(".video-js").length) {
		$("<link>").appendTo("head").attr({type:"text/css",rel:"stylesheet"}).attr("href", pit_base_url + "css/vendor/videojs.css");
		$("head").append($('<script src="' + pit_base_url + 'js/vendor/videojs.js"></script>'));
	}	
	
    //load css and js file for featherlight js lightbox if .img-magnify class is present
    if ($('#content img.img-magnify').length) {
        //Make call for includes async
        $.ajaxPrefilter(function (options) {
            options.async = true;
        });
		$("<link>").appendTo("head").attr({type:"text/css",rel:"stylesheet"}).attr("href", pit_base_url + "css/vendor/featherlight.min.css");
        $("head").append($('<script src="' + pit_base_url + 'js/vendor/featherlight.min.js"></script>'));
        //Return call for includes to sync
        $.ajaxPrefilter(function (options) {
            options.async = true;
        });
    }
	
	/* NAVRBAR BEHAVIOUR */
	
	//Change toggle icon and animate on click
	$(".navbar-toggler .fa").on("click", function(){
		if (pitMainScript.isVisible($('#navbar .navbar-collapse')) === false) {
			if ($(".navbar-toggler .fa").hasClass('fa-bars')) {
				$(".navbar-toggler .fa").removeClass('fa-bars').addClass('fa-times').css("animation", "rollforward 1s");
			}
		} else if (pitMainScript.isVisible($('#navbar .navbar-collapse')) === true) {
			if ($(".navbar-toggler .fa").hasClass('fa-times')) {
				$(".navbar-toggler .fa").removeClass('fa-times').addClass('fa-bars').css("animation", "rollbackward 1s");
			}
		}
	});	

    //Navbar change on scroll / resize
    $(window).on('scroll', function() {
        pitMainScript.checkLogo(pit_base_url);
    });
	
    $(window).resize(function() {
        pitMainScript.checkLogo(pit_base_url);
    });
	
    /* LINK BEHAVIOUR */

    //Open labelled external links in new window
    $('a.new-win').click(function () {
        window.open(this.href);
        return false;
    });
	
    /* SCROLL BEHAVIOUR */
	
    //Scroll on link click to anchor with smooth scroll and adjustment for fixed header div
	$(document).on("click", "a[href*=\\#]:not([href=\\#])", function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            hash = this.hash;
            pitMainScript.scroll_offset(hash);
        }
    });

    //Archive Pinterest display setup on window resize
    $(window).on('resize', function(){
        setTimeout(function() {
            pitMainScript.tessellate();
        }, 50);
    });

    /* AUDIO PLAYER */	
	
	//Close audio advert div on clicking cross to top right
	$('.audio-advert-close').on("click", function () {
		$('.audio-advert').children().filter("audio").each(function(){
		this.pause(); // can't hurt
		delete this; // @sparkey reports that this did the trick (even though it makes no sense!)
		$(this).remove(); // this is probably what actually does the trick
	});
	$('.audio-advert').empty();
	});

    /* SEARCH SCRIPTS */	
	
    //Search page script.
    //If keyword search box contains the default entry, style accordingly
    if ($('#content #search_keyword').length) {
        if ($('#search_keyword').val() === $('#default_val').text()) {
            $('#search_keyword').css('color', '#7A7A7A').css('font-style', 'italic');
        } else {
            $('#search_keyword').css('color', '').css('font-style', '');
        }
    }
    //If keyword search box contains the default entry on focus, clear and style accordingly
    $('#search_keyword').focus(function () {
        if ($('#search_keyword').val() === $('#default_val').text()) {
            $('#search_keyword').val('');
            $('#search_keyword').css('color', '').css('font-style', '');
        }
    });
    //Show timer if search submit button clicked
    $('#search_submit').click(function () {
        $('#search_timer').show();
    });
	
    /* DOWNLOAD PAGES */
	
    //Copy book references into book cover images on download pages
    if ($('#content #ref-copy').length && $('#ref-paste').length) {
        $('#ref-paste').text($('#ref-copy').text());
        //Make width of #ref-paste match img (less left/right margins)
        if ($('#book').find('img').length) {
            $('#ref-paste').width($('#book').find('img').width() - 25);
        }
    }

    //Get download file sizes by Ajax request if on download page
    if ($('#content .download-file').length) {
        data = "";
        $('.download-file').each(function () {
            filetype = $(this).prop('id');
            fileurl = $(this).prop('href');
            data = data + "&" + filetype + "=" + fileurl;
        });
        $.post(pit_base_url + "inc/filesize/filesize.php?t=" + Math.random(), data, function (result) {
            result = result.split('~');
            for (index = 0; index < result.length; index += 1) {
                filesize = result[index].split('|');
                if ($('#' + filesize[0] + '_filesize').length) {
                    $('#' + filesize[0] + '_filesize').text(filesize[1]);
					$('#' + (filesize[0].split('_'))[0] + '_filesize').text(filesize[2]);
                }
            }
        });
    }
	
	//Show donation request when downloading commercial-quality downloads
	$('#content #archive-download a').click(function () {
		if ($('#content #donation-request').length && $('#content #donation-request').is(":visible") == false) {
			$('#donation-request').css('display', 'flex');
			pitMainScript.scroll_offset('#donation-request');
		}
    });	
	
	//Show donation requests immediately in safari
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		if ($('#content #donation-request').length) {
			$('#donation-request').css('display', 'flex');
		}
	}
	
    /* INDEX PAGE */
	
	//Index browse buttons
	$(document).on("click", ".index_browse_link", function(e) {	
		var webp_support = ($(".webp").length) ? 'webp' :'no-webp',
			hash = $(this).prop("hash"),
			//Get sort-by category from first link class
			sort_by = $(this).attr('class').split(' ')[0];
		e.preventDefault();
		//Add URL to history so that browser back button will work from visited works pages
		window.history.pushState("", "", "?sort_by=" + sort_by + hash);
		$('#browse_menu').html('<div class="sourcesanspro_bold text-primary text-center"><span class="fa fa-spinner fa-spin fa-2x mr-2"></span>Updating...</div>');
		pitMainScript.viewIndexEntriesAjax(sort_by, webp_support);
	});

	//Index category links
	$(document).on("click", ".index_category_link", function(e) {	
		var hash = $(this).prop("hash"),
			//Get sort-by category from first link class
			sort_by = $(this).attr('class').split(' ')[0]
		e.preventDefault();
		//Add URL to history so that browser back button will work from visited works pages
		window.history.pushState("", "", "?sort_by=" + sort_by + hash);
		//Scroll to target
		pitMainScript.scroll_offset(hash);
	});			
	
    /* ABOUT PAGE */
	
	//Change banner background to scroll with safari browsers (avoids mobile iOS bugs)
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		if ($('#banner-static').length) {
			$('#banner-static').css('background-attachment','scroll');
		}
	}
	
    /* CONTACT PAGE */
	
    //Update contact email address where it exists.
    if ($('#content .contact-email').length) {
        $('#content .contact-email').html('<a href="mailto:tonykline@yahoo.com">tonykline@yahoo.com</a>');
    }

	/* IMAGE LIBRARY PAGE */
	
	//Category browse button
	$('#archive-menu, #image-wrapper').on('click', '.get-images', function() {
		var category = $(this).attr('class').split(' ')[0],
			sort_type = $(this).attr('class').split(' ')[1];
		pitMainScript.imageRetrieveAjax(category, sort_type)
	});
	
	//Category search button
	$('#search-images').click(function () {
		var search_term = $("#search_term").val();
		if (search_term !== "") {
			pitMainScript.imageSearchAjax(search_term);
		}
	});
	
    /* PITBR POEM PAGES */
	
    //Poem menu: next / previous / home / download / printed book menu
    if ($('#content').hasClass('poem')) {
        if ($('#content .download_link').length > 0 || $('#content .home_link').length > 0) {
            element_array = [ //.class of link, css icon class, link title
				['home_link', //link class
				'Home', //Link description
				'fa-home', //Font awesome icon
				'Home'], //Link short description
                ['previous_link',
				'Previous Section',
				'fa-arrow-circle-o-left',
				'Prev.'],
                ['next_link',
				'Next Section',
				'fa-arrow-circle-o-right',
				'Next'],
                ['download_link',
				'Download',
				'fa-download',
				'DL'],
                ['book_link',
				'Buy This Book',
				'fa-shopping-cart',
				'Buy']
            ];
            for (li = 0; li < element_array.length; li += 1) {
                poem_menu_icon = element_array[li][0];
                //assemble next/previous/download/home poem menu
                if ($('#content .' + poem_menu_icon).length > 0) {
                    poem_menu_url = $('.' + poem_menu_icon).attr('href');
                    //Add icons to poem menu
					$('#poem-nav').append('<div class="icon"><a href="' + poem_menu_url + '" title="' + element_array[li][1] + '">' + '<span class="fa ' + element_array[li][2] + ' fa-2x" aria-label="' + element_array[li][1] + '"></span><strong>' + element_array[li][3] + '</strong>' + '</a></div>');
					//Add icons to page links
					$('.site-links .' + poem_menu_icon).prepend('<span class="fa ' + element_array[li][2] + '" aria-label="hidden"></span>&nbsp;&nbsp;');
                }
            }
        }
    }
	
    /* FOOTER */
	
    //Load social sharer jQuery plugin
    $(".social-buttons").sharer();

    /* PAGE LOAD FUNCTIONS */
	
    //Javascript css styles activation on page load
    $('.no-js').addClass('js').removeClass('no-js');
	
	//Cookies manage links/buttons (g = google, k = kofi, t = twitter, d = disqus, 1 = all, 0 = none)
	$(".cookie-manage, .cookie-manage-link").click(function () {
		window.location = "/Admin/Privacy.php#cookie-manager";
    });
	
	//Cookies manage - set cookies on checkbox selection submission of Privacy page
	$("#cookie-manager .cookie-choice-submit").click(function () {
		pitMainScript.cookieCheckSet('onclick');
    });
	
	//Cookies blanket acceptance (1 = all)
	$(".cookie-accept, .cookie-accept-link").click(function () {
		$.cookie("pit-cookie-gdpr", 1, {
		   expires : 365,
		   path    : '/', 
		   domain  : 'poetryintranslation.com',
		   secure  : true
		});
		$('#cookie-gdpr').hide();
		pitMainScript.cookieAjax(1);
    });
	
    //Adjust for fixed header div on first load if linking to hash within page
    $(window).on('load', function(){
		pitMainScript.tessellate();
        setTimeout(function() {
			pitMainScript.scroll_offset(window.location.hash);
        }, 50);
		
		//Resize logo
		pitMainScript.checkLogo(pit_base_url);
		
		//If cookie accept / decline has not been set, show the dialogue
		//Check whether user is on Privacy page and check cookie status
		if ($('#cookie-manager').length) {
			pitMainScript.cookieCheckSet('onload');
		//Otherwise, if cookie is not set, show the cookie dialogue
		} else if($.cookie('pit-cookie-gdpr') === null || $.cookie('pit-cookie-gdpr') === "" || $.cookie('pit-cookie-gdpr') === "null" || $.cookie('pit-cookie-gdpr') === undefined) {
			$('#cookie-gdpr').show();
		}
		
		//If on search page, and search results are present, scroll to the results
		if ($('#search').length) {
			//Arbor.js view-port for visual search results generation
			if ($('#search #viewport').length && $('#search #viewport').is(":visible")) {
				pitMainScript.scroll_offset('#viewport');
			//Text results list (always on page so have to check that it is not empty before scrolling)
			} else if ($('#search #search_results_list').length && $('#search #search_results_list').is(':empty') === false) {
				pitMainScript.scroll_offset('#search_results_list');	
			}
		} 

    });
});

//Base URL
var pit_base_url = "/";

//Matomo page tracking
var filtered_page_title = document.title.replace('and ',''),
	filtered_page_title = filtered_page_title.replace('or ',''),
	_paq = _paq || [];
_paq.push(['setDocumentTitle', filtered_page_title ]);
_paq.push(['disableCookies']);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
	var u="//www.poetryintranslation.com/pitanalytics/";
	_paq.push(['setTrackerUrl', u+'matomo.php']);
	_paq.push(['setSiteId', '1']);
	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
})();