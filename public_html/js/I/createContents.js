(function (window) {

    var createContents = function(url, $compile, $scope) {
        var ol = $('<ol></ol>');
        var $index = $(".index");
        $(".page-header > h2").each(function (index) {
            var text = $(this).text();
            var id = text.toLowerCase().split(' ').join("_");
            $(this).attr('id', id);
            if (text.toLowerCase() == "{{strings.note}}" | text.toLowerCase() == "{{strings.notes}}") ol.append('<br />');

            ol.append("<li><a href='#" + url + "#" + escape(id) + "'>"+ text + "</a></li>");
          //  $compile(ol)($scope);
        });
        
       // var div = $('<div class="col-md-6 card bd-top-color-red"><div>');
        var h3 = $('<h3 class="text-center">' + $index.text() + '</h3>');
        $index.html('');
        $index.append(h3);
        $index.append(ol);
        $compile($index)($scope);
    }

   window.I.createContents = createContents;

})(window);