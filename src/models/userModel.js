import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nome: { type: String, required: [true, 'O campo nome é obrigatório.'] },
    email: { type: String, required: [true, 'O campo e-mail é obrigatório.'] },
    senha: { type: String, required: [true, 'O campo senha é obrigatório.'] },
    papeis: { type: [String], required: [true, 'O campo papéis é obrigatório.'] }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema, 'users');
