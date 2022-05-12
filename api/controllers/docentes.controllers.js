const { response, request } = require("express");
const { format } = require("date-fns");

const Docente = require("../models/usuario.models");

const getDocente = async (req = request, res = response) => {
  const { docente } = req.params;

  try {
    const usuario = await Docente.findOne({ _id: docente, rol: "DOCENTE" });

    if (!usuario || !usuario.estado) {
      return res.status(404).json({ msg: "El docente no existe." });
    }

    usuario.fecha_nacimiento = fecha_nacimiento.split("T");

    return res.status(200).json({ usuario });
  } catch (err) {
    return res.status(500).json({ message: "Error interno." });
  }
};

const getCarreras = async (req, res) => {
  const { docente } = req.params;

  try {
    const { carreras } = await Docente.findOne({ _id: docente, rol: "DOCENTE" })
      .select("carreras")
      .populate({
        path: "carreras",
        select: "descripcion _id",
      });

    if (!carreras) {
      return res.status(404).json({ msg: "El docente no existe." });
    }

    return res.status(200).json(carreras);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error interno." });
  }
};

const getDocentes = async (req, res) => {
  try {
    const { limit = 5, index = 0 } = req.query;
    const findDocentes = await Docente.find({ estado: true, rol: "DOCENTE" })
      .select(
        "nombres apellidos uid fecha_alta fecha_nacimiento img sexo email"
      )
      .skip(Number(index))
      .limit(Number(limit));

    const docentes = findDocentes.map(({ _doc }) => {
      const { _id, ...docente } = _doc;

      docente.fecha_alta = format(docente.fecha_alta, "dd/MM/yyyy");
      docente.fecha_nacimiento = format(docente.fecha_nacimiento, "dd/MM/yyyy");

      return {
        ...docente,
        uid: _id,
      };
    });

    res.json({ docentes, index, limit });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno." });
  }
};

module.exports = {
  getDocente,
  getCarreras,
  getDocentes,
};
