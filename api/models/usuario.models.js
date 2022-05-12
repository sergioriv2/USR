const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombres: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  sexo: {
    type: String,
    required: false,
  },
  apellidos: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fecha_alta: {
    type: Date,
    required: true,
  },
  fecha_nacimiento: {
    type: Date,
    required: true,
  },
  domicilio: {
    type: String,
    required: false,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    required: true,
  },
  carreras: [
    {
      type: Schema.Types.ObjectId,
      ref: "Carrera",
      required: false,
    },
  ],
  lastSeen: {
    cursos: [
      {
        uid: {
          type: Schema.Types.ObjectId,
          ref: "Curso",
          unique: true,
        },
        fecha: {
          type: Date,
          required: true,
        },
        required: false,
      },
    ],
    notas: [
      {
        uid: {
          type: Schema.Types.ObjectId,
          ref: "Nota",
          required: true,
        },
        fecha: {
          type: Date,
          required: true,
        },
        required: false,
      },
    ],
    materias: [
      {
        uid: {
          type: Schema.Types.ObjectId,
          ref: "Materia",
          required: true,
        },
        fecha: {
          type: Date,
          required: true,
        },
        required: false,
      },
    ],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
