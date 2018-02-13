(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .config(AngularTimeAgo);

    AngularTimeAgo.$inject = ['timeAgoSettings'];

    function AngularTimeAgo(timeAgoSettings) {
      timeAgoSettings.allowFuture = true;
    }
  }
)();