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
     const nutrition = nutritionData.map((nutrition) => nutrition.get({ plain: true }));
     res.render('nutrition', { 
       nutrition, 
       logged_in: req.session.logged_in 
     });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/', async (req, res) => {
  try {
    const friendData = await Friend.findAll({
      order: [['first_name', 'DESC']], 
      limit: 5, 
  }); 
     const friend = friendData.map((friend) => friend.get({ plain: true }));
     res.render('friends', { 
       friend, 
       logged_in: req.session.logged_in 
     });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
