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

//

// Credenciais de acesso.
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

// Conexão com o Banco de dados.
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    app.listen(3000)
    console.log("Conectado ao Banco!")
})
.catch((err) => {
    console.log("Atenção! Erro ao tentar se conectar com o banco!"+ err)
});





