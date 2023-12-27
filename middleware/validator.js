const moment = require('moment');

const validator = (req, res, next) => {
  const dog = req.body;

  if (!dog.name || !dog.color || !dog.species || !dog.age) {
    console.log("Invalid Input.\n");
    return res.status(400).json({error: "Incomplete input."});
  }

  console.log("Valid Input.\n");
  next();
}

module.exports = validator;