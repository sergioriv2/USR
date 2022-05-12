const { Schema, model } = require("mongoose");

const DeudaSchema = Schema({
  alumno: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  carrera: {
    type: Schema.Types.ObjectId,
    ref: "Carrera",
    required: true,
  },
  detalles: [
    {
      fecha: { type: Date, required: true },
      descripcion: { type: String, required: true },
      tipo_pago: { type: String, enum: ["MATRICULA, CUOTA"], required: true },
      monto_a_cobrar: { type: Number, required: true },
      monto_pagado: { type: Number, default: 0 },
      estado_pago: {
        type: String,
        enum: ["PAGADO", "SIN PAGAR", "PAGADO PARCIALMENTE"],
        required: true,
      },
    },
  ],
  deuda_acumulada: {
    type: Number,
    default: 0,
  },
  estado_deuda: {
    type: String,
    enum: ["LIBRE DEUDA", "SIN LIBRE DEUDA"],
    default: "LIBRE DEUDA",
  },
});

DeudaSchema.methods.toJSON = function () {
  const { __v, _id, ...deuda } = this.toObject();
  deuda.uid = _id;
  return pago;
};

module.exports = model("Deuda", DeudaSchema);
