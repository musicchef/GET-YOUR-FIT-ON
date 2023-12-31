//making sure the user is logged in
const withAuth = (req, res, next) => {
  console.log("withAuth")
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;