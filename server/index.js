const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const db = require('./db/db');
const session = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; ///useful for heroku

app.use(
	session({
		secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
		resave: false,
		saveUninitialized: false
	})
);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public/style.css')));

db.sync().then(function() {
	app.listen(port, function() {
		console.log('Knock, knock');
		console.log("Who's there?");
		console.log(`Your server, listening on port ${port}`);
	});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, './index.html'));
});

app.use(function(err, req, res, next) {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});
