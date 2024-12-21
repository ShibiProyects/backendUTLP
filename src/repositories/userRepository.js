const createConnection = require("../models/db");

class UserRepository {
    constructor() {
        this.connection = createConnection();
    }

    /**
     *
     * @param email
     * @returns {Promise<{user_id, hash, roles}|null>}
     */
    async getByEmailWithRoles(email) {
        const query = 'SELECT user_id, password as hash,GROUP_CONCAT(role.name) AS roles FROM user INNER JOIN user_role ON user_role.user_user_id = user.user_id INNER JOIN role ON role.role_id = user_role.role_role_id WHERE email = ? GROUP BY `user`.user_id, `user`.`password`;';
        return new Promise((resolve, reject) => {
            this.connection.query(query, [email], (err, results) => {

                if (err) {
                    return reject(err);
                }
                resolve(results[0] || null);
            });
        });
    }

    async getById(id) {
        const query = 'SELECT first_name,last_name,email,username FROM user WHERE user_id = ?';
        return new Promise((resolve, reject) => {
            this.connection.query(query, [id], (err, results) => {

                if (err) {
                    return reject(err);
                }
                resolve(results[0] || null);
            })
        })
    }

    async getByIdWithCourses(id) {
        const query = 'SELECT course.title ,student_status.`name` AS student_status,cs.name AS `course status` FROM `courses`.`student_has_course` AS student INNER JOIN `courses`.`course` ON course.course_id = student.course_id INNER JOIN `courses`.`course_status` AS cs ON cs.course_status_id = `courses`.course .course_status_id INNER JOIN `courses`.`student_course_status` AS student_status ON student_status.student_course_status_id = student.status_id WHERE user_id = ?;';
        return new Promise((resolve, reject) => {
            this.connection.query(query, [id], (err, results) => {

                if (err) {
                    return reject(err);
                }
                resolve(results);
            })
        })
    }

    async getByIdTeacherId(id) {
        const query = 'SELECT course.title ,student_status.`name` AS student_status,cs.name AS `course status` FROM `courses`.`student_has_course` AS student INNER JOIN `courses`.`course` ON course.course_id = student.course_id INNER JOIN `courses`.`course_status` AS cs ON cs.course_status_id = `courses`.course .course_status_id INNER JOIN `courses`.`student_course_status` AS student_status ON student_status.student_course_status_id = student.status_id WHERE `courses`.`course`.teacher_user_id = ?;';
        return new Promise((resolve, reject) => {
            this.connection.query(query, [id], (err, results) => {

                if (err) {
                    return reject(err);
                }
                resolve(results);
            })
        })
    }

    async create(firstName, lastName, email, username, hash) {
        const query = `INSERT INTO user (first_name, last_name, email, username, password)
                       VALUES (?, ?, ?, ?, ?);`;
        return new Promise((resolve, reject) => {
            this.connection.query(query, [firstName, lastName, email, username, hash], (err, results) => {

                if (err) {
                    return reject(err);
                }
                resolve(results[0] || null);
            })
        })
    }

    async update(firstName, lastName, email, username, hash, id) {

    }

    async softDelete(id) {
    }
}

module.exports = UserRepository;