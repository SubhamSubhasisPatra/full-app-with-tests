exports.login = async (req, res) => {
  const userToLogIn = await User.findOne({ email: req.body.email });

  if (!userToLogIn) {
    return res.status(401).json({ message: authFailedMsg });
  }
}