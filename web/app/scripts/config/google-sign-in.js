(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .config(GoogleSignInConfig);

    GoogleSignInConfig.$inject = ['GoogleSigninProvider'];

    function GoogleSignInConfig(GoogleSigninProvider) {
      GoogleSigninProvider.init({
        //client_id: '609554142051-do19h124mf1ni8v2t6gq0f9f6onh74im.apps.googleusercontent.com' // staging
        client_id: '609554142051-3mmupe9tupv6r5q8k3gnp28noi7bnd4k.apps.googleusercontent.com' // local
      });
    }
  }
)();