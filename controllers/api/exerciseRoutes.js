const router = require('express').Router();
const { User, Exercise } = require('../../models/');
const withAuth = require('../../utils/auth');
const dayjs = require('dayjs');

router.get('/', withAuth, async (req, res) => {
    try {
        const exerciseData = await User.findByPk({
            attributes: { exclude: ['password'] },
            include: [{ model: Exercise,
            where: {
              exercise_date : dayjs().format('MM/DD/YYYY')  
            } }],

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

router.post('/create-post', withAuth, async (req, res) => {
    try {
      const newExerciseData = await Exercise.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.render('newexercise', {
        ...newExerciseData,
        logged_in: req.session.logged_in
    })
    } catch (err) {
      res.status(400).json(err);
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
  