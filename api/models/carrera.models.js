const { Schema, model } = require("mongoose");

const CarreraSchema = Schema({
  descripcion: {
    type: String,
    required: true,
    unique: true,
  },
  horas_totales: {
    type: Number,
    required: Number,
  },
  cupo: {
    max: { type: Number, required: true },
    min: { type: Number, required: true },
  },
  duracion: {
    type: String,
    required: true,
  },
  mensualidad: {
    type: Number,
    default: 0,
  },
  nivel: {
    type: String,
    uppercase: true,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

CarreraSchema.methods.toJSON = function () {
  const { __v, _id, ...carrera } = this.toObject();
  carrera.uid = _id;
  return carrera;
};

module.exports = model("Carrera", CarreraSchema);
