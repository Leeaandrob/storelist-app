(function () {
	'use strict';

	angular
    	.module('app.LessonServices', [])
        	.factory('Lessons', function ($resource, $rootScope) {
                return $resource($rootScope.baseURL + '/programs/:id/?format=json',
        						 {id: '@id'});
        	});
}());
