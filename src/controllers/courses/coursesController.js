const CourseService = require("../../services/courseService");
const ResultStatusEnum = require("../../library/resultStatusEnum");

module.exports.getAllCourses = async (req, res, next) => {
    try {
        const courseService = new CourseService();
        const result = await courseService.getAll();
        switch (result.status) {
            case ResultStatusEnum.OK:
                return res.status(200).json(result.value);
            default:
                next(new Error(`Unexpected result status: ${result.status}`));
        }
    } catch (err) {
        next(err);
    }
};

module.exports.getByID = async (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({error: "Bad Request"});
    }

    try {
        const courseService = new CourseService();
        const result = await courseService.getById(id);
        switch (result.status) {
            case ResultStatusEnum.OK:
                return res.status(200).json(result.value);
            case ResultStatusEnum.NOT_FOUND:
                return res.status(404).json({error: result.error});
            default:
                next(new Error(`Unexpected result status: ${result.status}`));
        }
    } catch (err) {
        next(err);
    }
};

module.exports.createCourse = async (req, res,next) => {
    const {teacher_id, course_status, title, description = null, link_meet} = req.body;

    if(!title || !course_status || !title || !link_meet){
        return res.status(400).json({error: "Bad Request"});
    }
    if(!Number.isInteger(teacher_id) || teacher_id <= 0|| !Number.isInteger(title) || title <= 0) {
        return res.status(400).json({error: "Bad Request"});
    }
    if (!title || title.trim().length === 0 || !link_meet || link_meet.trim().length === 0) {
        return res.status(422).json({error: "Bad Request"});
    }

    try {
        const courseService = new CourseService();
        const result = await courseService.create(teacher_id, course_status, title, description, link_meet);
        switch (result.status) {
            case ResultStatusEnum.OK:
                return res.status(200).json({message: result.value});
            default:
                next(new Error(`Unexpected result status: ${result.status}`));
        }
    } catch (err) {
        next(err);
    }
}

module.exports.updateCourse = async (req, res,next) => {
    const {teacher_id, course_status, title, description = null, link_meet} = req.body;
    const id = Number(req.params.id);

    if(!Number.isInteger(teacher_id) || teacher_id <= 0|| !Number.isInteger(title) || title <= 0 || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({error: "Bad Request"});
    }

    if (!title || title.trim().length === 0 || !link_meet || link_meet.trim().length === 0) {
        return res.status(422).json({error: "Unprocessable Entity"});
    }



    try {
        const courseService = new CourseService();
        const result = await courseService.update(teacher_id, course_status, title, description, link_meet, id);
        switch (result.status) {
            case ResultStatusEnum.OK:
                return res.status(200).json({message: result.value});
            default:
                next(new Error(`Unexpected result status: ${result.status}`));
        }
    } catch (err) {
        next(err);
    }
}
