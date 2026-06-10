import app from './app.js'
import { config } from 'dotenv';
config();

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta local http://localhost:${process.env.PORT}`);
});
