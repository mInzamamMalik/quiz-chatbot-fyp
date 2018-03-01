var express = require('express');
var router = express.Router();

// Load the aws SDK
var AWS = require('aws-sdk');

// Create an Polly client
var Polly = new AWS.Polly({
  accessKeyId: process.env.access_key_id,
  secretAccessKey: process.env.secret_access_key,
  region: process.env.region,
  signatureVersion: 'v4'
});

// Configure
var params; // for aws polly

/* Routes */
router.get('/', function(req, res, next) {
  params = {
  };
  Polly.describeVoices(params, function(err, data) {
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
