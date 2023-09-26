const router = require('express').Router();

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
      include: [{ all:true, nested:true }]
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

router.post('/createworkout', withAuth, async (req, res) => {
  try {
    const newExerciseData = await Exercise.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.render('exercise', {
      ...newExerciseData,
      logged_in: req.session.logged_in
  })
  } catch (err) {
    res.status(400).json(err);
  }
}); 

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

router.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = router;