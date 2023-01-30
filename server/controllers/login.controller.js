const User = require('../models/user');

/**
 * Login
 * @param req
 * @param res
 * @returns void
 */
login = async (req, res) => {
  if (!req.body.user.name || !req.body.user.password) {
    res.status(403).end();
  }

  const { name, password } = req.body.user;

  const user = await User.findOne({ name });

  if(!user) {
    return res.status(404).end();
  }

  return res.json({ token: "JWT_TOKEN" });
};

module.exports = {
  login
};
