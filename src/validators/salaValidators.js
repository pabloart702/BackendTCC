import { body } from 'express-validator';
import { verificarErros } from '../middleware/errorMiddleware.js'

// Regras para criação de uma sala
export const regrasValidacaoSala = [
    body('setor')
        .isString().withMessage('O setor deve ser um texto')
        .trim()
        .notEmpty().withMessage('O setor é obrigatório'),
    body('andar')
        .isInt({ min: 0 }).withMessage('O andar deve ser um número inteiro'),
    body('corredor')
        .isString().withMessage('O corredor deve ser um texto')
        .trim()
        .notEmpty().withMessage('O corredor é obrigatório'),
    body('nome_sala')
        .isString().withMessage('O nome da sala deve ser um texto')
        .trim()
        .notEmpty().withMessage('O nome da sala é obrigatório'),
    body('capacidade')
        .isInt({ min: 0 }).withMessage('A capacidade deve ser um número inteiro'),
    body('endereco_mac_esp32')
        .isString().withMessage('O endereço MAC deve ser um texto')
        .trim()
        .notEmpty().withMessage('O endereço MAC do ESP32 é obrigatório'),
    // Middleware para capturar e enviar os erros
    verificarErros
];

// Regras para atualização parcial (PATCH)
export const regrasValidacaoSalaParcial = [
    body('setor')
        .optional()
        .isString().withMessage('O setor deve ser um texto')
        .trim()
        .notEmpty().withMessage('O setor não pode estar vazio'),
    body('andar')
        .optional()
        .isInt({ min: 0 }).withMessage('O andar deve ser um número inteiro'),
    body('corredor')
        .optional()
        .isString().withMessage('O corredor deve ser um texto')
        .trim()
        .notEmpty().withMessage('O corredor não pode estar vazio'),
    body('nome_sala')
        .optional()
        .isString().withMessage('O nome da sala deve ser um texto')
        .trim()
        .notEmpty().withMessage('O nome da sala não pode estar vazio'),
    body('capacidade')
        .optional()
        .isInt({ min: 0 }).withMessage('A capacidade deve ser um número inteiro'),
    body('endereco_mac_esp32')
        .optional()
        .isString().withMessage('O endereço MAC deve ser um texto')
        .trim()
        .notEmpty().withMessage('O endereço MAC do ESP32 não pode estar vazio'),
    // Middleware para capturar e enviar os erros
    verificarErros
];
