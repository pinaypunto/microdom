(function($) {

    var _iterator = DOMUtils.iterator;

    $.fn.html = function(html) {
        return _setOrGet(this, "innerHTML", html, _propSetter, _propGetter);
    };
    $.fn.text = function(text) {
        return _setOrGet(this, "innerText", text, _propSetter, _propGetter);
    };
    $.fn.addClass = function(class_name) {
        return _iterator(this, _classSetter("add", class_name));
    };
    $.fn.removeClass = function(class_name) {
        return _iterator(this, _classSetter("remove", class_name));
    };
    $.fn.toggleClass = function(class_name) {
        return _iterator(this, _classSetter("toggle", class_name));
    };
    $.fn.css = function(property, value) {
        return _setOrGet(this, property, value, _styleSetter, _styleGetter);
    };
    $.fn.attr = function(attribute, value) {
        return _setOrGet(this, attribute, value, _attrSetter, _attrGetter);
    };
    $.fn.data = function(attribute, value) {
        return this.attr("data-" + attribute, value);
    };
    $.fn.removeAttr = function(attribute) {
        return _iterator(this, function(el) { 
            el.removeAttribute(attribute); 
        });
    };


    // Private functions
    function _setOrGet(instance, property, value, setter_cb, getter_cb) {
        return (
            value ? 
            _iterator(instance, setter_cb(property, value)) :
            _iterator(instance, getter_cb(property))
        );
    }
    function _classSetter(command_name, class_name) {
        return function(el) { 
            el.classList[command_name](class_name); 
        };
    }
    function _styleSetter(property, value) {
        return function(el) { 
            el.style.setProperty(property, value); 
        };
    }
    function _styleGetter(property) {
        return function(el) { 
            return el.style.getPropertyValue(property); 
        };
    }
    function _propSetter(property, value) {
        return function(el) { 
            el[property] = value; 
        };
    }
    function _propGetter(property) {
        return function(el) { 
            return el[property]; 
        };
    }
    function _attrSetter(attribute, value) {
        return function(el) { 
            el.setAttribute(attribute, value); 
        };
    }
    function _attrGetter(attribute) {
        return function(el) { 
            return el.getAttribute(attribute); 
        };
    }


})(DOM);
