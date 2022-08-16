var social_selected = null;
var social_selected_usr = "";
var context_domain = "";
var context_images = "images2.corriereobjects.it";
//var context_images = "";
var context_ssi = "/includes2007/ssi/";
var context_title = "Corriere.it";
var context_community = "/corcommunitynew/accesso/";
var chkReplaceUrl = 0;
var regexStringNum = /(?=.*\d)(?=.*[A-z])/;
var lcom_idRuna = null;
var VAR_REF_URL = "";
var VAR_STAG_URL = "";
var redirectUrl_global = "";
var redirectUrl_prof = 0;
var chk_checkUGC = true;
var chk_Nickname = "";
var chk_openCompleta = 0;
var chk_titleCompleta = 0;
var chkOpenModProf = 0;
var alreadyRcsUser = false;
var waitingToLoad = false;
var BotAccetto = false;
var BotConcludi = false;
var hoverClose = 0;
var modProfOpened = false;
var connectOK = false;
var captcha_errato = true;

//paywall only
var isPaywall = false,
	isDataError = [true,true,true];

var isRegisterUserNoFourthStep = (getQuerystringPar("nofourthstep") == "true");

if(document.domain == "corrieredibologna.corriere.it" || document.domain == "corrieredelveneto.corriere.it" || document.domain == "video.corriere.it" || document.domain == "video.corrierefiorentino.corriere.it" || document.domain == "video.corrieredelmezzogiorno.corriere.it"){
	var correireGetDevice = function(deviceHolder){
		corriereDevice = deviceHolder.text();
		loginLogger.debug(corriereDevice);
	}
}

//override per style, registrazione.viaggi, registrazione.living e academy
if(document.domain.indexOf("style.corriere.it") > -1 || document.domain.indexOf("registrazione.viaggi.corriere.it") > -1 || document.domain.indexOf("registrazione.living.corriere.it") > -1 || document.domain.indexOf("academy.corriere.it") > -1){
	var correireGetDevice = function(deviceHolder){
		corriereDevice = $("html").hasClass("mobile") ? "mobile" : "desktop";
		loginLogger.debug(corriereDevice);
	}
}

function setConnectOk(connectStatus){
	connectOK = connectStatus;
}

correireGetDevice($('div#device'));

if (typeof corriereDevice == "undefined")
	corriereDevice = "desktop";

function getCookieClient(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function deleteCookie(name, path, domain) {
    path = (path ? ";path=" + path : "");
    domain = (domain ? ";domain=" + domain : "");
    var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";

    document.cookie = name + "=" + path + domain + ";expires=" + expiration;
}

if(document.domain == "staging-passaparola.corriere.it") VAR_REF_URL = "http://staging-passaparola.corriere.it";
else if(document.domain == "passaparola.corriere.it") VAR_REF_URL = "http://passaparola.corriere.it";

if ((document.domain).indexOf("staging") > -1 || (document.domain).indexOf("anteprima") > -1 || (document.domain).indexOf("uat") > -1) VAR_STAG_URL = "staging-";

//CAPITALIZE STRNGHE
String.prototype.capitalize = function() {
    /*
    return this.replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
        return p1 + p2.toUpperCase();
    });
    */
};
//APERTURA NUOVA FINESTRA
function newWindowLcom(a_str_windowURL, a_str_windowName, a_int_windowWidth, a_int_windowHeight, a_bool_scrollbars, a_bool_resizable, a_bool_menubar, a_bool_toolbar, a_bool_addressbar, a_bool_statusbar, a_bool_fullscreen) {

	var int_windowLeft = (screen.width - a_int_windowWidth) / 2;
	var int_windowTop = (screen.height - a_int_windowHeight) / 2;
	var str_windowProperties = 'height=' + a_int_windowHeight + ',width=' + a_int_windowWidth + ',top=' + int_windowTop + ',left=' + int_windowLeft + ',scrollbars=' + a_bool_scrollbars + ',resizable=' + a_bool_resizable + ',menubar=' + a_bool_menubar + ',toolbar=' + a_bool_toolbar + ',location=' + a_bool_addressbar + ',statusbar=' + a_bool_statusbar + ',fullscreen=' + a_bool_fullscreen + '';
	var obj_window = window.open(a_str_windowURL, a_str_windowName, str_windowProperties)
	obj_window.creator=self;
	if (parseInt(navigator.appVersion) >= 4) {
		obj_window.window.focus();
	}
	obj_window.onclose = function(e){
		if(typeof lcomCloseNewWin === "function") lcomCloseNewWin(e);
	}
};
//CONTROLLO DATA DI NASCITA UTENTE
function checkAgeUser() {
	var dd = $("#lcom_pop input[name=DNgg]").val();
	var mm = $("#lcom_pop input[name=DNmm]").val();
	var yy = $("#lcom_pop input[name=DNaaaa]").val();
	var age = 18;
	if(dd != "" && mm != "" && yy !=""){
		var mydate = new Date();
		mydate.setFullYear(yy, mm-1, dd);

		var currdate = new Date();
		currdate.setFullYear(currdate.getFullYear() - age);
		if ((currdate - mydate) < 0){
			chk_val = false;
			chk_val_first = false;
			$("#lcom_pop .error_date").remove();
			$("#lcom_pop input[name=DNaaaa]").before('<em class="error error_date">*devi essere maggiorenne</em>');
		}
		else {}
	 }
}
//CATTURA VARIABILI INVIATE IN GET NELLA QUERYSTRING
function getQuerystringPar(key, default_)
{
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}
// FUNZIONE RICHIAMATA DALLA MULTIBAR.JS PER SETTARE IL NICKNAME DELL'UTENTE PRESO DAL JSON UTENTE
function setNickNameUser(nickName){
	if (checkUsrSubscription()){
		$("#user-name").html(nickName);
		$("#headBoxLogin .notlogged").css("display", "none");
		$("#headBoxLogin .logged").css("display", "inline");
	}
}
//OPEN POPUP
function openDisclaimer(url) {
   var w = 500;
  var h = 550;
   var l = Math.floor((screen.width-w)/2);
   var t = Math.floor((screen.height-h)/2);
      window.open('http://www.corriere.it/'+url,'','width=' + w + ',height=' + h + ',top=' + t + ',left=' + l +', scrollbars=yes');
}
//CONTROLLO SE UN COOKIE ESISTE
function checkCookieCor(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return true;
	}
	return false;
}
var hostAppIdMap = {
    "staging-restyling.corriere.it": "COR",
    "www.corriere.it": "COR",
    "corrieredelmezzogiorno.corriere.it": "CMCN",
    "corrieredelveneto.corriere.it": "CMCV",
    "corrieredibologna.corriere.it": "CMBL",
    "corrierefiorentino.corriere.it": "CMCF",
    "living.corriere.it": "CMAC",
    "catalogo.living.corriere.it": "CMAC",
    "cinema-tv.corriere.it": "COR",
    "video.corriere.it": "COR",
    "test-video.corriere.it": "COR",
    "staging-video.corrierefiorentino.corriere.it":"CMCF",
    "staging-video.corriere.it": "COR",
    "viaggi.corriere.it": "DOVE",
    "staging2-corriereinnovazione.corriere.it": "CIIT",
    "corriereinnovazione.corriere.it": "CIIT",
    "staging-en.corriereinnovazione.corriere.it": "CIEN",
    "en.corriereinnovazione.corriere.it": "CIEN",
    "registrazione.style.corriere.it": "STYL",
    "staging-registrazione.style.corriere.it": "STYL",
    "staging-style.corriere.it": "STYL",
    "style.corriere.it": "STYL",
    "registrazione.viaggi.corriere.it": "DOVE",
    "registrazione.living.corriere.it": "CMAC",
    "staging-registrazione.viaggi.corriere.it": "DOVE",
    "staging-registrazione.living.corriere.it": "CMAC"
};
var customRegistrationHostAppMap = {
    "staging-blog.corriereinnovazione.corriere.it": {
        "regUrl": "http://anteprima.corriere.it/blog/?rcsconnect=5",
        "editProfileUrl": "http://anteprima.corriere.it/blog/?rcsconnect=4",
        "loginUrl": "http://anteprima.corriere.it/blog/?rcsconnect=1"
    },
    "blog.corriereinnovazione.corriere.it": {
        "regUrl": "http://www.corriere.it/blog/?rcsconnect=5",
        "editProfileUrl": "http://www.corriere.it/blog/?rcsconnect=4",
        "loginUrl": "http://www.corriere.it/blog/?rcsconnect=1"
    },
    "staging-video.corriere.it": {
        "regUrl": "http://staging-restyling.corriere.it/?rcsconnect=5",
        "editProfileUrl": "http://staging-restyling.corriere.it/?rcsconnect=4",
        "loginUrl": "http://staging-restyling.corriere.it/?rcsconnect=1"
    },
    "prod-video.corriere.it": {
        "regUrl": "http://www.corriere.it/anteprima/salute/?rcsconnect=5",
        "editProfileUrl": "http://www.corriere.it/anteprima/salute/?rcsconnect=4",
        "loginUrl": "http://www.corriere.it/anteprima/salute/?rcsconnect=1"
    },
    "video.corriere.it": {
        "regUrl": "http://www.corriere.it/?rcsconnect=5",
        "editProfileUrl": "http://www.corriere.it/?rcsconnect=4",
        "loginUrl": "http://www.corriere.it/?rcsconnect=1",
        "logoutUrl": "http://www.corriere.it/?logout=true"
    },
    "test-video.corriere.it": {
        "regUrl": "http://www.corriere.it/?rcsconnect=5",
        "editProfileUrl": "http://www.corriere.it/?rcsconnect=4",
        "loginUrl": "http://www.corriere.it/?rcsconnect=1",
        "logoutUrl": "http://www.corriere.it/?logout=true"
    },
    "staging-style.corriere.it": {
        "regUrl": "http://staging-registrazione.style.corriere.it/index.shtml?rcsconnect=5",
        "editProfileUrl": "http://staging-registrazione.style.corriere.it/index.shtml?rcsconnect=4",
        "loginUrl": "http://staging-registrazione.style.corriere.it/index.shtml?rcsconnect=1"
    },
    "style.corriere.it": {
        "regUrl": "http://registrazione.style.corriere.it/index.shtml?rcsconnect=5",
        "editProfileUrl": "http://registrazione.style.corriere.it/index.shtml?rcsconnect=4",
        "loginUrl": "http://registrazione.style.corriere.it/index.shtml?rcsconnect=1"
    },
    "blog-corriere": {
        "regUrl": "http://www.corriere.it/?rcsconnect=5",
        "editProfileUrl": "http://www.corriere.it/?rcsconnect=4",
        "loginUrl": "http://www.corriere.it/?rcsconnect=1",
        "logoutUrl": "http://www.corriere.it/?logout=true"
    },
    "blog-corriere-stag": {
        "regUrl": "http://anteprima.corriere.it/?rcsconnect=5",
        "editProfileUrl": "http://anteprima.corriere.it/?rcsconnect=4",
        "loginUrl": "http://anteprima.corriere.it/?rcsconnect=1"
    },
    "passaparola-moderatori.corriere.it": {
        "regUrl": "http://www.corriere.it/?rcsconnect=5",
        "editProfileUrl": "http://www.corriere.it/?rcsconnect=4",
        "loginUrl": "http://www.corriere.it/?rcsconnect=1"
    },
    "video.corrierefiorentino.corriere.it":{
        "regUrl":"http://corrierefiorentino.corriere.it/firenze/?rcsconnect=5",
        "editProfileUrl":"http://corrierefiorentino.corriere.it/firenze/?rcsconnect=4",
        "loginUrl":"http://corrierefiorentino.corriere.it/firenze/?rcsconnect=1",
        "logoutUrl": "http://corrierefiorentino.corriere.it/firenze/?logout=true"
    },
    "video.corrieredelmezzogiorno.corriere.it":{
        "regUrl":"http://corrieredelmezzogiorno.corriere.it/napoli/?rcsconnect=5",
        "editProfileUrl":"http://corrieredelmezzogiorno.corriere.it/napoli/?rcsconnect=4",
        "loginUrl":"http://corrieredelmezzogiorno.corriere.it/napoli/?rcsconnect=1",
        "logoutUrl": "http://corrieredelmezzogiorno.corriere.it/napoli/?logout=true"
    },
    "staging-video.corrierefiorentino.corriere.it":{
        "regUrl":"http://anteprima-corrierefiorentino.corriere.it/firenze/?rcsconnect=5",
        "editProfileUrl":"http://anteprima-corrierefiorentino.corriere.it/firenze/?rcsconnect=4",
        "loginUrl":"http://anteprima-corrierefiorentino.corriere.it/firenze/?rcsconnect=1"
    },
    "passaparola.corriere.it": {
        "regUrl": "http://www.corriere.it/?rcsconnect=5",
        "editProfileUrl": "http://www.corriere.it/?rcsconnect=4",
        "loginUrl": "http://www.corriere.it/?rcsconnect=1"
    },
    "viaggi.corriere.it": {
        "regUrl": "http://registrazione.viaggi.corriere.it/?rcsconnect=5",
        "editProfileUrl": "http://registrazione.viaggi.corriere.it/?rcsconnect=4",
        "loginUrl": "http://registrazione.viaggi.corriere.it/?rcsconnect=1"
    }
};

var LOGIN_COM_URL_TYPE = {
    "REG_URL": "regUrl",
    "EDIT_PROFILE_URL": "editProfileUrl",
    "LOGIN_URL": "loginUrl",
    "LOGOUT_URL":"logoutUrl"
};

function getCurrentAppId(){
	if (location.hostname in hostAppIdMap)
		return hostAppIdMap[location.hostname];
	else
		return "COR";
}

function addContentPathToUrl() {
    return "contentPath=" + location.href;
}

function checkCustomLoginComUrl(urlType) {
    var key = (typeof customLogin == "undefined") ? location.hostname : customLogin;
    if (key in customRegistrationHostAppMap) {
        location.href = customRegistrationHostAppMap[key][urlType] + "&" + addContentPathToUrl();
        return true;
    }
    return false;
}

/*
	verifica se l'utente sottoscritto alla testata corrente leggendo l'elenco delle sottoscrizioni
	dal cookie e le mappature host > appId
*/
function checkUsrSubscription() {
	if (checkCookieCor("rcsSubscriptions")){
		var rcsSubscriptions = getCookieClient("rcsSubscriptions");
		var currentAppId = getCurrentAppId();
		var ca = rcsSubscriptions.split('|');
		for(var i=0;i < ca.length;i++) {
			var appId = ca[i];
			if (appId == currentAppId)
				return true;
		}
	}
	return false;
}


if( (window.location.hostname == "iltempodelledonne.corriere.it") || (window.location.href.indexOf("bello-italia") > -1) ) {
	var fitToViewVar = true;
}else{
	var fitToViewVar = false;
}

var fancyboxDeviceSpecific = {
    "mobile": {
        'padding': 0,
        'margin': 0,
        'fitToView' : fitToViewVar
    },
    "tablet": {
        'padding': 0,
        'margin': 0
    },
    "desktop": {
        'padding': 0,
        'margin': [50, 0, 10, 0]
    }
};


function setDeviceSpecificProperty(device, fancyboxOpt) {
    var prop = device || "desktop";
    $.each(fancyboxDeviceSpecific[prop], function(property, value) {
        fancyboxOpt[property] = value;
    });
    return fancyboxOpt;
}

//APERTURA POPUP OVERLAY CENTRALIZZATO
function openFBbox(url) {
    if (url == context_ssi + "boxes/community/login/login.shtml") {
        var add_var = "";
        if ($("#header_menu_meth .top_header_hp").length > 0) add_var = "?hp_log_fb";
        url = url + add_var;
    }
    redirectUrl_prof = 0;
    chk_Nickname = "";
    var fancyboxOpt = {
        'href': url,
        'type': 'ajax',
        'afterShow': function() {
            try{
                if ((document.URL).indexOf(".corriere.it/archivio-registrazione") > -1 || typeof isAMPPage !== 'undefined'){
                    $(".fancybox-overlay").off("click");
                }
            }catch(e){loginLogger.error(e);}

            $(".fancybox-opened .fancybox-close").on("mouseenter", function(ev) {
                if (ev.type == 'mouseenter') {
                    hoverClose = 1;
                }
            });

			//l'utente deve completare il profilo o registrarsi - la variabile e' settata nella funzione richiamata dalla multibar.js che controlla se l'utente non e' 'completo'
			if(chk_titleCompleta == 1) {
				if(alreadyRcsUser == true) {
					var h3Text = $("#lcom_pop h3:first").html().replace("Crea il tuo profilo","Completa la registrazione");
					$("#lcom_pop h3:first").html(h3Text);
					callOmnitureTracing('event2,event63','COR/Completa Registrazione/Step1','Corriere');
				} else {
					callOmnitureTracing('event2,event46','COR/Registrazione/Step1','Corriere');
				}
			}
			chk_titleCompleta = 0;
			$(".fancybox-skin").css("background-color","#fff");
			checkElementPopLcom();
			setFBoption();
			if (getQuerystringPar("fourthstep") != "false"){
				$("#lcom_pop #social_connect .accetto_btn").show();
			}
			url_ajax = $("#social_connect").attr("action");
			//controllo se bisogna ricaricare la pagina
			if(url == context_ssi+"boxes/community/login/modifica_prof_ok.shtml"){
				modProfOpened = true;
			}
			if(url == context_ssi+"boxes/community/login/modifica_prof_ok.shtml" && chk_checkUGC == false){
				redirectUrl_prof = 1;
			}
			chk_checkUGC = $("#lcom_pop .lcom_disclaimer li input[name=autUGC]").is(":checked");
			chk_Nickname = $("#lcom_pop input[name=nickname]").val();
			if($(".lcom_modifica_profilo").length > 0 && chk_openCompleta == 1 && (chk_checkUGC == false)){
				if(!$("#lcom_pop .lcom_disclaimer li input[name=autUGC]").is(":checked")){
					$("#lcom_pop input[name=autUGC]").parents("li:eq(0)").prepend('<em class="error_dyn error_autUGC">*campo obbligatorio</em>');
				}
				$('.fancybox-inner').animate({scrollTop: 980}, 400);
			}
			$("#lcom_pop #fb_form_cambia input[name=indirizzo]").parent().css("clear","both");
			$("#lcom_pop input[type=checkbox],#lcom_pop input[type=radio]").css("border","none");
			//patch per IE8 per l'inserimento dell'immagine sul button custom
			/*if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
			  $("#lcom_pop #lcom_avatar input").css("margin","100px");
			  $("#lcom_avatar .carica_foto").css("cursor","pointer");
			  $("#lcom_avatar .carica_foto").click(function(){
					$("#lcom_pop #lcom_avatar input").click();
				})
			}*/
			//simulo un click sulle tab del modifia profilo per portarmi sulle newsletter - ci arrivo dalle email se l'utente vuole modificare le newsletter
			if(chkOpenModProf == 1 && $("#fb_form_cambia").length > 0 && getQuerystringPar("newsletter",false)){
				$("#lcom_sel_newsletter").click();
			}
			if(typeof customreginiVal == "unamammaimperfetta"){
				$(".div_4").next().remove()
			}
		},
		'afterClose': function(){
			//se nell'url trovo rcsconnect=1 e la contentPath si verra' rediretti alla contentPath
			if((document.URL).indexOf("rcsconnect=1") > -1 && (document.URL).indexOf("contentPath") > -1 && connectOK){
				window.location.href = unescape(getQuerystringPar("contentPath"));
			}else if((document.URL).indexOf("rcsconnect=4") > -1 && (document.URL).indexOf("contentPath") > -1 && modProfOpened){
				window.location.href = unescape(getQuerystringPar("contentPath"));
			}else if(((document.URL).indexOf("rcsconnect=5") > -1 || (document.URL).indexOf("rcsconnect=1") > -1 || (document.URL).indexOf("rcsconnect=2") > -1 || (document.URL).indexOf("rcsconnect=4") > -1 || (document.URL).indexOf("rcsconnect=6") > -1 || (document.URL).indexOf("rcsconnect=7") > -1) && (document.URL).indexOf("contentPath") > -1 && hoverClose == 1){
				window.location.href = unescape(getQuerystringPar("contentPath"));
			} else if((document.URL).indexOf("rcsconnect=6") >  -1 && (document.URL).indexOf("contentPath") > -1 && connectOK) {
				window.location.href = unescape(getQuerystringPar("contentPath"));
			}
			hoverClose = 0;
			//variabile settata in lcom_registrazioneOK() - redirectUrl_global mi dice dove fare il redirect dopo la registrazione - si torna alla pagina che si stava leggendo
			if(redirectUrl_global != "") window.location.href = redirectUrl_global;
			//fa il refresh della pagina
			if(redirectUrl_prof == 1) window.location.reload(true);
		}
	};
    try{
        if ((document.URL).indexOf(".corriere.it/archivio-registrazione") > -1){
            fancyboxOpt.enableEscapeButton = false;    
        }
    }catch(e){loginLogger.error(e);}

	$.fancybox(setDeviceSpecificProperty(corriereDevice, fancyboxOpt));
}
//apre la registrazione
function openRegfromPop(isFullRegistration, noptin){
	social_selected = null;
	chk_titleCompleta = 1;
	var doc_uri_var = encodeURIComponent(document.URL);
	if(((document.URL).indexOf("rcsconnect=5") > -1 || (document.URL).indexOf("rcsconnect=2") > -1 || (document.URL).indexOf("rcsconnect=7") > -1) && (document.URL).indexOf("contentPath") > -1){
		doc_uri_var = getQuerystringPar("contentPath");
	}
	hoverClose = 0;
	isPaywall = false;
	if(isFullRegistration=='paywall'){
		isPaywall = true;
		openFBbox(context_domain+context_community+"RegistrazioneSkinpaywall.do?openreg=false"+(isRegisterUserNoFourthStep?"&nofourthstep=true":"")+"&contentPath="+doc_uri_var);
	} else if(isFullRegistration=='corlight'){
		if((document.URL).indexOf("notifiche") > -1) {
			doc_uri_var = "https://" + VAR_STAG_URL + "notifiche.corriere.it/";
		}
		openFBbox(context_domain+context_community+"RegistrazioneSkincorlight.do?openreg=false"+(isRegisterUserNoFourthStep?"&nofourthstep=true":"")+(isFullRegistration?"&fullregistration=true":"")+"&contentPath="+doc_uri_var);
	} else if(isFullRegistration=='futuraNL') {
		openFBbox(context_domain+context_community+"RegistrazioneSkincorlight.do?openreg=false"+(isRegisterUserNoFourthStep?"&nofourthstep=true":"")+(isFullRegistration?"&fullregistration=true":"")+"&contentPath="+doc_uri_var+encodeURIComponent("?futuraNL=true"));
	} else {
		openFBbox(context_domain+context_community+"RegistrazioneSkinoverlay.do?openreg=false"+(isRegisterUserNoFourthStep?"&nofourthstep=true":"")+(isFullRegistration?"&fullregistration=true":"")+"&contentPath="+doc_uri_var);
	}

	if(typeof noptin !=="undefined" && noptin=="true"){
		setTimeout(function(){
			$("[name=withoutOptin]").attr("value","true");
		}, 2000);
	}
}
//popup di avvenuta modifica dati
function openModRegfromPop(){
	openFBbox(context_ssi+"boxes/community/login/modifica_prof_ok.shtml");
	sendDataComm();//1-Modifica profilo effettuata, submit nickname e avatar
}
//chk email
function validateEmail(elementValue){
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(elementValue);
}
//carica il captcha
function showRecaptcha() {
	$.getScript("http://www.google.com/recaptcha/api/js/recaptcha_ajax.js",function(){
		Recaptcha.create("6Ler5c0SAAAAAHYmj8petY4luLyPG6eqyqg32qKP", 'captchadiv', {
			tabindex: 1,
			theme: "custom",
			callback: Recaptcha.focus_response_field
		});
	})
}
//apre la pagina di accesso - Login - Registrazione
function accediLinkPop(){
	if (checkCustomLoginComUrl(LOGIN_COM_URL_TYPE.REG_URL))
		return false;
	alreadyRcsUser = false;
	waitingToLoad = false;
	BotAccetto = false;
	BotConcludi = false;

	callOmnitureTracing('event2','COR/Accesso Network Corriere.it','Corriere');
	social_selected = null;
	openFBbox(context_ssi+"boxes/community/login/accedi.shtml?"+corriereDevice);
}
//catturo gli elmenti per aprire la popup della login
$(document).on('click', '#lcom_pop .lcom_accedi,#lcom_pop .lcom_btn_login', function(event){
	event.preventDefault();
	lcom_LoginCom();
});
$(document).on('click', '#lcom_pop .lcom_accedi_paywall', function(event){
	event.preventDefault();
	lcom_LoginCom('paywall');
});

// FUTURA
$(document).on('click', '#lcom_pop.modalFutura .lcom_btn_reg', function(event) {
	openRegfromPop("futuraNL");
});

//catturo gli elmenti per aprire la popup di Accesso
$(document).on('click', '#headBoxLogin a.headLogin,#lcom_pop .lcom_btn_reg', function(event){
	event.preventDefault();
	accediLinkPop();
});
//catturo gli elmenti per aprire la popup di Registrazione
$(document).on('click', '#lcom_pop .lcom_tuamail', function(event){
	event.preventDefault();
	openRegfromPop(true);
});
//catturo gli elmenti per aprire la popup di Registrazione Light
$(document).on('click', '.lcom_corlight h3 a', function(event){
	event.preventDefault();
	if(window.location.hostname == "iltempodelledonne.corriere.it") {
		openRegfromPop("corlight","true");
	} else {
		openRegfromPop("corlight");
	}
});
//chiudo le popup
$(document).on('click', '#lcom_pop .lcom_btn_annulla', function(event){
	event.preventDefault();
	$.fancybox.close();
});
/*$("#lcom_pop .lcom_btn_completa").on("click",function(event){
	event.preventDefault();
	openFBbox(context_ssi+"boxes/community/login/completa.shtml");
})*/
var lcom_refresh_active = 0;
//funzione richiamata dalla closeRefresh - serve per richiamare callOmnitureTracing
function callBackCloseRefresh(usertype){

    if(window.location.href.indexOf("italia-digitale") > -1) {

        if (usertype && usertype.indexOf("###") == -1) {

            if (usertype == 'social-reg') {
                //  fine registrazione social
                callOmnitureTracingBDI('event48,event3', 'COR/Registrazione/Step3');
            }
            //  login tramite social
            var socialOmniture = (social_selected_usr === "google") ? "googleplus" : social_selected_usr;
            callOmnitureTracingBDI('event7', 'COR/login',socialOmniture);
        } else {
            callOmnitureTracingBDI('event7', 'COR/login', 'Corriere');
        }

    }else{

        if (usertype && usertype.indexOf("###") == -1) {

            if (usertype == 'social-reg') {
                //	fine registrazione social
                callOmnitureTracing('event48,event3', 'COR/Registrazione/Step3');
            }
            //	login tramite social
    		var socialOmniture = (social_selected_usr === "google") ? "googleplus" : social_selected_usr;
            callOmnitureTracing('event7', 'COR/login',socialOmniture);
        } else {
            callOmnitureTracing('event7', 'COR/login', 'Corriere');
        }

    }
}

//funzione richiamata per refreshare la pagina
var temp_data_user_txt = "";

function closeRefresh(usertype,connect_silent){
	lcom_refresh_active = 1;
	//se si tratta di una registrazione tramite SOCIAL l'utente verra' loggato immeiatamente senza attende l'email di conferma
	//la pagina quindi dovra' essere refreshata - il nickname viene inviato via ajax al servizio della community
	if((usertype != null && usertype.indexOf("###") > -1) || (connect_silent != null && connect_silent.indexOf("###") > -1)){
		var temp_data_user_txt = connect_silent;
		if(usertype != null && usertype.indexOf("###") > -1) temp_data_user_txt = usertype;
		temp_data_user = temp_data_user_txt.split("###");
//		$("#sendDataComm").remove();
//		$("body").append('<form enctype="multipart/form-data" name="sendDataComm" method="post" action="http://'+VAR_STAG_URL+'passaparola.corriere.it/community/json/updateUserData.action" id="sendDataComm"></form>');
//		$("#sendDataComm").append('<input type="text" value="'+temp_data_user[1]+'" name="nome">');
//		$("#sendDataComm").append('<input type="text" value="'+temp_data_user[2]+'" name="cognome">');
//		$("#sendDataComm").append('<input type="text" value="'+temp_data_user[0]+'" name="nickname">');
//		$("#sendDataComm").append('<input type="text" value="true" name="notificationSectionDisabled">');
//		$("#sendDataComm").append('<textarea id="lcom_descrizione" name="signature"></textarea>');
//		$("#sendDataComm").append('<input type="file" value="" id="lcom_avatar_img" name="avatarImage">');
//		$("#sendDataComm").append('<input type="text" name="applicationId" value="COR" />');
//		$('#sendDataComm').ajaxForm({
//			iframe: true,
//			type: 'POST',
//			success: function(){
//				callBackCloseRefresh(usertype);
//			},
//			error: function(){
//				callBackCloseRefresh(usertype);
//			}
//		});
//		$("#sendDataComm").submit();
		setTimeout(function(){callBackCloseRefresh(usertype);},4000)
	}else{
		callBackCloseRefresh(usertype);
	}
}
//funzione chiamata al BIND con un SOCIAL
function closeConnect(usertype,contest){
	//var lcom_idRuna = ($.cookie("rcsLogin")).split("|")[1];
	//sendDataComm(lcom_idRuna);
	$.fancybox({
		helpers: {
			overlay: {
				css: {
					'background': 'rgba(0, 0, 0, 0.50)'
				}
			}
		},
		'padding': 0,
		'href': context_ssi+"boxes/community/login/connected.shtml?name_social="+social_selected_usr+"&contest="+contest,
		'type': 'ajax',
		'afterShow': function(){
			$(".fancybox-skin").css("background-color","#E5EDE6");
			deleteCookie("rcsUpdateProfileTamTamy","/",".corriere.it");
            var lcom_idRuna = ($.cookie("rcsLogin")).split("|")[1];
        	sendDataComm(lcom_idRuna);
		},
		'afterClose': function(){
			closeRefresh("social-reg",usertype);
		}
	})
}
//funzione chiamata dopo la connessione silente per aggiornare la multibar
function silentFBconnect(){
	//checkCookieRCSlogin();
	loadMultiBar();
	callOmnitureTracing('event7','COR/login');
}

function checkSubmitLog(e) {
    if (e && e.keyCode == 13) {
        document.forms[0].submit();
    }
}

/**
** Invoke Omniture for page event tracing asynchronously
**/
function callOmnitureTracing(eventCode,pageName,eVar68){
	try{
		if(eventCode == "event6"){
			s.events=eventCode;
			s.eVar5= 'clickTopProfile';
			s.pageURL=document.location.href+"&refresh_ce-awe";
			s.channel="Accesso Corriere.it";
			void(s.t());
		} else if(eventCode == "event7") {
			s.loginOk(eVar68);
		} else {
			s.events=eventCode;
			s.pageName = pageName;
			s.eVar68= eVar68 || social_selected.capitalize();
			s.pageURL=document.location.href+"&refresh_ce-awe";
			s.channel="Accesso Corriere.it";
			void(s.t());
		}
	}catch(e){
		try{
			s.events=eventCode;
			s.pageName = pageName;
			s.pageURL=document.location.href+"&refresh_ce-awe";
			s.channel="Accesso Corriere.it";
			void(s.t());
		}catch(e){

		}
	}
	if(lcom_refresh_active == 1){
		if($("#lcom_pop h3.lcom_modprof_user").length > 0){
			lcom_ModificaProf();
		}else{
			setTimeout(function() {
				if(((document.URL).indexOf("rcsconnect=1") > -1 || (document.URL).indexOf("rcsconnect=7") > -1) && (document.URL).indexOf("contentPath") > -1){
					window.location.href = unescape(getQuerystringPar("contentPath"));
				} else if ((document.URL).indexOf("rcsconnect=5") > -1 && (document.URL).indexOf("contentPath") > -1){
					window.location.href = unescape(getQuerystringPar("contentPath"));
				} else if ((document.URL).indexOf("rcsconnect=6") > -1 && (document.URL).indexOf("contentPath") > -1){
					window.location.href = unescape(getQuerystringPar("contentPath"));
				} else if((document.URL).indexOf("notifiche") > -1) {
					window.location.href = "https://" + VAR_STAG_URL + "notifiche.corriere.it/";
				} else if (typeof paywall !== "undefined" && typeof paywall.data !== "undefined" && typeof paywall.data.origin !== "undefined" && (document.URL).indexOf("_preview") > -1){
					window.location.href = paywall.data.origin;
				} else if((document.URL).indexOf("skin=corlight") > -1) {
					window.location.href = window.location.href.replace("skin=corlight","");
				}

				else window.location.reload(true);
				lcom_refresh_active = 0;
						}, 3000);
		}
	}
}
$(document).on('click', '#headBoxLogin a.headRegistrazione,#popup_footer_privacy a.headRegistrazione', function(event){
	event.preventDefault();
	openFBbox(context_ssi+"boxes/community/login/login.shtml");
});
var usn_cor = checkCookieCor("rcsLogin");
var cookie_chk_lgn = getCookieClient("rcsLogin");
if(usn_cor && cookie_chk_lgn.indexOf('"') == -1){
	$.ajax({
		type: "POST",
		data: {contentPath: ""},
		cache: false,
		dataType: "html",
		url: "/corcommunitynew/accesso/LogOut.do",
		success: function(){checkCookieRCSlogin();},
		error: function(){checkCookieRCSlogin();}
	});
	usn_cor = false;
}
var open_over_var = 0;
var url_ajax = "";
var timeoutSocial = undefined;
var count_show_log = 0;

var usn_cor_chk = checkCookieCor("rcsLogin");
var usn_FB_cor = checkCookieCor("rcsFBConnected");
var usn_LINK_cor = checkCookieCor("rcsLNKINConnected");
var usn_TWEET_cor = checkCookieCor("rcsTWEETConnected");
var usn_GOOGLE_cor = checkCookieCor("rcsGOOGLConnected");
//funzione richiamata per loggarsi con la connessione silente
function show_login_status(network, status){
	if(count_show_log == 0){
		//social_selected = network;

		setTimeout(function() {
			if(checkCookieCor("rcsLogin") == false && $("#lcom_pop").length == 0){
				$("body").append("<iframe src='"+context_domain+context_community+network+"/redirect_overlay.jsp?contentPath="+VAR_REF_URL+context_ssi+"boxes/community/login/connect_ok_social_no_popup.shtml' width='1' height='1' scrolling='no' style='display:none'></iframe>");
			}
		}, 180000);

		count_show_log++;
	}
}
function chkLinkedInFN(){
	if(IN.User.isAuthorized()) show_login_status('linkedin', true);
}
//callback richiamata dal js di Facebook per la connessione silente
function connect_rcs_fb(response) {
	if (response.status == "unknown") {
	}else{
		if(open_over_var == 0 && usn_cor_chk == false && usn_FB_cor == true){
			show_login_status('facebook', true);
		}
	}
}
//funzione richiamata per preparare il form da inviare alla community
function clearFormExample(){
    $('#lcom_avatar_img').attr('disabled','disabled');
    loginLogger.debug('avatar choose DISABLED');
	prepareDataComm();
}
//funzione richiamata dopo la registrazione
function lcom_registrazioneOK(redirectUrl){
	if(redirectUrl != null) redirectUrl_global = redirectUrl;
	openFBbox(context_ssi+"boxes/community/login/verifica_ok.shtml");
}
//funzione richiamata dopo la registrazione
function lcom_registrazioneOKLight(redirectUrl){
	if(redirectUrl != null) redirectUrl_global = redirectUrl;

    if ( document.URL.indexOf("make-a-wish") >= 0 || document.URL.indexOf("lettere-d-amore") >= 0) {
       openFBbox(context_ssi+"boxes/community/login/verifica_ok_light_make-a-wish.shtml"); 
   } else {
        openFBbox(context_ssi+"boxes/community/login/verifica_ok_light.shtml"); 
   }
}
//funzione richiamata da tamtamy alla fine della registrazione social dopo il 4 step
function lcom_registrazioneOKSocial(social){
	$.fancybox({
		helpers: {
			overlay: {
				css: {
					'background': 'rgba(0, 0, 0, 0.50)'
				}
			}
		},
		'padding': 0,
		'href': context_ssi+"boxes/community/login/connected.shtml?name_social="+social,
		'type': 'ajax',
		'afterShow': function(){
			$(".fancybox-skin").css("background-color","#E5EDE6");
		}
	})
}

//funzione richiamata alla fine registrazione su corriere.it (step 3) che invia la form alla community passando allo step 4
function verificaRegOK(idRuna){
	$("#lcom_pop").html("<img src='"+context_images+""+context_ssi+"boxes/community/login/images/loading_big.gif' style='width:54px;height:55px;margin: 206px auto;' alt='wait' />");
	if(idRuna != null){
		sendDataComm(idRuna);
	}
	//openFBbox(context_ssi+"boxes/community/login/verifica_ok.shtml");
	callOmnitureTracing('event48','COR/Registrazione/Step4 Argomenti','Corriere');
}

//funzione uguale alla verificaRegOK ma che effettua la redirect su RUNA per loggarsi (parametro che arriva dal BE)
function verificaRegOKAndLogin(idRuna, redirectRuna){
	$("#lcom_pop").html("<img src='"+context_images+""+context_ssi+"boxes/community/login/images/loading_big2.gif' style='width:54px;height:55px;margin: 206px auto;' alt='wait' />");
	if(idRuna != null){
		sendDataComm(idRuna);
	}
	//openFBbox(context_ssi+"boxes/community/login/verifica_ok.shtml");
	callOmnitureTracing('event48','COR/Registrazione/Step4 Argomenti','Corriere');

	//redirect for runa
	$("body").append('<form name="runaRedirect" method="post" action="'+redirectRuna+'" id="runaRedirect"></form>');
		$('#runaRedirect').ajaxForm({
			iframe: true,
			type: 'POST',
			success: function(){
			}
		});
	$("#runaRedirect").submit();

}

//funzione richiamata alla fine dellea registrazione tramite SOCIAL
function verificaSubOK(idRuna){
	if(idRuna != null){
		sendDataComm(idRuna);
	}
	else openFBbox(context_ssi+"boxes/community/login/verifica_ok_nomail.shtml");

	setInterval(function(){
		//	cerca il cookie per capire quando e' completata la richiesta di updateUserData lato TamTamy
		//  dal momento che non e' possibile intercettarne la callback visto che e' un 302
		if (checkCookieCor("rcsUpdateProfileTamTamy") && checkCookieCor("communityLoginPersistence")){
			deleteCookie("rcsUpdateProfileTamTamy","/",".corriere.it");
			deleteCookie("rcsLogin","/",".corriere.it");
		}
	},
	1000);

	//callOmnitureTracing('event48','COR/Registrazione/Step2','Corriere');
	callOmnitureTracing('event48','COR/Registrazione/Step4 Argomenti','Corriere');
}

//funzione uguale alla verificaSubOK ma che fa la redirect su RUNA per loggarsi (parametro che arriva dal BE)
function verificaSubOKAndLogin(idRuna, redirectRuna){
	if(idRuna != null){
		sendDataComm(idRuna);
	}
	else openFBbox(context_ssi+"boxes/community/login/verifica_ok_nomail.shtml");

	setInterval(function(){
		//cerca il cookie per capire quando e' completata la richiesta di updateUserData lato TamTamy
		//dal momento che non e' possibile intercettarne la callback visto che e' un 302
		if (checkCookieCor("rcsUpdateProfileTamTamy") && checkCookieCor("communityLoginPersistence")){
			deleteCookie("rcsUpdateProfileTamTamy","/",".corriere.it");
			deleteCookie("rcsLogin","/",".corriere.it");
		}
	},
	1000);

	//callOmnitureTracing('event48','COR/Registrazione/Step2','Corriere');
	callOmnitureTracing('event48','COR/Registrazione/Step4 Argomenti','Corriere');

	$("body").append('<form name="runaRedirect" method="post" action="'+redirectRuna+'" id="runaRedirect"></form>');
		$('#runaRedirect').ajaxForm({
			iframe: true,
			type: 'POST',
			success: function(){
			}
		});
	$("#runaRedirect").submit();
}

//password idmenticata
function openPWDlost(paywallPwd){
	openFBbox(context_ssi+"boxes/community/login/password.shtml?contest="+paywallPwd+"");
}

function openModalEmail(){
	openFBbox(context_ssi+"boxes/community/login/cor_email.shtml");
}
//inserisce segnalazioni di errore durante la registrazione richiamata dalla callback lato applicativo
function callErrorFB(errorToShow){
	$("#registrazione-fb-err").remove();
	$("#loginFormBeanIframe").prepend('<div id="registrazione-fb-err"><h6>ATTENZIONE: </h6><p>'+errorToShow+'</p></div>');
}
//cancella il contenitore degli errori
function removeErrorFB(){
	$("#registrazione-fb-err").remove();
}
//inserisce segnalazioni di errore durante la registrazione SOCIAL richiamata dalla callback lato applicativo
function callErrorSocial(errorToShow){
	$("#registrazione-social-err").remove();
	$("#lcom_pop .container_socialn").prepend('<div id="registrazione-social-err"><h6>ATTENZIONE: </h6><p>'+errorToShow+'</p></div>');
}
//var lcom_action = "http://"+VAR_STAG_URL+"passaparola.corriere.it/community/network/registerUser.action";
//preparo il form da inviare alla community
var updateNickname = false;
function prepareDataComm(){
	if(typeof $( '#lcom_pop input[name=nickname]' ).val() === "undefined" ||  $( '#lcom_pop input[name=nickname]' ).val().length < 1 ){
		prefNickname = "";
	}
//	lcom_action = "http://"+VAR_STAG_URL+"passaparola.corriere.it/community/network/registerUser.action";

//	if(BotConcludi == true) {
//		lcom_action = "http://"+VAR_STAG_URL+"passaparola.corriere.it/community/network/registerUserNoFourthStep.action";
//	}
//	if($(".lcom_modifica_profilo").length > 0 || $('#social_connect').length > 0 || checkCookieCor("rcsUpdateProfileTamTamy")){
		//controllo del cookie
//		lcom_action = "http://"+VAR_STAG_URL+"passaparola.corriere.it/community/json/updateUserData.action";
//	}
//	$("#sendDataComm").remove();
//	$("body").append('<form enctype="multipart/form-data" name="sendDataComm" method="post" action="" id="sendDataComm"></form>');
//	if($("#lcom_pop input[name=nome]").length > 0){
//		$("#sendDataComm").append(encodeURI($("#lcom_pop input[name=nome]").clone().val($("#lcom_pop input[name=nome]").val())));
//	}
//	if($("#lcom_pop input[name=cognome]").length > 0){
//		$("#sendDataComm").append(encodeURI($("#lcom_pop input[name=cognome]").clone().val($("#lcom_pop input[name=cognome]").val())));
//	}

//	if($("#lcom_pop input[name=nickname]").length > 0 ){
//		var lcom_temp_nick = encodeURI($("#lcom_pop input[name=nickname]").val());
//		$("#sendDataComm").append('<input type="text" value="'+lcom_temp_nick+'" name="nickname">');
//	}

//	if($("#lcom_pop #lcom_descrizione").length > 0){
//		var lcom_temp_sign = encodeURI($("#lcom_pop #lcom_descrizione").val());
//		$("#sendDataComm").append('<textarea id="lcom_descrizione" name="signature">'+lcom_temp_sign+'</textarea>');
//	}

//	if(alreadyRcsUser == true){
//		$("#sendDataComm").append('<input type="text" value="true" name="alreadyRcsUser">');
//	}

//	$("#sendDataComm").append($("#lcom_pop #lcom_avatar_img"));
//	if($("#lcom_pop input[name=redirectUrl]").length > 0){
//		$("#sendDataComm").append($("#lcom_pop input[name=redirectUrl]").clone().val($("#lcom_pop input[name=redirectUrl]").val()));
//	}

//	$("#sendDataComm").append('<input type="text" name="applicationId" value="COR" />');
	//se siamo nel modifica profilo invio anche le notifiche
	if($(".lcom_modifica_profilo").length > 0){
//		if($("#lcom_pop .lcom_edizioni li input[name=corriere_newsletter]").length > 0){
//			var sel_chk = $("#lcom_pop .lcom_edizioni li input[name=corriere_newsletter]").is(":checked");
//			$("#sendDataComm").append('<input type="text" value="'+sel_chk+'" name="notifications.CORRIERE_NEWSLETTER">');
//		}
//		var lcomNotif = "";
//		$("#lcom_notifiche li").not(".first").each(function(){
//			var val_chk = $(this).find(".lcom_option_div input").attr("rel");
//			var sel_chk = "false";
//			if($(this).find(".lcom_option_div input").is(":checked")){
//				sel_chk = "true";
//			}
//			var sel_email_chk = "false";
//			if($(this).find(".lcom_not_email input").is(":checked")) sel_email_chk = "true";
//			lcomNotif += '<input type="text" name="notifications.'+val_chk+'" value="'+sel_chk+'">';
//			lcomNotif += '<input type="text" name="notifications.'+val_chk+'" value="'+sel_email_chk+'">';
//		})
//		$("#sendDataComm").append(lcomNotif);
		//se siamo nella modifica profilo l'invio del form alla community avviene in background via ajax e si rimane in corriere.it
//		$('#sendDataComm').ajaxForm({
//			iframe: true,
//			type: 'POST',
//			success: function(data){
//			}
//		});

			if($('#lcom_pop input[name=nickname]').attr("value") !== prefNickname) {
				updateNickname = true;
			}

			if($(".lcom_not_email input[name=cor_user_comment_notification_vote]").length > 0){
				var sel_email_chk1 = "false";
				var sel_email_chk2 = "false";
				if($(".lcom_not_email input[name=cor_user_comment_notification_vote]").is(":checked")) sel_email_chk1 = "true";
				if($(".lcom_not_email input[name=cor_user_comment_notification_response]").is(":checked")) sel_email_chk2 = "true";

				var preferencesComment = [
				{
					'preferenceKey' : 'cor_user_comment_notification_vote',
					'preferenceValue' : sel_email_chk1
				},
				{
					'preferenceKey' : 'cor_user_comment_notification_response',
					'preferenceValue' : sel_email_chk2
				}
				];
				setUserPreferences(idRuna, preferencesComment);
			}

			firstRegProcess = false;
			$('#fb_form_cambia').on('submit', function(event){
				event.preventDefault();
				loginLogger.debug($(this).serialize());
			});
			$('#fb_form_cambia').submit();
	}else{

		//Se NON sono in modifica profilo, di default dico a tamtamy di ignorare le notifiche - 07/01/2014
//		$("#sendDataComm").append('<input type="text" value="true" name="notificationSectionDisabled">');

//		if (checkCookieCor("rcsUpdateProfileTamTamy")){
//			$('#sendDataComm').ajaxForm({
//				iframe: true,
//				type: 'POST',
//				success: function(data){}
//			});
//		}
			if($('#fb_form_iscriviti').length > 0){
				firstRegProcess = true;
//				( new Image() ).src = '' + context_images + '' + context_ssi + '/boxes/community/login/images/loading_big.gif';
				//Metto captcha errato di default a false
				$('#fb_form_iscriviti').on('submit',function(event){
					event.preventDefault();
					//Se la mail non e' valorizzata, ad esempio in completa registrazione, la valorizzo
					if(typeof prefEmail === "undefined"){
						prefEmail = encodeURI($( '#lcom_pop input[name=utenza]').val()); 
					}
                    loginLogger.debug($(this).serialize());
                });
                $('#fb_form_iscriviti').submit();
			}

//			if(BotConcludi == true) {
//				//loginLogger.debug("CONCLUDI!");
//				$('#sendDataComm').ajaxForm({
//					iframe: true,
//					type: 'POST',
//					success: function(data){
//					}
//				});
//			}

		//per i SOCIAL l'invio del form e' via ajax in background
		if($('#social_connect').length > 0){
//			if(social_selected != null){
//				$("#sendDataComm").append('<input type="text" value="'+social_selected+'" name="social">');
//			}

//			$('#sendDataComm').ajaxForm({
//				iframe: true,
//				type: 'POST',
//				success: function(data){
//				}
//			});
//Submit registrazione social verso Community Corriere New
            firstRegProcess = true;
            if($('#lcom_pop input[name=email]').length > 0){
                prefEmail = encodeURI($('#lcom_pop input[name=email]').val());
                loginLogger.debug('social email read: ' + prefEmail);
            }
            $('#social_connect').on('submit',function(event){
                event.preventDefault();
                loginLogger.debug($(this).serialize());
            });
			$('#social_connect').submit();
		}
	}
}

//invio il form alla community via ajax o con il post classico a seconda di come e' stato settato nella funzione prepareDataComm()
//function sendDataComm(idRuna) {
//	lcom_idRuna = idRuna;
//	if(lcom_idRuna != null & lcom_idRuna != "") lcom_action = lcom_action + "?runaUserId=" + lcom_idRuna;
//	$("#sendDataComm").attr("action", lcom_action);
//	$("#sendDataComm").submit();
//}

function sendDataComm(idRuna){
	loginLogger.debug(idRuna);

    regSchedule();

    if(idRuna != undefined){
		// first registration process
		var preferencesArray = [
            {
                'preferenceKey' : 'cor_user_nickname_label_approved',
                'preferenceValue' : 'Lettore_' + idRuna
            },
            {
                'preferenceKey' : 'cor_user_nickname_label_moderating',
                'preferenceValue' : prefNickname
            },
            {
                'preferenceKey' : 'user_date_registration',
                'preferenceValue' : regServerTime
            },
            {
                'preferenceKey' : 'user_email',
                'preferenceValue' : prefEmail
            }
        ];
        setUserPreferences(idRuna, preferencesArray);
        if(mName != undefined){
            setTimeout(function(){
            	loginLogger.debug('TIMEOUT DONE!!!');
                setUserMedia(idRuna);
            }, 2000);
        }
        loginLogger.debug('SET U P by service ' + preferencesArray + idRuna + prefNickname);
    }else{
        //profile updating
        idRuna = cookieDomain.split('|')[1];
		//Chiamo la setPreferences solo se il nickname e' cambiato
        if(updateNickname) {
            var preferencesArray = [
                {
                    'preferenceKey' : 'cor_user_nickname_label_moderating',
                    'preferenceValue' : prefNickname
                }
            ];
            setUserPreferences(idRuna, preferencesArray);
        }

        if(mName != undefined){
            setUserMedia(idRuna);
        }
        loginLogger.debug('SET U P by cookie ' + preferencesArray + idRuna);
    }
}

//controllo e settaggi html caricato dall'applicazioni
function setFBoption(){
	try{
		$.fancybox.update();
		$.fancybox.reposition();
	}catch(e){}
	if(social_selected != null && social_selected != ""){
		callOmnitureTracing('event46','COR/Registrazione/Step1');
		social_selected_usr = social_selected;
		social_selected = null;
	}

//	if($("#lcom_pop .lcom_aiuto").length > 0){
//		$("#lcom_pop .lcom_aiuto").attr("href","mailto:passaparola@rcs.it");
//	}

	$("#lcom_pop .opacity_wait_05").removeClass("opacity_wait_05");
	waitingToLoad = false;
	$('#lcom_pop input[name=email]').keypress(function(event){
		if(event.keyCode == '13'){
			return false;
		}
	});
	//controllo correttezza e-mail
	$('#lcom_pop input[name=email]').keyup(function(event){
		if(event.keyCode == '13'){
			return false;
		}else if(!$(this).attr("readonly")){
			var hasError = false;
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var emailaddressVal = $(this).val();
			if(emailReg.test(emailaddressVal) && emailaddressVal != "" && $('#lcom_pop input[name=submitComplete]').length == 0) {
				clearTimeout(timeoutSocial);
				timeoutSocial = setTimeout(function() {
					$("#lcom_pop .error_dyn,#lcom_pop .error,#lcom_pop .lcom_avanti_social").remove();
					callFormSocialAjax();
				}, 1000);
			}else{
				clearTimeout(timeoutSocial);
				$("#lcom_pop #social_connect .clearSN img.waitBT").remove();
			}
		}
	});
	//controllo data
	if($("#lcom_pop input[name=DNaaaa]").length > 0){
		$("#lcom_pop input[name=DNgg],#lcom_pop input[name=DNmm]").attr("maxlength","2");
		$("#lcom_pop input[name=DNaaaa]").attr("maxlength","4");
		$("#lcom_pop input[name=DNgg],#lcom_pop input[name=DNmm],#lcom_pop input[name=DNaaaa]").keyup(function(){
		var string_input = $(this).val();
		$(this).val(string_input.match(/\d+/));
			if (isNaN(string_input)) {
				$("#lcom_pop .error_date").remove();
				$("#lcom_pop input[name=DNgg]").parent().before('<em class="error error_date">*Data non corretta</em>');
			}else{
				$("#lcom_pop .error_date").remove();
				checkAgeUser();
			}
		})
	}
	//controllo email da collegare al SOCIAL
	if($("#lcom_pop #social_connect input[name=password]").length > 0){
		$("#lcom_pop #social_connect .clearSN").append('<img alt="Ok" src="http://'+context_images+''+context_ssi+'boxes/community/login/images/ok.png" class="okBT">');
		$("#lcom_pop #social_connect .clearSN").append('<span class="lcom_email_ok okText">Ottimo! Con questa mail<br /> hai gi&agrave; un account '+context_title+'</span>');
	}else if($("#lcom_pop #social_connect input[name=nickname]").length > 0){
		$("#lcom_pop #social_connect .clearSN").append('<img alt="Ok" src="http://'+context_images+''+context_ssi+'boxes/community/login/images/ok.png" class="okBT">');
	}else if($("#lcom_pop #social_connect .link_social_bt").length > 0 && $("#lcom_pop #social_connect input[name=submitComplete]").length == 0){
		$("#lcom_pop #social_connect .clearSN").append('<img class="clearBT" src="http://'+context_images+''+context_ssi+'boxes/community/login/images/cancel.gif" alt="Cancella" />');
	}
	$("#lcom_pop input[type=text]").attr("autocomplete", "off");
	//if($("#fb_form_iscriviti").length == 0 || $("#fb_form_cambia").length == 0) $("#registrazione-fb-err").remove();

	if($("#lcom_pop .control_captcha").length >0) showRecaptcha();
	//se mi trovo nella registrazione il form viene inviato via ajax

	$('#fb_form_iscriviti').ajaxForm({
		target:'#lcom_pop',
		success:function(res, status, xhr, form){
			setFBoption();

            if(window.location.hostname == "iltempodelledonne.corriere.it" || 
                (window.location.href.indexOf("italia-digitale") > -1) ) {
                setExtraInput();
            }

			//Se l'utente ha clicccato concludi e non ha sbagliato il captcha apro la popup
			var checkLight = $(".lcom_corlight").length;

			if(BotConcludi == true && captcha_errato == false) {
				captcha_errato = true;
				if(alreadyRcsUser == true){
					if(checkLight!='0') {
						$.fancybox.close();
						closeRefresh();
					}else{
						lcom_RegOKNoOptin();
					}
				}else{
					if(checkLight!='0'){
						var valHiddenForm=form[0].withoutOptin.value;
						valHiddenForm!='false'?lcom_RegOKNoOptin("_light"): lcom_registrazioneOKLight();
					}else{
						lcom_registrazioneOK();
					}
				}
			}else{
				('html, body').animate({ scrollTop: 0 }, 0);
			}
		}
	});
	//se mi trovo nella modifica registrazione il form viene inviato via ajax
	$('#fb_form_cambia').ajaxForm({
		target:'#lcom_pop',
		success:function(){
			setFBoption();
			$('html, body').animate({scrollTop: 0}, 0);
		}
	});
	//al click per l'invio del form registrazione controllo la validita' dei campi
	$('#fb_form_iscriviti .concludi').click(function(event){
		BotAccetto = false;
		BotConcludi = true;

		event.preventDefault();
		if(!waitingToLoad) {
			waitingToLoad = true;
			$(this).addClass("opacity_wait_05");
			$("#lcom_pop .error_dyn,#lcom_pop .error").remove();
			if(chkValidForm()){
				clearFormExample();
			}
		}
	})

	$('#fb_form_iscriviti .corLightInvio').click(function(event){
		BotAccetto = false;
		BotConcludi = true;

		event.preventDefault();
		if(!waitingToLoad){
			waitingToLoad = true;
			$(this).addClass("opacity_wait_05");
			$("#lcom_pop .error_dyn,#lcom_pop .error").remove();
			if(chkValidFormLight()){
				clearFormExample();
			}
		}
	})

	$('#fb_form_iscriviti .accetto').click(function(event){
		BotConcludi = false;
		BotAccetto = true;

		event.preventDefault();
		if(!waitingToLoad){
			waitingToLoad = true;
			$(this).addClass("opacity_wait_05");
			$("#lcom_pop .error_dyn,#lcom_pop .error").remove();
			if(chkValidForm()){
				clearFormExample();
			}
		}
	})

	//al click per l'invio del form modifica registrazione controllo la validita' dei campi
	$('#fb_form_cambia .accetto').click(function(event){
		event.preventDefault();
		if(!waitingToLoad){
			waitingToLoad = true;
			$(this).addClass("opacity_wait_05");
			$("#lcom_pop .error_dyn,#lcom_pop .error").remove();
			if(chkValidForm()){
				clearFormExample();
			}
		}
	})

	$('#social_connect .rec_socialn_pwd').click(function(event){
		event.preventDefault();
		openPWDlost();
	})

	//rimuovo la segnalazione di errore se clicco nel campo segnalato da errore
	$("#lcom_pop input[name=nome]").click(function(){
		$("#lcom_pop .error_nome").remove();
	});
	$("#lcom_pop input[name=cognome]").click(function(){
		$("#lcom_pop .error_cognome").remove();
	});
	$("#lcom_pop select[name=provincia]").click(function(){
		$("#lcom_pop .error_provincia").remove();
	});
	$("#lcom_pop input[name=sesso]").click(function(){
		$("#lcom_pop .error_sesso").remove();
	});
	$("#lcom_pop input[name=autUGC]").click(function(){
		if($(this).is(":checked")) $("#lcom_pop .error_autUGC").remove();
		else $("input[name=autUGC]").parents("li:eq(0)").prepend('<em class="error_dyn error_autUGC">*campo obbligatorio</em>');
	});
	//controllo la validita' dei campi quando l'utente ha cliccato dentro al campo
	if($("#loginFormBean").length == 0){
		$("#lcom_pop input[type=text],#lcom_pop input[type=password]").blur(function(){
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var name_input = $(this).attr("name");
			var title_input = $(this).attr("title");
			var val_input = $(this).val();
			if(title_input == val_input) val_input = "";
			$("#lcom_pop .error_"+name_input).remove();
			if(name_input == "DNaaaa" || name_input == "DNmm" || name_input == "DNgg") {$("#lcom_pop .error_date").remove();}
			if(name_input == "DNgg" && val_input != ""){
				val_input = val_input/1;
				if(val_input  == 0 || val_input  > 31) {
					(isPaywall) ? isDataError[0] = false
					: $("#lcom_pop input[name=DNgg]").parent().prepend('<em class="error error_date">*giorno non corretto</em>');
				}else{
					(isPaywall) ? isDataError[0] = true : checkAgeUser();
				}
			} else if(name_input == "DNmm" && val_input != ""){
				val_input = val_input/1;
				if(val_input == 0 || val_input > 12) {
					(isPaywall) ? isDataError[1] = false
					: $("#lcom_pop input[name=DNgg]").parent().prepend('<em class="error error_date">*mese non corretto</em>');
				}else{
					(isPaywall) ? isDataError[1] = true : checkAgeUser();
				}
			} else if(name_input == "DNaaaa" && val_input != ""){
				val_input = val_input/1;
				if(val_input == 0 || val_input > server_yyyy || val_input < 1900) {
					(isPaywall) ? isDataError[2] = false
					: $("#lcom_pop input[name=DNgg]").parent().prepend('<em class="error error_date">*anno non corretto</em>');
				} else {
					(isPaywall) ? isDataError[2] = true : checkAgeUser();
				}
			}else if(name_input == "nickname" && val_input != ""){
				if(val_input.length < 3 || val_input.length > 30){
					$("#lcom_pop input[name=nickname]").parent().prepend('<em class="error error_nickname">*min 3 - max 30</em>');
				}else {//controllo se il nickname e' disponibile tramite il servizio di passaparola
					if(chk_Nickname != $("#lcom_pop input[name=nickname]").val()){
//						$.getJSON("http://"+VAR_STAG_URL+"passaparola.corriere.it/community/network/isNickNameAvailable.action?nickname="+encodeURI(val_input),function(data){
//							if(data[0] == "IN USE") $("#lcom_pop input[name=nickname]").parent().prepend('<em class="error error_nickname">*non disponibile</em>');
//						})
						isNicknameAvailable(encodeURI(val_input));
					}
				}
			}else if(name_input == "email" && val_input != ""){
				if(!emailReg.test(val_input)){
					$("#lcom_pop input[name=email]").parent().prepend('<em class="error error_email">*non corretto</em>');
				}
			}else if(name_input == "utenza" && val_input != ""){
				if(!emailReg.test(val_input)){
					$("#lcom_pop input[name=utenza]").parent().prepend('<em class="error error_utenza">*non corretto</em>');
				}
			}else if(name_input == "password" && val_input != ""){
				if($("#fb_form_iscriviti").length > 0 && alreadyRcsUser == false){
					if(val_input.length < 8){
						$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*min 8 caratteri</em>');
					}else if(!regexStringNum.test(val_input)){
						$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*almeno una lettera e un numero</em>');
					}
				}
				if($("#fb_form_cambia").length > 0){
					if(val_input.length > 0 && val_input.length < 8){
						$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*min 8 caratteri</em>');
					}else if(!regexStringNum.test(val_input) && val_input.length > 0){
						$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*almeno una lettera e un numero</em>');
					}
				}
			}else if(name_input == "confpwd" && val_input != ""){
				if($("#fb_form_iscriviti").length > 0){
					var val_password = $("#lcom_pop input[name=password]").val();
					if(val_password != "" && val_input != val_password){
						$("#lcom_pop input[name=confpwd]").parent().prepend('<em class="error error_confpwd">*non corrisponde</em>');
					}
				}
				if($("#fb_form_cambia").length > 0){
					var val_password = $("#lcom_pop input[name=password]").val();
					if(val_password != "" && val_input != val_password){
						$("#lcom_pop input[name=confpwd]").parent().prepend('<em class="error error_confpwd">*non corrisponde</em>');
					}
				}
			}

			//solo per il paywall - gestione errore data
			if(name_input == "DNaaaa" || name_input == "DNmm" || name_input == "DNgg"){
				(isDataError.indexOf(false) >= 0)
				? $("#lcom_pop input[name=DNgg]").parent().prepend('<em class="error error_date">* Controlla la tua data di nascita</em>')
				: checkAgeUser();
			}
		})
	}
	//se l'errore inserito dall'applicazione e' riferito al captcha mostro il terzo tab che contiene il captcha
	var $error = $("#registrazione-fb-err p");
	if ($error.length == 1 && $($error[0]).text().search("Codice di verifica") > -1){
		$("#lcom_pop .lcom_reg_2step, #lcom_pop .lcom_reg_1step").css("display","none");
		$("#lcom_pop .lcom_reg_3step").css("display","block");
		$("#registrazione-fb-err").insertAfter("#fb_disclaimer");
	}

	var tddDomain = "http://iltempodelledonne.corriere.it/2016/";

	if(window.location.href == tddDomain+"motoraduno/") {
		setTimeout(function(){ 
			$("[name=withoutOptin]").attr("value","true");
		}, 2000);
	}else if( document.URL.indexOf("make-a-wish") >= 0 || document.URL.indexOf("lettere-d-amore") >= 0 || document.URL.indexOf(tddDomain) >= 0 ) {
		setTimeout(function(){ 
			$("[name=withoutOptin]").attr("value","false");
		}, 2500);
	}
}

function openModalAuthTwLi(social){
	var url_call_aj = context_domain+context_community+"authenticate-"+social+".do?popup=true&contentPath="+VAR_REF_URL+context_ssi+"boxes/community/login/connect_ok_social.shtml";
	if(social.indexOf("twitter") != -1) {
		url_call_aj = context_domain+context_community+"authenticateNoMail-"+social+".do?popup=true&contentPath="+VAR_REF_URL+context_ssi+"boxes/community/login/connect_ok_social.shtml";
	}
	openFBbox(url_call_aj);
}
function closeWinOpenModal(data){
	setTimeout(function(){
		$.modal(data,{
			containerId: "fbConnectBox",
			onShow: function(dialog){
				setFBoption();
				dialog.container.css("height", "auto");
				$("#fbConnectBox .modalCloseImg").show();
				url_ajax = $("#social_connect").attr("action");
				if($("#ajax_container #fb_disclaimer").length > 0){
					$("#social_connect .box_socialn").after($("#ajax_container #fb_disclaimer"));
				}
			}
		});
	}, 500);
}
//probabile vecchia chiamata
function openModalCompleta(){
	$("#fbConnectBox").css("top","50px");
	$("#fbConnectBox h5").html('<h5 class="small">Connetti il tuo profilo <img src="http://'+context_images+''+context_ssi+'boxes/community/login/images/facebook.gif"  alt="Facebook" /> con '+context_title+'</h5>');
	$("#fbConnectBox iframe").height("435px");
}

var lcom_password_val = "";
//controllo email inserita per la connessione SOCIAL - controlla se email e password inserita sono gia' presenti in corriere.it
function callFormSocialAjax(){
	$("#lcom_pop #social_connect .clearSN").append('<img alt="" src="http://'+context_images+''+context_ssi+'boxes/community/login/images/lcom_loader.gif" class="waitBT">');
	$("#lcom_pop #social_connect .clearSN .okBT, #lcom_pop #social_connect .clearSN .okText, #lcom_pop #social_connect .clearSN .clearBT, #fb_disclaimer,#lcom_pop .container_socialn #registrazione-social-err,#registrazione-fb-err").remove();
	var email_val = $('#lcom_pop input[name=email]').val();
	$("#lcom_pop #ajax_container").html("");
	var temp_url_ajax = url_ajax;

	if(chkReplaceUrl == 1){
		temp_url_ajax = temp_url_ajax.replace("profiler","bind");
	}else {
		temp_url_ajax = url_ajax;
	}
	chkReplaceUrl = 0;
	$.ajax({
		type: 'POST',
		data: {email: email_val, password: lcom_password_val},
		url: temp_url_ajax,
		success: function(data){
			if($("#lcom_pop #social_connect input[name=submitComplete]").length > 0){
				$("#lcom_pop ").html(data);
			}else{
				$("#lcom_pop #ajax_container").html($(data).find("#ajax_container").html());
			}
			if($("#ajax_container #fb_disclaimer").length > 0){
				$("#social_connect .box_socialn").after($("#ajax_container #fb_disclaimer"));
			}
			if(getQuerystringPar("fourthstep") != "false"){
				$("#lcom_pop #social_connect .accetto_btn").show();
			}
			$("#lcom_pop #social_connect .clearSN img.waitBT").remove();
			$.fancybox.update();
			$.fancybox.reposition();
			setFBoption();
		}
	});
}
//html generato dall'applicazione ed inserito nella popup overlay
function getContentIframe(cont_html){
	$("#fb_disclaimer").remove();
	if($("#lcom_pop #social_connect input[name=submitComplete]").length > 0){
		$("#lcom_pop ").html(cont_html);
	}else {
		$("#lcom_pop #ajax_container").html(cont_html);
	}
	if($("#ajax_container #fb_disclaimer").length > 0){
		$("#social_connect .box_socialn").after($("#ajax_container #fb_disclaimer"));
	}
	$("#lcom_pop #social_connect .clearSN img.waitBT").remove();
	if($("#lcom_pop .container_socialn #registrazione-social-err").length > 0){
		$("#lcom_pop .container_socialn").prepend($("#lcom_pop .container_socialn #registrazione-social-err"));
	}
	setFBoption();
}
//invio dati SOCIAL
function callAjaxIframe(){
	var val_action = $("#lcom_pop #social_connect input[name=act_value]").val();
	var queryString = $("#lcom_pop #social_connect").formSerialize();
	$.ajax({
		type: "POST",
		url: val_action,
		data: queryString,
		success:function(data){
			$("#fb_disclaimer").remove();
			if($("#lcom_pop #social_connect input[name=submitComplete]").length > 0){
				$("#lcom_pop ").html(data);
			}else {
				$("#lcom_pop #ajax_container").html($(data).find("#ajax_container").html());
			}
			if($("#ajax_container #fb_disclaimer").length > 0){
				$("#social_connect .box_socialn").after($("#ajax_container #fb_disclaimer"));
			}
			$("#lcom_pop #social_connect .clearSN img.waitBT").remove();
			if($("#lcom_pop .container_socialn #registrazione-social-err").length > 0){
				$("#lcom_pop .container_socialn").prepend($("#lcom_pop .container_socialn #registrazione-social-err"));
			}
			setFBoption();
		}
	});
}
var chk_val_first = true;
var chk_val = true;
var chk_val_nick = true;
//controllo validita' dati form
function chkValidForm(){
	chk_val = true;
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	var emailaddressVal = $("#lcom_pop input[name=email]").val();
	var emailutenzaVal = $("#lcom_pop input[name=utenza]").val();
	chk_val_first = true;
	if($("#lcom_pop input[name=email]").length > 0 && (!emailReg.test(emailaddressVal) || emailaddressVal=="")){
		chk_val = false;
		chk_val_first = false;
		$("#lcom_pop input[name=email]").parent().prepend('<em class="error error_email">*formato email non corretto</em>');
	}
	if($("#lcom_pop input[name=utenza]").length > 0 && (!emailReg.test(emailutenzaVal) || emailutenzaVal=="")){
		chk_val = false;
		chk_val_first = false;
		$("#lcom_pop input[name=utenza]").parent().prepend('<em class="error error_utenza">*formato email non corretto</em>');
	}
	if($("#lcom_pop input[name=nickname]").length > 0){
		var val_chk = $("#lcom_pop input[name=nickname]").val();
		if(val_chk.length > 0 && (val_chk.length < 3 || val_chk.length > 30)) {
			chk_val = false;
			chk_val_first = false;
			$("#lcom_pop input[name=nickname]").parent().prepend('<em class="error error_nickname">*min 3-max 30</em>');
		}else {
			if(!chk_val_nick) {
				isNicknameAvailable(encodeURI(val_chk));
			}
//			if(chk_Nickname != $("#lcom_pop input[name=nickname]").val()){
//				$.getJSON("http://"+VAR_STAG_URL+"passaparola.corriere.it/community/network/isNickNameAvailable.action?nickname="+encodeURI(val_chk),function(data){
//					if(data[0] == "IN USE") {
//						$("#lcom_pop input[name=nickname]").parent().prepend('<em class="error error_nickname">*non disponibile</em>');
//						chk_val = false;
//						chk_val_first = false;
//					}
//				})
//			}
		}
	}
	if($("#lcom_pop input[name=DNgg]").length > 0){
		var val_chk_gg = $("#lcom_pop input[name=DNgg]").val();
		var val_chk_mm = $("#lcom_pop input[name=DNmm]").val();
		var val_chk_aaaa = $("#lcom_pop input[name=DNaaaa]").val();
		if(!(val_chk_gg > 0 && val_chk_gg <= 31) || !(val_chk_mm > 0 && val_chk_mm <= 12) || !(val_chk_aaaa > 1900)) {
			chk_val = false;
			chk_val_first = false;
			$("#lcom_pop .error_date").remove();
			var errorDataMessage = (isPaywall) ? "Controlla la tua data di nascita" : "Controlla la data";
			$("#lcom_pop input[name=DNgg]").parent().prepend('<em class="error error_date">*'+ errorDataMessage +'</em>');
		}else if(val_chk_gg != "" || val_chk_mm != "" || val_chk_aaaa != ""){
			checkAgeUser();
		}
	}
	//Sesso e provincia vanno controllati TRANNE se mi trovo nelle pagine del paywall
	if($('#lcom_pop > #paywall-span').length == 0) {
		if($("#lcom_pop input[name=sesso]").length > 0 && $("#lcom_pop input[name=sesso]:checked").length == 0){
			chk_val = false;
			chk_val_first = false;
			$("#lcom_pop input[name=sesso]").parent().prepend('<em class="error error_sesso">*obbligatorio</em>');
		}
		if($("#lcom_pop select[name=provincia]").length > 0 && $("#lcom_pop select[name=provincia]").val() == ""){
			chk_val = false;
			chk_val_first = false;
			if($("#fb_form_iscriviti").length > 0){
				$("#lcom_pop select[name=provincia]").parent().prepend('<em class="error error_provincia">*obbligatorio</em>');
			}else{
				$("#lcom_pop select[name=provincia]").parent().prepend('<em class="error error_provincia">*obbligatorio</em>');
			}
		}
	}

    if($("#lcom_pop input[name=nome]").length > 0 && ($("#lcom_pop input[name=nome]").val() == "" || $("#lcom_pop input[name=nome]").val() == "Nome")){
		chk_val = false;
		chk_val_first = false;
		$("#lcom_pop input[name=nome]").parent().prepend('<em class="error error_nome">*obbligatorio</em>');
	}
    if ($("#lcom_pop input[name=cognome]").length > 0 && ($("#lcom_pop input[name=cognome]").val() == "" || $("#lcom_pop input[name=cognome]").val() == "Cognome")) {
		chk_val = false;
		chk_val_first = false;
		$("#lcom_pop input[name=cognome]").parent().prepend('<em class="error error_cognome">*obbligatorio</em>');
	}
	if($("#fb_form_iscriviti").length > 0){
		if($("#lcom_pop input[name=password]").length > 0 && $("#lcom_pop input[name=password]").val() == ""){
			chk_val = false;
			chk_val_first = false;
			$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*obbligatorio</em>');
		}
		if($("#lcom_pop input[name=confpwd]").length > 0 && $("#lcom_pop input[name=confpwd]").val() == ""){
			chk_val = false;
			chk_val_first = false;
			$("#lcom_pop input[name=confpwd]").parent().prepend('<em class="error error_confpwd">*obbligatorio</em>');
		}

		if($("#lcom_pop input[name=confpwd]").length > 0 && $("#lcom_pop input[name=confpwd]").val() != ""){
			var val_password_tmp = $("#lcom_pop input[name=password]").val();
			var val_cfp_password_tmp = $("#lcom_pop input[name=confpwd]").val();
			if(val_cfp_password_tmp != val_password_tmp){
				chk_val = false;
				chk_val_first = false;
				$("#lcom_pop input[name=confpwd]").parent().prepend('<em class="error error_confpwd">*non corrisponde</em>');
			}
		}

		//Aggiunta perche' in fase di completa profilo (utente gia' esistente su Runa) non deve fare queste validazioni
		if(alreadyRcsUser == false) {
			if($("#lcom_pop input[name=password]").length > 0 && $("#lcom_pop input[name=password]").val() != "" && $("#lcom_pop #social_connect .accetto_btn").length == 0){
				var val_input_pwd = $("#lcom_pop input[name=password]").val();
				if(val_input_pwd.length < 8){
					chk_val = false;
					chk_val_first = false;
					$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*min 8 caratteri</em>');
				}else if(!regexStringNum.test(val_input_pwd)){
					chk_val = false;
					chk_val_first = false;
					$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*almeno una lettera e un numero</em>');
				}
			}
		}
	}
	if($("#fb_form_cambia").length > 0){
		if($("#lcom_pop input[name=password]").length > 0 && $("#lcom_pop input[name=password]").val() != ""){
			var val_input_pwd = $("#lcom_pop input[name=password]").val();
			if(val_input_pwd.length < 8){
				chk_val = false;
				chk_val_first = false;
				$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*min 8 caratteri</em>');
			}else if(!regexStringNum.test(val_input_pwd) && val_input_pwd.length > 0){
				chk_val = false;
				chk_val_first = false;
				$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*almeno una lettera e un numero</em>');
			}
		}
	}
	if($("#fb_disclaimer").length > 0){
		if(!$("input[name=autUGC]").is(":checked")){
			chk_val = false;
			$("input[name=autUGC]").parents("li:eq(0)").prepend('<em class="error_dyn error_autUGC">*campo obbligatorio</em>');
		}

        if (!$("input[name=privacyAltri]").is(":checked")) {
            chk_val = false;
            $("input[name=privacyAltri]").parents(".label").prepend('<em class="error_dyn error_autUGC">*campo obbligatorio</em>');
        }

        if (!$("input[name=privacyRCS]").is(":checked")) {
            chk_val = false;
            $("input[name=privacyRCS]").parents(".label").prepend('<em class="error_dyn error_autUGC">*campo obbligatorio</em>');
        }

        if (!$("input[name=chk_flag_tracking]").is(":checked")) {
            chk_val = false;
            $("input[name=chk_flag_tracking]").parents(".label").prepend('<em class="error_dyn error_autUGC">*campo obbligatorio</em>');
        }
	}
	//chk_val serve per controllare se ci sono errori nei dati inseriti
	if(chk_val == false) {
		$("#lcom_pop .opacity_wait_05").removeClass("opacity_wait_05");
		waitingToLoad = false;
	}
	//chk_val_first serve per controllare se ci sono errori nella prima TAB di inserimento dati cosi' l'utente viene portato sul primo TAB
	if(chk_val_first == false){
		$("#lcom_pop .lcom_reg_2step, #lcom_pop .lcom_reg_3step").css("display","none");
		$("#lcom_pop .lcom_reg_1step").css("display","block");
		if($("#fb_form_cambia").length > 0) $("#lcom_sel_profilo").click();
		$.fancybox.update();
		$.fancybox.reposition();
	}
	return chk_val;
}
// chech corLIght
function chkValidFormLight(){
	$(".div_1 label, .div_1_b label").show();
	chk_val = true;
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	var emailaddressVal = $("#lcom_pop input[name=email]").val();
	var emailutenzaVal = $("#lcom_pop input[name=utenza]").val();
	chk_val_first = true;
	if($("#lcom_pop input[name=email]").length > 0 && (!emailReg.test(emailaddressVal) || emailaddressVal=="")){
		chk_val = false;
		chk_val_first = false;
		$("#lcom_pop input[name=email]").parent().prepend('<em class="error error_email">*formato email non corretto</em>');
	}
	if($("#lcom_pop input[name=utenza]").length > 0 && (!emailReg.test(emailutenzaVal) || emailutenzaVal=="")){
		chk_val = false;
		chk_val_first = false;
		$("#lcom_pop input[name=utenza]").parent().prepend('<em class="error error_utenza">*formato email non corretto</em>');
	}
	if($("#lcom_pop input[name=nickname]").length > 0){
		var val_chk = $("#lcom_pop input[name=nickname]").val();
		if(val_chk.length > 0 && (val_chk.length < 3 || val_chk.length > 30)) {
			chk_val = false;
			chk_val_first = false;
			$("#lcom_pop input[name=nickname]").parent().prepend('<em class="error error_nickname">*min 3-max 30</em>');
		}else {
			isNicknameAvailable(encodeURI(val_chk));
 //  		if(chk_Nickname != $("#lcom_pop input[name=nickname]").val()){
 //  			$.getJSON("http://"+VAR_STAG_URL+"passaparola.corriere.it/community/network/isNickNameAvailable.action?nickname="+encodeURI(val_chk),function(data){
 //  				if(data[0] == "IN USE") {
 //  					$("#lcom_pop input[name=nickname]").parent().prepend('<em class="error error_nickname">*non disponibile</em>');
 //  					chk_val = false;
 //  					chk_val_first = false;
 //  				}
 //  			})
//			}
		}
	}
	if($("#lcom_pop input[name=DNgg]").length > 0){
		var val_chk_gg = $("#lcom_pop input[name=DNgg]").val();
		var val_chk_mm = $("#lcom_pop input[name=DNmm]").val();
		var val_chk_aaaa = $("#lcom_pop input[name=DNaaaa]").val();
		if(val_chk_gg == "" || val_chk_mm == "" || val_chk_aaaa == ""){
			chk_val = false;
			chk_val_first = false;
			$("#lcom_pop .error_date").remove();
			$("#lcom_pop input[name=DNgg]").parent().prepend('<em class="error error_date">*Campo obbligatorio</em>');
		}
		else if(val_chk_gg != "" || val_chk_mm != "" || val_chk_aaaa != ""){
			checkAgeUser();
		}
	}
	//Sesso e provincia vanno controllati TRANNE se mi trovo nelle pagine del paywall

	if($("#lcom_pop select[name=sesso]").length > 0 && $("#lcom_pop select[name=sesso]").val() == ""){
		chk_val = false;
		chk_val_first = false;
		$("#lcom_pop select[name=sesso]").parent().prepend('<em class="error error_sesso">*Campo obbligatorio</em>');
	}
	if($("#lcom_pop select[name=provincia]").length > 0 && $("#lcom_pop select[name=provincia]").val() == ""){
		chk_val = false;
		chk_val_first = false;
		if($("#fb_form_iscriviti").length > 0){
			$("#lcom_pop select[name=provincia]").parent().prepend('<em class="error error_provincia">*Campo obbligatorio</em>');
		}else{
			$("#lcom_pop select[name=provincia]").parent().prepend('<em class="error error_provincia">*Campo obbligatorio</em>');
		}
	}

	if($("#fb_form_iscriviti").length > 0){
		if((window.location.hostname == "iltempodelledonne.corriere.it" ) || (window.location.href.indexOf("bello-italia") > -1) || (window.location.href.indexOf("italia-digitale") > -1)){
			if($("#lcom_pop input[name=nome]").length > 0 && $("#lcom_pop input[name=nome]").val() == ""){
				chk_val = false;
				chk_val_first = false;
				$("#lcom_pop input[name=nome]").parent().prepend('<em class="error error_password xtr">*Campo obbligatorio</em>');
			}
			if($("#lcom_pop input[name=cognome]").length > 0 && $("#lcom_pop input[name=cognome]").val() == ""){
				chk_val = false;
				chk_val_first = false;
				$("#lcom_pop input[name=cognome]").parent().prepend('<em class="error error_password xtr">*Campo obbligatorio</em>');
			}
		}

		if($("#lcom_pop input[name=password]").length > 0 && $("#lcom_pop input[name=password]").val() == ""){
			chk_val = false;
			chk_val_first = false;
			$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*Campo obbligatorio</em>');
		}
		if($("#lcom_pop input[name=confpwd]").length > 0 && $("#lcom_pop input[name=confpwd]").val() == ""){
			chk_val = false;
			chk_val_first = false;
			$("#lcom_pop input[name=confpwd]").parent().prepend('<em class="error error_confpwd">*Campo obbligatorio</em>');
		}

		if($("#lcom_pop input[name=confpwd]").length > 0 && $("#lcom_pop input[name=confpwd]").val() != ""){
			var val_password_tmp = $("#lcom_pop input[name=password]").val();
			var val_cfp_password_tmp = $("#lcom_pop input[name=confpwd]").val();
			if(val_cfp_password_tmp != val_password_tmp){
				chk_val = false;
				chk_val_first = false;
				$("#lcom_pop input[name=confpwd]").parent().prepend('<em class="error error_confpwd">*non corrisponde</em>');
			}
		}

		//Aggiunta perche' in fase di completa profilo (utente gia' esistente su Runa) non deve fare queste validazioni
		if(alreadyRcsUser == false) {
			if($("#lcom_pop input[name=password]").length > 0 && $("#lcom_pop input[name=password]").val() != "" && $("#lcom_pop #social_connect .accetto_btn").length == 0){
				var val_input_pwd = $("#lcom_pop input[name=password]").val();
				if(val_input_pwd.length < 8){
					chk_val = false;
					chk_val_first = false;
					$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*min 8 caratteri</em>');
				}else if(!regexStringNum.test(val_input_pwd)){
					chk_val = false;
					chk_val_first = false;
					$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*almeno una lettera e un numero</em>');
				}
			}
		}
	}
	if($("#fb_form_cambia").length > 0){
		if($("#lcom_pop input[name=password]").length > 0 && $("#lcom_pop input[name=password]").val() != ""){
			var val_input_pwd = $("#lcom_pop input[name=password]").val();
			if(val_input_pwd.length < 8){
				chk_val = false;
				chk_val_first = false;
				$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*min 8 caratteri</em>');
			}else if(!regexStringNum.test(val_input_pwd) && val_input_pwd.length > 0){
				chk_val = false;
				chk_val_first = false;
				$("#lcom_pop input[name=password]").parent().prepend('<em class="error error_password">*almeno una lettera e un numero</em>');
			}
		}
	}
	if($("#fb_disclaimer").length > 0){
		if(!$("input[name=autUGC]").is(":checked")){
			chk_val = false;
			$("input[name=autUGC]").parents("li:eq(0)").prepend('<em class="error_dyn error_autUGC">*campo obbligatorio</em>');
		}
	}

	if($("#privacyRCS-si:checked").length < 1 && $("#privacyRCS-no:checked").length < 1){
		chk_val = false;
		$("#privacyRCS-si").before('<em class="error_dyn error_autUGC">*&Egrave; obbligatorio compilare uno dei due campi</em>');
	}
	if($("#chk_flag_tracking-si:checked").length < 1 && $("#chk_flag_tracking-no:checked").length < 1 ){
		chk_val = false;
		$("#chk_flag_tracking-si").before('<em class="error_dyn error_autUGC">*&Egrave; obbligatorio compilare uno dei due campi</em>');
	}
	if($("#privacyAltri-si:checked").length < 1 && $("#privacyAltri-no:checked").length < 1){
		chk_val = false;
		$("#privacyAltri-si").before('<em class="error_dyn error_autUGC">*&Egrave; obbligatorio compilare uno dei due campi</em>');
	}

	//chk_val serve per controllare se ci sono errori nei dati inseriti
	if(chk_val == false) {
		$("#lcom_pop .opacity_wait_05").removeClass("opacity_wait_05");
		waitingToLoad = false;
	}
	//chk_val_first serve per controllare se ci sono errori nella prima TAB di inserimento dati cosi' l'utente viene portato sul primo TAB
	if(chk_val_first == false) {
		$("#lcom_pop .lcom_reg_2step, #lcom_pop .lcom_reg_3step").css("display","none");
		$("#lcom_pop .lcom_reg_1step").css("display","block");
		if($("#fb_form_cambia").length > 0) $("#lcom_sel_profilo").click();
		$.fancybox.update();
		$.fancybox.reposition();
	}
	return chk_val;
}

//$(document).ready(function() {
	$("#reg_button.btnBDI").click(function(e) {
		setTimeout(function(){
			$(".cta-registrati").click(function(event) {
				setTimeout(function(){
					if(window.location.href.indexOf("italia-digitale") > -1) {
						$("#fb_form_iscriviti").find("[name=SEP]").attr("value","COR-ITADIG");
					}else{
						$("#fb_form_iscriviti").find("[name=SEP]").attr("value","COR-BIEV");
					}

//					$("#fb_form_iscriviti").find("[name=withoutOptin]").attr("value",true);   

					var input_nome_cognome ='<div class="div_1" style="width: 45%;margin-right: 10px;margin-top:20px">'+
						'<label for="nome">Nome</label>'+
						'<input type="text" name="nome" value="" class="check_value" autocomplete="off">'+
						'</div>'+
						'<div class="div_1" style="width: 45%;margin-top:20px">'+
						'<label for="nome">Cognome</label>'+
						'<input type="text" name="cognome" value="" class="check_value" autocomplete="off">'+
						'</div>';

					$("#lcom_pop.step_registrazione .lcom_disclaimer").prepend(input_nome_cognome);

				}, 500);
			});
		}, 500);
	}); 

	$(".fancybox-opened .fancybox-close").on("hover",function(ev){
		loginLogger.debug(ev.type);
		if(ev.type == 'mouseenter'){
			hoverClose = 1;
		}
	});
	//controllo se nella URL c'e' optin=ok (e' il link che arriva all'utente per l'attivazione dell'account dopo la registrazione) - se c'e' apre la popup di attivazione ok
	if((document.URL).indexOf("optin=ok") > -1){
		callOmnitureTracing('event3','COR/Conferma Registrazione','Corriere');
		var contP = "";
		if(getQuerystringPar("contentPath")) contP = "?contentPath="+getQuerystringPar("contentPath");
		$.fancybox({
			helpers: {
				overlay: {
					css: {
						'background': 'rgba(0, 0, 0, 0.50)'
					}
				}
			},
			'padding': 0,
			'href': ""+context_ssi+"boxes/community/login/attivazione_ok.shtml"+contP,
			'type': 'ajax'
		})
	}

	//controllo se nella URL c'e' optin=ok (E' il link che arriva all'utente per l'attivazione dell'account dopo la registrazione) - se c'e' apre la popup di attivazione ok


	if((document.URL).indexOf("skin=corlight") > -1){
		callOmnitureTracing('event3','COR/Conferma Registrazione','Corriere');

		$.fancybox({
			helpers : {
				overlay : {
					css : {
						'background' : 'rgba(0, 0, 0, 0.50)'
					}
				}
			},
			'padding' : 0,
			'href' : ""+context_ssi+"boxes/community/login/verifica_ok_noptin_light.shtml",
			'type' : 'ajax'
		});
	}
	//Facebook connect + cookie check (se non c'e l'ok non carico nulla in pagina)
	if(typeof privacyok !== "undefined" && privacyok){
		//solo se ho dato il consenso alla gestione dei dati
		if($("#fb-root").length == 0){
			$("body").append("<div id='fb-root'></div>");
		}
		if(typeof social_connect_type == "undefined") social_connect_type = "corriere";
		//carico il js di facebook con ID applicazione diverso per corriere e sport
		if(social_connect_type == "corriere"){
			$.ajax({
				type: "GET",
				url: "http://js2.corriereobjects.it"+context_ssi+"boxes/community/login/facebook.js",
				dataType: "script",
				cache: true
			});
		}
	}

	//controllo se gli utenti sono loggati ad un social con il quale hanno fatto il BIND con corriere.it - se l'utente e' loggato al SOCIAL ed ha fatto il BIND precedentemente l'utente verra' loggato a corriere.it in automatico in maniera silente
	if(usn_cor_chk == false && open_over_var == 0){
		//Twitter connect
		if(usn_TWEET_cor == true){
			$("body").append('<img style="display:none;" src="https://twitter.com/login?redirect_after_login=%2Fimages%2Fspinner.gif" onload="show_login_status(\'twitter\', true)" />');
		}
		//Google connect
		else if(usn_GOOGLE_cor == true){
			$("body").append('<img style="display:none;" onload="show_login_status(\'google\', true)"  src="https://accounts.google.com/CheckCookie?continue=https://www.google.com/intl/en/images/logos/accounts_logo.png" />');
		}
		//LinkedIN connect
		else if(usn_LINK_cor == true){
			$.getScript("http://platform.linkedin.com/in.js?async=true", function success() {
				IN.init({
					onLoad: "chkLinkedInFN"
				});
			});
		}
	}
	//tolgo l'evento sul link di modifica profilo inserito nella libreria_registrazione-1.5.js e lo gestisco con la nuova login / registrazione
	$("#headBoxLogin a.headUsn").unbind().click(function(event){
		event.preventDefault();
		callOmnitureTracing("event6");
		lcom_ModificaProf();
	});
	//probabile vecchia login reg
	if($("#loginFormBean_form #loginFormBean #password-login").length > 0){
		$("#loginFormBean_form #loginFormBean input[name=confpwd]").remove();
		$("#loginFormBean_form #loginFormBean #password-login").attr("class","");
		$("#loginFormBean_form #loginFormBean #password-login").parents(".input_text:eq(0)").addClass("input_pwd_log");
		$("#loginFormBean_form #loginFormBean #password-login").parents(".input_text:eq(0)").addClass("input_pwd_txt_log");
	}
	$("#loginFormBean_form #loginFormBean #password-login").click(function(){
		$("#loginFormBean_form #loginFormBean #password-login").parents(".input_text:eq(0)").removeClass("input_pwd_log");
	});
	$("#loginFormBean_form #loginFormBean #password-login").blur(function(){
		if($("#loginFormBean_form #loginFormBean #password-login").val() == "") $("#loginFormBean_form #loginFormBean #password-login").parents(".input_text:eq(0)").addClass("input_pwd_log");
	})
	if((document.URL).indexOf("corrieresocial=1") > -1) usn_cor = false;
	//gestione di redirect alla chiusura della popup overlay facendo il redirect alla contentPath
	$(document).on('click', '#fbConnectBox .modalCloseImg', function(event){
		if((document.URL).indexOf("rcsconnect=1") > -1 && (document.URL).indexOf("contentPath") > -1){
			window.location.href = unescape(getQuerystringPar("contentPath"));
		}
	});
	$(document).on('click', '#lcom_pop #social_connect .clearBT', function(event){
		event.preventDefault();
		$('#lcom_pop .rowElem input[name=email]').val("");
		$("#lcom_pop #social_connect .clearSN .okBT, #lcom_pop #social_connect .clearSN .okText, #lcom_pop #social_connect .clearSN .clearBT, #fb_disclaimer,#lcom_pop .container_socialn #registrazione-social-err").remove();
		$("#lcom_pop #ajax_container").html("");
	})
	//probabile vecchia Log Reg
	$(document).on('click', '#lcom_pop #social_connect .link_social_bt', function(event){
		event.preventDefault();
		var val_rel = $(this).attr("rel");
		social_selected = val_rel;
		social_selected_usr = social_selected;
		hoverClose = 0;
		$.modal.close();
		if((document.URL).indexOf("corrieresocial=1") > -1) val_rel = "corrieresocial";
		setTimeout(function(){
			newWindowLcom("http://"+context_domain+context_community+val_rel+"/redirect_overlay.jsp?contentPath="+VAR_REF_URL+context_ssi+"boxes/community/login/connect_ok_social.shtml", 'popupCloseFB', 600, 500, 1, 1, 0, 0, 0, 1, 0);
		}, 500);
	})
	//controllo l'evento submit per la form SOCIAL per fare il BIND
	$(document).on('click', '#lcom_pop #social_connect .accetto_btn', function(event){
		event.preventDefault();
        $('#lcom_avatar_img').attr('disabled','disabled');
        loginLogger.debug('avatar choose DISABLED');
		//controllo se l'utente ha gia' fatto un BIND con un altro SOCIAL
		if($("#lcom_pop #social_connect .link_social_bt").length > 0){
			chkReplaceUrl = 1;
		}else{
			chkReplaceUrl = 0;
		}
		if(!waitingToLoad){
            waitingToLoad = true;
			$(this).addClass("opacity_wait_05");
            lcom_password_val = $("#lcom_pop .div_2 input[name=password]").val();
			//pulisco tutti gli elementi creati in pagina prima del submit
			$("#lcom_pop .container_socialn #registrazione-social-err, iframe[src='ajaxIframeSocial'],#lcom_pop #social_connect input[name=checkIframeContent],#lcom_pop .error_dyn,#lcom_pop .error").remove();
			if(chkValidForm()){
				$("#lcom_pop #social_connect .clearSN .okBT, #lcom_pop #social_connect .clearSN .okText, #lcom_pop #social_connect .clearSN .clearBT").remove();
				$("#lcom_pop #social_connect .clearSN").append('<img alt="" src="http://'+context_images+''+context_ssi+'boxes/community/login/images/lcom_loader.gif" class="waitBT">');
				$("#lcom_pop #social_connect").append('<input type="hidden" name="checkIframeContent" />');
				//controllo due elementi se presenti in pagina (inseriti lato applicativo nel codice restituito) per fare il BIND oppure la registrazione al SOCIAL
				if($("#lcom_pop #social_connect input[name=act_value]").length > 0 || $("#lcom_pop #social_connect input[name=submitComplete]").length > 0){
					var val_action = $("#lcom_pop #social_connect input[name=act_value]").val();
					var queryString = $("#lcom_pop #social_connect").formSerialize();
					//devo gestire il submit con ajaxform e un iframe inquanto la registrazione fa una doppia redirect passando da RUNA per il settaggio del cookie
					//dentro all'frame creato da ajaxform verra' caricato un js che richiamera' una funzione nel login_com.js padre
					$('#social_connect').ajaxForm({
						url:val_action,
						iframe: true,
						iframeSrc:"#ajaxIframeSocial",
						success:function(data){
						}
					});
					prepareDataComm();
				}else{
					//controllo della mail se nuova o gia' presente in Corriere.it - a seconda del controllo l'applicazione rispondera' con codice html diverso (BIND, completa registrazione, connettiti con un altro SOCIAL perche' l'email inserita e' gia' connessa)
					var hasError = false;
					var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					var emailaddressVal = $('#lcom_pop input[name=email]').val();
					if(emailReg.test(emailaddressVal) && emailaddressVal != "") {
						clearTimeout(timeoutSocial);
						timeoutSocial = setTimeout(function() {
							callFormSocialAjax();
						}, 1000);
					}else{
						clearTimeout(timeoutSocial);
						$("#lcom_pop #social_connect .clearSN img.waitBT").remove();
						alert("Inserire un e-mail valido");
					}
				}
			}
		}
    });

    //controllo l'evento submit per login LIGHT per la form SOCIAL per fare il BIND
    $(document).on('click', '#lcom_pop #social_connect .corLightInvio', function(event){
		event.preventDefault();
		//controllo se l'utente ha gia' fatto un BIND con un altro SOCIAL
		if($("#lcom_pop #social_connect .link_social_bt").length > 0){
			chkReplaceUrl = 1;
		}else{
			chkReplaceUrl = 0;
		}
		if(!waitingToLoad){
			waitingToLoad = true;
		$(this).addClass("opacity_wait_05");
		lcom_password_val = $("#lcom_pop .div_2 input[name=password]").val();
		//pulisco tutti gli elementi creati in pagina prima del submit
		$("#lcom_pop .container_socialn #registrazione-social-err, iframe[src='ajaxIframeSocial'],#lcom_pop #social_connect input[name=checkIframeContent],#lcom_pop .error_dyn,#lcom_pop .error").remove();
		if(chkValidFormLight()){
			$("#lcom_pop #social_connect .clearSN .okBT, #lcom_pop #social_connect .clearSN .okText, #lcom_pop #social_connect .clearSN .clearBT").remove();
			$("#lcom_pop #social_connect .clearSN").append('<img alt="" src="http://'+context_images+''+context_ssi+'boxes/community/login/images/lcom_loader.gif" class="waitBT">');
			$("#lcom_pop #social_connect").append('<input type="hidden" name="checkIframeContent" />');
			//controllo due elementi se presenti in pagina (inseriti lato applicativo nel codice restituito) per fare il BIND oppure la registrazione al SOCIAL
			if($("#lcom_pop #social_connect input[name=act_value]").length > 0 || $("#lcom_pop #social_connect input[name=submitComplete]").length > 0){
				var val_action = $("#lcom_pop #social_connect input[name=act_value]").val();
				var queryString = $("#lcom_pop #social_connect").formSerialize();
				//devo gestire il submit con ajaxform e un iframe inquanto la registrazione fa una doppia redirect passando da RUNA per il settaggio del cookie
				//dentro all'frame creato da ajaxform verra' caricato un js che richiamera' una funzione nel login_com.js padre
				$('#social_connect').ajaxForm({
					url:val_action,
					iframe: true,
					iframeSrc:"#ajaxIframeSocial",
					success:function(data){
					}
				});
				prepareDataComm();
			}else{
				//controllo della mail se nuova o gia' presente in Corriere.it - a seconda del controllo l'applicazione rispondera' con codice html diverso (BIND, completa registrazione, connettiti con un altro SOCIAL perche' l'email inserita e' gia' connessa)
				var hasError = false;
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				var emailaddressVal = $('#lcom_pop input[name=email]').val();
				if(emailReg.test(emailaddressVal) && emailaddressVal != "") {
					clearTimeout(timeoutSocial);
					timeoutSocial = setTimeout(function(){
						callFormSocialAjax();
					}, 1000);
				}else{
					clearTimeout(timeoutSocial);
					$("#lcom_pop #social_connect .clearSN img.waitBT").remove();
					alert("Inserire un e-mail valido");
				}
			}
		}
		}
	});

    var isUsrSubscriped = checkUsrSubscription();
    //rcsconnect=1 mi dice che devo aprire la login
    if((document.URL).indexOf("rcsconnect=1") > -1 && (!usn_cor || !isUsrSubscriped)){
		open_over_var = 1;
		//controllo variabile per customizzazione login
        if(typeof customreginiVal == 'undefined'){
			openFBbox(context_ssi+"boxes/community/login/login.shtml?"+corriereDevice);
		}else{
			openFBbox(context_ssi+"boxes/community/login/login.shtml?customregini="+customreginiVal+"&"+corriereDevice);
		}
    }
    //rcsconnect=2 mi dice che devo aprire la registrazione
	if((document.URL).indexOf("rcsconnect=2") > -1 && (!usn_cor || !isUsrSubscriped)){
		open_over_var = 1;
		openRegfromPop(true);
    }
    //rcsconnect=1 mi dice che devo aprire la login
    if((document.URL).indexOf("rcsconnect=5") > -1 && (!usn_cor || !isUsrSubscriped)){
		open_over_var = 1;
		accediLinkPop();
    }
    //rcsconnect=4 mi dice che devo aprire la modifica registrazione
    if((document.URL).indexOf("rcsconnect=4") > -1){
		chkOpenModProf = 1;
		openFBbox("/corcommunitynew/accesso/ModificaRegistrazioneSkinoverlay.do");
    }

    //rcsconnect=6 apertura login paywall
    if((document.URL).indexOf("rcsconnect=6") > -1 && (!usn_cor || !isUsrSubscriped)){
		lcom_LoginCom("paywall");
    }
    //rcsconnect=7 apertura login light
    if((document.URL).indexOf("rcsconnect=7") > -1 && (!usn_cor || !isUsrSubscriped)){
        lcom_LoginCom("corlight");
    }
    if((document.URL).indexOf("logout=true") > -1){
		lcom_logOut();
	}

    $("#lcom_pop #loginFormBean input").keypress(function(event){
		checkSubmitLog(event);
	});

	//funzione per fare l'UNBIND (scollegare) il SOCIAL all'utenza Corriere.it
    $(document).on('click', '#lcom_pop .lcom_connected a', function(event){
		event.preventDefault();
		var val_action_unb = $("form[name=unbind]").attr("action");
		var queryString = $("form[name=unbind]").formSerialize();
		var name_social = $(".lcom_connected img:eq(0)").attr("title");

		$.post(val_action_unb, queryString, function(data){
			if(data.indexOf("errore") > -1){
				alert("Causa un errore del server non e' stato possibile scollegare la tua utenza da "+name_social+".\n Ti chiediamo di riprovare tra pochi minuti.");
			}else{
				alert("La tua utenza e' stata scollegata da "+name_social);
				$("#lcom_pop .lcom_connected").remove();
			}
		})
    })
    //login con i SOCIAL
    $(document).on('click', '#lcom_pop .lcom_box_social .lcom_facebook,#lcom_pop .lcom_box_social .lcom_twitter,#lcom_pop .lcom_box_social .lcom_linkedin,#lcom_pop .lcom_box_social .lcom_google', function(event){
		event.preventDefault();
		var contest = $(".lcom_box_social").attr("rel");
		social_selected =  $(this).attr("title");
		social_selected_usr = social_selected;
		var val_rel = $(this).attr("class");
		val_rel = val_rel.replace("lcom_","");
		if(contest=="paywall" || contest=="corlight"){val_rel = val_rel+'_'+contest;}
		hoverClose = 0;
		$.fancybox.close();
		var ridAmp = $('#rid-amp').text();
		if(ridAmp == "") {
			newWindowLcom(context_domain+context_community+val_rel+"/redirect_overlay.jsp?contentPath="+VAR_REF_URL+context_ssi+"boxes/community/login/connect_ok_social.shtml&registrationOrigin="+encodeURIComponent(document.URL), 'popupCloseFB', 600, 500, 1, 1, 0, 0, 0, 1, 0);
		} else {
			newWindowLcom(window.location.protocol + context_community+val_rel+"/redirect_overlay.jsp?contentPath="+VAR_REF_URL+context_ssi+"boxes/community/login/connect_ok_social.shtml&registrationOrigin="+encodeURIComponent(document.URL)+"&rid="+ridAmp, 'popupCloseFB', 600, 500, 1, 1, 0, 0, 0, 1, 0);
		}
    });
    //popup password dimenticata da iframe
    $(document).on('click', '#lcom_pop .lost_pwd', function(event){

		var paywallPwd = $(this).attr("rel");

		event.preventDefault();
		try{
			try{
				window.opener.openPWDlost(paywallPwd);
			}catch(e){
				top.openPWDlost(paywallPwd);
			}
		}catch(e){
			try{
				document.domain = "corriere.it";
				window.parent.openPWDlost(paywallPwd);
			}catch(e){
				document.domain = "corriere.it";
				top.parent.openPWDlost(paywallPwd);
			}
		}
    });

    //submit login form
    $(document).on('click', '#lcom_pop .entra', function(event){
		event.preventDefault();
		try{
			top.removeErrorFB();
		}catch(e){
			document.domain = "corriere.it";
			top.removeErrorFB();
		}
		var allOK = true;
		var message_error = "";
		if($("#loginFormBean input[name=username]").val() == "" || $("#loginFormBean input[name=username]").val() == $("#loginFormBean input[name=username]").attr("title")){
			allOK = false;
			message_error = "Email utente mancante\n";
		}else if(!validateEmail($("#loginFormBean input[name=username]").val())){
			allOK = false;
			message_error = "Email utente non corretta\n";
		}
		if($("#loginFormBean input[name=password]").val() == ""){
			allOK = false;
			message_error = "Password mancante\n";
		}
		if(!allOK) alert(message_error);
		else{
			$("#loginFormBean_form form").submit();
		}
    })
    $(document).on('click', '#lcom_pop .invia', function(event){
		event.preventDefault();
		var allOK = true;
		var message_error = "";
		if($("#fb_pwd_email input[name=email]").val() == ""){
			allOK = false;
			message_error = "Email mancante\n";
		}else if(!validateEmail($("#fb_pwd_email input[name=email]").val())){
			allOK = false;
			message_error = "Email non corretta\n";
		}
		if(!allOK) alert(message_error);
		else{
			$.post($("#fb_pwd_email").attr("action"),{
				email: $("#fb_pwd_email input[name=email]").val()
			}, function(data){
				if($(data).find("h6").length > 0){
					$("#email_error, #email_ok").remove();
				}else{
					if($("#lcom_pop.contest-paywall").length > 0) $("#lcom_pop h4").hide();
				}
				$("#fb_pwd_email").before(data);
			})
		}
    });
	//Nuova form di richiesta reset password
	$(document).on('click', '#lcom_pop .invia_reset_pwd', function(event){
		event.preventDefault();
		$("#messaggio_reset").remove();
		var allOK = true;
		var message_error = "";
		if($("#form_reset_pwd input[name=email_reset_pwd]").val() == ""){
			allOK = false;
			message_error = "Email mancante\n";
		}
		else if(!validateEmail($("#form_reset_pwd input[name=email_reset_pwd]").val())){
			allOK = false;
			message_error = "Email non corretta\n";
		}
		if(!allOK) alert(message_error);
		else{
			$.post($("#form_reset_pwd").attr("action"),{
				"email_reset_pwd": $("#form_reset_pwd input[name=email_reset_pwd]").val(),
				"g-recaptcha-response": $("#form_reset_pwd textarea[name=g-recaptcha-response]").val()
				}, function(data){
				$("#email_error, #email_ok").remove();
				$("#form_reset_pwd").before(data);
			});
		}
	});

	$(document).on('click', '#fb_form_email .entra', function(event){
		event.preventDefault();
		var allOK = true;
		var message_error = "";
		if($("#fb_form_email input[name=password]").val() == ""){
			allOK = false;
			message_error = "Password mancante\n";
		}
		if(!allOK) alert(message_error);
		else{
			$("#fb_form_email").submit();
		}
    });
    if($("#loginFormBean_form, #fb_form_cambia").length > 0){
		setFBoption();
    }
//});
//doc ready END

function lcom_RegOKCompleta(){
	openFBbox(context_ssi+"boxes/community/login/verifica_ok_nomail.shtml");
}

function lcom_RegOKNoOptin(typeReg){
	if (typeof paywallSkin == "undefined"){
		if (typeof typeReg === "undefined") {
			typeReg = "";
		}
		openFBbox(context_ssi+'boxes/community/login/verifica_ok_noptin'+typeReg+'.shtml');
	}else{
		openFBbox(context_ssi+"boxes/community/login/verifica_ok_noptin.shtml?paywall="+paywallSkin);
	}
	$("#lcom_pop .accesso").click(function(){
		accediLinkPop();
	});
}

function lcom_CompletaReg(){
	if (checkCustomLoginComUrl(LOGIN_COM_URL_TYPE.EDIT_PROFILE_URL))
		return false;
	openFBbox(context_ssi+"boxes/community/login/non_completo.shtml");
}

function lcom_LoginCom(typeContest){
	if (checkCustomLoginComUrl(LOGIN_COM_URL_TYPE.LOGIN_URL))
		return false;

	if(typeContest == 'paywall'){
        try{
            s.trackPaywallLogin();
        }catch(err){}
    }else{
        callOmnitureTracing('event2','COR/Login','Corriere');
    }

	//controllo variabile per customizzazione login
	isPaywall = false;
	if(typeContest == 'paywall'){
		isPaywall = true;
		openFBbox(context_ssi+"boxes/community/login/login_paywall.shtml?"+corriereDevice);
	}else if(typeContest == 'corlight'){
		openFBbox(context_ssi+"boxes/community/login/login_corlight.shtml?"+corriereDevice);
	}else if(typeof customreginiVal == 'undefined'){
		openFBbox(context_ssi+"boxes/community/login/login.shtml?"+corriereDevice);
	}else{
		openFBbox(context_ssi+"boxes/community/login/login.shtml?customregini="+customreginiVal+"&"+corriereDevice);
	}
}

function lcom_LoginLightWithMail(email){
	if (checkCustomLoginComUrl(LOGIN_COM_URL_TYPE.LOGIN_URL))
		return false;

    callOmnitureTracing('event2','COR/Login','Corriere');
	openFBbox(context_ssi+"boxes/community/login/login_corlight.shtml?"+corriereDevice+"&email="+email);
}

function lcom_LoginComAmp(rid){
	callOmnitureTracing('event2','COR/Login','Corriere');
	openFBbox(context_ssi+"boxes/community/login/login_amp.shtml?rid="+rid+"&mobile");
}

function lcom_LoginComFreetrial(typeContest){
	openFBbox(context_ssi+"boxes/community/login/login-freetrial.shtml?mail="+typeContest+"&"+corriereDevice);
}

function lcom_ModificaProf(){
	if (checkCustomLoginComUrl(LOGIN_COM_URL_TYPE.EDIT_PROFILE_URL))
		return false;
	openFBbox("/corcommunitynew/accesso/ModificaRegistrazioneSkinoverlay.do");
}
function lcom_AccediServizi(){
	if(typeof tipologiaUgc == 'undefined' || tipologiaUgc == 'default'){
		openFBbox(context_ssi+"boxes/community/login/accedi_servizi.shtml");
	}else{
		if(tipologiaUgc == "community-ugc"){
			openFBbox(context_ssi+"boxes/community/login/accedi_servizi_ugc.shtml");
		}
	}
}

function lcom_AccediFutura(){
	if(typeof tipologiaUgc == 'undefined' || tipologiaUgc == 'default'){
		openFBbox(context_ssi+"boxes/community/login/accedi_servizi_futura.shtml");
	}else{
		if(tipologiaUgc == "community-ugc"){
			openFBbox(context_ssi+"boxes/community/login/accedi_servizi_ugc.shtml");
		}
	}
}

function manutenzione(){
	openFBbox(context_ssi+"boxes/community/login/manutenzione.shtml");
}
function reloadPage(){
	var destination = unescape(getQuerystringPar("contentPath"));
	if (destination && destination != ''){
		window.location.href = destination;
	}else{
		window.location.reload();
	}
}

function lcom_logOut(){
	if (checkCustomLoginComUrl(LOGIN_COM_URL_TYPE.LOGOUT_URL))
		return false;

	var destination = unescape(getQuerystringPar("contentPath"));
	var contentPath = document.URL;

	if(destination && destination != ''){
		contentPath = destination;
	}else if(contentPath.indexOf("?rcsconnect") > -1){
		contentPath = contentPath.substring(0, contentPath.indexOf("?rcsconnect"));
	}

	window.location.href = "/corcommunitynew/accesso/LogOut.do?contentPath="+contentPath;
}
//verifica se l'utente e' stato automaticamente iscritto a corriere e mostra il popup opportuno
function checkAlertUserAutoSubscribe(){
	if (checkCookieCor("rcsLogin") && checkCookieCor("rcsOverlaySubscribe")){
		deleteCookie("rcsOverlaySubscribe","/",".corriere.it");
		openFBbox(context_ssi+"boxes/community/login/alert_utente_auto_subscribe.shtml");
	}
}

$(document).ready(function(){

	checkAlertUserAutoSubscribe();

	//	by Pietro Alfano - modifica 'alla brutta' per gestire la richiesta dell'ultimo secondo di mostrare all'utente il popup per il concorso Pilgrim
	if (document.location.href.search("/cultura/pilgrim") > 0 && document.referrer.search("optin=ok") > 0){
		lcom_RegOKCompleta();
	}
});

$(document).on('click', '#lcom_pop .lcom_avanti_social a', function(event){
	event.preventDefault();
	$("#lcom_pop .div_1 .error").remove();
	chkValidForm();
});
$(document).on('click', '.lcom_pop_small .lcom_btn_annulla', function(event){
	event.preventDefault();
	$.fancybox.close();
});
$(document).on('click', '.lcom_pop_small .lcom_btn_completa', function(event){
	event.preventDefault();
	callOmnitureTracing('event51','COR/Registrazione/Step3','Corriere');
	chk_openCompleta = 1;
	lcom_ModificaProf();
});
$(document).on('click', '#lcom_menu .logout, .logout', function(event){
	event.preventDefault();
	lcom_logOut();
});
$(document).on('hover', '#lcom_menu a.lab_menu', function(ev){
	if(ev.type == 'mouseenter'){
		$(this).addClass("hover_class");
	}

	if(ev.type == 'mouseleave'){
		$("#lcom_menu a").removeClass("hover_class");
	}
});
$(document).on('click', '#lcom_menu a.lab_menu', function(event){
	event.preventDefault();
	$("#lcom_menu a").removeClass("lab_active");
	$(".lcom_modifica_profilo .container_spacer").removeClass("lcom_cont_lab_act");
	$(this).addClass("lab_active");
	var id_lab = $(this).attr("id");
	$(".lcom_modifica_profilo .container_spacer[rel="+id_lab+"]").addClass("lcom_cont_lab_act");
	$.fancybox.update();
	$.fancybox.reposition();
});
$(document).on('click', '.lcom_modifica_profilo .lcom_privato_inp', function(event){
	$(".lcom_azienda").css("display","none");
	$(".lcom_privato").css("display","block");
});
$(document).on('click', '.lcom_modifica_profilo .lcom_azienda_inp', function(event){
	$(".lcom_privato").css("display","none");
	$(".lcom_azienda").css("display","block");
});

//evento sugli STEP di registrazione
$(document).on('click', '#lcom_pop .lcom_step_next', function(event){
	event.preventDefault();
	$("#lcom_pop .error_dyn,#lcom_pop .error").remove();
//	if(!chkValidForm() && !chk_val_first){
	if((!chkValidForm() && !chk_val_first) || !chk_val_nick){

	}else{
		$("#lcom_pop .error_dyn,#lcom_pop .error").remove();
		var rel_selected = $(this).attr("rel");
		if(rel_selected.indexOf("lcom_reg_2step") > -1) callOmnitureTracing('event2','COR/Registrazione/Step2');
		else if(rel_selected.indexOf("lcom_reg_3step") > -1) callOmnitureTracing('event2','COR/Registrazione/Step3');
		$("#lcom_pop .lcom_step_div").css("display","none");
		$("#lcom_pop ." + rel_selected).css("display","block");
		$.fancybox.update();
		$.fancybox.reposition();
	}
});

// start FS

//runa4ext vars
var provId = 'cftghnBBBd45566'; // prod cftghnBBBd45566 - stag sdafjnEEEf34455
var appId = 'COR'; // define for other sites (locals for eg.)
var cookieDomain = getCookieClient('rcsDomainSession');
var sessionId;
var runaId;
var saveAuthToken;

//serverDate vars
var xmlHttpReq;
var getServerTime = getServerTime();
var getServerDate = new Date(getServerTime);
var regServerTime;

//filereader vars
var mName, fBase, fName, fType;

// set nickname and avatar vars
var prefAvatar, prefNickname;

// set utils vars
var firstRegProcess;

//FS nick and avatar get
function getUserToken(sID, rID){
	var parametersCall = {
		providerID : provId,
		applicationID : appId,
		sessionID : sID,
		runaID : rID
	}
	noTokenCall('GET','https://'+VAR_STAG_URL+'runaservices.corriere.it/runaClientExt/preferences/api/getToken', parametersCall, 'getUserToken');
}

function getUserPreference(){
  
	var parametersCall = {
		applicationID : appId,
		runaID : runaId,
		preferenceKeys : ["cor_user_nickname_label_approved","cor_user_avatar_approved","cor_user_status_banned"]
	}
	tokenCall('POST','https://'+VAR_STAG_URL+'runaservices.corriere.it/runaClientExt/preferences/api/getPreferences', parametersCall, 'getUserPreference');
}

function isNicknameAvailable(nickValue){
	var parametersCall = {
		providerID : provId,
		applicationID : appId,
		filter : [{
			preferenceKey : "cor_user_nickname_label_approved",
			preferenceValue: nickValue
		}]
	}

	chk_val_nick = false;
	$("#lcom_pop input[name=nickname]").parent().prepend('<em class="error error_nickname">Verifica nickname in corso</em>');
	$('#lcom_pop .next_bt_1_4').css("background-color","#bbb9b9");
	$.ajax({
		type: "POST",
		url: "https://"+VAR_STAG_URL+"runaservices.corriere.it/runaClientExt/preferences/api/checkPreferences",
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(parametersCall),
		crossDomain: true,
		success: function (data){
			if(data.preferences.length > 0){
				chk_val_nick = false;
				$("#lcom_pop .error_nickname").remove();
				$("#lcom_pop input[name=nickname]").parent().prepend('<em class="error error_nickname">*non disponibile</em>');
			}else{
				chk_val_nick = true;
				$("#lcom_pop .error_nickname").remove();
				$('#lcom_pop .next_bt_1_4').css("background-color","#29abef");
			}
		}
	})
	.done(function(){
		loginLogger.debug('done isNicknameAvailable');
	})
	.fail(function(){
		loginLogger.debug('fail isNicknameAvailable');
	});
}

function setAvatarPreview() {
	var preview;
	var file = document.querySelector( '#lcom_avatar_img' ).files[0];
	var reader = new FileReader();

	reader.addEventListener( 'load', function () {
		//preview.src = reader.result;
		if(!$('#lcom_avatar img').length){
			$('#lcom_avatar').prepend('<img src="" alt="avatar">');
		}

		preview = document.querySelector('#lcom_avatar img');
		$('#lcom_avatar img').attr('src', reader.result).load(function (){
			loginLogger.debug('IMAGE SIZING!!')
			var img = {
				url: $('#lcom_avatar img').attr('src'),
				width: $('#lcom_avatar img').width(),
				height: $('#lcom_avatar img').height()
			}
			var minSide = img.height;
			var coords = {
				w: minSide,
				h: minSide,
				x: Math.round(img.width / 2),
				y: 0
			}
			if(img.width < img.height){
				minSide = img.width;
				coords = {
					w: minSide,
					h: minSide,
					x: 0,
					y: Math.round( img.height / 2 )
				}
			}
		});
		fBase = preview.src.split('base64,')[1];
	}, false );

	if(file){
		reader.readAsDataURL(file);
		mName = file.name;
		fName = mName.substring(0, mName.lastIndexOf( '.' ));
		fType = mName.substring(mName.lastIndexOf( '.' ) + 1, mName.length);
		loginLogger.debug('FILE EXIST!! ' + mName);
	}
}

function setUserMedia(idRuna){
	if(firstRegProcess){
		var parametersCall = {
			//providerID : provId,
			applicationID : appId,
			runaID : idRuna,
			media : {
				name : fName,
				preferenceKey : 'cor_user_avatar_moderating',
				base64 : fBase,
				type : fType
			}
		}
		loginLogger.debug('MEDIA notoken');
		noTokenCall('PUT','https://'+VAR_STAG_URL+'runaservices.corriere.it/runaClientExt/preferences/api/uploadMedia',parametersCall,'setUserMedia');
	}else{
		var parametersCall = {
			providerID : provId,
			applicationID : appId,
			runaID : idRuna,
			media : {
				name : fName,
				preferenceKey : 'cor_user_avatar_moderating',
				base64 : fBase,
				type : fType
			}
		}
		loginLogger.debug('MEDIA token');
		tokenCall('PUT','https://'+VAR_STAG_URL+'runaservices.corriere.it/runaClientExt/preferences/api/uploadMedia',parametersCall,'setUserMedia');
	}
	loginLogger.debug('SET USER MEDIA DONE')
}

function setUserPreferences(idRuna, pPref){
	//cor_user_nickname_label_moderating pKey
	if(firstRegProcess){
		var parametersCall = {
			//providerID : provId,
			applicationID : appId,
			runaID : idRuna,
			preferences : pPref
		}
		loginLogger.debug('PREFERENCES notoken: ' + pPref);

		noTokenCall('PUT','https://'+VAR_STAG_URL+'runaservices.corriere.it/runaClientExt/preferences/api/setPreferences',parametersCall,'setUserPreferences');
	}else{
		var parametersCall = {
			providerID : provId,
			applicationID : appId,
			runaID : idRuna,
			preferences : pPref
		}
		loginLogger.debug('PREFERENCES token: ' + pPref);

		tokenCall('PUT','https://'+VAR_STAG_URL+'runaservices.corriere.it/runaClientExt/preferences/api/setPreferences',parametersCall,'setUserPreferences');
	}
	loginLogger.debug('SET USER PREFERENCES DONE');
}

function tokenCall(typeToCall,urlToCall,paramsToCall,requestToCall){
	loginLogger.debug(urlToCall)
	paramsToCall = JSON.stringify(paramsToCall);

	$.ajax({
		type: typeToCall,
		url: urlToCall,
		dataType: 'json',
		headers: {'authorizationToken' : saveAuthToken},
		contentType: 'application/json',
		data: paramsToCall,
		crossDomain: true,
		success: function (data) {
            prefBanned='false';
            $.each( data.preferences, function( i, item ){

                    var checkPref = item.preferenceKey;
                    loginLogger.debug('prefBanned checkPref ', checkPref)
                    if(checkPref=="cor_user_status_banned"){
                        prefBanned = item.preferenceValue;
                        loginLogger.debug('prefBanned prefBanned ', prefBanned)
                    }else if(checkPref=="cor_user_nickname_label_approved"){
                        prefNickname = item.preferenceValue;
                        loginLogger.debug('prefBanned prefNickname ', prefNickname)
                    }else if(checkPref=="cor_user_avatar_approved"){
                        prefAvatar = item.preferenceValue;
                        loginLogger.debug('prefBanned prefAvatar ', prefAvatar)
                    }
            });
		}
	})
	.done(function(){
		loginLogger.debug('done USER SET/GET PREF' + requestToCall);
	})
	.fail(function(){
		loginLogger.debug('fail USER SET/GET PREF' + requestToCall);
	});
}

function noTokenCall(typeToCall,urlToCall,paramsToCall,requestToCall){
	loginLogger.debug(urlToCall);
	if(requestToCall !== 'getUserToken'){
		paramsToCall = JSON.stringify(paramsToCall);
	}
	$.ajax({
		type: typeToCall,
		url: urlToCall,
		dataType: 'json',
		contentType: 'application/json',
		data: paramsToCall,
		crossDomain: true,
		success: function (data){
			if(requestToCall === 'getUserToken'){
				loginLogger.debug('success USER GET TOKEN ' + data.authorizationToken);
				saveAuthToken = data.authorizationToken;
                //set cookie comment
                $.cookie("rcsCommenToken", saveAuthToken);
				getUserPreference();
			}
			loginLogger.debug('success USER SET/GET PREF' + requestToCall);
		}
	})
	.done(function(){
		loginLogger.debug('done USER SET/GET PREF' + requestToCall);
	})
	.fail(function(){
		loginLogger.debug('fail USER SET/GET PREF ' + paramsToCall + requestToCall);
	});
}

$(document).on('change', '#lcom_avatar_img', function(event){
	setAvatarPreview();
	loginLogger.debug( 'SET AVATAR LAUNCHED!!' )
	$("#lcom_pop #readURLAvatar").after('<div id="lcom_avatar_modera">FOTO IN MODERAZIONE<br>Ti ricordiamo che &egrave; necessario salvare le modifiche</div>');
});
$(document).on('change','#lcom_pop input[name=nickname]', function(event){
	//intercept per checkusernickname already in use
	prefNickname = encodeURI($('#lcom_pop input[name=nickname]').val());
	loginLogger.debug('CHANGE NICKNAME TO: ' + prefNickname);
});
$(document).on('change','#lcom_pop input[name=utenza]', function(event){
	prefEmail = encodeURI( $( '#lcom_pop input[name=utenza]' ).val());
	loginLogger.debug('CHANGE EMAIL TO: ' + prefEmail);
});

// check rcsDomainSession cookie to retrieve session and runa ID
if(cookieDomain){
	sessionId = cookieDomain.split('|')[0];
	runaId = cookieDomain.split('|')[1];
	loginLogger.debug('COOKIE DOMAIN EXIST!!');
}

function getServerTime(){
	try{
		//FF, Opera, Safari, Chrome
		xmlHttpReq = new XMLHttpRequest();
	}catch(err1){
		//IE
		try{
			xmlHttpReq = new ActiveXObject('Msxml2.XMLHTTP');
		}catch(err2){
			try{
				xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
			}catch(eerr3){
				//AJAX not supported, use CPU time.
				loginLogger.debug('AJAX not supported');
			}
		}
	}
	xmlHttpReq.open('HEAD', window.location.href.toString(), false);
	xmlHttpReq.setRequestHeader('Content-Type', 'text/html');
	xmlHttpReq.send('');
	return xmlHttpReq.getResponseHeader('Date');
}
function regSchedule(){
	var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var serverMonth = String(getServerDate).split(' ')[1];
	var serverDay = String(getServerDate).split(' ')[2];
	var serverYear = String(getServerDate).split(' ')[3];
	var serverHours = String(getServerDate).split(' ')[4];
	var serverMonthNumber = String(Number(monthArray.indexOf(serverMonth)) + 1);

	var serverMonthNumberComplete;
	if(serverMonthNumber.length < 2){
		serverMonthNumberComplete = '0' + serverMonthNumber;
	}else{
		serverMonthNumberComplete = serverMonthNumber;
	}

	regServerTime = serverYear + '-' + serverMonthNumberComplete + '-' + serverDay + 'T' + serverHours;

	//comments015.js called if firstPub date in null
	pubServerTime = serverYear + '-' + serverMonthNumberComplete + '-' + serverDay + ' ' + serverHours;
	loginLogger.debug(regServerTime);
};

//end FS

//caricamento preview con api reader
//function readURLAvatar(input) {
//    if (input.files && input.files[0]) {
//        var reader = new FileReader();
//        reader.onload = function(e) {
//            if ($("#lcom_avatar img").length == 0) $("#lcom_avatar").append("<img />");
//            $("#lcom_avatar img").attr('src', e.target.result).load(function() {;
//                var img = {
//                    url: $("#lcom_avatar img").attr("src"),
//                    width: $("#lcom_avatar img").width(),
//                    height: $("#lcom_avatar img").height()
//                }
//                var minSide = img.height;
//                var coords = {
//                    w: minSide,
//                    h: minSide,
//                    x: Math.round(img.width / 2),
//                    y: 0
//                }
//                if (img.width < img.height) {
//                    minSide = img.width;
//                    coords = {
//                        w: minSide,
//                        h: minSide,
//                        x: 0,
//                        y: Math.round(img.height / 2)
//
//                    }
//                }
//            });
//        }
//        reader.readAsDataURL(input.files[0]);
//    }
//}

function checkElementPopLcom(){
	if($("#lcom_notifiche").length > 0) {
		$("#lcom_notifiche li").not(".first").each(function(){
			if($(this).find(".lcom_option_div input").is(":checked")) {
				$(this).find(".lcom_not_email").addClass("lcom_visible");
				$(this).find(".lcom_not_email input").removeAttr("disabled");
				$(this).find(".lcom_option_div div").addClass("on");
			}
		})
		$("#lcom_notifiche .lcom_option_div div").click(function(){
			var li_selectd = $(this).parents("li:eq(0)");
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$(li_selectd).find(".lcom_option_div input").removeAttr("checked");
				$(li_selectd).find(".lcom_not_email").removeClass("lcom_visible");
				$(li_selectd).find(".lcom_not_email input").attr("disabled", "disabled");
			}else{
				$(li_selectd).find(".lcom_not_email").addClass("lcom_visible");
				$(li_selectd).find(".lcom_not_email input").removeAttr("disabled");
				$(li_selectd).find(".lcom_option_div div").addClass("on");
				$(li_selectd).find(".lcom_option_div input").attr('checked', true);
			}
		})
	}

//    setInterval(function() {
//
//        $("#lcom_avatar_img").change(function() {
//            //se la variabile domain_community_2 = 1 carico la previw con HTML5 supportato altrimenti metto solo un messaggio - questo metodo va comunque modificato in quanto non supportato da tutti i Browser
//            if (typeof domain_community_2 != "undefined" && domain_community_2 == 1) {
//
//                if (window.FileReader) {
//                    readURLAvatar(this);
//                    $("#lcom_pop #readURLAvatar").after('<div id="lcom_avatar_modera">FOTO IN MODERAZIONE<br>Ti ricordiamo che &egrave; necessario salvare le modifiche</div>');
//                } else {
//                    $("body").append('<form enctype="multipart/form-data" name="sendAvatar" method="post" action="http://www.corriere.it/proxycommunity/network/uploadTempAvatar" id="sendAvatar"></form>');
//                    $("#sendAvatar").append(encodeURI($("#lcom_avatar_img input[name=avatarImage]").clone().val($("#lcom_avatar_img input[name=avatarImage]").val())));
//                    $("#sendAvatar").append($("#lcom_pop #lcom_avatar_img"));
//
//                    $('#sendAvatar').ajaxForm({
//                        type: "POST",
//
//                        success: function(data) {
//
//                            var avatar = data.avatarUrl;
//                            dataAvatar = data[1];
//                            dataAvatar = unescape(dataAvatar)
//                            $("#lcom_avatar img").attr('src', dataAvatar);
//
//                        },
//                        error: function() {
//                            console.log("ko");
//                        }
//                    });
//                    $("#sendAvatar").submit();
//                }
//            } else {
//                $("#lcom_pop #lcom_avatar").after('<div id="lcom_avatar_modera">FOTO IN MODERAZIONE<br>Ti ricordiamo che &egrave; necessario salvare le modifiche</div>');
//            }
//        })
//
//
//    }, 3000);


	function checkNickUse(){
		var val_chk = $("#lcom_pop input[name=nickname]").val();

		if($("#lcom_pop input[name=nickname]").val()){
			isNicknameAvailable(encodeURI(val_chk));
//			$.getJSON("http://"+VAR_STAG_URL+"passaparola.corriere.it/community/network/isNickNameAvailable.action?nickname="+encodeURI(val_chk), function(data){
//				if(data[0] == "IN USE"){
//					$("#lcom_pop input[name=nickname]").parent().prepend('<em class="error error_nickname">*non disponibile</em>');
//					chk_val = false;
//					chk_val_first = false;
//				}
//			})
		}
	}
}
if(corriereDevice == "mobile"){
	if(usn_cor == false){
		$('#nav_mobile li.gestione').css('display', 'none');
		$('#nav_mobile li.logout').css('display', 'none');
		$('#nav_mobile li.accedi').css('display', 'inline-block');
		function accediMobile(){
			$(".nav_left a").click();
			accediLinkPop();
		}
	}else{
		$('#nav_mobile li.gestione').css('display', 'inline-block');
		$('#nav_mobile li.logout').css('display', 'inline-block');
		$('#nav_mobile li.accedi').css('display', 'none');
	}
}

//Corriere Light
$(document).on("click",".lcom_corlight .container_spacer label",function(){
    $(this).next("input").focus();
});
