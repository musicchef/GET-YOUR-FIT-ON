//what we require in
const router = require('express').Router();
const { User, Nutrition, Exercise, Friend } = require('../../models/');
const withAuth = require('../../utils/auth');
const dayjs = require('dayjs');

//get route to get all the nutrition data
router.get('/', withAuth, async (req, res) => {
    try {
        const nutritionData = await Nutrition.findAll({
              where: {
                user_id: req.session.user_id,
                meal_date : dayjs().format('YYYY-MM-DD')  
              } 
        });
        const nutrition = nutritionData.map((nutrition)=> nutrition.get({plain: true}));
        res.render('nutrition', {
         nutrition,
        logged_in: req.session.logged_in })
        
    } catch (err) {
        res.status(500).json(err);
    }
});

//get route to get the meal data
router.get('/getmeal', withAuth, async (req, res) => {
  try {
      const nutritionData = await Nutrition.findAll({
            where: {
              user_id: req.session.user_id,
              meal_date : dayjs().format('YYYY-MM-DD')  
            } 
      });
      const nutrition = nutritionData.map((nutrition)=> nutrition.get({plain: true}));
      res.json(nutrition)
      
  } catch (err) {
      res.status(500).json(err);
  }
});

//post route to create a new food
router.post('/create', withAuth, async (req, res) => {
    try {
      const newfood = await Nutrition.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.render('newmeal', {
        ...newfood,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

//delete route to delete a food based on the id
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

  //this is not currently used but room for further development
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


//post route for the explore

router.post('/explore', withAuth, async (req, res) => {
  try {
    console.log("You got this far...")
    const newfood = await Nutrition.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.render('nutrition', {
      newfood,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
})


module.exports = router;
