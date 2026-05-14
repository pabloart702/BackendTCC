import { body } from 'express-validator';
import { verificarErros } from '../middleware/errorMiddleware.js'

// Regras para criação de um ar condicionado
export const regrasValidacaoArCondicionado = [
    body('sala_id')
        .isString().withMessage('O ID da sala deve ser um texto')
        .trim()
        .notEmpty().withMessage('O ID da sala é obrigatório')
        .isLength({ min: 3 }).withMessage('O ID da sala deve ter pelo menos 3 caracteres'),
    body('marca_modelo')
        .isString().withMessage('A marca e modelo devem ser um texto')
        .trim()
        .notEmpty().withMessage('A marca e modelo são obrigatórios'),
    body('status')
        .isString().withMessage('O status deve ser um texto')
        .trim()
        .notEmpty().withMessage('O status é obrigatório'),
    body('temperatura_atual')
        .isInt().withMessage('A temperatura atual deve ser um número inteiro')
        .notEmpty().withMessage('A temperatura atual é obrigatória'),
    body('codigo_ir_ligar')
        .isString().withMessage('O código IR de ligar deve ser um texto')
        .trim()
        .notEmpty().withMessage('O código IR de ligar é obrigatório'),
    body('codigo_ir_desligar')
        .isString().withMessage('O código IR de desligar deve ser um texto')
        .trim()
        .notEmpty().withMessage('O código IR de desligar é obrigatório'),
    body('codigo_ir_temp_23')
        .isString().withMessage('O código IR de temperatura 23 deve ser um texto')
        .trim()
        .notEmpty().withMessage('O código IR de temperatura 23 é obrigatório'),
    body('codigo_ir_modo_cool')
        .isString().withMessage('O código IR de modo cool deve ser um texto')
        .trim()
        .notEmpty().withMessage('O código IR de modo cool é obrigatório'),
    // Middleware para capturar e enviar os erros
    verificarErros
];

// Regras para atualização parcial (PATCH)
export const regrasValidacaoArCondicionadoParcial = [
    body('sala_id')
        .optional()
        .isString().withMessage('O ID da sala deve ser um texto')
        .trim()
        .notEmpty().withMessage('O ID da sala não pode estar vazio')
        .isLength({ min: 3 }).withMessage('O ID da sala deve ter pelo menos 3 caracteres'),
    body('marca_modelo')
        .optional()
        .isString().withMessage('A marca e modelo devem ser um texto')
        .trim()
        .notEmpty().withMessage('A marca e modelo não podem estar vazios'),
    body('status')
        .optional()
        .isString().withMessage('O status deve ser um texto')
        .trim()
        .notEmpty().withMessage('O status não pode estar vazio'),
    body('temperatura_atual')
        .optional()
        .isInt().withMessage('A temperatura atual deve ser um número inteiro')
        .notEmpty().withMessage('A temperatura atual não pode estar vazia'),
    body('codigo_ir_ligar')
        .optional()
        .isString().withMessage('O código IR de ligar deve ser um texto')
        .trim()
        .notEmpty().withMessage('O código IR de ligar não pode estar vazio'),
    body('codigo_ir_desligar')
        .optional()
        .isString().withMessage('O código IR de desligar deve ser um texto')
        .trim()
        .notEmpty().withMessage('O código IR de desligar não pode estar vazio'),
    body('codigo_ir_temp_23')
        .optional()
        .isString().withMessage('O código IR de temperatura 23 deve ser um texto')
        .trim()
        .notEmpty().withMessage('O código IR de temperatura 23 não pode estar vazio'),
    body('codigo_ir_modo_cool')
        .optional()
        .isString().withMessage('O código IR de modo cool deve ser um texto')
        .trim()
        .notEmpty().withMessage('O código IR de modo cool não pode estar vazio'),
    // Middleware para capturar e enviar os erros
    verificarErros
];
