(function () {
	'use strict';

	angular
		.module('app.people')
		.factory('TokenHandler', TokenHandler);

	function TokenHandler () {
		var token = "none";

		return {
			  set: set
			, get: get
			, wrapActions: wrapActions
		}

		function set (newToken) {
			token = newToken;
		}

		function get () {
			return token;
		}

		function wrapActions (resource, actions) {
			var wrappedResource = resource;

			angular.forEach(actions, function (action) {
				tokenWrapper(wrappedResource, action);
			});

			return wrappedResource;
		};

		function tokenWrapper ( resource, action ) {
			resource['_' + action]  = resource[action];
			resource[action] = function (data, success, error) {
				return resource['_' + action](
					 angular.extend({}, data || {}, { authorization: self.get() })
					, success
					, error
				);
			};
		}

	}
}());
