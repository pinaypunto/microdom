(function(){

    DOM.Gesture.register(["tap", "hold", "doubleTap", "singleTap"], (function() {

        var HOLD_TIME   = 300;
        var TAP_TIME    = 300;
        var DOUBLE_TIME = 450;
        var GAP         = 3;

        var _possibleTap    = false;
        var _possibleDouble = false;
        var _holdTimeout    = null;
        var _simpleTimeout  = null;


        var start = function(event, gd) {
            _possibleTap = gd.startPositions.length === 1;
            if(_possibleTap) {
                _holdTimeout = setTimeout(_lazyHold(event.target), HOLD_TIME);
            }
        };
        var move = function(event, gd) {
            var delta = gd.deltas[0];
            _possibleTap = gd.deltas.length === 1 && Math.abs(delta.x) < GAP && Math.abs(delta.y) < GAP;
            if(!_possibleTap) {
                clearTimeout(_holdTimeout);
                clearTimeout(_simpleTimeout);
            }
        };
        var end = function(event, gd) {
            if(_possibleTap && gd.deltaTime < TAP_TIME) {
                clearTimeout(_holdTimeout);
                DOM.Gesture.trigger("tap");
                if(_possibleDouble) {
                    clearTimeout(_simpleTimeout);
                    DOM.Gesture.trigger("doubleTap");
                    _possibleDouble = false;
                } else {
                    _simpleTimeout = setTimeout(_lazySimpleTap(event.target), DOUBLE_TIME);
                    _possibleDouble = true;
                }
            }
        };

        var _lazyHold = function(target) {
            return function() {
                DOM.Gesture.asyncTrigger("hold", target);
            };
        };
        var _lazySimpleTap = function(target) {
            return function() {
                DOM.Gesture.asyncTrigger("singleTap", target);
                _possibleDouble = false;
            };
        };

        return {
            start   : start,
            move    : move,
            end     : end
        };

    })());

})();


