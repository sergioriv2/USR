const { Schema, model } = require("mongoose");

const MateriaSchema = Schema({
  nombre: {
    type: String,
    unique: true,
    required: true,
  },
  carreras: [
    {
      type: Schema.Types.ObjectId,
      ref: "Carrera",
      required: true,
    },
  ],
  correlativas: [
    { type: Schema.Types.ObjectId, ref: "Materia", required: false },
  ],
  estado: {
    type: Boolean,
    default: true,
  },
});

MateriaSchema.methods.toJSON = function () {
  const { __v, _id, ...materia } = this.toObject();
  materia.uid = _id;
  return materia;
};

module.exports = model("Materia", MateriaSchema);
