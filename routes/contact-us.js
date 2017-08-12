var express = require('express');
var router = express.Router();

// Get contact-us
router.get('/', function(req, res){
    if(req.session.user)
		res.render('contact-us', {user: req.session.user});
	else
		res.render('contact-us');
});

module.exports = router;