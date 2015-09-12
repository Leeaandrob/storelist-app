(function () {
    'use strict';

    angular
        .module('app.people')
        .factory('User', User);

    User.$inject = ['$resource', '$rootScope', 'TokenHandler'];

    function User ($resource, $rootScope, TokenHandler) {
        var resource = $resource($rootScope.baseURL + '/people/:id/', {
                id: '@id',
            }, {
                update: {
                    method: 'PUT'
                }
            });

      return resource;

      resource = TokenHandler.wrapActions(resource, ['query', 'update']);
    }
}());
