import mongoose from 'mongoose';

const salaSchema = new mongoose.Schema({
    setor: { type: String, required: [true, 'O campo setor é obrigatório.'] },
    andar: { type: String, required: [true, 'O campo andar é obrigatório.'] },
    corredor: { type: String, required: [true, 'O campo corredor é obrigatório.'] },
    nome_sala: { type: String, required: [true, 'O campo nome da sala é obrigatório.'] },
    capacidade: { type: String, required: [true, 'O campo capacidade é obrigatório.'] },
    endereco_mac_esp32: { type: String, required: [true, 'O campo endereço MAC é obrigatório.'] }
}, {
    timestamps: true
});

export default mongoose.model('Sala', salaSchema, 'salas');
