const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateJWT,
  validateAdmin,
  validateFields,
} = require("../middlewares");

const { materiaValida } = require("../helpers");

const router = Router();

const {
  getMateria,
  getMateriasCarrera,
  putMateria,
  getMaterias,
  postMateria,
  deleteMateria,
} = require("../controllers/materias.controllers");

const { carreraValida } = require("../helpers/db-validator");

// POST =================================================
// Crear nueva materia
router.post(
  "/",
  [
    validateJWT,
    validateAdmin,
    check("nombre", `El parametro 'nombre' no puede estar vacío.`).notEmpty(),
    validateFields,
  ],
  postMateria
);

// GET =================================================
// Obtener todas las materia de la carrera

router.get("/", [validateJWT, validateAdmin], getMaterias);

router.get(
  "/carrera/:carrera",
  [
    validateJWT,
    validateAdmin,
    check("carrera", "Ingesa un UID de carrera valido.")
      .isMongoId()
      .custom((carrera) => carreraValida(carrera)),
    validateFields,
  ],
  getMateriasCarrera
);

// Obtener una materia
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "Ingesa un UID de materia valido.")
      .isMongoId()
      .custom((materia) => materiaValida(materia)),
    validateFields,
  ],
  getMateria
);

// PUT =================================================
// Actualizar una materia
router.put(
  "/:id",
  [
    validateJWT,
    validateAdmin,
    check("id", "Ingesa un UID de materia valido.")
      .isMongoId()
      .custom((materia) => materiaValida(materia)),
    validateFields,
  ],
  putMateria
);

// DELETE =================================================
// Baja logica de la materia
router.delete(
  "/:id",
  [
    validateJWT,
    validateAdmin,
    check("id", "Ingesa un UID de materia valido.")
      .isMongoId()
      .custom((materia) => materiaValida(materia)),
    validateFields,
  ],
  deleteMateria
);

module.exports = router;
