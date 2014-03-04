
(function() {

    var EVENTS = {};
    var COMMANDS = {
        MATCH: document.body.webkitMatchesSelector ? "webkitMatchesSelector" : "mozMatchesSelector"
    };

    // Instances creator (factory)
    DOM = function() {
        var args = arguments;
        if(args.length > 1) {
            return new Instance(__selector.apply(null, args));
        }else if(typeof args[0] === "string") {
            try { return new Instance(document.querySelectorAll(args[0])); }
            catch(err) { return new Instance(__elementCreate(args[0])); }
        }else if(typeof args[0] === "function") {
            document.body.onload = args[0];
        }else if(typeof args[0] === "object") {
            return new Instance([args[0]]);
        }
    };
    var Instance = function(elements) {
        this.elements = elements;
        this.instanced = true;
    };

    // Instance Events
    Instance.prototype.bind = function(event_name, callback) {
        __bindEventToElements(this.elements, event_name, callback);
        return this;
    };
    Instance.prototype.on = function(selector, event_name, callback) {
        __bindEventToElements(this.elements, event_name, function(event) {
            if(__matches(event.target, selector)) {
                callback.call(callback, event);
            }
        });
        return this;
    };

    // Instance Elements iterator
    Instance.prototype.each = function(callback) {
        for(var i = 0, n = this.elements.length; i < n; i++) {
            callback.call(callback, this.elements[i], i);
        }
    };

    // Instance Checks if a selector matches with element or elements
    Instance.prototype.matches = function(selector) {
        var matches = false;
        this.each(function(element) {
            matches = __matches(element, selector);
            if(!matches) return;
        });
        return matches;
    };

    // Instance Classes
    Instance.prototype.addClass = function(class_name) {
        this.each(function(el) { __classHandler("add", el, class_name); });
    };
    Instance.prototype.removeClass = function(class_name) {
        this.each(function(el) { __classHandler("remove", el, class_name); });
    };
    Instance.prototype.toggleClass = function(class_name) {
        this.each(function(el) { __classHandler("toggle", el, class_name); });
    };

    // Instance DOM Manipulation
    Instance.prototype.append = function(item) {
        item = item.instanced !== true ? DOM(item) : item;
        var clone = this.elements.length > 1;
        __iterate(this, item, function(container, element) {
            container.appendChild(clone ? element.cloneNode(true) : element);
        });
    };
    Instance.prototype.prepend = function(item) {
        item = item.instanced !== true ? DOM(item) : item;
        var clone = this.elements.length > 1;
        __iterate(this, item, function(container, element) {
            element = clone ? element.cloneNode(true) : element;
            if(container.childNodes.length === 0) container.appendChild(element);
            else container.insertBefore(element, container.childNodes[0]);
        });
    };
    Instance.prototype.remove = function() {
        this.each(function(el){ el.remove(); });
    };

    // Instance Attributes and data-attributes
    Instance.prototype.attr = function(attribute, value) {
        if(value) {
            this.each(function(el) { el.setAttribute(attribute, value); });
            return this;
        } else {
            var values = [];
            this.each(function(el) { values.push(el.getAttribute(attribute)); });
            return values.length === 1 ? values[0] : values;
        }
    };
    Instance.prototype.removeAttr = function(attribute) {
        this.each(function(element, i) { element.removeAttribute(attribute); });
    };
    Instance.prototype.data = function(attribute, value) {
        return this.attr("data-" + attribute, value);
    };

    // Others
    Instance.prototype.html = function(html) {
        __elementAttributes(this, "innerHTML", html);
    };
    Instance.prototype.text = function(text) {
        __elementAttributes(this, "innerText", text);
    };

    // Helper private functions
    var __selector = function(type, selector) {
        if(type === "#") return [document.getElementById(selector)];
        if(type === ".") return document.getElementsByClassName(selector);
        if(type === "") return document.getElementsByTagName(selector);
    };
    var __matches = function(element, selector) {
        return element[COMMANDS.MATCH](selector);
    };
    var __elementAttributes = function(instance, command, value) {
        if(value) instance.each(function(el) { el[command] = value; });
        else {
            var values = [];
            instance.each(function(el) { values.push(el[command]); });
            return values.length == 1 ? values[0] : values;
        }
    };
    var __iterate = function(container_elements, child_elements, callback) {
        container_elements.each(function(container) {
            child_elements.each(function(element) {
                callback.call(callback, container, element);
            });
        });
    };
    var __classHandler = function(command, element, class_name) {
        element.classList[command](class_name);
    };
    var __bindEventToElements = function(elements, event_name, callback) {
        for(var i = 0, n = elements.length; i < n; i++) {
            elements[i].addEventListener(event_name, callback, false);
        }
    };
    var __elementCreate = function(html) {
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.childNodes;
    };


    window.$ = DOM;

})();
