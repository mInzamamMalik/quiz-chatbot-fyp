(function(){
  'use strict';

  angular
    .module('radUlFasaadApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['tts'];

  function HomeCtrl(tts) {
    /* jshint validthis: true */
    var vm = this;
    vm.timeline = [{
      content: 'hi there.',
      isMe: 1
    }, {
      content: 'its me.',
      isMe: 1
    }, {
      content: 'what\'s up broh!.',
      isMe: 1
    }, {
      content: 'i am just testing its wonderful.',
      isMe: 0
    }, {
      content: 'yeah.',
      isMe: 1
    }, {
      content: 'this is text speech testing.',
      isMe: 0
    }, {
      content: 'i am looking coooooool.',
      isMe: 1
    }, {
      content: 'really awesome.',
      isMe: 0
    }, {
      content: 'testing sound D.J.',
      isMe: 1
    }, {
      content: 'waaaaaaaaaaaaaaao.',
      isMe: 0
    }, {
      content: 'keep rocking man.',
      isMe: 1
    }, {
      content: 'More awesome content.',
      isMe: 0
    }, {
      content: 'love you babes.',
      isMe: 1
    }];


    vm.animateElementIn = animateElementIn;
    vm.animateElementOut = animateElementOut;
    vm.playText = playText;


    function animateElementIn($el) {
      $el.find(".timeline-panel-style").addClass('animated pulse');
    }
    function animateElementOut($el) {
      $el.find(".timeline-panel-style").removeClass('animated pulse');
    }
    function playText(text) {
      tts.speech({
        src: text,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
      });
    }
  }

})();
