const { Router } = require("express");
const { check } = require("express-validator");

const {
  carreraValida,
  alumnoValido,
  materiaValida,
  usuarioValido,
  cursoValido,
} = require("../helpers/db-validator");

const {
  validateFields,
  validateJWT,
  validateAdmin,
  validateStudent,
} = require("../middlewares");
const {
  getCurso,
  getCursos,
  postCurso,
  putCurso,
  deleteCurso,
  getCursosUsuario,
  getCarreraCursosAlumno,
  getCursosCarrera,
} = require("../controllers/cursos.controllers");

const router = Router();

// POST =================================================
// Crear un nuevo curso
router.post(
  "/carrera/:carrera/materia/:materia",
  [
    validateJWT,
    validateAdmin,
    check("carrera", "Ingesa un UID de carrera valido.")
      .isMongoId()
      .custom((e) => carreraValida(e)),
    check("materia", "Ingesa un UID de materia valido.")
      .isMongoId()
      .custom((e) => materiaValida(e)),
    check("nombre", `El parametro 'nombre' no puede estar vacío.`)
      .isString()
      .withMessage(`El parametro 'nombre' solo acepta cadena de textos.`),
    check("fechas.*", `El parametro 'fechas' no puede estar vacío.`).notEmpty(),
    check(
      "cuatrimestre",
      `El parametro 'cuatrimestre' no puede estar vacío.`
    ).isNumeric(),
    validateFields,
  ],
  postCurso
);

// GET =================================================
// Obtener todos los cursos
router.get("/", [validateJWT, validateAdmin], getCursos);

// Obtener todos los cursos de un alumno
router.get(
  "/usuario/:usuario/",
  [
    validateJWT,
    check("usuario", "Ingrese un UID de usuario válido")
      .isMongoId()
      .custom((usuario) => usuarioValido(usuario)),
    validateFields,
  ],
  getCursosUsuario
);

// Obtener todos los cursos de una carrera
router.get(
  "/carrera/:carrera",
  [validateJWT, validateStudent],
  getCursosCarrera
);

// Obtener un solo curso y actualiza el usuario que lo revisa
router.get(
  "/curso/:id",
  [
    validateJWT,
    check("id", "Ingesa un UID de curso valido.")
      .isMongoId()
      .custom((curso) => cursoValido(curso)),
    validateFields,
  ],
  getCurso
);

// Obtener los cursos de la carrera de un alumno
router.get(
  "/usuario/:usuario/carrera/:carrera",
  [
    validateJWT,
    check("usuario", "Ingesa un UID de alumno valido.")
      .isMongoId()
      .custom((usuario) => usuarioValido(usuario)),
    check("carrera", "Ingesa un UID de carrera valido.")
      .isMongoId()
      .custom((carrera) => carreraValida(carrera)),
    validateFields,
  ],
  getCarreraCursosAlumno
);

// PUT =================================================
// Actualizar curso
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Ingesa un UID de curso valido.")
      .isMongoId()
      .custom((curso) => cursoValido(curso)),
    validateFields,
  ],
  putCurso
);

// DELETE =================================================
// Baja logica de un curso
router.delete(
  "/:id",
  [
    validateJWT,
    validateAdmin,
    check("id", "Ingesa un UID de curso valido.")
      .isMongoId()
      .custom((curso) => cursoValido(curso)),
    validateFields,
  ],
  deleteCurso
);

module.exports = router;
