const router = require('express').Router();
const userRoutes = require('./userRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const nutritionRoutes = require('./nutritionRoutes');

router.use('/users', userRoutes);
router.use('/workouts', exerciseRoutes);
router.use('/food', nutritionRoutes);

module.exports = router;