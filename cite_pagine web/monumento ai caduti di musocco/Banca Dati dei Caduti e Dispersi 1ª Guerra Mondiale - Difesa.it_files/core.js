function htmlEncode(value) { return $('<div/>').text(value).html(); }

function SendPageWithDefaultClient(url, title) {
    var subject = title + " - Ministero della Difesa";
    var body = "Ciao, volevo segnalarti questo articolo sul portale del Ministero della difesa:%0A%0a"
                + subject + "%0A%0aLink all'articolo: "
                + url + "%0A%0a"
                + "Saluti.";

    location.href = "mailto:?subject=" + subject + "&body=" + body;
}

function GoToSearchPageResultsOnDifesa(searchTextFieldId) {
    searchKey = document.getElementById(searchTextFieldId).value;
    document.location.href = 'http://www.difesa.it/Ricerca/Pagine/ricerca.aspx?k=' + searchKey + '&Submit=CERCA';
    return false;
}


function CloseElement(elementId) {

    var element = document.getElementById(elementId);
    if (element)
        element.style.display = "none";
}


function ShowPushpinDetailsPopup(pushpinDetailsItem) {
    $('#pushpinPopupBody').html($('#' + pushpinDetailsItem).html());
    $('#pushpinPopupContainer').show();
}

function HidePushpinDetailsPopup() {
    $('#pushpinPopupBody').html('');
    $('#pushpinPopupContainer').hide();
}


var hp_timer_is_on = true;
var hp_timer_timeout_mill = 100;
var HomeBannerAnimationCurrent=0;

var hpAreaStorica_timer_is_on = true;
var hpAreaStorica_timer_is_on_timer_timeout_mill = 100;
var HomeBannerAreaStoricaAnimationCurrent = 0;

function StartHomeBannersAnimation() {
    if (hp_timer_is_on) {
         hp = setTimeout("HomeBannerAnimation()", hp_timer_timeout_mill);
    }
 }

function StopHomeBannersAnimation() {
    hp_timer_is_on = false;
}

function StartHomeBannersAreaStoricaAnimation() {
    if (hpAreaStorica_timer_is_on) {
        hp = setTimeout("HomeBannerAreaStoricaAnimation()", hp_timer_timeout_mill);
    }
}

function StopHomeBannersAreaStoricaAnimation() {
    hpAreaStorica_timer_is_on = false;
}

function HomeBannerAnimation() {

    if (hp_timer_is_on) {
        hp_timer_timeout_mill = 4000;
        $('#imgHPBanner').attr("src", MsMdD_HomeBanners_img[HomeBannerAnimationCurrent]);
        $('#imgHPBanner').attr("alt", MsMdD_HomeBanners_titles[HomeBannerAnimationCurrent]);
             
        $('#lnkHPBanner').attr("href", MsMdD_HomeBanners_links[HomeBannerAnimationCurrent]);
        $('#lnkHPBanner').attr("title", MsMdD_HomeBanners_titles[HomeBannerAnimationCurrent]);
                        
        HomeBannerAnimationCurrent++;
        if (HomeBannerAnimationCurrent == MsMdD_HomeBanners_img.length)
            HomeBannerAnimationCurrent = 0;

        if (hp_timer_is_on) {
            hp = setTimeout("HomeBannerAnimation()", hp_timer_timeout_mill);
        }
    }
}


function HomeBannerAreaStoricaAnimation() {

    if (hpAreaStorica_timer_is_on) {
        hpAreaStorica_timer_is_on_timer_timeout_mill = 4000;
        $('#imgHPBannerAreaStorica').attr("src", MsMdD_HomeBannersAreaStorica_img[HomeBannerAnimationCurrent]);
        $('#imgHPBannerAreaStorica').attr("alt", MsMdD_HomeBannersAreaStorica_titles[HomeBannerAnimationCurrent]);

        $('#lnkHPBannerAreaStorica').attr("href", MsMdD_HomeBannersAreaStorica_links[HomeBannerAnimationCurrent]);
        $('#lnkHPBannerAreaStorica').attr("title", MsMdD_HomeBannersAreaStorica_titles[HomeBannerAnimationCurrent]);

        HomeBannerAreaStoricaAnimationCurrent++;
        if (HomeBannerAreaStoricaAnimationCurrent == MsMdD_HomeBannersAreaStorica_img.length)
            HomeBannerAreaStoricaAnimationCurrent = 0;

        if (hpAreaStorica_timer_is_on) {
            hp = setTimeout("HomeBannerAreaStoricaAnimation()", hpAreaStorica_timer_is_on_timer_timeout_mill);
        }
    }
}

var news_timer_is_on = true;
var news_timer_timeout_mill = 500;
var NewsAnimationCurrent = 1;
var NewsAnimationOld = 1;
var MaxNews = 0;

function StartNewsAnimation(maxNews) {
    MaxNews = maxNews;
    if (news_timer_is_on && MaxNews>0) {
        na = setTimeout("NewsAnimation()", news_timer_timeout_mill);
    }
}
function StopNewsAnimation() {
    news_timer_is_on = false;
}

function NewsAnimation() {
    if (news_timer_is_on) {
        news_timer_timeout_mill = 5000;
        $('#new_' + NewsAnimationCurrent).show(1000);
        if (NewsAnimationOld != NewsAnimationCurrent) {
            $('#new_' + NewsAnimationOld).hide();
        }
        NewsAnimationOld = NewsAnimationCurrent;
        
        NewsAnimationCurrent++;
        if (NewsAnimationCurrent > MaxNews)
            NewsAnimationCurrent = 1;

        if (news_timer_is_on) {
            na = setTimeout("NewsAnimation()", news_timer_timeout_mill);
        }
    }    

}


var timer_is_on = true;
var timer_timeout_mill = 8000;
var HomeHighlightsAnimationCurrent = 0;
var hhTimer;

function StartHomeHighlightsAnimation() {
    if (timer_is_on) {
        hhTimer = setTimeout("HomeHighlightsAnimation()", timer_timeout_mill);
    }
}

function ReStartHomeHighlightsAnimation() {
    timer_is_on = true;
    $('#navigator_news_stop').show();
    $('#navigator_news_play').hide();
    if (hhTimer)
        clearTimeout(hhTimer);
    hhTimer = setTimeout("HomeHighlightsAnimation()", timer_timeout_mill);
}

//function StopAndSetHomeHighlightsAnimation(currHighlight) {
//    timer_is_on = false;
//    if (hhTimer)
//        clearTimeout(hhTimer);
//    
//     HomeHighlightsAnimationCurrent = currHighlight;
//    $('#navigator_news_stop').hide();
//    $('#navigator_news_play').show();
//}


function StopAndSetHomeHighlightsAnimation(currHighlight) {
    timer_is_on = false;
    if (hhTimer)
        clearTimeout(hhTimer);

    var moveToCount;
    var HomeHighlightsAnimationCurrentTemp = HomeHighlightsAnimationCurrent;

    if (HomeHighlightsAnimationCurrent == 3)
        HomeHighlightsAnimationCurrentTemp = 1;
    else if (HomeHighlightsAnimationCurrent == 1)
        HomeHighlightsAnimationCurrentTemp = 3;

    if (HomeHighlightsAnimationCurrentTemp < currHighlight) {
        moveToCount = HomeHighlightsAnimationCurrentTemp - 4 - currHighlight;

        moveToCount = Math.abs(HomeHighlightsAnimationCurrentTemp - 4 - currHighlight) % 4;

    }
    else
        moveToCount = (currHighlight - HomeHighlightsAnimationCurrentTemp + 4) % 4;



    if (moveToCount != 0) {
        for (k = 0; k < Math.abs(moveToCount); k++) {

            DoHighlightsAnimation();

        }
    }


    //HomeHighlightsAnimationCurrent = currHighlight;
    $('#navigator_news_stop').hide();
    $('#navigator_news_play').show();
}

function StopHomeHighlightsAnimation() {
        timer_is_on = false;
        $('#navigator_news_stop').hide();
        $('#navigator_news_play').show();
}

function SetHomeHighlightsAnimation(currHighlight) {
    timer_is_on = false;
    $('#navigator_news_stop').hide();
    $('#navigator_news_play').show();

    for (var i = 0; i < 4; i++) {
        $('#navigator_news_' + i + '_on').hide();
        $('#navigator_news_' + i + '_off').show();
    }


    HomeHighlightsAnimationCurrent = currHighlight + 1;
    if (HomeHighlightsAnimationCurrent == 4)
        HomeHighlightsAnimationCurrent = 0;
                
    DoHighlightsAnimation();

}

function DoHighlightsAnimation() {

    var main_title = $('#main_url2').text();
    var main_url = $('#main_url1').attr("href");
    //var main_image = HomeHighlightsGetThumbnail($('#main_image').attr("src"));
    var main_image = HomeHighlightsGetThumbnail(HomeHighlightsAnimationCurrent);
    var date = $('#main_title').text();

    var HomeHighlightsAnimationPrevious = HomeHighlightsAnimationCurrent;

    HomeHighlightsAnimationCurrent = (HomeHighlightsAnimationCurrent - 1 + 4) % 4;

    //SLIDERS
    $('#navigator_news_' + HomeHighlightsAnimationPrevious + '_on').hide();
    $('#navigator_news_' + HomeHighlightsAnimationPrevious + '_off').show();
    $('#navigator_news_' + HomeHighlightsAnimationCurrent + '_off').hide();
    $('#navigator_news_' + HomeHighlightsAnimationCurrent + '_on').show();

    var thum1_ul_a_first = $('#thum_ul').find('li:first').find('a:first');
    var thum1_ul_a_last = $('#thum_ul').find('li:first').find('a:last');
    var thum1_ul_main_title = $(thum1_ul_a_first).attr("title");
    var thum1_ul_main_url = $(thum1_ul_a_first).attr("href");
    var thum1_ul_main_image = $(thum1_ul_a_first).find('img:first').attr("src");
    var thum1_ul_date = $(thum1_ul_a_last).text();


    var thum2_ul_a_first = $('#thum_ul').find('li:last').find('a:first');
    var thum2_ul_font_last = $('#thum_ul').find('li:last').find('font:last');
    var thum2_ul_main_title = $(thum2_ul_a_first).attr("title");
    var thum2_ul_main_url = $(thum2_ul_a_first).attr("href");
    //var thum2_ul_main_image = HomeHighlightsGetBigImage($(thum2_ul_a_first).find('img:first').attr("src"));
    var thum2_ul_main_image = HomeHighlightsGetBigImage(HomeHighlightsAnimationCurrent);
    var thum2_ul_date = $(thum2_ul_font_last).text();


    newthum = '<li>'
            + '<a href="' + main_url + '" title="' + main_title + '">'
            + '<img height="92" width="125" src="' + main_image + '" alt="' + main_title + '" />'
            + '</a>'
            + '<span>'
            + '<a href="' + main_url + '" title="' + main_title + '">'
            + main_title + '</a>'
            + '<font>'
            + date
            + '</font>'
            + '</span>'
            + '</li>';

    $('#thum_ul').find('li:last').remove();
    $('#thum_ul').prepend(newthum);


    $('#main_title').text(thum2_ul_date);
    $('#main_url1').attr("href", thum2_ul_main_url);
    $('#main_url1').attr("title", thum2_ul_main_title);
    $('#main_image').attr("src", thum2_ul_main_image);
    $('#main_image').attr("alt", thum2_ul_main_title);
    $('#main_url2').attr("href", thum2_ul_main_url);
    $('#main_url2').attr("title", thum2_ul_main_title);
    $('#main_url2').text(thum2_ul_main_title);

    if (timer_is_on) {
        hhTimer = setTimeout("HomeHighlightsAnimation()", timer_timeout_mill);
    }
}


function HomeHighlightsAnimation() {

    if (timer_is_on) {
        if (hhTimer)
            clearTimeout(hhTimer);
        DoHighlightsAnimation();
    }
}


function HomeHighlightsGetThumbnail(HomeHighlightsAnimationCurrent) {
    return MsMdD_HomeHighlights_img[(HomeHighlightsAnimationCurrent * 2 + 1) % 8 ];    
}

function HomeHighlightsGetBigImage(HomeHighlightsAnimationCurrent) {
    return MsMdD_HomeHighlights_img[HomeHighlightsAnimationCurrent * 2]; 
}

function InizializeJsHomeHighlights(images) {

    $(document).ready(function() {

        $.preload(images, {
            init: function(loaded, total) {

            },
            loaded: function(img, loaded, total) {

            },
            loaded_all: function(loaded, total) {
                StartHomeHighlightsAnimation();
            }
        });

    });
}


function InizializeJsHomeBanners(images) {
    $(document).ready(function() {

        $.preload(images, {
            init: function(loaded, total) {

            },
            loaded: function(img, loaded, total) {

            },
            loaded_all: function(loaded, total) {
                StartHomeBannersAnimation();
            }
        });

    });
}

function InizializeJsHomeBannersAreaStorica(images) {
    $(document).ready(function () {

        $.preload(images, {
            init: function (loaded, total) {

            },
            loaded: function (img, loaded, total) {

            },
            loaded_all: function (loaded, total) {
                StartHomeBannersAreaStoricaAnimation();
            }
        });

    });
}



(function($) {
    var imgList = [];
    $.extend({
        preload: function(imgArr, option) {
            var setting = $.extend({
                init: function(loaded, total) { },
                loaded: function(img, loaded, total) { },
                loaded_all: function(loaded, total) { }
            }, option);
            var total = imgArr.length;
            var loaded = 0;

            setting.init(0, total);
            for (var i in imgArr) {
                imgList.push($("<img />")
					.load(function() {
					    loaded++;
					    setting.loaded(this, loaded, total);
					    if (loaded == total) {
					        setting.loaded_all(loaded, total);
					    }
					})
					.attr("src", imgArr[i])

				);
            }

        }
    });
})(jQuery);


//CHECK SILVERLIGHT
var difesaSilverlightInstalled = false;
var nosilverlightBoxID = null;
var forceTestMode=false;

function SetSilverlightCheckFlags() {
    difesaSilverlightInstalled = true;
}


function NoSilverlightBoxOpen() {
    var boxSilverlight = document.getElementById("SilverlightBox");
    if (boxSilverlight)
        boxSilverlight.style.display = "none";
    var boxNoSilverlight = document.getElementById("NoSilverlightBox");
    if (boxNoSilverlight)
        boxNoSilverlight.style.display = "block";
}

function ShowHideSilverlight(forceSilverlight) {
    var show = true;
    if (forceSilverlight) {
        show = true
    }
    else {
        show = difesaSilverlightInstalled;
    }

    var boxSilverlight = document.getElementById("SilverlightBox");
    var boxNoSilverlight = document.getElementById("NoSilverlightBox");
    var boxSilverlightHighlight = document.getElementById("HomeHighlightsSilverlightBox");
    var boxNoSilverlightHighlight = document.getElementById("HomeHighlightsNoSilverlightBox");
    var boxSilverlightWorldMap = document.getElementById("WorldMapSilverlightBox");
    var boxNoSilverlightWorldMap = document.getElementById("WorldMapNoSilverlightBox");
    var boxSilverlightPubblicistica = document.getElementById("HomePubblicisticaSilverlightBox");
    var boxNoSilverlightPubblicistica = document.getElementById("HomePubblicisticaNoSilverlightBox");
    var noSilverlightPopup = document.getElementById(nosilverlightBoxID);
    var goToSilverlightBox = document.getElementById("goToSilverlightBox");
   
    if (!show) {
   //Silverlight Boxes
        if (boxSilverlight)
            boxSilverlight.style.display = "none";
//        if (boxSilverlightHighlight)
//         boxSilverlightHighlight.style.display = "none";
        if (boxSilverlightWorldMap)
            boxSilverlightWorldMap.style.display = "none";
        if (boxSilverlightPubblicistica)
            boxSilverlightPubblicistica.style.display = "none";
//    //NoSilverlight Boxes
        if (boxNoSilverlight)
            boxNoSilverlight.style.display = "block";
//        if (boxNoSilverlightHighlight)
//            boxNoSilverlightHighlight.style.display = "block";
        if (boxNoSilverlightWorldMap)
            boxNoSilverlightWorldMap.style.display = "block";
        if (boxNoSilverlightPubblicistica)
            boxNoSilverlightPubblicistica.style.display = "block";
        if (goToSilverlightBox)
            goToSilverlightBox.style.display = "block";
    }
    else {
//        //Silverlight Boxes
        if (boxSilverlight)
            boxSilverlight.style.display = "block";
//        if (boxSilverlightHighlight)
//            boxSilverlightHighlight.style.display = "block";
        if (boxSilverlightWorldMap)
            boxSilverlightWorldMap.style.display = "block";
        if (boxSilverlightPubblicistica)
            boxSilverlightPubblicistica.style.display = "block";
//        //NoSilverlight Boxes
        if (boxNoSilverlight)
            boxNoSilverlight.style.display = "none";
//        if (boxNoSilverlightHighlight)
//            boxNoSilverlightHighlight.style.display = "none";
        if (boxNoSilverlightWorldMap)
            boxNoSilverlightWorldMap.style.display = "none";
        if (boxNoSilverlightPubblicistica)
            boxNoSilverlightPubblicistica.style.display = "none";
        if (!difesaSilverlightInstalled) {
            if (noSilverlightPopup)
                noSilverlightPopup.style.display = "block";
        if (goToSilverlightBox)
            goToSilverlightBox.style.display = "none";
    }

    if (forceTestMode) {
            if (boxNoSilverlightHighlight)
                boxNoSilverlightHighlight.style.display = "none";

            if (boxSilverlightHighlight)
                boxSilverlightHighlight.style.display = "block";
        }

    }
}


//VOTES FOR SURVEY
function setVoteValue(fieldCtlId, vote) {
    var fieldCtl = document.getElementById(fieldCtlId);
    if (fieldCtl)
        fieldCtl.value = vote;
}


//AREA STORICA
function ShowTileLink(param) {
    var divTile = document.getElementById("divAreaStoricaFrame");
    divTile.style.display = "block";

    var iframeTile = document.getElementById("TileAreaStoricaFrame");
    iframeTile.src = param;

    var slDiv = document.getElementById("AreaStoricaSilverlightControlHost");
    slDiv.style.display = "none";
}

function HideTileLink() {
    var divTile = document.getElementById("divAreaStoricaFrame");
    divTile.style.display = "none";

    var iframeTile = document.getElementById("TileAreaStoricaFrame");
    iframeTile.src = "about:blank";

    var slDiv = document.getElementById("AreaStoricaSilverlightControlHost");
    slDiv.style.display = "block";
} 