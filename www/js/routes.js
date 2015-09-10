(function(){

var app = angular.module('myFeed', ['ionic', 'angularMoment']);

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