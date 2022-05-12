const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario.models");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-api-key");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Se require un token válido para la petición." });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    //Verifico si el usuario existe
    if (!usuario) {
      return res.status(401).json({ msg: "Token no valido" });
    }

    //Verifico si el usuario tiene el estado en true
    if (!usuario.estado) {
      return res.status(401).json({ msg: "Token no valido" });
    }

    req.usuario = usuario;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token no válido." });
  }
};

module.exports = {
  validateJWT,
};
