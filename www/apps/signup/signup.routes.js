(function () {
    'use strict';

    angular
        .module('app.signup')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRoutes ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signup-step1', {
                url: '/signup/step1',
                templateUrl: 'apps/signup/step1.html',
                controller: 'SignupController as vm'
            })

            .state('signup-step2', {
                url: '/signup/step2',
                templateUrl: 'apps/signup/step2.html',
                controller: 'SignupController as vm'
            })

            .state('signup-step3', {
                url: '/signup/step3',
                templateUrl: 'apps/signup/step3.html',
                controller: 'SignupController as vm'
            })

            .state('signup-step4', {
                url: '/signup/step4',
                templateUrl: 'apps/signup/step4.html',
                controller: 'SignupController as vm'
            });
    }
}());