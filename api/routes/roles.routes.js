const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares");

const router = Router();

const { postRol } = require("../controllers/roles.controllers");

router.post(
  "/",
  [
    check(
      "descripcion",
      `El parametro 'descripcion' no puede estar vacío.`
    ).notEmpty(),
    validateFields,
  ],
  postRol
);

module.exports = router;
