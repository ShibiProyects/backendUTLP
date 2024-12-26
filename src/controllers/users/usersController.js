const UserService = require("../../services/UserService");
const ResultStatusEnum = require("../../library/resultStatusEnum");
const validateIntegerNumber = require("../../Helper/validateIntegerHelper");
const validateSchema = require("../../validations/validateSchema");
const userSchema = require("../../validations/controller/userSchema");

async function getUserCourses(req, res, next, id) {
    if (validateIntegerNumber(id)) {
        return res.status(400).json({error: "invalid number"});
    }

    try {
        const userService = new UserService();
        const result = await userService.getByIdWithCourses(id);
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
}

module.exports.getAllUserCoursesByID = async (req, res, next) => {
    const id = Number(req.params.id);
    await getUserCourses(req, res, next, id);
};

module.exports.getAllMyUserCourses = async (req, res, next) => {
    const id = Number(req.user?.id);
    await getUserCourses(req, res, next, id);
};

module.exports.getUserProfile = async (req, res, next) => {
    const id = Number(req.params.id);

    if (validateIntegerNumber(id)) {
        return res.status(400).json({error: "invalid number"});
    }

    try {
        const userService = new UserService();
        const result = await userService.getUserProfile(id);
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
}

module.exports.create = async (req, res, next) => {
    const validationResult = validateSchema(userSchema, req.body);

    if (validationResult.errors) {
        return res.status(400).json({errors: validationResult.errors});
    }

    const {firstName, lastName, email, username, password} = validationResult.value;

    try {
        const userService = new UserService();
        const result = await userService.create(firstName, lastName, email, username, password);
        switch (result.status) {
            case ResultStatusEnum.OK:
                return res.status(200).json(result.value);
            case ResultStatusEnum.NOT_FOUND:
                return res.status(404).json({error: result.error});
            case ResultStatusEnum.FAILURE:
                return res.status(422).json({error: result.error});
            default:
                next(new Error(`Unexpected result status: ${result.status}`));
        }
    } catch (err) {
        next(err);
    }
};

module.exports.update = async (req, res, next) => {
    const id = Number(req.params.id);

    if (validateIntegerNumber(id)) {
        return res.status(400).json({error: "invalid number"});
    }

    const validationResult = validateSchema(userSchema, req.body);

    if (validationResult.errors) {
        return res.status(400).json({errors: validationResult.errors});
    }

    const {firstName, lastName, email, username, password} = validationResult.value;

    try {
        const userService = new UserService();
        const result = await userService.update(firstName, lastName, email, username, password, id);
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
}

/*
module.exports.addUserRole = async (req, res, next) => {
    const userId = Number(req.params.userId);
    const roleId = Number(req.params.roleId);

    if (validateIntegerNumber(userId) || roleId) {
        return res.status(400).json({error: "invalid number"});
    }

    const query = `INSERT INTO user_role(user_user_id, role_role_id)
                   VALUES (?, ?);`;

    try {
        const connection = await createConnection();
        const [result] = await connection.execute(query, [userId, roleId]);
        return res.status(200).json({message: "A roles has been added to a user", id: result.insertId});
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}
*/

