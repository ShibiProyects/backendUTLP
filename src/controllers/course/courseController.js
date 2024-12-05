const createConnection = require("../../models/db");

module.exports.getAllCourses = async (req, res) => {
    const consult = "SELECT c.course_id , CONCAT(u.first_name,' ', u.last_name) AS 'teacher',c.title,c.meet AS 'link_meet',u.email AS 'teacher_email', cs.name AS 'course_status' FROM `courses`.`course` AS c INNER JOIN `courses`.`user` AS u ON u.user_id = c.teacher_user_id INNER JOIN `courses`.`course_status` AS cs ON c.course_status_id = cs.course_status_id;";
    const connection = createConnection(); // Crea una nueva conexión
    try {
        connection.query(consult, (err, result) => {
            if (err) {
                console.error("Error ejecutando la consulta:", err.message);
                return res.status(500).json({error: "Error ejecutando la consulta"});
            }
            res.status(200).json(result);
        });
    } catch (err) {
        console.error("Error en el controlador: ", err.message);
        res.status(500).json({error: "Ocurrió un error en el servidor"});
    } finally {
        connection.end((err) => {
            if (err) console.error("Error cerrando la conexión:", err.message);
        });
    }
};

module.exports.getByID = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "Bad Request"});
    }

    if (id === 0) {
        return res.status(404).json({message: "Not found"});
    }

    const consult = "SELECT c.course_id , CONCAT(u.first_name,' ', u.last_name) AS 'teacher',c.title,c.meet AS 'link_meet',u.email AS 'teacher_email', cs.name AS 'course_status' FROM `courses`.`course` AS c INNER JOIN `courses`.`user` AS u ON u.user_id = c.teacher_user_id INNER JOIN `courses`.`course_status` AS cs ON c.course_status_id = cs.course_status_id WHERE course_id = ?;";
    const connection = createConnection(); // Crea una nueva conexión

    try {
        connection.query(consult, [id], (err, result) => {
            if (err) {
                console.error("Error ejecutando la consulta:", err.message);
                return res.status(500).json({error: "Error ejecutando la consulta"});
            }
            if (result.length === 0) {
                return res
                    .status(404)
                    .json({error: "Not found"});
            }
            res.json(result);
        });
    } catch (err) {
        console.error("Error en el controlador:", err.message);
        res.status(500).json({error: "Ocurrió un error en el servidor"});
    } finally {
        connection.end((err) => {
            if (err) console.error("Error cerrando la conexión:", err.message);
        });
    }
};


module.exports.createCourse = (req, res) => {
    const {teacher_id, course_status, title, description = null, link_meet} = req.body;

    if (!title || title.trim().length === 0 || !link_meet || link_meet.trim().length === 0) {
        return res.status(422).json({error: "Unprocessable Entity"});
    }

    if (!Number.isInteger(teacher_id) || !Number.isInteger(course_status)) {
        return res.status(422).json({error: "Unprocessable Entity"});
    }

    if (teacher_id === 0 || course_status === 0) {
        return res.status(422).json({error: "Unprocessable Entity"});
    }

    const consult = 'INSERT INTO `courses`. course(teacher_user_id, course_status_id, title, description, meet) VALUE (?,?,?,?,?);';
    const connection = createConnection();

    try {
        connection.query(consult, [teacher_id, course_status, title, description, link_meet], (err, result) => {
            if (err) {
                console.error("Error ejecutando la consulta:", err.message);
                return res.status(500).json({error: "Internal server error"});
            }
            return res.status(201).json({message: "Success create course"});
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports.updateCourse = (req, res) => {
    const {teacher_id, course_status, title, description = null, link_meet} = req.body;
    const id = Number(req.params.id);

    if (!title || title.trim().length === 0 || !link_meet || link_meet.trim().length === 0) {
        return res.status(422).json({error: "Unprocessable Entity"});
    }

    if (!Number.isInteger(teacher_id) || !Number.isInteger(course_status) || !Number.isInteger(id)) {
        return res.status(422).json({error: "Unprocessable Entity"});
    }

    if (teacher_id === 0 || course_status === 0 || id === 0) {
        return res.status(422).json({error: "Unprocessable Entity"});
    }

    const consult = 'UPDATE `courses`.course SET teacher_user_id=?, course_status_id=?,title=?,description=?,meet=? WHERE course_id = ?;';
    const connection = createConnection();

    try {
        connection.query(consult, [teacher_id, course_status, title, description, link_meet,id], (err, result) => {
            if (err) {
                console.error("Error ejecutando la consulta:", err.message);
                return res.status(500).json({error: "Internal server error"});
            }
            return res.status(200).json({message: "Success update course"});
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: "Internal server error"});
    }
}