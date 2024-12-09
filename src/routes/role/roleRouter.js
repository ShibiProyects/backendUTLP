const express = require("express");
const {authenticationJWT} = require("../../middlewares/authFilter");
const {getAllRoles, getRoleById, createRole, updateRole, deleteRole} = require("../../controllers/role/roleController");
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
 *                  message:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Administrator"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error en el servidor
 */
router.get("/roles", authenticationJWT, getAllRoles)
/**
 * @swagger
 * /roles/{id}:
 *
 */
router.get("/role/:id", authenticationJWT, getRoleById)
/**
 * @swagger
 * /rolo:
 *
 */
router.post("/role", authenticationJWT, createRole)
/**
 * @swagger
 * /role:
 *
 */
router.patch("/role/:id", authenticationJWT, updateRole)
/**
 * @swagger
 * /role:
 *
 */
router.delete("/role/:id", authenticationJWT, deleteRole)

module.exports = router;