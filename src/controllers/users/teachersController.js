const createConnection = require("../../models/db");

module.exports.getAllTeacherCoursesByID = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Bad Request" });
    }

    if (id === 0) {
        return res.status(404).json({ message: "Not found" });
    }

    const consult = 'SELECT course.title ,student_status.`name` AS student_status,cs.name AS `course status` FROM `courses`.`student_has_course` AS student INNER JOIN `courses`.`course` ON course.course_id = student.course_id INNER JOIN `courses`.`course_status` AS cs ON cs.course_status_id = `courses`.course .course_status_id INNER JOIN `courses`.`student_course_status` AS student_status ON student_status.student_course_status_id = student.status_id WHERE `courses`.`course`.teacher_user_id = ?;';
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
                    .json({ message: "Not found"  });
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
}
