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
      content: 'hi there.',
      date: new Date(),
      isMe: 1
    }, {
      content: 'see time after a while.',
      date: new Date().getTime()+200000,
      isMe: 1
    }, {
      content: 'what\'s up broh!.',
      date: new Date().getTime()-500000,
      isMe: 1
    }, {
      content: 'i am just testing its wonderful.',
      date: new Date().getTime()-100000,
      isMe: 0
    }, {
      content: 'yeah.',
      date: new Date().getTime()-800000,
      isMe: 1
    }, {
      content: 'this is text speech testing.',
      date: new Date().getTime()-1200000,
      isMe: 0
    }, {
      content: 'i am looking coooooool.',
      date: new Date().getTime()-300000,
      isMe: 1
    }, {
      content: 'really awesome.',
      date: new Date().getTime()-700000,
      isMe: 0
    }, {
      content: 'testing sound D.J.',
      date: new Date().getTime()-300000,
      isMe: 1
    }, {
      content: 'waaaaaaaaaaaaaaao.',
      date: new Date().getTime()-400000,
      isMe: 0
    }, {
      content: 'keep rocking man.',
      date: new Date().getTime()-100000,
      isMe: 1
    }, {
      content: 'More awesome content.',
      date: new Date().getTime()-900000,
      isMe: 0
    }, {
      content: 'love you babes.',
      date: new Date().getTime()-700000,
      isMe: 1
    }];


    vm.animateElementIn = animateElementIn;
    vm.animateElementOut = animateElementOut;


    function animateElementIn($el) {
      $el.find(".timeline-panel-style").addClass('animated pulse');
    }
    function animateElementOut($el) {
      $el.find(".timeline-panel-style").removeClass('animated pulse');
    }
  }

})();
