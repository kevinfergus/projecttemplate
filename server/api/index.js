const router = require('express').Router();
router.use('/file1', require('./file1'));

router.use(function(req, res, next) {
	const err = new Error('Not found.');
	err.status = 404;
	next(err);
});

module.exports = router;
