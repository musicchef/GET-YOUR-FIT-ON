const router = require('express').Router();
const userRoutes = require('./userRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const nutritionRoutes = require('./nutritionRoutes');
const friendsRoutes = require('./friendsRoutes')

router.use('/user', userRoutes);
router.use('/workouts', exerciseRoutes);
router.use('/food', nutritionRoutes);
router.use('/friends', friendsRoutes)


module.exports = router;