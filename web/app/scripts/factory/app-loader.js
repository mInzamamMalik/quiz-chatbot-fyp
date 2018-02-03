(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .factory('AppLoader', AppLoader);

    AppLoader.$inject = [];

    function AppLoader(){

      /* locals */
      var loader;

      var loading_html = "" +
        "<div class='sk-three-bounce'>" +
        "<div class='sk-child sk-bounce1 bg-white'></div>" +
        "<div class='sk-child sk-bounce2 bg-white'></div>" +
        "<div class='sk-child sk-bounce3 bg-white'></div>" +
        "</div>";

      var factory = {
        start: start,
        stop: stop
      };
      return factory;


      /* functions */
      function start() {
        console.info('start function start')
        loader = window.pleaseWait({
          logo: '',
          backgroundColor: '#00000099',
          loadingHtml: loading_html
        })
      }
      function stop() {
        console.info('stop function work')
        loader.finish();
      }

    }
  }
)();