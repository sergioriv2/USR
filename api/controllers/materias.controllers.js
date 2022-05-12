const { request, response } = require("express");

const Materia = require("../models/materia.models");

const getMateria = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const materia = Materia.findById(id);

    if (!materia)
      return res.status(404).json({ msg: "La materia no existe.", ok: false });

    return res.json({ results: materia, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error", ok: false });
  }
};

const getMaterias = async (req = request, res = response) => {
  try {
    const materias = await Materia.find({ estado: true }).select("id nombre");

    if (!materias)
      return res
        .status(404)
        .json({ msg: "no se encontraron materias", ok: false });

    return res.json({ results: materias, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error", ok: false });
  }
};

const getMateriasCarrera = async (req = request, res = response) => {
  try {
    const { limit = 5, index = 0 } = req.query;
    const { carrera } = req.params;

    const materias = await Materia.find({ estado: true, carreras: carrera })
      .limit(Number(limit))
      .skip(Number(index))
      .select("nombre estado correlativas")
      .populate({ path: "correlativas", select: "nombre _id" });

    if (!materias)
      return res
        .status(404)
        .json({ msg: "No se encontraron materias", ok: False });

    return res.json({ results: materias, index, limit, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error", ok: false });
  }
};

const putMateria = async (req = request, res = response) => {
  try {
    const { carreras, ...datos } = req.body;
    const { id } = req.params;

    const materia = await Materia.findById(id);

    if (!materia) return res.status(404).json({ msg: "La materia no existe." });

    if (!materia.estado)
      return res.status(404).json({ msg: "La materia no existe." });

    if (carreras) {
      materia.carreras.push(carreras);
    }

    await materia.save();

    return res.status(200).json(materia);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error", ok: false });
  }
};
const deleteMateria = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const materia = await Materia.findOne({ _id: id, estado: true });

    if (!materia) return res.status(404).json({ msg: "La materia no existe." });

    if (!materia.estado)
      return res.status(404).json({ msg: "La materia no existe." });

    materia.estado = false;

    await materia.save();

    return res
      .status(200)
      .json({ msg: "La materia se dio de baja exitosamente." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error", ok: false });
  }
};

const postMateria = async (req = request, res = response) => {
  try {
    const { nombre, correlativas } = req.body;

    const existe = await Materia.findOne({ nombre });

    if (existe) return res.status(400).json({ msg: "La materia ya existe" });

    const materia = new Materia({ nombre, correlativas });

    await materia.save();

    return res.status(200).json(materia);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error", ok: false });
  }
};

module.exports = {
  getMateria,
  getMaterias,
  getMateriasCarrera,
  postMateria,
  putMateria,
  deleteMateria,
};
