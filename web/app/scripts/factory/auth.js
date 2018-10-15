(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .factory('Auth', Auth);

    Auth.$inject = ['$http', 'API_URL', '$localStorage', '$sessionStorage'];

    function Auth($http, API_URL, $localStorage, $sessionStorage){

      var session;

      var factory = {
        signUp: signUp,
        login: login,
        logout: logout
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
      function logout() {
        session = $localStorage.session ? $localStorage.session : $sessionStorage.session;
        return $http({
          url: API_URL + '/logout',
          method: 'POST',
          data: {
            email: session.email,
            token: session.token
          }
        });
      }

    }
  }
)();
