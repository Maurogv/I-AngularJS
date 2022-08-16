function addLoadEvent(func) {
      var oldonload = window.onload;
      if (typeof window.onload != 'function') {
	      window.onload = func;
      } else {
		  window.onload = function() {
			  oldonload();
			  func();
		  }
	  }
}

// per essere certi che venga eseguito solo al termine del caricamento della pagina...
addLoadEvent(init);

var precML = 0;

function init() {
	$("#succ").unbind("click");
	$("#prec").unbind("click");
	$(".page").unbind("click");
	
	$("#listPages").css("visibility", "hidden");
	
	$("#succ").css("visibility", "hidden");
	if (parseInt($("#pageSelected").html()) > 1)
		$("#succ").css("visibility", "visible");

	//if (parseInt($("#listPages").css("marginLeft")) < 0)
    if (parseInt($("#pageSelected").html()) < $("#listPages").children().length)
		$("#prec").css("visibility", "visible");
	
	$("#prec").bind("click", function () {
		$("#succ").css("visibility", "visible");
		//var ml = parseInt($("#listPages").css("marginLeft"));
		//var iw = $(".itemPage").width();
		//var cw = $("#container").width();
		//var child = $("#listPages").children().length;
		//var lp_ml = ml - iw;
		//if (cw < ml + (child * iw)) {
		//	$("#listPages").animate({"marginLeft" : lp_ml }, 500, function () {
				/* la paginazione simula il click */
				var idx = parseInt($("#pageSelected").html()) + 1;
				//console.log("idx:" + idx);
				$("#p_" + idx).click();
		//	});
		//}
		//if (cw == ml + ((child - 1) * iw))   $(this).css("visibility", "hidden");
		//return false;
	});

	$("#succ").bind("click", function () {
		$("#prec").css("visibility", "visible");
		//var lp_ml = parseInt($("#listPages").css("marginLeft")) + $(".itemPage").width();
		//if (lp_ml <= 0) {
		//	$("#listPages").animate({"marginLeft" : lp_ml }, 500, function () {
				/* la paginazione simula il click */
		var idx = parseInt($("#pageSelected").html()) - 1;
				//console.log("idx:" + idx);
		$("#p_" + idx).click();
			
		//	});
		//}
		//if (lp_ml == 0)   $(this).css("visibility", "hidden");
		//return false;
	});
	
	$(".page").bind("click", function () {
		precML = parseInt($("#listPages").css("marginLeft"));
		var page = parseInt($(this).html()) - 1;

		$("#contentSondaggi").load(getURL(page), "",  function () {
			$("#prec").css("visibility", "hidden");
			$("#succ").css("visibility", "hidden");
			$("#listPages").css("marginLeft", precML);
			init();
		});
		//return false;
	});

	$(".link_titolo").bind("click", function () {
		precML = parseInt($("#listPages").css("marginLeft"));
		$("#contentSondaggi").load(getURL(page), "", function () {
			$("#prec").css("visibility", "hidden");
			$("#succ").css("visibility", "hidden");
			$("#listPages").css("marginLeft", precML);
			init();
		});
	});

	if ( typeof idSondaggio != "undefined" ) {
		// nascondo dalla lista quello selezionato (se presente)...
		$("#sond_" + idSondaggio).hide();
	}

	function getURL(page) {
		s = document.location.href.toString();
		var id = "0";
		if (s.indexOf("d_") > -1)
			id = "" + s.substring(s.indexOf("d_") + 2, s.lastIndexOf("."));
		if (s.indexOf("idSondaggio=") > -1)
			id = "" + s.substring(s.indexOf("idSondaggio=") + 12, s.lastIndexOf("#"));

		var url = "/appsSondaggi/sondaggiDispatch.do?method=loadN&id=" + id + "&page=" + page;
		if ( typeof path != "undefined" ) {
			url = "/appsSondaggi/" + path + "paginazione/page_" + idCategoria + "_" + page + ".shtml";
			if ( typeof from != "undefined" ) {
				url += "?from=" + from;
			}
		}
		return url;
	}
}

