import { Router } from "express";
import ArCondicionadoController from '../controllers/arCondicionadoController.js'
import { regrasValidacaoArCondicionado, regrasValidacaoArCondicionadoParcial } from '../validators/arCondicionadoValidators.js'
import { authorize } from '../middleware/permissionMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();


/**
 * @swagger
 * /api/arCondicionados:
 *   get:
 *     summary: Retorna lista de ar condicionados
 *     responses:
 *       200:
 *         description: Lista de ar condicionados
 */
router.get('/', authMiddleware, authorize('admin', 'user'), ArCondicionadoController.listar);

// Rotas estáticas (precisam vir ANTES das dinâmicas como /:id)
router.get('/interface-pug', (req, res) => {
    res.render('interface', {
        title: 'Interface teste PUG!',
        message: 'Esta é sua primeira interface PUG renderizada pelo servidor!'
    });
});

/**
 * @swagger
 * /api/arCondicionados/{id}:
 *   get:
 *     summary: Busca um ar condicionado pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ar condicionado encontrado
 */
router.get("/:id", authMiddleware, authorize('admin', 'user'), ArCondicionadoController.buscar);

/**
 * @swagger
 * /api/arCondicionados/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um ar condicionado
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
 *         description: Ar condicionado atualizado
 */
router.patch("/:id", authMiddleware, authorize('admin'), regrasValidacaoArCondicionadoParcial, ArCondicionadoController.atualizarParcialmente);

/**
 * @swagger
 * /api/arCondicionados/{id}:
 *   delete:
 *     summary: Deleta um ar condicionado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ar condicionado deletado
 */
router.delete("/:id", authMiddleware, authorize('admin'), ArCondicionadoController.deletar);

/**
 * @swagger
 * /api/arCondicionados:
 *   post:
 *     summary: Cria um novo ar condicionado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Ar condicionado criado
 */
router.post("/", authMiddleware, authorize('admin'), regrasValidacaoArCondicionado, ArCondicionadoController.criar);

/**
 * @swagger
 * /api/arCondicionados/{id}:
 *   put:
 *     summary: Atualiza totalmente um ar condicionado
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
 *         description: Ar condicionado atualizado
 */
router.put("/:id", authMiddleware, authorize('admin'), regrasValidacaoArCondicionado, ArCondicionadoController.atualizar);


export default router;