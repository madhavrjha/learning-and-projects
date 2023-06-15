const bcrypt = require('bcrypt');
const User = require('../model/User');

const createNewUser = async (req, res) => {
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
}

const updateUser = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ 'message': 'id is required' });

  try {
    const foundUser = await User.findOne({ _id: req.body.id }).exec();
    if (!foundUser) return res.sendStatus(204);

    if (req.body?.username) foundUser.username = req.body.username;
    if (req.body?.password) foundUser.password = await bcrypt.hash(req.body.password, 10);

    const result = await foundUser.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }

}

const deleteUser = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ 'message': 'id is required' });

  try {
    const foundUser = await User.findOne({ _id: req.body.id }).exec();
    if (!foundUser) return res.sendStatus(204);
    const result = await foundUser.deleteOne();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) return res.sendStatus(204);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

module.exports = {
  createNewUser, updateUser, deleteUser, getAllUsers
}