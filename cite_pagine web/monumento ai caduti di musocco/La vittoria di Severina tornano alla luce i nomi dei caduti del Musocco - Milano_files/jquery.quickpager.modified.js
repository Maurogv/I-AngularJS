//-------------------------------------------------
//		Quick Pager jquery plugin
//		Created by dan and emanuel @geckonm.com
//		www.geckonewmedia.com
// 
//		v1.1
//		18/09/09 * bug fix by John V - http://blog.geekyjohn.com/      
//	   	v1.2
//		07/10/09 * by Luca Monti - arrows implemented - limited number of page to show and more, more, more...
//-------------------------------------------------

(function($) {
	    
	$.fn.quickPager = function(options) {

		var pageCounter = 1;     
		var defaults = {
			pageSize: 10,     
			pageSizeHandler: false, 
			pageSizeText: "Risultati per pagina",
			pageSizeList: [5,10,15,20,25],
			currentPage: 1,  
			naviSize: 10,
			holder: null,
			pagerLocation: "after",      
			continueObject: "...",    
			handleArrow: true,
			leftArrowObject: "<",
			rightArrowObject: ">",
			fadeInEffect: true,
			firstLastPageHandler: false,
			firstPageArrowObject: "<<",
			lastPageArrowObject: ">>",
			handlePageClass: false,
			scrollAnimate: true
		};                                 
		// IMPORTANTE!!!!!!!!!! 
		// il parametro "handlePageClass" = false 
		// permette di gestire autonomamente il setting, in sostanza, chi crea la pagina si preoccupa
		// di SETTARE la classe simplePagerPage" + N su ogni LI della lista da paginare
		// Questo permette di evitare che FIREFOX o altri browser interrompano l'esecuzione dello script per la lunga durata   
		// con messaggi di alert e altri warning.
		
		var options = $.extend(defaults, options);         
		
		function makePaginator(selector, currentPage) {
			//Build pager navigation
			var pageNav = "<ul id='paginator' class='paginazione'>";  
			if (options.firstLastPageHandler) {			
				pageNav += "<li id='firstPageNav'><a class='firstPagNavSx' href='#'>" + options.firstPageArrowObject + "</a></li>";	
			}
			if (options.handleArrow) {
				var styleSx = "";
				if (currentPage == 1) {
					styleSx = "style='display:none'";
				}
				pageNav += "<li id='pageNavSx' " + styleSx + "><a class='simplePagNavSx' href='#'>" + options.leftArrowObject + "</a></li>";	
			}
			var start = Math.round(parseInt(currentPage) - parseInt(options.naviSize) / 2);    
			var max = ((pageCounter - options.naviSize) + 1);
			if (start <= 0) start = 1;
			if (max < start) start = max;
			
			if (start > 1) pageNav += "<li id='dotsSx'><a class='page' href='#' rel='"+(start - 1)+"'>" + options.continueObject + "</a></li>";
			for (i=start; i < (start + options.naviSize);i++){
				if (i==currentPage) {
					pageNav += "<li class='currentPage simplePageNav"+i+"'><a class='page' rel='"+i+"' href='#"+i+"'>"+i+"</a></li>";	
				}
				else {
					pageNav += "<li class='simplePageNav"+i+"'><a class='page' rel='"+i+"' href='#"+i+"'>"+i+"</a></li>";
				}
			}                
			var styleDx = "";
		    if (currentPage == pageCounter) {
				styleDx = "style='display:none'";
			}    
			if (i <= pageCounter) pageNav += "<li id='dotsDx'><a class='page' href='#' rel='"+i+"'>" + options.continueObject + "</a></li>";
            
 			if (options.handleArrow) { 
				pageNav += "<li id='pageNavDx' " + styleDx + "><a class='simplePagNavDx' href='#'>" + options.rightArrowObject + "</a></li>";
            }

			if (options.firstLastPageHandler) {			
				pageNav += "<li id='lastPageNav'><a class='lastPagNavSx' href='#'>" + options.lastPageArrowObject + "</a></li>";	
			}
			pageNav += "</ul>";   
			              
			if (options.pageSizeHandler) {     
				
				pageNav += "<div class='resultsForPage'>";
				pageNav += options.pageSizeText;
				pageNav += "<select class='pageListNumber'>";   
				for (i=0; i < options.pageSizeList.length;i++)   
					if (options.pageSizeList[i] == options.pageSize) {
						pageNav += "<option value='" + options.pageSizeList[i] + "' selected>" + options.pageSizeList[i] + "</option>";
					} else {
						pageNav += "<option value='" + options.pageSizeList[i] + "'>" + options.pageSizeList[i] + "</option>";
					}
				pageNav += "</select>";
				pageNav += "</div>";
			}   
			
			$(".paginazione").remove();
			$(".resultsForPage").remove(); 
			
			if(!options.holder) {
				switch(options.pagerLocation)
				{
				case "before":
					selector.before(pageNav);
				break;
				case "both":
					selector.before(pageNav);
					selector.after(pageNav);
				break;
				default:
					selector.after(pageNav);
				}
			}
			else {
				$(options.holder).append(pageNav);
			}
		}
		
		function addHandler(selector) {  
			 if (options.firstLastPageHandler) {  
				selector.parent().find(".paginazione a.firstPagNavSx").click(function() {      
					$(this).parent("li").parent("ul").find("a.page:first").click();
				});
				selector.parent().find(".paginazione a.lastPagNavSx").click(function() {       
					$(this).parent("li").parent("ul").find("a.page:last").click();
				});   
			 }
			
			//pager navigation behaviour    
			if (options.handleArrow) {          
				selector.parent().find(".paginazione a.simplePagNavSx").click(function() {      
					var currentPage = $(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage a").html();  
					if (currentPage > 1) {   
						$(this).attr("href", "#" + (parseInt(currentPage, 10) - 1));
						$(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage").prev().find("a").click();
					}
				});
				selector.parent().find(".paginazione a.simplePagNavDx").click(function() {      
					var currentPage = $(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage a").html();    
					if (currentPage < pageCounter) {    
						$(this).attr("href", "#" + (parseInt(currentPage, 10) + 1));						
						$(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage").next().find("a").click();
					}
				});   
			}
			
			selector.parent().find(".paginazione a.page").click(function() {
				//grab the REL attribute 
				var clickedLink = $(this).attr("rel");
				options.currentPage = clickedLink;
			
				if(options.holder) {
					$(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage").removeClass("currentPage");
					$(this).parent("li").parent("ul").parent(options.holder).find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
				}
				else {
					//remove current current (!) page
					$(this).parent("li").parent("ul").parent(".simplePagerContainer").find("li.currentPage").removeClass("currentPage");
					//Add current page highlighting
					$(this).parent("li").parent("ul").parent(".simplePagerContainer").find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
				}
			           
				if (options.handleArrow) {
					if (options.currentPage > 1) {
						$(this).parent("li").parent("ul").parent(options.holder).find("li#pageNavSx").show();
					} else {
						$(this).parent("li").parent("ul").parent(options.holder).find("li#pageNavSx").hide();
					}                                                                                     
			
					if (options.currentPage < pageCounter) {
						$(this).parent("li").parent("ul").parent(options.holder).find("li#pageNavDx").show();
					} else {
						$(this).parent("li").parent("ul").parent(options.holder).find("li#pageNavDx").hide();
					}                                                                                    
				}
				
				handlePaginator(selector);
				
				//hide and show relevant links
				selector.children().hide();	   
				if (options.fadeInEffect)
					selector.find(".simplePagerPage"+clickedLink).fadeIn();
				else
					selector.find(".simplePagerPage"+clickedLink).show();
                                                              
				if (options.scrollAnimate) {
				  $('html, body').animate({ scrollTop: 0 }, 'fast');  
				} else {
				  scroll(0,0);    
				}
				
				// modifica per gestire le mappe nel risultato di ricerca del salone del mobile 
				if ($('.ris-salone').length > 0) {	
					addPushpinSalone(clickedLink,"default");
				} 
				
				return true;
			});      
			
		  	if (options.pageSizeHandler) {    
				selector.parent().find("select.pageListNumber").change(function() {     
					resetPagination(selector);
 					options.pageSize = parseInt($(this).attr("value")); 
					options.currentPage = 1;
					makePagination(selector);     
					handlePaginator(selector);
				});
			}
		}    
		
		function resetPagination(selector) {
			resetPageCounter = 1;        
			selector.children().each(function(i){ 
				if(i < resetPageCounter*options.pageSize && i >= (resetPageCounter-1)*options.pageSize) {
					$(this).removeClass("simplePagerPage"+resetPageCounter);
				} else {
					$(this).removeClass("simplePagerPage"+(resetPageCounter+1));
					resetPageCounter ++;
				}	              
			});  
		    // resetto anche il contatore delle pagine per la rigenerazione
			pageCounter = 1;
		}

		function makePagination(selector) {  
			if (options.handlePageClass) {  			  
				selector.children().each(function(i){ 
					if(i < pageCounter*options.pageSize && i >= (pageCounter-1)*options.pageSize) {
						$(this).addClass("simplePagerPage"+pageCounter);
					}
					else {
						$(this).addClass("simplePagerPage"+(pageCounter+1));
						pageCounter ++;
					}	
				});  
			} else {          
				pageCounter = Math.floor(selector.children().length / options.pageSize);
				if (Math.floor(selector.children().length % options.pageSize != 0)) {
				   pageCounter++;
				}
			}                           
			
			// show/hide the appropriate regions 
			selector.children().hide();    	
			selector.children(".testatina").show();    
			selector.children(".simplePagerPage"+options.currentPage).show();

			// verifico il parametro naviSize che non deve essere superiore al numero di pagine da visualizzare
		    if (options.naviSize > pageCounter) {
				options.naviSize = pageCounter;
			}   
		}       
		
		function handlePaginator(selector) {  
			makePaginator(selector, options.currentPage);    
			addHandler(selector);   
		}   

		return this.each(function() {  
			var selector = $(this);	

			// Questo controllo verifica se nell'url è presente un #N che porta la paginazione alla pagina indicata dalla N                                   
		   	options.currentPage = 1;
			if (document.location.href.indexOf('#') > -1)
				options.currentPage = document.location.href.substring(document.location.href.indexOf('#') + 1);      

			// metto tutto in una DIV per gestire la paginazione
			selector.wrap("<div class='simplePagerContainer'></div>");

			makePagination(selector);

			if(pageCounter <= 1) {
				return;
			}

			handlePaginator(selector);
		});
	}
	

})(jQuery);

