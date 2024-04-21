const authController = {
  // Check if a session is active, used in App.jsx
  verifySession: (req, res) => {
    if (req.session.userId) {
      return res.status(200).json({ message: 'Session is active' })
    } else {
      return res.status(401).json({ message: 'Session is inactive' })
    }
  },
  // Route protector to secure sensitive application endpoints
  authenticateUser: (req, res, next) => {
    if (req.session.userId) {
      console.log('User authorized!');
      return next();
    } else {
      res.status(401).json({ message: 'Unauthorized action, please log in.' })
    }
  }
}

export default authController;