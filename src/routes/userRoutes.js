import { Router } from "express";
import UserController from "../controllers/userController.js";
import { regrasValidacaoUser, regrasValidacaoUserParcial } from '../validators/userValidators.js'

const router = Router();


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna lista de usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get('/', UserController.listar);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 */
router.get("/:id", UserController.buscar);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um usuário
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
 *         description: Usuário atualizado
 */
router.patch("/:id", regrasValidacaoUserParcial, UserController.atualizarParcialmente);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário deletado
 */
router.delete("/:id", UserController.deletar);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Usuário criado
 */
router.post("/", regrasValidacaoUser, UserController.criar);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza totalmente um usuário
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
 *         description: Usuário atualizado
 */
router.put("/:id", regrasValidacaoUser, UserController.atualizar);

export default router;