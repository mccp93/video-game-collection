const express = require('express');
const router = express.Router();
const Firebase = require('firebase');

// GET - Home Page
router.get('/', function (req, res, next) {
	// Gets a reference to the database and table.
	var genreReference = Firebase.database().ref('genres');

	// Iterates through a snapshot of the chosen database table then grabs the key/val for the view.
	genreReference.once('value').then(function (snapshot) {
		var genres = [];
		var jsonData = snapshot.val();

		for (var key in jsonData) {
			if (jsonData.hasOwnProperty(key)) {
				if(jsonData[key].uid == Firebase.auth().currentUser.uid){
					genres.push({ id: key, name: jsonData[key].name });
				}
			}
		}

		res.render('genres/index', { genres: genres });
	});
});

// GET - Add Genre
router.get('/add', function (req, res, next) {
	res.render('genres/add');
});

// POST - Add Genre
router.post('/add', function (req, res, next) {
	var genre = {
		name: req.body.name,
		uid: Firebase.auth().currentUser.uid
	}

	var genreReference = Firebase.database().ref('genres');
	genreReference.push().set(genre);

	req.flash('success_msg', 'Genre has been saved.')
	res.redirect('/genres');
});

// DELETE - Delete Genre
router.delete('/delete/:id', function (req, res, next) {
	var id = req.params.id;

	var genreReference = Firebase.database().ref('genres/' + id);
	genreReference.remove();

	req.flash('success_msg', 'Genre has been deleted.')
	res.sendStatus(200);
});


module.exports = router;
