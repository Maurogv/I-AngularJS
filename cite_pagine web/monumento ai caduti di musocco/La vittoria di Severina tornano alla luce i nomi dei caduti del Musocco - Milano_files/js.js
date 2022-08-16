
/* ******************************************
   FUNZIONE PER APRIRE IL POP PAROLE E POLITICA
   DENTRO IL FRAME PREDISPOSTO
****************************************** */
function parolepolitica(xlink){
	window.open('/Speciali/Politica/ParolePolitica/parolepolitica.shtml?/Speciali/Politica/ParolePolitica/' + xlink + 'index.shtml', 'pp' ,'width=750,height=520');void(0);
	}

function Calendario(xlink){
	window.open('/Speciali/Politica/Calendario/Calendario.shtml?/Speciali/Politica/Calendario/' + xlink + 'index.shtml', 'pp' ,'width=750,height=520');void(0);
	}

function pp(){
	window.open('/Speciali/Politica/ParolePolitica/parolepolitica.shtml?/Speciali/Politica/ParolePolitica/2006/11_Novembre/12/index.shtml', 'pp' ,'width=750,height=520');void(0);
	}


function mediacenter(str) {
this.location.href=str;
}



/*
 function mediacenter(str) {
 var mcwnd = window.open(str,"MediaCenter","statusbar=0,width=825,height=600,top=10,left=10");
 mcwnd.focus();
} 
*/

function mediacenter2(str) {
window.open(str,"MediaCenter","statusbar=0,width=825,height=600,top=10,left=10");
}

function galleriaFS(str,str2) {
window.open('/gallery/' + str + '/vuoto.shtml?' + str2 + '','FotoStorie','width=490,height=490,status=no');
}

function gallerianoads(str,str2) {
var larghezza = screen.Width;
if (larghezza >= 1024) {
window.open('/gallery/' + str + '/vuotonosfondo.shtml?' + str2 + '','gallery','width=745,height=660,status=no');
} else {
window.open('/gallery/' + str + '/vuotonosfondo.shtml?' + str2 + '','gallery','width=760,height=550,status=no');
}
}

function galleriaD(str,str2) {
var larghezza = screen.Width;
if (larghezza >= 1024) {
window.open('/gallery/' + str + '/vuotoD.shtml?' + str2 + '','gallery','width=745,height=660,status=no');
} else {
window.open('/gallery/' + str + '/vuotoD.shtml?' + str2 + '','gallery','width=760,height=550,status=no');
}
}

function galleriaalt(str,str2) {
var larghezza = screen.Width;
if (larghezza >= 1024) {
window.open('/gallery/' + str + '/vuoto_alt.shtml?' + str2 + '','gallery','width=740,height=670,status=no');
} else {
window.open('/gallery/' + str + '/vuoto_alt.shtml?' + str2 + '','gallery','width=740,height=540,status=no');
}
}


function audiovideo(str) {
window.open('' + str + '','audiovideo','width=735,height=480,status=no');
}

/* ++++++++++++++++++++++++++++++++++++++++++
   FUNZIONE PER APRIRE I POPUP DI RTSI
   ++++++++++++++++++++++++++++++++++++++++++ */
function pr99(rif) {
var largh = 295;
var hpos = screen.width-largh-20;
var vpos = 0;
if (rif==undefined) rif='';
mywindow = window.open('http://www.rtsi.ch/iraq/miniplayer.cfm?rif='+rif,'miniplayer','resizable=no,width=295,height=550,left='+hpos+',top=8,screenX=0,screenY=0');
}

/* ******************************************
   FUNZIONE PER APRIRE URL ESTERNI
   DENTRO IL FRAME PREDISPOSTO
****************************************** */
function openlink(xlink){
	window.open("/openxlink.shtml?" + xlink, "xpage");
	}


/* ******************************************
   FUNZIONE PER APRIRE IL POP 160 CARATTERI

****************************************** */

function CS(nomefile){
	var pathToRemove = "/Corriere della Sera";
	var lenPathToRemove = pathToRemove.length;
	if (nomefile.indexOf(pathToRemove) > -1) nomefile = nomefile.substring(lenPathToRemove);
	if (nomefile.indexOf(".xml") > -1)  nomefile = nomefile.substring(0, nomefile.indexOf(".xml")) + ".shtml";
	parametri="scrollbars=yes,width=530,height=400"
	newWin=open('','',parametri)
	newWin.location.href=nomefile
	
	}




/* ******************************************
   FUNZIONE PER APRIRE
   IL POPUP DELLA GALLERIA
****************************************** */

function spedisci() {

var argomento = (self.document.forms[0].val_testo.value);
var url_ricerca = "";

var returnString = "";
for (var i = 0; i < argomento.length; i++) {
	c = argomento.charAt(i);
	if (c == " ") c = "+";
	returnString += c;
}

if (self.document.forms[0].elements[1].checked){
			self.location.href="http://www.corriere.it/ricerca/ricerca.jsp?query=" + returnString + "&dn=ricerca.corriere.it"

	}

if (self.document.forms[0].elements[2].checked){
			self.location.href="http://www.corriere.it/ricerca/ricerca.jsp?query=" + returnString
	}

//self.location.href = url_ricerca;
}

function Apri(quale){
    if (window.name=='popup')
	{
  
    window.close()
    opener.parent.location.href=quale             
    
    }
    else
    {
    document.location.href=quale             
    }
 }


function Apri2(quale){
   window.close()
   opener.parent.location.href=quale             
}

function pr1(filename) {window.open(filename,'Test1','menubar=no,location=no,toolbar=no,status=no,scrollbars=yes,resizable=no,width=730,height=540')
}

function pr2(filename) {window.open(filename,'','menubar=yes,location=no,toolbar=no,status=no,scrollbars=yes,resizable=no,width=450,height=480')}

function pr3(filename) {window.open(filename,'','menubar=yes,location=yes,toolbar=no,status=no,scrollbars=yes,resizable=no,width=400,height=420')}

function pr5(nomefile,larghezza,altezza) {
	parametri="menubar=no,location=no,toolbar=no,status=no,scrollbars=no,resizable=no,width="
	parametri=parametri+larghezza+",height="+altezza
	newWin=open('','',parametri)
	newWin.location.href=nomefile
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
function pr7(nomefile,larghezza,altezza) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (nomefile.indexOf(pathToRemove) > -1) nomefile = nomefile.substring(lenPathToRemove);
if (nomefile.indexOf(".xml") > -1)  nomefile = nomefile.substring(0, nomefile.indexOf(".xml")) + ".shtml";
	parametri="menubar=no,location=no,toolbar=no,status=no,scrollbars=no,resizable=no,width="
	parametri=parametri+larghezza+",height="+altezza
	newWin=open('','',parametri)
	newWin.location.href=nomefile
}

/*FUNZIONE POP UP UNIVERSALE*/
function pr4(nomefile,larghezza,altezza) {
if (nomefile.indexOf("/Corriere della Sera") > -1)
{
	var pathToRemove = "/Corriere della Sera";
	var urlPrefix = "http://www.corriere.it";
}
if (nomefile.indexOf("/ViviMilano/cinema_e_teatro") > -1)
{
	var pathToRemove = "/ViviMilano";
	var urlPrefix = "/milano";
}
else if (nomefile.indexOf("/ViviMilano") > -1)
{
	var pathToRemove = "/ViviMilano";
	var urlPrefix = "";
}
else {
	var pathToRemove = "";
	var urlPrefix = "";
}
var lenPathToRemove = pathToRemove.length;
if (nomefile.indexOf(pathToRemove) > -1) nomefile = nomefile.substring(lenPathToRemove);
if (nomefile.indexOf(".xml") > -1)  nomefile = nomefile.substring(0, nomefile.indexOf(".xml")) + ".shtml";
	parametri="menubar=no,location=yes,toolbar=yes,status=no,scrollbars=yes,resizable=yes,width="
	parametri=parametri+larghezza+",height="+altezza
	newWin=open('','',parametri)
	newWin.location.href=urlPrefix+nomefile
}

// FUNZIONE POPUP SONDAGGI
function apripop_sondaggio(PATH, width, height)
{
window.open('/sondaggi/popup.jsp?xml='+PATH,'Sondaggio','height='+height+',width='+width+',toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=YES,scrollbars=yes,marginwidth=0,marginheight=0,left=120,top=85')
}

// METEO

// FUNZIONE PER IL POP UP DI DESCRIZIONE DEI VENTI 
function vento(){
window.open('/meteo/pop_vento.shtml','','menubar=no,location=no,toolbar=no,status=no,scrollbars=yes,resizable=no,width=465,height=447')
}

// FUNZIONE PER IL POP UP PER LE AVVERTENZE D'USO
function avvert(){
window.open('/meteo/pop_avvertenza.shtml','','menubar=no,location=no,toolbar=no,status=no,scrollbars=yes,resizable=no,width=275,height=275')
}



function init() {
}

/* FUNZIONE POP UP ICONMEDIALAB */
function picon(nomefile,larghezza,altezza) {
	parametri="menubar=no,location=no,toolbar=no,status=no,scrollbars=yes,resizable=no,width="
	parametri=parametri+larghezza+",height="+altezza
	newWin=open('','',parametri)
	newWin.location.href=nomefile
}

function apri_finestra_sondaggi(url_pag, windowsname, dimLar, left, top, dimAlt){
			var hWnd = window.open(url_pag, windowsname, "toolbar=no,width=" + dimLar + ",height=" + dimAlt + ",left=" + left + ",top=" + top + ",directories=no,location=no,status=yes,statusbar=yes,resizable=1,menubar=no,scrollbars=yes");
			if(!hWnd.opener) hWnd.opener=self;	
			if(hWnd.focus!=null) hWnd.focus();
		}

// FUNZIONE PER APERTURA PAGINA CONCORSO CONCENTO SEGNALINI
function apri_finestra(url_pag,windowsname,dime,dimes,left,top){
        var hWnd=window.open(url_pag,windowsname,"toolbar=no,width="
+dime+",height="+dimes+",left="+left+",top="+

top+",directories=no,status=no,statusbar=no,resizable=0,menubar=no,scrollbars=no,location=no");
        //if(!hWnd.opener) hWnd.opener=self;
        if(hWnd.focus!=null) hWnd.focus();
        }

// FUNZIONE PER HREF SENZA HTTP e WWW 

function apri_pagina(url){
	window.location.href=url;
}


// FUNZIONI POPUP AUDIO VIDEO 

function videoDSL(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/multimedia-vDSL.shtml?'+percorso,'multimedia','height=470,width=380,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}

function videoTrailer(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/multimedia-vTrailer.shtml?'+percorso,'multimedia','height=480,width=550,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}

function video56k(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/multimedia-v56k.shtml?'+percorso,'multimedia','height=360,width=320,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}

function videoDSLs(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/multimedia-vDSLsolo.shtml?'+percorso,'multimedia','height=450,width=380,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}

function video56ks(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/multimedia-v56ksolo.shtml?'+percorso,'multimedia','height=340,width=320,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}

function audio(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/multimedia-audio.shtml?'+percorso,'multimedia','height=300,width=320,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}

function audioagr(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/multimedia-audio_agr.shtml?'+percorso,'multimedia','height=300,width=340,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}

function videoDSLMP(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/media_player/multimedia-vDSL.shtml?'+percorso,'multimedia','height=470,width=480,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}

function video56kMP(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/media_player/multimedia-v56k.shtml?'+percorso,'multimedia','height=470,width=480,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}

function audioMP(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/media_player/multimedia-audio.shtml?'+percorso,'multimedia','height=300,width=320,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}

function videoDSLMPs(percorso) {
var pathToRemove = "/Corriere della Sera";
var lenPathToRemove = pathToRemove.length;
if (percorso.indexOf(pathToRemove) > -1) percorso = percorso.substring(lenPathToRemove);
window.open('/speciali/multimedia/media_player/multimedia-vDSLs.shtml?'+percorso,'multimedia','height=470,width=480,toolbar=no,menubar=no,status=no,directories=no,location=no,resizable=no,scrollbars=no')
}



