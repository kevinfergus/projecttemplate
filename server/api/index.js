const router = require('express').Router();
router.use('/users', require('./filename'));
router.use('/puppies', require('./filename'));
router.use('/kittens', require('./filename'));

module.exports = router;
