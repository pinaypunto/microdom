(function($) {

    $.fn.append = function(item) {
        item = item.instanced !== true ? $(item) : item;
        var clone = this.elements.length > 1;
        _iterate(this, item, function(container, element) {
            container.appendChild(clone ? element.cloneNode(true) : element);
        });
        return this;
    };
    $.fn.prepend = function(item) {
        item = item.instanced !== true ? $(item) : item;
        var clone = this.elements.length > 1;
        _iterate(this, item, function(container, element) {
            element = clone ? element.cloneNode(true) : element;
            if(container.childNodes.length === 0) container.appendChild(element);
            else container.insertBefore(element, container.childNodes[0]);
        });
        return this;
    };
    $.fn.remove = function() {
        this.each(function(el){ el.remove(); });
        this.elements = [];
        return this;
    };


    // Privates
    function _iterate(parent, child, callback) {
        parent.each(function(container) {
            child.each(function(element) {
                callback.call(callback, container, element);
            });
        });
    };


})(DOM);
