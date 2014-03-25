var DOMUtils = (function() {

    var COMMANDS = {
        MATCH: document.body.webkitMatchesSelector ? "webkitMatchesSelector" : "mozMatchesSelector"
    };

    return {
        select: function(selector) {
            var elements = [];
            selector = selector.trim();
            if(selector.indexOf(" ") !== -1) return document.querySelectorAll(selector);
            return (
                selector[0] === "#" ? [document.getElementById(selector)] : 
                selector[0] === "." ? document.getElementsByClassName(selector) : 
                document.getElementsByTagName(selector)
            );
        },
        match: function(element, selector) {
            return !!element[COMMANDS.MATCH](selector);
        },
        create: function(html) {
            var div = document.createElement("div");
            div.innerHTML = html;
            return div.childNodes;
        },
        set: function(instance, callback) {
            instance.each(callback);
            return instance;
        },
        get: function(instance, callback) {
            var vals = [];
            instance.each(function(el) { vals.push(callback(el)); });
            return (vals.length === 1 ? vals[0] : vals);
        }
    };

})();
