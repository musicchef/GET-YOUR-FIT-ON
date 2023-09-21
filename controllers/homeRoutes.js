const router = require('express').Router();
const { User , Exercise , Nutrition } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
  
      // Fetch exercise data related to the user
      const exercisesData = await Exercise.findAll({
        where: {
          user_id: req.session.user_id, 
        },
        order: [['createdAt', 'DESC']], 
      });

    //   TODO: add code to fetch nutrition data related to the user
  
      const users = userData.map((user) => user.get({ plain: true }));
      const exercises = exercisesData.map((exercise) => exercise.get({ plain: true }));
    // TODO: add a nutrition const here
  
      res.render('homepage', {
        users,
        exercises,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;