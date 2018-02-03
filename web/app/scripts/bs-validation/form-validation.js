(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .config(FormValidationConfigProvider);

    FormValidationConfigProvider.$inject = ['bsValidationConfigProvider'];

    function FormValidationConfigProvider(bsValidationConfigProvider) {
      bsValidationConfigProvider.global.setValidateFieldsOn('submit');
    }
  }
)();