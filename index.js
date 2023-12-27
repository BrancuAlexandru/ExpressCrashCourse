const express = require("express");
const logger = require("./middleware/logger");
const path = require("path");

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000;

app.use(express.static(path.join(__dirname, "public")));

app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));