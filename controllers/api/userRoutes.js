const router = require('express').Router();
const { User } = require('../../models/');
const cloudinary = require('cloudinary').v2;
const withAuth = require('../../utils/auth');

router.post('/signup', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  router.post('/upload', withAuth, async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' });
        }

        const uploadedFile = req.files.profile_photo;
        const result = await cloudinary.uploader.upload(uploadedFile.tempFilePath);

        const userId = req.session.user_id;
        const user = await User.findByPk(userId);

        if (user) {
            user.profile_photo = result.secure_url;
            await user.save();
        } else {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ profile_photo: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Image upload failed' });
    }
});
  
module.exports = router;