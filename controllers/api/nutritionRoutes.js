const router = require('express').Router();
const { User, Nutrition, Exercise, Friend } = require('../../models/');
const withAuth = require('../../utils/auth');
const dayjs = require('dayjs');

router.get('/', async (req, res) => {
    try {
        const nutritionData = await User.findbyPK({
            attributes: { exclude: ['password'] },
            include: [{ model: Nutrtion,
              where: {
                meal_date : dayjs().format('MM/DD/YYYY')  
              } }],
        });
        const nutrition = nutritionData.get({plain: true});
        res.render('nutrition', {
         ...nutrition, })
        
    } catch (err) {
        res.status(500).json(err);
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


router.post('/', withAuth, async (req, res) => {
    try {
      const newfood = await Nutrition.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newfood);
    } catch (err) {
      res.status(400).json(err);
    }
  });


router.delete('/:id', withAuth, async (req, res) => {
    try {
      const nutritionData = await Nutrition.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!nutritionData) {
        res.status(404).json({ message: 'No food found!' });
        return;
      }
  
      res.status(200).json(nutritionData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/:id', withAuth, async (req, res) => {
    try {
      const nutritionUpdate = await Nutrition.update(req.body,{
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
  
      });
  
      if (!nutritionUpdate) {
        res.status(404).json({ message: 'No food found with this id!' });
        return;
      }
  
      res.status(200).json(nutritionUpdate);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


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
