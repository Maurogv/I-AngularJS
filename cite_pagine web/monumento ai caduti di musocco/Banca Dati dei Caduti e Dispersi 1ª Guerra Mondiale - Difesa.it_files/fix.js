var standardhome = window.location.href;
$(document).ready(function () {

    if (standardhome.toUpperCase().indexOf("/FR/") > 0) {

        $('#NoITLogo').attr("src", "../../_layouts/15/Evoluzione2013/ui/img/logo-difesa-fr.png");
        $('#MinEN').addClass('nascondi');
        $('#NoItPub').addClass('fr');
        $('#NoItOp').addClass('fr');
        $('#NoITArchive').text("archives");
        $('#NoITArchive').attr("href", "/FR/Primo_Piano");
        $('.caricaMinistro').attr("href", "http://www.nato.int/cps/fr/natolive/index.htm");
        $('#NoITUE').attr("href", "http://europa.eu/index_fr.htm");
        $("a[id$='NoITArmedForcesoperations']").html("la D&eacute;fense pour la s&eacute;curit&eacute;");
        $('#NoITArmedForcesoperationsDetails').html('Les d&eacute;tails de toutes les op&eacute;rations militaires nationales et internationales en cours et le r&eacute;sum&eacute; de celles termin&eacute;es');
        $('#NoITArmyS').html("Arm&eacute;e de Terre");
        $('#NoITNavyS').html("Marine Militaire");
        $('#NoITAirForceS').html("Arm&eacute;e de l&lsquo;Air");

        $('#NoITPrimoPiano').html("&agrave; la une");

        $('#NoITNews').attr("href", "/FR/News");
        $('#NoITNews').attr("title", "Aller à la liste des Nouvelles");
        $('#NoITNews').html("Nouvelles");
        $('.archivio-comunicati').attr("href", "/FR/News/Pagine/elenco.aspx");
        $('.archivio-comunicati').html("Aller &agrave; la liste des Nouvelles");
        $('.caricaMinistro').html("Livre blanc pour la s&eacute;curit&eacute; internationale et la d&eacute;fense");
        $('#hl1').attr("href", "/FR/Primo_Piano/Pagine/livreblanc.aspx");
        //$('#hl1').attr("href", "/FR/Ministre_de_la_d%C3%A9fense/Pagine/Biografia.aspx");
        //$('.caricaMinistro').html("Ministre de la D&eacute;fense<br />Sen. <strong>Roberta Pinotti</strong>");

        $('#NoITKosovo').html('Kosovo');
        $('#NoITLebanon').html('Liban');
        $('#NoITAfghanistan').html('Afghanistan');
        $('#NoITHornOfAfrica').html('Corne de l&lsquo;Afrique');
        $('#NoITSafeRoads').html('Routes en s&eacute;curit&eacute;');
        $('#ctl00_PlaceHolderMain_ctl00_NoITAllTheOperations').html('Toutes les op&eacute;rations');

        $('#AreaStorica').text('Histoire');
        $('.areaScopri').html("en savoir plus");
        $('.areaFA').html("FORCES ARM&eacute;ES");
        $('#NoITDefencePublications').html('Publications de la D&eacute;fense');
        $('#NoITPP').html('News &agrave; la une');
        $('#NoITFooterInfo').hide();

        $("a[id$='NoITArmedForcesoperations']").attr("href", "/FR/operations/Pagine/OperationsMilitaires.aspx");
        $("a[id$='NoITMappa']").attr("href", "/FR/operations/Pagine/OperationsMilitaires.aspx");
        $("a[id$='NoITAllTheOperations']").attr("href", "/FR/operations/Pagine/OperationsMilitaires.aspx");

        $("a[class$='NoITURL']").attr("href", "/FR");
        $("#NoITApp").html('App D&eacute;fense');
        $("a[id$='NoITAppAS']").attr("href", "/FR/Primo_Piano/Pagine/appareastorica.aspx");
        $("a[id$='NoITAppDF']").attr("href", "/FR/Primo_Piano/Pagine/NewsDifesalanouvelleAppdelaDefense.aspx");
        $("a[id$='NoITAppEI']").attr("href", "/FR/Primo_Piano/Pagine/appnewsei.aspx");
        $("a[id$='NoITAppMM']").attr("href", "/FR/Primo_Piano/Pagine/appnewsmm.aspx");

        $('#searchText').attr('placeholder', 'Recherche...');


        /*mobile*/
        $('.archivio-news').text("toutes les nouvelles");
        $('.archivio-news').attr("href", "/FR/Primo_Piano");
        $('.NoITAllTheOperations').attr("href", "/FR/operations/Pagine/OperationsMilitaires.aspx");
        $('.NoITAllTheOperations').html('Toutes les op&eacute;rations');
    }

    else if (standardhome.toUpperCase().indexOf("/EN/") > 0) {
        $('#NoITArchive').text("archive");
        $('#NoITArchive').attr("href", "/EN/Primo_Piano");
        $('#NoITLogo').attr("src", "../../_layouts/15/Evoluzione2013/ui/img/logo-difesa-en.png");
        $('#NoITNews').attr("href", "/EN/News");
        $('#NoITNews').html("News");
        $('.areaScopri').html("find out more");
        $('.areaFA').html("ARMED FORCES");
        $('.archivio-comunicati').attr("href", "/EN/News/Pagine/elenco.aspx");
        $('.archivio-comunicati').html("Go to News list");
        $('.caricaMinistro').html("White Paper on International Security and Defence");
        $('#hl1').attr("href", "/EN/Primo_Piano/Pagine/Wh.aspx");
        //$('#hl1').attr("href", "/EN/Minister_of_Defence/Pagine/Biografia.aspx");
        //$('.caricaMinistro').html("Minister of Defence<br />Sen. <strong>Roberta Pinotti</strong>");
        $('#NoItPub').addClass('en');
        $('#NoItOp').addClass('en');

        $('#MinFR').addClass('nascondi');

        $('#NoITDefencePublications').html('Defence publications');

        $('#NoITNews').attr("title", "Go to News list");
        $("a[id$='NoITArmedForcesoperations']").attr("title", "Armed Forces operations");
        $("a[id$='NoITMappa']").attr("title", "Armed Forces operations");
        $('#ctl00_PlaceHolderMain_ctl00_NoITAllTheOperations').attr("title", 'All the operations');
        $('#NoITArmy').attr("title", "Go to Army web site");
        $('#NoITNavy').attr("title", "Go to Navy web site");
        $('#NoITAirForce').attr("title", "Go to Air Force web site");
        $('#NoITCarabinieri').attr("title", "Go to Carabinieri web site");
        $('#NoITFooterInfo').hide();
        $('#NoITPP').html('News in Highlights');

        $("a[id$='NoITArmedForcesoperations']").attr("href", "/EN/operations/Pagine/MilitaryOperations.aspx");
        $("a[id$='NoITMappa']").attr("href", "/EN/operations/Pagine/MilitaryOperations.aspx");
        $("a[id$='NoITAllTheOperations']").attr("href", "/EN/operations/Pagine/MilitaryOperations.aspx");

        $("a[class$='NoITURL']").attr("href", "/EN");

        /*mobile*/
        $('.archivio-news').text("All News");
        $('.archivio-news').attr("href", "/EN/Primo_Piano");
        $('.NoITAllTheOperations').html('All the operations');
        $('.NoITAllTheOperations').attr("href", "/EN/operations/Pagine/MilitaryOperations.aspx");
        $('#AreaStorica').text("History");


    }


    if (standardhome.toUpperCase().indexOf("?CAT=COMUNICATI") > 0) {
        $('#NONews').addClass('comunicati');
    }

    if (standardhome.toUpperCase().indexOf("/COMUNICATI/") > 0) {
        $('#NONews').addClass('comunicati');
    }


    $("input[id*='MdDFieldUrlCollectionControl3']").attr("maxlength", "512");

$('.top').find('ul').find('li').find('a').text('')
$('.top').find('ul').find('li').find('a').append('<img src="/" />')

var i = 1;
$('.top').find('ul').find('li').find('a').find('img').each(function(){
  if( i == 3)
   $(this).attr('src','https://www.difesa.it/_layouts/15/Evoluzione2013/ui-mobile/img/mobile-flag-italiano.png');
   if( i == 2)
   $(this).attr('src','https://www.difesa.it/_layouts/15/Evoluzione2013/ui-mobile/img/mobile-flag-english.png');
   if( i == 1)
   $(this).attr('src','https://www.difesa.it/_layouts/15/Evoluzione2013/ui-mobile/img/mobile-flag-france.png');
   i++;

})

});