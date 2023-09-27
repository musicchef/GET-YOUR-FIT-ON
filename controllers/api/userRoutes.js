const router = require('express').Router();
const { User } = require('../../models/');
const cloudinary = require('../../utils/cloudinary');
const upload = require('../../middleware/multer');
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

  router.post('/upload', withAuth, upload.single('profile_photo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }
  
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      const userId = req.session.user_id;
      const user = await User.findByPk(userId);
  
      if (user) {
        user.profile_photo = result.secure_url;
        await user.save();
        res.status(200).json({ profile_photo: result.secure_url });
      } else {
        return res.status(404).json({ message: 'User not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Image upload failed' });
    }
  });
  
  // I think it might not be working because it requires more code in server.js but this is driving me crazy!!!!!!!
  
module.exports = router;