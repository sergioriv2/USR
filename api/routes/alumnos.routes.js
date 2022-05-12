const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateFields,
  validateJWT,
  validateAdmin,
} = require("../middlewares");

const { getAlumnos, getAlumno } = require("../controllers/alumnos.controllers");

const { alumnoValido } = require("../helpers");

const router = Router();

// GET =====================================================

// Obtener todos los alumnos - Requiere JWT - Privado
router.get("/", [validateJWT, validateAdmin], getAlumnos);

// Obtener un alumno
router.get(
  "/:alumno",
  [
    validateJWT,
    check("alumno").custom((alumno) => alumnoValido(alumno)),
    validateFields,
  ],
  getAlumno
);

module.exports = router;
