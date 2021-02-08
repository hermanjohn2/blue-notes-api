const express = require('express'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	MongoStore = require('connect-mongo')(session),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	passport = require('./config/passport'),
	dbConfig = require('./config/dbConfig'),
	routes = require('./routes'),
	app = express(),
	PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

// DB connection
mongoose.connect(dbConfig.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
	.then(() => console.log('Connected to DB...'))
	.catch(err => {
		console.log('Unable to connect to DB. Exiting...', err);
		process.exit();
	});

// Express session
app.use(
	session({
		secret: process.env.SessionSecret || 'working mans truth',
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(routes);

// Start the API server
app.listen(PORT, function () {
	console.log(`🌎  ==> API Server listening on PORT: ${PORT}`);
});
