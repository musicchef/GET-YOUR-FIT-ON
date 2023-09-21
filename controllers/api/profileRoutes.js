const { User, Exercise, Nutrition } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch user data excluding the password
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    // Fetch exercise data related to the user
    const exercisesData = await Exercise.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [['createdAt', 'DESC']],
    });

    // TODO: Add code to fetch nutrition data related to the user

    const user = userData.get({ plain: true });
    const exercises = exercisesData.map((exercise) => exercise.get({ plain: true }));
    // TODO: Map nutrition data

    res.render('profile', {
      user,
      exercises,
      // TODO: Pass nutrition data 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
