(function(){
  'use strict';

  angular
    .module('radUlFasaadApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$rootScope', '$timeout', 'Auth', 'GoogleSignin', 'toastr', 'ERROR_MSG', 'NLP', '$location',
                      '$localStorage', '$sessionStorage'];

  function MainCtrl($rootScope, $timeout, Auth, GoogleSignin, toastr, ERROR_MSG, NLP, $location,
                    $localStorage, $sessionStorage) {
    /* jshint validthis: true */
    var vm = this;



    vm.register = {};
    vm.singIn = {};
    vm.voices = null;
    vm.selectedVoice = {

    };
    vm.user = null;



    /* init */
    getUserProfile();


    /* vm-function */
    vm.openLoginModal = openLoginModal;
    vm.openRegisterModal = openRegisterModal;
    vm.showLoginForm = showLoginForm;
    vm.showRegisterForm = showRegisterForm;
    vm.loginAjax = loginAjax;
    vm.logout = logout;
    vm.signInWithGoogle = signInWithGoogle;
    vm.registerUser = registerUser;



    /* vm-function */
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
      $timeout(function() {
        angular.element('#login_focus').focus();
      }, 500);
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
      $timeout(function() {
        angular.element('#signup_focus').focus();
      }, 500);
    }
    function loginAjax(form){
      if(form.$valid) {
        console.info('form ', vm.singIn);
        $rootScope.startLoading = true;

        Auth.login(vm.singIn)
          .then(function(res) {
            if(vm.singIn.remember) {
              $localStorage.session = res.data;
            } else {
              $sessionStorage.session = res.data;
            }
            vm.singIn = {};
            $timeout(function () {
              $('#loginModal').fadeOut('fast',function(){
                $('button[data-dismiss]').click();
              });
              vm.user = getUserDetail();
              vm.user.profile.fullName = vm.user.profile['firstName'] + ' ' + vm.user.profile['lastName'];
              toastr.success('logged in as ' + vm.user.profile.firstName);
              getVoices();
              $location.path('/home');
              console.info('user ', vm.user);
            });
          }, function(err) {
            console.info('err ', err);
            toastr.error(err.data);
            $rootScope.startLoading = false;
            $timeout(function() {
              shakeModal();
            });
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
        $rootScope.startLoading = true;

        Auth.signUp(vm.register)
          .then(function(res) {
            console.info('res ', res);
            vm.register = {};
            $rootScope.startLoading = false;
          }, function(err) {
            console.info('err ', err);
            vm.register = {};
            $rootScope.startLoading = false;
          })
      }
    }
    function signInWithGoogle(){
      GoogleSignin.signIn()
        .then(function (user) {
          $timeout(function () {
            $('#loginModal').fadeOut('fast',function(){
              $('button[data-dismiss]').click();
              $rootScope.startLoading = true;
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
            getVoices();
            $location.path('/home');
            console.info(vm.user)
          });
        }, function (err) {
          console.log('reason ', err);
          toastr.error(ERROR_MSG);
          $rootScope.startLoading = false;
        });
    }
    function logout() {
      $rootScope.startLoading = true;
      //GoogleSignin.signOut()
      //  .then(function (res) {
      //    $timeout(function () {
      //      console.info('logged out');
      //      clearAll();
      //    });
      //  }, function (err) {
      //    console.log('reason ', err);
      //    toastr.error(ERROR_MSG);
      //  });
      Auth.logout()
        .then(function(res) {
          console.info(res.data);
          clearAll();
        }, function(err) {
          console.log('reason ', err);
          $rootScope.startLoading = false;
          toastr.error(ERROR_MSG);
        })
    }
    function getVoices() {
      NLP.getVoice()
        .then(function (res) {
          $timeout(function() {
            vm.voices = res.data.Voices;
            vm.selectedVoice = {Gender: "Female", Id: "Joanna", LanguageCode: "en-US", LanguageName: "US English", Name: "Joanna"};
            console.info('voices ', vm.voices);
          })
        }, function (err) {
          console.log('reason ', err);
          toastr.error(ERROR_MSG);
          $rootScope.startLoading = false;
        })
    }
    function clearAll() {
      $timeout(function() {
        vm.voices = null;
        vm.selectedVoice = {};
        vm.user = null;
        $localStorage.$reset();
        $sessionStorage.$reset();

        /* hide the GUI voice button */
        SpeechKITT.hide();

        $location.path('/');

        $rootScope.startLoading = false;
      })
    }
    function getUserDetail() {
      return $localStorage.session ? $localStorage.session : $sessionStorage.session;
    }
    function getUserProfile() {
      vm.user = $localStorage.session ? $localStorage.session : $sessionStorage.session;
      getVoices();
    }
  }

})();
