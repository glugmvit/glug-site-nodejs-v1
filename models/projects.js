var mongoose = require('mongoose');

// Event schema
var ProjectSchema = mongoose.Schema({
	project_name:{
		type:String,
		unique: true,
	},
	project_description:{
		type:String,
	},
	members:{
		type:String,
	},
	github:{
		type:String,
	}
});
var Project = module.exports = mongoose.model('Project', ProjectSchema);