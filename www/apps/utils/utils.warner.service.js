(function () {
    'use strict';

    angular
        .module('app.utils')
        .factory('warner', warner);

    warner.$inject = ['logger', '$ionicLoading', '$ionicPopup'];

    function warner (logger, $ionicLoading, $ionicPopup) {
        var service = {
                warn: warn
            };

        return service;

        function warn (message) {
            $ionicLoading.hide();
            logger.log(message);
            $ionicPopup.alert({
                template: message,
                title: '<i class="ion-alert-circled fa-2x alert"></i>'
            });
        }
    }
}());