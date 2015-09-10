(function(){

var app = angular.module('myFeed', ['ionic', 'angularMoment']);

//Controllers
app.controller('MainCtrl', function($scope, $ionicSideMenuDelegate){
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.malls = [
    	{
		'title': 'Barra Shopping'
		, 'slug': 'barra'
    	}
    	,
    	{
		'title': 'Shopping Rio Sul'
		, 'slug': 'rio_sul'
    	}
 	];

});

app.controller('HomeCtrl', function($http, $scope, $ionicSideMenuDelegate){
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
});

app.controller('ShoppingCtrl', function($http, $scope, $ionicSideMenuDelegate, $stateParams){
    var slug = $stateParams.slug;

    $scope.mall = {
        'title': 'Barra Shopping',
        'slug': slug
    };

    $scope.stores = [
    	{
	        'name': 'Nokia',
	        'slug': 'nokia'
    	},
    	{
	        'name': 'Apple',
	        'slug': 'apple'
    	},
    	{
	        'name': 'Microsoft',
	        'slug': 'microsoft'
    	}
    ];


    // function getContent(params, callback){
    //     $http.get('http://www.reddit.com/r/'+ displayName +'/new/.json', {params: params})
    //     .success(function(response){
    //         var items = [];
    //         angular.forEach(response.data.children, function(child){
    //             items.push(child.data);
    //         });
    //         callback(items);
    //     });
    // }

    // $scope.loadOlder = function() {
    //     var params = {};
    //     if($scope.items.length > 0){
    //         params['after'] = $scope.items[$scope.items.length - 1].name;
    //     }
    //     getContent(params, function(older){
    //         $scope.items = $scope.items.concat(older);
    //         $scope.$broadcast('scroll.infiniteScrollComplete');
    //     })
    // };

    // $scope.loadNewer = function() {
    //     var params = {'before': $scope.items[0].name};
    //     getContent(params, function(newer){
    //         $scope.items = newer.concat($scope.items);
    //         $scope.$broadcast('scroll.refreshComplete');
    //     })
    // };

    // $scope.openNew = function(url){
    //     window.open(url, '_blank', 'location=no;');
    // };

});

app.controller('StoreCtrl', function($http, $scope, $stateParams, $ionicHistory){
    var slug = $stateParams.slug;

    $scope.store = {
        'title': 'Nokia',
        'slug': slug
    };

    $scope.back = function() {
      $ionicHistory.goBack();
    };
});

//Routes
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('menu', {
    url: "/menu",
    abstract: true,
    templateUrl: "templates/menu.html"
  })
  .state('menu.shopping', {
    url: '/shopping/{slug}',
    views:{
      'menuContent': {
        templateUrl: 'templates/shopping.html',
        controller: 'ShoppingCtrl'
      }
    }
  })
  .state('menu.home', {
    url: '/home',
    views:{
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('menu.store', {
    url: '/store/{slug}',
    views:{
      'menuContent': {
        templateUrl: 'templates/store-detail.html',
        controller: 'StoreCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise("/menu/home");
});


}());