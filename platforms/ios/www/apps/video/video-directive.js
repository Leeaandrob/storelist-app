(function () {
    'use strict';
    angular
        .module('ufitApp.video.directive',['VideoFilter'])
            .directive('videoEnded', function () {
                return {
                    link: function (scope, element) {
                        element.on('ended', function (e) {
                            scope.$broadcast('ended');
                        });
                    }
                }
            })
            .directive("ufitVideo", function () {
                return {
                    restrict: 'E',
                    templateUrl: "apps/video/video-directive-template.html",
                    scope: {
                        videoId: '='
                    },
                    controller: function ($scope, $rootScope, $state, $localStorage, $ionicPopup, $sce) {
                        var video = document.querySelector('video'),
                            programExercisesList = $localStorage.userProgramClass,
                            videosList = [];

                        getVideosUrl();
                        iterifyArr(videosList);
                        $scope.videoSource = videosList.first();
                        //$scope.videoPoster = 'video/video-preview.png';

                        //Controls
                        $scope.isVideoPlaying = true;
                        $scope.isVideoEnded = false;

                        // Public methods
                        $scope.play = play;
                        $scope.pause = pause;
                        $scope.finished = finished;
                        $scope.vote = vote;
                        $scope.toggleVideoPlay = toggleVideoPlay;

                        function getVideosUrl () {
                            angular.forEach(programExercisesList, function (video) {
								if($rootScope.baseURL == 'http://localhost:8000/v1'){
									var urlVideo = $rootScope.baseMediaURL + video.url;
									this.push(urlVideo);
								}else{
									console.log(video.url);
									this.push(video.url);
								}
                            }, videosList);
                        }

                        function iterifyArr (arr) {
                            var cur = 0;
                            arr.first = (function () { return this[cur]; });
                            arr.next = (function () { return (++cur >= this.length) ? null : this[cur]; });
                            arr.prev = (function () { return (--cur < 0) ? null : this[cur]; });
                            return arr;
                        };

                        //Video Controls Methods
                        function play () {
                            video.play();
                            $scope.isVideoPlaying = !$scope.isVideoPlaying;
                        }
                        function pause () {
                            video.pause();
                            $scope.isVideoPlaying = !$scope.isVideoPlaying;
                        }

                        function finished () {
                            $scope.$digest();
                        }

                        function vote (value) {
                            $scope.isVideoEnded = false;
                            $scope.videoSource = videosList.next();
                            if(!$scope.videoSource){
                                $ionicPopup.alert({
                                    template: 'Parabéns, você concluiu esse programa!',
                                    title: '<i class="ion-alert-circled x2 alert"></i>'
                                });
                                $state.go('app.lessons');
                            }
                        }

                        function toggleVideoPlay () {
                            if ($scope.isVideoPlaying) {
                                pause();
                            } else {
                                play();
                            }
                            $scope.isVideoPlaying != $scope.isVideoPlaying;
                        }

                    },
                    link: function (scope, element, attrs) {
                        scope.$on('ended', function () {
                            scope.isVideoEnded = true;
                            scope.finished();
                        });
                    }
                }
            });
}());