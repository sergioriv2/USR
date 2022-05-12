const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.models");
const { generateJWT } = require("../helpers");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res
        .status(400)
        .json({ msg: "Email o contraseña incorrectos.", ok: false });
    }

    //Verificar el estado del usuario
    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: "Email o contraseña incorrectos.", ok: false });
    }

    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: "Email o contraseña incorrectos.", ok: false });
    }

    //Generar JWT
    const token = await generateJWT(usuario.id);

    return res.json({ ok: true, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Error interno",
      ok: false,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { nombres, apellidos, rol, _id, img } = req.usuario;

    const user = { nombres, apellidos, rol, _id, img };

    return res.json({ results: user, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error.", ok: false });
  }
};

const getCarreras = async (req, res) => {
  const { usuario } = req.params;

  try {
    const { carreras } = await Usuario.findOne({ _id: usuario, estado: true })
      .select("carreras")
      .populate({
        path: "carreras",
        select: "descripcion _id",
      });

    if (!carreras) {
      return res.status(404).json({ msg: "El usuario no existe.", ok: false });
    }

    return res.status(200).json({ results: carreras, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error.", ok: false });
  }
};

const postUser = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      dni,
      domicilio,
      email,
      sexo,
      password,
      fecha_nacimiento,
      carrera,
      rol,
    } = req.body;

    //Verifico si existe
    const existe = await Usuario.findOne({ email });

    //Si ya existe retorno mensaje de error
    if (existe) {
      return res
        .status(400)
        .json({ msg: "El email ya está en uso, intenta usando otro." });
    }

    const user = new Usuario({
      nombres,
      apellidos,
      dni,
      domicilio,
      sexo,
      fecha_alta: Date.now(),
      email,
      password,
      fecha_nacimiento,
      carreras: [carrera],
      rol,
      img: "https://res.cloudinary.com/dcd14hpmu/image/upload/v1648842532/avatar-placeholder_plgdbd.jpg",
    });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    return res.json({
      ok: true,
      msg: "El usuario se dió de alta con éxito.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error.", ok: false });
  }
};

const putUser = async (req, res) => {
  try {
    const { user } = req.params;

    const {
      nombres,
      apellidos,
      dni,
      domicilio,
      email,
      password,
      fecha_nacimiento,
      carreras,
      lastSeen,
      sexo,
    } = req.body;

    //Verifico si existe
    const newUser = await Usuario.findOne({ _id: user, estado: true });

    //Si no existe retorno mensaje de error
    if (!newUser) {
      return res
        .status(400)
        .json({ msg: "El usuario no existe en la base de datos.", ok: false });
    }

    const salt = bcrypt.genSaltSync();
    if (password) newUser.password = bcrypt.hashSync(password, salt);

    if (nombres) newUser.nombres = nombres;
    if (apellidos) newUser.apellidos = apellidos;
    if (dni) newUser.dni = dni;
    if (domicilio) newUser.domicilio = domicilio;
    if (email) newUser.email = email;
    if (fecha_nacimiento) newUser.fecha_nacimiento = fecha_nacimiento;
    if (carreras) {
      newUser.carreras.push(carreras);
    }
    if (lastSeen) newUser.lastSeen = lastSeen;
    if (sexo) newUser.sexo = sexo;

    await newUser.save();

    return res.json({
      ok: true,
      msg: "El usuario se actualizó con éxito.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error.", ok: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req.params;
    const newUser = await Usuario.findOne({
      _id: user,
      estado: true,
    });

    if (!newUser)
      return res
        .status(404)
        .json({ msg: "El usuario no existe en la base de datos.", ok: true });

    newUser.estado = false;

    await newUser.save();

    res.json({ ok: true, msg: "El usuario se dió de baja con éxito." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error.", ok: false });
  }
};

const getLastSeen = async (req, res) => {
  try {
    const { user } = req.params;

    const newUser = await Usuario.findOne({
      _id: user,
      estado: true,
    })
      .select("lastSeen")
      .populate({ path: "lastSeen.cursos.uid", select: "nombre" })
      .populate({ path: "lastSeen.materias.uid", select: "nombre" });

    if (!newUser) {
      return res
        .status(404)
        .json({ msg: "El usuario no existe en la base de datos.", ok: false });
    }

    return res.status(200).json({ results: newUser.lastSeen, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error.", ok: false });
  }
};

module.exports = {
  login,
  getUser,
  putUser,
  getLastSeen,
  postUser,
  deleteUser,
  getCarreras,
};
