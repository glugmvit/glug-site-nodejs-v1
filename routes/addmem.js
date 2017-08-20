var express = require('express');
var router = express.Router();
var User = require('../models/users');
// Get journey
router.get('/', function(req, res){
    if(req.session.user){
    	User.find({},function(err,doc){
			res.render('addmem',{user: req.session.user,all:doc});
		});
    }
	else{
		res.render('404');
	}
});

router.post('/',function (req,res) {
	var x = req.body.usnadd;
	console.log(x);
	var acount = req.body.adcount;
	if(acount==1){
		User.findOneAndUpdate({usn:x},{$set:{type:"member"}},{ upsert: true, new: true },function(err,doc){
    		console.log("Updated!");
    	});
	}
	else if(acount>1){
		for (var i = 0; i < x.length; i++) {
			User.findOneAndUpdate({usn:x[i]},{$set:{type:"member"}},{ upsert: true, new: true },function(err,doc){
	    		console.log("Updated!");
	    	});
		}
	}	
	var y = req.body.usnrem;
	var rcount = req.body.rmcount;
	console.log(y);
	if(rcount==1){
		User.findOneAndUpdate({usn:y},{$set:{type:"student"}},{ upsert: true, new: true },function(err,doc){
    		console.log("Updated!");
    	});
	}
	else if(rcount>1){
		for (var i = 0; i < y.length; i++) {
			User.findOneAndUpdate({usn:y[i]},{$set:{type:"student"}},{ upsert: true, new: true },function(err,doc){
	    		console.log("Updated!");
	    	});
		}
	}
    res.redirect('/addmem');
})

module.exports = router;