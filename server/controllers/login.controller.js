const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/token');

/**
 * Login
 * @param req
 * @param res
 * @returns request
 */
login = async (req, res) => {
  if (!req.body.user.name || !req.body.user.password) {
    return res.status(403).send({ message : 'Missing information' }).end();
  }

  const { name, password } = req.body.user;

  const user = await User.findOne({ name });
  if(!user) {
    return res.status(404).send({ message : 'User Not Found' }).end();
  }

  const isSame = await bcrypt.compare(password, user.password);
  if(!isSame) {
    return res.status(403).send({ message : 'Password is not correct' }).end();
  }

  return res.json({ token: generateToken({ name }) });
};

module.exports = {
  login
};
