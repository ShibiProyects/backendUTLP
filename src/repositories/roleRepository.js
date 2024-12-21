const createConnection = require("../models/db");

class RoleRepository {
    constructor() {
        this.connection = createConnection();
    }

    async getAll() {
        const query = `SELECT role_id AS id, name
                       FROM role`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            })
        })
    }

    async getById(id) {
        const query = `SELECT role_id AS id, name
                       FROM role
                       where role_id = ?;`
        return new Promise((resolve, reject) => {
            this.connection.query(query, [id], (err, results) => {

                if (err) {
                    return reject(err);
                }

                resolve(results);
            })
        })
    }

    async create(name) {
        const query = `INSERT INTO role(name)
                       VALUES (?);`;
        return new Promise((resolve, reject) => {
            this.connection.query(query, [name], (err, results) => {

                if (err) {
                    return reject(err);
                }

                resolve(results);
            })
        })
    }

    async update(name, id) {
        const query = `UPDATE role
                       SET name = ?
                       WHERE role_id = ?;`;
        return new Promise((resolve, reject) => {
            this.connection.query(query, [name,id], (err, results) => {

                if (err) {
                    return reject(err);
                }

                resolve(results);
            })
        })
    }

    async delete() {
    }
}

module.exports = RoleRepository;