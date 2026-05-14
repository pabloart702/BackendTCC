import db from '../config/database.js'

class ArCondicionadoRepository {

    static async listar() {
        await db.read();
        return db.data.arCondicionados
    }

    static async buscar(id) {
        await db.read();
        return db.data.arCondicionados.find(ar => ar.id === id);
    }

    static async criar(arCondicionado) {
        await db.read();
        const novoArCondicionado = {
            id: Date.now().toString(),
            sala_id: arCondicionado.sala_id,
            marca_modelo: arCondicionado.marca_modelo,
            status: arCondicionado.status,
            temperatura_atual: arCondicionado.temperatura_atual,
            codigo_ir_ligar: arCondicionado.codigo_ir_ligar,
            codigo_ir_desligar: arCondicionado.codigo_ir_desligar,
            codigo_ir_temp_23: arCondicionado.codigo_ir_temp_23,
            codigo_ir_modo_cool: arCondicionado.codigo_ir_modo_cool
        }
        db.data.arCondicionados.push(novoArCondicionado);
        await db.write();
        return novoArCondicionado;
    }

    static async atualizar(id, arCondicionado) {
        await db.read();
        const arCondicionadoAtualizado = db.data.arCondicionados.find(ar => ar.id === id);
        arCondicionadoAtualizado.sala_id = arCondicionado.sala_id;
        arCondicionadoAtualizado.marca_modelo = arCondicionado.marca_modelo;
        arCondicionadoAtualizado.status = arCondicionado.status;
        arCondicionadoAtualizado.temperatura_atual = arCondicionado.temperatura_atual;
        arCondicionadoAtualizado.codigo_ir_ligar = arCondicionado.codigo_ir_ligar;
        arCondicionadoAtualizado.codigo_ir_desligar = arCondicionado.codigo_ir_desligar;
        arCondicionadoAtualizado.codigo_ir_temp_23 = arCondicionado.codigo_ir_temp_23;
        arCondicionadoAtualizado.codigo_ir_modo_cool = arCondicionado.codigo_ir_modo_cool;
        await db.write();
        return arCondicionadoAtualizado;
    }

    static async atualizarParcialmente(id, arCondicionado) {
        await db.read();
        const arCondicionadoAtualizado = db.data.arCondicionados.find(ar => ar.id === id);
        Object.assign(arCondicionadoAtualizado, arCondicionado);
        await db.write();
        return arCondicionadoAtualizado;
    }

    static async deletar(id) {
        await db.read();
        const arCondicionadoDeletado = db.data.arCondicionados.find(ar => ar.id === id);
        db.data.arCondicionados = db.data.arCondicionados.filter(ar => ar.id !== id);
        await db.write();
        return arCondicionadoDeletado;
    }
}

export default ArCondicionadoRepository