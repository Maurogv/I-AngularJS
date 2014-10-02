/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function( window) {
 var references=function (url) {
        $("my-ref").each(function (index) {
            $(this).attr("id", "cite_ref-" + (index + 1));
            $(this).text("");
            $(this).append("<a href=#" + url + "#cite_note-" + (index + 1) + "> [" + (index + 1) + "]</a>");
        });
        //  <li id="cite_note-1"><a href="#cite_ref-1"><b>^</b></a> Cite Note-1</li>
        $(".references li").each(function (index) {
            $(this).attr("id", "cite_note-" + (index + 1));
            $(this).prepend("<a href=#" + url + "#cite_ref-" + (index + 1) + "><b>^</b></a> ");
        });
     },  
    
     indexContent= function(url) {
        var ol=$('<ol></ol>');
        $(".page-header > h2").each(function (index) {
            var text=$(this).text();
            var id=text.toLowerCase().split(' ').join("_");
            $(this).attr('id',id);
            ol.append("<li><a href='#" + url + "#" + escape(id) + "'>"+ text + "</a></li>");
        });
        var div=$('<div id="indice" class="col-md-4 card bd-top-color-red"><div>');
        var h3=$('<h3 class="text-center">Indice</h3>');
        div.append(h3);
        div.append(ol);
        $("#cards").append(div);      
    }, 
    
    ahreflink= function(icons) {
        var links={};
        var images={};
        $("a").each(function (index) 
        {
          // if ($(this).hasClass("thumbnail")) return;
            var href=$(this).attr('href');
            // It was enough just checking that string doesn't start with 
            var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+\//;
            var match = urlPattern.exec(href);
            if (match!=null) {
                var parser = document.createElement('a');
                parser.href =href;    
                if (!$(this).has("img").length)
                    links[parser.hostname]=++ links[parser.hostname] || 1;
                else 
                    images[parser.hostname]=++ images[parser.hostname] || 1;
            }
        });
              
        var ul=new badge(links, true, icons).ul;
        var arraylinks=new badge(links).sortedAssociative;     
        var div=$('<div id="linksCounter" class="col-md-4 card bd-top-color-link"><div>');
        var h3=$('<h3 class="text-center">Collegamenti - Domini</h3>');
        div.append(h3);
        div.append(ul);
        $("#cards").append(div);
        
        var ul=new badge(images, false).ul;       
        var div=$('<div id="imgsCounter" class="col-md-3 card bd-top-color-yellow"><div>');
        var h3=$('<h3 class="text-center">Foto</h3>');
        div.append(h3);
        div.append(ul);
        $("#cards").append(div);
                
        var tophostname; 
        $.each( arraylinks, function( key, val ) {
            tophostname=val[0];
            return false;
        });
        
        $("a").each(function (index) 
        {
          // if ($(this).hasClass("thumbnail")) return;
            var href=$(this).attr('href');
            // It was enough just checking that string doesn't start with 
            var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+\//;
            var match = urlPattern.exec(href);
            if (match!=null) {
                var parser = document.createElement('a');
                parser.href =href;
                var self=$(this);
                if (!$(this).has("img").length & parser.hostname!=tophostname) {
                    icons.get(function(data){    
                            if (self.text()=="\xa0") self.addClass('text-decoration-none');
                            self.addClass('out');                         
                            if (data[parser.hostname])                  
                              self.css("background-image", 'url("' + data[parser.hostname] + '")');
                            else                           
                              self.addClass('external');                                
                    });  
                }
            }
        })
        
    },
    
    activenav=function(url) {
        $('.navbar li').each(function (index){
            $(this).removeClass('active');         
        });
        
       $('.navbar a[href="#' + url + '"]').parent('li').each(function (index){
           $(this).addClass('active');
           $(this).parents('li').addClass('active');
       })
        
    },
            
     jMauro=function(){
         return {
                  references:references,
                  indexContent:indexContent,
                  ahreflink:ahreflink,
                  activenav:activenav
                };
     }; 
     
     window.jMauro=jMauro;
     
     function badge(dict, liaslink, icons){
         var ul=$("<ul class='list-unstyled'></ul>");
        // var maxSpeed = {car:300, bike:60, motorbike:200, airplane:1000,
        //  helicopter:400, rocket:8*60*60}
        var sortable=[];
        for (var key in dict) {  
         //   if (key!="thumbnail") {
               sortable.push([key, dict[key]]);   
         //  }
        }
       
        var associative=dict=sortable.sort(function(a,b) {return b[1]- a[1]});
        // tranform in associative 
        //[["bike", 60], ["motorbike", 200], ["car", 300],
        //["helicopter", 400], ["airplane", 1000], ["rocket", 28800]] 
        //               
        $.each( associative, function( key, val ) {  
            if (liaslink) 
            {
               var li=$('<li><span class="badge pull-right">' + val[1] + '</span></li>');
               var a=$('<a href=http://' + val[0] + '>' + val[0] + '</a>');
               var parser = document.createElement('a');
               parser.href= 'http://' + val[0];             
               icons.get(function(data){                                                                
                  if (data[parser.hostname]) {                    
                    a.addClass('in');                    
                    a.css("background-image", 'url("' + data[parser.hostname] + '")');
                  }                                
               });  
               li.prepend(a);
               ul.append(li);
              // ul.append('<li><a href=http://' + val[0] + '>' + val[0] + '</a> <span class="badge pull-right">' + val[1] + '</span></li>');
            }
           else
               ul.append('<li>' + val[0] + '<span class="badge pull-right">' + val[1] + '</span></li>');
         
         });
         
         return {
             ul:ul, 
             sortedAssociative:associative
         }
     }
         
           
 })(window);