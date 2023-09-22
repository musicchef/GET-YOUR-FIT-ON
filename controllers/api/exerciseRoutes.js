const router = require('express').Router();
const { User, Exercise } = require('../../models/')

router.get('/', async (req, res) => {
    try {
        const exerciseData = await User.findByPk({
            attributes: { exclude: ['password'] },
            include: [{ model: Exercise }],
        });
        const exercise = exerciseData.get({ plain: true });
        res.render('exercise', {
            ...exercise,
            logged_in: req.session.logged_in
        })
        } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const exerciseData = await Exercise.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!exerciseData) {
        res.status(404).json({ message: 'No exercise found!' });
        return;
      }
  
      res.status(200).json(exerciseData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/:id', withAuth, async (req, res) => {
    try {
      const exerciseUpdate = await Exercise.update(req.body,{
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
  
      });
  
      if (!exerciseUpdate) {
        res.status(404).json({ message: 'No exercise found with this id!' });
        return;
      }
  
      res.status(200).json(exerciseUpdate);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  