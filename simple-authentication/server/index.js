const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3500;
const app = express();
let users = [{ username: "madhav" }, { username: "sandeep" }, { username: "rakesh" }]

app.use(cors({ origin: ['http://127.0.0.1:5500'], credentials: true }));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: 'username is required' });

  const isValiduser = users.map(user => user.username).includes(username);

  if (isValiduser) {
    const sessionId = crypto.randomBytes(64).toString('hex');
    const otherUsers = users.filter(user => user.username !== username);
    const currentUser = users.find(user => user.username === username);
    users = [...otherUsers, { ...currentUser, sessionId }]
    res.cookie('sessionid', sessionId, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ sessionId })
  } else {
    res.sendStatus(401);
  }
});

app.get('/dashboard', (req, res) => {
  if (!req.cookies?.sessionid) return res.sendStatus(401);

  const sessionId = req.cookies.sessionid;
  const currentUser = users.find(user => user.sessionId === sessionId);
  if (currentUser) {
    res.send('Here is your Dashboard');
  }
  else {
    res.sendStatus(401);
  }
});

app.get('/logout', (req, res) => {
  if (!req.cookies?.sessionid) return res.sendStatus(204);

  const sessionId = req.cookies.sessionid;
  const currentUser = users.find(user => user.sessionId === sessionId);
  if (!currentUser) return res.sendStatus(204);
  const otherUsers = users.filter(user => user.sessionId !== sessionId);
  users = [...otherUsers, { ...currentUser, sessionId: null }];
  res.clearCookie('sessionid', { httpOnly: true });
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.sendStatus(200);
})

app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
