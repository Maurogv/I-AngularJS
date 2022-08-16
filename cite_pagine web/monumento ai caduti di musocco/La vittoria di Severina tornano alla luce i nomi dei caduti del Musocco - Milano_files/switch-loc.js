$(document).ready(function(){
//GESTIONE NOME DEL COMUNE IN HEADER

var switchbutton="<span id='switchbutton'><strong><a href='#' id='autocomplete'>cambia localit&Agrave;</a></strong></span>";
var rcsLocalPref = $.cookie("rcsLocalPref");
			
if(rcsLocalPref == "--" || rcsLocalPref == null){
	$.cookie("rcsLocalPref", "milano|Milano" ,{domain: "corriere.it", path: "/", expires: 365});
	rcsLocalPref = $.cookie("rcsLocalPref");
}
			
if(rcsLocalPref != "--" && rcsLocalPref != null){
cookieRcsLocalPref=rcsLocalPref.split("|");
nomeComune = cookieRcsLocalPref[1];
if (nomeComune.length > 15) {
nomeComune = nomeComune.substring(0, 12) + "...";
}
$('#miocomune').replaceWith(switchbutton);				
localbutton= '<span id="comuneselezionato"><strong><a href="http://'+cookieRcsLocalPref[0]+'.corriere.it">'+nomeComune+'</a></strong></span>';
$(localbutton).insertBefore('#headBoxLogin #switchbutton');


};
	// la località non è ancora stata scelta, parte l'autocomplete
	$("#autocomplete").click(function(){
		$("#loc").val("");
		if ($("#autocomplete").data('clicked') != "yes") {
				$.ajax({
					url: "http://milano.corriere.it/libs/json/comuni.js",
					async: true,
					dataType: "script",
					success: function(json) {
						$("#loc").autocomplete(comuni_it.comuni, {
							autoFill:false,
							minChars:1,
							delay: 20,
							formatItem: function(row) {
								return row.name;
							},
							formatMatch: function(row) {
								return row.name;
							}
						}).result(function(event, data, formatted) {
							newLoc = data.value;
							newLocToShow = data.name;
						});
					}
				});
		} 
		$("#switch-loc").show();
		$("#loc").focus();
		$("#autocomplete").data('clicked', 'yes');		
		return false;
	});

	$(".close-search").click(function(){
		$("#switch-loc").hide();
		return false;
	});
		
	function goTo() {
		if(typeof( window["newLoc"]) != "undefined") {
			tmp = window.location = "http://" + newLoc + ".corriere.it";
			$.cookie("rcsLocalPref",newLoc+ "|" +newLocToShow,{domain: "corriere.it", path: "/", expires: 365});
		} else {
			return false;
		}
	};

	$("#loc").keypress(function(e){
		if(e.which == 13){
			goTo();
			return false;
		}
	});

	$("#gotoloc").click(function(){
		goTo();
		return false;
	});
		$("#loc_comune").click(function(){
			if(($("#loc_comune").val()).indexOf("Inserisci una localit") > -1) $("#loc_comune").val("");	
				$.ajax({
					url: "http://milano.corriere.it/libs/json/comuni_istat.js",
					async: true,
					dataType: "script",
					success: function(json) {
						$("#search_comune .ac_results").remove();
						$("#search_comune #loc_comune").autocomplete(comuni_it.comuni, {
							autoFill:false,
							minChars:1,
							delay: 20,
							top: 95,
							left: 14,
							containerResult: "#search_comune",
							formatItem: function(row) {
								return row.name;
							},
							formatMatch: function(row) {
								return row.name;
							}
						}).result(function(event, data, formatted) {
							newLoc = data.value;
							newLocToShow = data.name;
							goTo();
						});
					}
				});					
		});
		$("#gotocomune").click(function(event){
			event.preventDefault();
			goTo();
		});	
		$(".close-search").click(function(){
			$(".switch-loc").hide();
			return false;
		});
	
		$(".loc, .input-autocomplete").keypress(function(e){
			if(e.which == 13){
				goTo();
				return false;
			}
		});
		if ($("#tools_menu_sez").length > 0) {			
			$("#tools_menu_sez a.comune_selez").attr("href","http://"+cookieRcsLocalPref[0]+".corriere.it").text(nomeComune).css("display","block");
			$("#search_comune span").text(nomeComune);
			$("#tools_menu_sez .comune-switch").text("CAMBIA");
		}			
});
//fine document ready