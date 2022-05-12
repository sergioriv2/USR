const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares");

const router = Router();

const { login } = require("../controllers/usuarios.controllers");

router.post(
  "/",
  [
    check("email", `El parametro 'email' no puede estar vacio.`)
      .notEmpty()
      .isEmail()
      .withMessage("El parametro 'email' tiene que ser un email válido."),
    check(
      "password",
      `El parametro 'password' no puede estar vacio.`
    ).notEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
