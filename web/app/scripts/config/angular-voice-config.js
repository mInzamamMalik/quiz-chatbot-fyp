(function(){
    'use strict';

    angular
      .module('radUlFasaadApp')
      .config(AngularVoiceText);

    AngularVoiceText.$inject = ['ttsProvider'];

    function AngularVoiceText(ttsProvider) {
      ttsProvider.setSettings({ key: '9aa11e20b79c4a3f83c9cbbdec86b649' });
    }
  }
)();