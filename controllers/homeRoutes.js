const router = require('express').Router();
const withAuth = require ('../utils/auth');
const {User, Nutrition, Friend, Exercise}= require('../models');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
