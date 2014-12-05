angular.module('directives',[])
.directive('myIndex', function($location, $compile) {
    return {
        restrict: 'EA',
        template: '<span>{{strings["Elenco Domini"]}}</span>',  // text replace content
        link: function ( scope, element, attrs) {   
            $(".page-header > h2").each(function (index) {    
              $compile($(this))(scope);
           })
       },
       compile: function ( scope, element, attrs) {   
          return {
              post : function ( scope, element, attrs) { 
                  var ol=$('<ol></ol>');
                    $(".page-header > h2").each(function (index) {           
                      var text=$(this).text();
                      ol.append('<li>' + text + '</li>');
//                      var id=text.toLowerCase().split(' ').join("_");
//                      $(this).attr('id',id);
//                      if (text.toLowerCase() == 'note' | text.toLowerCase() == 'notes') ol.append('<br />');
//                      ol.append("<li><a href='#" + $location.path() + "#" + escape(id) + "'>"+ text + "</a></li>");
//                        
                    });
                    var div = $('<div id="indice" class="col-md-6 card bd-top-color-red"><div>');
                    var h3 = $('<h3 class="text-center">Indice</h3>');
                    div.append(h3);
                    div.append(ol);
                    element.append(div);   
               }
          };
      
      }};
    });


