var express = require('express');
var router = express.Router();

// Home Page
router.get('/', function(req, res, next) {
  	res.render('genres/index');
});

module.exports = router;
