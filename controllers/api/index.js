const router = require('express').Router();
const userRoutes = require('./userRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const foodRoutes = require('./foodRoutes');

router.use('/users', userRoutes);
router.use('/workouts', exerciseRoutes);
router.use('/food', foodRoutes);

module.exports = router;