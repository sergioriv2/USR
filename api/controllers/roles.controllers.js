const Rol = require("../models/roles.models");

const postRol = async (req, res) => {
  try {
    const { descripcion } = req.body;

    const desc = descripcion.toUpperCase();

    const existe = await Rol.findOne({ descripcion: desc });

    if (existe)
      return res
        .status(400)
        .json({ msg: "El rol ya existe en la base de datos." });

    const rol = new Rol({ descripcion: desc });
    await rol.save();

    return res.status(200).json({ rol });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Error interno",
    });
  }
};

module.exports = {
  postRol,
};
