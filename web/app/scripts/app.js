(function(){
  'use strict';

  angular
    .module('radUlFasaadApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'bootstrap.angular.validation',
      'toastr',
      'angular-timeline',
      'angular-scroll-animate',
      'yaru22.angular-timeago',
      'google-signin'
    ])
    .config(RouteConfig);

  RouteConfig.$inject = ['$routeProvider'];

  function RouteConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
        //controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
        //controller: 'AboutCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html'
        //controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
