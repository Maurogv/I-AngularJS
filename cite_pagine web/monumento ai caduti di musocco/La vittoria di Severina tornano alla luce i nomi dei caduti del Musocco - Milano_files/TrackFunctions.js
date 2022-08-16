/*!
 * TrackFunctions.js
 * v. 4.0 Obj version
 * v. 4.02 TR fix
 * v. 4.10 vscroll - window load vanilla
 * v. 4.11 fix nilsen pwl
 * v. 4.12 aggiunta parametro kuid
 * v. 4.13 DMP Krux: p1oi4ue95
 * v. 4.14 Context data datalake_time
 * v. 4.15 Chi sale chi scende / disattivazione vScroll HP
 * v. 4.16 Gestione tracciamento Cards
 * v. 4.17 track Exit page 
 * v. 4.18 Chi sale chi scende - modifica report suite
 * v. 4.19 Esclusione segmenti krux
 * v. 4.20 Tracciamento Video Click
 * v. 4.21 Modifica account per olimpiadi (attenzione il FIX e' differente tra stag e prod)
 * v. 4.22 Outbrain
 * v. 4.23 BloccoPub 2
 * v. 5.0 Fix video
 *     - modifica detect del device su video
 * v. 5.1 Techrain track
 * v. 5.2 RPM track 
 * v. 5.3 read meta specialeadv
 * v. 6.0 check if utag id defined
 * v. 6.1 add function login
 * v. 6.2 fix krux am function
 */

if ((typeof utag == "undefined" ) || (utag.data != "undefined" && utag.data.adobe_import != "completato")) {
    var _trk = new Object();

    //Set Variables
    _trk.TrackPage = (window.location.pathname).substr((window.location.pathname).lastIndexOf("/") + 1);
    _trk.executed = [];

    /*** General Functions ***/

    _trk.changeAccount = function(AccountName) {
        try {
            _trk.Account = AccountName;
            s.prop43 = _trk.Account;
            s.un = _trk.Account;
        } catch (e) {
            return false
        }
        return true;
    };

    _trk.readCookie = function(CookieName) {
        if (document.cookie.length > 0) {
            var inizio = document.cookie.indexOf(CookieName + "=");
            if (inizio != -1) {
                inizio = inizio + CookieName.length + 1;
                var fine = document.cookie.indexOf(";", inizio);
                if (fine == -1)
                    fine = document.cookie.length;
                return unescape(document.cookie.substring(inizio, fine));
            } else {
                return "";
            }
        }
        return "";
    };

    _trk.writeCookie = function(CookieName, val, exp) {
        var scadenza = new Date();
        var adesso = new Date();
        scadenza.setTime(adesso.getTime() + (parseInt(exp) * 60000));
        document.cookie = CookieName + '=' + escape(val) + '; expires=' + exp + '; path=/';
    };

    _trk.ClearURL = function() {
        s.prop71 = "";
        trackURL = document.location.href;
        trackURL = trackURL.replace("&refresh_cens", "");
        trackURL = trackURL.replace("&refresh_ce", "");
        trackURL = trackURL.replace("&refresh_ce-awe", "");
        trackURL = trackURL.replace("&refresh_ce-cp", "");
        trackURL = trackURL.replace("&no_refresh", "");
        trackURL = trackURL.replace("&no_refresh-infscroll", "");
        return trackURL;
    };

    _trk.ReadURLparam = function() {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    };

    _trk.resetVars = function() {
        //reset variabili motori di ricerca
        s.eVar45 = "";
        s.eVar46 = "";
        s.eVar47 = "";
        s.eVar48 = "";
        s.eVar49 = "";
        s.prop50 = "";
    };

    _trk.NielsenCall = function(param) {
        // chiamata Nielsen
        if (jQuery("#nielsen_chk_img").length == 0) {
            jQuery("body").append("<img id='nielsen_chk_img'>");
        }

        randomnumber_nielsen = Math.floor((Math.random()) * 10000000000000);
        track_URL = decodeURI(_trk.ClearURL());
        if (param) {
            track_URL = track_URL + "%26" + param;
        }

        jQuery("#nielsen_chk_img").attr("src", "//secure-it.imrworldwide.com/cgi-bin/m?rnd=" + randomnumber_nielsen + "&ci=rcs-it&cg=0&si=" + track_URL);
    };

    _trk.AjaxPageTrack = function(pagename) {
        _trk.resetVars();
        s.prop71 = "";
        if (typeof pagename != "undefined") {
            if (pagename == "adv_infragallery" || pagename == "adv_slider" || pagename == "adv_refresh") {
                s.prop71 = pagename;
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

        _trk.NielsenCall("refresh_ce-awe");
    };

    _trk.TrackNielsen = function(refresh_type) {
        if (!jQuery("#nielsen_img").length) {
            jQuery("body").append("<img id='nielsen_chk_img' src='https://images2.corriereobjects.it/images/static/common/nib.gif' style='display:none' />");
        }

        rnd_number = Math.floor((Math.random()) * 10000000000000);
        url = escape(document.URL);
        jQuery("#nielsen_chk_img").attr("src", "https://secure-it.imrworldwide.com/cgi-bin/m?rnd=" + rnd_number + "&ci=rcs-it&cg=0&si=" + url + "%26" + refresh_type);
    };

    //fix nilsen pwl
    var TrackNielsen = function(a) {
        _trk.TrackNielsen(a);
    };

    /*** End :: General Functions ***/

    /************************************************************************************************/
    /*** SET VARIABILES IN PAGE ***/
    /************************************************************************************************/

    /*** Cookie Policy ***/
    if (typeof(cpmt_trk) == 'string') {
        s.prop37 = cpmt_trk;
        _trk.executed.push("Cookie Policy");
    }
    /*** End :: Cookie Policy ***/

    /*** Firme ***/
    if (typeof(firma) != "undefined") {
        if (firma != "(none)") {
            s.prop38 = firma;
            _trk.executed.push("Firme");
        }
    }
    /*** End :: Firme ***/

    /*** Abbonamento Mobile ***/
    if (_trk.readCookie("mobilelogintoken") != "") {
        s.prop30 = "Abbonato";
        _trk.executed.push("Abbonamento Mobile");
    }
    /*** End :: Abbonamento Mobile ***/

    /*** Native Pages ***/
    if (typeof(nomeBrand) != "undefined") {
        s.contextData['nomeBrand'] = nomeBrand;
        _trk.executed.push("Native Pages");
    }
    /*** End :: Native Pages Track ***/

    /************************************************************************************************/
    /*** AUTOMATION ***/
    /************************************************************************************************/
    /*** MEMBERSHIP FNC ***/
    _trk.membership = function() {
        //Tipologia utente (sottoscrizione)
        function readAPW() {
            if (typeof(_apw) != 'undefined') {
                try {
                    if (_apw.modules.subscribers_ac.is_subscribed() == true) {
                        s.prop32 = "sottoscritto";
                    } else {
                        s.prop32 = "non sottoscritto";
                    }
                    tsnow = new Date().getTime();
                    //86400000 = 1 giorno
                    writeCookie("OMN_membership", tsnow + ";" + s.prop32, 86400000);
                } catch (err) {}
            }
        }

        //Overlay
        if (typeof(paywall) != 'undefined') {
            if (paywall.trackoverlay()) {
                s.trackPaywallOverlay();
            }

            //verifico la possibilita che appaia la manina allo scroll
            if (paywall.renderView == "manina") {
                s.events = "event29";
            } else {
                console.log("NO: paywall.renderView");
            }
        } else {
            console.log("NO: paywall");
        }

        //Free trial
        if (typeof(_Freetrial) != 'undefined') {
            if (_Freetrial.tracking() == 2) {
                //Tracciamento Form
                s.pageName = "PAYWALL.COR/trial/subscription_form";
                s.channel = "Paywall";
                s.prop1 = "Trial";
                s.prop2 = "Subscription Form";
                s.eVar9 = "paywall subscription";
                s.events = "event2,event46";
                trackFormAnalysis("trial");
            } else if (_Freetrial.tracking() == 1) {
                //Tracciamento thankyou page attivazione free trial
                s.pageName = "PAYWALL.COR/trial/trial_activation";
                s.channel = "Paywall";
                s.prop1 = "Trial";
                s.prop2 = "Trial Activation";
                s.events = "event2,event3,event35,event48";
            }
        }

        //Var pagetype, VAS & usertype...
        if (typeof(_apw) != 'undefined') {
            try {
                omn_category = _apw.modules.access.get().category;
                switch (omn_category) {
                    case 0:
                        s.prop21 = "free";
                        break;
                    case 1:
                        s.prop21 = "freemium";
                        break;
                    case 2:
                        s.prop21 = "postwall";
                        break;
                    case 3:
                        s.prop21 = "premium";
                        break;
                    case 4:
                        s.prop21 = "VAS";
                        break;
                }
            } catch (err) {}

            try {
                s.prop33 = _apw.modules.access.get().content.toString();
            } catch (err) {}
        } else {
            s.prop21 = "free_notset";
        }

        if (s.prop15 == "logged in") {
            OMN_membership = _trk.readCookie("OMN_membership");
            if ((OMN_membership != "") && (OMN_membership != null)) {
                //verifico data cookie
                OMN_membership = OMN_membership.split(";");
                OMN_membership_created = OMN_membership[0];
                //3600000 = 1h
                if ((Date.now() - OMN_membership_created) <= 3600000) {
                    //cookie valido
                    s.prop32 = OMN_membership[1];
                } else {
                    //cookie scaduto
                    readAPW();
                }
            } else {
                //verifico presenza oggetto per estrazione
                readAPW();
            }
        }

        //tracciamento versione Membership
        rcsddfglr = _trk.readCookie("rcsddfglr");
        if (rcsddfglr != "") {
            rcsddfglr = rcsddfglr.split(".");
            s.prop28 = rcsddfglr[1];
            s.eVar36 = rcsddfglr[2];
            s.contextData['membership_expiry'] = rcsddfglr[0];
            s.contextData['membership_ID'] = rcsddfglr[4];
        } else {
            s.prop28 = "no_cookie";
            s.eVar36 = "0";
            s.contextData['membership_expiry'] = "no_cookie";
            s.contextData['membership_ID'] = "no_cookie";
        }

        //tracciamento liste
        if (typeof(tipologia) != 'undefined') {
            if (tipologia == "lista") {
                s.prop55 = tipologia;
            }
        }

        //tracciamento citazioni - prodotti premium
        if (typeof sezione != 'undefined') {
            if (typeof(presenza_citazione) != 'undefined') {
                if ((presenza_citazione == "true") || (sezione == "citazioni")) {
                    s.prop55 = sezione;
                }
            }

            if (sezione == "zoom") {
                s.prop55 = sezione;
            }
        }

        if (typeof(membership_type) != "undefined") {
            s.prop55 = membership_type;
        }
    };
    /*** LOAD CONDITION ***/
    _trk.membership();
    _trk.executed.push("Membership");
    /*** End :: MEMBERSHIP ***/

    /************************************************************************************************/
    /*** Eventi FNC **/
    _trk.Eventi = function() {
        if (typeof(corriere_expo) != "undefined") {
            s.prop29 = "Expo";
            _trk.executed.push("Eventi");
        }
        if (typeof(corriere_evento) != "undefined") {
            s.prop29 = corriere_evento;
            _trk.executed.push("Eventi");
        }
    };
    /*** LOAD CONDITION ***/
    _trk.Eventi();
    /*** End :: Eventi ***/

    /************************************************************************************************/
    /*** RPM FNC **/
    _trk.RPM = function() {
        try {
            s.prop40 = (document.getElementById("device").innerHTML).toLowerCase();
        } catch (e) {
            if (typeof DeviceVideo == "string") {
                s.prop40 = window.DeviceVideo.toLowerCase();
            } else if (typeof(corriereDevice) == 'string') {
                s.prop40 = (corriereDevice).toLowerCase();
            } else {
                s.prop40 = "Not Defined";
            }
        }

        if (typeof(RCSAD_sitepage) == 'string') {
            s.prop69 = RCSAD_sitepage;
        }

        try {
            var posPubs = "";
            var trk_adv_pos_cln = [];
            var OAS_list = [];
            var rcsListArr = RCSAD_listpos.split(",");

            if (RCSAD_sitepage) {
                var rcsListArr = RCSAD_listpos.split(",");
                posMin = {
                    "Position1": "P1",
                    "Top": "T",
                    "Left1": "L1",
                    "Right1": "R1",
                    "TopLeft": "TL",
                    "Frame1": "F1",
                    "BottomLeft": "BL",
                    "Frame2": "F2",
                    "Bottom": "B",
                    "Bottom1": "B1",
                    "Bottom2": "B2",
                    "Bottom3": "B3",
                    "ExtTl": "ExtTl",
                    "x22": "x22"
                }
            
                if (rcsListArr.length > 0) {
                    for (var x = 0; x < rcsListArr.length; x++) {
                        var singlePos = rcsListArr[x];
                        OAS_list.push(posMin[singlePos]);
                        trk_adv_pos_cln.push(posMin[singlePos]);
                    }
                    var trk_adv_pos_str = trk_adv_pos_cln.toString();
                    posPubs = OAS_list.toString() + ";" + trk_adv_pos_str;
                } else {
                    posPubs = "No_Adv";                
                }
                s.prop61 = posPubs;
            } else {
                s.prop61 = "No_Adv";
            }
        } catch (e) {}
    };
    /*** LOAD CONDITION ***/
    _trk.RPM();
    _trk.executed.push("RPM");
    /*** End :: Eventi ***/




    /* Meta SpecialeAdv */
    _trk.MetaSpecialeADV = function() { 
    var metas = document.getElementsByTagName('meta'); 
    for (var i=0; i<metas.length; i++) { 
        if (metas[i].getAttribute("name") == "specialeadv") { 
            return metas[i].getAttribute("content"); 
        } 
    } 
        return "";
    };
    s.prop29 = _trk.MetaSpecialeADV();
    /* Fine Meta SpecialeAdv */


    /************************************************************************************************/
    /*** DMP FNC ***/
    _trk.DMP = function() {
        rcsTR = _trk.readCookie("rcsTR");

        if (rcsTR != "") {
            rcsTR = rcsTR.split("|");
            s.contextData['MDMID'] = rcsTR[5];
        }
        if (window.localStorage) {
            s.contextData['krux_user'] = window.localStorage['kxrcs_user'] || "";
            s.contextData['krux_kuid'] = window.localStorage['kxrcs_kuid'] || "";
        } else if (navigator.cookieEnabled) {
            m = document.cookie.match('kxrcs_user=([^;]*)');
            s.contextData['krux_user'] = (m && unescape(m[1])) || "";
            m = document.cookie.match('kxrcs_kuid=([^;]*)');
            s.contextData['krux_kuid'] = (m && unescape(m[1])) || "";
        }

        if (typeof _trk.segs == "string") {
            s.contextData['krux_OKT'] = (_trk.segs.indexOf("p1oi4ue95") >= 0);
        } else {
            s.contextData['krux_OKT'] = false;
        }

        if (typeof dl_timestamp !== "undefined") s.contextData['datalake_time'] = dl_timestamp;
    };
    /*** LOAD CONDITION ***/
    _trk.DMP();
    _trk.executed.push("DMP");
    /*** End :: DMP ***/

    /*** 8100 FNC ***/
    _trk.ottomilaecento = function() {
        s.un = "rcsglobal,rcsedlocaliproddef,rcscorriereproddef";
        rs_origine = "rcsedlocaliproddef";
        s.channel = "8100 comuni";
        try {
            s.prop1 = regione;
            s.prop2 = provincia;
            s.prop3 = comune;
        } catch (e) {
            s.prop1 = s.prop2 = s.prop3 = "n.d.";
        };
        s.hier1 = "corriere.it,8100 comuni," + regione + "," + provincia + "," + comune;
        s.hier2 = "8100 comuni," + regione + "," + provincia + "," + comune;
    };
    /*** LOAD CONDITION ***/
    if (typeof(comuneForUrl) != "undefined") {
        _trk.ottomilaecento();
        _trk.executed.push("8100");
    }
    /*** End :: 8100 ***/

    /*** vScroll FNC ***/

    _trk.vScroll = function(size) {
        //s.un = 'rcscorriereproddef';
        _trk.resetVars();
        s.linkTrackVars = '';
        s.contextData['vscroll'] = (typeof size === "number") ? size + "%" : "ND";
        s.tl('corriere.it', 'o', 'Max scrolling');
    }





    /*** Chi sale chi scende ***/

    _trk.sale_scende = function(a) {
        _trk.resetVars();
        var s = s_gi('rcsglobal,rcscorriereproddef');
        s.referrer = s.pageURL;
        s.linkTrackVars = 'eVar5,events';
        s.linkTrackEvents = 'event6';
        s.events = "event6";
        s.eVar5 = a + " chi sale chi scende";
        s.tl(window, 'o', a);
        s.events = "";
        s.eVar5 = "";
    };

    /*** End :: Chi sale chi scende ***/

    /*** Piu visti ***/

    ;(function (_w,_urlNB) {
    _urlNB = _w.location.href.split(/[?#]/)[0];
    try{
        _urlNB = _w.cardsMainUrl.split(/[?#]/)[0];
    }catch(e){}
    s.contextData['URL_nobrowse'] = _urlNB;
    })(window);

    /*** End :: Piu visti ***/

    /*** Exit page ***/

    _trk.exit_page = function() {
        _trk.resetVars();
        s.pageURL = _trk.ClearURL() + "?refresh_exit-page";
        s.prop71 = "exit-page";
        s.t();
    };

    /*** End :: Exit page ***/

    /*** Video Click ***/

    ;
    (function() {
        var qstr = window.location.href.match(/[&\?]vclk=([^&]*)/);
        if (!qstr) return;
        s.contextData["video_click"] = qstr[1] || "";
    })();

    /*** End :: Video Click ***/

    /************************************************************************************************/
    /*** Manual Actions FNC ***/
    /************************************************************************************************/

    /*** Coupon ***/
    var TrackCoupon = function(source_name, coupon_code) {
        var s = s_gi('rcsglobal,rcscorriereproddef');
        s.linkTrackVars = 'eVar5,events';
        s.linkTrackEvents = 'event6';
        s.eVar5 = source_name + '|' + coupon_code;
        s.events = 'event6';
        s.tl(this, 'o', source_name);
    };
    /*** End :: Coupon ***/

    /*** Inifite Scroll ***/
    var TrackInfiniteScroll = function() {
        _trk.resetVars();
        s.referrer = s.pageURL;
        _trk.membership();
        _trk.DMP();
        _trk.RPM();
        s.referrer = s.pageURL;
        s.pageURL = _trk.ClearURL() + "&no_refresh-infscroll";
        s.prop71 = "no_refresh-infscroll";
        s.readURL(s, s._siteNameSpace, s._siteName);

        if (typeof tipologia != "undefined")
            s.contextData[s._siteNameSpace + '.page_content_type'] = tipologia;
        if (typeof sezione != "undefined")
            s.contextData[s._siteNameSpace + '.page_sezione'] = sezione;

        if (typeof(firma) != "undefined") {
            if (firma != "(none)") {
                s.prop38 = firma;
            }
        }

        s.t();

        _trk.NielsenCall();
    };
    /*** End :: Inifite Scroll ***/

    /*** Olimpiadi 2016 ***/

    _trk.olimpiadi2016 = function(changeAccount) {
        if (changeAccount) this.changeAccount("rcsglobal,rcscorriereproddef");
        s.prop1 = "Olimpiadi 2016";
        s.channel = "Sport";
        return true;
    };

    if (location.hostname === "olimpiadi-2016-rio.corriere.it") _trk.olimpiadi2016(true);
    else if (location.href.indexOf("sport/olimpiadi-2016-rio") >= 0) _trk.olimpiadi2016(false);

    /*** End :: Olimpiadi 2016 ***/

    /******************************************************************************/
    // Presenza script Outbrain
    /******************************************************************************/
    if (typeof outbrain_track == "boolean") {
        s.contextData['outbrain'] = outbrain_track;
    }
    /******************************************************************************/

    /******************************************************************************/
    // Presenza script techrain
    /******************************************************************************/
    if (!!window.techrain_trk) {
        s.contextData['techrain'] = window.techrain_trk;
    }
    /******************************************************************************/

    /******************************************************************************/
    // Presenza blocco Pubblicitario
    /******************************************************************************/
    if (typeof adv_openx_oas_ads !== "boolean") {
        s.contextData[s._siteNameSpace + '.bloccoPub'] = "si";
    }
    /******************************************************************************/



    /******************************** track login *********************************/
    try{
        if (typeof newCallOmnitureTracing == "undefined"){
            window.newCallOmnitureTracing = function (eventCode, pageName, eVar68) {
                if (eventCode == "event6") {
                    // FEATURED CONTENT ID
                    s.eVar5 = 'clickTopProfile';
                    s.eVar6 = "Accesso Corriere.it";
                    s.t();
                } else if (eventCode == "event7") {
                    _trk.resetVars();
                    s.linkTrackVars = 'eVar68,events';
                    s.eVar68 = "corriere";
                    s.linkTrackEvents = 'event7';
                    s.events = "event7";
                    s.tl(this, 'o', "login");
                    s.events = "";
                } else {
                    var eventtosend = "";
                    if (eventCode.indexOf("event46") >= 0) {
                        s.events = eventtosend = "event46";
                    }
                    if (eventCode.indexOf("event48") >= 0) {
                        s.events = eventtosend  = "event48";
                    }
                    if (eventCode.indexOf("event3") >= 0) {
                        if (eventtosend != "")
                        s.events = eventtosend  = "event48";
                        else
                        s.events = eventtosend  = "event3";
                    }
                    s.eVar6 = "Accesso Corriere.it";
                    s.pageName = pageName;
                    s.eVar68 = eVar68;
                    s.t()
                }
            }
        }
    }catch(e){
        console.log(e);
    }
    /******************************************************************************/


    /******************************************************************************/
    /* CORRIERE-1927 - Verifica valore krux e settaggio valore in cookie          */
    /******************************************************************************/
    try{
        _trk.isObjectEmpty = function(obj) {
            if ( Object.keys(obj).length === 0 ) return true;
        }
        _trk.getStaticKruxData = function(callback) {
            var _this = this;
            var xhr = new XMLHttpRequest();
            var staticObj = {};
            xhr.onreadystatechange = function () {
                if ( xhr.readyState === 4 && xhr.status === 200 ) {
                    var segmentsArray = JSON.parse(xhr.response).segments;
                    callback( segmentsArray );
                }
            };
            xhr.open('GET', 'https://static2.corriereobjects.it/kruxSegments/segments.json');
            xhr.send();
        }
        _trk.getStorageKruxData = function() {
            var storageStr = (typeof utag !== "undefined")?utag.data.user_kruxSegments:localStorage.getItem("kxrcs_segs");
            if(typeof storageStr !== "undefined"){
                return storageStr.split(',');
            }
        }
        _trk.getKruXSegmentCookie = function(name_ck) {
            return _tmsTools.getCookie(name_ck);
        }
        _trk.setKruXSegmentCookie = function( name_ck, value ) {
            _tmsTools.setCookie( name_ck, value, 1, 'corriere.it', '/' );
        }
        _trk.matchKruxSegments = function() {
            var foundSegments = '';
            var storageObj = this.getStorageKruxData();
            var _this = this;
            var apw_segment_chk = _trk.getKruXSegmentCookie('apw_segment_chk');
            var today = new Date();
            var timestamp = today.getTime();
            //var timeDiff = 1000 * 60 * 60 * 24; // 1 day
            var timeDiff = 1000 * 60 * 3; // 3 minutes
            var toUpdate = false;
            var existingSegmentsObj = apw_segment_chk ? apw_segment_chk : '';
            if ( existingSegmentsObj && ( timestamp - existingSegmentsObj < timeDiff ) ) return;
        
            this.getStaticKruxData(function(staticObj) {
                if ( _this.isObjectEmpty(storageObj) || _this.isObjectEmpty(staticObj) ) return false;
                for (var i = 0; i < storageObj.length; i++) {
                    for (var j = 0; j < staticObj.length; j++) {
                        if ( storageObj[i] === staticObj[j] ) {
                            foundSegments = storageObj[i];
                            break;
                        }
                    }
                }
                _this.setKruXSegmentCookie( 'apw_segment_chk', timestamp );
                _this.setKruXSegmentCookie( 'apw_segment', foundSegments );
            });
        }
        _trk.matchKruxSegments();
    } catch(e){
        console.log(e);
    }
    /******************************************************************************/

}