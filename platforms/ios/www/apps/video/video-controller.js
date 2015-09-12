(function () {
    'use strict';
    angular
        .module('ufitApp.video.controller',['ufitApp.video.directive', 'VideoFilter'])
            .controller('VideoCtrl', function($scope, $localStorage, ScreenOrientation) {
                ScreenOrientation.lockOrientation('landscape');
            });
}());