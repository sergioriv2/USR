const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateFields,
  validateJWT,
  validateAdmin,
} = require("../middlewares");

const {
  getDocentes,
  getDocente,
  getCarreras,
} = require("../controllers/docentes.controllers");

const { docenteValido } = require("../helpers");

const router = Router();

// GET =====================================================

// Obtener todos los docentes
router.get("/", [validateJWT, validateAdmin], getDocentes);

// Obtener un docente
router.get(
  "/:docente",
  [
    validateJWT,

    check("alumno").custom((docente) => docenteValido(docente)),
    validateFields,
  ],
  getDocente
);

// Obtener todas las carreras de un docente especificando su uid
router.get(
  "/:docente/carreras",
  [
    validateJWT,
    check("alumno").custom((docente) => docenteValido(docente)),
    validateFields,
  ],
  getCarreras
);

module.exports = router;
