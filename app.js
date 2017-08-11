var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var handlebars = require('handlebars');

mongoose.connect('mongodb://127.0.0.1:27017/glugmvit');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('LOGGED | MongoDB Connected - ' + new Date());
});

// Add a variable for a new page here
var home = require('./routes/home');
var about = require('./routes/about');
var contact = require('./routes/contact-us');
var journey = require('./routes/journey');
var team = require('./routes/team');
var login = require('./routes/login');
var signup = require('./routes/signup');
var upcoming = require('./routes/upcoming');
var activities = require('./routes/activities');


// Init App
var app = express();

// Set Port
var port  = process.env.PORT || 3000;

// Server
var server = require('http').Server(app).listen(port);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cookieParser());

// Set Static Folder
app.use(express.static(__dirname + '/public'));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


// Use the variable for the new page here
app.use('/', home);
app.use('/about', about);
app.use('/contact', contact);
app.use('/journey', journey);
app.use('/team', team);
app.use('/login', login);
app.use('/signup', signup);
app.use('/upcoming', upcoming);
app.use('/activities', activities);

app.get('*', function(req, res){
  res.render('404',{layout:false});
});
