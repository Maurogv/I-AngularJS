(function (window) {

    var prependIcons = function (icons) {
        $("a").each(function (index) 
        {
          // if ($(this).hasClass("thumbnail")) return;
            var href=$(this).attr('href');
            // It was enough just checking that string doesn't start with 
            var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+/;
            var match = urlPattern.exec(href);
            if (match!=null) {
                var parser = document.createElement('a');
                parser.href =href;
                var self=$(this);
             
                icons.get(function(data){    
                    if (self.text() == "\xa0") self.addClass('text-decoration-none');
                    if (data[parser.hostname]) {                     
                        if (!self.closest('.hyperlinksDomain').length & (data[parser.hostname].indexOf('wikipedia') > -1)) {
                            // skip 
                        }
                        else {
                            self.addClass('in');
                            self.css("background-image", 'url("' +data[parser.hostname] + '")');
                        }
                        return;
                    }

                    if (!self.closest('.hyperlinksDomain').length) {
                        self.addClass('out');
                        self.addClass('external');
                    }
                    else self.addClass('in');                                                        
                })
            }
        })
    }
    
    window.I.prependIcons = prependIcons;

})(window);