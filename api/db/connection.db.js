const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODBCNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos en linea");
  } catch (err) {
    console.log(err);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = connection;
