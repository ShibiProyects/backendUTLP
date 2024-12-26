const UserRepository = require("../repositories/userRepository");
const bcrypt = require('bcrypt');
const {Result} = require("../library/result");
const HashHelper = require('../Helper/HashHelper');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getById(id) {
        const result = await this.userRepository.getById(id);

        if (!result) {
            throw new Error("Unexpected result");
        }

        if (result.length === 0) {
            return Result.notFound("Not Found");
        }

        return Result.success(result);
    }

    async getByIdWithCourses(id) {
        const result = await this.userRepository.getByIdWithCourses(id);

        if (!result) {
            throw new Error("Unexpected result");
        }

        if (result.length === 0) {
            return Result.notFound("Not Found");
        }

        return Result.success(result);
    }

    async getByIdTeacherId(id) {
        const result = await this.userRepository.getByIdTeacherId(id);

        if (!result) {
            throw new Error("Unexpected result");
        }

        if (result.length === 0) {
            return Result.notFound("Not Found");
        }

        return Result.success(result);
    }

    async getUserProfile(id) {
        const result = await this.userRepository.getUserProfile(id);

        if (!result || !result.fullname) {
            return Result.notFound("Not Found");
        }
        let courses = []

        if(result.studentCourseStatus){
            let studentCourseStatus = result.studentCourseStatus?.split(', ');
            let teachers = result.teacher?.split(', ');
            let descriptions = result.description ? result.description.split(', ') : [];
            let titles = result.title?.split(', ');
            let meet = result.meet?.split(', ');
            let courseStatus = result.courseStatus?.split(', ');


            studentCourseStatus?.forEach((element, index) => {
                courses.push({
                    studentCourseStatus: studentCourseStatus[index],
                    teachers: teachers[index],
                    descriptions: descriptions[index] ?? null,
                    titles: titles[index],
                    meet: meet[index],
                    courseStatus: courseStatus[index]
                });
            })
        }

        let finalResult = {
            fullName: result.fullname,
            email: result.email,
            username: result.username,
            rol: result.rol,
            courses: courses
        };
        return Result.success(finalResult);
    }

    async create(firstName, lastName, email, username, password) {
        const hash = await HashHelper(password);

        try {
            const result = await this.userRepository.create(firstName, lastName, email, username, hash);

            if (!result) {
                throw new Error("Unexpected result");
            }

            return Result.success(result);
        } catch (err) {
            if (err.sqlState === '23000') {
                const field = err.sqlMessage.match(/for key '(.+)'/)?.[1];
                return Result.failure(`error duplicated field ${field}`);
            }
            throw err;
        }
    }

    async update(firstName, lastName, email, username, password, id) {
        const hash = await HashHelper(password);

        try {
            const result = await this.userRepository.update(firstName, lastName, email, username, hash, id);

            if (!result) {
                throw new Error("Unexpected result");
            }

            return Result.success(result);
        } catch (err) {
            if (err.sqlState === '23000') {
                const field = err.sqlMessage.match(/for key '(.+)'/)?.[1];
                return Result.failure(`error duplicated field ${field}`);
            }
            throw err;
        }
    }
}

module.exports = UserService;