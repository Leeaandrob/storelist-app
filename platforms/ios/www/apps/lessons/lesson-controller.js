(function () {
    'use strict';

    angular
        .module('ufitApp.workout.controller', [])
        .controller('LessonCtrl', LessonCtrl);

    function LessonCtrl ($scope, $rootScope, $localStorage, $stateParams, $http, User, DATA, UserSession) {
        var
            workoutsList = {}
            , lessonId = $stateParams.lessonId
            , userProgramsLocation
        ;

        activate();

        function activate () {
            $scope.lessonId = lessonId;
            DATA.getWorkoutsListByLessonId(lessonId)
                .then(populateWorkouts)
                .then(registerUserProgram);
        }

        function populateWorkouts (workoutsList) {
            $scope.workoutsList = workoutsList;
            $localStorage.userProgramClass = workoutsList;
            $scope.isWorkoutsListLoaded = true;
        }

        function getUserProgram () {
            $localStorage.userPrograms = $localStorage.userPrograms || [];

            UserSession.getUser()
                .then(populateUserPrograms)
                .catch(function (response) {
                    console.log(response);
                });

            return $localStorage.userPrograms;
        }

        function populateUserPrograms (user) {
            userProgramsLocation = '/people/' + user.id + '/programs/';

            if($localStorage.userPrograms.length === 0) {
                $http.get($scope.baseURL + userProgramsLocation)
                    .then(function (response) {
                        $localStorage.userPrograms.push(response.data);
                    })
                    .catch(function (response) {
                        return response;
                    });
            }
        }

        function putUserProgram (params, userProgramsLocation) {
            $http.put($scope.baseURL + userProgramsLocation , params)
                .then(function(response) {
                    $localStorage.userPrograms.push(response.data);
                })
                .catch(function(response){
                    console.log('error');
                });
        }

        function verifyIfUserHasProgram (obj, params) {
            var userPrograms = getUserProgram();
            if (userPrograms.length !== 0){
                for(var programs in userPrograms){
					if(userPrograms[programs].program[0] == lessonId){
						return true;
					}else{
						return false;}
                }
            }
        }

        function registerUserProgram () {
            var params = {'program': lessonId};
            var userHasProgram = verifyIfUserHasProgram(lessonId, params);

			if(userHasProgram === false){
				UserSession.getUser()
				.then(function (user){
					userProgramsLocation = '/people/' + user.id + '/programs/';
					putUserProgram(params, userProgramsLocation);
				})
				.catch(function (response){
					console.log(response)});
			}
        }
    }
}());