const express = require("express");
const logger = require("./middleware/logger");
const validator = require("./middleware/validator");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000;

app.use(express.static(path.join(__dirname, "public")));

app.use('/api/members', require('./routes/api/members'));
app.use('/api/dogs', require('./routes/api/dogs'));

app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));