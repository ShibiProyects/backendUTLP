const jwt = require('jsonwebtoken');

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

module.exports.filterIsAdminJWT = async (req, res,next) => {
    const token = req.cookies['x-auth'];

    if (!token) {
        return res.status(401).json({ error: 'Credenciales no proporcionadas. Autenticación requerida.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.is_admin) {
            next();
        } else {
            return res.status(403).json({ error: 'Acceso denegado. Privilegios insuficientes.' });
        }
    } catch (err) {
        console.error('Error al verificar el token:', err);
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
}

module.exports.AuthenticationJWT = async (req, res,next) => {    
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Credenciales no proporcionadas. Autenticación requerida.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Si el token es válido, puedes guardar la información del usuario en el objeto req para uso posterior
        req.user = decoded; // Esto puede incluir información como el id del usuario, roles, etc.
        next(); // Continúa al siguiente middleware o ruta
    } catch (err) {
        console.error('Error al verificar el token:', err);
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
}
