const moment = require("moment");

const logger = (req, res, next) => {
  console.log(
    `\nURL: ${req.protocol}://${req.get("host")}${
      req.originalUrl
    }\nDate: ${moment()}\n`
  );
  next();
};

module.exports = logger;