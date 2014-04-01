(function($) {

	var _iterator = DOMUtils.iterator,
		_matcher  = DOMUtils.match;

	$.fn.bind = function(event_name, callback) {
		return _iterator.call(this, _eventBinder(event_name, callback));
	};
	$.fn.on = function(selector, event_name, callback) {
		return _iterator.call(this, _eventBinder(event_name, function() {
	        if(_matcher(event.target, selector)) {
	        	callback.call(callback, event);
	        }
		}));
	};

	function _eventBinder(event_name, callback) {
		return function(el) { 
			el.addEventListener(event_name, callback, false); 
		};
	};

})(DOM);