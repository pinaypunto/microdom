(function($) {

	$.fn.bind = function(event_name, callback) {
	    _bind(this.elements, event_name, callback);
	    return this;
	};
	$.fn.on = function(selector, event_name, callback) {
	    _bind(this.elements, event_name, function(event) {
	        if(DOMUtils.match(event.target, selector)) {
	            callback.call(callback, event);
	        }
	    });
	    return this;
	};

	function _bind(elements, event_name, callback) {
	    for(var i = 0, n = elements.length; i < n; i++) {
	        elements[i].addEventListener(event_name, callback, false);
	    }
	};

})(DOM);