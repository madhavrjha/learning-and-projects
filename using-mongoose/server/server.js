const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');

const PORT = process.env.PORT || 3500;
const app = express();
dbConnect();

app.use(express.json());
app.use(cors());
app.use('/employee', require('./routes/employees'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB Driver');
  app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));
});