var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductModelSchema = new Schema({
    title:String,
	description:String,
	purchasePrice:Number,
    salePrice:Number,
	status:String,
	image:String,
	category:String
});

var x = 5;
var addX = function(value) {
  return value + x;
};


module.exports.x = x;
module.exports.addX = addX;

module.exports = mongoose.model('Product', ProductModelSchema );

