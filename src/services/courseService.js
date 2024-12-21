const CourseRepository = require("../repositories/courseRepository");
const {Result} = require("../library/result");

class CourseService {
    constructor() {
        this.courseRepository = new CourseRepository();
    }

    async getAll() {
        return Result.success(await this.courseRepository.getAll());
    }

    async getById(id) {
        const result = await this.courseRepository.getById(id);

        if (!result) {
            throw new Error("Unexpected result");
        }

        if (result.length === 0) {
            return Result.notFound("Not Found");
        }

        return Result.success(result);
    }

    async create(teacher_id, course_status, title, description, link_meet) {
        const result = await this.courseRepository.create(teacher_id, course_status, title, description, link_meet);

        if (!result) {
            throw new Error("Unexpected result");
        }
        return Result.success("Success create course");
    }

    async update(teacher_id, course_status, title, description, link_meet, id) {
        const result = await this.courseRepository.update(teacher_id, course_status, title, description, link_meet, id);

        if (!result) {
            throw new Error("Unexpected result");
        }
        return Result.success("Success update course");
    }
}

module.exports = CourseService;