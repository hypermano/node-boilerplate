var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipSchema = new Schema({
	category: String,
	details: String
});

tipSchema.statics.findByCategory = function(cat, callback) {
	this.find({ category : cat}, callback);
};

tipSchema.statics.add = function(tip, callback) {
	var newTip = mongoose.model('tips')(tip);
	newTip.save(newTip, callback);
};

tipSchema.statics.all = function(callback) {
	this.find({}, callback);
};

module.exports = mongoose.model('tips', tipSchema);