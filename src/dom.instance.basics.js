(function($) {

    $.fn.html = function(html) {
        return _handleProperty(this, "innerHTML", html);
    };
    $.fn.text = function(text) {
        return _handleProperty(this, "innerText", text);
    };
    $.fn.addClass = function(class_name) {
        return DOMUtils.set(this, _classSetter("add", class_name));
    };
    $.fn.removeClass = function(class_name) {
        return DOMUtils.set(this, _classSetter("remove", class_name));
    };
    $.fn.toggleClass = function(class_name) {
        return DOMUtils.set(this, _classSetter("toggle", class_name));
    };
    $.fn.css = function(property, value) {
        return (
            value ? 
            DOMUtils.set(this, _styleSetter(property, value)) :
            DOMUtils.get(this, _styleGetter(property))
        );
    };
    $.fn.attr = function(attribute, value) {
        return (
            value ? 
            DOMUtils.set(this, _attrSetter(attribute, value)) :
            DOMUtils.get(this, _attrGetter(attribute))
        );
    }
    $.fn.removeAttr = function(attribute) {
        this.each(function(el) { el.removeAttribute(attribute); });
        return this;
    };

    // Private functions
    function _handleProperty(instance, property, value) {
        return (
            value ? 
            DOMUtils.set(instance, _propSetter(property, value)) :
            DOMUtils.get(instance, _propGetter(property))
        );
    };
    function _classSetter(command_name, class_name) {
        return function(el) { el.classList[command_name](class_name); };
    };
    function _styleSetter(property, value) {
        return function(el) { el.style.setProperty(property, value); };
    };
    function _styleGetter(property) {
        return function(el) { return el.style.getPropertyValue(property); };
    };
    function _propSetter(property, value) {
        return function(el) { el[property] = value; }
    };
    function _propGetter(property) {
        return function(el) { return el[property]; };
    };
    function _attrSetter(attribute, value) {
        return function(el) { el.setAttribute(attribute, value); }
    };
    function _attrGetter(attribute) {
        return function(el) { return el.getAttribute(attribute); };
    };


})(DOM);

