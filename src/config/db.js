import mongoose from 'mongoose';
import 'dotenv/config';

const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            dbName: 'controle_ar'
        });
        console.log(`✅ MongoDB Conectado via Mongoose`);
    } catch (error) {
        const customError = new Error(`Erro ao conectar no MongoDB via Mongoose: ${error.message}`);
        customError.statusCode = 500;
        throw customError;
    }
};

export { connectDB };
