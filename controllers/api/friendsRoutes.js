const router = require('express').Router();
const { User, Friends, Exercise } = require('../../models/')

router.get('/', async (req, res) => {
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


module.exports = router;