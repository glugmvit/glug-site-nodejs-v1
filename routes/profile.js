var express = require('express');
var router = express.Router();
var User = require('../models/users');

// Get profile
router.get('/', function(req, res){
	if(req.session.user)
		res.render('profile', {user: req.session.user});
	else
		res.render('profile');
});

router.post('/',function(req,res){
	var updatedUser = {
        fname: req.body.fname,
        lname: req.body.lname,
        email:req.body.email,
        bio:req.body.bio
    };
    User.findOneAndUpdate({usn:req.session.user.usn},updatedUser,{ upsert: true, new: true },function(err,doc){
    	console.log(doc);
        if(err)
    		console.log(err);
    	else
    		req.flash('success_msg', 'Updated content!');
            res.redirect('/login');
    });
});

module.exports = router;