const createConnection = require("../../models/db");

module.exports.getAllCourses = async (req, res) => {
  const consult = "SELECT c.course_id , CONCAT(u.first_name,' ', u.last_name) AS 'teacher',c.title,c.meet AS 'link_meet',u.email AS 'teacher_email', cs.name AS 'course_status' FROM `courses`.`course` AS c INNER JOIN `courses`.`user` AS u ON u.user_id = c.teacher_user_id INNER JOIN `courses`.`course_status` AS cs ON c.course_status_id = cs.course_status_id;";
  const connection = createConnection(); // Crea una nueva conexión
  try {
    connection.query(consult, (err, result) => {
      if (err) {
        console.error("Error ejecutando la consulta:", err.message);
        return res.status(500).json({ error: "Error ejecutando la consulta" });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    console.error("Error en el controlador: ", err.message);
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
  } finally {
    connection.end((err) => {
      if (err) console.error("Error cerrando la conexión:", err.message);
    });
  }
};

module.exports.getByID = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Bad Request" });
  }

  if (id === 0) {
    return res.status(404).json({ message: "Not found" });
  }

  const consult = "SELECT c.course_id , CONCAT(u.first_name,' ', u.last_name) AS 'teacher',c.title,c.meet AS 'link_meet',u.email AS 'teacher_email', cs.name AS 'course_status' FROM `courses`.`course` AS c INNER JOIN `courses`.`user` AS u ON u.user_id = c.teacher_user_id INNER JOIN `courses`.`course_status` AS cs ON c.course_status_id = cs.course_status_id WHERE course_id = ?;";
  const connection = createConnection(); // Crea una nueva conexión

  try {
    connection.query(consult, [id], (err, result) => {
      if (err) {
        console.error("Error ejecutando la consulta:", err.message);
        return res.status(500).json({ error: "Error ejecutando la consulta" });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ error: "Not found" });
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
