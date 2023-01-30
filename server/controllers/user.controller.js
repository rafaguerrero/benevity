const User = require('../models/user');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addUser = async (req, res) => {
  if (!req.body.user.name || !req.body.user.password) {
    return res.status(403).end();
  }

  const stored = await User.findOne({ name: req.body.user.name });
  if(stored) {
    return res.status(409).end();
  }

  try {
    //const securedPassword = 'securedPassword';

    const { name, password } = req.body.user;

    console.log("-------------------");
    console.log(name, password);
    console.log("-------------------");
  
    const user = await User.create({
      name,
      password
    });

    console.log("--------------");
    console.log(user);
    console.log("--------------");

    return res.json({ token: "JWT_TOKEN" });
  } catch(e) {
    return res.status(500).send(err);
  }
};

module.exports = {
  addUser
};
