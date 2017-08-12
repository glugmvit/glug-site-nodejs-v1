var express = require('express');
var router = express.Router();

// Get about
router.get('/', function(req, res){
    if(req.session.user)
		res.render('about', {user: req.session.user});
	else
		res.render('about');
});

module.exports = router;