import User from '../models/userModel.js';

class UserRepository {
    static async listar() {
        return await User.find();
    }
    static async buscar(id) {
        return await User.findById(id);
    }
    static async criar(user) {
        return await User.create(user);
    }
    static async atualizar(id, user) {
        return await User.findByIdAndUpdate(id, user, { new: true });
    }
    static async atualizarParcialmente(id, user) {
        return await User.findByIdAndUpdate(id, user, { new: true });
    }
    static async deletar(id) {
        return await User.findByIdAndDelete(id);
    }
    static async buscarPorEmail(email) {
        return await User.findOne({ email: email });
    }
}

export default UserRepository;
