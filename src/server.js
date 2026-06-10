import app from './app.js'
import { config } from 'dotenv';
import connectDB from './config/db.js';
config();

// Primeiro tenta conectar ao banco, depois inicia o servidor
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Servidor rodando na porta local http://localhost:${process.env.PORT}`);
    });
}).catch((error) => {
    console.error(`Falha na inicialização: ${error.message}`);
    process.exit(1);
});
