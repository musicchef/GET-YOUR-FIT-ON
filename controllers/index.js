//what we are requiring in
const router = require('express').Router();

const api = require('./api');
const home = require('./homeRoutes')

//routes
router.use('/api', api);
router.use('/', home);

module.exports = router;