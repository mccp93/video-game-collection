const express = require('express');
const router = express.Router();
const Firebase = require('firebase');

// GET - Home Page
router.get('/', function(req, res, next) {
  	res.render('genres/index');
});

// GET - Add Genre
router.get('/add', function(req, res, next) {
  	res.render('genres/add');
});

// POST - Add Genre
router.post('/add', function(req, res, next) {
	var genre = {
		name: req.body.name
	}

	var genreReference = Firebase.database().ref('genres');
	genreReference.push().set(genre);

	req.flash('success_msg', 'Genre has been saved.')
	res.redirect('/genres');
});

module.exports = router;
