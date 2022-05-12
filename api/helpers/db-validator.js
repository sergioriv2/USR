const Rol = require("../models/roles.models");
const Carrera = require("../models/carrera.models");
const Materia = require("../models/materia.models");
const Curso = require("../models/curso.models");
const Usuario = require("../models/usuario.models");

const rolValido = async (rol = "") => {
  let existe = await Rol.findOne({ descripcion: rol.toUpperCase() });
  if (!existe) {
    throw new Error("El rol no existe en la base de datos.");
  }
};

const carreraValida = async (carrera = "") => {
  let existe = await Carrera.findById(carrera);
  if (!existe) {
    throw new Error("La carrera ingresada no existe en la base de datos.");
  }
};

const materiaValida = async (materia = "") => {
  let existe = await Materia.findById(materia);
  if (!existe) {
    throw new Error("El curso ingresado no existe en la base de datos.");
  }
};

const cursoValido = async (curso = "") => {
  let existe = await Curso.findById(curso);
  if (!existe) {
    throw new Error("El curso ingresado no existe en la base de datos.");
  }
};

const usuarioValido = async (usuario = "") => {
  let existe = await Usuario.findOne({ _id: usuario });
  if (!existe) {
    throw new Error("El usuario ingresado no existe en la base de datos.");
  }
};

const alumnoValido = async (alumno = "") => {
  let existe = await Usuario.findOne({ _id: alumno, rol: "ALUMNO" });
  if (!existe) {
    throw new Error("El alumno ingresado no existe en la base de datos.");
  }
};

const docenteValido = async (docente = "") => {
  let existe = await Usuario.findOne({ _id: docente, rol: "DOCENTE" });
  if (!existe) {
    throw new Error("El docente ingresado no existe en la base de datos.");
  }
};

module.exports = {
  rolValido,
  carreraValida,
  materiaValida,
  cursoValido,
  docenteValido,
  usuarioValido,
  alumnoValido,
};
