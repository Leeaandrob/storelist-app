(function () {
    'use strict';
    angular
        .module('ufitApp', [
                'ionic',
                'ngStorage',
                'ngResource',
                'ScreenOrientation', 
                'fileReader', 
                'app.utils',
                'app.people',
                'app.signup',
                'app.LessonServices',
                'ufitApp.routes', 
                'ufitApp.dataStored', 
                'ufitApp.menu.controller',
                'ufitApp.preferences.controller',
                'ufitApp.lessons.controller',
                'ufitApp.video.controller',
                'ufitApp.workout.controller'
            ])
            .config(function($resourceProvider) {
                $resourceProvider.defaults.stripTrailingSlashes = false;
            })
            .run(function($ionicPlatform, $rootScope) {
                var conf = {
                        protocol: 'http:',
                        //URI: '//ufitapp.com',
                        URI: '//localhost',
                        port: '8000',
                        version: 'v1'
                    };

                $rootScope.baseURL = conf.protocol + conf.URI + (conf.port ? (':' + conf.port) : '') + '/' + conf.version;
                $rootScope.baseMediaURL = conf.protocol + conf.URI + (conf.port ? (':' + conf.port) : '');

                $ionicPlatform.ready(function() {
                    if (window.cordova && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    };

                    if (window.StatusBar) {
                        StatusBar.styleDefault();
                    };

                });
            });
}());