const ResultStatusEnum = require("../../library/resultStatusEnum");
const RoleService = require("../../services/roleService");
const validateIntegerNumber = require("../../Helper/validateIntegerHelper");
const roleSchema = require("../../validations/controller/roleSchema");
const validateSchema = require("../../validations/validateSchema");

module.exports.getAllRoles = async (req, res, next) => {
    const roleService = new RoleService();
    const result = await roleService.getAll();

    if (result.status === ResultStatusEnum.OK) {
        return res.status(200).json(result.value);
    } else {
        next(new Error(`Unexpected result status: ${result.status}`));
    }
}

module.exports.getRoleById = async (req, res, next) => {
    const id = Number(req.params.id);

    if (validateIntegerNumber(id)) {
        return res.status(400).json({error: "invalid number"});
    }

    const roleService = new RoleService();
    const result = await roleService.getById(id);
    if (result.status === ResultStatusEnum.OK) {
        return res.status(200).json(result.value);
    } else {
        next(new Error(`Unexpected result status: ${result.status}`));
    }
}

module.exports.createRole = async (req, res, next) => {
    const validationResult = validateSchema(roleSchema, req.body);

    if (validationResult.errors) {
        return res.status(400).json({errors: validationResult.errors});
    }

    const {name} = validationResult.value;

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
};

module.exports.updateRole = async (req, res, next) => {
    const id = Number(req.params.id);

    if (validateIntegerNumber(id)) {
        return res.status(400).json({error: "invalid number"});
    }

    const validationResult = validateSchema(roleSchema, req.body);

    if (validationResult.errors) {
        return res.status(400).json({errors: validationResult.errors});
    }

    const {name} = validationResult.value;

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
}

module.exports.deleteRole = async (req, res, next) => {
    const id = Number(req.params.id);

    if (validateIntegerNumber(id)) {
        return res.status(400).json({error: "invalid number"});
    }

    const roleService = new RoleService();
    const result = await roleService.getAll();
    if (result.status === ResultStatusEnum.OK) {
        return res.status(200).json(result.value);
    } else {
        next(new Error(`Unexpected result status: ${result.status}`));
    }
}
