(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .factory('User', User);

    User.$inject = ['$http', 'API_URL', '$localStorage', '$sessionStorage'];

    function User($http, API_URL, $localStorage, $sessionStorage){

      var session;

      var factory = {
        writeMessage: writeMessage,
        getAllMessages: getAllMessages
      };
      return factory;


      /* functions */
      function writeMessage(data) {
        session = $localStorage.session ? $localStorage.session : $sessionStorage.session;
        return $http({
          url: API_URL + '/writemessage',
          method: 'POST',
          data: {
            email: session.email,
            token: session.token,
            platform: 'web',
            from: data.fullName,
            text: data.text
          }
        });
      }
      function getAllMessages() {
        session = $localStorage.session ? $localStorage.session : $sessionStorage.session;
        return $http({
          url: API_URL + '/getallmessages',
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
