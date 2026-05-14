import { Router } from "express";
import ArCondicionadoController from '../controllers/arCondicionadoController.js'
import { regrasValidacaoArCondicionado, regrasValidacaoArCondicionadoParcial } from '../validators/arCondicionadoValidators.js'

const router = Router();

router.get('/', ArCondicionadoController.listar);

// Rotas estáticas (precisam vir ANTES das dinâmicas como /:id)
router.get('/interface-pug', (req, res) => {
    res.render('interface', {
        title: 'Interface teste PUG!',
        message: 'Esta é sua primeira interface PUG renderizada pelo servidor!'
    });
});

router.get("/:id", ArCondicionadoController.buscar);
router.patch("/:id", regrasValidacaoArCondicionadoParcial, ArCondicionadoController.atualizarParcialmente);
router.delete("/:id", ArCondicionadoController.deletar);

// Modificam todos os dados do ar condicionado, logo precisam de mais validações
router.post("/", regrasValidacaoArCondicionado, ArCondicionadoController.criar);
router.put("/:id", regrasValidacaoArCondicionado, ArCondicionadoController.atualizar);


export default router;