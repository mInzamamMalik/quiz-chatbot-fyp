(function(){
  'use strict';

  angular
    .module('radUlFasaadApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [];

  function HomeCtrl() {
    /* jshint validthis: true */
    var vm = this;

    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }

})();
