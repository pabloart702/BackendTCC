import db from '../config/database.js'

class UserRepository {

    static async listar() {
        await db.read();
        return db.data.users;
    }

    static async buscar(id) {
        await db.read();
        return db.data.users.find(user => user.id === id);
    }

    static async criar(user) {
        await db.read();
        const novoUser = {
            id: Date.now().toString(),
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            papel: user.papel,
            data_criacao: user.data_criacao
        };
        db.data.users.push(novoUser);
        await db.write();
        return novoUser;
    }

    static async atualizar(id, user) {
        await db.read();
        const userAtualizado = db.data.users.find(u => u.id === id);
        userAtualizado.nome = user.nome;
        userAtualizado.email = user.email;
        userAtualizado.senha = user.senha;
        userAtualizado.papel = user.papel;
        userAtualizado.data_criacao = user.data_criacao;
        await db.write();
        return userAtualizado;
    }

    static async atualizarParcialmente(id, user) {
        await db.read();
        const userAtualizado = db.data.users.find(u => u.id === id);
        Object.assign(userAtualizado, user);
        await db.write();
        return userAtualizado;
    }

    static async deletar(id) {
        await db.read();
        const userDeletado = db.data.users.find(u => u.id === id);
        db.data.users = db.data.users.filter(u => u.id !== id);
        await db.write();
        return userDeletado;
    }
}

export default UserRepository;
