import { body } from 'express-validator';
import { verificarErros } from '../middleware/errorMiddleware.js'

// Regras para criação de um usuario
export const regrasValidacaoUser = [
    body('nome')
        .isString().withMessage('O nome deve ser um texto')
        .trim()
        .notEmpty().withMessage('O nome é obrigatório')
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres'),
    body('email')
        .isString().withMessage('O email deve ser um texto')
        .trim()
        .notEmpty().withMessage('O email é obrigatório')
        .isEmail().withMessage('O email deve ser válido'),
    body('senha')
        .isString().withMessage('A senha deve ser um texto')
        .trim()
        .notEmpty().withMessage('A senha é obrigatória')
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
    body('papel')
        .isString().withMessage('O papel deve ser um texto')
        .trim()
        .notEmpty().withMessage('O papel é obrigatório'),
    body('data_criacao')
        .isString().withMessage('A data de criação deve ser um texto')
        .trim()
        .notEmpty().withMessage('A data de criação é obrigatória'),
    // Middleware para capturar e enviar os erros
    verificarErros
];

// Regras para atualização parcial (PATCH)
export const regrasValidacaoUserParcial = [
    body('nome')
        .optional()
        .isString().withMessage('O nome deve ser um texto')
        .trim()
        .notEmpty().withMessage('O nome não pode estar vazio')
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres'),
    body('email')
        .optional()
        .isString().withMessage('O email deve ser um texto')
        .trim()
        .notEmpty().withMessage('O email não pode estar vazio')
        .isEmail().withMessage('O email deve ser válido'),
    body('senha')
        .optional()
        .isString().withMessage('A senha deve ser um texto')
        .trim()
        .notEmpty().withMessage('A senha não pode estar vazia')
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
    body('papel')
        .optional()
        .isString().withMessage('O papel deve ser um texto')
        .trim()
        .notEmpty().withMessage('O papel não pode estar vazio'),
    body('data_criacao')
        .optional()
        .isString().withMessage('A data de criação deve ser um texto')
        .trim()
        .notEmpty().withMessage('A data de criação não pode estar vazia'),
    // Middleware para capturar e enviar os erros
    verificarErros
];
