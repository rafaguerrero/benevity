const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/token');
const SALT_ROUNDS = 10;

/**
 * Add a user
 * @param req
 * @param res
 * @returns request
 */
addUser = async (req, res) => {
  if (!req.body.user.name || !req.body.user.password) {
    return res.status(403).send({ message : 'Missing Information' }).end();
  }

  const stored = await User.findOne({ name: req.body.user.name });
  if(stored) {
    return res.status(409).send({ message : 'This user is already created' }).end();
  }

  try {
    const { name, password } = req.body.user;
    const securedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
    await User.create({ name, password: securedPassword });

    return res.json({ token: generateToken({ name }) });
  } catch(e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  addUser
};
