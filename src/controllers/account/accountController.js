const createConnection = require("../../models/db");

const bcrypt = require('bcrypt');

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

module.exports.create = (req, res) => {
    const { firstName, lastName, email, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res
            .status(422)
            .json({ message: 'Password no coinciden.' });
    }

    const consult = `INSERT INTO user (first_name, last_name, email, username, password)
                    VALUES (?, ?, ?, ?, ?);`;
    const connection = createConnection();
    try {
        const hash = bcrypt.hashSync(password, 3);
        connection.query(
            consult,
            [firstName, lastName, email, username, hash],
            (err) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res
                            .status(400)
                            .json({ message: "Email or username already exists." });
                    }
                    return res
                        .status(500)
                        .json({ message: "Internal server error", error: err });
                }

                return res.status(201).json({
                    message: "User registered successfully",
                });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

function getUserCourses(req,res,id){

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Bad Request" });
    }

    if (id === 0) {
        return res.status(404).json({ message: "Not found" });
    }

    const consult = 'SELECT course.title ,student_status.`name` AS student_status,cs.name AS `course status` FROM `courses`.`student_has_course` AS student INNER JOIN `courses`.`course` ON course.course_id = student.course_id INNER JOIN `courses`.`course_status` AS cs ON cs.course_status_id = `courses`.course .course_status_id INNER JOIN `courses`.`student_course_status` AS student_status ON student_status.student_course_status_id = student.status_id WHERE user_id = ?;';
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

module.exports.getAllUserCoursesByID = (req, res) => {
    const id = Number(req.params.id);
    getUserCourses(req,res,id);
};
module.exports.getAllMyUserCourses = (req, res) => {
    console.log(req.user)
    
    const id = req.user?.id;
    getUserCourses(req,res,id);
};

module.exports.getAllTeacherCoursesByID = (req, res) => {
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