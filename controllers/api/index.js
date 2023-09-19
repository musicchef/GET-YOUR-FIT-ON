const router = require('express').Router();
const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes');
const foodRoutes = require('./foodRoutes');

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/food', foodRoutes);

module.exports = router;