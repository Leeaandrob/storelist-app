(function () {
    'use strict';
    angular
        .module('storeListApp.dataStored', [])
            .factory('DATA', function($ionicPlatform, $rootScope, $timeout, $localStorage, Stores) {
				var
					self = {};
					stores = Stores.query();
					console.log(stores);
					console.log('foo');
            });
}());