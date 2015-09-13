(function () {
    'use strict';
    angular
        .module('storeListApp.stores.controller', [])
            .controller('StoresCtrl', function($scope, $rootScope, $localStorage) {
				$scope.stores = [{
					'name': 'Nokia'
					, activities: ['Celular', 'Som', 'Eletro']
					, 'store': '216c'
				},
				{
					'name': 'Nokia'
					, activities: ['Celular', 'Som', 'Eletro']
					, 'store': '216c'
				},
				{
					'name': 'Nokia'
					, activities: ['Celular', 'Som', 'Eletro']
					, 'store': '216c'
				}]
        	});
}());
