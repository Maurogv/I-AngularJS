//POPUP LOGIN DI LA TUA
	var htmlLogin = "<div id='popup_log_dlt'><div class='container'><h3>Login</h3><p>Inserisci la tua mail e la password di Corriere.it</p><form id='loginFormBean' method='post' action='http://www.corriere.it/corcommunity/accesso/VerificaLogIn.do'>";
	htmlLogin += "<input type='hidden' value='COR-REG' name='SEP'><input type='hidden' id='localContentPath' value='"+document.URL+"' name='contentPath'><ul class='registrazione-form'><li>email:<input type='text' name='username' tabindex='1' value='' id='username-login' title='Username'></li>";
	htmlLogin += "<li>password:<input type='password' name='password' tabindex='2' value='' id='password-login' title='Password'><br>";
	htmlLogin += "<a href='javascript:popupPassword('/corcommunity/accesso/retpwd.jsp');'>recupera password</a></li>";
	htmlLogin += "<li><input type='submit' alt='INVIA' value='INVIA' class='submit right'></li></ul></form>";
	htmlLogin += "</div></div><a name='scrivicommenti'></a><div id='box_login_dlt'>Per poter commentare i post devi essere registrato al sito di Corriere.it.<br />";
	htmlLogin += "Se sei gi&agrave; nostro utente esegui il <span onclick='javascript:loginDLT_box();' class='login_dlt' title='login'>login</span> altrimenti <a href='javascript:loginDLT_box();' class='reg_dlt' title='registrati'>registrati</a></div>";
	

function infografica(url_infog,dimW_infog,dimH_infog){
	if(url_infog != ""){
		if(dimW_infog == "" || dimW_infog == null) dimW_infog = 1024;
		if(dimH_infog == "" || dimH_infog == null) dimH_infog = 750;
		$.fancybox({
			'href'			: url_infog,			   
			'overlayShow'	: true,
			'overlayOpacity'	: 0.0,	
			'overlayColor'	: '#000',							
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'type' : 'iframe',
			'width' : dimW_infog,
			'height': dimH_infog,
			'autoScale':false	
		});
	}
}

	
	var count_send_dlt = 0;
	//Variabile per evitare la duplicazione dei commenti
	var isAlreadySend = false;

	function loadContentDLT(url) {
		$('#content-generated-dlt').load(
		url,
		function() {
			if (count_send_dlt == 0) $("html").scrollTop(0);
			count_send_dlt++;
			$("#submit-commento input.titolo_dlt, #submit-commento textarea").blur();
			$('#submit-commento textarea[name*=ugcTesto]').html("Il tuo commento");
			$("#box_send_msg_dlt input.titolo_dlt").click(function(){
				$("#submit-commento .errorTitolo").css("display","none");
				if($(this).val() == "Titolo") $(this).val("");
			});
			$("#box_send_msg_dlt textarea").click(function(){
				$("#submit-commento .errorTesto").css("display","none");
				if($(this).val() == $(this).attr("title")) $(this).val("");
			});
		}
		);
		isAlreadySend = false;
	}
	function submitCommentoDlt() {
		if (validateDLT() && isAlreadySend == false) {
			$("#content-generated-dlt").load("/localwebapp/"+sezione_text+"/invioRecensione.do", {
				"milUgc.ugcTitolo" : htmlEncode($('#submit-commento input[name*=ugcTitolo]').attr("value")),
				"milUgc.ugcTesto" : htmlEncode($('#submit-commento textarea[name*=ugcTesto]').attr("value")),
				"username" : $('#submit-commento input[name=username]').attr("value"),
				"nickname" : $('#submit-commento input[name=nickname]').attr("value"),
				"nomeEventoEntita" : $('#submit-commento input[name=nomeEventoEntita]').attr("value"),
				"returnUrl" : $('#submit-commento input[name=returnUrl]').attr("value"),
				"oggetto" : $('#submit-commento input[name=oggetto]').attr("value"),
				"tipologia" : $('#submit-commento input[name=tipologia]').attr("value"),
				"formId" : $('#submit-commento input[name=formId]').attr("value"),
				"preview" : "false" }, function(){openPopMessageLoad("popup_message_dlt");});
			isAlreadySend = true;
		}
	}
	function validateDLT(formData, jqForm, options) {
		var ret = true;
		$(".errorTitolo, .errorTesto").css("display", "none");
		if ($('#submit-commento input[name*=ugcTitolo]').val() == "Titolo" || $('#submit-commento input[name*=ugcTitolo]').val() == "" ) {
			$(".errorTitolo").css("display", "block");
			ret = false;
		}
		if ($('#submit-commento textarea[name*=ugcTesto]').val() == "Il tuo commento" || $('#submit-commento textarea[name*=ugcTesto]').val() == "") {
			$(".errorTesto").css("display", "block");
			ret = false;
		}

		return ret;
	}


function loginDLT_box(){
		openLogDLT();
}
function openLogDLT(){
/*	$('#popup_log_dlt').modal({
		overlayClose:true,
		containerId : 'modal-login-dlt',
		onClose: function (dialog) {
			dialog.data.fadeOut('slow', function () {

				dialog.container.slideUp('slow', function () {
					dialog.overlay.fadeOut('slow', function () {
						$.modal.close();

					});
				});
			});
		}
	});*/
	$("#headBoxLogin a.headLogin").click();
}
function openPopMessage(titolo, messaggio){
		$.modal("<div id=\"popup_message_dlt\"><div class=\"container\"><h3>"+titolo+"</h3><p>"+messaggio+"</p></div></div>",{
			overlayClose:true,
			containerId : 'modal-message-dlt',
			onClose: function (dialog) {
				dialog.data.fadeOut('slow', function () {
					dialog.container.slideUp('slow', function () {
						dialog.overlay.fadeOut('slow', function () {
							$.modal.close();
						});
					});
				});
			}
		});
}
function openPopMessageLoad(id_contenitore){
	$('#'+id_contenitore).modal({
		overlayClose:true,
		containerId : 'modal-message-dlt',
		onClose: function (dialog) {
			dialog.data.fadeOut('slow', function () {
				dialog.container.slideUp('slow', function () {
					dialog.overlay.fadeOut('slow', function () {
						$('#content-generated-dlt').html("");
						$.modal.close();
						loadContentDLT($('#commenta').attr('href'));
					});
				});
			});
		}
	});
}
function ismaxlength(obj)
{
var mlength = 1500;
if (obj.getAttribute && obj.value.length>mlength)
obj.value = obj.value.substring(0,mlength)
}

function setIdTipologia(id_cat, id_option){

	$("#idTipologiaSel").removeOption(/./);
	$("#box-search form").attr("action","/utilita/aperture/aperture.shtml");
	if(id_cat == 2){
	 myOptions = {
		"0":"Tutti i punti vendita",
		"1":"Abbigliamento - Calzature - Accessori",
		"2":"Alimentari",
		"3":"Animali",
		"4":"Articoli Regalo",
		"5":"Auto - Moto",
		"6":"Banca",
		"7":"Bellezza - Salute",
		"8":"Bellezza - salute",
		"9":"Bigiotteria",
		"10":"Bricolage",
		"11":"Calzolaio e Chiavi",
		"12":"Carburanti",
		"13":"Casalinghi - Arredamento",
		"14":"Cinema",
		"15":"Edicola",
		"16":"Elettronica",
		"17":"Farmacia",
		"18":"Fiori e Piante",
		"19":"Fotografia",
		"20":"Giocattoli",
		"21":"Gioielleria - Oreficeria - Orologeria",
		"22":"Intrattenimento",
		"23":"Lavasecco",
		"24":"Libri",
		"25":"Musica",
		"26":"Ottica",
		"27":"Parrucchiere",
		"28":"Posta",
		"29":"Profumeria",
		"30":"Ristoranti - Bar",
		"31":"Sartoria",
		"32":"Servizi",
		"33":"Tabacchi e Lotterie",
		"34":"Telefonia",
		"35":"Tessile",
		"36":"Viaggi",
		"37":"Videogiochi"	
	};
} else if(id_cat == 3){
		$("#box-search form").attr("action","/utilita/concessionari/aperture.shtml");
	 myOptions = {
		"0":"Tutte le marche",
		"1" :" ABARTH",
		"2" :" AC",
		"3" :" ACURA",
		"4" :" AIXAM",
		"5" :" ALFA ROMEO",
		"6" :" ALPINA-BMW",
		"7" :" AMC",
		"8" :" ASIA MOTORS",
		"9" :" ASTON MARTIN",
		"10" :" AUDI",
		"11" :" AUSTIN",
		"12" :" AUTOBIANCHI",
		"13" :" BELLIER",
		"14" :" BENTLEY",
		"15" :" BERTONE",
		"16" :" BMW",
		"17" :" BRILLIANCE",
		"18" :" BUGATTI",
		"19" :" BUICK",
		"20" :" CADILLAC",
		"21" :" CATERHAM",
		"22" :" CHATENET",
		"23" :" CHEVROLET",
		"24" :" CHEVROLET (K)",
		"25" :" CHEVROLET (USA)",
		"26" :" CHRYSLER",
		"27" :" CITROEN",
		"28" :" CORVETTE",
		"29" :" DACIA",
		"30" :" DAEWOO",
		"31" :" DAIHATSU",
		"32" :" DKW",
		"33" :" DE LOREAN",
		"34" :" DE TOMASO",
		"35" :" DODGE",
		"36" :" DONKERVOORT",
		"37" :" DR MOTOR",
		"38" :" EFFEDI",
		"39" :" FERRARI",
		"40" :" FIAT",
		"41" :" FISSORE",
		"42" :" FORD",
		"43" :" FUN TECH",
		"44" :" GILLET",
		"45" :" GMC",
		"46" :" GREAT WALL",
		"47" :" GRECAV",
		"48" :" HONDA",
		"49" :" HUMMER",
		"50" :" HYUNDAI",
		"51" :" INFINITI",
		"52" :" INNOCENTI",
		"53" :" ISUZU",
		"54" :" IVECO",
		"55" :" JAGUAR",
		"56" :" JDM",
		"57" :" JEEP",
		"58" :" KATAY",
		"59" :" KIA ",
		"60" :" KIA MOTORS",
		"61" :" LA FORZA",
		"62" :" LADA",
		"63" :" LAMBORGHINI",
		"64" :" LANCIA",
		"65" :" LAND ROVER",
		"66" :" LANDWIND",
		"67" :" LEXUS",
		"68" :" LIGIER",
		"69" :" LINCOLN",
		"70" :" LOTUS",
		"71" :" MAHINDRA",
		"72" :" MARCOS",
		"73" :" MARTIN MOTORS",
		"74" :" MASERATI",
		"75" :" MATRA-SIMCA",
		"76" :" MAYBACH",
		"77" :" MAZDA",
		"78" :" MERCEDES",
		"79" :" MERCURY",
		"80" :" MG",
		"81" :" MICRO-VETT",
		"82" :" MICROCAR",
		"83" :" MINI",
		"84" :" MITSUBISHI",
		"85" :" MORGAN",
		"86" :" NISSAN",
		"87" :" NOBLE",
		"88" :" OLDTIMER",
		"89" :" OPEL",
		"90" :" PAGANI",
		"91" :" PANTHER",
		"92" :" PEUGEOT",
		"93" :" PIAGGIO",
		"94" :" PLYMOUTH",
		"95" :" POLARIS",
		"96" :" PONTIAC",
		"97" :" PORSCHE",
		"98" :" PROTON",
		"99" :" PUCH",
		"100" :" RADICAL",
		"101" :" RENAULT",
		"102" :" RENAULT TRUCKS",
		"103" :" ROLLS ROYCE",
		"104" :" ROVER",
		"105" :" SAAB",
		"106" :" SANTANA",
		"107" :" SEAT",
		"108" :" SKODA",
		"109" :" SMART",
		"110" :" SPYKER",
		"111" :" SSANGYONG",
		"112" :" SUBARU",
		"113" :" SUZUKI",
		"114" :" TALBOT",
		"115" :" TASSO",
		"116" :" TATA",
		"117" :" TOYOTA",
		"118" :" TRABANT",
		"119" :" TRIUMPH",
		"120" :" TVR",
		"121" :" UAZ",
		"122" :" VAUXHALL",
		"123" :" VENTURI",
		"124" :" VOLKSWAGEN",
		"125" :" VOLVO",
		"126" :" WEISMANN",
		"127" :" WESTFIELD",
		"128" :" YES!",
		"129" :" ZAGATO",
		"130" :" ZASTAVA"
	};
} else  {
	myOptions = {
		"0" : "Tutti i punti vendita",		
		"1" : "Bricolage",
		"2" : "Casa e arredamento",
		"3" : "Centro Commerciale",
		"4" : "Elettronica",
		"5" : "Moda, Sport e Outlet",
		"6" : "Supermercato"
	};

}
	$("#idTipologiaSel").addOption(myOptions, false);
	$("#idCategoria").val(id_cat);
	$("#idTipologiaSel").val(id_option);
}
function selectOptions(sel, value){
	var selectedVal = null;
	$(sel + " option").each(function(i){
		if ($(this).attr("value").toUpperCase() == value.toUpperCase()){
			$(this).attr("selected", "selected");
			selectedVal = $(this).attr("value");
			$(sel).change();
			return false;
		}
	});
	return selectedVal;
}

function selectOptionsByHtml(sel, value){
	var selectedVal = null;
	$(sel + " option").each(function(i){
		if ($(this).html().toUpperCase() == value.toUpperCase()){
			$(this).attr("selected", "selected");
			selectedVal = $(this).attr("value");
			$(sel).change();
			return false;
		}
	});
	return selectedVal;
}

            var new_top_hp = (screen.height - (635)) / 2;
            var new_left_hp = (screen.width - 865) / 2;
	var stile_popup_vc = "top="+new_top_hp+", left="+new_left_hp+", width=865, height=635, buttons=no,scrollbars=yes,location=no,menubar=no,resizable=no,status=no,directories=no,toolbar=no,fullscreen=no";
	function apriPopupVideochat(url) {
		if(url.indexOf("http://videochat.corriere.it") == -1) url = "http://videochat.corriere.it"+url;
		window.open(url, "", stile_popup_vc);
	}


//ADV function
function getSite() {
	return "corriere";
};

// array clone
Array.prototype.clone = function () {
	var arr1 = new Array();
	for (var property in this) {
		arr1[property] = typeof (this[property]) == 'object' ? this[property].clone() : this[property]
	}
	return arr1;
}

// temporeale homepage
function loadTempoReale() {

	$("#box-temporeale ul").html('');
	var idCompetitions = new Array();
	var todayDate = server_d_dd + "/" + server_m_mm;
	var codSquadreOrig = codSquadre.clone();
	var numCompetitions = 0;

	$.ajax({
		url: "/sport/xml-temporeale/competitions.xml",
		dataType: "xml",
		cache: false,
		success: function(xml_cont){

			if ($(xml_cont).find('Comp[comp-id="21"]').attr('active') == "1") {
				idCompetitions[numCompetitions] = "21";
				numCompetitions = 1;
			}
			if ($(xml_cont).find('Comp[comp-id="105"]').attr('active') == "1") {
				 idCompetitions[numCompetitions] = "105";
			}

			for(var i = 0; i < idCompetitions.length; i ++) {
				$.ajax({
					url: '/sport/xml-temporeale/matchdays_'+idCompetitions[i]+'.xml',
					dataType: "xml",
					cache: false,
					success: function(xml_cont){

						//$("#tr-"+idCompetitions[counterCompetitions]).html("");

						linkHtml = $(xml_cont).find('link').text();
						//writeBox = false;

						for(var i = 0; i < codSquadre.length; i ++) {

							$(xml_cont).find('team-code').each(function(){

								if ($(this).text() == codSquadre[i] ) {
									dataHtml = "";

									nodoResultSquadra = $(this).parents('result');
									dateGame = $(nodoResultSquadra).attr('time').split(" ");
									if (dateGame[0] == todayDate ) {

										matchStatus = $(nodoResultSquadra).attr('match-status');
										teamNameHome = $(nodoResultSquadra).find('home-team').find('team-name').text();
										teamCodeHome = $(nodoResultSquadra).find('home-team').find('team-code').text();
										scoreHome = $(nodoResultSquadra).find('home-team').find('score').text();
										teamNameAway = $(nodoResultSquadra).find('away-team').find('team-name').text();
										teamCodeAway = $(nodoResultSquadra).find('away-team').find('team-code').text();
										scoreAway = $(nodoResultSquadra).find('away-team').find('score').text();

										dataHtml += '<li><a href="'+linkHtml+'">';
										dataHtml += '<span class="squadra">'+teamNameHome+'</span>';
										dataHtml += '<span class="ris">'+scoreHome+'</span>';
										dataHtml += '<span class="status">'+matchStatus+'</span>';
										dataHtml += '<span class="squadra">'+teamNameAway+'</span>';
										dataHtml += '<span class="ris">'+scoreAway+'</span>';
										dataHtml += '<span class="link">la diretta &raquo;</span>';
										dataHtml +=  '</a></li>';

										$("#box-temporeale ul").append(dataHtml);
										$("#box-temporeale ul li").removeClass("last")
										$("#box-temporeale ul li:last").addClass("last");
										$("#box-temporeale").show();

										codSquadre[$.inArray(teamCodeHome,codSquadre)] = ".";
										codSquadre[$.inArray(teamCodeAway,codSquadre)] = ".";
									}
								}
							})
						}
						codSquadre = codSquadreOrig.clone();
					}
				});
			}

		}
	});
}


//JS DI LA TUA
function loadContent(url) {
	$('#content-generated-dlt').load(
	url,
	function() {
		$("html").scrollTop(0);
		go_example();
		$("#submit-commento input.example").blur();
		$(".delete").click(function() {
			// reset dei campi...
			$('#submit-commento textarea[name*=ugcTesto]').attr("value", "");
			$('#submit-commento input[name*=ugcTitolo]').attr("value", "");
			return false;
		});
	}
	);
}



function doPreviewCommento() {
	var s = document.URL;
	if (document.URL.toString().indexOf("#") > -1) {
		s = document.URL.toString().substring(0, document.URL.toString().indexOf("#"))
	}

	if (validate()) {
		$("#content-generated-dlt").load("/localwebapp/"+sezione_text+"/invioRecensione.do", {
			"milUgc.ugcTitolo" : $('#submit-commento input[name*=ugcTitolo]').attr("value"),
			"milUgc.ugcTesto" : $('#submit-commento textarea[name*=ugcTesto]').attr("value"),
			"username" : $('#submit-commento input[name=username]').attr("value"),
			"nickname" : $('#submit-commento input[name=nickname]').attr("value"),
			"nomeEventoEntita" : $('#submit-commento input[name=nomeEventoEntita]').attr("value"),
			"returnUrl" : $('#submit-commento input[name=returnUrl]').attr("value"),
			"pubblicate" : $('#submit-commento input[name=pubblicate]').attr("value"),
			"oggetto" : $('#submit-commento input[name=oggetto]').attr("value"),
			"tipologia" : $('#submit-commento input[name=tipologia]').attr("value"),
			"formId" : $('#submit-commento input[name=formId]').attr("value"),
			"preview" : "true" }, successCallBack);
	}
	//return false;

}

function goBackFormCommento() {
	var testo = $('#submit-commento textarea[name=milUgc.ugcTesto]').attr("value");
	if(typeof testo == 'undefined') {
		testo = $('#submit-commento input[name=milUgc.ugcTesto]').attr("value");
	} else {
		testo = $('#submit-commento textarea[name=milUgc.ugcTesto]').attr("value");
	}
	if (validate()) {
		$("#content-generated-dlt").load("/localwebapp/"+sezione_text+"/invioRecensione.do", {
			"milUgc.ugcTitolo" : $('#submit-commento input[name*=ugcTitolo]').attr("value"),
			"milUgc.ugcTesto" : testo,
			"username" : $('#submit-commento input[name=username]').attr("value"),
			"nickname" : $('#submit-commento input[name=nickname]').attr("value"),
			"nomeEventoEntita" : $('#submit-commento input[name=nomeEventoEntita]').attr("value"),
			"returnUrl" : $('#submit-commento input[name=returnUrl]').attr("value"),
			"pubblicate" : $('#submit-commento input[name=pubblicate]').attr("value"),
			"oggetto" : $('#submit-commento input[name=oggetto]').attr("value"),
			"tipologia" : $('#submit-commento input[name=tipologia]').attr("value"),
			"formId" : $('#submit-commento input[name=formId]').attr("value"),
			"preview" : $('#submit-commento input[name=preview]').attr("value"),
			"goBack" : "true" }, successCallBack);
	}
}


function validate(formData, jqForm, options) {
	var ret = true;
	$(".errorTitolo, .errorTesto").css("display", "none");
	if ($('#submit-commento input[name*=ugcTitolo]').attr("value") == "Scrivi titolo" || $('#submit-commento input[name*=ugcTitolo]').attr("value") == "" ) {
		$(".errorTitolo").css("display", "block");
		ret = false;
	}
	if ($('#submit-commento textarea[name*=ugcTesto]').val() == "Scrivi il testo del commento" || $('#submit-commento textarea[name*=ugcTesto]').val() == "") {
		$(".errorTesto").css("display", "block");
		ret = false;
	}

	return ret;
}

// post-submit callback
function successCallBack()  {
	$('#altro-commento').click(function() {
		loadContent($(this).attr('href'));
		return false;
	});
}

function go_example(){
	$('.example').example(function() {
		return $(this).attr('title');
	});
}

function htmlEncode(source) {
	function special(source)
	{
		var result = '';
		for (var i = 0; i < source.length; i++)
		{
			var c = source.charAt(i);
			if (c < ' ' || c > '~')
			{
				c = '&#' + c.charCodeAt() + ';';
			}
			result += c;
		}
		return result;
	}
	var result = source;
	// ampersands (&)
	result = result.replace(/\&/g,'&amp;');
	// less-thans (<)
	result = result.replace(/\</g,'&lt;');
	// greater-thans (>)
	result = result.replace(/\>/g,'&gt;');
	// Replace quotes if it isn't for display,
	// since it's probably going in an html attribute.
	result = result.replace(new RegExp('"','g'), '&quot;');
	// special characters
	result = special(result);

	return result;
}



//set properties selected on specific option in form idTipologia (file /ssi/boxes/form-apertodomenica.shtml)
/*function setIdTipologia(id) {
	$("#idTipologia").val(id);
}*/

//set date time selected on specific option in form data/ora/minuti (file /ssi/boxes/form-farmacie.shtml)
function setDateTime(ora,minuti,lun,mar,mer,gio,ven,sab,dom,tod) {
	$("#ora").val(ora);
	$("#minuti").val(minuti);

	var select = document.getElementById("data");
	select.options[0] = new Option(lun,lun);
	select.options[1] = new Option(mar,mar);
	select.options[2] = new Option(mer,mer);
	select.options[3] = new Option(gio,gio);
	select.options[4] = new Option(ven,ven);
	select.options[5] = new Option(sab,sab);
	select.options[6] = new Option(dom,dom);

	$("#data").val(tod);
}


//get parameters from URL
function queryString(parameter) {
	var loc = location.search.substring(1, location.search.length);
	var param_value = false;

	var params = loc.split("&");
	for (i=0; i<params.length;i++) {
		param_name = params[i].substring(0,params[i].indexOf('='));
		if (param_name == parameter) {
			param_value = params[i].substring(params[i].indexOf('=')+1)
		}
	}
	if (param_value) {
		return param_value;
	}
	else {
		return false;
	}
}

// script per apertura gallery corriere

function galleriaN(str,str2){
	var larghezza=screen.availWidth;
	if(larghezza>=1024){
	window.open('http://www.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');
	}else{
	window.open('http://www.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');
	}
}


// script per apertura gallery vivimilano

function galleriaVN(str,str2){
	var larghezza=screen.availWidth;
	if(larghezza>=1024){
		window.open('/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');
	}else{
		window.open('/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');
	}
}


// script tellafriend

function apriInviaPagina(){
	var miourl=window.location.href;
	var miourl_s=miourl.split("&");
	var loc="";
	for (i=0;i<miourl_s.length;i++)
		loc+=miourl_s[i]+"!*";
	loc=loc.substr(0,loc.length-2)
	tit=document.title
	prop="menubar=no,status=no,titlebar=no,toolbar=no,width=450,height=500,scrollbars=no"
	window.open("http://www.corriere.it/smallApp/tellafriend/form.shtml?rr="+loc+"&tit="+tit,"InviaPagina",prop);
}

function pr6(nomefile,larghezza,altezza) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (nomefile.indexOf(pathToRemove) > -1) nomefile = nomefile.substring(lenPathToRemove);
if (nomefile.indexOf(".xml") > -1)  nomefile = nomefile.substring(0, nomefile.indexOf(".xml")) + ".shtml";
	parametri="menubar=no,location=no,toolbar=no,status=no,scrollbars=yes,resizable=no,width="
	parametri=parametri+larghezza+",height="+altezza
	newWin=open('','',parametri)
	newWin.location.href=nomefile
}
	/*
AUTORE: Davide Zerrilli
DATA: 20/09/2007
DESCRIZIONE:
versione semplificata di "da_sapere.js" (meteo nelle pagine calcio di Gazzetta.it)
viene visualizzata la situazione metereologica di Napoli
i dati sono estratti da file XML
*/

function dammiInfoLocalita(var_localita) {
	
	/** Returns the version of Internet Explorer or a -1
	* (indicating the use of another browser).
	*/
	function getInternetExplorerVersion(){
		var rv = -1; // Return value assumes failure.
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
		}
		return rv;
	}
	
	//workaround for CORS on IE < 10 [mantis 0039046]
	var url = "https://xml.corriereobjects.it/linked_webroots/8100.corriere.it/fornitori/meteo.xml";
	var browser = getInternetExplorerVersion();
	
	//if IE && (version 9.0 or before)
	if (browser>=0 && browser < 10) {
		url = "https://milano.corriere.it/linked_webroots/8100.corriere.it/fornitori/meteo.xml";
	}
	
	$.ajax({
		type: "GET",
		url: url,
		dataType: "xml",
		success: function(xml) {
		  $(xml).find('loc[id='+var_localita+']').each(function(){					
				id_img_met = $(this).find("tempo-id").text();
				id_img_met = "http://static.8100.corriereobjects.it/img/meteo/new/"+id_img_met+".png";							
				temp_met = Math.round($(this).find("misurata").text()) + "&deg; C";
				$('#mn_meteo img').attr('src',id_img_met);
				$("#mn_meteo #temperatura").html(temp_met);
				$("#search_comune img").attr('src',id_img_met);
				$("#mn_meteo img").css("cursor","pointer");
				$("#mn_meteo img").click(function(){
                 window.open('https://meteo.corriere.it/meteo/'+nomeComune);
                }); 							
		  });
		},
		error: function(jqXHR, textStatus) {
			console.log( "Request failed: " + textStatus );
		}
	});
}

// gestione combo date per ricerca agenda (eventi e teatri)
function daysInMonth(month, year) {
	return 32 - new Date(year, month, 32).getDate();
}

function setDateFuorisalone(form) {
	var dataCercata = form.daData.value;
	if (dataCercata == "12") {
		var daData = "13042010";
		var aData = "19042010";
		form.daData.value = daData;
		form.AData.value = aData;
		if (form.testo.value.length < 3) {
			jAlert('Se selezioni tutte le date devi inserire almeno 3 caratteri nel campo di ricerca', 'Attenzione');
			return false;
		} else {
			return true;
		}
	} else {
		form.AData.value = dataCercata;
		return true;
	}
}


function setDatesFields(form) {

	var now = new Date();
	var daData, aData;
	var pad = function(d) {
		return d < 10 ? "0" + d : d + "";
	}
	var setDay = function(d, d2) {

		var date = new Date(now.getFullYear(), now.getMonth(), d);
		var date2 = d2 ? new Date(now.getFullYear(), now.getMonth(), d2) : null;

		daData = String(pad(date.getDate())) + String(pad(date.getMonth()+1)) + String(date.getFullYear());
		aData = d2 ? String(pad(date2.getDate())) + String(pad(date2.getMonth()+1)) + String(date2.getFullYear()) : daData;
	}
	var c = parseInt(form.when.value, 10);

	switch (c) {

		// today
		case 0:
			setDay(now.getDate());
			break;

		// tomorrow
		case 1:
			setDay(now.getDate() + 1);
			break;

		// sunday
		case 8:
			setDay(now.getDay() == 0 ? now.getDate() : now.getDate() + (7 - now.getDay()));
			break;

		// next week
		case 9:
			var d = now.getDate() + (now.getDay() == 0 ? 0 : (7 - now.getDay()));
			setDay(d+1, d+7);
			break;

		// this month
		case 10:
			var d1 = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
			var d2 = new Date(now.getFullYear(), now.getMonth() + 1, daysInMonth(now.getMonth(), now.getFullYear()));

			daData = pad(d1.getDate()) + pad(d1.getMonth()) + d1.getFullYear();
			aData = pad(d2.getDate()) + pad(d2.getMonth()) + d2.getFullYear();
			break;

		// next month
		case 11:
			var d1 = new Date(now.getFullYear(), now.getMonth() + 2, 1);
			var d2 = new Date(now.getFullYear(), now.getMonth() + 2, daysInMonth(now.getMonth() + 1, now.getFullYear()));

			daData = pad(d1.getDate()) + pad(d1.getMonth()) + d1.getFullYear();
			aData = pad(d2.getDate()) + pad(d2.getMonth()) + d2.getFullYear();

			break;

		// all date
		case 12:
			setDay(now.getDate());
			// imposto la data massima
			//var d1 = new Date(9999, 12, 31);
			aData = ""; //pad(d1.getDate()) + pad(d1.getMonth()) + d1.getFullYear();
			break;
		// all week
		default:
			var requiredDay = c - 1;
			var dayDiff = Math.abs(now.getDay() - requiredDay);

			setDay(requiredDay < now.getDay() ? (now.getDate() + (7 - dayDiff)) : (now.getDate() + dayDiff));

	}

	form.daData.value = daData;
	form.AData.value = aData;


	return checkFields(form);

}

function checkFields(form) {

	if (form.testo.value != "" && form.testo.value.length < 3) {
		jAlert('Inserire almeno 3 caratteri nel campo testo', 'Attenzione');
		//alert("Inserire almeno 3 caratteri nel campo testo")
		return false;
	} else if ( parseInt(form.when.value, 10) == 12 && parseInt(form.idTipologia.value, 10) == 0) {
		jAlert('Se selezioni tutte le date devi selezionare anche una tipologia', 'Attenzione');
		//alert("Se selezioni tutte le date devi selezionare anche una tipologia")
		return false;
	}
	return true;

}

function checkFieldsLocali(form) {
	if (form.tipologie.value == "" && form.nome.value.length < 3 && form.vicinoa.value.length < 3){
		var stringalert = "Selezionare almeno un criterio di ricerca. Inserire almeno 3 caratteri nel campo di ricerca."
		jAlert(stringalert, 'Attenzione');
		//alert(stringalert)
		return false;
	}
	return true;
}

function checkFieldsSport(form) {
	if (form.nome.value.length < 3 && form.vicinoa.value.length < 3 && form.tipologie.length < 3){
		var stringalert = "Compilare almeno un criterio di ricerca. Inserire almeno 3 caratteri nel campo di ricerca."
		jAlert(stringalert, 'Attenzione');
		//alert(stringalert)
		return false;
	}
	return true;
}

function checkFieldsRistoranti(form) {
	if (form.tipologie.value == "" && form.nome.value.length < 3 && form.vicinoa.value.length < 3 && form.fasciaprezzo.value == ""){
		var stringalert = "Selezionare almeno un criterio di ricerca. Inserire almeno 3 caratteri nel campo di ricerca."
		jAlert(stringalert, 'Attenzione');
		//alert(stringalert)
		return false;
	}
	return true;
}
var nuova_finestra=null;
function closeWin(){
	if(nuova_finestra!=null){
		if(!nuova_finestra.closed)
			nuova_finestra.close();
	}
}
function popUpWin(url,type,strWidth,strHeight){
	closeWin();
	type=type.toLowerCase();
	if(type=="full-screen"){
		strWidth=screen.availWidth;
		strHeight=screen.availHeight;
	}
	var tools="";
	if(type=="standard")tools="resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width="+strWidth+",height="+strHeight+",top=0,left=0";
	if(type=="console"||type=="fullscreen")tools="resizable,toolbar=no,location=no,scrollbars=yes,width="+strWidth+",height="+strHeight+",left=0,top=0";
	nuova_finestra=window.open(url,'nuova_finestra',tools);
	nuova_finestra.focus();
}
function checkPopUp(){
  $.cookie('advertising-login', 'true' , { path: '/', expires: 30 });
  $.modal.close();
  return false;
}
// restituisce la variabile passata nella querystring
function querySt(ji) {
  hu = window.location.search.substring(1);
  gy = hu.split("&");
    for (i=0;i<gy.length;i++) {
      ft = gy[i].split("=");
        if (ft[0] == ji) {
          return ft[1];
        }
    }
}
/*box annunci terza colonna*/
function submitButtonAnnunciHP(){
	var cosacerchi_annunci = $("#cosacerchi_annunci").val();
	var param_ann = "cerco";
	var search_annunci_encode ="";
	var search_annunci ="";
	var url_ricerca ="";
	var indirizzo_link = window.location.href;
	var indirizzo_link_home = indirizzo_link.split('/');
	var comune_link = indirizzo_link_home[2].split('.');
	var comune_search = comune_link[0];
	var url_annunci = "http://annunci.corriere.it";
	defaultStr_ann='standard|data-pubblicazione|desc|offro|*';
	document.cookie='annunciRicerca=' + defaultStr_ann + "; path=/;domain=.corriere.it";
	if(($("#cosacerchi_annunci").val()).indexOf("Cosa cerchi?") == -1 && ($("#cosacerchi_annunci").val()).replace(/ /g, "") != ""){
		search_annunci = $("#cosacerchi_annunci").val();
		search_annunci_encode =encodeURIComponent(search_annunci);
	    url_annunci += "/"+search_annunci_encode+"-0/" + comune_search+"-3" + "/1-p.htm?search="+search_annunci;
		url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=36&INI=8&TIPOCLICK=0&URL=" + url_annunci;
		document.location.href = url_ricerca;
	}
}
/*fine box annunci*/
/*ricerca libera annunci local*/
function getDatiCookie(cookieName){
	cookie=$.cookie(cookieName);
	if(cookie!=null) dati=cookie.split("|") ;
	else dati=false;
	return dati;
}	
function setCookieList(i,param){
	/*************************
	
	i=0 set visualizzazione
	i=1 set ordina per (prezzo/data)
	i=2 set asc/desc (per ordinamento prezzo/data)
	i=3 set cerco/offro
	i=4 set prezzo
	
	**************************/
	defaultStr='standard|data-pubblicazione|desc|offro|*';
	dati=getDatiCookie('annunciRicerca');
	if(!dati) dati=defaultStr.split('|');
	dati[i]=param;
	$.cookie('annunciRicerca',dati.join('|') ,{path:"/",domain:".corriere.it"});
	return false;
	
};
function cosacerchi(){
    var re = new RegExp("[^A-Za-z0-9]","g")
    if($('#boxAvvisi .btn_cerca_pic').length>0) var ricerca=$("#boxAvvisi .inputCerca").val();
    else var ricerca=$(".cosacerchi").val();
    b_cerca=true;
    if(ricerca.length<3) b_cerca=false;
    ricerca=ricerca.toLowerCase();
    ricerca=$.trim(ricerca);
    //ricerca_encode=encodeURIComponent(ricerca);
    ricerca_encode=ricerca;
    ricerca=ricerca.replace(re,'-');    
    while(ricerca.match('--')){
        ricerca=ricerca.replace('--','-');
    }    
    while (ricerca.substring(0,1) == '-'){
        ricerca = ricerca.substring(1, ricerca.length);
    }    
    while (ricerca.substring(ricerca.length-1, ricerca.length) == '-'){
        ricerca = ricerca.substring(0,ricerca.length-1);
    }
    //si porta dietro i parametri delle ricerche precedenti
    //urlRicerca=window.location.hostname+'/'+urlGenerator(window.location.pathname,ricerca+'-0'); 
    //inizia una nuova ricerca con il solo parametro di testo libero inserito
	
    setCookieList(1,'*');
    urlRicerca='annunci.corriere.it'+'/'+ricerca+'-0/lombardia-1/milano-2/milano-3/1-p.htm';
    while(urlRicerca.match('//'))urlRicerca=urlRicerca.replace('//','/')
    if(b_cerca)window.open('http://'+urlRicerca+'?search='+ricerca_encode);
    else openAlertPopup('Inserire almeno 3 caratteri per fare una ricerca')
}/*fine ricerca libera annunci local*/

function orAlign(divFiglioW, divContW) {
	var divContainerW = $('#'+divContW+' .imgCont').width();
	var leftFiglio = divContainerW-divFiglioW/2;
	$('#'+divContW+' .imgCont .foto_ob').css('left', ''+leftFiglio+'px');
	//funziona
	$('#'+divContW+' .imgCont .foto_ob').css('position','absolute');
	$('#'+divContW+' .imgCont .foto_ob').css('left','50%');
	var $img = $('#'+divContW+' .imgCont .foto_ob img');
	var w = $img.width();
	$img.css('margin-left', + w / -2 + "px");
}
function checkCookieRCSlogin(){
var usn=jQuery.cookie("rcsLogin");
	if(usn!=null){
		usn=usn.substring(0,usn.indexOf("|"));
		if(usn.indexOf("@")==-1){
			//cookie obsoleto lo cancello
			jQuery.cookie("rcsLogin", null,{path: '/', domain  : 'corriere.it'});
			$('#content-generated-dlt').html(htmlLogin);
		}else{
			usn=usn.substring(0,usn.indexOf("@"));
			usn = usn.replace("\"","");
			$("#user-name").html(usn);
			// non utilizzare toggle per non spaginare.
			// imposto il diplay:inline direttamente..
			$("#headBoxLogin .notlogged").css("display", "none");
			$("#headBoxLogin .logged").css("display", "inline");
				//Se l'utente è loggato, chiamo l'applicazione DLT per far comparire il form di invio commento
				if($("#comment_box_article #commenta").length > 0){

					loadContentDLT($('#commenta').attr('href'));
				}
		}
	}
	else {
			if($("#comment_box_article #commenta").length > 0) {
				$('#content-generated-dlt').html(htmlLogin);
			}
		$("#headBoxLogin .logged").hide();
		$("#headBoxLogin .notlogged").show();			
	}
	if($("#box_login_dlt .login_dlt").length > 0){
		//$("#testatina_dlt a[href=#scrivicommenti]").css("display","none");	
	}
	else {
		$("#testatina_dlt a[href=#scrivicommenti]").addClass("login_btn_a");
	}
	
	// commenti article toolbar
	if($("#comment_box_article").length > 0){
		text_tool = "";
		text_tool_share = "";
		num_com = $("#body_dlt span.num_dlt").html();
		if( num_com  == 0){
			// se ? ancora commentabile
			if($("#box_login_dlt").length > 0){
				text_tool = "<li class='commenti-tool'>&nbsp;<a href='#boxcommenta' title='commenti'>COMMENTA</a></li>";
				text_tool_share = '<div class="comment-box"><a href="#boxcommenta" class="comment">Commenti dei lettori</a><span>---</span></div>';



			}
		} else {
			text_tool = "<li class='commenti-tool'>&nbsp;<a href='#commenti' title='commenti'><strong>"+num_com+"</strong> COMMENTI</a></li>";
			text_tool_share = '<div class="comment-box"><a href="#commenti" class="comment">Commenti dei lettori</a><span>'+num_com+'</span></div>';
		}
		$(".article .toolbar").prepend(text_tool);
		$("#share-article-box .share_box").before(text_tool_share);
	}	

/*	$("#headBoxLogin a.headLogin").not("#connect_FB_link").click(function(){
		$("#formLoginRegistrati > input[name = 'contentPath']").val(document.location.href);
		$("#formLoginRegistrati").submit();
		return false;
	});
	$("#headBoxLogin a.headRegistrazione").not("#connect_FB_reg").click(function(){
		$("#formRegistrazione > input[name = 'contentPath']").val(document.location.href);
		$("#formRegistrazione").submit();
		return false;
	});

	$("#headBoxLogin a.headLogout").click(function(){
		$("#formLogout > input[name = 'contentPath']").val(document.location.href);
		$("#formLogout").submit();
		return false;
	});
*/
}

    function quotazioni_gioiello(){
        $.ajax({
            url: "/libs/json/gailgioiello.json",
            dataType: 'json',
            success: function(json){
                $.each(json, function(key, val){
                    var master = key;
                    $.each(val, function(a, b){
                        if (a != "vendita") {
                            var valuta = " €/g ";
                        }
                        else {
                            var valuta = "";
                        }
                        var c = valuta + b;
                        $('#box_quotazioni_oro ul li span#' + master + a).html(c);
                    });
                });
                
            }
        });
        setTimeout("quotazioni_gioiello()", 60000);
    }
	

function sharebutton(twaccount,dominio) {
	typeof twaccount == "undefined" ? twaccount = "corrieremilano" : twaccount;
  	$('.share-button').mouseover(function() {
    	var urlarticolo=$(this).attr('data-href');
	 	var text_articolo= "";	 
	 	if($(this).find(".share-balloon ul").length == 0){
			if($(this).find(".title_art").length > 0) {
				text_articolo=$(this).find(".title_art").text();
			 	text_articolo = encodeURIComponent(text_articolo);
			}
			if(urlarticolo.indexOf("http") == -1) urlarticolo =  "http://" + dominio + urlarticolo;
			urlarticolo = encodeURIComponent(urlarticolo);
		 	$('.share-balloon', this).html('<ul><li class="share-fb"><iframe src="//www.facebook.com/plugins/like.php?href='+urlarticolo+'&amp;send=false&amp;layout=box_count&amp;width=75&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=90" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:75px; height:90px;" allowTransparency="true"></iframe></li><li class="share-tw"><iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?url='+urlarticolo+'&text='+text_articolo+'&amp;count=vertical&amp;via='+twaccount+'" style="width:55px; height:62px;"></iframe></li></ul>');
		 }
     	$sharebaloon = $('.share-balloon', this);
     	window.setTimeout(function() {
     		$('.share-balloon .loader-share').hide();
        	$sharebaloon.find('ul').show();
     	}, 1500);
    	$('.share-balloon', this).show();
	});
  	$('.share-button').mouseout(function() {
    	$('.share-balloon').hide();
  	});
}

$(document).ready(function() {
	
	/*3colrestyling*/
	if ($('.square-top').length) {controllaAdv('.square-top');}
	if ($('.square-bottom').length) {controllaAdv('.square-bottom');}
	$("#col-dx #tabellino-hp .tablequote-matchlist tr:even").addClass("even")
	
	$("#utilita_box_local a").hover(function(){
		$(this).append("<span class='cloud'>"+$(this).attr("rel")+"</span>");
	},function(){
		$("#utilita_box_local span.cloud").remove();
	})
	
	/*FactChecking*/
	if($("#article_sh_box .fact_chk_link").length > 0) {	
		var fact_chk_url = encodeURIComponent(document.URL);
		$.get("http://599051a41179727d6de1-b9f24bdc75e3500a59ef70d3d31fe810.r12.cf2.rackcdn.com/1x1.gif?from="+fact_chk_url);
		if($("#article_sh_box > h3").text().length < 2){$("#article_sh_box").css("padding-top","5px");}
	}
	if($(".homearticle-box .fact_chk_link").length > 0) {	
		$(".homearticle-box .fact_chk_link").each(function(){
			if($(this).parents(".homearticle-box:eq(0)").find("h1").length == 1){
				if($(this).parents(".homearticle-box:eq(0)").find("h2").length == 0 && $(this).parents(".homearticle-box:eq(0)").find("p.subtitle").length == 0){
					$(this).parents(".homearticle-box:eq(0)").css("padding-top","15px");
				}				
			}
			else if($(this).parents(".homearticle-box:eq(0)").find("p.subtitle").length == 0){
				$(this).parents(".homearticle-box:eq(0)").css("padding-top","15px");
			}
		})
	}						   

	if($("#home").length > 0) {sharebutton("corrieremilano","milano.corriere.it");}

	/*ingrandisce foto articolo*/
	$("a.zoom-modal").click(function(event){
		event.preventDefault();
		var dim_modal = "dim_modal_620";
		var dim_span = "w610";
		var dim_zoom_w = 644;
		var dim_zoom_h = 444;
		
		if(($(this).attr("class")).indexOf("dida170") > -1){
			dim_modal = "dim_modal_420";
			dim_span = "w410";
		    dim_zoom_w = 444;
		    dim_zoom_h = 444;			
		}
	 var zoomWidth = 0, zoomHeight = 0, zoomTop = 10, zoomLeft = 10;
	  if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		zoomWidth = window.innerWidth;
		zoomHeight = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		zoomWidth = document.documentElement.clientWidth;
		zoomHeight = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		zoomWidth = document.body.clientWidth;
		zoomHeight = document.body.clientHeight;
	  }		

	  if(zoomHeight > dim_zoom_h){
		zoomTop = (zoomHeight - dim_zoom_h) /2;
	  }
	  if(zoomWidth > dim_zoom_w){
		zoomLeft = (zoomWidth - dim_zoom_w) /2;
	  }
		var span_html = " ";
		if($(this).find(".dida_bt_article").length > 0) span_html = $(this).find(".dida_bt_article").html();	  
		$.modal('<div id="img_to_zoom" class="'+dim_modal+' '+dim_span+'"><img src="'+$(this).attr("href")+'" />'+span_html+'</div>',{
			containerId:"containerZoom",
			position: [zoomTop,zoomLeft],
			overlayClose:true
    	});
  	})							   

	//BOX OBBIETTIVO ITALIA
	
	/*
if($("#box_last_obiettivo").length > 0){
		var codice_contesto = "03/";
		var codice_contesto_pg = "03-";
		var txtReg="Lombardia";
		
	var indexFileUrl = "/linked_webroots/8100.corriere.it/foto/regione/"+codice_contesto+codice_contesto_pg+"link.js";
	var galleryFileBase = "/linked_webroots/8100.corriere.it/foto/regione/"+codice_contesto+"gallery-"	
	$.ajax({
		url: indexFileUrl,
		async: true,
		cache: false,
		dataType: "json",
		success: function(json){
			totalePagine = new Number (json.links.length);
			galleryFileBase = galleryFileBase+totalePagine+".js";
				$.ajax({
					url: galleryFileBase,
					async: true,
					cache: false,
					dataType: "json",
					success: function(json) {
						var id_up_ob = "";
						var desc_up_ob = "";
						var nome_up_ob = "";
						var comune = "";
						var siglaProv= "";
						$.each(json.pagina.items, function(i, item) {
							id_up_ob = item.idUpload;
							desc_up_ob = item.descrizione;
							nome_up_ob = item.user.nome+" "+item.user.cognome;
							comune = item.href;
							siglaProv = item.siglaProvincia;						
						});
						comune= comune.split('.')[0];
						var box_ob_hp = '<span class="title_top">FOTO DELLA <strong>'+txtReg+'</strong></span>'+
							'<a href="/foto/regione/fotogallery.shtml" title="Tutte le foto" class="all_foto">TUTTE LE FOTO</a>'+
							'<div class="imgCont"><a href="/foto/regione/fotogallery.shtml" title="Tutte le foto" class="foto_ob"><img src="http://media2.corriere.it/corriere/amolitalia/preview_'+id_up_ob+'.jpg" alt="" /></a></div>'+
							'<div class="text_ob">'+
							'<span class="comune_ob">'+comune+' ('+siglaProv+')</span><br />'+
							'Autore: <span class="autore_ob">'+nome_up_ob+'</span>'+
							'</div>'+
							'<div class="box_bottom_ob">'+
								'Esplora e <a href="/foto/regione/fotogallery.shtml" title="Tutte le foto">vota</a> le pi&ugrave; belle immagini della tua regione.<br />Partecipa al concorso e <a href="/concorso/about_page.shtml" title="Fantastici premi">vinci</a> fantastici premi'+
							'</div>';
						
						$("#col-dx #box_last_obiettivo").prepend(box_ob_hp);
						$("#col-dx #box_last_obiettivo").css("display","block");
						
						$('#box_last_obiettivo .imgCont img').load(function() {
							var divContW = 'box_last_obiettivo';
							var divFiglioW = $(this).width();
							orAlign(divFiglioW, divContW);
						});
					}
			});

		}
	});	
}
*/
//FINE BOX OBBIETTIVO ITALIA
	
	/*ANNUNCI LOCAL*/
	$("#body_annunci .cont_box_hp a").attr("target", "_blank");
	$(".link_bottomPage a").attr("target", "_blank");
	
	$(".openlist").click(function(e){
		e.preventDefault();
		if($("#overlist").css("display")=="none"){
			$(this).html("(-)");
			$("#overlist").css("display","block");
			$("#overlist").parents(".box_list:eq(0)").css({"z-index":"9998", "position":"relative"});
		}
		else {
			$(this).html("(+)");			
			$("#overlist").css("display","none");
		}
	});	
	
	var count_categoria = $(".cont_head .box_tit .testo");
	if (count_categoria.length > 0){
	   var json;
	   var this_local = "Milano";
	   var i = 0;
	   $.ajax({ 
		   type: "POST", 
		   data: this_local,
		   async: true,
		   dataType: "json", 
		   cache: false, 
		   url: '/linked_webroots/annunci.corriere.it/ssi/boxes/json/annunciCorriereLocalHP/annunciCorriereLocalJsonList.json',
		   success: function(json) { 
			   $.each(count_categoria, function(){
				   $(this).text(json[0].categoriaList[i++].countAnnuncio);
			   
			   });    
		   } 
	   }); 
	}
        
	/*setto immagine nello share di facebook
	var imageSrc = $(".article div img").attr("src");
	if(imageSrc){
		var thumbnail = "http://milano.corriere.it"+imageSrc;
		$("#fb_image_src_share").attr("content", thumbnail);
	} */
	/*box annunci 3col*/
	if($("#box-annunci").length > 0){
		
		$('.elenco-annunci').parent().addClass('slides_container')
		$(function(){
			$('#box-annunci').slides({
				preload: true,
				preloadImage: '/libs/css/default_theme/sliderAnnunci/loading.gif',
				play: 5000,
				pause: 2500,
				hoverPause: true,
				animationStart: function(current){
					$('.caption').animate({
						bottom:-35
					},100);
					
				}
			});
		});
		
		$("#box-annunci .annunci-section a.annunci-pubblicati strong").each(function(){
			var valore_var = $(this).html();
			valore_var = valore_var.replace(/,/g,'.');
			$(this).html(valore_var);
		});
		
		$("#box-annunci #annuncio-head a strong").each(function(){
			var valore_var = $(this).html();
			valore_var = valore_var.replace(/,/g,'.');
			valore_var = valore_var.replace("Prezzo su richiesta","");
			valore_var = valore_var.replace("prezzo su richiesta","");
			valore_var = valore_var.replace("n.d.","");
			$(this).html(valore_var);
		});
		
		$("#cosacerchi_annunci").keyup(function(e) {
			if(e.keyCode == 13) {
				submitButtonAnnunciHP();
			}
		});					  
							  
		$("#cosacerchi_annunci").click(function(){
			if(($("#cosacerchi_annunci").val()).indexOf("Cosa cerchi?") > -1 ) $("#cosacerchi_annunci").val("");
		});
	
		$(".elenco-annunci:first").addClass("shown-advice");
		
		if ($(".shown-advice #annuncio-head a p").html().length > 40){
				$(".shown-advice #annuncio-head a p").each(function(){})
				$(".shown-advice #annuncio-head a p").html($(".shown-advice #annuncio-head a p").html().substring(0,40));
				$(".shown-advice #annuncio-head a p").append("...");
			}
		
		var currentAnnuncio = $(".shown-advice");

		function changeAnnuncio(){
			 
			currentAnnuncio.removeClass("shown-advice");
			if(currentAnnuncio.next().length == 0) {
			   currentAnnuncio = $(".elenco-annunci:first");
			} else {
				currentAnnuncio = currentAnnuncio.next();
			}
			currentAnnuncio.addClass("shown-advice");
			
			if ($(".shown-advice #annuncio-head a p").html().length > 40){
				$(".shown-advice #annuncio-head a p").each(function(){})
				$(".shown-advice #annuncio-head a p").html($(".shown-advice #annuncio-head a p").html().substring(0,40));
				$(".shown-advice #annuncio-head a p").append("...");
			}
		};

		function changeAnnuncioBack(){
			currentAnnuncio.removeClass("shown-advice");
			if(currentAnnuncio.prev().length == 0) {
			   currentAnnuncio = $(".elenco-annunci:last");
			} else {
				currentAnnuncio = currentAnnuncio.prev();
			}
			currentAnnuncio.addClass("shown-advice");
			
			if ($(".shown-advice #annuncio-head a p").html().length > 40){
				$(".shown-advice #annuncio-head a p").each(function(){})
				$(".shown-advice #annuncio-head a p").html($(".shown-advice #annuncio-head a p").html().substring(0,40));
				$(".shown-advice #annuncio-head a p").append("...");
			}
		};

		var switchAnnunci = setInterval(changeAnnuncio, 5000);
		
		$(".photo_next").click(function(){
		   changeAnnuncio(); 
		   clearInterval(switchAnnunci);
		});
		
		$(".photo_prev").click(function(){
		   changeAnnuncioBack(); 
		   clearInterval(switchAnnunci);
		});
	}
	/*fine box annunci*/
						   
	if($("body.sub-aperture").length > 0 ) {
		if($("#pushpin-list li").length > 0 ) {
			count_li_n = 1;
			num_var = 1;
			$("#pushpin-list > li").each(function(){
				$(this).addClass("simplePagerPage"+count_li_n);
				if(num_var%10 == 0) count_li_n++;
				num_var++;
			});
			$("#pushpin-list").quickPager({
				leftArrowObject: "<img width='13' height='10' src='/img/freccia_sx.gif'/>",
				rightArrowObject: "<img width='13' height='10' src='/img/freccia_dx.gif'/>",
				handlePageClass: false
			});
			$("#pushpin-list").css("display","block");
		}
		else {
			$("h4.no_result").css("display","block");
		}
	}
	$("#idCategoria").change(function(){
		setIdTipologia($(this).val(), 0);
	});						   
//DI LA TUA
	if($(".box-dlt").length > 0){
		text_tool = "";
		num_com = $(".box-dlt .box_commenti_dlt strong").text();
		if( num_com  == 0){
			if($(".box-dlt #commenta").length > 0){
				text_tool = "<li class='commenti_tool_dlt'>&nbsp;<a href='#boxcommenta' title='commenti'>COMMENTA</a></li>";
			}
			//nascondo il box con il numero dei commenti se sono a zero
			$('.dlt_small:first').hide();
			//$('.all-message').hide();
		} else {
			text_tool = "<li class='commenti_tool_dlt'>&nbsp;<a href='#commenti' title='commenti'><strong>"+num_com+"</strong> COMMENTI</a></li>";
		}
		//$(".article .toolbar").prepend(text_tool);
		
		$(".article .toolbar #smaller-text").parent().before(text_tool);	}

  if(querySt("p") != null) {
    jQuery("#col-sx .tabs-agenda").not(".tabs-agenda[id*=push_id_]").css("display","none");
    jQuery("#push_id_"+querySt("p")).css("display","block");

    if(jQuery("body.itinerarivisentin .ris-agenda").length >0){
      jQuery("body.itinerarivisentin .ris-agenda li a.title, body.itinerarivisentin .ris-agenda li a.leggi").each(function(){
          jQuery(this).attr("href",jQuery(this).attr("href")+"?p="+querySt("p"));
      });
    }
  }
//POPUP LOGIN
		if($('.popup_advertise').length > 0) {
			if($.cookie('advertising-login') == null || $.cookie('advertising-login')!= "true"){
				$('.popup_advertise').modal({overlayClose:true,
			                         	containerId : 'simplemodal-advertise',
                                onClose: function (dialog) {
                                    	dialog.data.fadeOut('slow', function () {
                                    		dialog.container.slideUp('slow', function () {
                                    			dialog.overlay.fadeOut('slow', function () {
                                    				$.modal.close();
                                    			});
                                    		});
                                    	});
                                    }});

			}
		}
//FINE POPUP LOGIN
$("a[rel*=popup]")
.click(function(){
	var t="standard";
	var w="780";
	var h="580";
	var href_var=$(this).attr("href");
	if(href_var.indexOf("/milano/cinema_e_teatro/") == -1) {
		if(href_var.indexOf("/milano/") > -1) href_var = href_var.replace("/milano","");
	}
	attribs=$(this).attr("rel").split(" ");
	if(attribs[1]!=null){t=attribs[1];}
	if(attribs[2]!=null){w=attribs[2];}
	if(attribs[3]!=null){h=attribs[3];}

	popUpWin(href_var,t,w,h);
	return false;
})
.each(function(){
	if($(this).attr("rel").indexOf("noicon")==-1){
		$(this).addClass("new-window").attr("title",$(this).attr("title")+"  [Apre una nuova finestra]");
	}
});

	//$('#mn_(none)').addClass("selected");
	//var localita = $(document).getURLParam("localita"); //leggo il nome della localitÃ  passato da URL


	//console.log(var_citta)
	if(meteosezione != 'undefined') {
		var_citta = meteosezione;
		dammiInfoLocalita(var_citta);//richiamo la funzione per la lettura dei dati d'interesse
		buildCarBox(carSezione);
	};

if($("#article_sh_box").length > 0){
	$("#smaller-text, #smaller-text-bt").click(function(){
		var size=parseInt($("#content-to-read").css("font-size"))-2+"px";
		if(parseInt(size)>=10){
			$("#content-to-read").css("font-size",size);
		}
		return false;
	});
	$("#bigger-text, #bigger-text-bt").click(function(){
		var size=parseInt($("#content-to-read").css("font-size"))+2+"px";
		if(parseInt(size)<26){
			$("#content-to-read").css("font-size",size);
		}
		return false;
	});
}
else {
	$("#smaller-text").click(function(){
		var size=parseInt($(".article p").css("font-size"))-2+"px";
		if(parseInt(size)>=10){
			$(".article p").css("font-size",size);
		}
		return false;
	});
	$("#bigger-text").click(function(){
		var size=parseInt($(".article p").css("font-size"))+2+"px";
		if(parseInt(size)<26){
			$(".article p").css("font-size",size);
		}
		return false;
	});
}	


/* nuova pagina multimedia */
if ($("#article-multimedia").length > 0){
	$("#article-multimedia .open-widget-video").click(function () {
		$("#article-multimedia .container-video-player").html("");
		$("#article-multimedia .video-wrapper").removeClass("video-wrapper-open");
		var wrapperDiv = $(this).parents("div.multimedia-wrapper");
		var wrapperVideo = $(wrapperDiv).find("div.container-video-player");
		var wrapperVideoPath = $(wrapperVideo).attr("rel");
		$(wrapperDiv).addClass("video-wrapper-open");
		$.ajax({
			type: "GET",
			url: "/widget/players/shtml/PolymediaCorriere620ajax.shtml?"+wrapperVideoPath+"&autoplay=true&playlistorder=dateDesc&",
			dataType: "html",
			success: function(data) {
				setTimeout(function() {$(wrapperVideo).writeCapture().html(data);},2000);
			}	
		})
		return false;
	});
	
	if ($("#article-multimedia .multimedia-wrapper:first").hasClass("video-wrapper")){
   		$("#article-multimedia .multimedia-wrapper:first").find(".open-widget-video").click();
	}	
	$.writeCapture.autoAsync();
}


	var corcommunity_var = "https://milano.corriere.it/corcommunity/accesso/LogOut.do";
	if((window.location.host).indexOf("www2") > -1 || domain_community == 1) {
		corcommunity_var = "/corcommunitynew/accesso/LogOut.do";
		$("#headBoxLogin .notlogged").show();
	}
	else{
		checkCookieRCSlogin();
		$("#headBoxLogin a.headUsn").click(function(){
			$("#formModifica").submit();
			return false;
		});
	}
	
	$("#headBoxLogin a.headLogout").click(function(event){
		event.preventDefault();	
		$.ajax({
		  type: "POST",
		  data: {contentPath : ""},
		  cache: false,
		  dataType: "html",
		  url: corcommunity_var,
		  success: function(data) {
			if((document.location.href).indexOf("ModificaRegistrazioneSkinoverlay.do") > -1){
				document.location = "/";
			}				  
			//checkCookieRCSlogin();
			window.location.reload();
		  },
		  error: function(data) {
			if((document.location.href).indexOf("ModificaRegistrazioneSkinoverlay.do") > -1){
				document.location = "/";
			}				  
			//checkCookieRCSlogin();
			window.location.reload();
		  } 		  
		});		
	});

//	var usn=$.cookie("cmLogin");
//	if(usn!=null){

//		usn=usn.substring(0,usn.indexOf("|"));
//		$("#user-name").html(usn);
//		$("#headBoxLogin span.notlogged").css("display", "none");
//		$("#headBoxLogin span.logged").css("display", "inline");
//	}
//	$("#headBoxLogin a.headUsn").click(function(){
//		$("#formModifica").submit();
//		return false;
//	});


	$("ul.italiaoggi li a").attr("target","_blank")


	$(".input-sbianca").focus(function() {
		if($(this).val() != "") {
			$(this).val(""); //Svuoto il contenuto.
		}
	});

	// link nel box cosa vuoi cercare (seconda colonna) che scatena la ricerca agenda per tipologia
	$(".linkTip").click(function () {
		var idTipologia = $(this).attr("rel").substring(1);
		$(".search_agenda select[name='idTipologia']").val(idTipologia);
		$(".search_agenda input[type='submit']").click();
		return false;
	});

	// preselezione del form ricerca agenda in base alla variabile evento dell'agenda
	/*var sel;
	switch ($("body:first").attr("class")) {

		case "eventi":
			sel = 0;
			break;

		case "ristoranti":
			sel = 1;
			break;

		case "locali":
			sel = 2;
			break;

		case "cinema":
			sel = 3;
			break;

		case "teatri":
			sel = 4;
			break;

		case "sport-benessere":
			sel = 5;
			break;

		default:
			sel = 0;

	}*/


	/* tabs facebook 3col */
    if ($('#box-fb').length > 0) {
		//$('#scroll-box-fb, #scroll-box-fb2').jScrollPane({showArrows:false,scrollbarWidth:18,dragMaxHeight:15});
		$('#box-fb').tabs();
	}
	
	/*piuletti seconda colonna articolo */
	if ($('#piuletti_2a').length > 0) {
		$('#piuletti_2a .class-container ul').each(function(){
			$(this).find("li:gt(5)").remove();
		})
		$('#piuletti_2a .nav').tabs();
		
	}
	
	

	/* Gestione randomica del tab visualizzato ANNUNCI (trovocasa-lavoro-auto) */
	var r = Math.ceil((3*Math.random())) - 1;
	if ($('#tabs-annunci').length > 0) {
		$("#tabs-annunci .elenco-tab").children().each(function (i) {
			if (i == r) {
				$(this).addClass("ui-tabs-selected");
			}
		});
		$("#tabs-annunci .elenco-tab").tabs();
	}

	/* Gestione randomica del tab visualizzato AGENDA */
	var r = Math.ceil((6*Math.random())) - 1;
	if ($('#tabs-agenda').length > 0) {
		$("#tabs-agenda .elenco-tab").children().each(function (i) {
			if (i == r) {
				$(this).addClass("ui-tabs-selected");
			}
		});
		$('#tabs-agenda').tabs();
		$('#tabs-agenda').css("display","block");
	}


	// paginazione risultati agenda (eventi e teatro)
	if ($('#ris-eventi').length > 0) {
		$("#ris-eventi").quickPager({
			leftArrowObject: "<img width='13' height='10' src='/libs/css/default_theme/assets/freccia_sx.gif'/>",
			rightArrowObject: "<img width='13' height='10' src='/libs/css/default_theme/assets/freccia_dx.gif'/>",
			handlePageClass: false
		});
	}

	if ($('#ris-entita').length > 0) {
		$("#ris-entita").quickPager({
			leftArrowObject: "<img width='13' height='10' src='/libs/css/default_theme/assets/freccia_sx.gif'/>",
			rightArrowObject: "<img width='13' height='10' src='/libs/css/default_theme/assets/freccia_dx.gif'/>",
			scrollAnimate: false
		});
	}
	if ($('#ris-date').length > 0) {
		$("#ris-date").quickPager({
			leftArrowObject: "<img width='13' height='10' src='/libs/css/default_theme/assets/freccia_sx.gif'/>",
			rightArrowObject: "<img width='13' height='10' src='/libs/css/default_theme/assets/freccia_dx.gif'/>",
			handlePageClass: true,
			scrollAnimate: false
		});
	}


	// setta il title uguale al value nei campi della form con classe set-title
	$("form input.set-title").each(function() {
		$(this).attr("title", $(this).attr("value"));
	});

	// al submit controlla e sbianca il value se è quello di default (identico al title)
	$("form:has(input.set-title)").find(".submit").click(function () {
 	 	$(".set-title").each(function() {
			if ($(this).attr("title") == $(this).attr("value"))
				$(this).attr("value", "");
		});
	});

	// gestione link ticketone.
	// sono tutti nascosti da css, bisogna visualizzare nella scheda solo l'evento della data selezionata (param. url)
	if ($('#agenda_id').length > 0) {
		if ($('#agenda_id').text() == "id000") {

			// gestione "DOVE" per eventi con data multipla
			$(".item-info:first").addClass("item-info-selected")

			//var linkBack = $('#back-to-scheda').attr("href") + "?ageId=" + $('#agenda_id').html();
			//$("#back-to-scheda").attr("href", linkBack);

		} else {

			$(".link-acquista a").each(function() {
				if ($(this).attr("id") == $('#agenda_id').html()) {
					$(this).parent().css("display", "block");
					 //Controllo se il link è del piccolo teatro per mettere il logo corretto, altrimenti ticketone
					 var linkacquista = $(this).attr("href");
					 if(linkacquista.match("^"+"http://www.piccolocard.it")=="http://www.piccolocard.it") {
						 $(this).attr("class", "acquista_piccoloteatro");
					 } else {
						 $(this).attr("class", "acquista_ticketone");
					 }
				}
			});

			$(".link-acquista-teatro a").each(function() {
				 //Controllo se il link è del piccolo teatro per mettere il logo corretto, altrimenti ticketone
				 var linkacquista = $(this).attr("href");
				 if(linkacquista.match("^"+"http://www.piccolocard.it")=="http://www.piccolocard.it") {
					 $(this).attr("class", "acquista_piccoloteatro");
				 } else {
					 $(this).attr("class", "acquista_ticketone");
				 }
			});

			// passa il parametro a vedi tutte le date
			var linkTutte = $('.vedi-tutte').attr("href") + "?ageId=" + $('#agenda_id').html();
			$('.vedi-tutte').attr("href", linkTutte);

			// gestione "DOVE" per eventi con data multipla
			$(".item-info").each(function() {
				if ($(this).attr("id") == "evento_" + $('#agenda_id').html()) {
					$(this).addClass("item-info-selected");
				}
			});



			if ($('#back-to-scheda').length > 0) {
				var realPath = location.pathname.split('/')
				var backLink = $('#back-to-scheda').attr('href').split('/')
				var newBackLink = "/" + backLink[1] + "/" + realPath[2] + "/" + backLink[4] + "?ageId=" + $('#agenda_id').html();
				$('#back-to-scheda').attr('href',newBackLink)
			}

			//var linkBack = $('#back-to-scheda').attr("href") + "?ageId=" + $('#agenda_id').html();
			//$("#back-to-scheda").attr("href", linkBack);
		}
	}



	//fix per z-index ie6
	if ($('.layer-indirizzo').length > 0) {
		$('.layer-indirizzo').bgiframe();
	}

	if ($('.infobox').length > 0) {
		$('.infobox').bgiframe();
	}

	//submit del form con invio sulla select
	$(".tabs-agenda select").keyup(function(event){
		if (event.keyCode == 13) {
			$(this).parent("form").find("input.submit").click();
		}
	});

	// layer per l'inserimento dell'indirizzo per la form di ricerca agenda, campo "vicino a "
	$(".display-layer-indirizzo").focus(function() {
		$(this).parents("form").find(".layer-indirizzo").css("display", "block");
	});
	$(".close-layer-indirizzo").click(function() {
		$(this).parent().css("display", "none");
	});

	$(".hide-layer-indirizzo").click(function() {
		var root = 	$(this).parent();
		root.css("display", "none");
		var valore = ($("input[name='toponimo']", root).attr("value"));
		valore += " " + ($("input[name='nomevia']", root).attr("value"));
		valore += " " + ($("input[name='civico']", root).attr("value"));
		valore += " " + ($("input[name='citta']", root).attr("value"));
		root.parent().find(".display-layer-indirizzo").attr("value",valore);
	});

	//jscrollpane news
	/*if($("#flash-news").length > 0 ) {
		$('#flash-news').jScrollPane({showArrows:false,scrollbarWidth:15,dragMaxHeight:15});
	}*/

	// expand - collapse rappresentanti.
	if($("#expand").length > 0 ) {
		$('#expand a.expand').toggle(function() {
			$(this).parent('h4').next().show();
			$(this).parent('h4').next().children().show();
			$(this).parent('h4').next().next('div.separatore').hide();
			$(this).addClass('collapse');
		}, function() {
			$(this).parent('h4').next().hide();
			$(this).parent('h4').next().children().hide();
			$(this).parent('h4').next().next('div.separatore').show();
			$(this).removeClass('collapse');
		});

		var arrayUrl = window.location.href.substr(1,window.location.href.length).split("#");
		var toShow = arrayUrl[1];
		if (toShow) { // link specifico in cui è dichiarato quale informazione mostrare
			$('#expand #'+toShow+' a.expand:first').click();
		}

		//else { // link generico, mostra il promo elemento
		//	$('#expand h4.brown a.expand:first').click();
		//}
	}

	if ($('#ris-eventi').length > 0) {
		$(".info a.acquista").each(function() {
			//Controllo se il link è del piccolo teatro per mettere il logo corretto, altrimenti ticketone
			var linkacquista = $(this).attr("href");
			if(linkacquista.match("^"+"http://www.piccolocard.it")=="http://www.piccolocard.it") {
				$(this).attr("class", "acquista_piccoloteatro");
			} else {
				$(this).attr("class", "acquista_ticketone");
			}
		});
	}
	// paginazione eventi
	if($("#pubblica-utilita #col-sx .results").length > 0 ) {
		$("#pubblica-utilita #col-sx .results").quickPager({
        	pageSize: 20,
       		currentPage: 1
	    });
	}	
	
	
	if ($("#box-vivi-hp").length > 0) {
		
		$("#slide li a").attr("target","_blank");
		//$("#slideshow-container #prev2 img").attr("src","http://vivimilano.corriere.it/img/pager-prev-hp.png");
		//$("#slideshow-container #next2 img").attr("src","http://vivimilano.corriere.it/img/pager-next-hp.png");
		$("#slide").cycle({
			timeout: 5000,
			speed: 1000,
			fx: 'fade',
			next:   '#next2', 
			prev:   '#prev2'
		}); 
	 
		$("#slide li .info").css({'display':'block'});
		$("#slideshow-container #next2, #slideshow-container #prev2").click(function(){
			$("#slide").cycle('stop');
		})
		
		$(".cerca-vivi select").uniform();
		
		$(".example").example(function() {
			return $(this).attr('title');
		}); 
	
	}
	
	if ($("#box_quotazioni_oro").length > 0) {
		quotazioni_gioiello();
	}
	
});














	var offset=0;
	var paginazione=5;
	var totale=$("#corriere-tv-mid ul.corriere-tv-bottom li").length;
	$("#corriere-tv-mid ul.corriere-tv-bottom li").slice(offset,offset+paginazione).show();
	$("#corriere-tv-mid ul.corriere-tv-bottom li:visible:last").addClass("last");
	$('#mycarousel-next').bind('click',function(){
		offset=offset+paginazione;
		if(offset+paginazione>totale){offset=totale-paginazione;}
		$("#corriere-tv-mid ul.corriere-tv-bottom li:visible").hide().removeAttr("class");
		$("#corriere-tv-mid ul.corriere-tv-bottom li").slice(offset,offset+paginazione).show();
		$("#corriere-tv-mid ul.corriere-tv-bottom li:visible:last").addClass("last");
		return false;
	});
	$('#mycarousel-prev').bind('click',function(){
		offset=offset-paginazione;
		if(offset<0){offset=0;}
		$("#corriere-tv-mid ul.corriere-tv-bottom li:visible").hide().removeAttr("class");
		$("#corriere-tv-mid ul.corriere-tv-bottom li").slice(offset,offset+paginazione).show();
		$("#corriere-tv-mid ul.corriere-tv-bottom li:visible:last").addClass("last");
		return false;
	});
	function Aggiorna_frecce(){
		var li_restanti_big=0;
		try{
			li_restanti_big=totale_big-offset_big;
		}
		catch(r){
			li_restanti_big=offset_big;
		}
		if(offset_big==0){
			$("#mycarousel-prev_new").css({
				cursor:"default",
				opacity:"0.5",
				filter:"alpha(opacity=50)"
			});
			if(totale_big>6){
				$("#mycarousel-next_new").css({
				cursor:"pointer"});
			}
			else{
				$("#mycarousel-next_new").css({
					cursor:"default",
					opacity:"0.5",
					filter:"alpha(opacity=50)"
				});
			}
		}
		else{
			$("#mycarousel-prev_new").css({cursor:"pointer"});
			$("#mycarousel-prev_img").attr("src","https://images.corriere.it/images/precedente_att.gif");
			if(li_restanti_big>6){
				$("#mycarousel-next_new").css({cursor:"pointer"});
			$("#mycarousel-next_img").attr("src","https://images.corriere.it/images/successive_att.gif");}
			else{
				$("#mycarousel-next_new").css({cursor:"default"});
			$("#mycarousel-next_img").attr("src","https://images.corriere.it/images/successive_dis.gif");}
		}
	}
	if($("#corriere-tv-mid_new").length!=0){
		var offset_big=0;
		var paginazione_big=6;
		var totale_big=$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li").length;
		Aggiorna_frecce();
		$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li").slice(offset_big,offset_big+paginazione_big).show();
		$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li:visible:last").addClass("last");
		$('#mycarousel-next_new').bind('click',function(){
			offset_big=offset_big+paginazione_big;
			if(offset_big+paginazione_big>totale_big){offset_big=totale_big-paginazione_big;}
			Aggiorna_frecce();
			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");
			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li").slice(offset_big,offset_big+paginazione_big).show();
			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li:visible:last").addClass("last");
			return false;
		});
		$('#mycarousel-prev_new').bind('click',function(){
			offset_big=offset_big-paginazione_big;
			if(offset_big<0){offset_big=0;}
			Aggiorna_frecce();
			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");
			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li").slice(offset_big,offset_big+paginazione_big).show();
			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li:visible:last").addClass("last");
			return false;
	});}
	function Aggiorna_frecce_small(){
		var li_restanti_sm=0;
		try{
			li_restanti_sm=totale_sm-offset_sm;
		}
		catch(r){
			li_restanti_sm=offset_sm;
		}
		if(offset_sm==0){
			$("#mycarousel-prev_new").css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});
			if(totale_sm>4){
				$("#mycarousel-next_new").css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});
			}
			else{
				$("#mycarousel-next_new").css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});
			}
		}
		else{
			$("#mycarousel-prev_new").css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});
			if(li_restanti_sm>4){
				$("#mycarousel-next_new").css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});
			}
			else{
				$("#mycarousel-next_new").css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});
			}
		}
	}
	if($("#corriere-tv-mid_small").length!=0){
		var offset_sm=0;
		var paginazione_sm=4;
		var totale_sm=$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li").length;
		Aggiorna_frecce_small();
		$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();
		$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");
		$('#mycarousel-next_new').bind('click',function(){
			offset_sm=offset_sm+paginazione_sm;
			if(offset_sm+paginazione_sm>totale_sm){offset_sm=totale_sm-paginazione_sm;}
			Aggiorna_frecce_small();
			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");
			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();
			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");
			return false;
		});
		$('#mycarousel-prev_new').bind('click',function(){
			offset_sm=offset_sm-paginazione_sm;
			if(offset_sm<0){offset_sm=0;}
			Aggiorna_frecce_small();
			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");
			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();
			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");
			return false;
		});
	}
	if($("#corriere-motori-mid_small").length!=0){
		var offset_sm=0;
		var paginazione_sm=4;
		var totale_sm=$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li").length;
		Aggiorna_frecce_small();
		$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();
		$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");
		$('#mycarousel-next_new').bind('click',function(){
			offset_sm=offset_sm+paginazione_sm;
			if(offset_sm+paginazione_sm>totale_sm){offset_sm=totale_sm-paginazione_sm;}
			Aggiorna_frecce_small();
			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");
			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();
			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");
			return false;
		});
		$('#mycarousel-prev_new').bind('click',function(){
			offset_sm=offset_sm-paginazione_sm;
			if(offset_sm<0){offset_sm=0;}
			Aggiorna_frecce_small();
			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");
			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();
			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");
			return false;
		});
	}
	function Aggiorna_frecce_auto(tipo_vaschetta,num_elementi,id_frecce_prev,id_frecce_next){
		var li_restanti_sm_v=0;
		var li_restanti_sm_f=0;
		try{
			li_restanti_sm_v=totale_sm_v-offset_sm_v;
			li_restanti_sm_f=totale_sm_f-offset_sm_f;
}
catch(r){
	li_restanti_sm_v=offset_sm_v;
	li_restanti_sm_f=offset_sm_f;
}
if(tipo_vaschetta==0){
	if(offset_sm_v==0){
		$(id_frecce_prev).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});
		if(totale_sm_v>num_elementi){
			$(id_frecce_next).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});
		}
		else{
			$(id_frecce_next).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});
		}
		}
		else{
			$(id_frecce_prev).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});
			if(li_restanti_sm_v>num_elementi){
				$(id_frecce_next).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});
			}
			else{
				$(id_frecce_next).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});
			}
		}
}
if(tipo_vaschetta==1){
	if(offset_sm_f==0){
		$(id_frecce_prev).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});
		if(totale_sm_f>num_elementi){
			$(id_frecce_next).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});
		}
		else{
			$(id_frecce_next).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});
		}
	}
	else{
		$(id_frecce_prev).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});
		if(li_restanti_sm_f>num_elementi){
			$(id_frecce_next).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});
		}
		else{
			$(id_frecce_next).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});
		}
	}
}
}





 $("a.zoom-modal").click(function(event){

event.preventDefault();
var dim_modal = "dim_modal_620";
var dim_span = "w610";
if(($(this).attr("class")).indexOf("dida170") > -1){
dim_modal = "dim_modal_420";
dim_span = "w410";
}
var span_html = " ";
if($(this).find(".dida_bt_article").length > 0) span_html = $(this).find(".dida_bt_article").html();
$.modal('<div id="img_to_zoom" class="'+dim_modal+' '+dim_span+'"><img src="'+$(this).attr("href")+'" />'+span_html+'</div>',{
containerId:"containerZoom",
overlayClose:true
}); 
}); 