// Basic code for getting a page -- Use this as basis for other routes

var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
    res.render('home');
});

// Use this code to get the page only for users who are logged in

// router.get('/',ensureAuthenticated, function(req, res){
//     res.render('home');
// });


// middleware to check if user is authenticated
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;