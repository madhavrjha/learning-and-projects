const jwt = require('jsonwebtoken');
const User = require('../model/User');

const refreshToken = async (req, res) => {
  if (!req?.cookies?.jwt) return res.sendStatus(401);
  const refreshToken = req.cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(401);

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (foundUser.username !== decoded.username) return res.sendStatus(403);
    const accessToken = await jwt.sign({ username: foundUser.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    res.json({ accessToken });

  } catch (err) {
    console.error(err.message);
    res.sendStatus(403);
  }
};

module.exports = { refreshToken };