const validateAdmin = async (req, res, next) => {
  //Verifico si el token ya existe
  if (!req.usuario) {
    return res.status(500).json({ msg: "Invalid Token." });
  }
  const { rol } = req.usuario;

  //Verifico el token que se manda
  if (rol !== "ADMIN") {
    return res.status(401).json({ msg: "Access Denied. Verify your API Key." });
  }

  next();
};

const validateTeacher = async (req, res, next) => {
  //Verifico si el token ya existe
  if (!req.usuario) {
    return res.status(500).json({ msg: "Invalid Token." });
  }
  const { rol } = req.usuario;

  //Verifico el token que se manda

  if (rol !== "DOCENTE" && rol !== "ADMIN") {
    return res.status(401).json({ msg: "Access Denied. Verify your API Key." });
  }

  next();
};

const validateStudent = async (req, res, next) => {
  //Verifico si el token ya existe
  if (!req.usuario) {
    return res.status(500).json({ msg: "Invalid Token." });
  }
  const { rol } = req.usuario;

  //Verifico el token que se manda
  if (rol !== "ALUMNO" && rol !== "ADMIN") {
    return res.status(401).json({ msg: "Access Denied. Verify your API Key." });
  }

  next();
};

module.exports = {
  validateAdmin,
  validateTeacher,
  validateStudent,
};
