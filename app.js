const express               = require('express');
const path                  = require('path');
const Firebase              = require('firebase');
const logger                = require('morgan');
const cookieParser          = require('cookie-parser');
const bodyParser            = require('body-parser');
const session               = require('express-session');
const expressValidator      = require('express-validator');
const flash                 = require('connect-flash');

// App & Body-Parser setup.
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing.
var users = ('./routes/users');
var routes = ('./routes/index');
var games = ('./routes/games');
var genres = ('./routes/genres');

 