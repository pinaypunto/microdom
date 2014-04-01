var DOMUtils = (function() {

    var COMMANDS = {
        MATCH: document.body.webkitMatchesSelector ? "webkitMatchesSelector" : "mozMatchesSelector"
    };

    function _normalize(arr) {
        var ret = [];
        for(var i = 0, n = arr.length; i < n; i++) {
            if($.isArray(arr)) ret = ret.concat(_normalize(arr));
            else ret.push(arr);
        }
        return ret;
    }

    return {
        select: function(selector) {
            var elements = [];
            selector = selector.trim();
            if(selector.indexOf(" ") !== -1) return document.querySelectorAll(selector);
            return (
                selector[0] === "#" ? [document.getElementById(selector.substring(1))] : 
                selector[0] === "." ? document.getElementsByClassName(selector.substring(1)) : 
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
        normalizeArray: function(arr) {
            var ret = [];
            for(var i = 0, n = arr.length; i < n; i++) {
                if($.isArray(arr[i])) ret = ret.concat(arr[i]);
                else ret.push(arr[i]);
            }
            return ret;
        },
        iterator: function(instance, callback) {
            var vals = [];
            instance.each(function(el) { 
                vals.push(callback(el)); 
            });
            vals = _normalize(vals);
            return (vals.length === 1 ? vals[0] : vals);
        }
    };

})();
