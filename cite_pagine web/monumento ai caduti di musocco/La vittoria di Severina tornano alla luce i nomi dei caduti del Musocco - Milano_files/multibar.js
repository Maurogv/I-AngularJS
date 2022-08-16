var commentTimeStampHead;
var commentTimeStampBody;
var commentArticlePathHead;
var commentArticlePathBody;
var commentMostRatedPathHead;
var commentMostRatedPathBody
var commentVotingPath;
var loadVote = 0;
var userStatus = "unlogged";
var hostCommunity = "http://passaparola.corriere.it";
var followedSignatures = new Array();
var readingList = new Array();
var tags_interests_array = new Array();
var dataSetLocalCommunity = {
    'corrieredelmezzogiorno.corriere': 'CMCN',
    'corrierefiorentino.corriere': 'CMCF',
    'corrieredelveneto.corriere': 'CMCV',
    'corrieredibologna.corriere': 'CMBL',
    'video.corrieredelmezzogiorno.corriere.it': 'CMCN',
    'video.corrierefiorentino.corriere.it': 'CMCF',
    'video.corrieredelveneto.corriere.it': 'CMCV',
    'video.corrieredibologna.corriere.it': 'CMBL'
};
var path_community_popup = '/includes2007/ssi/boxes/community/popup/';
var isLocalEnvironmentCommunity = false;
var isLocalConsentCommunity = false;
if ($.browser.msie) {

    if (document.location.host == "passaparola.corriere.it") {
        var urlCommunity = 'http://' + document.location.host + '/community';
    } else {
        var urlCommunity = 'http://' + document.location.host + '/proxycommunity';
    }
    var hostCorriere = '//' + document.location.host;
    var hostCorriereStatic = '//' + document.location.host;
} else {
    var urlCommunity = "http://passaparola.corriere.it/community";
    var hostCorriere = "//xml2-temporeale.corriereobjects.it";
    var hostCorriereStatic = "http://static.corriere.it";
}

var cookie;
var DocumentTitle;
var responseIDComment;
var tokendata;
var idrunanumber;
var idrunanumber2;
var idruna;
var uuid_articolo;
var commentVisibility = "";
var loadAll = 0;
var loadMore;
var justDownload;
var count;
var commentArticleHeadDownoload;
var maxNumberCharactersCommunity = 300;
var site_community = "";

Date.prototype.monthNames = [
    "Gennaio", "Febbraio", "Marzo",
    "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre",
    "Ottobre", "Novembre", "Dicembre"
];


Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};

//cookie barra aperta/chiusa
function checkCookieMultibarView(azione, view) {
    corriereMultibarCookie = [];
    corriereMultibar = $.cookie('corriereMultibar');

    //setto un ora da questo momento
    var now = new Date();

    function createCookieMultibarView(view) {
        corriereMultibarCookie[1] = view;
        corriereMultibarCookie[2] = now;
        $.cookie('corriereMultibar', corriereMultibarCookie.join(';'), {
            //expires: now.toGMTString(),
            path: '/',
            domain: '.corriere.it'
        });
    }

    if (corriereMultibar == null) { // se non ho un token
        createCookieMultibarView("open");
    } else {
        var multibarSplit = corriereMultibar.split(';');
        //controllo se la data è scaduta 
        dataMultibar = multibarSplit[2];
        dataMultibar = new Date(dataMultibar);
        var dataMultibar1 = dataMultibar.setMinutes(dataMultibar.getMinutes() + 30);
        dataMultibar1 = new Date(dataMultibar1);
        if (now >= dataMultibar1) { // scaduto
            createCookieMultibarView("open");
        } else {
            if (multibarSplit[1] == "open") {
                $("#multibar #multibar-default").show();
                createCookieMultibarView("open");
            } else {
                $("#multibar").css("bottom", "-90px");
                $("#multibar #multibar-default .multibar-show-hide").addClass("hide");
                $("#multibar #multibar-default").show();
                createCookieMultibarView("close");
            }
        }

    }

    if (azione == "set") {
        createCookieMultibarView(view);
    }

}

function setLocalHostName() {

    $.each(dataSetLocalCommunity, function(i, dataSet) {
        if ($.trim(location.hostname).toLowerCase() == i) {
            site_community = i;
        }
    })
    if (site_community == "" && typeof(getSite) != 'undefined') {
        site_community = getSite().toLowerCase();
    }

}

function checkLocalEnvironment() {
    var resultVaue = true;
    $.each(dataSetLocalCommunity, function(i, dataSet) {
        if ($.trim(site_community).toLowerCase() == i) {
            resultVaue = false;
            isLocalEnvironmentCommunity = true;
            if ($.cookie('rcsSubscriptions') != null) {
                var localRcsSubscriptionsSplit = $.cookie('rcsSubscriptions').split('|');
                if (localRcsSubscriptionsSplit != null) {
                    for (var j = 0; j < localRcsSubscriptionsSplit.length; j++) {
                        if ($.trim(localRcsSubscriptionsSplit[j]).toUpperCase() == dataSet) {
                            isLocalConsentCommunity = true;
                            resultVaue = true;
                        }
                    }
                }
            }
        }
    })
    return resultVaue;
}

function checkLocalEnvironmentHomePage(localHost) {
    var resultVaue = false;
    if ($.cookie('rcsSubscriptions') != null) {
        var localRcsSubscriptionsSplit = $.cookie('rcsSubscriptions').split('|');
        if (localRcsSubscriptionsSplit != null) {
            for (var j = 0; j < localRcsSubscriptionsSplit.length; j++) {
                if ($.trim(localRcsSubscriptionsSplit[j]).toUpperCase() == dataSetLocalCommunity[localHost.toLowerCase()]) {
                    resultVaue = true;
                }
            }
        }
    }
    return resultVaue;
}

function getLcommCompleteUrl() {
    $('.bt-procedi').attr('href', url_community_local + '?rcsconnect=1');
    url_community_local = "";
}

function errorHandleCommunity(data, status, error, channel, methode, isApiCall) {
    var returnValue = false;
    if (isApiCall == 'API') {
        if (typeof(getSite) != 'undefined' && data.status != null && data.status == 401 && !checkLocalEnvironment()) {
            getTemplateMessage('/includes2007/ssi/boxes/community/popup/msglocalcomplete_registration.shtml?localCommunityRegistration=' + dataSetLocalCommunity[getSite()]);
            returnValue = true;
            if (methode == 'addEmotional') {
                $("#box-emotional ul").css("visibility", "visible");
                $("#box-emotional .loader").css("display", "none");
            }
        }
    } else {
        if (data != null && data.length != null && data.length > 2 && data[0] == 'KO-TESTATA') {
            returnValue = true;
            var socialTestata = data[2].replace(/ /g, '').toLowerCase() + '.corriere';
            /*if(data[2].search(/^Video/i)!=-1)
				{
					socialTestata=data[2].substring(6).replace(/ /g,'').toLowerCase()+'.corriere';
				}*/
            if (data[2].search(/^c.del Mezzogiorno/i) != -1) {
                socialTestata = "corrieredelmezzogiorno.corriere";
            }
            var homeSiteSection = '';
            if (typeof(getSite) != 'undefined' && getSite() == 'corriere' && $("#homepage-corriere").length > 0) {
                homeSiteSection = getSite();
            }
            url_community_local = status;
            getTemplateMessage('/includes2007/ssi/boxes/community/popup/msglocalcomplete_registration.shtml?azioneCommunityLocal=' + homeSiteSection + '&localCommunityRegistration=' + dataSetLocalCommunity[socialTestata]);
        }
    }
    return returnValue;
}

//funzione per la richiesta del token
function controlltoken(azione) {
    var tokenpath = urlCommunity + '/api/login.json?appName=COR&runaUserID=' + idrunanumber;
    var tokencookie = [];
    var tknsavecookie = $.cookie('corriereToken');
    var stopCheckLogin = $.cookie('stopCheckLogin');

    //setto un ora da questo momento
    var now = new Date();
    var expires = new Date();
    var time = expires.getTime();
    time += 3600 * 1000;
    expires.setTime(time);



    //funzione di chiamata al token
    /*function calltoken() {
		$.ajax({
			dataType: "json",
			url: tokenpath,
			timeout: 20000,
			success: function(data) {
				IPUser = data.ipAddress;
				tokendata = data.token;
				tokencookie[1] = tokendata;
				tokencookie[2] = now;
				$.cookie('corriereToken', tokencookie.join(';'), {
					expires: now.toGMTString(),
					path: '/',
					domain: '.corriere.it'
				});
				if(azione == "checkUserDefault") {
					getMultibarLogged();
				}	
			},
			error: function(x, t) {
				
				
				if(textStatust == "timeout" && azione == "checkUserDefault") {
					getMultibarNotLogged();
				} else { 
					if(azione == "checkUserDefault"){
						getMultibarNotLogged("modifica");
					}
				}
			}
		});
	}*/

    function calltoken() {

        $.getJSON(tokenpath, function(data) {
            IPUser = data.ipAddress;
            tokendata = data.token;
            tokencookie[1] = tokendata;
            tokencookie[2] = now;
            $.cookie('corriereToken', tokencookie.join(';'), {
                expires: now.toGMTString(),
                path: '/',
                domain: '.corriere.it'
            });
            if (azione == "checkUserDefault") {
                getMultibarLogged();
            }
        })
            .fail(function(jqxhr, textStatus, error) {
                if (azione == "checkUserDefault") {
                    getMultibarNotLogged("modifica");
                }
            })

    }

    if (tknsavecookie == null) { // se non ho un token
        calltoken();
        /*if(azione == "checkUserDefault") {
			getMultibarLogged();
		}*/
    } else {
        var tknsplitted = tknsavecookie.split(';');
        //controllo se la data è scaduta 
        datatkn = tknsplitted[2];
        datatkn = new Date(datatkn);
        var datatkn1 = datatkn.setHours(datatkn.getHours() + 1);
        datatkn1 = new Date(datatkn1);
        if (now >= datatkn1) {
            calltoken();
        } else {
            tokendata = tknsplitted[1];
            if (azione == "checkUserDefault") {
                getMultibarLogged();
            }
            return true;
        }

    }

}
var oraComments = new Date();

    if (oraComments.getHours() < 10){
        var HoursComemnt= ("0" + oraComments.getHours());
    }
    else{
        var HoursComemnt= oraComments.getHours();
    }

    var oraComment= HoursComemnt +""+oraComments.getMinutes();
    var NoCommentStart="2000";
    var NoCommentFinish="1000";

    if(oraComment>NoCommentStart&&oraComment<="2359"||oraComment>"0000"&&oraComment<=NoCommentFinish){
        //console.log("oraComment", oraComment)
        $("#box-community-scrivi").html("<img src='/images/bloccoCommenti.png'>");
    }

function openMultibar() {
    $('#multibar').animate({
        bottom: '0px'
    }, 500, function() {
        $('#multibar .multibar-show-hide').removeClass('hide');
        $("#mb-reading").css("visibility", "visible");
    });
    //checkCookieMultibarView("set","open");
}

function closeMultibar() {
    $('#multibar').animate({
        bottom: '-50px'
    }, 500, function() {
        $('#multibar .multibar-show-hide').addClass('hide');
        $("#mb-reading").css("visibility", "hidden");
    });
    //checkCookieMultibarView("set","close");
}

function messageKo() {
    $.fancybox({
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.50)'
                }
            }
        },
        'padding': 0,
        'href': "/includes2007/ssi/boxes/community/popup/ko.shtml",
        'type': 'ajax',
        'afterShow': function() {
            setTimeout(function() {
                $.fancybox.close();
            }, 3000);
        }
    });
}

// sendComment


/*Check su ora di invio commento*/
function getHoursRangeComment() {
    var result = true;

    if (typeof server_day_of_week  != 'undefined' && server_day_of_week < 6) {
        if (typeof server_hour != 'undefined' && (server_hour >= 22 || server_hour < 9)) {
            result = false;
        }
    } else {
        if (typeof server_hour != 'undefined' && (server_hour >= 22 || server_hour < 10)) {
            result = false;
        }
    }
    return result;
}

function getFancyboxRangehoursMessage() {

    var href = "/includes2007/ssi/boxes/community/popup/comment-rangehours-message.shtml";

    (typeof server_day_of_week  != 'undefined' && server_day_of_week > 5) ? href += "?day=sabdom" : href += "?day=lunven";

    $.fancybox({
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.50)'
                }
            }
        },
        'padding': 0,
        'href': href,
        'type': 'ajax',
        'afterShow': function() {
            setTimeout(function() {
                $.fancybox.close();
            }, 40000);
        }
    });
}

function getTemplateMessage(href) {
    $.fancybox({
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.50)'
                }
            }
        },
        'padding': 0,
        'href': href,
        'type': 'ajax',
        'afterShow': function() {
            //setTimeout(function(){$.fancybox.close();},40000);
        }
    });
}

function checkMaxNumberOfCharacters() {
    var tempCharLength = $("#box-community-scrivi form#sendcomment textarea").val().substr(0, maxNumberCharactersCommunity + 1).length;
    if (tempCharLength > maxNumberCharactersCommunity) {
        $("#box-community-scrivi form#sendcomment textarea").val($("#box-community-scrivi form#sendcomment textarea").val().substr(0, maxNumberCharactersCommunity));
    } else {
        $("#box-community-scrivi #counter").html(maxNumberCharactersCommunity - $("#box-community-scrivi form#sendcomment textarea").val().substr(0, maxNumberCharactersCommunity).length);
    }
}

function sendcomment() {

    if (!checkLocalEnvironment()) {
        getTemplateMessage('/includes2007/ssi/boxes/community/popup/msglocalcomplete_registration.shtml?localCommunityRegistration=' + dataSetLocalCommunity[site_community]);
        $(".fake_submit").remove();
        $("#box-community-scrivi .submit").css("display", "block");
    } else if (getHoursRangeComment()) {
        if ($('form#sendcomment textarea').val().length > 300) {
            $("#box-community-scrivi form#sendcomment textarea").val($("#box-community-scrivi form#sendcomment textarea").val().substr(0, 300));
            $("#box-community-scrivi #counter").html(300 - $("#box-community-scrivi form#sendcomment textarea").val().substr(0, 300).length);
            $(".fake_submit").remove();
            $("#box-community-scrivi .submit").css("display", "block");
            $.fancybox({
                helpers: {
                    overlay: {
                        css: {
                            'background': 'rgba(0, 0, 0, 0.50)'
                        }
                    }
                },
                'padding': 0,
                'href': "/includes2007/ssi/boxes/community/popup/message-to-long.shtml",
                'type': 'ajax',
                'afterShow': function() {
                    $("#response-popup .bt-ok").click(function(event) {
                        event.preventDefault();
                        $.fancybox.close();
                    });
                }
            });
            return false;
        }
        controlltoken();

        var seturltomessagespost = urlCommunity + "/api/corriere-comment.json";
        var messageToSend = $('form#sendcomment textarea').val();
        $.post(seturltomessagespost, {
                'applicationId': "COR",
                'comment.comment': messageToSend,
                'comment.path': uuid_articolo,
                'comment.answerToCommentId': responseIDComment,
                'token': tokendata,
                'comment.runaUserID': idrunanumber
            },
            function(data) {

                $.fancybox({
                    helpers: {
                        overlay: {
                            css: {
                                'background': 'rgba(0, 0, 0, 0.50)'
                            }
                        }
                    },
                    'padding': 0,
                    'href': "/includes2007/ssi/boxes/community/popup/msgsend-ok.shtml",
                    'type': 'ajax',
                    'afterShow': function() {
                        setTimeout(function() {
                            $.fancybox.close();
                        }, 3000);
                    }
                });

                $('form#sendcomment textarea').val("Scrivi qui il tuo commento");
                $('#sendcomment div.respond').hide();
                responseIDComment = undefined;
                $("#box-community-scrivi #counter").html(maxNumberCharactersCommunity);
                $(".fake_submit").remove();
                $("#box-community-scrivi .submit").css("display", "block");

            }, "json")
            .fail(function() {
                $.fancybox({
                    helpers: {
                        overlay: {
                            css: {
                                'background': 'rgba(0, 0, 0, 0.50)'
                            }
                        }
                    },
                    'padding': 0,
                    'href': "/includes2007/ssi/boxes/community/popup/ko.shtml",
                    'type': 'ajax',
                    'afterShow': function() {
                        setTimeout(function() {
                            $.fancybox.close();
                        }, 3000);
                    }
                });
                $(".fake_submit").remove();
                $('#sendcomment div.respond').hide();
                responseIDComment = undefined;
                $("#box-community-scrivi #counter").html(maxNumberCharactersCommunity);
                $('form#sendcomment textarea').val("Scrivi qui il tuo commento");
                $("#box-community-scrivi .submit").css("display", "block");
            });
    } else {
        $(".fake_submit").remove();
        $('#sendcomment div.respond').hide();
        responseIDComment = undefined;
        $("#box-community-scrivi #counter").html(maxNumberCharactersCommunity);
        $('form#sendcomment textarea').val("Scrivi qui il tuo commento");
        $("#box-community-scrivi .submit").css("display", "block");
        getFancyboxRangehoursMessage();
    }
}


function commentReply(elem) {
    $.fancybox.close();
    responseIDComment = $(elem).parents(".contributo").attr("rev");
    $('#box-community-scrivi form .respond .user-reply').html($(elem).parents(".contributo").find(".user").text());
    $('#box-community-scrivi form .respond').show();
    $('html, body').animate({
        scrollTop: $("#box-community-scrivi").offset().top
    }, 500);
    $("#box-community-scrivi form textarea").val("").click().focus();
    $("#box-community-scrivi #counter").html(maxNumberCharactersCommunity);
}

function commentReplyAll() {
    $.fancybox.close();
    responseIDComment = $(".fancy-th .contributo:first").attr("rev");
    $('#box-community-scrivi form .respond .user-reply').html($(".fancy-th .contributo:first").find(".user").text());
    $('#box-community-scrivi form .respond').show();
    $('html, body').animate({
        scrollTop: $("#box-community-scrivi").offset().top
    }, 500);
    $("#box-community-scrivi form textarea").val("").click().focus();
    $("#box-community-scrivi #counter").html(maxNumberCharactersCommunity);
}

// carico i primi 15 contributi
function getArticleHead(sortBy) {
    if (sortBy == "sort-by-vote") {
        urlToLoad = commentMostRatedPathHead;
    } else {
        urlToLoad = commentArticlePathHead;
    }
    $.ajax({
        url: urlToLoad,
        dataType: 'json',
        success: function(data) {
            if (data == "0") return false;
            //Salvo il timestamp dei commenti
            commentTimeStampHead = data.timestamp;
            commentArticleTotalCount = data.totalcount;
            //Aggiungo il count totale 
            $("#box-contributi .title .tot-reply").html(commentArticleTotalCount);
            $("#box-community-social .social .tot-reply").not(".box_Player_300 #box-community-social .tot-reply").html(commentArticleTotalCount);

            //Definisco la lista dei commenti 
            var commentList = data.commentList

            commentArticleHeadDownoload = false;
            if (data.totalcount < 16) {
                justDownload = true;
                loadMore = false;
            } else {
                loadMore = true;
            }
            addcomment(commentList, commentVotingPath, sortBy, loadMore, commentVisibility);
        },
        error: function() {
            $("#box-contributi .title .tot-reply").html("0");
        }
    });
}

function createReplyContent(clickElem) {
    $("#total-th").remove();
    $('<div id="total-th"></div>').appendTo('#box-contributi');
    $("#sort-by-date .contributo[rel=" + clickElem + "]").each(function() {
        $(this).clone().prependTo("#total-th");
    })
    $("#sort-by-date .contributo[rev=" + clickElem + "]").clone().prependTo("#total-th");
    $('<div class="title-overlay">Discussione</div>').prependTo("#total-th");
    $('<a href="#" class="link-reply-all">PARTECIPA ALLA DISCUSSIONE</a>').appendTo("#total-th");
    $("#total-th .contributo").removeClass("hide");

    $.fancybox({
        href: '#total-th',
        autoSize: false,
        width: 660,
        height: 400,
        fitToView: false,
        wrapCSS: 'fancy-th'
    });

}
// carico gli altri contributi
function getarticlebody(sortBy, commentVisibility, action, clickElem) {
    if (sortBy == "sort-by-vote") {
        urlToLoad = commentMostRatedPathBody;
    } else {
        urlToLoad = commentArticlePathBody;
    }
    $.getJSON(urlToLoad, function(data) {
        //controllo se la data è cambiata
        commentTimeStampBody = data.timestamp;
        if (commentTimeStampHead != commentTimeStampBody) {
            //$("#box-contributi #"+sortBy+" .contributo").remove();
            getArticleHead();
        }

        //Definisco la lista dei commenti 
        var commentList = data.commentList;
        loadMore = false;
        addcomment(commentList, commentVotingPath, sortBy, loadMore, commentVisibility);

        if (action == "viewReply") {
            createReplyContent(clickElem);
        }
    })
}

//funzione per appendere i commenti
function addcomment(listacommenti, commentVoti, sortBy, loadMore, commentVisibility) {

    var commentreplaylist = new Array();
    //var profilelink = 'http://gazzaspace.gazzetta.it/community/page/user/customUserPage-';
    var profilelink = '';
    $.each(listacommenti, function() {
        var dateform = parseInt(this.publicationDate);
        var DataFormattata = new Date(dateform);

        var minutidata;
        if (DataFormattata.getMinutes() < 10) {
            minutidata = '0' + DataFormattata.getMinutes();
        } else {
            minutidata = DataFormattata.getMinutes();
        }

        if (this.commentId != null) {
            if (this.commentReplyId != null) {
                var htmlCont = '<div class="contributo ' + commentVisibility + '" rev="' + this.commentId + '" rel="' + this.commentReplyId + '">'
            } else {
                var htmlCont = '<div class="contributo ' + commentVisibility + '" rev="' + this.commentId + '">';
            }
            htmlCont += '<div class="rating"><span></span></div>';
            htmlCont += '<div class="container-left">';
            htmlCont += '<div class="info">';

            var pathAvatarSmallCommenti = this.avatarSmall;

            if (pathAvatarSmallCommenti.indexOf("http://") == -1 && pathAvatarSmallCommenti.indexOf("https://") == -1) {
                pathAvatarSmallCommenti = hostCommunity + this.avatarSmall;
            }

            if (this.userRole == "JOURNALIST") {
                htmlCont += '<div class="avatar avatar-firma" rel="' + this.privateUserId + '"><img src="' + pathAvatarSmallCommenti + '" /></div>';
            } else {
                htmlCont += '<div class="avatar" rel="' + this.privateUserId + '"><img src="' + pathAvatarSmallCommenti + '" /></div>';
            }

            htmlCont += '<span class="user">' + this.userName + '</span>';
            htmlCont += '<span class="dataora">' + DataFormattata.getUTCDate() + '&nbsp;' + DataFormattata.getMonthName() + '&nbsp;' + DataFormattata.getFullYear() + ' | ' + DataFormattata.getHours() + '.' + minutidata + '</span>';
            htmlCont += '</div>';
            htmlCont += '<p>' + this.commentText + '</p>';
            if (this.commentReplyId != null) {
                htmlCont += '<div class="view-reply">Risposta a: ' + this.commentReplyUserName + ' <a href="#" rel="' + this.commentReplyId + '">Vedi la discussione</a></div>';
            }

            if (this.repliesCount != 0 && this.commentReplyId == null) {
                htmlCont += '<div class="view-reply"><a href="#" rel="' + this.commentId + '">Vedi la discussione completa</a></div>';
            }

            htmlCont += '</div>';
            htmlCont += '<ul class="azioni">';
            htmlCont += '<li class="ratingli"><a href="#" class="link-rating">VOTA <span></span></a></li>';
            if (this.repliesCount != 0) {
                htmlCont += '<li><a href="#" class="link-reply">RISPONDI (' + this.repliesCount + ')<span></span></a></li>';
            } else {
                htmlCont += '<li><a href="#" class="link-reply">RISPONDI<span></span></a></li>';
            }

            //htmlCont += '<li class="last"><a href="#">SEGNALA</a></li>';
            htmlCont += '</ul>';
            htmlCont += '</div>';

            $("#box-contributi #" + sortBy).append(htmlCont);

        }
    });

    if (loadMore) {
        $("#box-contributi #" + sortBy).append('<a href="#" class="load-more-contributi" rel="' + sortBy + '">Carica altri contenuti</a>');
    }

    /* voting singolo */
    loadVote++;
    if (loadVote > 1) { // solo quando carica il secondo json
        $("#box-contributi .contributo .rating, #box-contributi .contributo .azioni li a .num-rating").html();
        $.ajax({
            type: "GET",
            dataType: "json",
            url: commentVoti,
            success: function(data) {
                $.each(data.votingList, function() {
                    if (this.like > 0) {
                        $('#box-contributi .contributo[rev=' + this.commentId + ']').find('div.rating span').html(this.like).show();
                        $('#box-contributi .contributo[rev=' + this.commentId + ']').find('div.rating').show();
                        $('#box-contributi .contributo[rev=' + this.commentId + ']').find('a.link-rating span').html("(" + this.like + ")");
                    }
                })

                // mostro il primo come contributo pi� votato
                if ($("#sort-by-vote .contributo:first .azioni .link-rating span").text() != "") {
                    $("#box-contributi .top-rated-title").remove();
                    $("#box-contributi .contributo.top-rated").remove();
                    $("#sort-by-vote .contributo:first").addClass("top-rated").clone().prependTo('#box-contributi');
                    $("#sort-by-vote .contributo").removeClass("top-rated");
                    $('<div class="title top-rated-title">Il contributo pi� votato</div>').prependTo('#box-contributi');

                }
            }
        });

    }

} // fine addcomment


//vote function 
function addVote(commentid) {
    if (!checkLocalEnvironment()) {
        getTemplateMessage('/includes2007/ssi/boxes/community/popup/msglocalcomplete_registration.shtml?localCommunityRegistration=' + dataSetLocalCommunity[site_community]);
    } else {
        controlltoken();
        $("#box-contributi .contributo[rev=" + commentid + "] .azioni li.ratingli, .fancy-th .contributo[rev=" + commentid + "] .azioni li.ratingli").addClass("loading");

        var seturltoaddcategoryspost = urlCommunity + '/api/corriere-comment-vote.json';
        $.post(seturltoaddcategoryspost, {
            "applicationId": "COR",
            "idComment": commentid,
            "action": 'VOTE_ADD',
            "vote": "1",
            "token": tokendata
        }, function(data) {

            //incremento il voto visivamente	
            var numVote = $("#box-contributi .contributo[rev=" + commentid + "] .azioni li a.link-rating:first span").text().replace(")", "").replace("(", "");
            if (numVote == null || numVote == "") numVote = 0;
            numVote = parseInt(numVote) + 1
            $("#box-contributi .contributo[rev=" + commentid + "] .azioni li a.link-rating span, .fancy-th .contributo[rev=" + commentid + "] .azioni li a.link-rating span").text("(" + numVote + ")").unwrap();


            $.fancybox({
                helpers: {
                    overlay: {
                        css: {
                            'background': 'rgba(0, 0, 0, 0.50)'
                        }
                    }
                },
                'padding': 0,
                'href': "/includes2007/ssi/boxes/community/popup/voto-ok.shtml",
                'type': 'ajax',
                'afterShow': function() {
                    setTimeout(function() {
                        $.fancybox.close();
                    }, 3000);
                    $("#box-contributi .contributo[rev=" + commentid + "] .azioni li.ratingli, .fancy-th .contributo[rev=" + commentid + "] .azioni li.ratingli").removeClass("loading");
                }
            });



        }, "json")
            .fail(function() {
                $.fancybox({
                    helpers: {
                        overlay: {
                            css: {
                                'background': 'rgba(0, 0, 0, 0.50)'
                            }
                        }
                    },
                    'padding': 0,
                    'href': "/includes2007/ssi/boxes/community/popup/voto-no.shtml",
                    'type': 'ajax',
                    'afterShow': function() {
                        setTimeout(function() {
                            $.fancybox.close();
                        }, 3000);
                        $("#box-contributi .contributo[rev=" + commentid + "] .azioni li.ratingli, .fancy-th .contributo[rev=" + commentid + "] .azioni li.ratingli").removeClass("loading");

                    }
                });
            })
    }
}

//emotional function 
function addEmotional(emotionalVoteValue) {
    if (!checkLocalEnvironment()) {
        getTemplateMessage('/includes2007/ssi/boxes/community/popup/msglocalcomplete_registration.shtml?localCommunityRegistration=' + dataSetLocalCommunity[site_community]);
    } else {
        $("#box-emotional ul").css("visibility", "hidden");
        $("#box-emotional .loader").css("display", "block");
        controlltoken();
        var seturltoaddemotional = urlCommunity + '/api/emotional-corriere.json';

        $.ajax({
            type: 'POST',
            dataType: "json",
            url: seturltoaddemotional,
            timeout: 10000,
            data: {
                "articoloCorriereId": uuid_articolo,
                "runaUserid": idrunanumber,
                "emotionalVoteValue": emotionalVoteValue,
                "action": "EMOTIONAL_ADD",
                "token": tokendata
            },
            success: function() {

                // setTimeout(function(){
                // alert("stop");
                // $("#box-community-social .emotion .default-text").show();
                // return;
                // }, 500);	

                $("#box-emotional ul li a .txt .num").show();

                $.each($("#box-emotional ul li .circle"), function() {
                    var perc = $(this).attr("rel");
                    $(this).addClass(perc);
                });

                $("#box-emotional ul li a[rel=" + emotionalVoteValue + "]").addClass("selected");

                if ($("#box-community-social .emotion .default-text:visible").length > 0 || $("#box-community-social .emotion .txt .num").text().length == 0) {
                    $("#box-community-social .emotion .default-text").not(".box_Player_300 #box-community-social .emotion .default-text").hide();
                    $("#box-community-social .emotion .txt .text").not(".box_Player_300 #box-community-social .emotion .txt .text").text($("#box-emotional .emotional.selected .txt").text().replace(/\n /g, '').replace(/ /g, ''));
                    $("#box-community-social .emotion .txt .num").not(".box_Player_300 #box-community-social .emotion .txt .num").text("100%");
                    $("#box-community-social .emotion a .smile").not(".box_Player_300 #box-community-social .emotion a .smile").addClass("emo" + emotionalVoteValue);
                    $("#box-community-social .emotion a .circle").not(".box_Player_300 #box-community-social .emotion a .circle").addClass("perc100");

                }

                if ($("#CTVPlayerPL #rcs-community-pl1").length == 0) {
                    var currentCount = Number($("#box-community-social .emotion .txt .totalVote").not(".box_Player_300 #box-community-social .emotion .txt .totalVote").text());
                    $("#box-community-social .emotion .txt .totalVote").not(".box_Player_300 #box-community-social .emotion .txt .totalVote").text(currentCount + 1);
                    if ($("#box-community-social .emotion .txt .totalVote").not(".box_Player_300 #box-community-social .emotion .txt .totalVote").is(':hidden')) {
                        $("#box-community-social .emotion .txt .totalVote").not(".box_Player_300 #box-community-social .emotion .txt .totalVote").show();
                        $("#box-community-social .emotion .txt .totalVoteText").not(".box_Player_300 #box-community-social .emotion .txt .totalVoteText").css({
                            'display': 'block'
                        });
                    }
                }

                $.fancybox({
                    helpers: {
                        overlay: {
                            css: {
                                'background': 'rgba(0, 0, 0, 0.50)'
                            }
                        }
                    },
                    'padding': 0,
                    'href': "/includes2007/ssi/boxes/community/popup/voto-ok.shtml",
                    'type': 'ajax',
                    'afterShow': function() {
                        setTimeout(function() {
                            $.fancybox.close();
                        }, 3000);
                    }
                });
                $("#box-emotional ul").css("visibility", "visible");
                $("#box-emotional .loader").css("display", "none");

            },

            error: function(data, status, error) {
                if (status == "timeout") {
                    messageKo();
                    $("#box-emotional ul").css("visibility", "visible");
                    $("#box-emotional .loader").css("display", "none");
                } else {
                    $("#box-emotional ul li a .txt .num").show();

                    $.each($("#box-emotional ul li .circle"), function() {
                        var perc = $(this).attr("rel");
                        $(this).addClass(perc);
                    });
                    try {
                        var voteSave = $.parseJSON(data.responseText);
                        var voteSaveValue = voteSave.emotionalVoteValue;
                        $("#box-emotional ul li a[rel=" + voteSaveValue + "]").addClass("selected");

                        if (voteSaveValue) {
                            $.fancybox({
                                helpers: {
                                    overlay: {
                                        css: {
                                            'background': 'rgba(0, 0, 0, 0.50)'
                                        }
                                    }
                                },
                                'padding': 0,
                                'href': "/includes2007/ssi/boxes/community/popup/voto-ko.shtml",
                                'type': 'ajax',
                                'afterShow': function() {
                                    setTimeout(function() {
                                        $.fancybox.close();
                                    }, 3000);
                                }
                            });
                        } else {
                            messageKo();
                        }
                    } catch (exception) {
                        //console.log('addemotional: responseText is not json');
                        messageKo();
                    }
                    $("#box-emotional ul").css("visibility", "visible");
                    $("#box-emotional .loader").css("display", "none");
                }

            }

        });


        // $.post(seturltoaddemotional, 
        // { 
        // "articoloCorriereId": uuid_articolo,
        // "runaUserid": idrunanumber,
        // "emotionalVoteValue": emotionalVoteValue,
        // "action": "EMOTIONAL_ADD",
        // "token": tokendata
        // })
        // .done(function() { 

        // $("#box-emotional ul li a .txt .num").show();

        // $.each($("#box-emotional ul li .circle"), function() {
        // var perc = 	$(this).attr("rel");	
        // $(this).addClass(perc);
        // });

        // $("#box-emotional ul li a[rel="+emotionalVoteValue+"]").addClass("selected");

        // if ($("#box-community-social .emotion .default-text:visible").length > 0) {
        // $("#box-community-social .emotion .default-text").hide();
        // $("#box-community-social .emotion .txt .text").text($("#box-emotional .emotional.selected .txt").text().replace(/\n /g, '').replace(/ /g, ''));
        // $("#box-community-social .emotion .txt .num").text("100%");
        // $("#box-community-social .emotion a .smile").addClass("emo"+emotionalVoteValue);
        // $("#box-community-social .emotion a .circle").addClass("perc100");

        // }

        // $.fancybox({
        // helpers : {
        // overlay : {
        // css : {
        // 'background' : 'rgba(0, 0, 0, 0.50)'
        // }
        // }
        // },			   
        // 'padding' : 0,
        // 'href' : "/includes2007/ssi/boxes/community/popup/voto-ok.shtml",
        // 'type' : 'ajax',
        // 'afterShow' : function(){
        // setTimeout(function(){$.fancybox.close();},3000);
        // }
        // });
        // $("#box-emotional ul").css("visibility","visible");
        // $("#box-emotional .loader").css("display","none");

        // })
        // .fail(function(data) { 	

        // $("#box-emotional ul li a .txt .num").show();

        // $.each($("#box-emotional ul li .circle"), function() {
        // var perc = 	$(this).attr("rel");	
        // $(this).addClass(perc);
        // });

        // var voteSave = $.parseJSON(data.responseText);
        // var voteSaveValue = voteSave.emotionalVoteValue;
        // $("#box-emotional ul li a[rel="+voteSaveValue+"]").addClass("selected");

        // if (voteSaveValue) {
        // $.fancybox({
        // helpers : {
        // overlay : {
        // css : {
        // 'background' : 'rgba(0, 0, 0, 0.50)'
        // }
        // }
        // },			   
        // 'padding' : 0,
        // 'href' : "/includes2007/ssi/boxes/community/popup/voto-ko.shtml",
        // 'type' : 'ajax',
        // 'afterShow' : function(){
        // setTimeout(function(){$.fancybox.close();},3000);
        // }
        // });	
        // } else {
        // alert("ciao");
        // //messageKo();	
        // }
        //$("#box-emotional ul").css("visibility","visible");
        //$("#box-emotional .loader").css("display","none");		

        //}, "json");
    }
}

function getPercentage5(percentage) {
    var restoPercentage = percentage % 5;
    if (restoPercentage <= 2) {
        var rifPercentage = percentage - restoPercentage;
    } else {
        var rifPercentage = (percentage - restoPercentage) + 5;
    }
    return rifPercentage;
}

function getEmotional(articleid, channel) {
    urlEmotional = hostCorriere + '/community-corriere/emotional/articoli/uuid_place_holder/complete-results.json';
    urlEmotional = urlEmotional.replace("uuid_place_holder", articleid);
    var data_mostRated_community = 0;
    if ($("#CTVPlayerPL #rcs-community-pl1").length > 0) {
        data_mostRated_community = 1;
        $("#box-community-social .emotion a .smile").removeClass().addClass('smile');
    }
    $.getJSON(urlEmotional, function(data) {
        var emotionalMostRatedText = "";
        var percentage = "";
        var emotionalMostRatedValue = "";
        if (data != null && data != "" && data.mostRated != null) {
            emotionalMostRatedText = data.mostRated.emotionalVoteText;
            percentage = data.mostRated.percentage;
            emotionalMostRatedValue = data.mostRated.emotionalVoteValue;
            if (data_mostRated_community == 0) {
                data_mostRated_community = 2;
            }
        } else {
            emotionalMostRatedText = data.emotionalMostRatedText;
            percentage = data.percentage;
            emotionalMostRatedValue = data.emotionalMostRatedValue;
        }
        if (data != null && data != "") {
            if (channel == 1) {
                if (data_mostRated_community == 2 && $("#box-community-social .emotion .txt .totalVote").not(".box_Player_300 #box-community-social .emotion .txt .totalVote").is(':hidden')) {
                    $("#box-community-social .emotion .txt .totalVote").not(".box_Player_300 #box-community-social .emotion .txt .totalVote").text(data.totalVotes);
                    $("#box-community-social .emotion .txt .totalVote").not(".box_Player_300 #box-community-social .emotion .txt .totalVote").show();
                    $("#box-community-social .emotion .txt .totalVoteText").not(".box_Player_300 #box-community-social .emotion .txt .totalVoteText").css({
                        'display': 'block'
                    });
                }
                $("#box-community-social .emotion .default-text").not(".box_Player_300 #box-community-social .emotion .default-text").hide();
                $("#box-community-social .emotion .txt .text").not(".box_Player_300 #box-community-social .emotion .txt .text").text(emotionalMostRatedText);
                $("#box-community-social .emotion .txt .num").not(".box_Player_300 #box-community-social .emotion .txt .num").text(percentage + "%");
                $("#box-community-social .emotion a .smile").not(".box_Player_300 #box-community-social .emotion a .smile").addClass("emo" + emotionalMostRatedValue);
                $("#box-community-social .emotion a .circle").not(".box_Player_300 #box-community-social .emotion a .circle").addClass("perc" + getPercentage5(percentage));

                $.each(data.emotionalList, function() {
                    var elem = $("#box-emotional ul li a[rel=" + this.emotionalVoteValue + "]");
                    $(elem).find(".txt .num").text(this.percentage + "%").hide();
                    $(elem).find(".circle").attr("rel", "perc" + getPercentage5(this.percentage));
                });

                //$("#box-emotional ul li a[rel="+data.emotionalMostRatedValue+"]").addClass("selected").find(".txt .num").show();
            } else if (channel == 2) {
                $(".box_Player_300 #box-community-social .emotion .default-text").hide();
                $(".box_Player_300 #box-community-social .emotion .txt .text").text(emotionalMostRatedText);
                $(".box_Player_300 #box-community-social .emotion .txt .num").text(percentage + "%");
                $(".box_Player_300 #box-community-social .emotion a .smile").addClass("emo" + emotionalMostRatedValue);
                $(".box_Player_300 #box-community-social .emotion a .circle").addClass("perc" + getPercentage5(percentage));
            }
        }
    })
}

function getBoxArgomenti(articleid) {
    $("#rcs-community-pl #box-emotional ul li a").removeClass("selected");
    $("#rcs-community-pl #box-emotional ul li .num").html("");
    $.ajax({
        url: urlBoxArgomenti
    }).done(function(data) {
        if (data != "") {
            $("#CTVPlayerPL #rcs-community-pl1").html(data);
            for (var i = 0; i < tags_interests_array.length; i++) {
                $("#box-interessi ul li a[rev=" + tags_interests_array[i] + "]").addClass("on");
            }
        } else {
            $("#CTVPlayerPL #rcs-community-pl1").html("");
        }
    }).fail(function() {
        $("#CTVPlayerPL #rcs-community-pl1").html("");
    });

}

//OLD - RIPRISTINARE IN CASO DI VECCHIA GESTIONE EMOTICONAL BARRA LOGGED
// function createMultibarEmotionLog(data) {
// var elem = $("#multibar #multibar-log #mb-random .mb-emotion");
// $(elem).find(".smile").addClass("emo"+data.emotionalCommunity.emotionalVoteValue);
// $(elem).find(".perc").html(data.emotionalCommunity.percentage);
// $(elem).find(".desc").html(data.emotionalCommunity.emotionalVoteText);
// }

function createMultibarEmotionLog(data, multibarType) {

    $.each(data.rotatingList, function(nameObj, obj) {
        //console.log(nameObj);
        //console.log(obj.emotionalVoteText);
        var idElement = "#multibar #multibar-log #mb-random #mb-emotion" + nameObj;
        if (multibarType == 'NOTLOGGED') {
            idElement = "#multibar #multibar-default #mb-emo #mb-emotion" + nameObj;
        }
        var elem = $(idElement);
        $(elem).find(".smile").addClass("emo" + obj.emotionalVoteValue);
        $(elem).find(".perc").html(obj.percentage);
        $(elem).find(".desc").html(obj.emotionalVoteText);
    });
}

//OLD - RIPRISTINARE IN CASO DI VECCHIA GESTIONE RANDOM
// function createMultibarEmotion(data) {
// var elem = $("#multibar #multibar-default #mb-random .mb-emotion");
// $(elem).find(".smile").addClass("emo"+data.multibar.notificationcenter.emotionalCommunity.emotionalVoteValue);
// $(elem).find(".num").html(data.multibar.notificationcenter.emotionalCommunity.percentage);
// $(elem).find(".desc").html(data.multibar.notificationcenter.emotionalCommunity.emotionalVoteText);
// $(elem).find(".circle").addClass("perc"+getPercentage5(data.multibar.notificationcenter.emotionalCommunity.percentage));
// $(elem).addClass("random");
// }

//DISABILITARE IN CASO DI VECCHIA GESTIONE RANDOM
function createMultibarEmotion(data) {
    var elem = $("#multibar #multibar-default #mb-emo .mb-emotion");
    $(elem).find(".smile").addClass("emo" + data.multibar.notificationcenter.emotionalCommunity.emotionalVoteValue);
    $(elem).find(".num").html(data.multibar.notificationcenter.emotionalCommunity.percentage);
    $(elem).find(".desc").html(data.multibar.notificationcenter.emotionalCommunity.emotionalVoteText);
    $(elem).find(".circle").addClass("perc" + getPercentage5(data.multibar.notificationcenter.emotionalCommunity.percentage));
    //$(elem).addClass("random");
}

function createMultibarPoll(data) {
    var elem = $("#multibar #multibar-default #mb-random .mb-sondaggio")
    // $(elem).find(".domanda").html(data.multibar.notificationcenter.poll.title);
    // $(elem).find(".text").html(data.multibar.notificationcenter.poll.caption);
    // $(elem).find(".mb-vota").attr("href",data.multibar.notificationcenter.poll.url);
    $('#target_sondaggio').attr("href", data.multibar.notificationcenter.poll.url);
    $(elem).addClass("random");
}

function createMultibarPassaparola(data) {
    var elem = $("#multibar #multibar-default #mb-random .mb-passaparola")
    $(elem).find(".tot-passaparola a").html(data.multibar.notificationcenter.mostSharedArticle.sharingsCount);
    $(elem).find("a").attr("href", data.multibar.notificationcenter.mostSharedArticle.url);
    $(elem).find(".tit").html(data.multibar.notificationcenter.mostSharedArticle.title);
    $(elem).find(".text").html(data.multibar.notificationcenter.mostSharedArticle.caption);
    $(elem).addClass("random");
}

function createRedazioneOnLine(data) {
    var elem = $("#multibar #multibar-default #mb-random .mb-redazioneonline");
    $(elem).find("a").attr("href", data.multibar.notificationcenter.editorialContent.url);
    $(elem).find(".text").html(data.multibar.notificationcenter.editorialContent.text);
    $(elem).addClass("random");
}

function rotateMultibar(total) {
    $('#multibar #multibar-default #mb-random>div').hide();
    $('#multibar #multibar-default #mb-random .random:eq(' + count + ')').show();
    count++;
    if (count == total) {
        count = 0;
    }
}

function rotateMultibarLog(total) {
    $("#multibar #multibar-log #mb-interessi .mb-interessi .interesse").hide();
    $("#multibar #multibar-log #mb-interessi .mb-interessi .interesse:eq(" + count + ")").show();
    count++;
    if (count == total) {
        count = 0;
    }
}

//Gestione rotazione Emoticonal richiesta mantis 41550
function rotateMultibarLogEmoticonal(total, multibarType) {
    //$('#multibar #multibar-log  #mb-random>div').hide();
    if (multibarType == 'LOGGED') {
        $("#multibar #multibar-log #mb-random .mb-emotion").hide();
        $("#multibar #multibar-log #mb-random .mb-emotion:eq(" + countMultibarLogEmoticonal + ")").show();
    } else {
        $("#multibar #multibar-default #mb-emo .mb-emotion").hide();
        $("#multibar #multibar-default #mb-emo .mb-emotion:eq(" + countMultibarLogEmoticonal + ")").show();
    }
    countMultibarLogEmoticonal++;
    if (countMultibarLogEmoticonal == total) {
        countMultibarLogEmoticonal = 0;
    }
}

function getMultibarNotLogged(azione) {
    if (azione == "modifica") {
        userStatus = "notEnabled";
        $("#multibar #multibar-default #mb-login").html('<a class="mb-complete" href="javascript:lcom_CompletaReg();">Completa la registrazione per accedere a passaparola</a>');
        $("#box-community-scrivi form#sendcomment textarea").addClass("disabled");
    }

    var urlMultibarNotLogged = hostCorriere + '/community-corriere/barra-nologged.json';

    $.getJSON(urlMultibarNotLogged, function(data) {

        createMultibarEmotionLog(data.multibar.notificationcenter, 'NOTLOGGED');

        $.each(data.multibar.notificationcenter, function(nameObj, obj) {
            if (nameObj == "bestTopics") {
                $.each(obj.topicsList, function() {
                    $("#multibar #multibar-default #mb-arg .mb-arg").append('<li><a class="' + this.posizione + '" href="' + this.url + '">' + this.label + '</a></li>')
                });
            } else if (nameObj == "emotionalCommunity") {
                //createMultibarEmotion(data);
            } else if (nameObj == "poll") {
                if (obj && $.trim(obj) != "null" && $.trim(obj) != "") {
                    createMultibarPoll(data);
                }
            } else if (nameObj == "mostSharedArticle") {
                //createMultibarPassaparola(data);
            } else if (nameObj == "editorialContent") {
                if (obj && $.trim(obj) != "null") {
                    createRedazioneOnLine(data);
                }
            }
        })


        total = $('#multibar #multibar-default #mb-random .random').length;
        count = 0;
        rotateMultibar(total);
        setInterval(function() {
            rotateMultibar(total)
        }, 10000);


        //Gestione rotazione Emoticonal richiesta mantis 41550
        totalEmoticonal = $("#multibar #multibar-default #mb-emo .mb-emotion").length;
        countMultibarLogEmoticonal = 0;
        rotateMultibarLogEmoticonal(totalEmoticonal, 'NOTLOGGED');
        setInterval(function() {
            rotateMultibarLogEmoticonal(totalEmoticonal, 'NOTLOGGED')
        }, 5000);

        if (azione == "modifica") {
            $("#multibar #multibar-default").show();
            $("#multibar .multibar-show-hide").live("click", function(event) {
                event.preventDefault();
                if ($(this).hasClass("hide")) {
                    openMultibar();
                } else {
                    closeMultibar();
                }
            });
        } else {

            $("#multibar .multibar-show-hide").live("click", function(event) {
                event.preventDefault();
                if ($(this).hasClass("hide")) {
                    openMultibar();
                } else {
                    closeMultibar();
                }
            });
            //checkCookieMultibarView();	

        }
    })
    loadFirma();
}


function getMultibarLogged() {
    userStatus = "enabled";
    $("#box-community-scrivi form#sendcomment textarea").removeClass("disabled");

    var urlEmotionalGeneral = hostCorriere + '/community-corriere/emotional/general-community.json?v=[an error occurred while processing this directive]';

    $.getJSON(urlEmotionalGeneral, function(data) {
        createMultibarEmotionLog(data, 'LOGGED');
    });

    var urlMultibarLogged = hostCorriere + '/community-corriere/utenti/' + idrunanumbersplit + '/' + idrunanumber + '.json';

    $.getJSON(urlMultibarLogged, function(data) {

        // if (data.multibar.avatar == "avatar_default_medium.jpg") {
        // pathAvatar = hostCommunity+"/pub/avatar/avatar_default_medium.jpg";
        // } else {
        // pathAvatar = hostCommunity+"/pub/avatar/"+data.multibar.avatar;
        // }

        pathAvatar = data.multibar.avatar;

        if (pathAvatar.indexOf("http://") == -1 && pathAvatar.indexOf("https://") == -1) {
            pathAvatar = hostCommunity + "/pub/avatar/" + data.multibar.avatar;
        }

        $("#multibar #multibar-log #mb-modify .mb-modify").html('<img class="avatar" src="' + pathAvatar + '">').attr("href", hostCommunity + data.multibar.userPageUrl);

        setNickNameUser(data.multibar.nick);

        if ($("#uuid_articolo").length > 0 || $("#CTVPlayerPL #rcs-community-pl1").length > 0) {
            $("#box-community-scrivi form#sendcomment .avatar").attr("src", pathAvatar);

            // prevalorizzazione tag interessi
            if ("subscribedTopics" in data.multibar && "normalizedTopicList" in data.multibar.subscribedTopics && data.multibar.subscribedTopics.normalizedTopicList != null) {
                $.each(data.multibar.subscribedTopics.normalizedTopicList, function(nameObj, obj) {
                    $("#box-interessi ul li a[rev=" + obj + "]").addClass("on");
                    tags_interests_array.push(obj);
                })
            }
        }

        $("#multibar #multibar-log #mb-interessi .mb-interessi").show();
        $.each(data.multibar.notificationcenter, function(nameObj, obj) {
            if (nameObj == "userFeed") {
                if (this.newContentsCount > 0) {
                    $("#multibar #multibar-log #mb-interessi .num-notifiche").show();
                    $("#multibar #multibar-log #mb-interessi .num-notifiche .num a").html(this.newContentsCount);
                } else {
                    //$("#multibar #multibar-log #mb-interessi .num-notifiche").hide();	
                }
                /*if (this.feedToShowList != null) {
					$.each(this.feedToShowList, function(nameFeed, objFeed) {
						var interesse = '<div class="interesse">'
						interesse += '<a href="'+hostCommunity+'/community/page/feed.action"><img class="avatar" src="'+objFeed.image+'"></a>'
						interesse += '<p class="txt"><a href="'+hostCommunity+'/community/page/feed.action"><span class="author">'+objFeed.userName+'</span> '+ objFeed.action+'... </a></p>'
						interesse += '</div>'
						$("#multibar #multibar-log #mb-interessi .mb-interessi").append(interesse).show();
						$("#multibar #multibar-log #mb-interessi .mb-interessi-default").hide();
					})
				}*/

            } else if (nameObj == "readings") {
                $("#multibar #multibar-log #mb-reading .mb-reading").html(this.count);
            }
        });

        if ("followedSignatures" in data.multibar && "userIdList" in data.multibar.followedSignatures && data.multibar.followedSignatures.userIdList != null) {
            $.each(data.multibar.followedSignatures, function(nameObj, obj) {
                if (nameObj == "userIdList") {
                    // prevalorizzazione firme interessi
                    if (data.multibar.followedSignatures.userIdList != null) {
                        $.each(data.multibar.followedSignatures.userIdList, function(nameObj, obj) {
                            followedSignatures.push(obj);
                        })
                    }
                }
            });
        }

        //MOD
        loadFirma();

        // prevalorizzazione readinglist articolo	
        if ("articlesToRead" in data.multibar && "uuidList" in data.multibar.articlesToRead && data.multibar.articlesToRead.uuidList != null) {
            $.each(data.multibar.articlesToRead.uuidList, function(nameObj, obj) {

                if ($("#uuid_articolo").length > 0) {
                    if (obj == uuid_articolo) {
                        $("#box-community-social .reading-list, #box-community-firma .reading-list").not("div[id^=js_DescriptionAndTools_] .reading-list").removeClass("off").addClass("on");
                        // parte la chiamata per segnarlo come letto nella readinglist
                        readBookmarkReadingList(obj);
                    }

                } else if ($("#homepage-corriere .social-bar").length > 0 || $("#home-cinema-tv .social-bar").length > 0 || $("#sez-home .social-bar").length > 0 || $("#col-sx .articles-home .social-bar .reading-list").length > 0) {
                    $(".social-bar .readinglist .reading-list[rel=" + obj + "]").removeClass("off").addClass("on").attr("title", "Rimuovi dalla reading list").attr("alt", "Rimuovi dalla reading list");
                } else {
                    readingList.push(obj);
                }
            })
        }


        total = $("#multibar #multibar-log #mb-interessi .mb-interessi .interesse").length;
        count = 0;
        rotateMultibarLog(total);
        setInterval(function() {
            rotateMultibarLog(total)
        }, 5000);

        //Gestione rotazione Emoticonal richiesta mantis 41550
        totalEmoticonal = $("#multibar #multibar-log #mb-random .mb-emotion").length;
        countMultibarLogEmoticonal = 0;
        rotateMultibarLogEmoticonal(totalEmoticonal, 'LOGGED');
        setInterval(function() {
            rotateMultibarLogEmoticonal(totalEmoticonal, 'LOGGED')
        }, 5000);

        $("#mb-reading").css("visibility", "visible");
        $("#multibar #multibar-log").show();

    })
        .fail(function() {
            $("#multibar #multibar-log #mb-reading").html("");
            $("#multibar #multibar-log").show();
        })

    $("#mb-reading").css("visibility", "hidden");
    $("#multibar .multibar-show-hide").live("click", function(event) {
        event.preventDefault();
        if ($(this).hasClass("hide")) {
            openMultibar();
        } else {
            closeMultibar();
        }
    });

}

function checkReadingListLocalVideo(data_href, localVideo) {
    var resultValue = true;
    if (data_href.toLowerCase().search(/^http:\/\/video.corrierefiorentino.corriere.it|^http:\/\/video.corrieredelveneto.corriere.it|^http:\/\/video.corrieredibologna.corriere.it|^http:\/\/video.corrieredelmezzogiorno.corriere.it/) != -1 && !checkLocalEnvironmentHomePage(data_href.toLowerCase().substring(7, data_href.length).split('\/')[0])) {
        resultValue = false;
        localVideo = true;
    }
    return resultValue;
}

// reading list
function checkReadingList(elem) {
    var videoMain = isPlayerVideoElement(elem);
    if (videoMain.length) {
        uuidReadingList = $('#' + videoMain + ' #uuid_video').text();
    } else {
        if ($(elem).attr("rel") == null || $(elem).attr("rel") == "") {
            uuidReadingList = uuid_articolo;
        } else {
            uuidReadingList = $(elem).attr("rel");
        }
    }
    if ($(elem).hasClass("off")) {
        var data_href = $(elem).parents('.social-bar').attr('data-href');
        if (data_href != null && $("#homepage-corriere").length > 0) {
            var isLocalVideoCommunity = true;
            if (data_href.toLowerCase().search(/^http:\/\/corrierefiorentino.corriere.it|^http:\/\/corrieredelveneto.corriere.it|^http:\/\/corrieredibologna.corriere.it|^http:\/\/corrieredelmezzogiorno.corriere.it/) != -1 && !checkLocalEnvironmentHomePage(data_href.substring(7, data_href.length).split('.')[0] + '.corriere') || !(isLocalVideoCommunity = checkReadingListLocalVideo(data_href.toLowerCase()))) {

                url_community_local = data_href;
                var hostLocalNameCommunity = "";
                if (isLocalVideoCommunity) {
                    hostLocalNameCommunity = data_href.toLowerCase().substring(7, data_href.length).split('.')[0] + '.corriere';
                } else {
                    hostLocalNameCommunity = data_href.toLowerCase().substring(7, data_href.length).split('\/')[0];
                }
                getTemplateMessage('/includes2007/ssi/boxes/community/popup/msglocalcomplete_registration.shtml?azioneCommunityLocal=corriere&localCommunityRegistration=' + dataSetLocalCommunity[hostLocalNameCommunity]);
            } else {
                addReadingList(uuidReadingList, elem);
            }
        } else if (!checkLocalEnvironment()) {
            getTemplateMessage('/includes2007/ssi/boxes/community/popup/msglocalcomplete_registration.shtml?localCommunityRegistration=' + dataSetLocalCommunity[site_community]);
        } else {
            addReadingList(uuidReadingList, elem);
        }
    } else if ($(elem).hasClass("on")) {
        var data_href = $(elem).parents('.social-bar').attr('data-href');
        if (data_href != null && $("#homepage-corriere").length > 0) {
            var isLocalVideoCommunity = true;
            if (data_href.toLowerCase().search(/^http:\/\/corrierefiorentino.corriere.it|^http:\/\/corrieredelveneto.corriere.it|^http:\/\/corrieredibologna.corriere.it|^http:\/\/corrieredelmezzogiorno.corriere.it/) != -1 && !checkLocalEnvironmentHomePage(data_href.substring(7, data_href.length).split('.')[0] + '.corriere') || !(isLocalVideoCommunity = checkReadingListLocalVideo(data_href.toLowerCase()))) {
                url_community_local = data_href;
                var hostLocalNameCommunity = "";
                if (isLocalVideoCommunity) {
                    hostLocalNameCommunity = data_href.toLowerCase().substring(7, data_href.length).split('.')[0] + '.corriere';
                } else {
                    hostLocalNameCommunity = data_href.toLowerCase().substring(7, data_href.length).split('\/')[0];
                }
                getTemplateMessage('/includes2007/ssi/boxes/community/popup/msglocalcomplete_registration.shtml?azioneCommunityLocal=corriere&localCommunityRegistration=' + dataSetLocalCommunity[hostLocalNameCommunity]);
            } else {
                removeReadingList(uuidReadingList, elem);
            }
        } else if (!checkLocalEnvironment()) {
            getTemplateMessage('/includes2007/ssi/boxes/community/popup/msglocalcomplete_registration.shtml?localCommunityRegistration=' + dataSetLocalCommunity[site_community]);
        } else {
            removeReadingList(uuidReadingList, elem);
        }
    }
}

function addReadingList(uuidReadingList, elem) {
    $.fancybox({
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.50)'
                }
            }
        },
        'padding': 0,
        'href': "/includes2007/ssi/boxes/community/popup/add-readinglist.shtml",
        'type': 'ajax',
        'afterShow': function() {
            $("#response-popup .bt-ok").click(function(event) {
                event.preventDefault();
                $(elem).addClass("loading");
                $.fancybox.close();
                var seturltoaddreadinglist = urlCommunity + '/json/addBookmark.action?callback=?';
                $.getJSON(seturltoaddreadinglist, {
                    "externalID": uuidReadingList
                }, function(data) {
                    if (data[0] == "KO") {
                        //alert("Si è verificato un problema");
                        messageKo();
                        $(elem).removeClass("loading");
                    } else {
                        var videoMain = isPlayerVideoElement(elem);
                        if (videoMain.length) {
                            $('#' + videoMain + " .reading-list").removeClass("off").addClass("on");
                            if ($('#' + videoMain).parents('.box_Player_300').length) {
                                $('#' + videoMain + " #box-community-social .reading-list").removeClass("off").addClass("on");
                            }
                        } else {
                            if ($('#unamamma_imperfetta_community_tatamy').length > 0) {
                                $("#box-community-social .reading-list, #box-community-firma .reading-list").removeClass("off").addClass("on");
                            }
                            if ($("#uuid_articolo").length > 0) {
                                $("#box-community-social .reading-list, #box-community-firma .reading-list").not("div[id^=js_DescriptionAndTools_] .reading-list").removeClass("off").addClass("on");
                            } else {
                                $(elem).removeClass("off").addClass("on");
                            }
                        }
                        $("#multibar-log #mb-reading .mb-reading").html(Number($("#multibar-log #mb-reading .mb-reading").text()) + 1);
                    }
                    $(elem).removeClass("loading");
                }).fail(function(data, status, error) {
                    $(elem).removeClass("loading");
                })
            });

            $("#response-popup .bt-annulla").click(function(event) {
                event.preventDefault();
                $.fancybox.close();
            });
        }
    });
}

function readBookmarkReadingList(uuidReadingList, elem) {
    var seturltoremovereadinglist = urlCommunity + '/json/readBookmarkFromExternal.action?callback=?';
    $.getJSON(seturltoremovereadinglist, {
        "externalID": uuidReadingList
    }, function(data) {
        if (data[0] == "KO") {
            //messageKo();
        } else {
            if (data[1] == "false") { //articolo non letto
                $("#multibar-log #mb-reading .mb-reading").html(Number($("#multibar-log #mb-reading .mb-reading").text()) - 1);
            }
        }
    });
}

function removeReadingList(uuidReadingList, elem) {
    $.fancybox({
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.50)'
                }
            }
        },
        'padding': 0,
        'href': "/includes2007/ssi/boxes/community/popup/remove-readinglist.shtml",
        'type': 'ajax',
        'afterShow': function() {
            $("#response-popup .bt-ok").click(function(event) {
                event.preventDefault();
                $(elem).addClass("loading");
                $.fancybox.close();

                var seturltoremovereadinglist = urlCommunity + '/json/deleteBookmark.action?callback=?';
                $.getJSON(seturltoremovereadinglist, {
                    "externalID": uuidReadingList
                }, function(data) {
                    if (data[0] == "KO") {
                        //alert("Si è verificato un problema");	
                        messageKo();
                        $(elem).removeClass("loading");
                    } else {
                        if (elem) {
                            var videoMain = isPlayerVideoElement(elem);
                            if (videoMain.length) {
                                $('#' + videoMain + " .reading-list").removeClass("on").addClass("off").removeClass("loading");
                                if ($('#' + videoMain).parents('.box_Player_300').length) {
                                    $('#' + videoMain + " #box-community-social .reading-list").removeClass("on").addClass("off").removeClass("loading");
                                }
                            } else {
                                if ($('#unamamma_imperfetta_community_tatamy').length > 0) {
                                    $("#box-community-social .reading-list, #box-community-firma .reading-list").removeClass("on").addClass("off").removeClass("loading");
                                }
                                if ($("#uuid_articolo").length > 0) {
                                    $("#box-community-social .reading-list, #box-community-firma .reading-list").not("div[id^=js_DescriptionAndTools_] .reading-list").removeClass("on").addClass("off").removeClass("loading");
                                } else {
                                    $(elem).removeClass("on").addClass("off").removeClass("loading");
                                }
                            }
                        }
                        if (data[1] == "false") { //articolo non letto
                            $("#multibar-log #mb-reading .mb-reading").html(Number($("#multibar-log #mb-reading .mb-reading").text()) - 1);
                        }

                    }
                }).fail(function(data, status, error) {
                    $(elem).removeClass("loading");
                })
            });

            $("#response-popup .bt-annulla").click(function(event) {
                event.preventDefault();
                $.fancybox.close();
            });
        }
    });
}


//INTERESSI TAG
function checkTag(elem) {
    if ($(elem).hasClass("on")) {
        removeInter($(elem).attr("rel"), $(elem));
    } else {
        addInter($(elem).attr("rel"), $(elem));
    }
}

function addInter(tagId, elem) {
    $.fancybox({
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.50)'
                }
            }
        },
        'padding': 0,
        'href': "/includes2007/ssi/boxes/community/popup/add-tag.shtml",
        'type': 'ajax',
        'afterShow': function() {
            $("#response-popup .bt-ok").click(function(event) {
                event.preventDefault();
                $(elem).addClass("loading");
                $.fancybox.close();
                var urlinterest = urlCommunity + '/json/featureTagCategory.action?callback=?'
                $.getJSON(urlinterest, {
                    "tagString": tagId
                }, function(data) {
                    if (data.error == true) {
                        //alert("Si è verificato un problema");
                        messageKo();
                        $(elem).removeClass("loading");
                    } else {
                        var totalInt = Number($(elem).text());
                        $(elem).addClass("on").text(totalInt + 1);
                        $(elem).removeClass("loading");
                    }
                });
            });

            $("#response-popup .bt-annulla").click(function(event) {
                event.preventDefault();
                $.fancybox.close();
            });
        }
    });
}

function removeInter(tagId, elem) {
    $.fancybox({
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.50)'
                }
            }
        },
        'padding': 0,
        'href': "/includes2007/ssi/boxes/community/popup/remove-tag.shtml",
        'type': 'ajax',
        'afterShow': function() {
            $("#response-popup .bt-ok").click(function(event) {
                event.preventDefault();
                $(elem).addClass("loading");
                $.fancybox.close();
                var urlinterest = urlCommunity + '/json/featureTagCategory.action?callback=?'
                $.getJSON(urlinterest, {
                    "tagString": tagId
                }, function(data) {
                    if (data.error == true) {
                        //alert("Si è verificato un problema");
                        messageKo();
                        $(elem).removeClass("loading");
                    } else {
                        var totalInt = Number($(elem).text());

                        if (totalInt > 0) {
                            $(elem).removeClass("on").text(totalInt - 1);
                        } else {
                            $(elem).removeClass("on");
                        }
                        $(elem).removeClass("loading");

                    }

                });
            });

            $("#response-popup .bt-annulla").click(function(event) {
                event.preventDefault();
                $.fancybox.close();
            });
        }
    });
}



function checkInterUser(elem) {
    if ($(elem).hasClass("on")) {
        removeInterUser($(elem).attr("rel"), $(elem));
    } else {
        addInterUser($(elem).attr("rel"), $(elem));
    }

}


function addInterUser(userId, elem) {
    $.fancybox({
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.50)'
                }
            }
        },
        'padding': 0,
        'href': "/includes2007/ssi/boxes/community/popup/add-firma.shtml",
        'type': 'ajax',
        'afterShow': function() {
            $("#response-popup .bt-ok").click(function(event) {
                event.preventDefault();
                $(elem).addClass("loading");
                $.fancybox.close();
                var urlinterestUser = urlCommunity + '/json/socialRelationshipConnect?callback=?'
                $(elem).addClass("loading");
                $.post(urlinterestUser, {
                        'relationshipId': 'favorite',
                        'userId': userId
                    },
                    function(json) {
                        if (json.code == 'success') {
                            var currentCount = Number($('#box-firma .add-user').text());
                            $('#box-firma .add-user').text(currentCount + 1);
                            $(elem).addClass("on").removeClass("off").removeClass("loading");
                        } else {
                            messageKo();
                            $(elem).removeClass("loading");
                        }
                    },
                    'json'
                );
            });

            $("#response-popup .bt-annulla").click(function(event) {
                event.preventDefault();
                $.fancybox.close();
            });
        }
    });
}


function removeInterUser(userId, elem) {

    $.fancybox({
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.50)'
                }
            }
        },
        'padding': 0,
        'href': "/includes2007/ssi/boxes/community/popup/remove-firma.shtml",
        'type': 'ajax',
        'afterShow': function() {
            $("#response-popup .bt-ok").click(function(event) {
                event.preventDefault();
                $(elem).addClass("loading");
                $.fancybox.close();
                var urlremoveinterestUser = urlCommunity + '/json/socialRelationshipDisconnect?callback=?'
                $(elem).addClass("loading");
                $.post(urlremoveinterestUser, {
                        'relationshipId': 'favorite',
                        'userId': userId
                    },
                    function(json) {
                        if (json.code == 'success') {
                            var currentCount = Number($('#box-firma .add-user').text());
                            $('#box-firma .add-user').text(currentCount - 1);
                            $(elem).addClass("off").removeClass("on").removeClass("loading");
                        } else {
                            $(elem).removeClass("loading");
                            messageKo();
                        }
                    },
                    'json'
                );
            });

            $("#response-popup .bt-annulla").click(function(event) {
                event.preventDefault();
                $.fancybox.close();
            });
        }
    });

}



function lightboxUserExternal(idUser) {
    $('<div id="info-utente"><link href="http://passaparola.corriere.it/community/skins/rcs_corriere/css/contents.css" media="all" rel="stylesheet" type="text/css" /><link href="http://passaparola.corriere.it/community/skins/rcs_corriere/css/lightboxes.css" media="all" rel="stylesheet" type="text/css" /><link href="http://passaparola.corriere.it/community/skins/rcs_corriere/css/typography.css" media="all" rel="stylesheet" type="text/css" /></div>').appendTo('body');

    $.post(urlCommunity + '/json/lightboxUserExternal', {
            'userID': idUser
        },
        function(data) {
            $('#info-utente').append(data);
        });

    $.fancybox({
        href: '#info-utente',
        autoSize: false,
        width: 700,
        height: 420,
        fitToView: false,
        wrapCSS: 'info-utente',
        scrolling: 'no',
        padding: 0
    });

}



function loadFirma() {
    if ($("#box-firma span").attr("rel")) {
        var pathFrima = $("#box-firma span").attr("rel").toLowerCase();
        $.ajax({
            url: "/community-corriere/firme/" + pathFrima + ".inc"
        }).done(function(data) {
            if (data != "") {
                $("#box-firma").html(data);

                $("#box-firma a.show-user").click(function(event) {
                    event.preventDefault();
                    lightboxUserExternal($(this).attr("rel"));
                })


                var idUserFirma = $("#box-firma a.add-user").attr("rel");
                if ($.inArray(idUserFirma, followedSignatures) != -1) {
                    $("#box-firma a.add-user").addClass("on");
                }

            }
        });
    }
}


function widgetFirma() {
    $("#widget-firma a.show-user").click(function(event) {
        event.preventDefault();
        lightboxUserExternal($(this).attr("rel"));
    })

    $("#widget-firma a.rating").each(function() {
        if ($.inArray($(this).attr("rel"), followedSignatures) != -1) {
            $(this).addClass("on");
        }
    });

}


function loadMultiBar() {
    $("#multibar #multibar-log, #multibar #multibar-default").hide();
    cookie = $.cookie('rcsLogin');

    if ((document.cookie).indexOf('rcsLogin') != '-1') { //utente loggato
        if (cookie != null) {
            var cookieVal = cookie.split('|');
            idruna = cookieVal[1] + '.json';
            idrunanumber = cookieVal[1];

            document.communityUser = new Object();
            communityUser = {
                userName: cookieVal[0],
                userNumber: cookieVal[1],
                userCommunityId: cookieVal[2],
                userNick: cookieVal[4],
                getNick: function() {
                    var rv = cookieVal[4];
                    if (null == rv || 'undefined' == rv) {
                        rv = cookieVal[4];
                    }
                    return rv;
                }
            };
            if (idrunanumber.length % 2 != 0) { //controllo pari/dispari
                idrunanumber2 = '0' + idrunanumber;
            } else {
                idrunanumber2 = idrunanumber;
            }
            idrunanumbersplit = idrunanumber2.match(/../g).join('/');
        }

        controlltoken("checkUserDefault");

    } else {
        // caricamento json multibar not-logged
        $("#multibar #multibar-default").show();
        getMultibarNotLogged();
    }

}

//sezione ribbon
function cleaneRibbonArrayElement(arrayName) {
    for (var i = 0; i < arrayName.length; i++) {
        if (isNaN(parseInt(arrayName[i].split("#")[0]))) {
            delete arrayName[i];
        }
    }
}

function sortRibbon(data_a, data_b) {
    var data_a_temp = parseInt(data_a.split("#")[0]);
    var data_b_temp = parseInt(data_b.split("#")[0]);
    return ((data_a_temp < data_b_temp) ? 1 : ((data_a_temp > data_b_temp) ? -1 : 0));

}

function ribbonHp() {
    var mostShare = new Array();
    var mostReply = new Array();

    $(".social-bar").each(function() {
        mostShare.push($(this).find(".show-share .total-count").text().replace(/ /g, '').replace(/\n/g, '') + "#" + $(this).find(".show-share").attr("rel"));
        mostReply.push($(this).find(".tot-reply").text().replace(/ /g, '').replace(/\n/g, '') + "#" + $(this).find(".show-share").attr("rel"));
    });

    cleaneRibbonArrayElement(mostShare);
    mostShare.sort(sortRibbon);
    var countMostShare = mostShare[0].split("#")[0];
    if (countMostShare != 0) {
        var uuidMostShare = mostShare[0].split("#")[1];
        var elemMostShare = $(".show-share[rel=" + uuidMostShare + "]").parents(".social-bar").prevAll(".homearticle-box:eq(0)");
        $(elemMostShare).append('<span id="hp-top-share">' + mostShare[0].split("#")[0] + '</span>');
    }

    cleaneRibbonArrayElement(mostReply);
    mostReply.sort(sortRibbon);
    var countMostReply = mostReply[0].split("#")[0];
    if (countMostReply != 0) {
        var uuidMostReply = mostReply[0].split("#")[1];
        var elemMostReply = $(".show-share[rel=" + uuidMostReply + "]").parents(".social-bar").prevAll(".homearticle-box:eq(0)");
        $(elemMostReply).append('<span id="hp-top-reply">' + mostReply[0].split("#")[0] + '</span>');
        if (countMostShare != 0 && (uuidMostShare == uuidMostReply)) {
            $("#hp-top-share").addClass("hp-top-share-conflict")
        }
    }

}

function setPathCommunity(articleidsplit, cachekiller) {
    var domainpath = hostCorriere + '/community-corriere/commenti/articoli/';
    commentArticlePathHead = domainpath + articleidsplit + '/final/comment-head.json' + cachekiller;
    commentArticlePathBody = domainpath + articleidsplit + '/final/comment-body.json' + cachekiller;
    commentMostRatedPathHead = domainpath + articleidsplit + '/most-rated/comment-head.json' + cachekiller;
    commentMostRatedPathBody = domainpath + articleidsplit + '/most-rated/comment-body.json' + cachekiller;
    commentVotingPath = domainpath + articleidsplit + '/voting/final/voting-list.json';
    //urlEmotional = '/community-corriere/emotional/articoli/'+articleidsplit+'/complete-results.json';
    urlBoxArgomenti = '/community-corriere/argomenti/articoli/' + articleidsplit + '/box-argomenti.html';

}


function setArticleInteraction() {
    // carica altri commenti 
    $(".load-more-contributi").live("click", function(event) {
        event.preventDefault();
        $(this).remove();
        bodysortBy = $(this).attr("rel");
        if (bodysortBy == "sort-by-date" && loadAll > 0) { // json già caricato perchè ho visualizzato un thread completo in overlay
            //$("#sort-by-date .contributo").removeClass("hide");
            $("#sort-by-date .hide").remove();
            getarticlebody(bodysortBy, commentVisibility);
        } else {
            getarticlebody(bodysortBy, commentVisibility);
            loadAll++;
        }

    })

    // sort 
    $('#box-contributi .orderby a').click(function(event) {
        event.preventDefault();
        $('#box-contributi .orderby a').removeClass("selected");
        var sorting = $(this).attr('rel');
        if (sorting == 'sort-by-date') {
            $(this).addClass("selected");
            $("#sort-by-vote").hide();
            $("#sort-by-date").show();
        } else if (sorting == 'sort-by-vote') {
            $(this).addClass("selected");
            $("#sort-by-date").hide();
            $("#sort-by-vote").show();
        }
    });

    $("#box-community-scrivi .submit").click(function(event) {
        if ($(".sendcomment").val() == "" || $(".sendcomment").val() == "Scrivi qui il tuo commento") {
            $(".error").html("Inserisci un commento");
            $(".error").css("visibility", "visible");
            $(".check_2").focus();
            return false;
        }
        $("#box-community-scrivi .submit").css("display", "none");
        $("#sendcomment .sendcomment").after('<input type="button" class="fake_submit" value="invia">'); //sostituisco "invia" vero con "invia"	finto per evitare che l'utente possa fare più volte submit		
        event.preventDefault();
        sendcomment();
        $(".error").html("");
    });

    $("#box-community-scrivi .sendcomment").click(function(event) {
        event.preventDefault();
        if (!getHoursRangeComment()) {
            getFancyboxRangehoursMessage();
        } else if (!checkLocalEnvironment()) {
            getTemplateMessage('/includes2007/ssi/boxes/community/popup/msglocalcomplete_registration.shtml?localCommunityRegistration=' + dataSetLocalCommunity[site_community]);
        }
    });

    $("#box-community-scrivi .sendcomment").keyup(function(event) {
        event.preventDefault();
        checkMaxNumberOfCharacters();
    });

    $(".view-reply a").live("click", function(event) {
        event.preventDefault();
        var clickElem = $(this).attr("rel");
        if (loadAll == 0 && justDownload != true) {
            getarticlebody('sort-by-date', "hide", "viewReply", clickElem);
            loadAll++;
        } else {
            createReplyContent(clickElem);
        }
    });


    $('#box-interessi .show-hide .expand').live("mouseover", function() {
        $("#box-interessi li:first").removeClass("first").show();
        $("#box-interessi li.more").slideDown(350, function() {
            $("#box-interessi .show-hide .expand").css("display", "none");
            $("#box-interessi .show-hide .collapse").css("display", "block");
        });
    });

    $('#box-interessi .show-hide .collapse').live("mouseover", function() {
        $("#box-interessi li.more").slideUp(350, function() {
            $("#box-interessi li:first").addClass("first");
            $("#box-interessi .show-hide .expand").css("display", "block");
            $("#box-interessi .show-hide .collapse").css("display", "none");
        });
    });

    $('#box-interessi .show-hide .expand, #box-interessi .show-hide .collapse').click(function() {
        return false;
    });

    var articleInteraction = true;

}

//test_video	
$(".expand").live("mouseover", function() {
    $("li.more").slideDown(350);
});

//mod per gestione video in articolo

var js_DescriptionAndTools_ = "#js_DescriptionAndTools_";

function getSocialVideo(videoId, playerId, linkVideo) {
    var idBoxVideo = js_DescriptionAndTools_ + playerId;
    var titleVideo = '';

    if ($(js_DescriptionAndTools_ + playerId).parents('.box_Player_620').length) {
        titleVideo = '#js_Title620_' + playerId + ' .tit_Title';
    } else if ($(js_DescriptionAndTools_ + playerId).parents('.box_Player_400').length) {
        titleVideo = '#js_Title400_' + playerId + ' .tit_Title';
    } else if ($(js_DescriptionAndTools_ + playerId).parents('.box_Player_300').length) {
        titleVideo = '#js_Title300_' + playerId + ' .tit_Title';
    }

    videoIdNorm = videoId.replace(/-/g, '');
    videoIdSplit = videoIdNorm.match(/../g).join('/');
    $.ajax({
        url: "/includes2007/ssi/boxes/community/social.html?uuid=" + videoId + "&uuidsplit=" + videoIdSplit,
        dataType: 'html',
        async: false,
        success: function(data) {
            // sostituire data-href con parametro linkVideo appena disponibile sulla piattaforma txt
            $(idBoxVideo + ' .ajax-social').html('<div class="social-bar" data-href="' + linkVideo + '">' + data + '</div>');
            $(idBoxVideo + ' .ajax-social .social-bar').append('<div class="title_art">' + $(titleVideo).html() + '</div>');
            $(idBoxVideo + ' .show-share').hoverIntent(configShare);
        }
    });


}


function isPlayerVideoElement(elem) {
    var result = "";
    if (elem != null) {
        var divMainVideo = $(elem).parents('div[id^="js_DescriptionAndTools_"]').length;
        if (divMainVideo && $('#' + $(elem).parents('div[id^="js_DescriptionAndTools_"]').attr('id') + ' #uuid_video').length) {
            result = $(elem).parents('div[id^="js_DescriptionAndTools_"]').attr('id');
            if (result.match(/^js_DescriptionAndTools_(\d+)$/i) == null) {
                result = "";
            }
        }
    }
    return result;
}

function getCommentArticleTotalCount(idsplit, playerId) {
    var domainpath = hostCorriere + '/community-corriere/commenti/articoli/';
    var commentMostRatedPathHeadVideo = domainpath + idsplit + '/most-rated/comment-head.json';
    $.ajax({
        url: commentMostRatedPathHeadVideo,
        dataType: 'json',
        success: function(data) {
            commentArticleTotalCountVideo = data.totalcount;
            //Aggiungo il count totale 

            $("#js_DescriptionAndTools_" + playerId + " #box-community-social .social .tot-reply").html(commentArticleTotalCountVideo);
        },
        error: function() {
            $("#js_DescriptionAndTools_" + playerId + "#box-contributi .title .tot-reply").html("0");
        }
    });
}

function loadCommunityVideo(videoId, playerId, linkVideo) {
    //console.log("Start video ingestion.Details: VideoID: "+videoId+" playerId: "+ playerId);
    /*if($(js_DescriptionAndTools_ +playerId).parents('.box_Player_300').length){
		videoId = '84336e44-dccf-11e2-98cd-c1e6834d0493';
	}*/
    var video_uuid_player_temp = "video_uuid_player_" + playerId;
    $(js_DescriptionAndTools_ + playerId).append('<div class=' + '"' + video_uuid_player_temp + '" id="uuid_video"></div>');
    $(js_DescriptionAndTools_ + playerId + ' #uuid_video').html(videoId).hide();

    var uuid_video = videoId.replace(/ /g, '');
    var videoIdReplace = uuid_video.replace(/-/g, '');
    //controllo pari/dispari
    if (videoIdReplace.length % 2 != 0) {
        videoIdReplace = '0' + videoIdReplace;
    }
    videoIdReplaceSplit = videoIdReplace.match(/../g).join('/');

    //add emotion	
    if ($(js_DescriptionAndTools_ + playerId).parents('.box_Player_300').length) {
        if ($("#js_DescriptionAndTools_" + playerId + " #box-community-social .social").length) {
            $("#js_DescriptionAndTools_" + playerId + "#box-community-social .emotion a .smile").removeClass().addClass('smile');
            getEmotional(videoIdReplaceSplit, 2);
            getCommentArticleTotalCount(videoIdReplaceSplit, playerId);
            $("#js_DescriptionAndTools_" + playerId + " #box-community-social .social .tot-reply").attr('href', linkVideo + '#box-community-scrivi');
            $("#js_DescriptionAndTools_" + playerId + " #box-community-social .emotion a").attr('href', linkVideo + '#box-emotional');

        }
    }

    //add social elements
    getSocialVideo(videoId, playerId, linkVideo);
    if ((document.cookie).indexOf('rcsLogin') != '-1') { //utente loggato
        var cookieVideo = $.cookie('rcsLogin');
        if (cookieVideo != null) {
            var cookieVal = cookieVideo.split('|');
            var idrunanumbervideo = cookieVal[1];

            if (idrunanumbervideo.length % 2 != 0) { //controllo pari/dispari
                var idrunanumber2video = '0' + idrunanumbervideo;
            } else {
                idrunanumber2video = idrunanumbervideo;
            }
            idrunanumbersplit = idrunanumber2video.match(/../g).join('/');

            var urlMultibarLoggedVideo = hostCorriere + '/community-corriere/utenti/' + idrunanumbersplit + '/' + idrunanumbervideo + '.json';
            $.getJSON(urlMultibarLoggedVideo, function(data) {
                // prevalorizzazione readinglist articolo	
                if ("articlesToRead" in data.multibar && "uuidList" in data.multibar.articlesToRead && data.multibar.articlesToRead.uuidList != null) {
                    $.each(data.multibar.articlesToRead.uuidList, function(nameObj, obj) {
                        if (obj == videoId) {
                            $("#js_DescriptionAndTools_" + playerId + " .reading-list").removeClass("off").addClass("on");
                            // parte la chiamata per segnarlo come letto nella readinglist
                            readBookmarkReadingList(obj);
                        }
                        //readingListVideo.push(obj);
                    });
                }
            });
        }
    }
}
//fine sezione video in articolo

function initArticolo() {
    uuid_articolo = $("#uuid_articolo").text().replace(/ /g, '');

    var articleid = uuid_articolo.replace(/-/g, '');

    if (articleid.length % 2 != 0) { //controllo pari/dispari
        articleid = '0' + articleid;
    }
    articleidsplit = articleid.match(/../g).join('/');
    //var cachekiller = '?' + (new Date()).getTime();
	var cachekiller = '';

    setPathCommunity(articleidsplit, cachekiller);

    getArticleHead('sort-by-date');
    getArticleHead('sort-by-vote');


    // emotional 
    getEmotional(articleidsplit, 1);

    if ($("#CTVPlayerPL #rcs-community-pl1").length > 0) {
        // box argomenti
        getBoxArgomenti(articleid);
    }

    // firma
    //loadFirma();

}


$(document).ready(function() {

    loadMultiBar();

    $("#multibar #multibar-log li#mb-reading .mb-reading").click(function(event) {
        event.preventDefault();
        $.fancybox({
            helpers: {
                overlay: {
                    css: {
                        'background': 'rgba(0, 0, 0, 0.50)'
                    }
                }
            },
            'href': '/includes2007/ssi/boxes/iframe_fancy.shtml?url=' + hostCommunity + '/community/widget/export/bookmarkExport.action&width=910&height=410',
            'padding': 0,
            'type': 'ajax'
        });

    })

    if ($('#container-box-firma').length > 0) {
        $('#container-box-firma').cycle({
            fx: 'fade',
            speed: 'fast',
            timeout: 0,
            next: '#widget-firma .next',
            prev: '#widget-firma .prev'
        });

    }


    // patch
    if ($("#homepage-corriere").length > 0) {
        ribbonHp()
    }

    if ($("#home-cinema-tv").length > 0) {
        $('.cin_desc_cont').live("mouseover", function() {
            $('.cin_desc_cont .show-share').hoverIntent(configShare);
        });
    }

    //controllo se sono dentro ad un articolo/foto con dilatua
    if ($("#uuid_articolo").length > 0) {
        initArticolo();
        setArticleInteraction();
    }

    // widget firme homepage
    if ($("#homepage-corriere #widget-firma").length > 0) {
        widgetFirma();
    }

    // gestione azioni
    $("#box-contributi .contributo .info .avatar," +
        ".fancy-th .contributo .info .avatar," +
        "#box-community-scrivi form#sendcomment textarea," +
        "#box-emotional ul li a," +
        "#box-community-social .reading-list," + // articolo 2col
        "#box-community-firma .reading-list," + // articolo firma
        "#homepage-corriere .social-bar .reading-list," + //hp
        "#home .social-bar .reading-list," +
        "#home-2col .reading-list," +
        "#tec-tecnologia-home .reading-list," + //hp tecnologia
        "#cucina .social-bar .reading-list," + //hp cucina
        "#home-motori .social-bar .reading-list," + //hp motori
        "#home-cinema-tv .social-bar .reading-list," + //hp cinema
        "#col-sx .articles-home .social-bar .reading-list," + //hpsez
        "#sez-home .social-bar .reading-list," + //home page vivimilano
        "#sez-ristoranti .social-bar .reading-list," + //home page vivimilano
        "#sez-locali .social-bar .reading-list," + //home page vivimilano
        "#sez-cinema .social-bar .reading-list," + //home page vivimilano
        "#sez-concerti .social-bar .reading-list," + //home page vivimilano
        "#sez-concerti-classica .social-bar .reading-list," + //home page vivimilano
        "#sez-teatro .social-bar .reading-list," + //home page vivimilano
        "#sez-arte-cultura .social-bar .reading-list," + //home page vivimilano
        "#sez-bambini .social-bar .reading-list," + //home page vivimilano
        "#sez-shopping .social-bar .reading-list," + //home page vivimilano
        "#sez-benessere-sport .social-bar .reading-list," + //home page vivimilano
        "#sez-feste-mercatini-fiere .social-bar .reading-list," + //home page vivimilano
        "#sez-weekend-fuori-porta .social-bar .reading-list," + //home page vivimilano
        "#box-interessi ul li a.add," +
        "#box-contributi .contributo .azioni li a.link-reply," +
        ".fancy-th .contributo .azioni li a.link-reply," +
        "#total-th a.link-reply-all," +
        "#box-contributi .contributo .azioni li a.link-rating," +
        ".fancy-th .contributo .azioni li a.link-rating," +
        "#box-firma a.add-user," +
        "#widget-firma a.add-user"
    ).live("click", function(event) {
        event.preventDefault();
        if (userStatus == "unlogged") {

            lcom_AccediServizi();

        } else if (userStatus == "notEnabled") {

            lcom_CompletaReg();

        } else if (userStatus == "enabled") {

            if ($(this).hasClass("avatar")) { // lightbox user commenti

                lightboxUserExternal($(this).attr("rel").toString());

            } else if ($(this).hasClass("sendcomment")) { // sendcomment

                if ($("#box-community-scrivi form#sendcomment textarea").val() == $("#box-community-scrivi form#sendcomment textarea").attr("title")) {
                    $("#box-community-scrivi form#sendcomment textarea").val("");
                }

            } else if ($(this).hasClass("emotional")) { // emotional

                addEmotional($(this).attr("rel"));

            } else if ($(this).hasClass("reading-list")) { // readinglist

                checkReadingList($(this));

            } else if ($(this).hasClass("add")) { // tag

                checkTag($(this));

            } else if ($(this).hasClass("add-user")) { // aggiunta firma articolo e hp

                checkInterUser($(this));

            } else if ($(this).hasClass("link-reply")) { // risposta commento

                commentReply($(this));

            } else if ($(this).hasClass("link-reply-all")) { // risposta thread

                commentReplyAll();

            } else if ($(this).hasClass("link-rating")) { // vota commento

                commentid = $(this).parents(".contributo").attr("rev");
                addVote(commentid);

            }
        }
    });

    try {
        setLocalHostName();
    } catch (e) {
        console.log("Error setLocalHostName");
    }

});