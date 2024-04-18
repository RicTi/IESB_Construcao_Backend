const express = require('express')

const app = express();

app.use(express.json());

const carrosRouter = require('./routes/carros.js')
app.use(carrosRouter)
















app.listen(3000, () => {
    console.log(" API INICIANDO... Rodando em http://localhost:3000")
})