import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/userRepository.js';

class AuthController {
    static async login(req, res, next) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
            }
            
            const users = await UserRepository.listar();
            const user = users.find(u => u.email === email && u.senha === senha);
            
            if (!user) {
                return res.status(401).json({ message: "E-mail ou senha incorretos." });
            }
            
            // Gerar Token JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email, papel: user.papel },
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
