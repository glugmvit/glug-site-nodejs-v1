var express = require('express');
var router = express.Router();

var User = require('../models/users');

router.get('/', function(req, res){

    // remove the user session, and redirect to login page.
	req.session.user = null;
	res.redirect('/login');
});

module.exports = router;