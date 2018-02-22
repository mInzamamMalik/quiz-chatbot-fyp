var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.info('req body ', req.body);
  console.info('req headers ', req.headers);
  console.info('req query ', req.query);
  console.info('req params ', req.params);
  res.send('respond with a resource');
});

module.exports = router;
