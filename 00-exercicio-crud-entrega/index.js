const express = require('express');
const app = express();

app.use(express.json())

//Rotas
const carrosRouter = require('./routes/carros')
app.use(carrosRouter);





app.listen(3000, () => {
    console.log("API iniciando... Rodando em http://localhost:3000")
})