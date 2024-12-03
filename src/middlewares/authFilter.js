const jwt = require('jsonwebtoken');

const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, "./config/.env")});

function filterByRole(req, res, next, name) {
    if (req.user?.roles?.some((role) => role.includes(name))) {
        next();
    } else {
        return res.status(403).json({error: 'Acceso denegado. Privilegios insuficientes.'});
    }
}

module.exports.filterIsAdminJWT = (req, res, next) => {
    filterByRole(req, res, next, 'Administrator');
};

module.exports.authenticationJWT = async (req, res, next) => {
    try {

        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({error: 'Credenciales no proporcionadas. Autenticación requerida.'});
        }

        // Si el token es válido, puedes guardar la información del usuario en el objeto req para uso posterior
        req.user = jwt.verify(token, process.env.JWT_SECRET); // Esto puede incluir información como el id del usuario, roles, etc.
        next();
    } catch (err) {
        next(err);
    }
}
