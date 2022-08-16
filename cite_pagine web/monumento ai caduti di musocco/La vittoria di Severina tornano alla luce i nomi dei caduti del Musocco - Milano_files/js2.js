
function galleriaAbitare(str,str2) {
var larghezza = screen.availWidth;
if (larghezza >= 1024) {
window.open('http://abitare.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=670,status=no');
} else {
window.open('http://abitare.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=540,status=no');
}
}

function galleriaBravacasa(str,str2) {
var larghezza = screen.availWidth;
if (larghezza >= 1024) {
window.open('http://bravacasa.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=670,status=no');
} else {
window.open('http://bravacasa.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=540,status=no');
}
}

function galleriaCasa(str,str2) {
var larghezza = screen.availWidth;
if (larghezza >= 1024) {
window.open('/Casa/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=670,status=no');
} else {
window.open('/Casa/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=540,status=no');
}
}

function galleriaCasamica(str,str2) {
var larghezza = screen.availWidth;
if (larghezza >= 1024) {
window.open('http://casamica.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=670,status=no');
} else {
window.open('http://casamica.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=540,status=no');
}
}

function galleriaCasedaabitare(str,str2) {
var larghezza = screen.availWidth;
if (larghezza >= 1024) {
window.open('http://casedaabitare.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=670,status=no');
} else {
window.open('http://casedaabitare.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=540,status=no');
}
}

function galleriaCostruire(str,str2) {
var larghezza = screen.availWidth;
if (larghezza >= 1024) {
window.open('http://costruire.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=670,status=no');
} else {
window.open('http://costruire.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=540,status=no');
}
}

function galleriaDovecase(str,str2) {
var larghezza = screen.availWidth;
if (larghezza >= 1024) {
window.open('http://dovecase.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=670,status=no');
} else {
window.open('http://dovecase.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=540,status=no');
}
}

function galleriaFabbrieditori(str,str2) {
var larghezza = screen.availWidth;
if (larghezza >= 1024) {
window.open('http://fabbrieditori.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=670,status=no');
} else {
window.open('http://fabbrieditori.corriere.it/gallery/' + str + '/vuoto.shtml?' + str2 + '','gallery','width=740,height=540,status=no');
}
}

function audiovideo2(str) {
window.open('' + str + '','audiovideo','width=530,height=320,status=no');
}

function galleriaN2(str,str2) {
var larghezza = screen.availWidth;
if (larghezza >= 1024) {
window.open('/gallery/' + str + '/vuoto_new.shtml?' + str2 + '','gallery','width=745,height=650,status=no');
} else {
window.open('/gallery/' + str + '/vuoto_new.shtml?' + str2 + '','gallery','width=760,height=550,status=no');
}
}


function galleriaN3(str,str2) {
var larghezza = screen.Width;
if (larghezza >= 1024) {
window.open('/gallery/' + str + '/vuoto2.shtml?' + str2 + '','gallery','width=745,height=660,status=no');
} else {
window.open('/gallery/' + str + '/vuoto2.shtml?' + str2 + '','gallery','width=760,height=550,status=no');
}
}

function televisioni() {
window.open('http://mediacenter.corriere.it/MediaCenter/action/player?idCanale=Televisioni&latest=S ','MediaCenter','statusbar=0,width=825,height=600,top=10,left=10');
}

function cinema() {
window.open('http://mediacenter.corriere.it/MediaCenter/action/player?idCanale=IlFilm&latest=S ','MediaCenter','statusbar=0,width=825,height=600,top=10,left=10');
}
/* FUNZIONE POP UP e Coupon Vivimilano */
function prvivi(nomefile,larghezza,altezza) {
var pathToRemove = "/ViviMilano";
if (nomefile.indexOf(pathToRemove) > -1) {
 nomefile = "/vivimilano" + nomefile.substring(11, nomefile.indexOf(".xml"))+ ".shtml";
}
 parametri="menubar=no,location=yes,toolbar=yes,status=no,scrollbars=yes,resizable=yes,width="
 parametri=parametri+larghezza+",height="+altezza
 newWin=open('','',parametri)
 newWin.location.href=nomefile
}


$(document).ready(function(){
	if (/forum.milano.corriere.it\/invia\/fc\/invia.php/i.test(document.location.href)){
		document.getElementById("titolo_messaggio").setAttribute('type','text');
		document.getElementById("email_autore").setAttribute('type','text');
		document.getElementById("autore").setAttribute('type','text');
		var textarea = $("<textarea id='textarea' rows='10' name='testo' id='testo_messaggio' class='form_input'></textarea>");
		$("input#testo_messaggio").replaceWith(textarea);
	}
})
