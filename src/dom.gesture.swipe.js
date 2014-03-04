(function(){

    DOM.Gesture.register(["swiping", "swipe"], (function() {
        var _swiping = false;
        return {
            start: function(event, gd) {
                _swiping  = false;
            },
            move: function(event, gd) {
                _swiping = gd.deltas.length === 1;
                if(_swiping) DOM.Gesture.trigger("swiping", true);
            },
            end: function(event, gd) {
                if(_swiping) DOM.Gesture.trigger("swipe", true);
            }
        };
    })());
})();
