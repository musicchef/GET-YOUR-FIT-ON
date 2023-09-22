const router = require('express').Router();
const { User, Nutrition } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const nutritionData = await User.findbyPK({
            attributes: { exclude: ['password'] },
            include: [{ model: Nutrition }],
        });
        const nutrition = nutritionData.get({plain: true});
        res.render('nutrition', {
         ...nutrition, })
        
    } catch (err) {
        res.status(500).json(err);
    }
})

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
module.exports = router;