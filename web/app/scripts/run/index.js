(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .run(runBlock);

    runBlock.$inject = ['$rootScope', 'AppLoader'];

    function runBlock($rootScope, AppLoader) {

      /* toggle loading at root level */

      $rootScope.isLoading = false;

      $rootScope.startLoading = function(val) {
        $rootScope.isLoading = val;
        if (val) AppLoader.start();
        else AppLoader.stop();
      };

    }
  }
)();
