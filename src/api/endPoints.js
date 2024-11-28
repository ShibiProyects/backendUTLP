const express = require("express");
const router = express.Router();

const { ping } = require("../controllers/pingController");
const { register, login } = require("../controllers/auth/authController");
const { getAllCourses, getByID } = require("../controllers/courses/coursesController");
const { AuthenticationJWT } = require("../filters/authFilter");

router.get("/ping", ping);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario en la base de datos y devuelve un token JWT si el registro es exitoso.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Juan"
 *               lastName:
 *                 type: string
 *                 example: "Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               username:
 *                 type: string
 *                 example: "juan.perez"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               confirmPassword:
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
router.post("/register", register);

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

//Courses

/**
 * @swagger
 * /courses:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener todos los cursos
 *     description: Este endpoint devuelve una lista de todos los cursos disponibles.
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 additionalProperties: true  # Esto indica que los objetos pueden tener propiedades dinámicas
 *         500:
 *           description: Error en el servidor
 */
router.get("/courses", AuthenticationJWT, getAllCourses);
router.get("/course/{id}", getByID);



module.exports = router;

