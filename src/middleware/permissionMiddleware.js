export function authorize(...allowedRoles) {
    return (req, res, next) => {
        // Papéis do usuário vindo do JWT
        const userRoles = req.user.papeis || [];
        
        // Verifica se pelo menos um dos papéis do usuário está dentro da lista permitida
        const hasPermission = userRoles.some(role => allowedRoles.includes(role));
        
        if (!hasPermission) {
            const error = new Error('Acesso negado. Permissões insuficientes.');
            error.statusCode = 403;
            return next(error);
        }
        
        next();
    };
}
