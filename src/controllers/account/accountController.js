const createConnection = require("../../models/db");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });


module.exports.register = (req, res) => {
    const { first_name, last_name, email, username, password, role } = req.body;

    const consult = `INSERT INTO user (first_name, last_name, email, username, password, role)
                    VALUES (?, ?, ?, ?, ?, ?);`;

    try {
        createConnection.query(
            consult,
            [first_name, last_name, email, username, password, role],
            (err, result) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res
                            .status(400)
                            .send({ message: "Email or username already exists." });
                    }
                    return res
                        .status(500)
                        .send({ message: "Internal server error", error: err });
                }

                return res.status(201).send({
                    message: "User registered successfully",
                    user: { first_name, last_name, email, username, password, role },
                });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
};




module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    }

    const query = 'SELECT id, password, role FROM user WHERE email = ?';

    try {
        // Consulta para obtener al usuario
        createConnection.query(query, [email], (err, results) => {
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

            const { id, password: hash, role } = results[0];

            // Verificar contraseña
            if (!bcrypt.compareSync(password, hash)) {
                return res
                    .status(422)
                    .json({ error: 'Usuario o contraseña incorrectos.' });
            }

            // Generar el token JWT
            const token = jwt.sign(
                { id, role },
                process.env.JWT_SECRET,
                { expiresIn: '2h' } // El token expira en 2 horas
            );

            // Configurar la cookie con el token
            res.cookie('x-auth', token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 2 * 60 * 60 * 1000, // 2 horas
            });

            return res.status(200).json({ message: 'Inicio de sesión exitoso.' });
        });
    } catch (error) {
        console.error('Error inesperado:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};
