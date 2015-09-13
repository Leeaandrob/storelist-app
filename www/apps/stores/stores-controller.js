(function () {
    'use strict';
    angular
        .module('storeListApp.stores.controller', [])
            .controller('StoresCtrl', function($scope, $rootScope, $localStorage) {
				$scope.stores = [{
					'name': 'Nokia'
					, 'image': 'http://lorempixel.com/400/400/technics/'
					, activities: ['Celular', 'Som', 'Eletro']
					, 'store': '216c'
					, 'id': '01'
				}]
        	});
}());
