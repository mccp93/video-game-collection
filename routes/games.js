const express = require('express');
const router = express.Router();
const Firebase = require('firebase');

// GET - Home Page
router.get('/', function (req, res, next) {
	res.render('games/index');
});

// GET - Add Game
router.get('/add', function (req, res, next) {

	// Gets a reference to the database and table.
	var gameReference = Firebase.database().ref('genres');

	// Iterates through a snapshot of the chosen database table then grabs the key/val for the view.
	gameReference.once('value').then(function(snapshot) {
		var genres = [];
		var jsonData = snapshot.val();

		for(var key in jsonData){
			if(jsonData.hasOwnProperty(key)){
				genres.push({id: key, name: jsonData[key].name});
			}
		}

		res.render('games/add', { genres: genres });
	});
});

// POST - Add Game
router.post('/add', function (req, res, next) {
	var genre = {
		name: req.body.name
	}

	var gameReference = Firebase.database().ref('games');
	gameReference.push().set(genre);

	req.flash('success_msg', 'Game has been saved.')
	res.redirect('/games');
});


module.exports = router;
