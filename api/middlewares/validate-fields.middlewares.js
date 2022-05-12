const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  const errorList = errors.errors.map((error) => {
    return {
      msg: error.msg,
      param: error.param,
    };
  });

  if (!errors.isEmpty()) {
    return res.status(400).json(errorList);
  }

  next();
};

module.exports = {
  validateFields,
};
