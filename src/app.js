import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import salaRoutes from './routes/salaRoutes.js';
import arCondicionadoRoutes from './routes/arCondicionadoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import webRoutes from './routes/webRoutes.js';
import { globalErrorHandler } from './middleware/errorMiddleware.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- CONFIGURAÇÃO DO PUG ---
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares globais
app.use(express.json());

// Rotas
app.use('/api/salas', salaRoutes);
app.use('/api/arCondicionados', arCondicionadoRoutes);
app.use('/api/users', userRoutes);
app.use('/web', webRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

app.use(globalErrorHandler);

export default app;