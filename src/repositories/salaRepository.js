import db from '../config/database.js'

class SalaRepository {

    static async listar() {
        await db.read();
        return db.data.salas;
    }

    static async buscar(id) {
        await db.read();
        return db.data.salas.find(sala => sala.id === id);
    }

    static async criar(sala) {
        await db.read();
        const novaSala = {
            id: Date.now().toString(),
            setor: sala.setor,
            andar: sala.andar,
            corredor: sala.corredor,
            nome_sala: sala.nome_sala,
            capacidade: sala.capacidade,
            endereco_mac_esp32: sala.endereco_mac_esp32
        };
        db.data.salas.push(novaSala);
        await db.write();
        return novaSala;
    }

    static async atualizar(id, sala) {
        await db.read();
        const salaAtualizada = db.data.salas.find(s => s.id === id);
        salaAtualizada.setor = sala.setor;
        salaAtualizada.andar = sala.andar;
        salaAtualizada.corredor = sala.corredor;
        salaAtualizada.nome_sala = sala.nome_sala;
        salaAtualizada.capacidade = sala.capacidade;
        salaAtualizada.endereco_mac_esp32 = sala.endereco_mac_esp32;
        await db.write();
        return salaAtualizada;
    }

    static async atualizarParcialmente(id, sala) {
        await db.read();
        const salaAtualizada = db.data.salas.find(s => s.id === id);
        Object.assign(salaAtualizada, sala);
        await db.write();
        return salaAtualizada;
    }

    static async deletar(id) {
        await db.read();
        const salaDeletada = db.data.salas.find(s => s.id === id);
        db.data.salas = db.data.salas.filter(s => s.id !== id);
        await db.write();
        return salaDeletada;
    }
}

export default SalaRepository;
