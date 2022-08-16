// variabile contenente il nome del Cookie di riferimento....
search = "cmLogin";
// ====================================================================================
function verificaPWD () {
	if (document.invioPasswordForm.femail.value == "") {
		alert("Inserire l'indirizzo email");
		return false;
	}
	return true;
}
//=====================================================
function submitPWD() {
	if (verificaPWD())
		document.invioPasswordForm.submit();
}
// =====================================================
function goSubmit() {
	document.utenteAnagFormBean.submit();
}
// ============= POPUP ======================
function popupPassword(url) {
	window.open(url,"","toolbar=no,width=380,height=240,top=50,left=50,directories=no,status=no,statusbar=no,resizable=1,menubar=no,scrollbars=no");
}
// ============= POPUP ======================
function Popup2(url) {
	window.open(url,"","toolbar=no,width=380,height=240,top=50,left=50,directories=no,status=no,statusbar=no,resizable=1,menubar=no,scrollbars=no");
}
// ============= MODIFICA ====================
function modifica() {
	document.modifica.submit();
}
// ============= LOGOUT ======================
function logout() {
	document.logout.submit();
}
// ============= VERIFICA =======================
function verifica() {
	document.login.url.value = document.location.href;
	if (document.login.username.value == "" || document.login.password.value == "") {
		alert("Impostare Username e Password");
		return false;
	}
	return true;
}
// =============================================
function logon(urlKo) {
	document.login.username.value = document.loginFormBean.username.value;
	document.login.password.value = document.loginFormBean.password.value;
	document.login.urlKo.value = urlKo
	document.login.submit();
}
function submitNickname() {
	document.utenteFormBean.submit();
}
// ============= LOGIN =======================
function iscrizione() {
	document.iscrizione.url.value = document.location.href;
	document.iscrizione.submit();
}
// ============= BOXLOGIN ====================
function getLoginValue() {
	var value = "notFound";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search);
		if (offset != -1) 
		{
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			value = document.cookie.substring(offset, end);
			//modifica = nel cookie
			if (value.indexOf("|") > -1) 
				value = value.substring(1, value.indexOf("|"));
		}
	}
	return value;
}
// ============= ISCOOKIEVALID ====================
function getIsLoginValid() {
	var value = getLoginValue();
	if (value == "notValid")
		return false;
	else
		return true;
}

// ============= ISCOOKIEVALID ====================
function getIsCookieValid() {
	var value = "" + getLoginValue();
//alert("value: " + value);
	if (value == "notFound" || value == "undefined" || value == "notValid") {
//alert("false");
		return false;
	} else {
//alert("true");
		return true;
	}
}
// ============== VERIFICA ======================
function verifica() {
	if (document.login.username.value == "" || document.login.password.value == "") {
		alert("Impostare Username e Password");
		return false;
	}
	return true;
}
// ================= FORM ======================
function formLogin (url, operation) {
	document.write('<form name="login" method="post" action="http://corrieredelmezzogiorno.corriere.it/cmcommunity/accesso/VerificaLogIn.do" onsubmit="return verifica();">');
	document.write('<input type="hidden" name="contentPath" value="' + url + '">');
	document.write('<input type="hidden" name="urlKo" value="">');
	document.write('<input type="hidden" name="username">');
	document.write('<input type="hidden" name="password">');
	document.write('</form>');
}
function formLogout () {
	document.write('<form name="logout" method="post" action="http://corrieredelmezzogiorno.corriere.it/cmcommunity/accesso/LogOut.do" onsubmit="return verifica();">');
	document.write('<input type="hidden" name="contentPath" value="">');
	document.write('</form>');
}
function formModifica () {
	document.write('<form name="modifica" method="post" action="http://corrieredelmezzogiorno.corriere.it/cmcommunity/accesso/ModificaRegistrazione.do">');
	document.write('</form>');
}
function galleria(path,n_galleria){
pathcompleta="/speciali/"+path+"/galleria/sopra.html?"+n_galleria
path_sin="/speciali/popup/foto.html"
path_des="/speciali/popup/vuoto.html"
newWin=open("","","menubar=no,location=no,toolbar=yes,status=no,scrollbars=yes,resizable=no,width=680,height=480");
newWin.document.write('<html><head><title>Galleria di immagini</title>');
newWin.document.write('</head>');
newWin.document.write('<frameset rows="45,*" border="0" frameborder="NO" framespacing="0">');
newWin.document.write('<frame src="'+pathcompleta+'" name="sopra" scrolling="NO" marginheight="5" marginwidth="5">');
newWin.document.write('<frameset cols="120,*" border="0" frameborder="NO" framespacing="0">');
newWin.document.write('<frame src="'+path_sin+'" name="sin">');
newWin.document.write('<frame src="'+path_des+'" name="des">');
newWin.document.write('</frameset></frameset>');
newWin.document.write('<noframes><body>Per visualizzare questa pagina &egrave; necessario un browser che supporti i frames</body></noframes>');
newWin.document.write('</html>');
//newWin.frames["sopra"].location.href=pathcompleta
}