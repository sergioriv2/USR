const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateFields,
  validateJWT,
  validateTeacher,
} = require("../middlewares");

const {
  postNotas,
  getNotas,
  getAllNotas,
  putNotas,
  getCursoNotas,
} = require("../controllers/notas.controllers");

const { cursoValido, alumnoValido, carreraValida } = require("../helpers");

const router = Router();

router.get(
  "/curso/:curso",
  [
    validateJWT,
    check("curso", "Ingesa un UID de curso valido.")
      .isMongoId()
      .custom((e) => cursoValido(e)),
    validateFields,
  ],
  getCursoNotas
);

// Obtener todas las notas de la carrera que se especifica

router.get(
  "/alumno/:alumno/carrera/:carrera",
  [
    validateJWT,
    check("alumno", "Ingesa un UID de alumno valido.")
      .isMongoId()
      .custom((e) => alumnoValido(e)),
    check("carrera", "Ingesa un UID de carrera valido.")
      .isMongoId()
      .custom((e) => carreraValida(e)),
    validateFields,
  ],
  getAllNotas
);

// TODO: verificar en middlewares si existe el alumno y el curso

router.get(
  "/alumno/:alumno/curso/:curso",
  [
    validateJWT,
    check("curso", "Ingesa un UID de curso valido.")
      .isMongoId()
      .custom((e) => cursoValido(e)),
    check("alumno", "Ingesa un UID de alumno valido.")
      .isMongoId()
      .custom((e) => alumnoValido(e)),
    validateFields,
  ],
  getNotas
);

router.post(
  "/alumno/:alumno/curso/:curso",
  [
    validateJWT,
    validateTeacher,
    check("curso", "Ingesa un UID de curso valido.")
      .isMongoId()
      .custom((e) => cursoValido(e)),
    check("alumno", "Ingesa un UID de alumno valido.")
      .isMongoId()
      .custom((e) => alumnoValido(e)),
    validateFields,
  ],
  postNotas
);

router.put(
  "/alumno/:alumno/curso/:curso",
  [
    validateJWT,
    validateTeacher,
    check("curso", "Ingesa un UID de curso valido.")
      .isMongoId()
      .custom((e) => cursoValido(e)),
    check("alumno", "Ingesa un UID de alumno valido.")
      .isMongoId()
      .custom((e) => alumnoValido(e)),
    validateFields,
  ],
  putNotas
);

module.exports = router;
