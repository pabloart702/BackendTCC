import { Router } from "express";
import UserController from "../controllers/userController.js";
import { regrasValidacaoUser, regrasValidacaoUserParcial } from '../validators/userValidators.js'

const router = Router();

router.get('/', UserController.listar);
router.get("/:id", UserController.buscar);
router.patch("/:id", regrasValidacaoUserParcial, UserController.atualizarParcialmente);
router.delete("/:id", UserController.deletar);

// Modificam todos os dados do usuário, logo precisam de mais validações
router.post("/", regrasValidacaoUser, UserController.criar);
router.put("/:id", regrasValidacaoUser, UserController.atualizar);

export default router;