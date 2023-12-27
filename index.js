const members = require('./Members');
const express = require('express');
const path = require('path');

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}

app.use(logger);

app.get('/api/members', (req, res) => {res.json(members)});

const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));