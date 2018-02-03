(function(){
  'use strict';

  angular
    .module('radUlFasaadApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$timeout', 'AppLoader'];

  function MainCtrl($timeout, AppLoader) {
    /* jshint validthis: true */
    var vm = this;


    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    vm.register = {};


    vm.openLoginModal = openLoginModal;
    vm.openRegisterModal = openRegisterModal;
    vm.showLoginForm = showLoginForm;
    vm.showRegisterForm = showRegisterForm;
    vm.loginAjax = loginAjax;

    vm.registerUser = registerUser;


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
    function loginAjax(){
      AppLoader.start();
      /*   Remove this comments when moving to server
       $.post( "/login", function( data ) {
       if(data == 1){
       window.location.replace("/home");
       } else {
       shakeModal();
       }
       });
       */

      /*   Simulate error message from the server   */
      $timeout(function() {
        shakeModal();
      }, 2000);
    }
    function shakeModal(){
      $('#loginModal .modal-dialog').addClass('shake');
      $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
      $('input[type="password"]').val('');
      $timeout( function(){
        $('#loginModal .modal-dialog').removeClass('shake');
      }, 1000 );
      AppLoader.stop();
    }
    function registerUser(form) {
      if(form.$valid) {
        console.info('form ', form)
      }
    }
  }

})();
