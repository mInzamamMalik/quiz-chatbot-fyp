(function(){
  'use strict';

  angular
    .module('radUlFasaadApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$rootScope', '$timeout', 'Auth', 'GoogleSignin', 'toastr', 'ERROR_MSG'];

  function MainCtrl($rootScope, $timeout, Auth, GoogleSignin, toastr, ERROR_MSG) {
    /* jshint validthis: true */
    var vm = this;


    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    vm.register = {};
    vm.singIn = {};
    vm.user = null;


    vm.openLoginModal = openLoginModal;
    vm.openRegisterModal = openRegisterModal;
    vm.showLoginForm = showLoginForm;
    vm.showRegisterForm = showRegisterForm;
    vm.loginAjax = loginAjax;
    vm.logout = logout;
    vm.signInWithGoogle = signInWithGoogle;
    vm.registerUser = registerUser;


    init();


    function init() {
      AWS.config.region = 'xxx';
      AWS.config.accessKeyId = 'xxxxxxxxx';
      AWS.config.secretAccessKey = 'xxxxxxxxxxxxxxxxxxxxxx';

      var polly = new AWS.Polly();
      var params = {
        OutputFormat: 'mp3', /* required */
        Text: ` <speak>
                   hisaaaa ssd<break time="1s"/>
                   In the middle of the 10/3/2014 <sub alias="World Wide Web Consortium">W3C</sub> meeting
                   he shouted, "Score!" quite loudly. When his boss stared at him, he repeated
                   <amazon:effect name="whispered">"Score"</amazon:effect> in a whisper.
                </speak>`, /* required */
        VoiceId: 'Joanna', /* required */
        SampleRate: '22050',
        TextType: 'ssml'
      };

      polly.synthesizeSpeech(params, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('stream ', data);

          var blob = new Blob([data.AudioStream], {type : data.ContentType});

          $timeout(function() {
            var reader = new FileReader();
            reader.onload = function(e) {
              angular.element("#say_speak").attr("src", e.target.result);
            };
            reader.readAsDataURL(blob);
          });

        }
      });
    }

    function openLoginModal(){
      showLoginForm();
      $timeout(function(){
        $('#loginModal').modal('show');
      }, 230);

    }
    function openRegisterModal(){
      showRegisterForm();
      $timeout(function(){
        $('#loginModal').modal('show');
      }, 230);

    }
    function showLoginForm(){
      $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
          $('.login-footer').fadeIn('fast');
        });

        $('.modal-title').html('Login with');
      });
      $('.error').removeClass('alert alert-danger').html('');
    }
    function showRegisterForm(){
      $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
          $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
      });
      $('.error').removeClass('alert alert-danger').html('');

    }
    function loginAjax(form){
      if(form.$valid) {
        console.info('form ', vm.singIn);
        $rootScope.startLoading(true);

        Auth.login(vm.singIn)
          .then(function(res) {
            console.info('res ', res);
            vm.singIn = {};
            $rootScope.startLoading(false);
          }, function(err) {
            console.info('err ', err);
            vm.singIn = {};
            $rootScope.startLoading(false);
            $timeout(function() {
              shakeModal();
            }, 2000);
          });

      }
    }
    function shakeModal(){
      $('#loginModal .modal-dialog').addClass('shake');
      $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
      $('input[type="password"]').val('');
      $timeout( function(){
        $('#loginModal .modal-dialog').removeClass('shake');
      }, 1000 );
    }
    function registerUser(form) {
      if(form.$valid) {
        console.info('form ', vm.register);
        $rootScope.startLoading(true);

        Auth.signUp(vm.register)
          .then(function(res) {
            console.info('res ', res);
            vm.register = {};
            $rootScope.startLoading(false);
          }, function(err) {
            console.info('err ', err);
            vm.register = {};
            $rootScope.startLoading(false);
          })
      }
    }
    function signInWithGoogle(){
      GoogleSignin.signIn()
        .then(function (user) {
          $timeout(function () {
            $('#loginModal').fadeOut('fast',function(){
              $('button[data-dismiss]').click();
            });
            var profile = user.getBasicProfile();
            var userDetail = {
              fName: profile.getGivenName(),
              lName: profile.getFamilyName(),
              fullName: profile.getName(),
              email: profile.getEmail(),
              id: profile.getId(),
              img: profile.getImageUrl()
            };
            vm.user = userDetail;
            toastr.success('logged in as ' + userDetail.fName);
            console.info(vm.user)
          });
        }, function (err) {
          console.log('reason ', err);
          toastr.error(ERROR_MSG);
        });
    }
    function logout() {
      GoogleSignin.signOut()
        .then(function (res) {
          $timeout(function () {
            console.info('logged out');
            vm.user = null;
          });
        }, function (err) {
          console.log('reason ', err);
          toastr.error(ERROR_MSG);
        });
    }
  }

})();
