const express = require("express");
const {
    getAllMyUserCourses,
    getAllUserCoursesByID,
    create, getUserProfile
} = require("../../controllers/users/usersController");
const {authenticationJWT} = require("../../middlewares/authFilter");
const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario en la base de datos y devuelve un token JWT si el registro es exitoso.
 *     tags:
 *       - User
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
 *             description: JWT para autenticación.
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
 * /users/{id}/courses:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene todos los cursos relacionados a un usuario
 *     description: Obtiene todos los cursos relacionados a un usuario en particular utilizando su identificador
 *     tags:
 *       - User
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
router.get("/:id/courses", authenticationJWT, getAllUserCoursesByID);

/**
 * @swagger
 * /users/courses:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene todos los cursos relacionados con tu usuario
 *     description: Obtiene todos los cursos relacionados con tu usuario
 *     tags:
 *       - User
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
router.get("/courses", authenticationJWT, getAllMyUserCourses);

/**
 * @swagger
 * /users/profile/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene todos los datos relacionados a un usuario
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del usuario
 *     responses:
 *       200:
 *         description: Información del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 email:
 *                   type: string
 *                   example: "j2uan.perez@example.com"
 *                 username:
 *                   type: string
 *                   example: "j2uan.perez"
 *                 rol:
 *                   type: string
 *                   nullable: true
 *                   example: "teacher"
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       studentCourseStatus:
 *                         type: string
 *                         example: "En desarrollo"
 *                       teachers:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       descriptions:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       titles:
 *                         type: string
 *                         example: "SQL 0 a maestro"
 *                       meet:
 *                         type: string
 *                         example: "www.google.cl"
 *                       courseStatus:
 *                         type: string
 *                         example: "Suspendido"
 *                   example: []
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error en el servidor
 */

router.get('/profile/:id', authenticationJWT, getUserProfile);
module.exports = router;