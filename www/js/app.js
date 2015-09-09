(function(){

var app = angular.module('myFeed', ['ionic', 'angularMoment']);

//Controllers
app.controller('MainCtrl', function($http, $scope, $ionicSideMenuDelegate){
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.menus = [];
    $http.get('https://www.reddit.com/reddits/.json')
    .success(function(response){
      angular.forEach(response.data.children, function(child){
        $scope.menus.push(child.data);
      });
      console.log($scope.menus);
    });

});

app.controller('HomeCtrl', function($http, $scope, $ionicSideMenuDelegate){
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
});

app.controller('FeedCtrl', function($http, $scope, $ionicSideMenuDelegate, $stateParams){
    var displayName = $stateParams.displayName;
    $scope.infos = {
        'title': displayName
    };
    $scope.items = [];

    function getContent(params, callback){
        $http.get('http://www.reddit.com/r/'+ displayName +'/new/.json', {params: params})
        .success(function(response){
            var items = [];
            angular.forEach(response.data.children, function(child){
                items.push(child.data);
            });
            callback(items);
        });
    }

    $scope.loadOlder = function() {
        var params = {};
        if($scope.items.length > 0){
            params['after'] = $scope.items[$scope.items.length - 1].name;
        }
        getContent(params, function(older){
            $scope.items = $scope.items.concat(older);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };

    $scope.loadNewer = function() {
        var params = {'before': $scope.items[0].name};
        getContent(params, function(newer){
            $scope.items = newer.concat($scope.items);
            $scope.$broadcast('scroll.refreshComplete');
        })
    };

    $scope.openNew = function(url){
        window.open(url, '_blank', 'location=no;');
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
  .state('menu.feed', {
    url: '/feed/{displayName}',
    views:{
      'menuContent': {
        templateUrl: 'templates/new-feed.html',
        controller: 'FeedCtrl'
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

  $urlRouterProvider.otherwise("/menu/home");
});


}());