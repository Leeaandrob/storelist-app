(function () {
    'use strict';
    angular
        .module('ufitApp.dataStored', [])
            .factory('DATA', function($ionicPlatform, $rootScope, $timeout, $localStorage, Lessons, $q) {
                var
                    self = {},
                    programsData = Lessons.query(),
                    programs = Lessons.query(),
                    serverIsDown = false
                ;

                $rootScope.preferences = [
                    {
                        name: "Novos Eventos",
                        value: false
                    },{
                        name: "Minhas Aulas",
                        value: true
                    },{
                        name: "Novos Vídeos",
                        value: false
                    }
                ];

                self.programs = getPrograms;
                self.getWorkoutsListByLessonId = getWorkoutsListByLessonId;
                self.getWorkoutById = getWorkoutById;
                self.getPrograms = getPrograms;

                function getWorkoutsListByLessonId (lessonId) {
                    return $q(function (resolve, reject) {
                        angular.forEach(programs, function (lesson) {
                            if (lesson.id.toString() === lessonId.toString()) {
                                resolve(lesson.videos);
                                return;
                            }

                        });
                    });
                }


                function getWorkoutById (workoutId) {
                }

                function getPrograms () {
                    return $q(function (resolve, reject) {
                        if ($localStorage.programs) {
                           resolve($localStorage.programs);
                        } else {
                            Lessons.query(function (programs) {
                                saveProgramsLocally(programs);

                                $timeout(function () {
                                    resolve($localStorage.programs);
                                }, 2000);
                            }, reject);
                        }
                    });
                }

                function saveProgramsLocally (programs) {
                    $localStorage.programs = programs;
                }

                $localStorage.programs = false;

                return self;
            });
}());