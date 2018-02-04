(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .factory('Auth', Auth);

    Auth.$inject = ['$http', 'API_URL'];

    function Auth($http, API_URL){

      var factory = {
        signUp: signUp,
        login: login
      };
      return factory;


      /* functions */
      function signUp(data) {
        return $http({
          url: API_URL + '/signup',
          method: 'POST',
          data: data
        });
      }
      function login(data) {
        return $http({
          url: API_URL + '/login',
          method: 'POST',
          data: data
        });
      }

    }
  }
)();
