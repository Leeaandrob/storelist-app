(function () {
    'use strict';
    angular
        .module('ufitApp.routes', [])
            .config(function($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'apps/menu/menu-template.html',
                        controller: 'MenuCtrl'
                    })

                    .state('app.preferences', {
                        url: '/preferences',
                        views: {
                            'menuContent': {
                                templateUrl: 'apps/preferences/preferences-template.html',
                                controller: 'PreferencesCtrl'
                            }
                        }
                    })

                    .state('app.lessons', {
                        url: '/lessons',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'apps/lessons/lessons-template.html',
                                controller: 'LessonsCtrl'
                            }
                        }
                    })

                    .state('app.lesson', {
                        url: '/lessons/:lessonId',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'apps/lessons/lesson-template.html',
                                controller: 'LessonCtrl'
                            }
                        }
                    })

                    .state('app.video', {
                        url: '/lessons/:lessonId/:videoId',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'apps/video/video-template.html',
                                controller: 'VideoCtrl'
                            }
                        },
                        onExit: function(ScreenOrientation) {
                            console.log('ScreenOrientation');
                            ScreenOrientation.lockOrientation('portrait');
                        }
                    });
                $urlRouterProvider
                    .otherwise('/signin');
            });
}());