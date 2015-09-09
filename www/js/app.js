(function(){

var app = angular.module('myFeed', ['ionic', 'angularMoment']);

//Controllers
app.controller('MainCtrl', function($http, $scope, $ionicSideMenuDelegate){
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
});

app.controller('AwwCtrl', function($http, $scope, $ionicSideMenuDelegate){

  $scope.items = [];
  $scope.infos = {
    'title': 'Aww'
  };

  function getContent(params, callback){
    $http.get('http://www.reddit.com/r/aww/new/.json', {params: params})
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

});

app.controller('GamingCtrl', function($http, $scope, $ionicSideMenuDelegate){

  $scope.items = [];
  $scope.infos = {
    'title': 'Gaming'
  };

  function getContent(params, callback){
    $http.get('http://www.reddit.com/r/gaming/new/.json', {params: params})
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

});

app.controller('FunnyCtrl', function($http, $scope, $ionicSideMenuDelegate){

  $scope.items = [];
  $scope.infos = {
    'title': 'Funny'
  };

  function getContent(params, callback){
    $http.get('http://www.reddit.com/r/funny/new/.json', {params: params})
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

});

app.controller('SportsCtrl', function($http, $scope, $ionicSideMenuDelegate){

  $scope.items = [];
  $scope.infos = {
    'title': 'Sports'
  };

  function getContent(params, callback){
    $http.get('http://www.reddit.com/r/sports/new/.json', {params: params})
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

});

//Routes
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('menu', {
    url: "/menu",
    abstract: true,
    templateUrl: "templates/menu.html"
  })
  .state('menu.aww', {
    url: '/aww',
    views:{
      'menuContent': {
        templateUrl: 'templates/feed.html',
        controller: 'AwwCtrl'
      }
    }
  })
  .state('menu.gaming', {
    url: '/gaming',
    views:{
      'menuContent': {
        templateUrl: 'templates/feed.html',
        controller: 'GamingCtrl'
      }
    }
  })
  .state('menu.funny', {
    url: '/funny',
    views:{
      'menuContent': {
        templateUrl: 'templates/feed.html',
        controller: 'FunnyCtrl'
      }
    }
  })
  .state('menu.sports', {
    url: '/sports',
    views:{
      'menuContent': {
        templateUrl: 'templates/feed.html',
        controller: 'SportsCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise("/menu/aww");
});


}());