const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Aqui dentro devo passar a rota do arquivo pessoas.js onde será construido a maior parte do crud



// Startando o servidor para rodar em uma porta específica
app.listen(3000, () => {
    console.log(" API INICIANDO... Rodando em http://localhost:3000")
})