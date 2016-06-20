'use strict';
App.directive('scrollBottomTop', function () {
    return {
        scope: {
            scrollBottomTop: "="
        },
        link: function (scope, element) {

            scope.$watchCollection('scrollBottomTop', function (newValue, oldValue) {
                if (oldValue.length == 0 || oldValue.length > 0 && newValue[0].id == oldValue[0].id) {
                    setTimeout(function () {
                        $(element).scrollTop($(element)[0].scrollHeight);
                    }, 500);
                }
                if (oldValue.length > 0 && newValue[0].id != oldValue[0].id) {
                    setTimeout(function () {
                        $(element).scrollTop(0);
                    }, 500);
                }
            });
        }
    }
})