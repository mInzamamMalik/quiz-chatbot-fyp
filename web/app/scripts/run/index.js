(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .run(runBlock);

    runBlock.$inject = ['$rootScope', 'AppLoader'];

    function runBlock($rootScope, AppLoader) {

      /* toggle loading at root level */

      $rootScope.loading = false;

      $rootScope.startLoading = function(val) {
        $rootScope.loading = val;
        if (val) AppLoader.start();
        else AppLoader.stop();
      };

    }
  }
)();
