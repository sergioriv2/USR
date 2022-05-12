const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const connection = require("../db/connection.db");

class Server {
  constructor() {
    //Propiedades

    this.app = express();
    this.port = process.env.PORT;
    this.endpoints = {
      auth: "/api/auth",
      roles: "/api/roles",
      usuarios: "/api/usuarios",
      alumnos: "/api/alumnos",
      profesores: "/api/docentes",
      carreras: "/api/carreras",
      materias: "/api/materias",
      cursos: "/api/cursos",
      notas: "/api/notas",
      stats: "/api/stats",
      pagos: "/api/pagos", //TODO
      uploads: "/api/uploads",
    };

    //Metodos iniciales =================================================================
    this.dbConecction();
    this.middlewares();
    this.routes();
  }

  async dbConecction() {
    await connection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Lectura y escritura en json
    this.app.use(express.json());

    //File upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  routes() {
    this.app.use(this.endpoints.auth, require("../routes/auth.routes"));

    this.app.use(this.endpoints.roles, require("../routes/roles.routes"));

    this.app.use(this.endpoints.alumnos, require("../routes/alumnos.routes"));

    this.app.use(
      this.endpoints.profesores,
      require("../routes/profesores.routes")
    );

    this.app.use(this.endpoints.carreras, require("../routes/carreras.routes"));

    this.app.use(this.endpoints.materias, require("../routes/materias.routes"));

    this.app.use(this.endpoints.cursos, require("../routes/cursos.routes"));

    this.app.use(this.endpoints.notas, require("../routes/notas.routes"));

    this.app.use(this.endpoints.pagos, require("../routes/pagos.routes"));

    this.app.use(this.endpoints.stats, require("../routes/stats.routes"));

    this.app.use(this.endpoints.usuarios, require("../routes/usuarios.routes"));

    this.app.use(this.endpoints.uploads, require("../routes/uploads.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Aplicacion en el puerto " + this.port);
    });
  }
}

module.exports = Server;
