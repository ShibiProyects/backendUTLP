const express = require("express");
const {login} = require("../../controllers/auth/authController");
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login inicia session.
 *     description: Inicia session y devuelve un token JWT, si las credenciales son correctas.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Registro exitoso
 *         headers:
 *           Set-Cookie:
 *             description: JWT para autenticación..
 *             schema:
 *               type: string
 *               example: x-auth=jwt.token.here; Path=/; HttpOnly; SameSite=Lax; Max-Age=7200
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro exitoso."
 *                 token:
 *                   type: string
 *                   example: "jwt.token.here" # Token en formato JWT
 *       422:
 *         description: Error en el registro por datos incorrectos o duplicados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     passwordsDoNotMatch:
 *                       summary: Contraseñas no coinciden
 *                       value: "Las contraseñas no coinciden. Intente nuevamente."
 *                     emailExists:
 *                       summary: Correo duplicado
 *                       value: "Este correo electrónico ya está registrado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor."
 */
router.post("/login", login);

module.exports = router;