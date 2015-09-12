(function () {
    'use strict';
    angular
        .module('ufitApp.lessons.controller', [])
            .controller('LessonsCtrl', function($scope, $rootScope, $localStorage, $http, DATA, UserSession) {
                var userProgramsLocation;
                $scope.lessons = {};
                activate();

                function activate () {
                    DATA.getPrograms()
                        .then(populatePrograms)
                        .then(getUserInfo);
                }

                function getUserInfo () {
                    UserSession.getUser()
                        .then(function (user) {
                            userProgramsLocation = '/people/' + user.id + '/programs/';
                        });
                }

                function populatePrograms (programs) {
                    $scope.lessons = programs;
                }
        	});
}());