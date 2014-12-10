(function (window) {

    var domainsList= function ($compile, $scope) {
        var $div = $('.hyperlinksDomain');
        var domains = new hrefArray().hyperlinks;     
        var ul = new badge(domains, true).ul;
        var h3 = $('<h3 class="text-center">' + $div.text() + '</h3>');        
        $compile(h3)($scope);
        $div.html('');
        $div.append(h3);
        $div.append(ul);
   
        var $div = $('.photosDomain');
        var domains = new hrefArray().img;
        var ul = new badge(domains, false).ul;
        var h3 = $('<h3 class="text-center">' + $div.text() + '</h3>');
        $compile(h3)($scope);
        $div.html('');
        $div.append(h3);
        $div.append(ul);      
    }

    window.I.domainsList = domainsList;

    function hrefArray()  {
        var hyperlinks = {};
        var img = {};
        $("a").each(function (index) {
            var href = $(this).attr('href');
            // It was enough just checking that string doesn't start with 
            var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+\//;
            var match = urlPattern.exec(href);
            if (match != null) {
                var parser = document.createElement('a');
                parser.href = href;
                if (!$(this).has("img").length)
                    hyperlinks[parser.hostname] = ++hyperlinks[parser.hostname] || 1;
                else
                    img[parser.hostname] = ++img[parser.hostname] || 1;
            }
        });

        return {
            hyperlinks: hyperlinks,
            img: img
        }
    }

    function badge(dict, liaslink) {
        var ul = $("<ul class='list-unstyled'></ul>");
        // var maxSpeed = {car:300, bike:60, motorbike:200, airplane:1000,
        //  helicopter:400, rocket:8*60*60}
        var sortable = [];
        for (var key in dict) {       
            sortable.push([key, dict[key]]);          
        }

        var associative = dict = sortable.sort(function (a, b) { return b[1] - a[1] });
        // tranform in associative 
        //[["bike", 60], ["motorbike", 200], ["car", 300],
        //["helicopter", 400], ["airplane", 1000], ["rocket", 28800]] 
        //               
        $.each(associative, function (key, val) {
            if (liaslink) {
                var li = $('<li><span class="badge pull-right">' + val[1] + '</li>');
                var a = $('<a href=http://' + val[0] + '>' + val[0] + '</a>');
                var parser = document.createElement('a');
                parser.href = 'http://' + val[0];
//                $.each(icons, function (key, value) {
//                    if (key == parser.hostname) {
//                        a.addClass('in');
//                        a.css("background-image", 'url("' + value + '")');
//                    }
//                })
                li.prepend(a);
                ul.append(li);
            }
            else
                ul.append('<li>' + val[0] + '<span class="badge pull-right">' + val[1] + '</li>');

        });

        return {
            ul: ul,
            sortedAssociative: associative
        }
    }


})(window);