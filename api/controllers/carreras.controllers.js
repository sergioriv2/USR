const Carrera = require("../models/carrera.models");

const getDescCarrera = async (req, res) => {
  try {
    const { id } = req.params;

    const carrera = await Carrera.findOne({ _id: id, estado: true }).select(
      "descripcion"
    );

    if (!carrera)
      return res.status(404).json({ msg: "La carrera no existe.", ok: false });

    return res.json({ results: carrera, ok: true });
  } catch (err) {
    res.status(500).json({ msg: "Error interno.", ok: false });
    console.log(err);
  }
};

const postCarrera = async (req, res) => {
  try {
    const { descripcion, horas_totales, cupo, duracion, mensualidad, nivel } =
      req.body;

    const existe = await Carrera.findOne({ descripcion });

    if (existe)
      return res.status(400).json({ msg: "La carrera ya existe.", ok: false });

    const carrera = new Carrera({
      descripcion,
      horas_totales,
      duracion,
      mensualidad,
      nivel,
      cupo,
    });

    await carrera.save();

    return res.status(200).json({ results: carrera, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Error interno",
      ok: false,
    });
  }
};

const getCarrera = async (req, res) => {
  try {
    const { id } = req.params;

    const carrera = await Carrera.findById(id);

    if (!carrera)
      return res.status(404).json({ msg: "La carrera no existe.", ok: false });
    if (!carrera.estado)
      return res.status(404).json({ msg: "La carrera no existe.", ok: false });

    return res.json({ results: carrera, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno", ok: false });
  }
};

const getCarreras = async (req, res) => {
  try {
    const { limit = 5, index = 0 } = req.query;
    const carreras = await Carrera.find({ estado: true })
      .skip(Number(index))
      .limit(Number(limit));

    return res.json({ results: carreras, index, limit, ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno", ok: false });
  }
};

const putCarrera = async (req, res) => {
  try {
    const { ...datos } = req.body;
    const { id } = req.params;

    const carrera = await Carrera.findByIdAndUpdate(id, datos);

    if (!carrera)
      return res.status(404).json({ msg: "La materia no existe.", ok: false });
    if (!carrera.estado)
      return res.status(404).json({ msg: "La materia no existe.", ok: false });

    return res.json({ results: carrera });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno", ok: false });
  }
};

const deleteCarrera = async (req, res) => {
  try {
    const { id } = req.params;

    const carrera = await Carrera.findOne({ _id: id, estado: true });

    if (!carrera)
      return res.status(404).json({ msg: "La carrera no existe.", ok: false });
    if (!carrera.estado)
      return res.status(404).json({ msg: "La carrera no existe.", ok: false });

    carrera.estado = false;

    await carrera.save();

    return res.json({ msg: "La carrera se dio de baja con exito.", ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno", ok: false });
  }
};

module.exports = {
  postCarrera,
  getCarrera,
  getCarreras,
  putCarrera,
  deleteCarrera,
  getDescCarrera,
};
