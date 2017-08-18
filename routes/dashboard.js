var express = require('express');
var router = express.Router();

// Get user dash board
router.get('/', function(req, res){

	// only render used the user is logged in.
	if(req.session.user)
		if(req.session.user.type=="admin")
			res.render('dashboard', {user: req.session.user,admin:true});
		else
			res.render('dashboard', {user: req.session.user});

	// otherwise redirect to the login Page
	else
		res.redirect('/login');
});

module.exports = router;