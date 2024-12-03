const express = require("express");
const router = express.Router();

const {ping} = require("../controllers/pingController");
const {login} = require("../controllers/auth/authController");
const {create, getAllUserCoursesByID, getAllMyUserCourses} = require("../controllers/account/accountController");
const {getAllCourses, getByID} = require("../controllers/course/courseController");
const {
    getAllCourseStatus,
    getCourseStatusByID,
    createCourseStatus, updateCourseStatus
} = require("../controllers/course/coursesStatusController");
const {authenticationJWT, filterIsAdminJWT} = require("../middlewares/authFilter");

router.get("/ping", ping);

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
router.post("/register", create);

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
 *         500:
 *           description: Error en el servidor
 */
router.get("/courses", authenticationJWT, getAllCourses);

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener un curso según el id
 *     description: Este endpoint devuelve una lista de todos los cursos disponibles.
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
router.get("/course/:id", authenticationJWT, getByID);

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
router.get("/user/:id/courses", authenticationJWT, getAllUserCoursesByID)

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
router.get("/user/courses", authenticationJWT, getAllMyUserCourses)

/**
 * @swagger
 * /courses/status:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener todos los estados posibles de un curso
 *     description: Este endpoint devuelve una lista de todos los estados de un cursos disponibles.
 *     tags:
 *       - Courses Status
 *     responses:
 *       200:
 *         description: Lista de estados de cursos
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
router.get("/courses/status", authenticationJWT, getAllCourseStatus)

/**
 * @swagger
 * /courses/status/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene todos los cursos relacionados a un usuario
 *     description: Obtiene todos los cursos relacionados a un usuario en particular utilizando su identificador
 *     tags:
 *       - Courses Status
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
router.get("/courses/status/:id", authenticationJWT, getCourseStatusByID)

/**
 * @swagger
 * /courses/status:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Registrar un estado de curso
 *     description: Registra un nuevo estado de curso en la base de datos.
 *     tags:
 *       - Courses Status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Suspendido"
 *     responses:
 *       200:
 *         description: Registro exitoso
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
router.post("/courses/status", authenticationJWT, createCourseStatus)
/**
 * @swagger
 * /courses/status/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: Actualiza un estado de curso
 *     description: Cambia el valor de un registro de estado de curso
 *     tags:
 *       - Courses Status
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de un estado curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Suspendido"
 *     responses:
 *       200:
 *         description: Registro exitoso
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
router.patch("/courses/status/:id", authenticationJWT, updateCourseStatus)
module.exports = router;

