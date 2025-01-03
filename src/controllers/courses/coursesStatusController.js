const ResultStatusEnum = require("../../library/resultStatusEnum");
const CourseStatusService = require("../../services/courseStatusService");

module.exports.getAllCourseStatus = async (req, res, next) => {
    const coursesStatusService = new CourseStatusService();
    const result = await coursesStatusService.getAll();
    if (result.status === ResultStatusEnum.OK) {
        return res.status(200).json(result.value);
    } else {
        next(new Error(`Unexpected result status: ${result.status}`));
    }
};

module.exports.getCourseStatusByID = async (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({error: "Bad Request"});
    }

    const coursesStatusService = new CourseStatusService();
    const result = await coursesStatusService.getById(id);
    switch (result.status) {
        case ResultStatusEnum.OK:
            return res.status(200).json({message: result.value});
        case ResultStatusEnum.NOT_FOUND:
            return res.status(404).json({error: result.error});
        default:
            next(new Error(`Unexpected result status: ${result.status}`));
    }
};

module.exports.createCourseStatus = async (req, res, next) => {
    const name = req.body?.name;

    if (!name || name.trim().length === 0) {
        return res.status(422).json({error: "Bad Request"});
    }

    const coursesStatusService = new CourseStatusService();
    const result = await coursesStatusService.create(name);
    if (result.status === ResultStatusEnum.OK) {
        return res.status(200).json({message: result.value});
    } else {
        next(new Error(`Unexpected result status: ${result.status}`));
    }
}

module.exports.updateCourseStatus = async (req, res, next) => {
    const id = Number(req.params.id);
    const name = req.body?.name;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({error: "Bad Request"});
    }

    if (!name || name.trim().length === 0) {
        return res.status(422).json({error: "Bad Request"});
    }
    const coursesStatusService = new CourseStatusService();
    const result = await coursesStatusService.update(name, id);
    if (result.status === ResultStatusEnum.OK) {
        return res.status(200).json({message: result.value});
    } else {
        next(new Error(`Unexpected result status: ${result.status}`));
    }
}