const CourseService = require("../../services/courseService");
const ResultStatusEnum = require("../../library/resultStatusEnum");
const validateIntegerNumber = require("../../Helper/validateIntegerHelper");
const validateSchema = require("../../validations/validateSchema");
const courseSchema = require("../../validations/controller/courseSchema");

module.exports.getAllCourses = async (req, res, next) => {
    const courseService = new CourseService();
    const result = await courseService.getAll();
    switch (result.status) {
        case ResultStatusEnum.OK:
            return res.status(200).json(result.value);
        default:
            next(new Error(`Unexpected result status: ${result.status}`));
    }
};

module.exports.getByID = async (req, res, next) => {
    const id = Number(req.params.id);

    if (validateIntegerNumber(id)) {
        return res.status(400).json({error: "invalid number"});
    }

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
};

module.exports.createCourse = async (req, res, next) => {
    const validationResult = validateSchema(courseSchema, req.body);

    if (validationResult.errors) {
        return res.status(400).json({errors: validationResult.errors});
    }

    const { teacherId, courseStatus, title, description, linkMeet } = validationResult.value;

    const courseService = new CourseService();
    const result = await courseService.create(teacherId, courseStatus, title, description, linkMeet);
    switch (result.status) {
        case ResultStatusEnum.OK:
            return res.status(200).json({message: result.value});
        default:
            next(new Error(`Unexpected result status: ${result.status}`));
    }
}

module.exports.updateCourse = async (req, res, next) => {
    const id = Number(req.params.id);

    if (validateIntegerNumber(id)) {
        return res.status(400).json({error: "invalid number"});
    }

    const validationResult = validateSchema(courseSchema, req.body);

    if (validationResult.errors) {
        return res.status(400).json({errors: validationResult.errors});
    }

    const { teacherId, courseStatus, title, description, linkMeet } = validationResult.value;

    const courseService = new CourseService();
    const result = await courseService.update(teacherId, courseStatus, title, description, linkMeet, id);
    switch (result.status) {
        case ResultStatusEnum.OK:
            return res.status(200).json({message: result.value});
        default:
            next(new Error(`Unexpected result status: ${result.status}`));
    }
}
