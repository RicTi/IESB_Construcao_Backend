const Usuario = require('../models/Usuario');
require('dotenv').config();
const bcrypt = require('bcrypt');

async function registrar(req, res) {
    const { nome, email, senha } = req.body;

    // Verifica se o e-mail já está cadastrado
    const usuario = await Usuario.findOne({ email });
    if (usuario) {
        return res.status(400).json({ mensagem: "Este e-mail já está cadastrado!" });
    }

    // Cria um hash para a senha
    const hash = await bcrypt.hash(senha, 10);

    // Cria um novo usuário
    const novoUsuario = new Usuario({
        nome,
        email,
        senha: hash
    });

    await novoUsuario.save();

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
}

async function login(req, res) {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        return res.status(401).json({ mensagem: "Usuário não cadastrado!" });
    }

    // Verifica se a senha é válida
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "usuário ou senha inválidos!" });
    }

    res.json({
        mensagem: "Login efetuado com sucesso!"
    });
}

module.exports = {
    registrar,
    login
};
