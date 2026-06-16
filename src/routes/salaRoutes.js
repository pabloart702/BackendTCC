import { Router } from "express";
import SalaController from '../controllers/salaController.js';
import { regrasValidacaoSala, regrasValidacaoSalaParcial } from '../validators/salaValidators.js'
import { authorize } from '../middleware/permissionMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();


/**
 * @swagger
 * /api/salas:
 *   get:
 *     summary: Retorna lista de salas
 *     responses:
 *       200:
 *         description: Lista de salas
 */
router.get('/', authMiddleware, authorize('admin', 'user'), SalaController.listar);

/**
 * @swagger
 * /api/salas/{id}:
 *   get:
 *     summary: Busca uma sala pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sala encontrada
 */
router.get("/:id", authMiddleware, authorize('admin', 'user'), SalaController.buscar);

/**
 * @swagger
 * /api/salas/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma sala
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Sala atualizada
 */
router.patch("/:id", authMiddleware, authorize('admin'), regrasValidacaoSalaParcial, SalaController.atualizarParcialmente);

/**
 * @swagger
 * /api/salas/{id}:
 *   delete:
 *     summary: Deleta uma sala
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Sala deletada
 */
router.delete("/:id", authMiddleware, authorize('admin'), SalaController.deletar);

/**
 * @swagger
 * /api/salas:
 *   post:
 *     summary: Cria uma nova sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Sala criada
 */
router.post("/", authMiddleware, authorize('admin'), regrasValidacaoSala, SalaController.criar);

/**
 * @swagger
 * /api/salas/{id}:
 *   put:
 *     summary: Atualiza totalmente uma sala
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Sala atualizada
 */
router.put("/:id", authMiddleware, authorize('admin'), regrasValidacaoSala, SalaController.atualizar);

export default router;