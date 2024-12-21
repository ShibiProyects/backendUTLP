const AuthService = require("../../services/AuthService");
const ResultEnum = require("../../library/resultStatusEnum");

module.exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email) {
        return res.status(400).json({error: "Bad Request: Missing Email"})
    }

    if (!password) {
        return res.status(400).json({error: "Bad Request: Missing Password"})
    }

    try {
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

    } catch (err) {
        next(err);
    }
};
