const ResultStatusEnum = require("../../library/resultStatusEnum");
const UserService = require("../../services/userService");

module.exports.getAllTeacherCoursesByID = async (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id === 0) {
        return res.status(400).json({error: "Bad Request"});
    }

    try {
        const userService = new UserService();
        const result = await userService.getByIdTeacherId(id);
        switch (result.status) {
            case ResultStatusEnum.OK:
                return res.status(200).json({message: result.value});
            case ResultStatusEnum.NOT_FOUND:
                return res.status(404).json({error: result.error});
            default:
                next(new Error(`Unexpected result status: ${result.status}`));
        }
    } catch (err) {
        next(err);
    }
}
