const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors({ origin: ['http://127.0.0.1:5500'] }));
app.use(express.json());
app.use('/employees', require('./routes/employees'));


app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
process.on('uncaughtException', (e) => console.error(e));