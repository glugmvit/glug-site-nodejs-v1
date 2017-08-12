var express = require('express');
var router = express.Router();

// Get journey
router.get('/', function(req, res){
    if(req.session.user)
		res.render('journey', {user: req.session.user});
	else
		res.render('journey');
});

module.exports = router;