const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, './public/style.css')));
const port = process.env.PORT || 3000; ///useful for heroku
app.listen(port, function() {
	console.log('Knock, knock');
	console.log("Who's there?");
	console.log(`Your server, listening on port ${port}`);
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

// app.get('*', function(req, res) {
// 	res.sendFile(path.join(__dirname, './public/index.html'));
// });

app.use(function(err, req, res, next) {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});
