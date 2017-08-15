var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
	if(req.session.user)
		res.render('home', {user: req.session.user,home:"Ithome"});
	else
		res.render('home',{home:"Ithome"});
});


module.exports = router;