var express = require('express');
var router = express.Router();

var User = require('../models/users');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Register User
router.post('/register', function(req, res){
    
    // If the passwords don't match, then redirect to register page again.
    if(req.body.password != req.body.password2){
        req.flash('error_msg', "Passwords don't match");
        res.redirect('/users/register');
    }

    var newUser = new User({
        usn: req.body.usn,
        number: req.body.number,
        fname: req.body.fname,
        lname: req.body.lname,
        email:req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // check if the username, usn or email is used before or NOT
    User.checkExistingUser(req.body.username, req.body.usn, req.body.email,(err,data) => {
        if(data == null){

            // if NOT used before, then add new user.
            User.createUser(newUser, function(err, user){
                if(err) throw err;
                req.flash('success_msg', 'You are registered and can now login');
                res.redirect('/users/login');
            });
        }
        else{

            // if used before flash a message to the user that it is already used.
            req.flash('error_msg', 'username or usn or email already in use');
            res.redirect('/users/register');
    
        }
    });
        
});

router.post('/login',function(req, res) {
    
    User.getUserByUsername(req.body.username, function(err, user){
        if(err) throw err;

        if(!user){

            // if user is not found, then flash not found message.
            req.flash('error_msg', 'unknown user');
            res.redirect('/users/login');
        }
 
        User.comparePassword(req.body.password, user.password, function(err, isMatch){
            if(err) throw err;
            
            if(isMatch){

                // if user found and password is corrent, create a session for the user,
                // and flash user logged in message.
                req.session.user = user;
                req.flash('success_msg', 'You are successfully logged in');
                res.redirect('/dashboard')
            } else {

                // if password doesn't match, flash message for invalid password.
                req.flash('error_msg', 'Invalid Password');
                res.redirect('/users/login');
            }
        });
    });
    
  });

router.get('/logout', function(req, res){

    // remove the user session, and redirect to login page.
	req.session.user = null;
	res.redirect('/users/login');
});

module.exports = router;