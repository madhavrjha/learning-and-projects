const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: function (origin, callback) {
    allowedOrigins.includes(origin) || !origin // !origin is only for development
      ? callback(null, true)
      : callback(new Error('Not allowed by cors'));
  },
  credentials: true
};

module.exports = corsOptions;