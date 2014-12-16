(function (window) {

    var createContents = function(url, $compile, $scope) {
        var ol = $('<ol></ol>');
        var $contents = $(".table-of-contents");
        $(".content").each(function (index) {
            var text = $(this).text();
            var id = text.toLowerCase().split(' ').join("_");
            $(this).attr('id', id);
            if (text.toLowerCase() == "{{strings.note}}" | text.toLowerCase() == "{{strings.notes}}") ol.append('<br />');

            ol.append("<li><a href='#" + url + "#" + escape(id) + "'>"+ text + "</a></li>");
          //  $compile(ol)($scope);
        });
        
        var h3 = $('<h3 class="text-center">' + $contents.text() + '</h3>');
        $contents.html('');
        $contents.append(h3);
        $contents.append(ol);
        $compile($contents)($scope);
    }

   window.I.createContents = createContents;

})(window);