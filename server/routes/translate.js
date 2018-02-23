var express = require('express');
var router = express.Router();

// Load the aws SDK
var AWS = require('aws-sdk');
var config = require('../config/credential.json');

// Application env variable
var env = process.env.NODE_ENV || 'dev';
console.info('_________________ ', env);

// Create an Polly client
var Polly = new AWS.Polly({
  accessKeyId: env === 'dev' ? config[env].access_key_id : process.env.access_key_id,
  secretAccessKey: env === 'dev' ? config[env].secret_access_key : process.env.secret_access_key,
  region: env === 'dev' ? config[env].region : process.env.region,
  signatureVersion: 'v4'
});

// Configure
var params;

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.info('body ', req.body);
  if(!req.body.voice || !req.body.SSML) {
    return res.status(400).send('missing required parameter');
  }
  params = {
    SampleRate: '16000',
    OutputFormat: 'mp3',
    TextType: 'ssml',
    VoiceId: req.body.voice, // 'Joanna'
    Text: JSON.parse(req.body.SSML) // 'need to parse because of tags'
  };
  Polly.synthesizeSpeech(params, function(err, data) {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    } else {
      console.info(data);
      console.info('_________________ ');
      res.status(200).json(data);
    }
  });
});

module.exports = router;
