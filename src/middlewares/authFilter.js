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

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({error: "Token expirado."});
                } else {
                    return res.status(401).json({error: 'Token invalido.'});
                }
            }
            req.user = decode;
            next();
        });
    } catch (err) {
        next(err);
    }
}
