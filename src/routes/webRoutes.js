import { Router } from 'express';
import WebController from '../controllers/webController.js';

const router = Router();

router.get('/ar-condicionados', WebController.listarArCondicionados);
router.get('/salas', WebController.listarSalas);
router.get('/users', WebController.listarUsers);

export default router;
