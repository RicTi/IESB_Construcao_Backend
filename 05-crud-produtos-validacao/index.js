const express = require('express');
const app = express();

// middlewares
app.use(express.json())

// Rotas
const produtosRouter = require('./routes/produtos')// ./   + / digitar esses comandos dentro do require...
app.use(produtosRouter)

// Comando que starta a aplicação no servidor...
app.listen(3000, () => {
    console.log("API iniciando... Rodando em http://localhost:3000")
})