const jwt = require('jsonwebtoken');

const verifyAccessToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
  const accessToken = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.username = decoded.username;
    next();
  } catch (err) {
    console.error(err.message);
    res.sendStatus(403);
  }
}

module.exports = verifyAccessToken;