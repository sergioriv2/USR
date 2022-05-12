const { Router } = require("express");
const { check } = require("express-validator");

// const { validarCampos, validarJWT } = require("../middlewares");

const { getCareerStats } = require("../controllers/career-stats.controllers");

// const { carrerasValidas } = require("../helpers/db-validator");

const router = Router();

router.post("/", getCareerStats);

module.exports = router;
