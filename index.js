const members = require('./Members');
const express = require('express');
const path = require('path');

const app = express();

app.get('/api/members', (req, res) => {res.json(members)});

const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));