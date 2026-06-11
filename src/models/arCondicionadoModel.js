import mongoose from 'mongoose';

const arCondicionadoSchema = new mongoose.Schema({
    sala_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', required: [true, 'O campo ID da sala é obrigatório.'] },
    marca_modelo: { type: String, required: [true, 'O campo marca/modelo é obrigatório.'] },
    status: { type: String, required: [true, 'O campo status é obrigatório.'] },
    temperatura_atual: { type: Number, required: [true, 'O campo temperatura atual é obrigatório.'] },
    codigo_ir_ligar: { type: String, required: [true, 'O código IR para ligar é obrigatório.'] },
    codigo_ir_desligar: { type: String, required: [true, 'O código IR para desligar é obrigatório.'] },
    codigo_ir_temp_23: { type: String, required: [true, 'O código IR para temperatura 23 é obrigatório.'] },
    codigo_ir_modo_cool: { type: String, required: [true, 'O código IR para o modo cool é obrigatório.'] }
}, {
    timestamps: true
});

export default mongoose.model('ArCondicionado', arCondicionadoSchema, 'arCondicionado');
