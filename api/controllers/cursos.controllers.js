const { response, request } = require("express");

const Curso = require("../models/curso.models");
const { lastSeen } = require("../helpers");

const getCurso = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    // El usuario que esta haciendo la peticion del documento
    const usuarioVisitante = req.usuario;

    const curso = await Curso.findById(id)
      .populate({
        path: "usuarios",
        select: "id rol nombres apellidos password",
        options: { sort: { rol: -1 } },
      })
      .populate({ path: "carrera", select: "descripcion" })
      .populate({ path: "materia", select: "nombre" });

    if (!curso)
      return res.status(404).json({ msg: "El curso no existe.", ok: false });

    await lastSeen(usuarioVisitante, "cursos", id);

    return res.json({ results: curso, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno.", ok: false });
  }
};

const getCursos = async (req = request, res = response) => {
  try {
    const { limit = 5, index = 0 } = req.query;
    const cursos = await Curso.find()
      .skip(Number(index))
      .limit(Number(limit))
      .select(
        "materia nombre carrera horario.horas.dia horario.horas.inicio horario.horas.fin fechas cuatrimestre estado"
      )
      .populate({ path: "carrera", select: "descripcion uid" })
      .populate({ path: "materia", select: "nombre uid" });

    res.json({ results: cursos, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno.", ok: false });
  }
};

const postCurso = async (req = request, res = response) => {
  try {
    const { nombre, fechas, cuatrimestre, horario, usuarios } = req.body;
    const { materia, carrera } = req.params;

    const existe = await Curso.findOne({ nombre });

    if (existe)
      return res.status(400).json({ msg: "El curso ya existe.", ok: false });

    const curso = new Curso({
      nombre,
      fechas,
      cuatrimestre,
      usuarios,
      horario,
      materia,
      carrera,
    });

    await curso.save();

    return res.json({ ok: true, msg: "El curso se dió de alta con éxito." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno.", ok: false });
  }
};

const putCurso = async (req = request, res = response) => {
  try {
    const { usuarios, ...datos } = req.body;
    const { id } = req.params;

    const { materia, carrera, nombre, fechas, cuatrimestre, horario } = datos;

    const curso = await Curso.findOne({ _id: id });

    if (!curso) return res.status(404).json({ msg: "El curso no existe." });

    if (usuarios) {
      const existeAlumno = curso.usuarios.some((r) => {
        return usuarios.includes(r.toString());
      });

      if (existeAlumno)
        return res.status(404).json({
          msg: "Uno de los usuarios ingresados ya se encuentra en el curso.",
          ok: false,
        });

      curso.usuarios.push(usuarios);
    }

    materia ? (curso.materia = materia) : null;
    carrera ? (curso.carrera = carrera) : null;
    nombre ? (curso.nombre = nombre) : null;
    fechas ? (curso.cuatrimestre = cuatrimestre) : null;
    horario ? (curso.horario = horario) : null;

    await curso.save();

    return res.json({ ok: true, msg: "El curso se modificó con éxito." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno.", ok: false });
  }
};

const deleteCurso = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const curso = await Curso.findOne({ _id: id, estado: true });

    if (!curso)
      return res.status(404).json({ msg: "El curso no existe.", ok: false });

    if (!curso.estado)
      return res.status(404).json({ msg: "El curso no existe.", ok: false });

    curso.estado = false;

    await curso.save();

    return res
      .status(200)
      .json({ ok: true, msg: "El curso se dio de baja de forma exitosa." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno.", ok: true });
  }
};

const getCursosUsuario = async (req, res) => {
  try {
    const { usuario } = req.params;

    const cursos = await Curso.find({
      usuarios: usuario,
    })
      .select("nombre cuatrimestre materia carrera uid")
      .populate({
        path: "carrera",
        select: "descripcion _id",
      })
      .populate({
        path: "materia",
        select: "nombre _id",
      });

    if (!cursos)
      return res
        .status(404)
        .json({ msg: "No se encontraron cursos", ok: false });

    return res.status(200).json({ results: cursos, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno.", ok: false });
  }
};

const getCarreraCursosAlumno = async (req, res) => {
  try {
    const { usuario, carrera } = req.params;

    const anotados = await Curso.find({ usuarios: usuario, carrera })
      .select("nombre cuatrimestre materia carrera uid fechas horario")
      .populate({
        path: "carrera",
        select: "descripcion _id",
      })
      .populate({
        path: "materia",
        select: "nombre _id",
      });

    const sin_anotar = await Curso.find({
      usuarios: { $ne: usuario },
      carrera,
    })
      .select("nombre cuatrimestre materia carrera uid fechas horario")
      .populate({
        path: "carrera",
        select: "descripcion _id",
      })
      .populate({
        path: "materia",
        select: "nombre _id",
      });

    return res
      .status(200)
      .json({ results: { anotados, sin_anotar }, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno.", ok: false });
  }
};

const getCursosCarrera = async (req, res) => {
  try {
    const { carrera } = req.params;

    const cursos = await Curso.find({
      carrera,
    })
      .select("nombre cuatrimestre materia carrera uid")
      .populate({
        path: "carrera",
        select: "descripcion _id",
      })
      .populate({
        path: "materia",
        select: "nombre _id",
      });

    return res.status(200).json({ results: cursos, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno.", ok: false });
  }
};

module.exports = {
  getCurso,
  getCursos,
  postCurso,
  putCurso,
  deleteCurso,
  getCursosUsuario,
  getCarreraCursosAlumno,
  getCursosCarrera,
};
