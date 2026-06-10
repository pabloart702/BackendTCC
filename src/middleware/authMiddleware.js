   import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        const error = new Error("Token não fornecido.");
        error.statusCode = 401;
        return next(error);
    }
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        const error = new Error("Erro no formato do token.");
        error.statusCode = 401;
        return next(error);
    }
    
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        const error = new Error("Erro no formato do token.");
        error.statusCode = 401;
        return next(error);
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const error = new Error("Token inválido ou expirado.");
            error.statusCode = 401;
            return next(error);
        }

        // Se o token for válido, 'decoded' contém o payload (userId, login)
        // Adicionamos essa informação na requisição para uso posterior nas rotas (como RBAC)
        req.user = decoded;
        
        // Chama o próximo middleware ou a rota final
        next();
    });
};
