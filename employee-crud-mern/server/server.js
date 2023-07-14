const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./config/connectDB');
const corsOptions = require('./config/corsOptions');

const app = express();
const PORT = process.env.POST || 3500;
dbConnect();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/employee', require('./routes/employee.js'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB Driver');
  app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
})