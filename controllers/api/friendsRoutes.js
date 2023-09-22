const router = require('express').Router();
const { User, Friend, Exercise, Nutrition } = require('../../models/')
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const friendsData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ all: true, nested: true }],
        });
        const friends = friendsData.get({ plain: true });

        res.render('friend', {
            ...friends,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
      const newFriend = await Friend.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newFriend);
    } catch (err) {
      res.status(400).json(err);
    }
  }); 

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const friendData = await Friend.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!friendData) {
        res.status(404).json({ message: 'No friend found!' });
        return;
      }
  
      res.status(200).json(friendData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;