var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookingSchema   = new Schema({
	txn_id: Number,
	from: String,
	to: String,
	vehicle_type:String,
	date:Date,
	material:String,
	
	transporters: 
	[ { id:String,
        available_vehicles: Number,
        price: Number,
        vehicle_details: [Array],
        tp_response: String } ],

   price: 
    { price_details: String,
        value: String,
        user_response: String },

   unloading: { 
   	contact_number: String, 
   	address: String },

   loading: 
    { contact_number: Number,
      address: String },
   no_of_vehicle: String },


});

module.exports = mongoose.model('Booking', BookingSchema);