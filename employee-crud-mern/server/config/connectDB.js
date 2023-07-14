const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useUnifiedTopology: true,
      useNewURLParser: true
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;