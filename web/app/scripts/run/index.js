(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .run(runBlock);

    runBlock.$inject = ['$rootScope', 'AppLoader'];

    function runBlock($rootScope, AppLoader) {

      console.info('runBlock......................... ');
      /* toggle loading at root level */

      $rootScope.appLoading = function(data) {
        $rootScope.boolean = data;
        data ? AppLoader.start() : AppLoader.stop();
      };
      //$rootScope.$watch('loading', function(ov, nv) {
      //  console.info('watch loading value ', nv);
      //  if(nv) {
      //    /* start loading */
      //    console.info('if value ', nv);
      //    AppLoader.start();
      //  }
      //
      //  if(nv == false) {
      //    /* stop loading */
      //    console.info('else value ', nv);
      //    AppLoader.stop();
      //  }
      //
      //});   //true: for object

    }
  }
)();
