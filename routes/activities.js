var express = require('express');
var router = express.Router();

// Get activities
router.get('/', function(req, res){
    if(req.session.user)
		res.render('activities', {user: req.session.user});
	else
		res.render('activities');
});

module.exports = router;