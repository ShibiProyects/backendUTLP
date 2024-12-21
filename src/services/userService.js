const UserRepository = require("../repositories/userRepository");
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getById(id) {
        const result = await this.userRepository.getById(id);
    }

    async getByIdWithCourses(id) {
        const result = await this.userRepository.getByIdWithCourses(id);

    }

    async create(firstName, lastName, email, username, password) {
        const hash = bcrypt.hashSync(password, 3);

        if (!hash || hash.trim().length === 0) {
            throw new Error('Hash is empty, null, or contains only whitespace');
        }

        const result = await this.userRepository.create(firstName, lastName, email, username, hash);
    }

    async update(firstName, lastName, email, username, password, id) {
        const hash = bcrypt.hashSync(password, 3);

        if (!hash || hash.trim().length === 0) {
            throw new Error('Hash is empty, null, or contains only whitespace');
        }

        const result = await this.userRepository.update(firstName, lastName, email, username, hash, id);

    }

}

module.exports = UserService;