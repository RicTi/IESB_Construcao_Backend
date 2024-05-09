const express = require('express');

const app = express();

app.use(express.json());

// Passando a rota...
const funcionariosRouter = require('./routes/funcionarios')
app.use(funcionariosRouter)


app.listen(3000, () => {
    console.log("API INICIANDO... Rodando em http://localhost:3000");
})