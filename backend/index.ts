import express from 'express';
import router from './routes/ganhos_routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json'; // ajuste o caminho conforme necessário

const app = express();
app.use(express.json());

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
  console.log(`📚 Swagger em http://localhost:${PORT}/api-docs`);
});