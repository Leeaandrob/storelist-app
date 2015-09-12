(function () {
	'use strict';

	angular
		.module('app.people')
		.factory('UserSession', UserSession);

	UserSession.$inject = ['$rootScope', '$http', '$localStorage', 'User', '$q'];

	function UserSession ($rootScope, $http, $localStorage, User, $q) {
		return {
			  logIn: logIn
			, update: update
			, logOut: logOut
			, clearUserData: clearUserData
			, getUser: getUser
			, getAuthToken: getAuthToken
			, save: save
		}

		function logIn (user) {
			return $q(function (resolve, reject) {
				$http.post($rootScope.baseURL + '/api-token-auth/', user)
					.then(function (response) {
						User.get({ id: response.data.id }, function (user) {
								save(user, response.data.authToken);
								$rootScope.$broadcast('login');

								resolve(user);
							});
					})
					.catch(function (response) {
						$localStorage.user = false;
						reject(response.data);
					});
			});
		};

		function update (user, callback) {
			$http.put($rootScope.baseURL + '/api-token-auth/' + user.id, user)
				.success(function (data) {
					$rootScope.user = user;
					$rootScope.$broadcast('login');
					if (angular.isFunction(callback)) {
						callback(data);
					}
				})
				.error(function (data) {
					$localStorage.user = false;
					if (angular.isFunction(callback)) {
						callback(false);
					}
				});
		};

		function logOut (callback) {
			clearUserData();

			$rootScope.$broadcast('logout');

			if (angular.isFunction(callback)) {
				callback();
			}
		};

		function clearUserData (user) {
			$localStorage.$reset();
		};

		function getUser () {
			return $q(function (resolve, reject) {
				if ($localStorage.user) {
					User.get({id:$localStorage.user.id}, function (user){
						$localStorage.user = user;
						resolve(user);
					});
				} else {
					reject("No user session stored.")
				}
			});
		};

		function getAuthToken () {
			return $q(function (resolve, reject) {
				if ($localStorage.authToken) {
					resolve(authToken);
				} else {
					reject("No authToken session stored.")
				}
			});
		};

		function save (user, authToken) {
			$localStorage.user = user;
			$localStorage.authToken = authToken;
		}
	}
}());
