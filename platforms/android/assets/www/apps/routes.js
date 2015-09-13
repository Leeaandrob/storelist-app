(function () {
    'use strict';
    angular
        .module('storeListApp.routes', [])
            .config(function($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'apps/menu/menu-template.html',
                        controller: 'MenuCtrl'
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

                    .state('app.stores', {
                        url: '/stores',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'apps/stores/stores-template.html',
                                controller: 'StoresCtrl'
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

                $urlRouterProvider
                    .otherwise('/app/stores');
            });
}());