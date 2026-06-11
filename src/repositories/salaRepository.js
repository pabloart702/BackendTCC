import Sala from '../models/salaModel.js';

class SalaRepository {
    static async listar() {
        return await Sala.find();
    }
    static async buscar(id) {
        return await Sala.findById(id);
    }
    static async criar(sala) {
        return await Sala.create(sala);
    }
    static async atualizar(id, sala) {
        return await Sala.findByIdAndUpdate(id, sala, { new: true });
    }
    static async atualizarParcialmente(id, sala) {
        return await Sala.findByIdAndUpdate(id, sala, { new: true });
    }
    static async deletar(id) {
        return await Sala.findByIdAndDelete(id);
    }
}

export default SalaRepository;
