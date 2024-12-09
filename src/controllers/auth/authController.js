const createConnection = require("../../models/db");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    }

    const query = 'SELECT user_id, password as hash,GROUP_CONCAT(role.name) AS ROLES FROM user INNER JOIN user_role ON user_role.user_user_id = user.user_id INNER JOIN role ON role.role_id = user_role.role_role_id WHERE email = ? GROUP BY `user`.user_id, `user`.`password`;';
    const connection = createConnection();
    try {
        // Consulta para obtener al usuario
        connection.query(query, [email], (err, results) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ message: 'Error interno del servidor.' });
            }

            // Si el usuario no existe
            if (results.length === 0) {
                return res
                    .status(422)
                    .json({ error: 'Usuario o contraseña incorrectos.' });
            }
            //temp remove role need add 
            //Le digo que tiene el nombre password en la DB y en la consulta, pero que resuelva como hash
            const { user_id, hash, ROLES } = results[0];

            console.log(results);

            // Verificar contraseña
            if (!bcrypt.compareSync(password, hash)) {
                return res
                    .status(422)
                    .json({ error: 'Usuario o contraseña incorrectos.' });
            }

            // Generar el token JWT

            const token = jwt.sign(
                { id: user_id, roles: ROLES.split(",") },
                process.env.JWT_SECRET,
                { expiresIn: '2h' } // El token expira en 2 horas
            );

            // Configurar la cookie con el token

            /*
            res.cookie('x-auth', token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 2 * 60 * 60 * 1000, // 2 horas
            });
            */
            //header Bearer
            /*
            return res.status(200)
            .setHeader('Authorization', `Bearer ${token}`)
            .json({ message: 'Inicio de sesión exitoso.'});
            */
            return res.status(200).json({ message: 'Inicio de sesión exitoso.', token: token });
        });
    } catch (error) {
        console.error('Error inesperado:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};
