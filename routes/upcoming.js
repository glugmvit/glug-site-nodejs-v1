var express = require('express');
var router = express.Router();

// Get upcoming
router.get('/', function(req, res){
    if(req.session.user)
		res.render('upcoming', {user: req.session.user});
	else
		res.render('upcoming');
});

module.exports = router;