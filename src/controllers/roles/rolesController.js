const ResultStatusEnum = require("../../library/resultStatusEnum");
const RoleService = require("../../services/roleService");

module.exports.getAllRoles = async (req, res, next) => {
    try {
        const roleService = new RoleService();
        const result = await roleService.getAll();
        if (result.status === ResultStatusEnum.OK) {
            return res.status(200).json(result.value);
        }else{
            next(new Error(`Unexpected result status: ${result.status}`));
        }
    } catch (err) {
        next(err);
    }
}

module.exports.getRoleById = async (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "Bad Request"});
    }

    if (id === 0) {
        return res.status(404).json({message: "Not found"});
    }

    try {
        const roleService = new RoleService();
        const result = await roleService.getById(id);
        if (result.status === ResultStatusEnum.OK) {
            return res.status(200).json(result.value);
        }else{
            next(new Error(`Unexpected result status: ${result.status}`));
        }
    } catch (err) {
        next(err);
    }
}

module.exports.createRole = async (req, res, next) => {
    const name = req.body?.name;

    if (!name) {
        return res.status(400).json({error: "Bad Request: Missing name"});
    }

    try {
        const roleService = new RoleService();
        const result = await roleService.create(name);
        switch (result.status) {
            case ResultStatusEnum.OK:
                return res.status(200).json({message: result.value});
            case ResultStatusEnum.VALIDATION_ERROR:
                return res.status(422).json({errors: result.error});
            default:
                next(new Error(`Unexpected result status: ${result.status}`));
        }

    } catch (err) {
        next(err);
    }
};

module.exports.updateRole = async (req, res, next) => {
    const name = req.body?.name;
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({error: "Bad Request: Invalid ID"});
    }

    if (!name) {
        return res.status(400).json({error: "Bad Request: Missing name"});
    }

    try {
        const roleService = new RoleService();
        const result = await roleService.update(name, id);
        switch (result.status) {
            case ResultStatusEnum.OK:
                return res.status(200).json({message: result.value});
            case ResultStatusEnum.VALIDATION_ERROR:
                return res.status(422).json({errors: result.error});
            default:
                next(new Error(`Unexpected result status: ${result.status}`));
        }
    } catch (err) {
        next(err);
    }
}


module.exports.deleteRole = async (req, res, next) => {
    let id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({error: "Bad Request: Invalid ID"});
    }

    try {
        const roleService = new RoleService();
        const result = await roleService.getAll();
        if (result.status === ResultStatusEnum.OK) {
            return res.status(200).json(result.value);
        }else{
            next(new Error(`Unexpected result status: ${result.status}`));
        }
    } catch (err) {
        next(err);
    }
}
