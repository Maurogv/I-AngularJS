(function (window) {

    var activeNav = function (url) {
        // two folders in url, first is namespace          
        $('.navbar li').each(function (index){
            $(this).removeClass('active');         
        });
        
       $('.navbar a[href="#' + url + '"]').parent('li').each(function (index){
           $(this).addClass('active');
           $(this).parents('li').addClass('active');
       })

    }

    window.I.activeNav = activeNav;

})(window);