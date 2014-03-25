DOM.Gesture = (function() {

    var _events = {},
        _listeners = [],
        _lastEvent = null,
        _gesture = {};

    var _touchstart = function(event) {
        _initialize(true);
        _handleEvent(event, "start");
    };

    var _touchmove = function(event) {
        _gesture.positions = _getFingersPositions(event);
        _gesture.deltaTime = new Date() - _gesture.startTime;
        _setDeltaPositions();
        _handleEvent(event, "move");
    };

    var _touchend = function(event) {
        _gesture.deltaTime = new Date() - _gesture.startTime;
        _handleEvent(event, "end");
        _initialize(false);
    };
    var _touchcancel = function(event) {
        _handleEvent(event, "cancel");
        _initialize(false);
    };


    function _initialize(start) {
        _lastEvent = null;
        _gesture = {};
        if(start) {
            _gesture.startTime = new Date();
            _gesture.startPositions = _getFingersPositions(event);
        }
    }
    function _getFingersPositions(event) {
        var positions = [];
        for(var i = 0, n = event.touches.length; i < n; i++) {
            positions.push({
                x: event.touches[i].pageX,
                y: event.touches[i].pageY
            });
        }
        return positions;
    }
    function _setDeltaPositions() {
        var i = 0, n = _gesture.positions.length;
        _gesture.deltas = [];
        for(; i < n; i++) {
            _gesture.deltas.push({
                x: _gesture.positions[i].x - _gesture.startPositions[i].x,
                y: _gesture.positions[i].y - _gesture.startPositions[i].y
            });
        }
        _gesture.deltaTime = (new Date()) - _gesture.startTime;
    }
    function _handleEvent(event, moment) {
        var callback, i = 0, n = _listeners.length;
        _lastEvent = event;
        var _gestureClone = JSON.parse(JSON.stringify(_gesture));
        for(; i < n; i++) {
            callback = _listeners[i][moment];
            if(callback) callback.call(null, event, _gestureClone);
        }
    }

    document.body.addEventListener("touchstart", _touchstart, false);
    document.body.addEventListener("touchmove", _touchmove, false);
    document.body.addEventListener("touchend", _touchend, false);
    document.body.addEventListener("touchcancel", _touchcancel, false);

    return {
        register: function(events, callbacks) {
            _listeners.push(callbacks);
            for(var i = 0, n = events.length; i < n; i++) {
                _events[events[i]] = new CustomEvent(events[i], {
                    bubbles: true,
                    cancelable: true
                });
            }
        },
        trigger: function(event_name, data) {
            var key, e = _events[event_name];
            e.originalEvent = _lastEvent;
            e.gestureData = JSON.parse(JSON.stringify(_gesture));
            if(data) for(key in data) e.gestureData[key] = data[key];
            _lastEvent.target.dispatchEvent(e);
        },
        asyncTrigger: function(event_name, target, data) {
            target.dispatchEvent(_events[event_name], data);
        }
    };

})();



