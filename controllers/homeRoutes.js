const router = require('express').Router();
const dayjs = require('dayjs');
const { User, Exercise}= require('../models');
const withAuth = require ('../utils/auth');


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


router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
      include: [{ all:true, nested:true }],
      where:
      {exercise_date : dayjs().format('YYYY-MM-DD')},
      where: {
      meal_date: dayjs().format('YYYY-MM-DD')}
      
  });
   
  const user = userData.get({plain: true});
   res.render('user', {
    ...user,
    logged_in: true
   });
  } catch(err) {
    res.status(500).json(err);
  }
})

router.get ('/createworkout', (req, res)=> {
     res.render('newexercise', {
      logged_in: req.session.logged_in 
     });
   
})

router.get ('/createfood', (req, res) => {
  res.render('newmeal', {
    logged_in: req.session.logged_in 
   });
})
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});



router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/explore', (req, res) => {
  res.render('nutritionFetch', {
    logged_in: req.session.logged_in 
  });
})

router.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = router;