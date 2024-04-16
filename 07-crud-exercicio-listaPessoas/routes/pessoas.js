const express = require('express');
const router = express.Router();

const listaPessoas = [
    {
        id: 1,
        nome: "Ricardo",
        idade: 34,
        email: "motoric750@gmail.com",
        telefone: 61991919191,
    },
    {
        id: 2,
        nome: "Paulo",
        idade: 23,
        email: "paulo1234@gmail.com",
        telefone: 61981818181,
    },
    {
        id: 3,
        nome: "João Pedro",
        idade: 27,
        email: "jp2024@hotmail.com",
        telefone: 61985858585
    }
];

// READ - BUSCAR TODOS OS PRODUTOS...
router.get('/pessoa', (req, res) => {
    res.json(listaPessoas)
})

// READ - BUSCAR TODOS OS PRODUTOS POR ID...
router.get('/pessoas/:id', (req, res) => {
    const id = req.params.id
    const pessoa = listaPessoas.find(pessoa => pessoa.id ==id)
    res.json(pessoa)
})

// CREATE - PARA CADASTRAR UMA NOVA PESSOA...
router.post('/pessoas', (req, res) => {
    const dadosPessoa = req.body
    const novaPessoa = {
        id: listaPessoas.length + 1,
        nome: dadosPessoa.nome,
        idade: dadosPessoa.idade,
        email: dadosPessoa.email,
        telefone: dadosPessoa.telefone
    }
    listaPessoas.push(novaPessoa)
    res.json(
        {
            mensagem: "Pessoa criada com sucesso!"
        }
    )
})

// UPDATE - ATUALIZAR UMA PESSOA COM BASE EM SEU ID...
router.put('/pessoas/:id', (req, res) => {
    const id = req.params.id
    const novosDados = req.body

    const index = listaPessoas.findIndex(pessoa => pessoa.id == id)
    const pessoaAtualizada = {
        id: Number(id),
        nome: novosDados.nome,
        idade: novosDados.idade,
        email: novosDados.email,
        telefone: novosDados.telefone
    }
    
    listaPessoas[index] = pessoaAtualizada

    res.json({
        mensagem: "Produto atualizado com sucesso!"
    })
})

module.exports = router;