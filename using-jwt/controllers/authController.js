const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleLogin = async (req, res) => {
  if (!req?.body?.username || !req?.body?.password) return res.status(400).json({ 'message': 'username and password arw required' });
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.sendStatus(401);

    const accessToken = await jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    const refrehsToken = await jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    foundUser.refreshToken = refrehsToken;
    const result = await foundUser.save();

    res.cookie('jwt', refrehsToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 86400 * 1000 });
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = { handleLogin };