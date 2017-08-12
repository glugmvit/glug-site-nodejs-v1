var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
    res.render('journey');
});

module.exports = router;