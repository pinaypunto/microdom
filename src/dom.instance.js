var DOMInstance = null;

(function($) {

	DOMInstance = function(node_element_list) {
	    this.elements = node_element_list;
	    this.instanced = true;
	};

	$.fn = DOMInstance.prototype;

	$.fn.each = function(callback) {
	    for(var i = 0, n = this.elements.length; i < n; i++) {
	        callback.call(callback, this.elements[i], i);
	    }
	};
	$.fn.matches = function(selector) {
	    var matches = false;
	    this.each(function(element) {
	    	matches = DOMUtils.match(element, selector);
	        if(!matches) return;
	    });
	    return matches;
	};

})(DOM);
