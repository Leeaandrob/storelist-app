(function () {
    'use strict';
    angular
        .module('storeListApp.stores.controller', [])
            .controller('StoresCtrl', function($scope, $rootScope, $localStorage, $http, Stores) {
				$scope.allStores = Stores.query();
        	});
}());
