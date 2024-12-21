const RoleRepository = require("../repositories/RoleRepository");
const {Result} = require("../library/result");

class RoleService {
    constructor() {
        this.roleRepository = new RoleRepository();
    }

    async getAll() {
        return Result.success(await this.roleRepository.getAll());
    }

    async getById(id) {
        return Result.success(await this.roleRepository.getById(id));
    }

    async create(name) {
        name = name.trim();

        if (name.length === 0) {
            return Result.validationError("Empty name");
        }

        const result = await this.roleRepository.create(name);
        if (!result) {
            throw new Error("Unexpected result");
        }
        return Result.success("Success create role");
    }

    async update(name, id) {
        name = name.trim();

        if (name.length === 0) {
            return Result.validationError("Empty name");
        }

        const result = await this.roleRepository.update(name, id);

        if (!result) {
            throw new Error("Unexpected result");
        }
        return Result.success("Success update role");
    }

    async delete(id) {
        const result = await this.roleRepository.delete(id);
    }
}

module.exports = RoleService;