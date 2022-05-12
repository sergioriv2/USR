require("dotenv").config();

const Server = require("./models/server.models");

const server = new Server();

server.listen();
