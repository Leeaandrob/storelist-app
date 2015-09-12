(function () {
	'use strict';

	angular
		.module('app.signup')
		.controller('SignupController', SignupController);

	SignupController.$inject = ['logger', '$q','warner', '$ionicLoading', 'UserSession', 'User', '$state', '$localStorage'];

	function SignupController (logger, $q, warner, $ionicLoading, UserSession, User, $state, $localStorage) {
		var
			  vm = this,
			  user
		;

		vm.user = {};
		vm.title = 'Cadastro';
		vm.signupStep1 = signupStep1;
		vm.signupStep2 = signupStep2;
		vm.updateStep1 = updateStep1;
		//vm.updateStep2 = updateStep2;
		console.log('run controller');

		function validateBasicUserInfo (user) {
			return $q(function (resolve, reject) {
				if (!user.email) {
					reject("Verifique seu e-mail");
					return;
				}

				resolve();
			});
		}

		function createNewUser () {
			$ionicLoading.show({
				template: '<i class="fa fa-refresh fa-spin fa-2x"></i>'
			});
			user.$save()
				.then(logInUser)
				.catch(warner.warn);
		}

		function signupStep1() {
			user = new User(vm.user);
			if(user.activity_level) {
				user.activity_level = vm.user.activity_level;
				UserSession.save(user);
				$state.go('signup-step2');
			}
		}

		function signupStep2 () {
			user = new User(vm.user);
			validateBasicUserInfo(vm.user)
				.then(createNewUser)
				.catch(warner.warn);
		};

		function logInUser () {
			UserSession.logIn(vm.user)
				.then(function (user) {
					$ionicLoading.hide();
					$state.go('signup-step3');
				})
				.catch(function () {
					warner.warn('Seu cadastro foi feito, mas tivemos problemas para conectar com o Ufit. Por favor, tente mais tarde');
				});
		}

		function updateStep1 () {
			UserSession.getUser()
				.then(function (user) {
					var
						now = new Date().getFullYear()
						, userAge = vm.user.age.getFullYear()
						, age = now - userAge
					;

					user.name = vm.user.name;
					user.gender = vm.user.gender;
					user.age = age;
					user.weight = vm.user.weight;
					user.height = vm.user.height;
					user.activity_level;

					if (user.gender && user.age && user.weight && user.height) {
						user.$update()
							.then(function () {
								UserSession.save(user);
								$state.go('app.lessons');
							})
							.catch(warner.warn);
					} else {
						warner.warn('Verifique seus dados!');
					}
				})
				.catch(warner.warn);
		}

		function updateStep3 () {
			UserSession.getUser()
				.then(function (user) {
					user.activity_level = vm.user.activity_level;
					if(user.activity_level){
						user.$update()
							.then(function () {
								UserSession.save(user);
								$state.go('app.lessons');
							})
							.catch(warner.warn);
					}
					else{
						warner.warn('Verifique seus dados!');
					}
				})
				.catch(warner.warn);
		}

		function updateStep4 () {
			UserSession.getUser()
				.then(function (user) {
					user.picture = vm.user.picture;
					if(user.picture){
						user.$update()
							.then(function () {
								UserSession.save(user);
								$state.go('app.lessons');
							})
							.catch(warner.warn);
					}
					else{
						warner.warn('Verifique seus dados!');
					}
				})
				.catch(warner.warn);
		}

	}
}());
