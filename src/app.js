import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import salaRoutes from './routes/salaRoutes.js';
import arCondicionadoRoutes from './routes/arCondicionadoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import webRoutes from './routes/webRoutes.js';
import { globalErrorHandler } from './middleware/errorMiddleware.js';
import { authMiddleware } from './middleware/authMiddleware.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- CONFIGURAÇÃO DO PUG ---
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares globais
app.use(express.json());

// Rotas
// Rotas abertas
app.use('/api/auth', authRoutes);
app.use('/web', webRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas Protegidas
app.use('/api/salas', authMiddleware, salaRoutes);
app.use('/api/arCondicionados', authMiddleware, arCondicionadoRoutes);
app.use('/api/users', authMiddleware, userRoutes);

app.use((req, res, next) => {
    const error = new Error("Rota não encontrada");
    error.statusCode = 404;
    next(error);
});

app.use(globalErrorHandler);

export default app;