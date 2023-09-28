const router = require('express').Router();
const { User, Exercise } = require('../../models/');
const withAuth = require('../../utils/auth');
const dayjs = require('dayjs');

router.get('/', withAuth, async (req, res) => {
    try {
      console.log(req.session);
        const exerciseData = await Exercise.findAll( {
             where: {
              user_id: req.session.user_id,
              exercise_date : dayjs().format('YYYY-MM-DD')  
             }
        });
        const exercises = exerciseData.map((exercises) => exercises.get({ plain: true }));
        console.log(exercises)
        res.render('exercise', {
            exercises,
            logged_in: req.session.logged_in
        })
        } catch (err) {
          console.log('err: ', err)
        res.status(500).json(err);
    }
});

router.post('/create', withAuth, async (req, res) => {
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
  