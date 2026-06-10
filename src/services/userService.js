import UserRepository from '../repositories/userRepository.js';
import UserDto from '../dtos/userDto.js';
import bcrypt from 'bcrypt';

class UserService {
    static async listar() {
        const usersDb = await UserRepository.listar();
        const usersDto = usersDb.map(item => new UserDto(item));
        return usersDto;
    }

    static async buscar(id) {
        const userDb = await UserRepository.buscar(id);
        if (!userDb) {
            const error = new Error('Usuário não encontrado');
            error.statusCode = 404;
            throw error;
        }
        const userDto = new UserDto(userDb);
        return userDto;
    }

    static async criar(userDados) {
        // Validação de E-mail Único
        const usersDb = await UserRepository.listar();
        const emailEmUso = usersDb.find(u => u.email === userDados.email);

        if (emailEmUso) {
            const error = new Error('Este e-mail já está em uso');
            error.statusCode = 400;
            throw error;
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        userDados.senha = await bcrypt.hash(userDados.senha, saltRounds);

        const userCriado = await UserRepository.criar(userDados);
        return new UserDto(userCriado);
    }

    static async atualizar(id, userDados) {
        // Verifica se o usuário existe
        const userAtual = await UserRepository.buscar(id);
        if (!userAtual) {
            const error = new Error('Usuário não encontrado');
            error.statusCode = 404;
            throw error;
        }

        // Validação de E-mail Único
        const usersDb = await UserRepository.listar();
        const emailEmUso = usersDb.find(u => u.id.toString() !== id.toString() && u.email === userDados.email);

        if (emailEmUso) {
            const error = new Error('Este e-mail já está em uso por outro usuário');
            error.statusCode = 400;
            throw error;
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        userDados.senha = await bcrypt.hash(userDados.senha, saltRounds);

        const userAtualizado = await UserRepository.atualizar(id, userDados);
        return new UserDto(userAtualizado);
    }

    static async atualizarParcialmente(id, userDados) {
        // Verifica se o usuário existe
        const userAtual = await UserRepository.buscar(id);
        if (!userAtual) {
            const error = new Error('Usuário não encontrado');
            error.statusCode = 404;
            throw error;
        }

        // Validação de E-mail Único (apenas se a requisição estiver tentando alterar o e-mail)
        if (userDados.email !== undefined) {
            const usersDb = await UserRepository.listar();
            const emailEmUso = usersDb.find(u => u.id.toString() !== id.toString() && u.email === userDados.email);

            if (emailEmUso) {
                const error = new Error('Este e-mail já está em uso por outro usuário');
                error.statusCode = 400;
                throw error;
            }
        }

        if (userDados.senha) {
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
            userDados.senha = await bcrypt.hash(userDados.senha, saltRounds);
        }

        const userAtualizado = await UserRepository.atualizarParcialmente(id, userDados);
        return new UserDto(userAtualizado);
    }

    static async deletar(id) {
        const userExiste = await UserRepository.buscar(id);
        if (!userExiste) {
            const error = new Error('Usuário não encontrado');
            error.statusCode = 404;
            throw error;
        }

        await UserRepository.deletar(id);
    }
}

export default UserService;
