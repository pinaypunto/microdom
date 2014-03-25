var DOM = null;

(function() {

    var HTML_RE = new RegExp("<[a-z]+.*>", "i");

    DOM = function() {
        var args = arguments, ret = null, is_html = false;
        if(typeof args[0] === "string") {
            command = args[0].match(HTML_RE) ? "create" : "select";
            ret = new DOMInstance(DOMUtils[command](args[0]));
        } else if(typeof args[0] === "object") {
            ret = new DOMInstance([args[0]]);
        } else if(typeof args[0] === "function") {
            document.body.onload = args[0];
        }
        return ret;
    };

    window.$ = $ = DOM;

})();
