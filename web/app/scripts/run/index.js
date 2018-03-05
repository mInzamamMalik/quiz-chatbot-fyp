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
    }
  }
)();
