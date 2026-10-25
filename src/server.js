import app from './app.js'
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import { connectMQTT } from './config/mqtt.js';
config();

const PORT = process.env.PORT || 3000;

// Primeiro conecta ao banco, inicializa MQTT e inicia o servidor HTTP
connectDB().then(() => {
    connectMQTT();

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
}).catch((error) => {
    console.error(`Falha na inicialização: ${error.message}`);
    process.exit(1);
});

