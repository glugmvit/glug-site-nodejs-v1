var mongoose = require('mongoose');

// Event schema
var EventSchema = mongoose.Schema({
	eid:{
		type:String,
		unique: true,
	},
	name:{
		type:String,
	},
	posterurl:{
		type:String,
	},
	date:{
		type:String,
	},
	description:{
		type:String,
	},
	speaker:{
		type:String,
	},
	venue:{
		type:String,
	},
	extra:{
		type:String,
	}
});
var Event = module.exports = mongoose.model('Event', EventSchema);