/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Anonymous "self-invoking" function
(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'lib/jquery-1.10.2.js"';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);
    
//    script.src = 'js/mydynamics.js';
//    script.type = 'text/javascript';
//    document.getElementsByTagName("head")[0].appendChild(script);
    window.I = {};
    
    // Poll for jQuery to come into existance
    var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
    };
       
    // Start polling...
    checkReady(function($) {
        // Use $ here...
        $(document).ready(function () {
        // createReference();
        // createIndexContent();
       });
    });
})();
    