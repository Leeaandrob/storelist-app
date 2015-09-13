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
                    .state('app.stores.inner', {
                        url: '/stores/{{stores.id}}',
                        cache: false,
                        views: {
                            'menuContent': {
                                templateUrl: 'apps/stores/stores-inner.html',
                                controller: 'StoresInnerCtrl'
                            }
                        }
                    })      
                $urlRouterProvider
                    .otherwise('/app/stores');
            });
}());