const { Schema, model } = require("mongoose");

const NotaSchema = Schema({
  parciales: {
    1: { type: Number },
    2: { type: Number },
  },
  recuperatorios: {
    1: { type: Number },
    2: { type: Number },
  },
  curso: {
    type: Schema.Types.ObjectId,
    ref: "Curso",
  },
  alumno: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  updateAt: {
    type: Date,
    required: false,
  },
  estado_curso: {
    type: String,
    default: "regular",
    uppercase: true,
  },
});

NotaSchema.methods.toJSON = function () {
  const { __v, _id, ...nota } = this.toObject();
  nota.uid = _id;
  return nota;
};

module.exports = model("Nota", NotaSchema);
