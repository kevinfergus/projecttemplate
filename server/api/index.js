const router = require('express').Router();
const file1 = require('./file1');
router.use(function(req, res, next) {
	const err = new Error('Not found.');
	err.status = 404;
	next(err);
});

module.exports = router;
