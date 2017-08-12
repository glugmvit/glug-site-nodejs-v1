var express = require('express');
var router = express.Router();

// Get Teampage
router.get('/', function(req, res){
    if(req.session.user)
		res.render('team', {user: req.session.user});
	else
		res.render('team');
});

module.exports = router;