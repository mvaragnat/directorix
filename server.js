// modules =================================================
var express        = require('express');     //framework d'appli
var app            = express();
var bodyParser     = require('body-parser'); //BodyParser pour POST
var http           = require('http').Server(app);      //préparer le serveur web
var dotenv         = require('dotenv')
//var passport       = require('passport')
var expressSession = require('express-session')
//var flash          = require('connect-flash')

// configuration ===========================================

//load environment variables,
//either from .env files (development),
//heroku environment in production, etc...
dotenv.load()

// Dossier public pour images, css,...
app.use(express.static(__dirname + '/public'))

// config files
// database (always before models !)
require('./config/db')

//  models
var User = require('./app/models/users');

//parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing url encoded

// view engine ejs
app.set('view engine', 'ejs')

// Configuring Sessions, Flash, and Passport
// var configPassport = require('./config/passport')
app.use(expressSession({
  secret: 'thisisakeyforthedirectorixsession',
  resave: true,
  saveUninitialized: true }
))
// app.use(flash())
// app.use(passport.initialize())
// app.use(passport.session())
// configPassport(passport)

// routes SHOULD BE AFTER PASSPORT
require('./app/routes/routes')(app)

//port pour Heroku
app.set('port', (process.env.PORT || 5000))

//botkit (apres port)
//require('./app/controllers/botkit')()

//START ===================================================
http.listen(app.get('port'), function(){
  console.log('listening on port ' + app.get('port'))
})
