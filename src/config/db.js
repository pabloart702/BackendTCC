import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        const customError = new Error(`Erro ao conectar no MongoDB: ${error.message}`);
        customError.statusCode = 500;
        throw customError; // Lança o erro para quem chamou a função (o server.js)
    }
};

export default connectDB;
