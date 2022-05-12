const Usuario = require("../models/usuario.models");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const putImagenColeccion = async (req, res) => {
  const { id, coleccion } = req.params;

  try {
    let modelo;

    switch (coleccion) {
      case "usuarios":
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`,
          });
        }

        break;

      default:
        return res.status(500).json({ msg: "Error al validar la coleccion" });
    }

    // Limpiar imágenes previas
    if (modelo.img) {
      const nombreArr = modelo.img.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();

    return res.status(200).json({ msg: "Imagen subida correctamente." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error interno." });
  }
};

module.exports = {
  putImagenColeccion,
};
