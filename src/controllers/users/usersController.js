const UserService = require("../../services/UserService");
const ResultStatusEnum = require("../../library/resultStatusEnum");


module.exports.getAllUserCoursesByID = async (req, res, next) => {
    const id = Number(req.params.id);
    await getUserCourses(req, res, next, id);
};

module.exports.getAllMyUserCourses = async (req, res, next) => {
    const id = req.user?.id;
    await getUserCourses(req, res, next, id);
};

async function getUserCourses(req, res, next, id) {
    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "Bad Request"});
    }

    if (id === 0) {
        return res.status(404).json({message: "Not found"});
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

module.exports.create = async (req, res, next) => {
    const {firstName, lastName, email, username, password, confirmPassword} = req.body;

    if (password !== confirmPassword) {
        return res
            .status(422)
            .json({message: 'Password and confirm password not equal.'});
    }

    try {
        const userService = new UserService();
        const result = await userService.create(firstName, lastName, email, username, password);
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

module.exports.update = async (req, res, next) => {
    const {firstName, lastName, email, username, password, confirmPassword} = req.body;
    const id = Number(req.params.id);

    if (password !== confirmPassword) {
        return res
            .status(422)
            .json({message: 'Password and confirm password not equal.'});
    }

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

module.exports.addUserRole = async (req, res, next) => {
    const userId = Number(req.params.userId);
    const roleId = Number(req.params.roleId);

    // Validación
    if (!Number.isInteger(userId) || userId <= 0 || !Number.isInteger(roleId) || roleId <= 0) {
        return res.status(400).json({error: "Bad Request"});
    }
    /*
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
     */
}
