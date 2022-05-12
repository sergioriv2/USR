const dbValidator = require("./db-validator");
const generarJWT = require("./generarJWT");
const subirArchivo = require("./upload-file");
const validateCollections = require("./validate-collections");
const lastSeen = require("./lastSeen-user");

module.exports = {
  ...dbValidator,
  ...generarJWT,
  ...subirArchivo,
  ...validateCollections,
  ...lastSeen,
};
