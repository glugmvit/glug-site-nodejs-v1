var express = require('express');
var router = express.Router();

// Get Teampage
router.get('/', function(req, res){
    res.render('activities');
});

module.exports = router;