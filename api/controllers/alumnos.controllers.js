const { response, request } = require("express");
const { format } = require("date-fns");
const Alumno = require("../models/usuario.models");

const getAlumno = async (req = request, res = response) => {
  const { alumno } = req.params;

  try {
    const usuario = await Alumno.findOne({ _id: alumno, rol: "ALUMNO" });

    if (!usuario || !usuario.estado) {
      return res.status(404).json({ msg: "El alumno no existe.", ok: false });
    }

    return res.status(200).json({ results: usuario, ok: true });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error", ok: false });
  }
};

const getAlumnos = async (req, res) => {
  try {
    const { limit = 5, index = 0 } = req.query;
    const alumnos = await Alumno.find({ estado: true, rol: "ALUMNO" })
      .select(
        "nombres apellidos uid fecha_alta fecha_nacimiento img sexo email"
      )
      .skip(Number(index))
      .limit(Number(limit));

    const fixedAlumnos = alumnos.map(
      ({ fecha_alta, fecha_nacimiento, _doc }) => {
        const { _id: uid, ...alumno } = _doc;

        return {
          ...alumno,
          uid,
          fecha_alta: format(fecha_alta, "dd/MM/yyyy"),
          fecha_nacimiento: format(fecha_nacimiento, "dd/MM/yyyy"),
        };
      }
    );

    res.json({ results: fixedAlumnos, index, limit, ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error", ok: false });
  }
};

module.exports = {
  getAlumno,
  getAlumnos,
};
