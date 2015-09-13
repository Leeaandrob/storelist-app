(function () {
    'use strict';
    angular
        .module('storeListApp.menu.controller', [])
            .controller('MenuCtrl', function($scope, $localStorage){
                $scope.user = {};
                $scope.user = $localStorage.user;
            });
}());