import app from './app.js'
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
config();

const PORT = process.env.PORT || 3000;

// Primeiro tenta conectar ao banco, depois inicia o servidor
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
}).catch((error) => {
    console.error(`Falha na inicialização: ${error.message}`);
    process.exit(1);
});
