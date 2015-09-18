(function () {
	'use strict';
	angular
		.module('app.stores.StoresServices', [])
			.factory('Stores', function ($resource, $rootScope) {
				return $resource($rootScope.baseURL + '/stores/:id/?format=json',
								 {id: '@id'});
				 });
}());
