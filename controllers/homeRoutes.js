//what we require in
const router = require('express').Router();
const dayjs = require('dayjs');
const { User, Exercise, Nutrition}= require('../models');
const withAuth = require ('../utils/auth');

//get route for the homepage
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

//get route for the profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
        const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},

      include: [
        {
          model: Exercise,
          where: {exercise_date: dayjs().format('YYYY-MM-DD') }
        },
        {model:Nutrition,
         where: {meal_date: dayjs().format('YYYY-MM-DD')}
      }
      ]
  });
   //had to add this to get the page to render
  const user = userData!=null?userData.get({plain: true}):[]
  console.log(user);
   res.render('user', {
    ...user,
    logged_in: true
   });
  } catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
})

//duplicate route
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

//get route to direct to the log in page
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

//get route to render the sign up page
router.get('/signup', (req, res) => {
  res.render('signup');
});

//get route for the friends data
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

//get route to render the new exercise page
router.get ('/createworkout', (req, res)=> {
     res.render('newexercise', {
      logged_in: req.session.logged_in 
     });
   
})

//get route to render the create food page
router.get ('/createfood', (req, res) => {
  res.render('newmeal', {
    logged_in: req.session.logged_in 
   });
})

//get route to redirect to the profile page from the log in page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

//get route to render the friends page
router.get("/friends", (req, res) => {
  res.render('friend', {
    logged_in: req.session.logged_in
  }
  );
})


//get route to render the sign up
router.get('/signup', (req, res) => {
  res.render('signup');
});

//get route to render the nutrition fetch page
router.get('/explore', (req, res) => {
  res.render('nutritionFetch', {
    logged_in: req.session.logged_in 
  });
})

//catch all the brings us back to the homepage
router.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = router;