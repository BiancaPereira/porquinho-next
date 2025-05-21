import cors from 'cors';
import express from 'express';
import ganhosRouter from './routes/ganhos_routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json'; // ajuste o caminho conforme necessário
import gastosRouter from './routes/gastos_routes';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api/ganhos', ganhosRouter);
app.use('/api/gastos', gastosRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
  console.log(`📚 Swagger em http://localhost:${PORT}/api-docs`);
});