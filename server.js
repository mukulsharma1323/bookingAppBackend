// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

var cors = require('cors');
app.use(cors());
app.options('*', cors());

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3001; // set our port

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/booking'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// Bear models lives here
var Booking     = require('./app/models/booking');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/booking')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		console.log("i got a request");
		var booking = new Booking();		// create a new instance of the Booking model
		booking.txn_id = req.body.txn_id;		// set the name (comes from the request)
		booking.from = req.body.from;
		booking.to = req.body.to;
		booking.vehicle_type = req.body.vehicle_type;
		booking.date = req.body.date;
		booking.material = req.body.material;

		booking.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'booking created!' });
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Booking.find(function(err, bookings) {
			if (err)
				res.send(err);

			res.json(bookings);
		});
	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
