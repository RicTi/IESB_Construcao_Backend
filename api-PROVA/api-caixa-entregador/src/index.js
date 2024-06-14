const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 3000;

// Conexão com o Banco de Dados.
const DBConnection = require('./database/connection');
DBConnection();

// Middlewares.
app.use(express.json());

const swaggerFile = require('./swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Autenticação de rotas.
const autenticacaoRoutes = require('./routes/autenticacao.routes');
app.use(autenticacaoRoutes);

//const { checarToken } = require('./validators/AutenticacaoValidator');

const routes = require('./routes/routes');
app.use(routes);



app.listen(PORT, () => {
    console.log(`API Caixa Entregador rodando na porta ${PORT}...`);
    console.log(`Documentação disponível em http://localhost:${PORT}/api-docs...`);
});
