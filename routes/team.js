var express = require('express');
var router = express.Router();

// Get Teampage
router.get('/', function(req, res){
    res.render('team');
});

module.exports = router;