const createConnection = require("../models/db");

class CourseRepository {
    constructor() {
        this.connection = createConnection();
    }

    async getAll() {
        const query = "SELECT c.course_id , CONCAT(u.first_name,' ', u.last_name) AS 'teacher',c.title,c.meet AS 'link_meet',u.email AS 'teacher_email', cs.name AS 'course_status' FROM `courses`.`course` AS c INNER JOIN `courses`.`user` AS u ON u.user_id = c.teacher_user_id INNER JOIN `courses`.`course_status` AS cs ON c.course_status_id = cs.course_status_id;";
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

    async getById(id) {
        const query = "SELECT c.course_id , CONCAT(u.first_name,' ', u.last_name) AS 'teacher',c.title,c.meet AS 'link_meet',u.email AS 'teacher_email', cs.name AS 'course_status' FROM `courses`.`course` AS c INNER JOIN `courses`.`user` AS u ON u.user_id = c.teacher_user_id INNER JOIN `courses`.`course_status` AS cs ON c.course_status_id = cs.course_status_id WHERE course_id = ?;";
        return new Promise((resolve, reject) => {
            this.connection.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

    async create(teacher_id, course_status, title, description, link_meet) {
        const query = 'INSERT INTO `courses`. course(teacher_user_id, course_status_id, title, description, meet) VALUE (?,?,?,?,?);';
        return new Promise((resolve, reject) => {
            this.connection.query(query, [teacher_id, course_status, title, description, link_meet], (err, results) => {
                if (err) {
                    return reject(err);
                }
                //Devuelve un 'insertId' y otros datos mas.
                resolve(results);
            });
        })
    }

    async update(teacher_id, course_status, title, description, link_meet, id) {
        const query = 'UPDATE `courses`.course SET teacher_user_id=?, course_status_id=?,title=?,description=?,meet=? WHERE course_id = ?;';
        return new Promise((resolve, reject) => {
            this.connection.query(query, [teacher_id, course_status, title, description, link_meet, id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

    async delete() {
    }
}

module.exports = CourseRepository;