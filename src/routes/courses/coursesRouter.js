const express = require("express");
const {authenticationJWT} = require("../../middlewares/authFilter");
const {getAllCourses, getByID, createCourse, updateCourse} = require("../../controllers/courses/coursesController");

const router = express.Router();

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
 *                 properties:
 *                    course_id:
 *                       type: integer
 *                       example: 1
 *                    teacher:
 *                       type: string
 *                       example: "Juan Pérez"
 *                    title:
 *                       type: string
 *                       example: "SQL 0 a maestro"
 *                    link_meet:
 *                       type: string
 *                       example: "www.google.cl"
 *                    teacher_email:
 *                       type: string
 *                       format: email
 *                       example: "juan.perez@example.com"
 *                    course_status:
 *                       type: string
 *                       example: "Terminado"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/", authenticationJWT, getAllCourses);

/**
 * @swagger
 * /courses/{id}:
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
 *            schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    course_id:
 *                       type: integer
 *                       example: 1
 *                    teacher:
 *                       type: string
 *                       example: "Juan Pérez"
 *                    title:
 *                       type: string
 *                       example: "SQL 0 a maestro"
 *                    link_meet:
 *                       type: string
 *                       example: "www.google.cl"
 *                    teacher_email:
 *                       type: string
 *                       format: email
 *                       example: "juan.perez@example.com"
 *                    course_status:
 *                       type: string
 *                       example: "Terminado"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad Request"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not Found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/:id", authenticationJWT, getByID);

/**
 * @swagger
 * /courses:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Crear un nuevo curso
 *     description: Crea un nuevo curso en el sistema con los detalles proporcionados.
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacher_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID del profesor que crea el curso.
 *               course_status:
 *                 type: integer
 *                 example: 1
 *                 description: ID del estado del curso.
 *               title:
 *                 type: string
 *                 example: "Introducción a la programación"
 *                 description: Título del curso.
 *               description:
 *                 type: string
 *                 example: "Un curso básico sobre conceptos de programación."
 *                 description: Descripción detallada del curso.
 *               link_meet:
 *                 type: string
 *                 example: "https://meet.example.com/course123"
 *                 description: Enlace a la reunión en línea para el curso.
 *             required:
 *               - teacher_id
 *               - course_status
 *               - title
 *               - link_meet
 *     responses:
 *       201:
 *         description: Course successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success create course"
 *       422:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unprocessable Entity"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/", authenticationJWT, createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   patch:
 *     security:
 *         - bearerAuth: []
 *     summary: Actualizar un curso existente
 *     description: Actualiza los detalles de un curso existente en el sistema.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del curso que se desea actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacher_id:
 *                 type: integer
 *                 example: 1
 *                 description: Id del profesor que actualiza el curso.
 *               course_status:
 *                 type: integer
 *                 example: 2
 *                 description: Nuevo ID del estado del curso.
 *               title:
 *                 type: string
 *                 example: "Programación avanzada"
 *                 description: Nuevo título del curso.
 *               description:
 *                 type: string
 *                 example: "Un curso avanzado sobre conceptos de programación."
 *                 description: Nueva descripción detallada del curso.
 *               link_meet:
 *                 type: string
 *                 example: "https://meet.example.com/course456"
 *                 description: Nuevo enlace a la reunión en línea para el curso.
 *             required:
 *               - teacher_id
 *               - course_status
 *               - title
 *               - link_meet
 *     responses:
 *       200:
 *         description: Course successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success update course"
 *       422:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unprocessable Entity"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.patch("/:id", authenticationJWT, updateCourse);

module.exports = router;