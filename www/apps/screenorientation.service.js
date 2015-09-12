(function () {
    'use strict';
    angular
        .module('ScreenOrientation',[])
            .factory('ScreenOrientation', function() {
                return window.cordova ? screen : {
                    lockOrientation: function(){}
                };
            });
}());