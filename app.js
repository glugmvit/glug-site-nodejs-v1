var express = require('express');
var path = require('path');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var mongoose = require('mongoose');

mongoose.connect('mongodb://client:client@ds139267.mlab.com:39267/glug');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('LOGGED | MongoDB Connected - ' + new Date());
});

// Add a variable for a new page here
var home = require('./routes/home');
var contact = require('./routes/contact-us');
var journey = require('./routes/journey');
var team = require('./routes/team');
var login = require('./routes/login');
var register = require('./routes/register');
var logout = require('./routes/logout');
var dashboard = require('./routes/dashboard');
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

// Set Static Folder
app.use(express.static(__dirname + '/public'));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//connect FLash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Use the variable for the new page here
app.use('/', home);
app.use('/contact', contact);
app.use('/journey', journey);
app.use('/team', team);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/dashboard', dashboard);
app.use('/upcoming', upcoming);
app.use('/activities', activities);

app.get('*', function(req, res){
  res.render('404',{layout:false});
});
