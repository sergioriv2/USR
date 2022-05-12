const { Schema, model } = require("mongoose");

const RolSchema = Schema({
  descripcion: {
    type: String,
    required: true,
  },
});

RolSchema.methods.toJSON = function () {
  const { __v, _id, ...rol } = this.toObject();
  rol.uid = _id;
  return rol;
};

module.exports = model("Role", RolSchema);
