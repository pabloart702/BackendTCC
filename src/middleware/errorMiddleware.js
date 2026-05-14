import { validationResult } from 'express-validator';

// Interceptador de Erros de Validação (Rodando antes dos Controllers)
export const verificarErros = (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({
            sucesso: false,
            erros: erros.array()
        });
    }
    next();
};

// Global Error Handler (Captura erros lançados pelos Services com throw new Error)
export const globalErrorHandler = (error, req, res, next) => {
    console.error("ERRO DETECTADO: ", error.message);
    console.error("Stack: ", error.stack);

    const statusCode = error.statusCode || 500;

    // Responde com o erro formatado em JSON
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: error.statusCode ? error.message : 'Ocorreu um erro interno no servidor'
    });
};