const express = require('express');
const router = express.Router();

let listaPessoas = [
    {
        "nome": "João",
        "idade": 20,
        "email": "joão@email.com",
        "telefone": "61900010002"
    },
    {
        "nome": "Pedro",
        "idade": 27,
        "email": "pedro@email.com",
        "telefone": "61999999999"
    }
    
    
];

function validarPessoa(req, res, next) {
    const id = req.params.id;
    const pessoa = listaPessoas.find(pessoa => pessoa.id == id);
    if (pessoa) {
        res.pessoa = pessoa;
        return next();
    }
    return res.status(404).json({ mensagem: "Pessoa não encontrada!" });
}

function validarAtributosPessoa(req, res, next) {
    const dados = req.body;
    if (!dados.nome || !dados.idade || !dados.email || !dados.telefone) {
        return res.status(400).json({ mensagem: "Nome, idade, email e telefone são obrigatórios!" });
    }
    return next();
}

// READ - Buscar todas as pessoas
router.get('/pessoas', (req, res) => {
    res.json(listaPessoas);
});

// READ - Buscar pessoa por id
router.get('/pessoas/:id', validarPessoa, (req, res) => {
    res.json(res.pessoa);
});

// CREATE - Adicionar uma nova pessoa
router.post('/pessoas', validarAtributosPessoa, (req, res) => {
    const dados = req.body;
    const pessoa = {
        id: Math.round(Math.random() * 1000),
        nome: dados.nome,
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone
    };
    listaPessoas.push(pessoa);
    res.json({ mensagem: "Pessoa cadastrada com sucesso!", pessoa });
});

// UPDATE - Atualizar uma pessoa existente
router.put('/pessoas/:id', validarAtributosPessoa, validarPessoa, (req, res) => {
    const dados = req.body;
    const pessoaAtualizada = {
        id: req.params.id,
        nome: dados.nome,
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone
    };
    const index = listaPessoas.findIndex(pessoa => pessoa.id == req.params.id);
    listaPessoas[index] = pessoaAtualizada;
    res.json({ mensagem: "Pessoa atualizada com sucesso!", pessoa: pessoaAtualizada });
});

// DELETE - Remover uma pessoa
router.delete('/pessoas/:id', validarPessoa, (req, res) => {
    const index = listaPessoas.findIndex(pessoa => pessoa.id == req.params.id);
    listaPessoas.splice(index, 1);
    res.json({ mensagem: "Pessoa excluída com sucesso!" });
});

module.exports = router;
