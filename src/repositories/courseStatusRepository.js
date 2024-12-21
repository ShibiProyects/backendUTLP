const createConnection = require("../models/db");

class CourseStatusRepository {
    constructor() {
        this.connection = createConnection();
    }

    async getAll() {
        const query = "SELECT `course_status_id` as course_status_id,`name` as course_status_name FROM `courses`.`course_status`;";
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
        const query = "SELECT `course_status_id` as course_status_id,`name` as course_status_name FROM `courses`.`course_status` AS cs WHERE cs.course_status_id = ?;";
        return new Promise((resolve, reject) => {
            this.connection.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

    async create(name) {
        const query = 'INSERT INTO `courses`. course_status(name) VALUE (?);';
        return new Promise((resolve, reject) => {
            this.connection.query(query, [name], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        })
    }

    async update(name, id) {
        const query = 'UPDATE `courses`.course_status SET name=? WHERE course_status_id= ?;';
        return new Promise((resolve, reject) => {
            this.connection.query(query, [name, id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        })
    }
}

module.exports = CourseStatusRepository;