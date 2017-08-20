var express = require('express');
var router = express.Router();
var User = require('../models/users');

// Get Teampage
router.get('/', function(req, res){
	User.find({type:"member"},function(err,doc) {
		res.render('team',{users:doc});
	});	
});

module.exports = router;