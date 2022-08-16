var currentUrl = document.URL;
var hostName = document.location.hostname;


var popup1ImgUrl = 'http://www.corriere.it/images_home/overlay_community_hp2.png';
var popup2ImgUrl = 'http://www.corriere.it/images_home/overlay_community_servizio.png';

function showOverlayCommunity(imgUrl, cookieName, expiresDate){
    // $.fancybox({			   
		// 'padding' : 0,
		// 'href' : imgUrl,
		// 'type' : 'image',
		// 'afterShow' : function(){
		    // $('#fancybox-outer, .fancybox-skin').css({'background':'transparent'});
            // $('#fancybox-bg-n,#fancybox-bg-ne,#fancybox-bg-e,#fancybox-bg-se,#fancybox-bg-s,#fancybox-bg-sw,#fancybox-bg-w,#fancybox-bg-nw')
              // .css({'background-image':'none'});
            // $.cookie(cookieName, "true", {expires: expiresDate});
		// }
	// });
	//console.log("Call methode showOverlayCommunity");
}
$(document).ready(function() {
var isHp = $('body').attr('id') === 'homepage-corriere';
/*if(isHp){
    // Tamtamy Community Message
    if( $.cookie('TC_MESSAGE') === null ) {  // if expired / non-existent
        var expiresDate = new Date();
        // Prod - + 1 week
        expiresDate.setDate(expiresDate.getDate() + 7);
        // Dev - + 2 minutes
        //expiresDate.setMinutes(expiresDate.getMinutes() + 2);
        showOverlayCommunity(popup1ImgUrl, 'TC_MESSAGE', expiresDate);
    }
    else{// Nothing to do
    }
}else{
 
}*/
})