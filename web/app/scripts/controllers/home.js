(function(){
  'use strict';

  angular
    .module('radUlFasaadApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$rootScope', '$speechRecognition', '$speechSynthetis', '$speechCorrection', 'toastr', '$window'];

  function HomeCtrl($rootScope, $speechRecognition, $speechSynthetis, $speechCorrection, toastr, $window) {
    /* jshint validthis: true */
    var vm = this;
    var background = ['red', 'green', 'blue', 'purple', 'grey', 'orange', 'yellow', 'brown', 'golden', 'deepskyblue'];
    var task = [
      {
        'regex': /(.+ )?change( .+)?/gi,
        'lang': 'en-US',
        'call': function(e){
          console.info('changing the background ..................');
          angular.element('body').css('background', background[Math.floor(Math.random() * 9) + 1]);
        }
      }, {
        'regex': /(.+ )?start( .+)?/gi,
        'lang': 'en-US',
        'call': function(e){
          console.info('loading started ..................');
          $rootScope.startLoading(true);
        }
      }, {
        'regex': /(.+ )?stop( .+)?/gi,
        'lang': 'en-US',
        'call': function(e){
          console.info('loading finished ..................');
          $rootScope.startLoading(false);
        }
      }, {
        'regex': /(.+ )?turn off( .+)?/gi,
        'lang': 'en-US',
        'call': function(e){
          console.info('turning off the light ..................');
          angular.element('.home-wrapper').css('background-image', 'none');
          angular.element('body').css('background', 'black');
        }
      }, {
        'regex': /(.+ )?remove( .+)?/gi,
        'lang': 'en-US',
        'call': function(e){
          console.info('ok, removing ..........................');
          angular.element('.home-wrapper').css('background-image', 'none');
        }
      }, {
        'regex': /(.+ )?call( .+)?/gi,
        'lang': 'en-US',
        'call': function(e){
          console.info('calling, please wait ................... ');
          toastr.success('Calling please wait.......');
        }
      }, {
        'regex': /(.+ )?open( .+)?/gi,
        'lang': 'en-US',
        'call': function(e){
          console.info('opening ................... ');
          $window.open("https://www.firebase.com", "", "width=1500,height=400");
        }
      }
    ];
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
    }];



    /* init */
    initCloudFirestore();
      // when start
    $speechRecognition.onstart(function() {
      console.info('Activated!');
    });
      // when nothing detect
    $speechRecognition.onerror(function(e){
      console.info('No voice detected');
    });
      // when somebody speak
    $speechRecognition.onUtterance(function(utterance){
      console.log(utterance);
    });
      // watch also tasks commands
    $speechRecognition.listenUtterance(task);
      // start listening
    //$speechRecognition.listen();


    vm.animateElementIn = animateElementIn;
    vm.animateElementOut = animateElementOut;
    vm.listenSpeech = listenSpeech;


    function animateElementIn($el) {
      $el.find(".timeline-panel-style").addClass('animated pulse');
    }
    function animateElementOut($el) {
      $el.find(".timeline-panel-style").removeClass('animated pulse');
    }
    function listenSpeech(ssml) {
      console.info('ssml ', ssml)
    }
    function initCloudFirestore() {
      // Initialize Cloud Firestore through Firebase
      var db = firebase.firestore();
      db.collection("messages").add({
          content: "hi, this is a testing",
          from: ''
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      db.collection("messages").get()
        .then(function(queryResult) {
          console.log('queryResult ', queryResult);
          queryResult.forEach(function(obj) {
            console.log(obj.id, obj.data());
          });
        });
    }
  }

})();
