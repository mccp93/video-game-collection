const express               = require('express');
const path                  = require('path');
const configurationFile     = require('./config.json');
const logger                = require('morgan');
const cookieParser          = require('cookie-parser');
const bodyParser            = require('body-parser');
const session               = require('express-session');
const expressValidator      = require('express-validator');
const flash                 = require('connect-flash');

// Setting up Firebase.
const Firebase              = require('firebase');

var config = {
  apiKey: configurationFile.apiKey,
  authDomain: configurationFile.authDomain,
  databaseURL: configurationFile.database_url,
  storageBucket: configurationFile.storageBucket,
  messagingSenderId: configurationFile.messagingSenderId
};
  
Firebase.initializeApp(config);

var users = require('./routes/users');
var routes = require('./routes/index');
var games = require('./routes/games');
var genres = require('./routes/genres');


// App & Body-Parser setup.
var app = express();

// Templating engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// logger
app.use(logger('dev'));

// Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Directory setup.
app.use(express.static(path.join(__dirname, 'public')));


// Express-validation setup.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Express-session setup..
app.use(session({
    secret: 'secret',
    saveUnitialized: true,
    resave: true
}));

// Connect-Flash setup.
app.use(flash());
app.use(function(req, res, next){
    res.locals.success_message = req.flash("success_message");
    res.locals.failure_message = req.flash("failure_message");
    res.locals.error_message   = req.flash("error_message");
    next();
});

// Routing.

app.use('/', routes);
app.use('/users', users);
app.use('/games', games);
app.use('/genres', genres);

// Set port and run server.
app.set('port', 3000);
app.listen(app.get('port'), function(){
    console.log("Server up and running on port: " + app.get('port'));
});
 
