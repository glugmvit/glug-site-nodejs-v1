var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
    res.render('journey');
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;