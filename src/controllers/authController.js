import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/userRepository.js';

class AuthController {
    static async login(req, res, next) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                const error = new Error("E-mail e senha são obrigatórios.");
                error.statusCode = 400;
                throw error;
            }
            
            const users = await UserRepository.listar();
            const user = users.find(u => u.email === email);
            
            if (!user) {
                const error = new Error("E-mail ou senha incorretos.");
                error.statusCode = 401;
                throw error;
            }
            
            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                const error = new Error("E-mail ou senha incorretos.");
                error.statusCode = 401;
                throw error;
            }
            
            // Gerar Token JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email, papeis: user.papeis },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            res.json({ token });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
