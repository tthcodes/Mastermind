const authController = {
  verifySession: async (req, res) => {
    if (req.session.userId) {
      return res.status(200).json({ isAuthenticated: true })
    } else {
      return res.status(401).json({ isAuthenticated: false })
    }
  }
}

export default authController;