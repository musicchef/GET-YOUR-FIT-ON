const router = require('express').Router();
const { User, Friend } = require('../../models/')
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Retrieve pending friend requests and current friends for the logged-in user
    const user = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Friend,
          as: 'friend_requests',
          where: { status: 'pending' }, 
          include: [{ model: User, as: 'user' }], // Include the user who sent the request
        },
        {
          model: Friend,
          as: 'friends',
          where: { status: 'accepted' },
          include: [{ model: User, as: 'user' }], // Include the current friends
        },
      ],
    });

    // Extract pending friend requests and current friends from the user object
    const pendingRequests = user.friend_requests.map((request) => request.user.get({ plain: true }));
    const friends = user.friends.map((friend) => friend.user.get({ plain: true }));

    // Render the friends.handlebars template with the data
    res.render('friends', { pendingRequests, friends, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Create a friend request
router.post('/request', async (req, res) => {
  try {
    // Retrieve the user ID of the logged-in user
    const userId = req.session.user_id;

    const { recipientUserId } = req.body; 

    // Check if the friend request already exists
    const existingRequest = await Friend.findOne({
      where: {
        user_id: userId,
        friend_id: recipientUserId,
        status: 'pending', // Check if a pending request already exists
      },
    });

    if (existingRequest) {
      res.status(400).json({ message: 'Friend request already sent.' });
      return;
    }

    // Create a new friend request record in the database
    const newFriendRequest = await Friend.create({
      user_id: userId,
      friend_id: recipientUserId,
      status: 'pending', 
    });

    res.status(200).json(newFriendRequest);
  } catch (err) {
    res.status(500).json(err);
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