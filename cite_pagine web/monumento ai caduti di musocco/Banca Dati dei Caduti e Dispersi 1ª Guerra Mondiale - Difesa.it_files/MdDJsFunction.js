function htmlEncode(value) { return $('<div/>').text(value).html(); } 

function fireLoadedCurrentPdf()
	{
		document.getElementById('lbAttendere').style.display='none';	
	}
function showLoadedCurrentPdf()
	{
		document.getElementById('lbAttendere').style.display='block';
}
	
function SearchMdD(control)
    {
        var searchString = document.getElementById(control).value;

        document.location.href = '/Ricerca/Pagine/ricerca.aspx?k=' + escape(searchString);
	        return false;

	    }


function AdvancedSearchMdD(control, Scope, ContentType, FullText) {
    //var searchString = document.getElementById(control).value;
    //var scope = document.getElementById(Scope).value;
    //var contentType = document.getElementById(ContentType).value;
    //var fullText = document.getElementById(FullText).value;

    document.location.href = '/Ricerca/Pagine/ricerca_avanzata.aspx?k=' + escape(control) + '&scope=' + Scope + '&contentType=' + ContentType + '&fullText=' + FullText;
    return false;

}


function OpenPopUp(url, w, h, name, features, returnObjWindow) {

    var CONST_POPUP_NAME = "_blank";
    var CONST_POPUP_WIDTH = "600";
    var CONST_POPUP_HEIGHT = "450";
    var CONST_POPUP_FEATURES = "toolbar=0,scrollbars=1,location=0,status=0,menubar=0,resizable=1";
    
    
    if (name == undefined || name == null) name = CONST_POPUP_NAME;
    if (w == undefined || w == null) w = CONST_POPUP_WIDTH;
    if (h == undefined || h == null) h = CONST_POPUP_HEIGHT;
    if (features == undefined || features == null) features = CONST_POPUP_FEATURES;

    // imposta le dimensioni della finestra, se non diversamente specificato in features
    if (features.indexOf("width") == -1 && features.indexOf("height") == -1) {
        if (features.length > 0 && features.charAt(features.length - 1) != ",")
            features += ",";
        features += "width=" + w + ",height=" + h;
    }

    // centra la finestra, se non diversamente specificato in features
    if (features.indexOf("left") == -1 && features.indexOf("top") == -1) {
        var leftPos = (screen.width) ? (screen.width - w) / 2 : 100;
        var topPos = (screen.height) ? (screen.height - h) / 2 : 100;

        if (features.length > 0 && features.charAt(features.length - 1) != ",")
            features += ",";
        features += "left=" + leftPos + ",top=" + topPos;
    }
    var objWindow = window.open(url, name, features);
    if (returnObjWindow == undefined || returnObjWindow == null) returnObjWindow = false;

    if (returnObjWindow)
        return objWindow;
}