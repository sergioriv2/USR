const { request, response } = require("express");
const { default: mongoose } = require("mongoose");

const Deudas = require("../models/deudas.models");
const Usuario = require("../models/usuario.models");

const getCareerStats = async (req, res) => {
  const { carrera, fecha } = req.body;

  const { month, year } = fecha;

  try {
    const carreraId = mongoose.Types.ObjectId(carrera);

    // Consulta para obtener las cuotas y matriculas pagadas de la carrera
    const result = await Deudas.aggregate([
      // Stage 1: Filter
      {
        $project: {
          carrera: 1,
          detalles: 1,
        },
      },
      { $unwind: "$detalles" },
      {
        $lookup: {
          from: "carreras",
          localField: "carrera",
          foreignField: "_id",
          as: "carrerasCol",
        },
      },
      {
        $unwind: "$carrerasCol",
      },
      {
        $lookup: {
          from: "usuarios",
          localField: "carrerasCol._id",
          foreignField: "carreras",
          as: "usuariosCol",
        },
      },
      {
        $project: {
          nombreCarrera: "$carrerasCol.descripcion",
          mes: { $month: "$detalles.fecha" },
          año: { $year: "$detalles.fecha" },
          carreraId: "$carrera",

          cuotas_sin_pagar: {
            $cond: [
              {
                $and: [
                  {
                    $eq: ["$detalles.estado_pago", "SIN PAGAR"],
                  },
                  {
                    $eq: ["$detalles.tipo_pago", "CUOTA"],
                  },
                ],
              },
              1,
              0,
            ],
          },
          cuotas_pagadas: {
            $cond: [
              {
                $and: [
                  {
                    $eq: ["$detalles.estado_pago", "PAGADO"],
                  },
                  {
                    $eq: ["$detalles.tipo_pago", "CUOTA"],
                  },
                ],
              },
              1,
              0,
            ],
          },
          cuotas_pagadas_parcialmente: {
            $cond: [
              {
                $and: [
                  {
                    $eq: ["$detalles.estado_pago", "PAGADO PARCIALMENTE"],
                  },
                  {
                    $eq: ["$detalles.tipo_pago", "CUOTA"],
                  },
                ],
              },
              1,
              0,
            ],
          },
          matriculas_sin_pagar: {
            $cond: [
              {
                $and: [
                  {
                    $eq: ["$detalles.estado_pago", "SIN PAGAR"],
                  },
                  {
                    $eq: ["$detalles.tipo_pago", "MATRICULA"],
                  },
                ],
              },
              1,
              0,
            ],
          },
          matriculas_pagadas: {
            $cond: [
              {
                $and: [
                  {
                    $eq: ["$detalles.estado_pago", "PAGADO"],
                  },
                  {
                    $eq: ["$detalles.tipo_pago", "MATRICULA"],
                  },
                ],
              },
              1,
              0,
            ],
          },
          matriculas_pagadas_parcialmente: {
            $cond: [
              {
                $and: [
                  {
                    $eq: ["$detalles.estado_pago", "PAGADO PARCIALMENTE"],
                  },
                  {
                    $eq: ["$detalles.tipo_pago", "MATRICULA"],
                  },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
      {
        $match: {
          mes: month,
          año: year,
          carreraId,
        },
      },
      {
        $group: {
          _id: "$carreraId",
          nombre_carrera: { $first: "$nombreCarrera" },

          cuotas_sin_pagar: { $sum: "$cuotas_sin_pagar" },
          cuotas_pagadas: { $sum: "$cuotas_pagadas" },
          cuotas_pagadas_parcialmente: { $sum: "$cuotas_pagadas_parcialmente" },

          matriculas_sin_pagar: { $sum: "$matriculas_sin_pagar" },
          matriculas_pagadas: { $sum: "$matriculas_pagadas" },
          matriculas_pagadas_parcialmente: {
            $sum: "$matriculas_pagadas_parcialmente",
          },
        },
      },

      {
        $project: {
          nombre_carrera: 1,

          cuotas: {
            pagadas: "$cuotas_pagadas",
            sin_pagar: "$cuotas_sin_pagar",
            pagadas_parcialmente: "$cuotas_pagadas_parcialmente",
          },
          matriculas: {
            pagadas: "$matriculas_pagadas",
            sin_pagar: "$matriculas_sin_pagar",
            pagadas_parcialmente: "$matriculas_pagadas_parcialmente",
          },
        },
      },
    ]);

    // Consulta para obtener la cantidad de alumnos en la carrera
    const newResult = await Promise.all(
      result.map(async (el) => {
        const cantidadAlumnos = await Usuario.count({
          carreras: el._id,
          rol: "ALUMNO",
          estado: true,
        });

        el["cantidad_alumnos"] = cantidadAlumnos;

        return el;
      })
    );

    if (result.length === 0)
      return res.status(404).json({ msg: "No se encontraron resultados." });

    return res.json(newResult);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno." });
  }
};

module.exports = {
  getCareerStats,
};
