var express = require('express');
var router = express.Router();
var Event = require('../models/events');
var Project = require('../models/projects');

// Get event add
router.get('/', function(req, res){
    if(req.session.user){
    	Event.find({},function(err,doc) {
    		res.render('addevent', {user: req.session.user,count:doc.length});
    	});
    }
	else
		res.render('login');
});
router.post('/', function(req, res){
	console.log(req.body);
	var url = "http://res.cloudinary.com/dttf46owb/"+req.body.image;
	console.log(url);
	var newEvent = new Event({
        eid: req.body.eid,
        name: req.body.event_name,
        posterurl: url,
        date: req.body.event_date,
        description:req.body.event_desc,
        speaker: req.body.event_speakers,
        venue: req.body.event_venue,
        extra: req.body.event_extras,
    });
    newEvent.save();
    // var newEvent = new Event({
    //     eid: "glugmvit3",
    //     name: "GIT workshop",
    //     posterurl: "",
    //     date: "26-08-2017",
    //     description: " A Hands on workshop on git.",
    //     speaker: "Pramod",
    //     venue: "CSE Seminar Hall",
    //     extra: "Bring a laptop with git installed.",
    // });
    // newEvent.save();
    // var newProject = new Project({
    //     project_name: "Android Application",
    //     project_description: "The official app for GLUG MVIT.",
    //     members: "Susmit Agrawal, Abhijeet Singh, Vibhor Sharma, Shreejeeth, Shubham Kumar, Mukund",
    //     github: "https://github.com/GlugMVIT/GLUG_MVIT_APP",
    // });
    // newProject.save();

	res.redirect('/addevent');
});


module.exports = router;