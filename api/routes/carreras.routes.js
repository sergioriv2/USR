const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateFields,
  validateJWT,
  validateAdmin,
} = require("../middlewares");

const {
  getCarreras,
  getCarrera,
  postCarrera,
  putCarrera,
  deleteCarrera,
  getDescCarrera,
} = require("../controllers/carreras.controllers");

const router = Router();

const { carreraValida } = require("../helpers/db-validator");

// POST =================================================
// Crear nueva carrera
router.post(
  "/",
  [
    validateJWT,
    validateAdmin,
    check("descripcion", `El parametro 'descripcion' no puede estar vacío.`)
      .notEmpty()
      .isString()
      .withMessage(`El parametro 'descripcion' tiene que ser un string.`),
    check(
      "duracion",
      `El parametro 'duracion' no puede estar vacío.`
    ).notEmpty(),
    check("horas_totales", `El parametro 'horas_totales' no puede estar vacío.`)
      .notEmpty()
      .isInt()
      .withMessage(`El parametro 'horas_totales' tiene que ser un número.`),
    check(
      "mensualidad",
      `El parametro 'mensualidad' tiene que ser un float.`
    ).isFloat(),
    check("nivel", `El parametro 'nivel' no puede estar vacío.`)
      .notEmpty()
      .isString()
      .withMessage(`El parametro 'nivel' tiene que ser un string.`),
    check("cupo", `El parametro 'cupo' no puede estar vacío.`).notEmpty(),
    validateFields,
  ],
  postCarrera
);

// GET =================================================
// Obtener todas las carreras
router.get("/", [validateJWT, validateAdmin], getCarreras);

// // Obtener descripcion de una carrera
// router.get(
//   "/:id/descripcion",
//   [
//     validateJWT,
//     check("id", "Ingrese un UID de carrera válido")
//       .isMongoId()
//       .custom((carrera) => carreraValida(carrera)),
//     validateFields,
//   ],
//   getDescCarrera
// );

// Obtener una carrera
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "Ingrese un UID de carrera válido")
      .isMongoId()
      .custom((carrera) => carreraValida(carrera)),
    validateFields,
    validateAdmin,
  ],
  getCarrera
);

// PUT =================================================
// Actualizar una carrera
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Ingrese un UID de carrera válido")
      .isMongoId()
      .custom((carrera) => carreraValida(carrera)),
    validateFields,
    validateAdmin,
  ],
  putCarrera
);

// DELETE =================================================
// Baja logica de la carrera
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "Ingrese un UID de carrera válido")
      .isMongoId()
      .custom((carrera) => carreraValida(carrera)),
    validateFields,
    validateAdmin,
  ],
  deleteCarrera
);

module.exports = router;
