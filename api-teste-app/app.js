/* Imports */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware para ler arquivos JSON nas requisições e respostas.
app.use(express.json());

// Models
const User = require('./models/User');

// Rota aberta - Rota Pública
app.get('/', (req, res) => {
    res.status(200).json({ mensagem: "Bem vindo a nossa api teste! Este acesso é somente para visitantes."});
});

// Registrar usuário
app.post('/auth/registrar', async(req, res) => {
    
    const { nome, email, senha, confirmacaosenha } = req.body


    // Validação de usuário: nome, email, senha, confirmacaosenha...
    if (!nome) {
        return res.status(422).json({ mensagem: " O nome é obrigatório!"})
    }
    if (!email) {
        return res.status(422).json({ mensagem: " O email é obrigatório!"})
    }
    if (!senha) {
        return res.status(422).json({ mensagem: " A senha é obrigatória!"})
    }
    if (senha !== confirmacaosenha) {
        return res.status(422).json({ mensagem: " As senhas não conferem!"})
    }

    // Validação User: verificar se email de usuário já existe...
    // Essa função garante que o mesmo email seja cadastrado apenas 1 vez no banco.
    const usuarioExiste = await User.findOne({ email: email})

    if (usuarioExiste) {
        return res.status(422).json({ mensagem: "Por favor, utilize outro email!"})
    }

    // Criar senha
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha, salt)

    // Criar usuário
    const user = new User({
        nome,
        email,
        senha: senhaHash,
    })

    try {

        await user.save()

        res.status(201).json({ mensagem: "Usuário criado com sucesso!"})

    } catch(error) {
        console.log(error)
        res.status(500).json({ mensagem: "Aconteceu um erro no servidor, tente novamente mais tarde!"})
    }

});

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





