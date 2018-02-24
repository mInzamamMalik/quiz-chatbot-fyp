(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .factory('NLP', NLP);

    NLP.$inject = ['$http', 'HEROKU_URL'];

    function NLP($http, HEROKU_URL){

      var factory = {
        getVoice: getVoice,
        listen: listen
      };
      return factory;


      /* functions */
      function getVoice() {
        return $http({
          url: HEROKU_URL + '/voice',
          method: 'GET'
        });
      }
      function listen(data) {
        return $http({
          url: HEROKU_URL + '/translate',
          method: 'POST',
          data: {
            voice: data.voice || 'Joanna',
            SSML: JSON.stringify(data.ssml)
          }
        });
      }

    }
  }
)();
