const {authenticationJWT} = require("../../middlewares/authFilter");
const express = require("express");
const router = express.Router();
const {getAllTeacherCoursesByID} = require("../../controllers/users/teachersController");

/**
 * @swagger
 * /teachers/courses/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene todos los cursos relacionados a un profesor
 *     description: Obtiene todos los cursos relacionados a un profesor en particular utilizando su identificador
 *     tags:
 *       - Teachers
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
router.get("/courses/:id", authenticationJWT, getAllTeacherCoursesByID);

module.exports = router;