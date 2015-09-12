(function () {
    'use strict';

    angular
        .module('app.people')
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRoutes ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signin', {
                  url: '/signin'
                , cache: false
                , templateUrl: 'apps/people/signin.html'
                , controller: 'SigninController as vm'
            });
    }
}());