
	$(document).ready(function() {
    		$('.navGalleryboxApprofondimenti').attr('style', 'font-weight: bold; margin: 100px;  font-variant: normal; padding: 15px!important; padding: 15px!important; margin: 0px !important; font-size: 10px; border: groove; float: none !important; background: #fff !important; color: #000;');
		$('.navGalleryboxApprofondimenti').find('.navGalleryWhiteText').attr('style', 'color: #262626; font-weight: bold; border: 0px; display: block; padding-bottom: 20px; font-family: Lora !important; font-size: 2em; margin-bottom: 30px; border-bottom: 1px solid #dfdfdf; margin-top: 0px;');
		$('#DeltaPlaceHolderMain').prepend('<div class="top"><ul><li><a href="/FR" title="">FRA</a></li><li><a href="/EN" title="">ENG</a></li><li><a href="/" title="">ITA</a></li></ul></div>');
		$('.lang-en ul.nav li').attr('style', 'width:auto!important; height:auto!important;');
		$('.lang-fr ul.nav li').attr('style', 'width:auto!important; height:auto!important;');
		$('ul.nav .elemento-2').append('<ul style="display: none;" class="sottomenu"></ul>');
		$('li.elemento-11,li.elemento-3,li.elemento-4,li.elemento-5,li.elemento-6,li.elemento-7,li.elemento-8').appendTo('ul.sottomenu');
		$('.lang-en li.elemento-8').attr('style', 'display:none!important;');
		$('.lang-fr li.elemento-8').attr('style', 'display:none!important;');
		$('.lang-en li.elemento-4').attr('style', 'float: none!important; width: auto !important; height: auto !important;');
		$('.lang-fr li.elemento-4').attr('style', 'float: none!important; width: auto !important; height: auto !important;');	
		$('.sidebar .primo-piano-menu').prepend('<p id="areatitolo" class="areatitolo" style="color: #262626; padding-bottom: 20px; font-family: Lora !important; font-size: 1.6em; font-weight: bold; margin-bottom: 50px; border-bottom: 1px solid #dfdfdf;">In primo piano</p>');
		$('#NoSilverlightBox .navGalleryboxApprofondimenti').prependTo('.sidebar section');
		$('.sidebar .primo-piano-menu').append('<p id="linknews" class="linknews" style="font-size: 1.2em;font-weight: bold; width: 100%;text-align: center; margin-bottom: 50px;"><a href="/Primo_Piano" alt="Vedi le altre News" style="color: #0059b3;">VEDI LE ALTRE NEWS</a></p>');
		$('.interna article .span10 h2').insertAfter('p.date');
		$('.sottomenu').prepend('<li class="elemento-2"><a></a></li>');
		$('.sottomenu').find('.elemento-3').show();
		$('.sottomenu').find('.elemento-2').hide();
		$("#searchText").append('<style>.home header [role="search"]:before, .interna header [role="search"]:before {margin-top: 15px !important; right: 15px!important;}</style>');
		$('.instagram.social').find('a').attr('href','https://www.instagram.com/ministerodifesa_official/');
		$('.webtv').find('a').attr('href','https://webtv.difesa.it/');
		$('.webtv').find('a').attr('style', 'margin-top:-6px; margin-right: -12px;');
		$('.icon-pp').append('<style> li.instagram.social{ background: url("/Style%20Library/Images/icons/social/ig12.png");}</style>');
		$('.icon-pp').append('<style>.home header [role="complementary"] ul li.instagram a, .interna header [role="complementary"] ul li.instagram a { position: relative; height: 24px; margin-left: -5px;}}</style>');
		$('.icon-pp').append('<style>.home header [role="complementary"] ul li.instagram, .interna header [role="complementary"] ul li.instagram { margin-top: -6px;}</style>');
		$('.instagram.social').find('a').removeClass('icon-pp');
            	$('li.elemento-2').hover(
                function () {
                    $('ul', this).stop(true, true).delay(50).slideDown(100);
                },
                function () {
                    $('ul', this).stop(true, true).slideUp(200);
                }
            );
        });

	$(document).ready( function (){
		if(window.location.href.indexOf('/EN/')>-1){
			$("#areatitolo").html("Top Stories");	
			$("#linknews a").html("FEATURED");	
			$("#NoSilverlightBox #GalleriaFullDiv a").html("GO TO THE FULL SCREEN GALLERY");		 
		};
		if(window.location.href.indexOf('/FR/')>-1){
			$("#areatitolo").html("A la une");
			$("#linknews a").html("TOUTE L'ACTUALITÉ");
			$("#NoSilverlightBox #GalleriaFullDiv a").html("ACCÉDER À LA GALERIE PLEIN ÉCRAN");							 
		};
	});
