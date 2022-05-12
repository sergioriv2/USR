const { Schema, model } = require("mongoose");

const CursoSchema = Schema({
  materia: {
    type: Schema.Types.ObjectId,
    ref: "Materia",
    required: true,
  },
  carrera: {
    type: Schema.Types.ObjectId,
    ref: "Carrera",
    required: true,
  },
  nombre: {
    required: true,
    type: String,
    unique: true,
  },
  horario: {
    horas: [
      {
        dia: {
          type: String,
        },
        inicio: {
          type: Date,
        },
        fin: {
          type: Date,
        },
      },
    ],
  },
  fechas: {
    inscripcion: {
      inicio: {
        type: Date,
      },
      fin: {
        type: Date,
      },
    },
    cursada: {
      inicio: {
        type: Date,
      },
      fin: {
        type: Date,
      },
    },
  },
  cuatrimestre: {
    type: Number,
    required: true,
  },
  usuarios: [
    {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: false,
    },
  ],
  estado: {
    type: Boolean,
    default: true,
  },
});

CursoSchema.methods.toJSON = function () {
  const { __v, _id, ...curso } = this.toObject();
  curso.uid = _id;
  return curso;
};

module.exports = model("Curso", CursoSchema);
