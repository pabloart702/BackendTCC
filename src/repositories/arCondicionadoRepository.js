import ArCondicionado from '../models/arCondicionadoModel.js';

class ArCondicionadoRepository {
    static async listar() {
        return await ArCondicionado.find();
    }
    static async buscar(id) {
        return await ArCondicionado.findById(id);
    }
    static async criar(arCondicionado) {
        return await ArCondicionado.create(arCondicionado);
    }
    static async atualizar(id, arCondicionado) {
        return await ArCondicionado.findByIdAndUpdate(id, arCondicionado, { new: true });
    }
    static async atualizarParcialmente(id, arCondicionado) {
        return await ArCondicionado.findByIdAndUpdate(id, arCondicionado, { new: true });
    }
    static async deletar(id) {
        return await ArCondicionado.findByIdAndDelete(id);
    }
}

export default ArCondicionadoRepository;