const { response, request } = require("express");
const { default: mongoose } = require("mongoose");

const Notas = require("../models/notas.model");
const { lastSeen } = require("../helpers");

const getCursoNotas = async (req = request, res = response) => {
  try {
    const { curso } = req.params;

    const notas = await Notas.find({ curso })
      .select("parciales recuperatorios alumno estado_curso")
      .populate({ path: "alumno", select: "nombres apellidos" });

    if (!notas)
      return res
        .status(404)
        .json({ msg: "No se encontraron las notas del alumno.", ok: false });

    return res.json({ results: notas, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno" });
  }
};

const postNotas = async (req = request, res = response) => {
  try {
    const { alumno, curso } = req.params;
    const { parciales, recuperatorios } = req.body;

    const existe = await Notas.findOne({ alumno, curso });

    if (existe)
      return res
        .status(404)
        .json({ msg: "Las notas para el alumno ya existen." });

    const notas = new Notas({ alumno, curso, parciales, recuperatorios });

    await notas.save();

    return res.json(notas);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno" });
  }
};

const getAllNotas = async (req = request, res = response) => {
  try {
    const { alumno, carrera } = req.params;
    const alumnoVisitante = req.usuario;

    const carreraId = mongoose.Types.ObjectId(carrera);
    const alumnoId = mongoose.Types.ObjectId(alumno);

    const notas = await Notas.aggregate([
      {
        $project: {
          _id: 1,
          parciales: 1,
          recuperatorios: 1,
          curso: 1,
          alumno: 1,
          estado_curso: 1,
        },
      },
      {
        $match: {
          alumno: alumnoId,
        },
      },
      {
        $lookup: {
          from: "cursos",
          localField: "curso",
          foreignField: "_id",
          as: "cursosCollection",
        },
      },
      {
        $lookup: {
          from: "carreras",
          localField: "cursosCollection.carrera",
          foreignField: "_id",
          as: "carrerasCollection",
        },
      },
      {
        $unwind: "$carrerasCollection",
      },
      {
        $lookup: {
          from: "materias",
          localField: "cursosCollection.materia",
          foreignField: "_id",
          as: "materiasCollection",
        },
      },
      {
        $unwind: "$materiasCollection",
      },
      {
        $project: {
          uid: "$_id",
          materia: {
            uid: "$materiasCollection._id",
            descripcion: "$materiasCollection.nombre",
          },
          parciales: 1,
          recuperatorios: 1,
          carrera: {
            uid: "$carrerasCollection._id",
            descripcion: "$carrerasCollection.descripcion",
          },

          estado_curso: 1,
        },
      },
      {
        $match: {
          "carrera.uid": carreraId,
        },
      },
    ]);

    if (notas.length === 0)
      return res
        .status(404)
        .json({ msg: "No se encontraron notas del alumno." });

    const saveUser = await Promise.all(
      notas.map(async ({ materia }) => {
        return await lastSeen(alumnoVisitante, "materias", materia.uid);
      })
    );

    await saveUser[saveUser.length - 1].save();

    return res.json({ results: notas, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno" });
  }
};

const putNotas = async (req = request, res = response) => {
  // try {
  //   const { alumno, curso } = req.params;
  //   const { parciales, recuperatorios } = req.body;
  // } catch (err) {
  //   console.log(err);
  //   return res.status(500).json({ msg: "Error interno" });
  // }
};

const getNotas = async (req = request, res = response) => {
  try {
    const { alumno, curso } = req.params;

    const notas = await Notas.findOne({ alumno, curso })
      .populate({ path: "alumno", select: "nombres apellidos" })
      .populate({ path: "curso", select: "nombre" });

    // Verifico que el metodo me retorne un resultado
    if (!notas)
      return res
        .status(404)
        .json({ msg: "No se encontraron las notas del alumno." });

    const { parciales, recuperatorios, estado_curso, uid } = notas;

    return res.json({ parciales, recuperatorios, estado_curso, uid });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno" });
  }
};

module.exports = {
  postNotas,
  getNotas,
  putNotas,
  getAllNotas,
  getCursoNotas,
};
