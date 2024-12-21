const express = require("express");
const {authenticationJWT} = require("../../middlewares/authFilter");
const {getAllCourseStatus, getCourseStatusByID, createCourseStatus, updateCourseStatus} = require("../../controllers/courses/coursesStatusController");
const router = express.Router();

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
router.get("/", authenticationJWT, getAllCourseStatus);

/**
 * @swagger
 * /courses/status/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene un estado de curso basado en su identificador
 *     description: Obtiene un estado de curso basado en su identificador
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
 *                 additionalProperties: true
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", authenticationJWT, getCourseStatusByID);

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
router.post("/", authenticationJWT, createCourseStatus);

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
router.patch("/:id", authenticationJWT, updateCourseStatus);

module.exports = router;