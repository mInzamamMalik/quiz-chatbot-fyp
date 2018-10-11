(function(){
  'use strict';

  angular
    .module('radUlFasaadApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$rootScope', 'toastr', '$window', 'ERROR_MSG', '$timeout', 'User', '$localStorage', '$sessionStorage'];

  function HomeCtrl($rootScope, toastr, $window, ERROR_MSG, $timeout, User, $localStorage, $sessionStorage) {
    /* jshint validthis: true */
    var vm = this;

    var session;

    vm.showDateTooltip = false;
    vm.listeningVoice = false;
    vm.sending = false;
    vm.userInputValue = '';
    vm.timeline = [];


    /* init */
    //initSpeechRecognization();
    initDynamicMicrophoneColor();
    getAllMessages();
    onScrollDateTooltip();

    /* vm-functions */
    vm.animateElementIn = animateElementIn;
    vm.animateElementOut = animateElementOut;
    vm.saveUserInputValue = saveUserInputValue;
    vm.playAudio = playAudio;



    /* functions */
    function animateElementIn($el) {
      $el.find(".timeline-panel-style").addClass('animated pulse');
    }
    function animateElementOut($el) {
      $el.find(".timeline-panel-style").removeClass('animated pulse');
    }
    function saveUserInputValue() {
      vm.sending = true;
      session = $localStorage.session ? $localStorage.session : $sessionStorage.session;

      var payload = {
        fullName: session.profile.fullName,
        text: vm.userInputValue
      };

      User.writeMessage(payload)
        .then(function(res) {
          console.log('input ', res.data);
          vm.timeline.push(res.data);
          $('html, body').animate({scrollTop: $(document).height()}, 2000);
          vm.sending = false;
        }, function(err) {
          console.log('reason ', err);
          toastr.error(ERROR_MSG);
          vm.sending = false;
        });

      vm.userInputValue = '';
    }
    function saveUserVoiceValue(text) {
      //$rootScope.startLoading = true;
      session = $localStorage.session ? $localStorage.session : $sessionStorage.session;

      var payload = {
        fullName: session.profile.fullName,
        text: text
      };

      User.writeMessage(payload)
        .then(function(res) {
          console.log('input ', res.data);
          vm.timeline.push(res.data);
          $('html, body').animate({scrollTop: $(document).height()}, 2000);
          //$rootScope.startLoading = false;
        }, function(err) {
          console.log('reason ', err);
          toastr.error(ERROR_MSG);
          //$rootScope.startLoading = false;
        });

      vm.userInputValue = '';
    }
    function playAudio(ssml) {
      console.info(ssml);
    }
    function initSpeechRecognization() {
      if (annyang) {

        var commands = {
          'hey listen test': function() { console.info('__________this is test!'); },
          'hey listen stop': function() {
            console.info('Stopping ............................');

            // for show text input
            $timeout(function() {
              vm.listeningVoice = false;
            });

            annyang.abort();
          }
        };

        // Add commands to annyang
        annyang.addCommands(commands);

        // Every time match result with commands
        annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
          console.log('@command match');
        });

        // When user say something
        annyang.addCallback('result', function(phrases) {
          console.log(phrases);                       // best possible match is at 0'th index

          SpeechKITT.setInstructionsText(phrases[0]); // then display it
          SpeechKITT.setSampleCommands([]);           // remove instructions (useful only for first time)

          // Writing effect
          $timeout(function() {
            angular.element('#skitt-ui').removeClass('skitt-ui--listening');
            angular.element('#skitt-ui').addClass('skitt-ui--not-listening');
          });
          $timeout(function() {
            angular.element('#skitt-ui').addClass('skitt-ui--listening');
            var match;
            for(var key in commands) {
              if(phrases[0].trim() == key) {
                match = true;
                return;
              }
              else match = false;
            }
            if(!match) saveUserVoiceValue(phrases[0])
          }, 50);
        }, this);

        // Tell KITT to use annyang
        SpeechKITT.annyang();

        // Stylesheet for KITT to use
        SpeechKITT.setStylesheet('https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/1.0.0/themes/flat.css');

        // Allow KITT to display result
        SpeechKITT.displayRecognizedSentence(true);

        // When start
        SpeechKITT.setStartCommand(function() {
          console.info('Speech Recognition Started ______________________________');

          // set text first time for example
          SpeechKITT.setInstructionsText('How can i help you?');
          SpeechKITT.setSampleCommands(['e.g say hello.']);

          // for hide text input
          $timeout(function() {
            vm.listeningVoice = true;
          });

          annyang.start();
        });

        // When abort
        SpeechKITT.setAbortCommand(function() {
          console.info('Stopping ............................');

          // for show text input
          $timeout(function() {
            vm.listeningVoice = false;
          });

          annyang.abort();
        });

        // Render KITT's interface
        SpeechKITT.vroom();

        // Show
        SpeechKITT.show();
      } else {
        toastr.error('<b>Oops!</b> Your browser doesn\'t support <br/> <b>Speech Synthesis</b>', {allowHtml: true})
      }
    }
    function initDynamicMicrophoneColor() {
      var at = 0;
      var colors = [
        'flat-amethyst', 'flat-clouds', 'flat-concrete',
        'flat-emerald', 'flat-midnight-blue', 'flat-orange',
        'flat-pomegranate', 'flat-pumpkin', 'flat-turquoise',
        'flat'
      ];
      var styleSheetPath = 'https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/1.0.0/themes/';

      angular.element('#skitt-listening-box').on('dblclick', function() {
        SpeechKITT.setStylesheet(styleSheetPath + colors[at] + '.css');
        if(at == 9) at = 0;
        else at ++;
      })
    }
    function getAllMessages() {
      $timeout(function() {
        User.getAllMessages()
          .then(function(res) {
            vm.timeline = res.data;
            console.info('timeline ', vm.timeline);
            $rootScope.startLoading = false;
          }, function(err) {
            console.log('reason ', err);
            toastr.error(ERROR_MSG);
            $rootScope.startLoading = false;
          })
      })
    }
    function onScrollDateTooltip() {
      angular.element(window).bind('scroll', function(){
        vm.showDateTooltip = true;
        setTimeout(function() {
          vm.showDateTooltip = false;
        }, 1000)
      });
    }
  }

})();
