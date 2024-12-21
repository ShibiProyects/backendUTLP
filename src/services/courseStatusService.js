const courseStatusRepository = require('../repositories/courseStatusRepository');
const {Result} = require("../library/result");

class CourseStatusService {
    constructor() {
        this.courseStatusRepository = new courseStatusRepository()
    }

    async getAll() {
        return Result.success(await this.courseStatusRepository.getAll());
    }

    async getById(id) {
        const result = await this.courseStatusRepository.getById(id);

        if (!result) {
            throw new Error("Unexpected result");
        }

        if (result.length === 0) {
            return Result.notFound("Not Found");
        }

        return Result.success(result);
    }

    async create(name) {
        const result = await this.courseStatusRepository.create(name);

        if (!result) {
            throw new Error("Unexpected result");
        }

        return Result.success("Success create course status");
    }

    async update(name, id) {
        const result = await this.courseStatusRepository.update(name, id);

        if (!result) {
            throw new Error("Unexpected result");
        }

        return Result.success("Success update course status");
    }
}

module.exports = CourseStatusService;