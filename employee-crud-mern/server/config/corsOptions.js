const allowedOrigins = ['http://localhost:3000', undefined];

const corsOptions = {
  origin: (origin, cb) => {
    allowedOrigins.includes(origin)
      ? cb(null, true)
      : cb(new Error('Not allowed by cors'));
  }
}

module.exports = corsOptions;