(function () {
    'use strict';
    angular
        .module('ufitApp.preferences.controller', [])
            .controller('PreferencesCtrl',
                function ($scope, $rootScope, UserSession, User, $state, DATA) {
                    $scope.preferences = DATA.preferences;
                    $scope.logout = logout;
                    $scope.toggleOption = toggleOption;

                    function toggleOption (slug) {
                        for (var i = 0; i < $scope.preferences.length; i++){
                            if($scope.preferences[i].name == slug){
                                $scope.preferences[i].value = !($scope.preferences[i].value);
                            }
                        };
                    };

                    function logout () {
                        console.log('Logout');
                        UserSession.logOut( function () {
                            $state.go('signin');
                        });
                    }
            });
}());
