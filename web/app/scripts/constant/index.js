(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .constant('API_URL', 'https://us-central1-rad-ul-fasaad.cloudfunctions.net')
      .constant('HEROKU_URL', 'https://api-nlp.herokuapp.com')
      .constant('ERROR_MSG', 'Something went\'s wrong');

  }
)();