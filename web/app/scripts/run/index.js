(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .run(runBlock);

    runBlock.$inject = ['$rootScope', 'AppLoader'];

    function runBlock($rootScope, AppLoader) {

      /* toggle loading at root level */

      /* vm-properties */
      $rootScope.isLoading = false;


      /* init */
      stopLoadingOnloaded();
      //initFirebase();

      /* vm-functions */
      $rootScope.startLoading = startLoading;


      /* functions */
      function startLoading(val) {
        $rootScope.isLoading = val;
        if (val) AppLoader.start();
        else AppLoader.stop();
      }
      function stopLoadingOnloaded() {
        startLoading(true);
        window.onload = function() {
          startLoading(false);
        };
      }
      //function initFirebase() {
      //  // Initialize Firebase by given your Project API keys
      //  var config = {
      //    apiKey: "AIzaSyCM_3rlpC55BaiPnkbpM91aRG8X4mOXKfo",
      //    authDomain: "rad-ul-fasaad.firebaseapp.com",
      //    databaseURL: "https://rad-ul-fasaad.firebaseio.com",
      //    projectId: "rad-ul-fasaad",
      //    storageBucket: "rad-ul-fasaad.appspot.com",
      //    messagingSenderId: "609554142051"
      //  };
      //  firebase.initializeApp(config);
      //}
    }
  }
)();
