var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tip = new Schema({
	message: String
})

module.exports = mongoose.model('Tip', Tip);