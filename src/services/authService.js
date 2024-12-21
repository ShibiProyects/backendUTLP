const UserRepository = require("../repositories/userRepository");
const {Result} = require("../library/result");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, "./config/.env")});

class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     *
     * @param {string} email
     * @param {string}password
     * @returns {Promise<Result>}
     */
    async login(email, password) {
        const result = await this.userRepository.getByEmailWithRoles(email);

        if (!result) {
            return Result.validationError('Email or passwords do not match.');
        }

        const {user_id, hash, roles} = result;

        if (!bcrypt.compareSync(password, hash)) {
            return Result.validationError('Email or passwords do not match.');
        }

        const token = jwt.sign({id: user_id, roles: roles.split(",")}, process.env.JWT_SECRET, {expiresIn: '2h'});

        return Result.success(token);
    }
}

module.exports = AuthService;