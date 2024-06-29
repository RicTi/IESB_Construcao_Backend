/* Imports */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Rota aberta - Rota Pública
app.get('/', (req, res) => {
    res.status(200).json({ mensagem: "Bem vindo a nossa api teste! Este acesso é somente para visitantes."});
});

// Credenciais de acesso.


// Conexão com o Banco de dados.
mongoose.connect()
.then(() => {
    app.listen(3000)
    console.log("Conectado ao Banco!")
})
.catch((err) => {
    console.log("Atenção! Erro ao tentar se conectar com o banco!"+ err)
});





