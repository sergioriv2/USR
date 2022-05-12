const { Router } = require("express");
const { check } = require("express-validator");

const {
  putImagenColeccion,
  getImagenColeccion,
} = require("../controllers/uploads.controllers");

const { validCollections } = require("../helpers");

const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.put(
  "/:coleccion/:id",
  [
    validateJWT,
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom((coleccion) =>
      validCollections(coleccion, ["usuarios"])
    ),
    validateFields,
  ],
  putImagenColeccion
);

module.exports = router;
