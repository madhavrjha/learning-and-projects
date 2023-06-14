const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  if (!req?.body?.username || !req?.body?.password) return res.status(400).json({ 'message': 'username and password are required' });

  try {
    const duplicateUser = await User.findOne({ username: req.body.username }).exec();
    if (duplicateUser) return res.status(409).json({ 'message': 'this username is already taken' });
    const password = await bcrypt.hash(req.body.password, 10);
    const result = await User.create({ username: req.body.username, password });
    res.status(201).json({ id: result._id });

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = { handleNewUser }