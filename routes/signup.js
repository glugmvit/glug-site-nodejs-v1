var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

// Get login
router.get('/', function(req, res){
    res.render('signup');
});

router.post('/', function(req, res){
	var fname = req.body.firstname;
	var lname = req.body.lastname;
	var usn = req.body.usn;
	var email = req.body.email;
	var number = req.body.number;
	var year = req.body.year;
	var name = req.body.username;
	var password = req.body.password
	var newUser = new User({
		fname: fname,
        lname: lname,
        usn: usn,
        email: email,
        number: number,
        year: year,
        username:name,
        password:password
	});

	User.createUser(newUser, function(err, user){
		if(err) throw err;
		console.log(user);
	});
    res.render('signup');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


module.exports = router;