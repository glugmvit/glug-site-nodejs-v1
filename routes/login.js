var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

// Get login
router.get('/',function(req,res){
	res.render('login');
});
router.post('/', function(req, res){
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/',failureFlash: true,successFlash: true}),
  function(req, res) {
    res.redirect('/');
	}
});

module.exports = router;