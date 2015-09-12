(function () {
    'use strict';

    angular
        .module('app.utils')
        .factory('logger', logger);

    /* @ngInject */
    function logger ($log) {
        var service = {
                log: log
            };

        return service;

        function log (message) {
            $log.log(message);
        }
    }
}());