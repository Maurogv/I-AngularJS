
angular.module('directives',[])
.directive('myRef', function($location) {
    return {
        restrict: 'E',
        template: '<span></span>',  // text replace content
        link: function ( scope, element, attrs) {  
               url =$location.path();            
               element.attr("id", "cite_ref-" + scope.myrefcounter);
               element.text('');          
               element.append("<a href=#" + url + "#cite_note-" + scope.myrefcounter + "> [" + scope.myrefcounter + "]</a>");
               
               var ref=$(".references li:nth-child(" + scope.myrefcounter + ")");         
               ref.attr("id", "cite_note-" + scope.myrefcounter );
               ref.prepend("<a href=#" + url + "#cite_ref-" + scope.myrefcounter + "><b>^</b></a> ");
               scope.myrefcounter+= 1;
       }};        
    });



