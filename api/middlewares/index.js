const validateFields = require("./validate-fields.middlewares");
const validateJWT = require("./validate-jwt.middlewares");
const validatePermissions = require("./validate-permissions.middlewares");
const validateFile = require("./validate-file.middlewares");

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validatePermissions,
  ...validateFile,
};
