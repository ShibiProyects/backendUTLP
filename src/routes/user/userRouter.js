const express = require("express");
const {
    getAllTeacherCoursesByID,
    getAllMyUserCourses,
    getAllUserCoursesByID,
    create
} = require("../../controllers/account/accountController");
const {authenticationJWT} = require("../../middlewares/authFilter");
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario en la base de datos y devuelve un token JWT si el registro es exitoso.
 *     tags:
 *       - Account
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
router.post("/register", authenticationJWT, create);

/**
 * @swagger
 * /user/{id}/courses:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene todos los cursos relacionados a un usuario
 *     description: Obtiene todos los cursos relacionados a un usuario en particular utilizando su identificador
 *     tags:
 *       - Courses
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del curso
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
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error en el servidor
 */
router.get("/user/:id/courses", authenticationJWT, getAllUserCoursesByID);

/**
 * @swagger
 * /user/courses:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene todos los cursos relacionados a tu usuario
 *     description: Obtiene todos los cursos relacionados a tu usuario
 *     tags:
 *       - Courses
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
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error en el servidor
 */
router.get("/user/courses", authenticationJWT, getAllMyUserCourses);

/**
 * @swagger
 * /teacher/{id}/courses:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene todos los cursos relacionados a un profesor
 *     description: Obtiene todos los cursos relacionados a un profesor en particular utilizando su identificador
 *     tags:
 *       - Courses
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del curso
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 additionalProperties: true
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error en el servidor
 */
router.get("/teacher/:id/courses", authenticationJWT, getAllTeacherCoursesByID);

module.exports = router;