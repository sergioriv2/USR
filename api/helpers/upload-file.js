const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  { archivo },
  validExtensions = ["png, jpg, jpeg"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const short_name = archivo.split(".");
    const extensionFile = short_name[short_name.length - 1];

    // Se verifica que la extension sea valida
    if (!validExtensions.includes(extensionFile))
      return reject(
        `The ${extensionFile} extension is invalid. These are the extensions allowed: ${validExtensions}`
      );

    const tempName = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(tempName);
    });
  });
};

module.exports = {
  uploadFile,
};
