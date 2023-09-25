const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Nutrition, Friend, Exercise}= require('../models');

//use withAuth middleware to prevent access to route
//route to get profile page
router.get('/', withAuth, async (req, res) => {
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

  module.exports = router;