(function (window) {

    var appendIcons = function (icons) {
         var tophostname; 
//        $.each( arraylinks, function( key, val ) {
//            tophostname=val[0];
//            return false;
//        });
        
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
                if (!$(this).has("img").length & ! (parser.hostname.indexOf('wikipedia')>-1)) { 
              //  if (!$(this).has("img").length & parser.hostname!=tophostname) {
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
    }

    window.I.appendIcons = appendIcons;

})(window);