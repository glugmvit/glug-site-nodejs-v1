var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	fname: {
		type: String
	},
	lname: {
		type: String
	},
	usn: {
		type: String
	},
	number: {
		type: Number
	},
	type: {
		type: String
	},
	bio: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	console.log('New User created.');
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.checkExistingUser = function(val1, val2, val3, callback) {
	var query1 = {username: val1};
	var query2 = {usn: val2};
	var query3 = {email: val3};

	User.findOne({$or: [query1,query2,query3]},callback);

}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}