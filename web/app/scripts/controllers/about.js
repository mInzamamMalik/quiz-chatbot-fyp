(function(){
  'use strict';

  angular
    .module('radUlFasaadApp')
    .controller('AboutCtrl', AboutCtrl);

  AboutCtrl.$inject = [];

  function AboutCtrl() {
    /* jshint validthis: true */
    var vm = this;

    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }

})();
