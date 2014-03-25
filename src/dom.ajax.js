(function($) {

    var DEFAULTS = {
        method  : "GET",
        url     : "",
        timeout : 10000
    };

    var create_xhr = function() {

    };

    var timeout_callback = function(xhr) {
        console.error("Timeout :: ");
    };

    $.ajax = function(options) {
        for(var key in DEFAULTS) {
            options[key] = options[key] || DEFAULTS[key];
        }
    };
    
})(DOM);
