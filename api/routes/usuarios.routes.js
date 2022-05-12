const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUser,
  putUser,
  getLastSeen,
  postUser,
  getCarreras,
  deleteUser,
} = require("../controllers/usuarios.controllers");

const { usuarioValido } = require("../helpers");
const {
  validateFields,
  validateJWT,
  validateAdmin,
} = require("../middlewares");

const router = Router();

//POST ==============================
// Crear nuevo usuario
router.post(
  "/",
  [
    validateJWT,
    validateAdmin,
    check("nombres", `El parametro 'nombres' no puede estar vacío.`).notEmpty(),
    check(
      "apellidos",
      "El parametro 'apellidos' no puede estar vacío."
    ).notEmpty(),
    check(
      "fecha_nacimiento",
      "El parametro 'fecha_nacimiento' no puede estar vacío."
    ).notEmpty(),
    check(
      "domicilio",
      "El parametro 'domicilio' no puede estar vacío."
    ).notEmpty(),
    check("email", "El parametro 'email' no puede estar vacío.")
      .notEmpty()
      .isEmail()
      .withMessage("El email no cumple con un formato valido"),
    check(
      "password",
      "El parametro 'contraseña' no puede estar vacío."
    ).notEmpty(),
    check("dni", "El parametro 'dni' no puede estar vacío.").notEmpty(),
    validateFields,
  ],
  postUser
);

// GET =====================================================

router.get("/", [validateJWT], getUser);

// Obtener los cursos y notas vistos ultimamente del alumno
router.get(
  "/:user/last_seen",
  [
    validateJWT,
    check("user").custom((usuario) => usuarioValido(usuario)),
    validateFields,
  ],
  getLastSeen
);

// Obtener todas las carreras de un alumno especificando su uid
router.get(
  "/:usuario/carreras",
  [
    validateJWT,
    check("usuario").custom((usuario) => usuarioValido(usuario)),
    validateFields,
  ],
  getCarreras
);

// PUT =====================================================
// Actualizar un usuario
router.put(
  "/:user",
  [
    validateJWT,
    validateAdmin,
    check("user").custom((usuario) => usuarioValido(usuario)),
    validateFields,
  ],
  putUser
);

// DELETE =====================================================
// Baja logica de un usuario
router.delete(
  "/:user",
  [
    validateJWT,
    validateAdmin,
    check("user").custom((usuario) => usuarioValido(usuario)),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
