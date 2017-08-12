var express = require('express');
var router = express.Router();

var User = require('../models/users');

// Register
router.get('/', function(req, res){
	res.render('register');
});

// Register User
router.post('/', function(req, res){
    
    // If the passwords don't match, then redirect to register page again.
    if(req.body.password != req.body.password2){
        req.flash('error_msg', "Passwords don't match");
        res.redirect('/register');
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
                res.redirect('/login');
            });
        }
        else{

            // if used before flash a message to the user that it is already used.
            req.flash('error_msg', 'username or usn or email already in use');
            res.redirect('/register');
    
        }
    });
        
});

module.exports = router;