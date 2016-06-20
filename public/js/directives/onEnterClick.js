'use strict';
App.directive('onEnterClick', function () {
    return function (scope, element, attrs) {
        var map = { 13: false, 16: false };
        element.bind("keydown keypress", function (event) {
            if (event.which in map) {
                map[event.which] = true;
                if (map[13] && !map[16]) {
                    scope.$apply(function () {
                        scope.$eval(attrs.onEnterClick);
                    });
                    event.preventDefault();
                }
            }
            element.bind("keyup", function (event) {
                if (event.which in map) {
                    map[event.keyCode] = false;
                }
            });
        });
    };
});