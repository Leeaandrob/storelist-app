(function () {
    'use strict';
    angular
        .module('ufitApp.menu.controller', [])
            .controller('MenuCtrl', function($scope, $localStorage){
                $scope.user = {};
                $scope.user = $localStorage.user;
            });
}());