const router = require('express').Router();
const {User, Nutrition, Friend, Exercise}= require('../models');

router.get('/', async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({
      order: [['exercise_date', 'DESC']], 
      limit: 5, 
  }); 
     const exercise = exerciseData.map((exercise) => exercise.get({ plain: true }));
     res.render('homepage', { 
       exercise, 
       logged_in: req.session.logged_in 
     });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/user');
    return;
  }
  try{
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error'})
  }
});

router.get('/nutrition', async (req, res) => {
  try {
    const nutritionData = await Nutrition.findAll({
      order: [['nutrition_date', 'DESC']], 
      limit: 5, 
  }); 
     const nutrition = nutritioneData.map((nutrition) => nutrition.get({ plain: true }));
     res.render('nutrition', { 
       nutrition, 
       logged_in: req.session.logged_in 
     });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const exerciseData = await Friend.findAll({
      order: [['exercise_date', 'DESC']], 
      limit: 5, 
  }); 
     const exercise = exerciseData.map((exercise) => exercise.get({ plain: true }));
     res.render('homepage', { 
       exercise, 
       logged_in: req.session.logged_in 
     });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
