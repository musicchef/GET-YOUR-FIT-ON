const router = require('express').Router();

const api = require('./api');
const home = require('./homeRoutes')
const profile = require('./profileRoutes')

router.use('/', home);
router.use('/api', api);
router.use('/profile', profile);

module.exports = router;