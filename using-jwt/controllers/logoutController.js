const User = require('../model/User');

const handleLogout = async (req, res) => {
  if (!req?.cookies?.jwt) return res.sendStatus(204);
  const refreshToken = req.cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true }); // secure: true in production

  try {
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(204);

    foundUser.refreshToken = '';
    await foundUser.save();
    res.sendStatus(204);

  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
};

module.exports = { handleLogout };