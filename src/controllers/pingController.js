const createConnection = require("../models/db");

module.exports.ping = async (req, res) => {
  const consult = "SELECT * FROM user";
  const connection = createConnection(); // Crea una nueva conexión

  try {
    connection.query(consult, (err, result) => {
      if (err) {
        console.error("Error ejecutando la consulta:", err.message);
        return res.status(500).json({ error: "Error ejecutando la consulta" });
      }
      res.json(result);
    });
  } catch (err) {
    console.error("Error en el controlador:", err.message);
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
  } finally {
    connection.end((err) => {
      if (err) console.error("Error cerrando la conexión:", err.message);
    });
  }
};

