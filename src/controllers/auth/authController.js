const AuthService = require("../../services/AuthService");
const ResultEnum = require("../../library/resultStatusEnum");
const authSchema = require("../../validations/controller/authSchema");

function validateSchema(schema, data) {
    const {error} = schema.validate(data, {abortEarly: true});

    if (error) {
        return {error: "Invalid credentials."};
    }
    return null;
}

module.exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    const validationErrors = validateSchema(authSchema, req.body);
    if (validationErrors) {
        return res.status(400).json(validationErrors);
    }

    const authService = new AuthService();
    const result = await authService.login(email, password);
    switch (result.status) {
        case ResultEnum.OK:
            return res.status(200).json({message: 'Successful login.', token: result.value});
        case ResultEnum.VALIDATION_ERROR:
            return res.status(422).json({error: result.error});
        default:
            next(new Error(`Unexpected result status: ${result.status}`));
    }
};
