const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const corsOption = require('./config/corsOption');
const verifyAccessToken = require('./middleware/verifyAccessToken');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3500;
dbConnect();

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyAccessToken);
app.use('/users', require('./routes/users'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Listening to ${PORT}`));
});