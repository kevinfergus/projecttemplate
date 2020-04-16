if (process.env.NODE_ENV === 'development') {
	require('../localSecrets'); // this will mutate the process.env object with your secrets.
}
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const db = require('./db/db');
const session = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
const passport = require('passport');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));

db.sync().then(function() {
	app.listen(port, function() {
		console.log('Knock, knock');
		console.log("Who's there?");
		console.log(`Your server, listening on port ${port}`);
	});
});

dbStore.sync();
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	try {
		done(null, user.id);
	} catch (err) {
		done(err);
	}
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => done(null, user)).catch(done);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use(function(err, req, res, next) {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});
