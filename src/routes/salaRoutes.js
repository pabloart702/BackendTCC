import { Router } from "express";
import SalaController from '../controllers/salaController.js';
import { regrasValidacaoSala, regrasValidacaoSalaParcial } from '../validators/salaValidators.js'

const router = Router();

router.get('/', SalaController.listar);
router.get("/:id", SalaController.buscar);
router.patch("/:id", regrasValidacaoSalaParcial, SalaController.atualizarParcialmente);
router.delete("/:id", SalaController.deletar);

// Modificam todos os dados do ar condicionado, logo precisam de mais validações
router.post("/", regrasValidacaoSala, SalaController.criar);
router.put("/:id", regrasValidacaoSala, SalaController.atualizar);

export default router;