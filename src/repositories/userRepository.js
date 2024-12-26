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

    async getUserProfile(id) {
        const query = `SELECT CONCAT(u.first_name, ' ', u.last_name)                                AS fullname,
                              u.email,
                              u.username,
                              r.name                                                                AS rol,
                              GROUP_CONCAT(scs.name SEPARATOR ', ')                                 AS studentCourseStatus,
                              GROUP_CONCAT(CONCAT(ut.first_name, ' ', ut.last_name) SEPARATOR ', ') AS teacher,
                              GROUP_CONCAT(c.description SEPARATOR ', ')                            AS description,
                              GROUP_CONCAT(c.title SEPARATOR ', ')                                  AS title,
                              GROUP_CONCAT(c.meet SEPARATOR ', ')                                   AS meet,
                              GROUP_CONCAT(cs.name SEPARATOR ', ')                                  AS courseStatus
                       FROM user u
                                LEFT JOIN student_has_course shc ON shc.user_id = u.user_id
                                LEFT JOIN student_course_status scs ON scs.student_course_status_id = shc.status_id
                                LEFT JOIN course c ON c.course_id = shc.course_id
                                LEFT JOIN course_status cs ON cs.course_status_id = c.course_status_id
                                LEFT JOIN user ut ON ut.user_id = c.teacher_user_id
                                LEFT JOIN user_role ur ON ur.user_user_id = u.user_id
                                LEFT JOIN role r ON r.role_id = ur.role_role_id
                       WHERE u.user_id = ?;`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, [id], (err, results) => {

                if (err) {
                    return reject(err);
                }
                resolve(results[0] || null);
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