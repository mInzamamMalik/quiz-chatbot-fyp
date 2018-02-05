(function(){
  'use strict';

  angular
    .module('radUlFasaadApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [];

  function HomeCtrl() {
    /* jshint validthis: true */
    var vm = this;
    vm.timeline = [{
      badgeClass: 'info',
      title: 'First heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      badgeClass: 'warning',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      badgeClass: 'danger',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      badgeClass: 'success',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      badgeClass: 'default',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      badgeClass: 'success',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      badgeClass: 'default',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      badgeClass: 'success',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      badgeClass: 'default',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      badgeClass: 'success',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      badgeClass: 'default',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 1
    }, {
      badgeClass: 'success',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 0
    }, {
      badgeClass: 'default',
      title: 'Second heading',
      content: 'More awesome content.',
      isMe: 1
    }];
  }

})();
