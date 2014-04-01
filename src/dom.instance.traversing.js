(function($) {

    $.fn.children = function(selector) {
        var els = [], i, n, child;
        selector = selector || "*";
        this.each(function(el) {
            for(i = 0, n = el.childNodes.length; i < n; i++) {
                child = el.childNodes[i];
                if(child.nodeType === 1 && DOMUtils.match(child, selector)) {
                    els.push(child);
                }
            }
        });
        return $(els);
    };

    $.fn.closest = function(selector) {
        var els = [], el;
        this.each(function(el) {
            el = _closest(el, selector);
            if(!!el && els.indexOf(el) === -1) els.push(el);
        });
        return $(els);
    };

    $.fn.filter = function(selector) {
        var els = [];
        this.each(function(el) {
            if(DOMUtils.match(el, selector)) els.push(el);
        });
        return $(els);
    };

    $.fn.next = function(selector) {
        return _findSibling(this, "nextSibling", selector, false); 
    };
    $.fn.nextAll = function(selector) {
        return _findSibling(this, "nextSibling", selector, true); 
    };
    $.fn.prev = function(selector) {
        return _findSibling(this, "previousSibling", selector, false); 
    };
    $.fn.prevAll = function(selector) {
        return _findSibling(this, "previousSibling", selector, true); 
    };



    // Private
    function _closest(el, selector) {
        if(!el.parentNode) return false;
        else if(DOMUtils.match(el.parentNode, selector)) return el.parentNode;
        else return _closest(el.parentNode, selector);
    }

    function _findSibling(instance, command, selector, all) {
        var cb = all ? _siblings : _sibling;
        selector = selector || "*";
        var results = DOMUtils.getIterator.call(instance, cb(command, selector));
        return $(all ? DOMUtils.normalizeArray(results) : results);
    }

    function _siblings(command, selector) {
        return function(el) {
            var els = [];
            el = el[command];
            while(el) {
                if(_validNode(el, selector)) els.push(el);
                el = el[command];
            }
            return els;
        };
    }

    function _sibling(command, selector) {
        return function(el) {
            el = el[command];
            while(!!el && !_validNode(el, selector)) el = el[command];
            return el;
        }
    }

    function _validNode(el, selector) {
        return el.nodeType === 1 && DOMUtils.match(el, selector);
    }

})(DOM);
