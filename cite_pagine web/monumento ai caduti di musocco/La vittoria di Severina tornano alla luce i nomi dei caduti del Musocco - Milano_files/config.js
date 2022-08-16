/****** BitBang tracking Configuration main site Corriere

V 0.40 - 21-01-2016: Tracciamento nuova hp corriere
V 0.41 - 21-01-2016: Modificata report suite destinazione per cplus.corriere.it e muri
V 0.42 - 25-01-2016: Fix report suite destinazione per cplus.corriere.it e muri
V 0.43 - 27-01-2016: Review Custom Link Account, SLT: menu mobile bottom, menu mobile servizi, top bar menu
V 0.44 - 29-01-2016: Fix pageName muro
V 0.45 - 03-02-2016: Aggiunto try catch globale per gestione errori js
V 0.46 - 11-02-2016: Aggiunta logica gestione .on function per versioni vecchie di jQuery
V 0.47 - 25-02-2016: Fix vari javascript
V 0.48 - 26-04-2016: Incognito mode detection
V 0.49 - 09-05-2016: Modifica funzione lettura cookie
V 0.50 - 31-01-2017: Disattivazione Adobe Analytics condizionata a Tealium
V 0.51 - 06-02-2017: Check tipo utag
V 0.52 - 04-03-2017: Dettagli aggiuntivi per debug
******/

if ((typeof utag == "undefined") || (typeof utag.data != "undefined" && utag.data.adobe_import != "completato")) {

/* Environment Settings*/
try {
    // Custom Links Destination //
    s.customLink_account = "rcsglobal,rcscorriereproddef";
    // Edizioni Locali
    if (window.location.host.search(/bergamo.corriere.it|brescia.corriere.it|milano.corriere.it|roma.corriere.it|corrieredelmezzogiorno.corriere.it|corrierefiorentino.corriere.it/) >= 0) {
        s.customLink_account = "rcsglobal,rcscorriereproddef,rcsedlocaliproddef";
    }
    // Custom Links Corriere Plus
    s.customLink_account_pw = "rcsglobal,rcscorriereproddef,rcscorriereplusproddef";
    // Custom Tracking Corriere Plus
    if (location.hostname.search(/corriere.it/) >= 0) {
        s.customTrack_account_pw = "rcsglobal,rcscorriereplusproddef";
    } else {
        s.customTrack_account_pw = s.customLink_account_pw;
    }
    // SWITCH FOR STAGING/PRODUCTION
    /* s.customLink_account = s.customLink_account_pw = s.customTrack_account_pw = "rcsvistatest";
    s.sa(s.customLink_account); */

    // Corriere Plus Specific //
    if (location.host == "cplus.corriere.it") {
        s.sa(s.customLink_account_pw);
    }
    /* End environment settings */

    /* Provide code version change notes detail number */
    var cfg_ver_bb = "0.52";
    var bb_semaforo = false;

    /* Responsive Web Design Plugin (rwd) Configuration */
    s._rwdBreakpoints = {
        'Mobile': [0, 650],
        'Wide': [651, 9999]
    };

    s._rwdUseContextData = true;
    s._rwdNamespace = "cor";
    s.smartResizeAdded = true;

    /* Responsive Web Design Plugin (rwd) Launch */

    s.rwdSetupSmartresize();
    s.rwdSetupTrack();

    /* Setup URL processing */
    s._siteName = "corriere.it";
    s._siteNameSpace = "cor";

    /* Check jQuery Version */
    var jqLimit_mayor = 1;
    var jqLimit_minor = 7;

    s.checkJQ = function(mayor, minor) {

        var version = (jQuery.fn.jquery.split('.'));

        if (parseInt(version[0]) > jqLimit_mayor) {
            return true;
        } else if (parseInt(version[0]) == jqLimit_mayor && parseInt(version[1]) >= jqLimit_minor) {
            return true;
        } else return false;

    }


    /* Retrieve information from URL */
    var mobileDomainMatch;

    s.isMobile = function() {
        var isMobile = window.location.pathname.match(/(\/m\/)+/);
        return isMobile
    }

    s.cleanMobileURL = function() {
        // remove unused parameters (i.e."0?nav=0&checkEnrichmentDate=1396425933954")
        var cleanStr = window.location.pathname;
        var cleanArr = cleanStr.split("/");
        var unusedPar = cleanArr[cleanArr.length - 1];

        if (unusedPar.match(/^\d+$/) != null) {
            cleanStr = cleanStr.substr(0, cleanStr.length - unusedPar.length - 1);
        }
        return cleanStr
    }


    s.getArticleID = function() {

        var articleid = "";

        if (s.isMobile()) {
            cleanStr = s.cleanMobileURL();
            mobileDomainMatch = cleanStr.match(/-(?:[0-9])+$/);
            var didMatch = mobileDomainMatch ? mobileDomainMatch[0].replace("-", "") : cleanStr.match(/(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+$/);
        } else {
            var didMatch = window.location.pathname.match(/(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+\.+[a-z]+$/);
            if (didMatch == null) {
                didMatch = window.location.pathname.match(/(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+-(?:[0-9a-zA-Z])+$/);
            }
        }

        if (didMatch != null) {
            articleid = didMatch[0];
            articleid = articleid.replace(/\.[a-z]+$/, "");
        }

        return articleid;

    }

    s.getArticleReleaseDate = function() {

        var articleDate = "";

        var didMatch = window.location.pathname.match(/\/([0-9]+_[a-z]+_[0-9]+)/);
        if (didMatch != null) articleDate = didMatch[1];

        didMatch = window.location.pathname.match(/\/([0-9]+-[0-9]+-[0-9]+)/);
        if (didMatch != null) articleDate = didMatch[1];

        didMatch = window.location.pathname.match(/([0-9]+\/[0-9]+\/[0-9]+)/);
        if (didMatch != null) articleDate = didMatch[1];

        return articleDate;
    }

    var sc_sezione = "";

    s.readURL = function(s, namespace, site) {

        /* Struttura sezioni e pageName */
        if (s.isMobile()) {
            var s_path = s.cleanMobileURL();
            s_path = s_path.replace("/m/cds/notizie/dettaglio/", "/"); // allineamento path mobile
            s_path = s_path.replace("/m/cds/sezioni/", "/");
            s_path = s_path.replace("/m/cds", "");
            s_path = s_path.replace("/m/", "/");
            if (s_path == "/m") {
                s_path = "/"
            };
        } else {
            var s_path = window.location.pathname;
        }

        s_path = s_path.toLowerCase();
        s_path = s_path.replace("/index.shtml", "");
        s_path = s_path.replace("/", "");
        s_path = s_path.replace(/(-[0-9\.]*)*\.[a-z]*$/, "");
        s_path = s_path.replace(/\.[a-z]+$/, "");
        s_path = mobileDomainMatch ? s_path.replace(/([0-9a-zA-Z])+$/, "") : s_path.replace(/([0-9a-zA-Z])+-([0-9a-zA-Z])+-([0-9a-zA-Z])+-([0-9a-zA-Z])+-([0-9a-zA-Z])+$/, ""); // mobile only
        s_path = s_path.replace(/-+$/, "");

        var s_pagename = s_path;
        s_pagename = s_pagename.replace(/\/([0-9]+_[a-z]+_[0-9]+)/, "");
        s_pagename = s_pagename.replace(/\/([0-9]+-[0-9]+-[0-9]+)/, "");
        s_pagename = s_pagename.replace(/([0-9]+\/[0-9]+\/[0-9]+\/+)/, "");

        s_path = s_path.replace(/([0-9]+_[a-z]+_[0-9]+.*)/, "articoli");
        s_path = s_path.replace(/([0-9]+-[0-9]+-[0-9]+.*)/, "articoli");
        s_path = s_path.replace(/([0-9]+\/[0-9]+\/[0-9]+)/, "articoli");

        s.contextData[namespace + '.articleid'] = s.getArticleID();
        s.contextData[namespace + '.articledate'] = s.getArticleReleaseDate();

        var a_path = s_path.split("/");

        var s_host = window.location.host;
        s_host = s_host.replace("www.", "");

        var s_sitename = s_host.replace(site, namespace);
        s_sitename = s_sitename.toUpperCase();

        var sc_site = site;
        var a_host = s_host.split(".");

        if (a_host.length > 2) {
            a_path.reverse();
            for (var l_host = a_host.length - 3; l_host >= 0; l_host--) {
                a_path.push(a_host[l_host]);
            }
            a_path.reverse();
        }

        if (a_path[0] == "") sc_sezione = "homepage";
        else sc_sezione = a_path[0];

        if (typeof a_path[1] != "undefined") sc_sezione1 = a_path[1];
        if (typeof a_path[2] != "undefined") sc_sezione2 = a_path[2];
        if (typeof a_path[3] != "undefined") sc_sezione3 = a_path[3];

        s.contextData[namespace + '.nomePagina'] = s_sitename + "/" + s_pagename;
        s.contextData[namespace + '.site'] = sc_site;
        s.contextData[namespace + '.sezione'] = sc_sezione;

        if (typeof sc_sezione1 != "undefined") s.contextData[namespace + '.sezione1'] = sc_sezione1;
        if (typeof sc_sezione2 != "undefined") s.contextData[namespace + '.sezione2'] = sc_sezione2;

    }

    s.readURL(s, s._siteNameSpace, s._siteName);

    /* Check Tealium Status */
    var tms_lib_status = "";
    var tms_sync_status = "";
    var tms_omn_status = "";
    (typeof utag == "undefined") ?  tms_lib_status = "libreria assente" : tms_lib_status = "libreria attiva";
    (typeof utag_sync == "undefined") ? tms_sync_status = "sync assente": tms_sync_status = "sync attiva";
    (typeof omniture == "undefined") ? tms_omn_status = "oggetto assente": tms_omn_status = "oggetto definito";

    s.contextData[s._siteNameSpace + '.tealium_status'] = tms_sync_status + "|" + tms_lib_status + "|" + tms_omn_status;

    /* Blocchi Pubblicitari */
    typeof StartOxA !== "undefined" ? s.contextData[s._siteNameSpace + '.bloccoPub'] = "no" : s.contextData[s._siteNameSpace + '.bloccoPub'] = "si";

    /* Branded Content */

    if (window.location.pathname.search(/^\/native-adv\//) >= 0) {

        s.contextData[s._siteNameSpace + ".nomePagina"] = s._siteNameSpace.toUpperCase() + window.location.pathname.replace(/.html|.shtml/, "");
        /* Social Listener */

        if (s.checkJQ(jqLimit_mayor, jqLimit_minor)) {
            // header share
            jQuery('body').on('click', ".fb", function() {
                s.track_branded_action('Facebook|Header')
            });
            jQuery('body').on('click', ".tw", function() {
                s.track_branded_action('Twitter|Header')
            });
            jQuery('body').on('click', ".gplus", function() {
                s.track_branded_action('GooglePlus|Header')
            });
            jQuery('body').on('click', ".linkedin", function() {
                s.track_branded_action('LinkedIn|Header')
            });
            // body share
            jQuery('body').on('click', ".fa-facebook", function() {
                s.track_branded_action('Facebook|Body')
            });
            jQuery('body').on('click', ".fa-twitter", function() {
                s.track_branded_action('Twitter|Body')
            });
            jQuery('body').on('click', ".fa-linkedin", function() {
                s.track_branded_action('LinkedIn|Body')
            });
            jQuery('body').on('click', ".fa-google-plus", function() {
                s.track_branded_action('GooglePlus|Body')
            });
            // gallery view
            jQuery('body').on('click', ".slick-prev", function() {
                s.track_branded_action('Gallery|Previous')
            });
            jQuery('body').on('click', ".slick-next", function() {
                s.track_branded_action('Gallery|Next')
            });
        }


    }

    /* Incognito mode detection */

    s.incognitoMode = 'unknown';

    s.incognitoDetect = function() {

        // Chrome
        if (/chrome|chromium/i.test(window.navigator.userAgent) && /google inc/i.test(window.navigator.vendor)) {
            var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
            if (!fs) {
                return;
            };
            fs(window.TEMPORARY, 100, function(fs) {
                s.incognitoMode = 'false';
                $(document).trigger('IncognitoDetection');
            }, function(err) {
                s.incognitoMode = 'true';
                $(document).trigger('IncognitoDetection');
            });
            return;
        };

        // TODO: Android stock browser

        // Edge
        if (/edge/i.test(window.navigator.userAgent)) {
            typeof window.indexedDB == 'undefined' ? s.incognitoMode = 'true' : s.incognitoMode = 'false';
        };

        // Safari
        if (/safari/i.test(window.navigator.userAgent) && /apple computer/i.test(window.navigator.vendor)) {
            try {
                localStorage.incognitoMode = 2;
                s.incognitoMode = 'false';
            } catch (e) {
                s.incognitoMode = 'true';
            }
        };

        // Firefox
        if (/firefox/i.test(window.navigator.userAgent)) {

            var db = indexedDB.open('db_name');

            db.onsuccess = function() {
                s.incognitoMode = 'false';
                $(document).trigger('IncognitoDetection');
            };

            db.onerror = function() {
                s.incognitoMode = 'true';
                $(document).trigger('IncognitoDetection');
            }

        } else {
            $(document).trigger('IncognitoDetection');
        };

    };

    s.incognitoOutput = function() {

        var cookieDomain = location.hostname.split('.');
        cookieDomain = cookieDomain[cookieDomain.length -2] + '.' + cookieDomain[cookieDomain.length -1]

        var cookieString = 'incognitoMode=' + s.incognitoMode + " ;path=/; domain=" + cookieDomain;
        document.cookie = cookieString;
        
        s.contextData['user_incognito'] = s.incognitoMode;
    };

    $(document).on('IncognitoDetection', s.incognitoOutput);

    if (/incognitoMode=/i.test(document.cookie)) {
        s.incognitoMode = s.c_r('incognitoMode');
        s.contextData['user_incognito'] = s.incognitoMode;
    } else {
        s.incognitoDetect();
    }

    /* Fine Incongnito detection */

    /* Azioni Branded Content */
    s.track_branded_action = function(action) {
        s.proxy_linkTrackVars = s.linkTrackVars;
        s.proxy_linkTrackEvents = s.linkTrackEvents;
        s.sa(s.customLink_account);
        s.linkTrackVars = ""
        s.linkTrackEvents = ""
        s.contextData['branded_action_type'] = action;
        s.contextData['branded_action_event'] = "1";
        s.tl(this, 'o', 'Branded Action');
        s.linkTrackVars = s.proxy_linkTrackVars;
        s.linkTrackEvents = s.proxy_linkTrackEvents;
        s.sa(s_account);
    }

    /* Condivisione social */
    s.tracksocialshare = function(network) {
        s.proxy_linkTrackVars = s.linkTrackVars;
        s.proxy_linkTrackEvents = s.linkTrackEvents;
        s.sa(s.customLink_account);
        s.linkTrackVars = "eVar39,events"
        s.linkTrackEvents = "event34"
        s.eVar39 = network;
        s.events = "event34";
        s.tl(this, 'o', 'Social Sharing');
        s.linkTrackVars = s.proxy_linkTrackVars;
        s.linkTrackEvents = s.proxy_linkTrackEvents;
        s.sa(s_account);
        s.events = "";
        s.eVar39 = "";
    }


    /* Commenti */
    s.trackDiscussione = function(network) {
        if (s.contextData['cor.nomePagina'].search(/\/discussione/) < 0) s.contextData['cor.nomePagina'] += "/discussione";
        s.t();
    }

    /* Paywall */
    // Overlay
    s.trackPaywallOverlay = function() {
        s.sa(s.customTrack_account_pw);
        switch (s.getQueryParam("cat")) {
            case "1":
                var categorymuro = "freemium";
                break;
            case "2":
                var categorymuro = "postwall";
                break;
            case "3":
                var categorymuro = "premium";
                break;
            case "4":
                var categorymuro = "vas";
                break;
            default:
                var categorymuro = "";
        }
        s.pageName = "PAYWALL.COR/offer_overlay"
        if (categorymuro != "") {
            s.pageName = "PAYWALL.COR/offer_overlay_" + categorymuro;
        }

        var nomemuro = s.getQueryParam("cid");

        if ((nomemuro != "") && (categorymuro != "freemium")) {
            s.pageName = s.pageName + "/" + nomemuro;
        }

        s.channel = "Paywall";
        s.prop1 = "Offer overlay";
        s.prop2 = "Paywall";
        s.prop3 = "Paywall";
        s.prop43 = s.customTrack_account_pw;
    }


    // Login from Overlay
    s.trackPaywallLogin = function() {
        s.proxy_rs = s_account;
        s.sa(s.customTrack_account_pw); //CHANGE FOR STAGING AND PRODUCTION
        s.pageName = "PAYWALL.COR/login";
        s.channel = "Paywall";
        s.prop1 = "Login";
        s.prop2 = "Paywall";
        s.prop3 = "Paywall";
        s.prop43 = s.customTrack_account_pw;
        s.events = "event2";
        s.t();
        s.events = "";
        s.sa(s.proxy_rs);
    }

    // Post Login
    s.loginOk = function(source) {
        s.sa(s.customLink_account);
        s.linkTrackVars = 'events,eVar68';
        s.linkTrackEvents = 'event7';
        s.events = 'event7';
        s.eVar68 = source;
        s.tl(this, 'o', 'login ' + source);
        s.events = '';
    }

    // Trial Overlay
    s.trackTrialOffer = function() {
        s.sa(s.customTrack_account_pw); //CHANGE FOR STAGING AND PRODUCTION
        s.pageName = "PAYWALL.COR/trial/offer_overlay";
        s.channel = "Paywall";
        s.prop1 = "Trial";
        s.prop2 = "Offer overlay";
        s.prop3 = "Paywall";
        s.events = "event2";
        s.t();
        s.events = "";
        s.sa(s_account);
    }

    /* Form Analysis (Errors + Abandonment) */

    var hasUserSubmittedForm = false;
    var formIsValid = false;
    var formInteraction = false;
    var formErrorList = '';
    var lastFieldModified = '';
    var errPrivacy = '';


    function trackFormAnalysis(idForm) {

        // Add Form View Event
        s.events += ',event17';

        // Check for interaction
        if (s.checkJQ(jqLimit_mayor, jqLimit_minor)) {
            jQuery(":input:not(:submit)").on('change keypress', function() {
                if (this.name == 'chk_flag_tracking') {
                    lastFieldModified = 'TrialForm_tracking';
                } else {
                    lastFieldModified = 'TrialForm_' + this.name;
                }
                formInteraction = true;
            });
        }

        switch (idForm) {
            case "trial":

                // Submit listener
                jQuery('#submit.cta').click(function() {
                    hasUserSubmittedForm = true;
                    setTimeout(function() {
                        trackTrialFormErrors()
                    }, 1000);
                });

                break;

            default:
                return
        }


        jQuery(window).bind("unload", function() {
            trackFormAbandonment();
        });

        if (window.addEventListener) {
            window.addEventListener('beforeunload', function() {
                trackFormAbandonment();
            }, false);
        } else if (window.attachEvent) {
            window.attachEvent('onbeforeunload', function() {
                trackFormAbandonment();
            });
        }
    }

    function trackTrialFormErrors() {

        if (formInteraction == false) {
            return;
        }

        formErrorList = '';
        errPrivacy = '';
        s.sa(s.customLink_account_pw); //CHANGE FOR STAGING AND PRODUCTION

        s.linkTrackVars = "list2,events";
        s.linkTrackEvents = "event77";

        var formErrors = jQuery('#form_freetrial .invalid');

        // Privacy Radio Buttons
        if (jQuery('#privacyRCS-si').is(':checked') == false && jQuery('#privacyRCS-no').is(':checked') == false) errPrivacy += "TrialForm_privacyRCS" + "|";
        if (jQuery('#chk_flag_tracking-si').is(':checked') == false && jQuery('#chk_flag_tracking-no').is(':checked') == false) errPrivacy += "TrialForm_PrivacyTracking" + "|";
        if (jQuery('#privacyAltri-si').is(':checked') == false && jQuery('#privacyAltri-no').is(':checked') == false) errPrivacy += "TrialForm_privacyAltri" + "|";

        // Form is valid
        formIsValid = ((formErrors.length == 0) && (errPrivacy.length == 0));
        if (formIsValid) return;


        jQuery('#form_freetrial .invalid').each(function() {
            if (typeof this.name != 'undefined') formErrorList += 'TrialForm_' + this.name + '|';
            else if (typeof jQuery(this).attr('rel') != 'undefined') formErrorList += 'TrialForm_' + jQuery(this).attr('rel') + "|";
        });
        jQuery('.data-nascita.invalid').each(function() {
            formErrorList += 'TrialForm_' + 'dataNascita|';
        });
        jQuery('#form_freetrial div.col2 div.col.invalid').each(function() {
            formErrorList += 'TrialForm_' + jQuery(this).find('div').attr('rel') + "|";
        });


        // Checkbox Interessi/Argomenti
        var errorsInteressi = jQuery('.label.checkbox.invalid').attr('name', 'interessi').length;
        var errorsArgomenti = jQuery('.label.checkbox.invalid').attr('name', 'argomenti').length;
        if (errorsInteressi > 0) formErrorList += 'TrialForm_Interessi|';
        if (errorsArgomenti > 0) formErrorList += 'TrialForm_Argomenti|';

        formErrorList += errPrivacy;

        // Clean Error List
        if (formErrorList.slice(-1) == '|') formErrorList = formErrorList.substring(0, formErrorList.length - 1);

        s.list2 = formErrorList;
        s.events = 'event77';
        s.tl("true", 'o', 'Form Error');
        s.events = '';
        s.list2 = '';
        formInteraction = false;

        s.sa(s_account);

    }

    function trackFormAbandonment() {

        // Abandon without interaction
        if (formInteraction == false) {
            return;
        }
        s.events = '';
        s.sa(s.customLink_account_pw); //CHANGE FOR STAGING AND PRODUCTION
        s.linkTrackVars = "list2,events";
        s.linkTrackEvents = "event75,event76";
        if (hasUserSubmittedForm && formIsValid) {
            s.events = 'event76';
            s.tl("true", 'o', 'Form Success');
            return;
        }
        s.list2 = lastFieldModified;
        s.events = 'event75';
        s.tl("true", 'o', 'Form Abandonment');
        s.events = '';
        s.sa(s_account);

    }

    /* Commenti */
    s.trackSimpleAction = function(azione) {
        s.proxy_linkTrackVars = s.linkTrackVars;
        s.proxy_linkTrackEvents = s.linkTrackEvents;
        s.sa(s.customLink_account);
        s.linkTrackVars = '';
        s.linkTrackEvents = '';

        if (azione == 'vota commento') s.events = "event72";
        if (azione == 'invia commento') s.events = "event73";
        if (azione == 'carica altri contenuti') s.events = "event74";

        s.contextData['cor.action'] = azione;
        s.contextData['cor.' + azione] = 1;
        s.tl(this, 'o', azione);
        s.contextData['cor.action'] = "";
        s.contextData['cor.' + azione] = "";

        s.linkTrackVars = s.proxy_linkTrackVars;
        s.linkTrackEvents = s.proxy_linkTrackEvents;
        s.sa("rcsglobal");
        s.contextData['cor.action'] = "";
        s.events = "";
    }

    var islogged = false;

    islogged = s.c_r("rcsLogin");


    /*Social Share*/

    if (s.checkJQ(jqLimit_mayor, jqLimit_minor)) {
        // Homepage
        jQuery('body').on('click', ".popUp>.facebook", function() {
            s.tracksocialshare('facebook')
        });
        jQuery('body').on('click', ".popUp>.google", function() {
            s.tracksocialshare('googleplus')
        });
        jQuery('body').on('click', ".popUp>.passaparola", function() {
            s.tracksocialshare('passaparola')
        });
        jQuery('body').on('click', ".popUp>.twitter", function() {
            s.tracksocialshare('twitter')
        });
        jQuery('body').on('click', ".popUp>.whatsapp", function() {
            s.tracksocialshare('whatsapp')
        });
        //nuova homepage
        jQuery('body').on('click', ".socialbar_container .facebook", function() {
            s.tracksocialshare('facebook')
        });
        jQuery('body').on('click', ".socialbar_container .google", function() {
            s.tracksocialshare('googleplus')
        });
        jQuery('body').on('click', ".socialbar_container .passaparola", function() {
            s.tracksocialshare('passaparola')
        });
        jQuery('body').on('click', ".socialbar_container .twitter", function() {
            s.tracksocialshare('twitter')
        });
        jQuery('body').on('click', ".socialbar_container .whatsapp", function() {
            s.tracksocialshare('whatsapp')
        });
        jQuery('body').on('click', ".socialbar_container .linkedin", function() {
            s.tracksocialshare('whatsapp')
        });
        // Articoli
        jQuery('body').on('click', ".social_bar>.share.fb", function() {
            s.tracksocialshare('facebook')
        });
        jQuery('body').on('click', ".social_bar>.share.gp", function() {
            s.tracksocialshare('googleplus')
        });
        jQuery('body').on('click', ".social_bar>.share>.passaparola", function() {
            s.tracksocialshare('passaparola')
        });
        jQuery('body').on('click', ".social_bar>.share.tw", function() {
            s.tracksocialshare('twitter')
        });

        // Commenti Corriere
        if (islogged) {
            jQuery('body').on('click', '.sendButton', function() {
                s.trackSimpleAction('invia commento')
            })
            jQuery('body').on('click', '.action.vote', function() {
                s.trackSimpleAction('vota commento')
            })
        }
        jQuery('body').on('click', '.commentDiscussionLinks>a', function() {
            s.trackDiscussione()
        })
        jQuery('body').on('click', '.load-more-contributi', function() {
            s.trackSimpleAction('carica altri contenuti')
        })

        // Commenti cucina
        if (islogged) {
            jQuery('body').on('click', '.link-rating', function() {
                s.trackSimpleAction('vota commento')
            })
            jQuery('body').on('click', '#sendcomment>.submit', function() {
                s.trackSimpleAction('invia commento')
            })
        }
        jQuery('body').on('click', '.view-reply>a', function() {
            s.trackDiscussione()
        })

    }

    /* Pagina Ricerca Liste */

    var list_search = s.getQueryParam("prodotto_membership");
    var list_key = s.getQueryParam("campo_1");
    if (list_search == "lista") {
        s.prop13 = list_key.toLowerCase();
        s.eVar13 = s.prop13;
        s.prop19 = "Ricerca Liste";
        s.eVar19 = s.prop19;

        var t_search = s.getValOnce(s.eVar13, 'ev13_list_cor', 0);
        if (t_search) {
            s.events = s.apl(s.events, "event1", ",", 2);
        }
    }


    /* Device Detection */

    // iPhone
    s.iPhoneversion = function() {
        // detect iPhone 3
        if (window.screen.height == "480" && window.devicePixelRatio == 1) {
            s.prop52 = "iPhone3";
        }
        // detect iPhone 4
        if (window.screen.height == "480" && window.devicePixelRatio == 2) {
            s.prop52 = "iPhone4";
        }
        // detect iPhone 5
        if (window.screen.height == "568" && window.devicePixelRatio == 2) {
            s.prop52 = "iPhone5";
        }
        // detect iPhone 6
        if (window.screen.height == "667" && window.devicePixelRatio == 2) {
            s.prop52 = "iPhone6";
        }
        // detect iPhone 6 plus
        if (window.screen.height == "736" && window.devicePixelRatio == 3) {
            s.prop52 = "iPhone6 plus";
        }

    }
    if (navigator.userAgent.match(/iPhone/i)) {
        s.iPhoneversion();
    }

    // iPad
    s.iPadversion = function() {
        var version = "";

        if (window.devicePixelRatio >= 2) {
            version = " retina"
        } else {
            version = " non retina";
        }
        s.prop52 = "iPad" + version;
    }
    if (navigator.userAgent.match(/iPad/i)) {
        s.iPadversion();
    }

    /* Track Setup Link Track */
    s.linkIDpreviousValue = "";
    // la variabile previene la duplicazione di chiamate
    s.trackSLT = function(prop49, prop50, destination) {
        s.prop49 = prop49.toLowerCase();
        s.prop50 = prop50.toLowerCase();
        if (destination === "ext") {
            s.proxy_linkTrackVars = s.linkTrackVars;
            s.proxy_linkTrackEvents = s.linkTrackEvents;
            s.proxy_rs = s_account;
            s.sa(s.customLink_account);
            s.usePlugins = false;
            s.linkTrackVars = "prop49,prop50";
            // deduplicazione
            if (s.prop49 != s.linkIDpreviousValue) s.tl(this, "o", s.prop49);
            s.usePlugins = true;
            s.linkTrackVars = s.proxy_linkTrackVars;
            s.linkTrackEvents = s.proxy_linkTrackEvents;
            s.linkIDpreviousValue = s.prop49;
            s.prop49 = '';
            s.prop50 = '';
            s.sa(s.proxy_rs);
        }
    }

    /* Funzione Get Cookie */
    function getCookie(key) {
        var cookieValue = null;

        if (key) {
            var cookieSearch = key + "=";

            if (document.cookie) {
                var cookieArray = document.cookie.split(";");
                for (var i = 0; i < cookieArray.length; i++) {
                    var cookieString = cookieArray[i];

                    // skip past leading spaces
                    while (cookieString.charAt(0) == ' ') {
                        cookieString = cookieString.substr(1);
                    }

                    // extract the actual value
                    if (cookieString.indexOf(cookieSearch) == 0) {
                        cookieValue = cookieString.substr(cookieSearch.length);
                    }
                }
            }
        }

        return cookieValue;
    }


    (function() {

        // Login detection
        var logged = false;

        logged = getCookie("rcsLogin");

        s.prop15 = (logged ? "" : "not ") + "logged in";

        var rcsTR = null;

        rcsTR = getCookie("rcsTR");

        if (rcsTR != null && rcsTR != "") {
            var arrRcsTR = rcsTR.split("|");

            var idRuna = arrRcsTR[0];
            var genere = arrRcsTR[1];
            var eta = arrRcsTR[2];
            var prov = arrRcsTR[3];
            var state = arrRcsTR[4];

            //ID RUNA
            if (idRuna != "") {
                if (!isNaN(idRuna)) {
                    s.prop65 = idRuna;
                    s.eVar65 = idRuna;
                } else {
                    s.prop65 = "";
                    s.eVar65 = "";
                }
                // Genere
                if (genere != "") {
                    s.prop62 = genere;
                    s.eVar62 = genere;
                } else {
                    s.prop62 = "ND";
                    s.eVar62 = "ND";
                }
                // Eta'
                if (eta != "") {
                    s.prop63 = eta;
                    s.eVar63 = eta;
                } else {
                    s.prop63 = "ND";
                    s.eVar63 = "ND";
                }
                // Provincia
                if (prov == "") {
                    s.prop64 = "ND";
                    s.eVar64 = "ND";
                } else {
                    s.prop64 = prov;
                    s.eVar64 = prov;
                }
                // Stato
                if (prov == "ES") {
                    s.prop67 = "ND";
                    s.eVar67 = "ND";
                } else {
                    s.prop67 = "IT";
                    s.eVar67 = "IT";
                }
            } else {
                // Genere
                if (genere != "") {
                    s.prop62 = genere;
                    s.eVar62 = genere;
                } else {
                    s.prop62 = "ND";
                    s.eVar62 = "ND";
                }
                // Eta'
                if (eta != "") {
                    s.prop63 = eta;
                    s.eVar63 = eta;
                } else {
                    s.prop63 = "ND";
                    s.eVar63 = "ND";
                }
                // Provincia
                if (prov == "") {
                    s.prop64 = "ND";
                    s.eVar64 = "ND";
                } else if (state == "IT" || state == "" || !state) {
                    s.prop64 = prov;
                    s.eVar64 = prov;
                } else {
                    s.prop64 = "EE";
                    s.eVar64 = "EE";
                }
                // Stato
                if (state != "") {
                    s.prop67 = state;
                    s.eVar67 = state;
                } else {
                    s.prop67 = "ND";
                    s.eVar67 = "ND";
                }
            }

        }

        function stringContains() {
            // Funzione di utilita che accetta piu espressioni regolari come
            // parametri e controlla se almeno una di esse corrisponde alla stringa.
            // Restituisce true oppure false.
            // Esempio: if (stringa.contains("pippo.shtml", "pluto.html$")) { ... }
            var myString = this;
            var result = false;
            jQuery.each(arguments, function() {
                myRegExp = new RegExp(this.replace(".", "\."), "gim");
                if (myRegExp.test(myString)) {
                    result = true;
                    return false; // stoppiamo l'iterazione al primo match
                }
            })
            return result;
        }

        String.prototype.contains = stringContains;

        // Mappa URL --> eventi
        var pageUrl = document.location.href;

        if (pageUrl.contains("login\=ok$")) {
            var isFirstLogincorriere = s.getValOnce('logincorriere', 'e7_logincorriere', 0);
            if (isFirstLogincorriere) {
                //s.events=s.apl(s.events,"event7",",",2);
            }
        }

        if (pageUrl.contains("accesso\/ConfermaEmail.do")) {
            var isFirstRegistrationcorriere = s.getValOnce('registrationcorriere', 'e3_registrationcorriere', 0);
            if (isFirstRegistrationcorriere) {
                s.events = s.apl(s.events, "event3", ",", 2);
            } else {
                s.events = "event3";
            }
            s.pageName = "COR/registrazione/step3";
            s.eVar68 = "Corriere";
        }

        // Buca ricerca top 
        if (pageUrl.contains("sitesearch.corriere.it\/forward.jsp")) {
            if (pageUrl.contains("q\=")) {
                if (pageUrl.contains("login\=ok$")) {} else {
                    if (!s.prop13) {
                        s.prop13 = s.getQueryParam('q');
                        if (s.prop13) {
                            s.prop19 = "Cerca in Corriere";
                            s.eVar19 = s.prop19;
                            s.prop13 = s.prop13.toLowerCase();
                            s.eVar13 = s.prop13;
                            var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                            if (t_search) {
                                s.events = s.apl(s.events, "event1", ",", 2);
                            }
                        }
                    }
                }
            }
        }

        // Buca ricerca finanza
        if (pageUrl.contains("borsa.corriere.it")) {
            if (!s.prop13) {
                s.prop13 = s.getQueryParam('SH2_SPPAR1');
                if (s.prop13 == "Cerca azioni e fondi") {
                    s.prop13 = "nessuna parola cercata"
                };
                if (s.prop13) {
                    s.prop19 = "Economia e finanza";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Dizionari
        if (pageUrl.contains("dizionari.corriere.it")) {
            s.pageName = "DIZIONARI.COR/";
            if (pageUrl.contains("dizionario_italiano")) s.pageName = "DIZIONARI.COR/dizionario_italiano/";
            if (pageUrl.contains("dizionario_inglese")) s.pageName = "DIZIONARI.COR/dizionario_inglese/";
            if (pageUrl.contains("cgi-bin\/sansing")) s.pageName = "DIZIONARI.COR/dizionario_inglese/";
            if (pageUrl.contains("dizionario_francese")) s.pageName = "DIZIONARI.COR/dizionario_francese/";
            if (pageUrl.contains("cgi-bin\/zanfra")) s.pageName = "DIZIONARI.COR/dizionario_francese/";
            if (pageUrl.contains("dizionario_tedesco")) s.pageName = "DIZIONARI.COR/dizionario_tedesco/";
            if (pageUrl.contains("cgi-bin\/sansted")) s.pageName = "DIZIONARI.COR/dizionario_tedesco/";
            if (pageUrl.contains("cgi-bin\/zanspa")) s.pageName = "DIZIONARI.COR/dizionario_spagnolo/";
            if (pageUrl.contains("dizionario_spagnolo")) s.pageName = "DIZIONARI.COR/dizionario_spagnolo/";
            if (pageUrl.contains("dizionario_sinonimi_contrari")) s.pageName = "DIZIONARI.COR/dizionario_sinonimicontrari/";
            if (pageUrl.contains("cgi-bin\/sincontr")) s.pageName = "DIZIONARI.COR/dizionario_sinonimicontrari/";
            if (pageUrl.contains("dizionario-modi-di-dire")) s.pageName = "DIZIONARI.COR/dizionario_modididire/";
            if (pageUrl.contains("dizionario-citazioni")) s.pageName = "DIZIONARI.COR/dizionario_citazioni/";
            if (pageUrl.contains("dizionario-si-dice")) s.pageName = "DIZIONARI.COR/dizionario_sidice";
        }

        // Ricerca auto
        if (pageUrl.contains("Automobili\/ricercaAnnuncio.do")) {

            if (!s.prop13) {

                var marca = s.getQueryParam('idMarca');
                var modello = s.getQueryParam('idVersione');
                var minPrezzo = s.getQueryParam('minPrezzo');
                var maxPrezzo = s.getQueryParam('maxPrezzo');
                s.prop13 = marca + ',' + modello + ',' + minPrezzo + ',' + maxPrezzo;
                if (s.prop13) {
                    s.prop19 = "Automobili";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Ricerca casa
        if (pageUrl.contains("trovocasa.corriere.it\/annunci\/RicercaAnnunciDaCorriere.do")) {

            if (!s.prop13) {
                var tipoAnnuncio = s.getQueryParam('tipoAnnuncio');
                var categoriaImmobile = s.getQueryParam('categoriaImmobile');
                var idprovincia = s.getQueryParam('idprovincia');
                var idcomune = s.getQueryParam('idcomune');
                var tipoImmobile = s.getQueryParam('tipoImmobile');
                s.prop13 = tipoAnnuncio + ',' + categoriaImmobile + ',' + idprovincia + ',' + idcomune + ',' + tipoImmobile;
                if (s.prop13) {
                    s.prop19 = "TrovoCasa";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Ricerca lavoro
        if (pageUrl.contains("lavoro.corriere.it\/jobs\/default.aspx")) {
            if (!s.prop13) {
                s.prop13 = s.getQueryParam('Body');
                if (s.prop13) {
                    s.prop19 = "TrovoLavoro";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Ricerca libri
        if (pageUrl.contains("cerca-libri.aspx")) {
            if (!s.prop13) {
                s.prop13 = s.getQueryParam('query');
                if (s.prop13) {
                    s.prop19 = "Cerca libri";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Ricerca archivio storico
        if (pageUrl.contains("archiviostorico.corriere.it")) {
            s.pageName = "ARCHIVIOSTORICO.COR/";
            s.prop39 = jQuery('title').text();
        }

        if (pageUrl.contains("searchresultsArchivio.jsp")) {
            if (!s.prop13) {
                s.prop13 = s.getQueryParam('cosa_cercare');
                if (s.prop13) {
                    s.prop19 = "Cerca archivio storico";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Ricerca viaggi
        if (pageUrl.contains("viaggi.corriere.it\/ricerca")) {
            if (!s.prop13) {
                s.prop13 = s.getQueryParam('q');
                if (s.prop13 == "") {
                    s.prop13 = "nessuna parola cercata";
                }
                if (s.prop13) {
                    s.prop19 = "Cerca viaggi";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Ricerca motori
        if (pageUrl.contains("trovamotori.do")) {
            if (!s.prop13) {
                s.prop13 = s.getQueryParam('parolachiave');
                if (s.prop13) {
                    s.prop19 = "Cerca motori";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Ricerca ricette
        if (pageUrl.contains("\/cucina.corriere.it\/ricerca\/ricetta.htm")) {
            if (!s.prop13) {
                s.prop13 = s.getQueryParam('q');
                if (s.prop13 == "") {
                    s.prop13 = "nessuna parola cercata";
                }
                if (s.prop13) {
                    s.prop19 = "Cerca ricette";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Ricerca vini
        if (pageUrl.contains("\/cucina.corriere.it\/ricerca\/vini.htm")) {
            if (!s.prop13) {
                s.prop13 = s.getQueryParam('q');
                if (s.prop13 == "") {
                    s.prop13 = "nessuna parola cercata";
                }
                if (s.prop13) {
                    s.prop19 = "Cerca vini";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        //ricerca prodotti tipici
        if (pageUrl.contains("\/cucina.corriere.it\/ricerca\/tipici.htm")) {
            if (!s.prop13) {
                s.prop13 = s.getQueryParam('q');
                if (s.prop13 == "") {
                    s.prop13 = "nessuna parola cercata";
                }
                if (s.prop13) {
                    s.prop19 = "Cerca prodotti tipici";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Trova cinema
        if (pageUrl.contains("trovocinema")) {
            if (!s.prop13) {
                var provincia = s.getQueryParam('trovocinema.provincia');
                var comune = s.getQueryParam('trovocinema.idComune');
                var film = s.getQueryParam('trovocinema.idFilm');
                var genere = s.getQueryParam('trovocinema.genere');
                var cinema = s.getQueryParam('trovocinema.idCinema');
                s.prop13 = provincia + ' ' + comune + ' ' + film + ' ' + genere + ' ' + cinema;
                if (s.prop13) {
                    s.prop19 = "Cerca cinema";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Trova film
        if (pageUrl.contains("trovofilm.action")) {
            if (!s.prop13) {
                var titolo = s.getQueryParam('film.titolo');
                var genere = s.getQueryParam('film.genere');
                var regista = s.getQueryParam('film.regista');
                var attore = s.getQueryParam('film.attore');
                s.prop13 = titolo + ' ' + genere + ' ' + regista + ' ' + attore;
                if (s.prop13) {
                    s.prop19 = "Cerca film";
                    s.eVar19 = s.prop19;
                    s.prop13 = s.prop13.toLowerCase();
                    s.eVar13 = s.prop13;
                    var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                    if (t_search) {
                        s.events = s.apl(s.events, "event1", ",", 2);
                    }
                }
            }
        }

        // Corriere tv
        if (pageUrl.contains("video.corriere.it")) {
            if (pageUrl.contains("search.shtml")) {
                if (!s.prop13) {
                    s.prop13 = s.getQueryParam('q');
                    if (s.prop13 == "") {
                        s.prop13 = "nessuna parola cercata";
                    }
                    if (s.prop13) {
                        s.prop19 = "Cerca Corriere Tv";
                        s.eVar19 = s.prop19;
                        s.prop13 = s.prop13.toLowerCase();
                        s.eVar13 = s.prop13;
                        var t_search = s.getValOnce(s.eVar13, 'ev13_GZ', 0);
                        if (t_search) {
                            s.events = s.apl(s.events, "event1", ",", 2);
                        }
                    }
                }
            }
        }

        /******* Inizio - Tracciamento correlati *******/

        var relatedItems = {

            init: function() {

                var functionnotcalled = true;
                if (typeof sc_sezione !== "undefined") {
                    if (sc_sezione == "foto-gallery" || sc_sezione == "articoli") {
                        this.setrightrelatedTrack(sc_sezione);
                        functionnotcalled = false;
                    }
                }
                if (typeof sc_sezione1 !== "undefined") {
                    if ((sc_sezione1 == "articoli" || sc_sezione1 == "foto-gallery") && functionnotcalled) {
                        this.setrightrelatedTrack(sc_sezione1);
                        functionnotcalled = false;
                    }
                }

                if (typeof sc_sezione2 !== "undefined") {
                    if ((sc_sezione2 == "articoli" || sc_sezione2 == "foto-gallery") && functionnotcalled) {
                        this.setrightrelatedTrack(sc_sezione2);
                        functionnotcalled = false;
                    }
                }
                if (typeof sc_sezione3 !== "undefined") {
                    if ((sc_sezione3 == "articoli" || sc_sezione3 == "foto-gallery") && functionnotcalled) {
                        this.setrightrelatedTrack(sc_sezione3);
                        functionnotcalled = false;
                    }
                }


                if (location.host.split(".")[0] == "video") {
                    this.setvideorelatedmostviewed();
                }
            },
            setrightrelatedTrack: function(sez) {
                if (jQuery("aside.as_art_right").length > 0) {

                    jQuery(".openx-wrapper").each(function() {
                        jQuery(this).mousedown(function() {
                            s.linkTrackVars = "prop49,prop50";
                            bb_semaforo = true;
                            s.prop49 = "correlato-contenuto-pubblicitario";
                            s.prop50 = sez + ":correlati-colonna-destra";
                            s.sa(s.customLink_account);
                            s.tl(this, "o", s.prop49);
                            s.sa("rcsglobal");
                            bb_semaforo = false;
                        });
                    });

                    var bb_rightrelated = jQuery("article.bk_art_008", "aside.as_art_right");
                    var bb_rightrelatedlength = bb_rightrelated.length;
                    var bb_linkinsiderelated = "";
                    var bb_linkinsiderelatedlength = "";
                    var setuplinkvalue = "";

                    for (var i = 0; i < bb_rightrelatedlength; i++) {
                        bb_linkinsiderelated = jQuery(bb_rightrelated[i]).find("a");
                        bb_linkinsiderelatedlength = bb_linkinsiderelated.length;
                        var namevalue = "";
                        for (var j = 0; j < bb_linkinsiderelatedlength; j++) {
                            i += 1;
                            setuplinkvalue = "&lid=correlato-box" + i + "&lpos=" + sez + ":correlati-colonna-destra";
                            if (typeof jQuery(bb_linkinsiderelated[j]).attr("name") != "undefined") {
                                namevalue = jQuery(bb_linkinsiderelated[j]).attr("name");
                                setuplinkvalue += namevalue;
                            }
                            jQuery(bb_linkinsiderelated[j]).attr("name", setuplinkvalue);
                            i -= 1;
                        }
                    }
                }
                this.setmostrelatedTrack(sez);
            },
            setmostrelatedTrack: function(sez) {

                if (jQuery("aside.as_art_right").length > 0) {

                    var wrappers = jQuery(".listing", "div#tabs");
                    var bb_linkinsiderelated = "";
                    var bb_linkinsiderelatedlength = "";
                    var setuplinkvalue = "";

                    jQuery(wrappers).each(function() {
                        var relatedelems = jQuery(this).find(".bk_art_009");
                        var relatedelemslength = relatedelems.length;
                        var k = 0;
                        var links = "";

                        for (k = 0; k < relatedelemslength; k++) {
                            links = jQuery(relatedelems[k]).find("a");
                            k += 1;
                            setuplinkvalue = "&lid=correlato-" + jQuery(this).attr('id') + "-box" + k + "&lpos=" + sez + ":i-piu-letti";

                            for (var y = 0; y < links.length; y++) {
                                if (typeof jQuery(links[y]).attr("name") != "undefined") {
                                    namevalue = jQuery(links[y]).attr("name");
                                    setuplinkvalue += namevalue;
                                }
                                jQuery(links[y]).attr("name", setuplinkvalue);
                                k -= 1;
                            }
                        }
                    });
                }
                this.setoutbrainrelated(sez);
            },
            setoutbrainrelated: function(sez) {

                /**** tracciamento outbrain correlati ****/
                var otherlinkoutbrain = jQuery(".ob_container_recs .item-container", ".OUTBRAIN");

                if (otherlinkoutbrain.length > 0) {
                    var typeofoutbrainlink = jQuery(".ob_org_header").html().toLowerCase();

                    jQuery(otherlinkoutbrain).each(function(index) {

                        jQuery(this).mousedown(function() {
                            var imgrelated = jQuery(this).find("img");
                            s.linkTrackVars = "prop49,prop50";
                            bb_semaforo = true;
                            if (imgrelated.parent().next().hasClass("paid-distribution")) {
                                s.prop49 = "correlato-contenuto-pubblicitario";
                            } else {
                                index += 1;
                                s.prop49 = "correlato-outbrain-box" + index;
                                index -= 1;
                            }
                            if (sez == "video") {
                                s.prop50 = "video:outbrain-" + typeofoutbrainlink;
                            } else {
                                s.prop50 = sez + ":outbrain";
                            }
                            s.sa(s.customLink_account);
                            s.tl(this, "o", s.prop49);
                            s.sa(s_account);
                            //setto a false il semaforo altrimenti non verrebbe eseguita la setuplinktrack dopo un custom link
                            bb_semaforo = false;
                        });
                    });
                }
            },
            setvideorelatedmostviewed: function() {
                /**** i piu visti video ****/

                var videomostwatched = jQuery("div.single-most-line");
                var linkelem = "",
                    k;
                var namevalue = "";


                if (videomostwatched.length > 0) {
                    jQuery(videomostwatched).each(function(index) {
                        linkelem = jQuery(this).find("a");
                        index += 1;
                        var setuplinkvalue = "&lid=correlato-box" + index + "&lpos=video:i-piu-visti";
                        index -= 1;
                        for (k = 0; k < linkelem.length; k++) {
                            if (typeof jQuery(linkelem[k]).attr("name") != "undefined") {
                                namevalue = jQuery(linkelem[k]).attr("name");
                                setuplinkvalue += namevalue;
                            }
                            jQuery(linkelem[k]).attr("name", setuplinkvalue);
                        }
                    });
                }
                this.setvideorelatedcontent();
            },
            setvideorelatedcontent: function() {
                /****Video correlati ****/
                var carouselbox = jQuery(".carousel-inner div.item", ".leaf-video-carousel");
                var typeofrelated = jQuery(".corr-title", ".leaf-video-carousel").html();
                typeofrelated = jQuery.trim(typeofrelated);
                var linkElements = "",
                    singlebox, titlebox, infobox;

                if (carouselbox.length > 0) {
                    jQuery(carouselbox).each(function(index, value) {
                        singlebox = jQuery(".single-carousel-video", jQuery(this));

                        for (var k = 0; k < singlebox.length; k++) {
                            linkElements = jQuery(singlebox[k]).find("div.video-image a");
                            titlebox = jQuery(singlebox[k]).find("div.video-title a");
                            infobox = jQuery(singlebox[k]).find("div.section-info a");
                            k += 1;
                            var setuplinkvalue = "&lid=correlato-box" + k + "&lpos=video:" + typeofrelated;
                            jQuery(titlebox).attr("name", setuplinkvalue);
                            jQuery(infobox).attr("name", setuplinkvalue);
                            for (var i = 0; i < linkElements.length; i++) {
                                if (typeof jQuery(linkElements[i]).attr("name") != "undefined") {
                                    var namevalue = jQuery(linkElements[i]).attr("name");
                                    setuplinkvalue += namevalue;
                                }
                                jQuery(linkElements[i]).attr("name", setuplinkvalue);
                            }
                            k -= 1;
                        }
                    });
                }
                this.setoutbrainrelated("video");
            }
        };

        jQuery(window).load(function() {
            relatedItems.init();
        });

        /******* Fine - Tracciamento correlati *******/

        /******* Inizio - Tracciamento HP Corriere.it *******/

        /* Tracciamento menu Top Bar */

        // Menu Sezioni 1° Livello
        jQuery(".topbar-links>li>a").attr("name", function() {
            if (this.title.toLowerCase() == "trovocasa" || this.title.toLowerCase() == "trovolavoro" || this.title.toLowerCase() == "archivio") {
                jQuery(this).click(function() {
                    s.trackSLT(this.title.toLowerCase(), "topbar-main", "ext");
                });
            } else {
                return "&lid=" + this.title.toLowerCase() + "&lpos=topbar-main";
            }
        });

        // Menu Sezioni 1° Livello
        jQuery("#menu-v>li>a").attr("name", function() {
            if (jQuery(this).attr("href") == "//video.corriere.it") {
                var lidtv = "corriere-tv";
                return "&lid=" + lidtv + "&lpos=topbar-sezioni";
            } else {
                return "&lid=" + this.title.toLowerCase() + "&lpos=topbar-sezioni";
            }
        });

        // Menu Sezioni 2° Livello
        jQuery("#menu-v>li>ul>li>a").attr("name", function() {
            var liv1 = $(this).closest('ul').prev('a').attr('title');
            return "&lid=" + liv1 + '|' + this.title.toLowerCase() + "&lpos=topbar-sezioni";
        });

        // Menu Sezioni 3° Livello
        jQuery("#menu-v>li>ul>li>ul>li>a").attr("name", function() {
            var liv2 = $(this).closest('ul').prev('a').attr('title');
            var liv2_ref = $(this).closest('ul').prev('a');
            var liv1 = $(liv2_ref).closest('ul').prev('a').attr('title');
            return "&lid=" + liv1 + '|' + liv2 + '|' + this.title.toLowerCase() + "&lpos=topbar-sezioni";
        });

        // Menu Edizioni Locali
        jQuery("#menu-city>li>a").attr("name", function() {
            if (this.title === '') return; // escaping placeholders
            return "&lid=" + this.title.toLowerCase().toLowerCase() + "&lpos=topbar-edlocali";
        });

        // Menu Edizioni Locali 2° Livello
        jQuery("#menu-city>li>ul>li>a").attr("name", function() {
            liv1 = $(this).closest('ul').prev('a').text().toLowerCase(); // globale
            return "&lid=" + liv1 + '|' + this.title.toLowerCase() + "&lpos=topbar-edlocali";
        });

        // Menu Servizi
        jQuery("#menu-servizi>li>a").click(function() {
            s.trackSLT(this.title, "topbar-servizi", "ext");
        });

        /* Menu Mobile Top */
        jQuery("#nav_mobile>li:not([class])>a").attr("name", function() {
            var lid = jQuery(this).text().toLowerCase();
            if (lid == "archivio") {
                jQuery(this).click(function() {
                    s.trackSLT("archivio", "mobile_topbar-archivio", "ext");
                });
            } else if (jQuery(this).attr("href").search(/video.corriere.it/) >= 0) {
                jQuery(this).click(function() {
                    s.trackSLT("corriere-tv", "mobile_topbar-corriere-tv", "ext");
                });
            } else {
                return "&lid=" + lid + "&lpos=mobile_topbar-" + lid;
            }
        });

        // Menu Sezioni 2° Livello Mobile
        jQuery("#nav_mobile>li:not([class])>ul>li>a").click(function() {
            var liv1 = $(this).closest('ul').prev('a').attr('title') ? $(this).closest('ul').prev('a').attr('title') : $(this).closest('ul').prev('a').text();
            var title = this.title ? this.title : jQuery(this).text();
            s.trackSLT(liv1 + "|" + title, "mobile_topbar-" + title, "ext"); //TODO
        });

        // Menu Servizi 3° Livello
        jQuery("#nav_mobile>li>ul>li>ul>li>a").attr("name", function() {
            var liv2_ref = $(this).closest('ul').prev('a');
            var liv2 = $(liv2_ref).title ? $(liv2_ref).title : $(liv2_ref).text();
            var liv1 = $(liv2_ref).closest('ul').prev('a').text();
            var title = this.title != "" ? this.title : jQuery(this).text();
            return "&lid=" + liv1 + '|' + liv2 + '|' + title + "&lpos=mobile_topbar-" + title.toLowerCase();
        });

        /* Menu Mobile Bottom */
        jQuery('#container-pager>span:not(".countNum") a').click(function() {
            s.trackSLT(jQuery(this).text().toLowerCase().replace(/\W/g, ""), "footer-bar", "ext");
        });

        /* Fine tracciamento menu */

        /* Approfondimenti ed inchieste */
        jQuery(window).load(function() {
            jQuery(".side_content a").attr("name", function() {
                return "&lid=approfondimenti_e_inchieste&lpos=side_content-approfondimenti_e_inchieste";
            });
        });

        jQuery(window).load(function() {
            jQuery(".md_appr h1 a").attr("name", function() {
                return "&lid=approfondimenti_e_inchieste&lpos=mobile_content-approfondimenti_e_inchieste";
            });
        });

        /* Blog multiautore */
        jQuery(window).load(function() {
            jQuery(".md_bx_c5 a").attr("name", function() {
                return "&lid=blog_multiautore&lpos=side_content-blog_multiautore";
            });
        });

        /* Editoriali e commenti */
        jQuery(".md_firme_3col a").attr("name", function() {
            return "&lid=editoriali_e_commenti&lpos=right_sidebar-editoriali_e_commenti";
        });

        jQuery(".swiper-slide .md_firme_3col a").attr("name", function() {
            return "&lid=editoriali_e_commenti&lpos=mobile_content-editoriali_e_commenti";
        });

        /* Sezioni del corriere */
        jQuery(".md_sez_bottom a").attr("name", function() {
            return "&lid=sezioni_del_corriere&lpos=content-sezioni_del_corriere";
        });

        /* Docuweb */
        jQuery(window).load(function() {
            jQuery("#terzacolonna2 .md_bx_c3 a").attr("name", function() {
                return "&lid=docuweb&lpos=right_sidebar-docuweb";
            });
        });

        /******* Fine - Tracciamento HP Corriere.it *******/

        /******* Inizio - Questa tipologia di correlati sara' dismessa *******/

        // Correlati ("ti potrebbero interessare anche")

        if (jQuery('.bk_art_010').length > 0) {
            jQuery('.bk_art_010>a').attr('name', function() {
                return "&lid=" + this.title.toLowerCase() + "&lpos=correlati"
            });
            jQuery('.bk_art_010>h5>a').attr('name', function() {
                return "&lid=" + this.title.toLowerCase() + "&lpos=correlati"
            });
        }

        /******* Fine - Questa tipologia di correlati sara' dismessa *******/
        // Link ID e link POS
        jQuery("div.homearticle-box, div#edicola-testo, div.ricerca-web").each(function(i, item) {
                var numeratore = ++i;
                var classeContenitore = jQuery(item).attr("class") + " = ";
                jQuery(item)
                    .attr("rel", classeContenitore + numeratore)
                    .find("a[href]")
                    .each(function(i, item) {
                        var linkName = ["&lid="];
                        if (jQuery(this).attr("href").length < 100) {
                            linkName.push(jQuery(this).attr("href").replace(/http\:\/\//i, ""))
                        } else {
                            var thisUrl = jQuery(this).attr("href").replace(/http\:\/\//i, "");
                            linkName.push(thisUrl.slice(0, 48), "...", thisUrl.slice((thisUrl.length - 48), thisUrl.length));
                        }
                        linkName.push("&lpos=", classeContenitore, numeratore, "__link-position = ", ++i);
                        jQuery(item).attr("name", linkName.join(""));
                    }) // fine each() a
            }) // fine each() div.news-block

        jQuery("div#home-2col ul.zappingnews li").each(function(j, item) {
                var numeratore = ++j;
                var classeContenitore = jQuery(item).attr("class") + " = ";
                jQuery(item)
                    .attr("rel", classeContenitore + numeratore)
                    .find("a[href]")
                    .each(function(j, item) {
                        var linkName = ["&lid="];
                        if (jQuery(this).attr("href").length < 100) {
                            linkName.push(jQuery(this).attr("href").replace(/http\:\/\//i, ""))
                        } else {
                            var thisUrl = jQuery(this).attr("href").replace(/http\:\/\//i, "");
                            linkName.push(thisUrl.slice(0, 48), "...", thisUrl.slice((thisUrl.length - 48), thisUrl.length));
                        }
                        linkName.push("&lpos=", "Zapping News Box = ", numeratore, "__link-position = ", ++j);
                        jQuery(item).attr("name", linkName.join(""));
                    }) // fine each() a
            }) // fine each() div.news-block


        jQuery("div.vaschetta3col div.colonna").each(function(z, item) {
                var numeratore = ++z;
                var classeContenitore = jQuery(item).attr("class") + " = ";
                jQuery(item)
                    .attr("rel", classeContenitore + numeratore)
                    .find("a[href]")
                    .each(function(z, item) {
                        var linkName = ["&lid="];
                        if (jQuery(this).attr("href").length < 100) {
                            linkName.push(jQuery(this).attr("href").replace(/http\:\/\//i, ""))
                        } else {
                            var thisUrl = jQuery(this).attr("href").replace(/http\:\/\//i, "");
                            linkName.push(thisUrl.slice(0, 48), "...", thisUrl.slice((thisUrl.length - 48), thisUrl.length));
                        }
                        linkName.push("&lpos=", classeContenitore, numeratore, "__link-position = ", ++z);
                        jQuery(item).attr("name", linkName.join(""));
                    }) // fine each() a
            }) // fine each() div.news-block
    })();

    /* Funzioni STD Ajax/JQuery */

    function resetVars() {
        //reset variabili motori di ricerca
        s.eVar45 = "";
        s.eVar46 = "";
        s.eVar47 = "";
        s.eVar48 = "";
        s.eVar49 = "";
        s.prop50 = "";
    }

    function AjaxPageTrack(pagename) {
        resetVars();
        s.prop71 = "";
        if (typeof pagename != "undefined") {
            if (pagename == "adv_infragallery" || pagename == "adv_slider" || pagename == "adv_refresh") {
                s.prop71 = pagename
            } else {
                s.pageName = pagename;
            }
        }

        // settaggio variabili
        s.referrer = s.pageURL;

        var ref = document.location.href;
        track_URL = decodeURI(ref + "&refresh_ce-awe");
        s.pageURL = track_URL;

        // chiamata a metrics
        void(s.t());

        // chiamata Nielsen
        if (jQuery("#nielsen_chk_img").length == 0) {
            jQuery("body").append("<img id='nielsen_chk_img'>");
        }

        randomnumber_nielsen = Math.floor((Math.random()) * 10000000000000);
        track_URL = decodeURI(ref) + "%26refresh_ce-awe";
        jQuery("#nielsen_chk_img").attr("src", "//secure-it.imrworldwide.com/cgi-bin/m?rnd=" + randomnumber_nielsen + "&ci=rcs-it&cg=0&si=" + track_URL);
    }

    /* Corriere PLUS: Bacheca + FAQ */
    var bb_URL = window.location.href.toLowerCase();
    if (bb_URL.indexOf("corriere.it/plus/bacheca") > -1) {
        s.sa(s.customTrack_account_pw);
        s.customLink_account = s.customLink_account_pw;
        s.pageName = "PAYWALL.COR/bacheca";
        s.channel = "Paywall";
        s.prop1 = "Bacheca";
        s.events = "event2";
    }

    if (bb_URL.indexOf("corriere.it/plus/faq") > -1) {
        s.sa(s.customTrack_account_pw);
        s.customLink_account = s.customLink_account_pw;
        s.pageName = "PAYWALL.COR/faq";
        s.channel = "Paywall";
        s.prop1 = "FAQ";
        s.events = "event2";
    }

    /* Tracciamento abbonamenti mobile */
    if (bb_URL.indexOf("inapp.rcs.it/tablet/corriere/promo/") > -1) {
        var landingNameArr = window.location.pathname.split('/');
        var landingName = landingNameArr[landingNameArr.length - 2];
        s.pageName = "INAPP.COR/" + landingName + "/step 1";
        s.channel = "Landing Mobile";
    }

    jQuery(document).ready(function() {
        if (window.location.host === "inapp.rcs.it" || window.location.host === "staging-inapp.rcs.it") {

            (function(jQuery) {
                jQuery.each(['show'], function(i, ev) {
                    var el = jQuery.fn[ev];
                    jQuery.fn[ev] = function() {
                        jQuery(this.selector).trigger(ev);
                        return el.apply(this, arguments);
                    };
                });
            })(jQuery);

            if (s.checkJQ(jqLimit_mayor, jqLimit_minor)) {
                jQuery('#section_pin').on('show', function(e) {
                    if (e.target.id.indexOf('section_pin') > -1) {
                        s.pageName = "INAPP.COR/" + landingName + "/step 2";
                        s.t();
                    };
                });

                jQuery('#section_congratulation').on('show', function(e) {
                    if (e.target.id.indexOf('section_congratulation') > -1) {
                        s.pageName = "INAPP.COR/" + landingName + "/step 3";
                        s.events = s.events + ",event14";
                        s.t();
                        s.events = "";
                    };
                });
            }
        }
    });
} catch (e) { s.contextData['errorejs'] = location.hostname + " - " + e; }

}
/*EOF*/
