(function () {
    'use strict';
    angular
        .module('storeListApp', [
                'ionic',
                'ngStorage',
                'ngResource',
                'ScreenOrientation',
                'fileReader',
                'app.utils',
				'app.stores.StoresServices',
                'storeListApp.routes',
                'storeListApp.dataStored',
                'storeListApp.menu.controller',
                'storeListApp.stores.controller',
            ])
            .config(function($resourceProvider) {
                $resourceProvider.defaults.stripTrailingSlashes = false;
            })
            .run(function($ionicPlatform, $rootScope) {
                var conf = {
                        protocol: 'http:',
                        URI: '//storelist.leandrobarbosa.info',
                        //URI: '//localhost',
                        //port: '8000',
                        version: 'api/v1'
                    };

                $rootScope.baseURL = conf.protocol + conf.URI + (conf.port ? (':' + conf.port) : '') + '/' + conf.version;

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