const express = require("express");
const {authenticationJWT} = require("../../middlewares/authFilter");
const {getAllRoles, getRoleById, createRole, updateRole} = require("../../controllers/roles/rolesController");
const router = express.Router();

/**
 * @swagger
 * /roles:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene todos los roles
 *     description: Obtiene todos los roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                      type: integer
 *                      example: 1
 *                   name:
 *                      type: string
 *                      example: "Administrator"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error en el servidor
 */
router.get("/", authenticationJWT, getAllRoles)
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene un rol según el identificador
 *     description: Obtiene un rol según el identificador
 *     tags:
 *       - Roles
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 *          description: Identificador del curso
 */
router.get("/:id", authenticationJWT, getRoleById)
/**
 * @swagger
 * /roles:
 *  post:
 *    tags:
 *       - Roles
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Baneado
 *                 description: Nombre del rol.
 *    responses:
 *      200:
 *        description: Success create role
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Error en el servidor
 */
router.post("/", authenticationJWT, createRole)
/**
 * @swagger
 * /roles/{id}:
 *  patch:
 *    tags:
 *       - Roles
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del curso
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Baneado
 *                 description: Nombre del rol.
 *    responses:
 *      200:
 *        description: Success update role
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Error en el servidor
 */
router.patch("/:id", authenticationJWT, updateRole)

module.exports = router;