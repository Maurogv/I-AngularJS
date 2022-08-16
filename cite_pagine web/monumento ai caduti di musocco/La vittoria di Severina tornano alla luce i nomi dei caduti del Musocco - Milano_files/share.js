/* sharing community */

var urlToShare;
var uuidToShare;
var titleToShare;
var sharedCounter;

var configShare = {    
	 over: function(){
	 	
		urlToShare = $(this).parents(".social-bar").attr("data-href");
		uuidToShare = $(this).attr("rel");
		sharedContent = uuidToShare;
		//titleToShare = $(this).parents(".social-bar").find(".title_art").html();
		var title_art_elem = $(this).parents(".social-bar").find(".title_art");
		if($(title_art_elem).find("a").length > 0){
			titleToShare = $(title_art_elem).find("a").html();
		}
		else{
			titleToShare = $(title_art_elem).html();
		}
		if(urlToShare.indexOf("http") == -1) urlToShare = "http://www.corriere.it" + urlToShare;
		//urlToShare = encodeURIComponent(urlToShare);
		
		$(this).find(".bt-twitter-share").attr("href","https://twitter.com/intent/tweet?url="+encodeURIComponent(urlToShare)+"&text="+encodeURIComponent(titleToShare)+ "&count=none/" )
		
		$sharebaloon2 = $('.share-bt', this);
		$sharebaloon2.show();
	}, // function = onMouseOver callback (REQUIRED)    
	timeout: 500, // number = milliseconds delay before onMouseOut    
	out: function(){
		$sharebaloon2.hide();
	} // function = onMouseOut callback (REQUIRED)    
};
try{
$('.show-share').hoverIntent(configShare);
}catch(ex){
	console.error(ex);
}
$(".share-bt .bt-facebook-share").live('click',function(event){
	event.preventDefault();
	shareOnFacebook(urlToShare,uuidToShare);
})

$(".share-bt .bt-passaparola-share").live('click',function(event){
	event.preventDefault();												
	if (userStatus == "unlogged") {
		if(document.referrer.search(/^http:\/\/passaparola.corriere.it/i) == 0 && $('.ugc_iniziativa_id_14').length){
				lcom_RegOKNoOptin();
			} else{
				lcom_AccediServizi();
			}		
	} else if (userStatus == "notEnabled") {
		lcom_CompletaReg();				
	} else if (userStatus == "enabled") {
		passaparola(uuidToShare);
	}
});


$(".share-bt .bt-google-share").live('click',function(event){
	event.preventDefault();
	sharedCounter = $(this).text();
	sharedCounter=parseInt(sharedCounter)+1;
	shareOnGooglePlus(urlToShare);
	updateShareCount('google',uuidToShare,0);
})


//Social share buttons
var CONT_PATH = "http://passaparola.corriere.it/community";

function shareOnFacebook(url, uuidToShare) {
	// calling the API ...
	var obj = {
		method: 'feed',
		link: url
	};
	function callback(response) {
		if (typeof response !== 'undefined') {
			if (typeof response.post_id !== 'undefined') {
				updateFacebookShareCount(url,uuidToShare);
			}
		}
	}
	FB.ui(obj, callback);
	return false;
} 

function shareOnGooglePlus(url, title) {
	window.open( "https://plus.google.com/share?url="+encodeURIComponent(url), "height=300,width=550,resizable=1");
	return false;
}


function updateShareCount(channel,uuidToShare,counter){
	$.getJSON(CONT_PATH+'/content-json/updateShareCountFromExternal?callback=?', {
		'externalID':uuidToShare,
		'filter':channel,
		'counter':counter
	}, function(response) {
		if(response[0]=="KO"){
				//console.log(response[1]);
			} else {
				updateChannelCounter(channel,uuidToShare);
				if(userStatus == "enabled"){
					updateChannelCounter("passaparola",uuidToShare);
				}
			}
	});	
	return false;
}


function updateChannelCounter(channel,uuidToShare) {
	// aggiorno il counter del singolo social
	var currentCount = Number($('.show-share[rel='+uuidToShare+']:first .share-bt .bt-'+channel+'-share').text());
	$('.show-share[rel='+uuidToShare+'] .share-bt .bt-'+channel+'-share').text(currentCount + 1);
	

	// aggiorno il counter globale
	var currentGlobalCount =  Number($(".show-share[rel="+uuidToShare+"]:first .total-count").text());
	$(".show-share[rel="+uuidToShare+"] .total-count").html(currentGlobalCount + 1);
	if($('#box-community-social .invia_ugc a.invia_ugc_a').not('.aggregatore_page #box-community-social .invia_ugc a.invia_ugc_a').length > 0){
		$('#box-community-social div.condivisioni_top span').text(Number($('#box-community-social div.condivisioni_top span').text()) + 1);
	}
	
}

function passaparola(uuidToShare){
	//uuidToShare = $(".show-share").attr("rel");
	var urlpassaparola = CONT_PATH+'/content-json/passaparola?callback=?'
	$.getJSON( urlpassaparola, { 
		'externalID': uuidToShare
	}, function(response) {
		if(!errorHandleCommunity(response, urlToShare, '','','passaparola','NOAPI')){
		if(response[0]=="KO"){
			//alert(response[1]);
			messageKo(); //funzione di multibar.js
		}else{
			
			$.fancybox({
				helpers : {
					overlay : {
						css : {
							'background' : 'rgba(0, 0, 0, 0.50)'
						}
					}
				},			   
				'padding' : 0,
				'href' : "/includes2007/ssi/boxes/community/popup/passaparola.shtml",
				'type' : 'ajax',
				'afterShow' : function(){
					setTimeout(function(){$.fancybox.close();},3000);
				}
			});
			updateChannelCounter("passaparola",uuidToShare);
		}
	  }
	});
	return false;
}


function updateCounter(uuidToShare) {
	var current =  Number($(".show-share[rel="+uuidToShare+"]:first .total-count").text());
	$(".show-share[rel="+uuidToShare+"] .total-count").html(current + 1);
}

function bindTwitter(){
	if (typeof twttr !== 'undefined') {
		twttr.events.bind('tweet', function(event) {
			if (event) {
				var url = event.target.search;
				url = url.replace("?url=","");
				$.getJSON('http://cdn.api.twitter.com/1/urls/count.json?url='+url+'&callback=?',function(resp){
					if (typeof resp !== 'undefined') {
						if (typeof resp !== 'undefined' && typeof resp.count !== 'undefined'){
							updateShareCount('twitter',uuidToShare,resp.count);
						}
					}
				},'json');
		     }
		});
	}
}

/*
function updateFacebookShareCount(url,uuidToShare){
	$.get('https://graph.facebook.com/fql?q=select%20%20like_count,%20share_count%20from%20link_stat%20where%20url="'+url+'"',function(resp){
		if (typeof resp !== 'undefined') {
			if (typeof resp.data[0] !== 'undefined' && typeof resp.data[0].share_count !== 'undefined'){
				updateShareCount('facebook',uuidToShare,resp.data[0].share_count);
			}
		}
	},'json');
}*/


function updateFacebookShareCount(url,uuidToShare){
	$.getJSON('https://graph.facebook.com/fql?callback=?&q=select%20%20like_count,%20share_count,%20comment_count,%20total_count%20from%20link_stat%20where%20url="'+url+'"',function(resp){
		if (typeof resp !== 'undefined') {
			if (typeof resp.data[0] !== 'undefined' && typeof resp.data[0].total_count !== 'undefined'){
				updateShareCount('facebook',uuidToShare,resp.data[0].total_count);
			}
		}
	},'json');
}

/*$(document).ready(function(){
	bindTwitter();
});*/

$(window).load(function() {
	bindTwitter();
});


/* fine sharing community*/