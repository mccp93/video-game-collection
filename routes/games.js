const express = require('express');
const router = express.Router();
const Firebase = require('firebase');
const multer = require('multer');
const upload = multer({ dest: 'public/images/uploads/' });

// GET - Home Page
router.get('/', function (req, res, next) {
	// Gets a reference to the database and table.
	var gameReference = Firebase.database().ref('games');

	// Iterates through a snapshot of the chosen database table then grabs the key/val for the view.
	gameReference.once('value').then(function (snapshot) {
		var games = [];
		var jsonData = snapshot.val();

		for (var key in jsonData) {
			if (jsonData.hasOwnProperty(key)) {
				games.push(
					{ 
						id: key, 
						game_name: jsonData[key].game_name,
						game_developer: jsonData[key].game_developer,
						game_publisher: jsonData[key].game_publisher,
						genre: jsonData[key].genre,
						rating: jsonData[key].rating,
						review: jsonData[key].review,
						year_released: jsonData[key].year_released,
						cover: jsonData[key].cover
					}
				);
			}
		}

		res.render('games/index', { games: games });
	});
});

// GET - Add Game
router.get('/add', function (req, res, next) {

	// Gets a reference to the database and table.
	var genreReference = Firebase.database().ref('genres');

	// Iterates through a snapshot of the chosen database table then grabs the key/val for the view.
	genreReference.once('value').then(function(snapshot) {
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
router.post('/add', upload.single('cover'), function (req, res, next) {
	var cover = 'noimage.jpg'
	
	if(req.file){
		cover = req.file.filename;
	}

	var gameObj = {
		game_name : req.body.game_name,
		game_developer : req.body.game_developer,
		game_publisher : req.body.game_publisher,
		year_released : req.body.year_released,
		genre : req.body.genre,
		review : req.body.review,
		rating : req.body.rating,
		cover : cover
	}

	var gameReference = Firebase.database().ref('games');
	
	gameReference.push().set(gameObj);

	req.flash("success_msg", "Game entry has been saved.");
	res.redirect('/games');
});


module.exports = router;
