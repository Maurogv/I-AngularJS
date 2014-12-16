angular.module('directives',[])
.directive('tableOfContents', function($compile) {
    return {
        link: function ( scope, element, attrs) {   
            var ol = $('<ol></ol>');
//            var $contents = $(".table-of-contents");
            $(".content").each(function (index) {
                var text = $(this).text();
                var id = text.toLowerCase().split(' ').join("_");
                $(this).attr('id', id);
                if (text.toLowerCase() == "{{strings.note}}" | text.toLowerCase() == "{{strings.notes}}") ol.append('<br />');

                ol.append("<li><a href='#" + url + "#" + escape(id) + "'>"+ text + "</a></li>");
              //  $compile(ol)($scope);
            });
            
            var h3 = $('<h3 class="text-center">' + element.text() + '</h3>');
            element.html('');
            element.append(h3);
            element.append(ol);
            $compile(element)(scope);
           }}
      });
  


