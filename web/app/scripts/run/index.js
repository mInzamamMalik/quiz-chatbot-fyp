(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .run(runBlock);

    runBlock.$inject = ['$rootScope'];

    function runBlock($rootScope) {

      /* toggle loading at root level */


      /* vm-properties */
      $rootScope.startLoading = true;


      /* init */
      stopLoadingOnloaded();


      /* functions */
      function stopLoadingOnloaded() {
        window.onload = function() {
          $rootScope.startLoading = false;
        };
      }
    }
  }
)();
