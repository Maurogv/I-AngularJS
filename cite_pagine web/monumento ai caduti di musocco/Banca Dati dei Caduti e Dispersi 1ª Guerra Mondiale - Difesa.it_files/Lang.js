jQuery(function () {
    jQuery('#DeltaPlaceHolderMain > nav ul li').each(function () {
        var contesto = jQuery(this);
        var numero = contesto.index();
        contesto.addClass('elemento-' + numero)
    });

    var str = window.location.href;
    if (str.toUpperCase().indexOf("/EN/") > 0) {
        jQuery('html').addClass('lang-en');
    } else if (str.toUpperCase().indexOf("/FR/") > 0) {
        jQuery('html').addClass('lang-fr');
    }
    else { jQuery('html').addClass('lang-it'); }
});