const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const apiPort = 3000;
const db = require('./db');
const posts = require('./routes/post.routes');
const users = require('./routes/user.routes');
const login = require('./routes/login.routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(logger(function (tokens, req, res) {
    return [
      tokens.url(req, res),
      tokens.status(req, res),
      '-',
      tokens.res(req, res, 'content-length'), 
      '-',
      tokens['response-time'](req, res), 'ms',
      '-',
      (req.user ? (req.user._id) : "")
    ].join(' ')
}));

app.use('/api', posts);
app.use('/api', users);
app.use('/api', login);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
