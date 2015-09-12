(function () {
	'use strict';

	angular
		.module('app.people')
		.controller('SigninController', SigninController);

	SigninController.$inject = ['$scope', '$ionicLoading', 'UserSession', '$state', '$ionicPopup'];

	function SigninController ($scope, $ionicLoading, UserSession, $state, $ionicPopup) {
		var vm = this;

		vm.user = {};
		vm.attemptSignin = attemptSignin;
		vm.goToSignupPage = goToSignupPage;

        function goToSignupPage () {
			$state.go('signup-step1');
		};

		function attemptSignin () {
			$ionicLoading.show({
				template: '<i class="fa fa-refresh fa-spin fa-2x"></i>'
			});

			UserSession.logIn(vm.user)
				.then(doSignin)
				.catch(handleSigninError);
		};

		function doSignin (success) {
			$ionicLoading.hide();
			$state.go('app.lessons');
		}

		function handleSigninError (error) {
			$ionicLoading.hide();
			$ionicPopup.alert({
				template: 'Verifique seus dados e tente novamente.',
				title: '<i class="ion-alert-circled fa-2x alert"></i>'
			});
		}
	}
}());
