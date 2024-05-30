const express = require('express');
const app = express();

// Middleware para transformar o corpo da requisição em JSON
app.use(express.json());

// Importa as rotas de listaPessoas
const listaPessoasRouter = require('./routes/listaPessoas');
// Utiliza as rotas de listaPessoas
app.use(listaPessoasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
