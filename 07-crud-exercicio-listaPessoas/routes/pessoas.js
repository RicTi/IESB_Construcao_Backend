const express = require('express');
const router = express.Router();

const listaPessoas = [
    {
        id: 1,
        nome: "Ricardo",
        idade: 34,
        email: "motoric750@gmail.com",
        telefone: "61991919191",
    },
    {
        id: 2,
        nome: "Paulo",
        idade: 23,
        email: "paulo1234@gmail.com",
        telefone: "61981818181",
    },
    {
        id: 3,
        nome: "João Pedro",
        idade: 27,
        email: "jp2024@hotmail.com",
        telefone: "61985858585"
    }
];

// READ - BUSCAR TODAS AS PESSOAS...
router.get('/pessoas', (req, res) => {
    res.json(listaPessoas)
})

// READ - BUSCAR UMA PESSOA PELO ID...
router.get('/pessoas/:id', (req, res) => {
    const id = req.params.id;

    // Verifica se o ID é um número válido
    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido. O ID deve ser um número." });
    }

    const pessoa = listaPessoas.find(pessoa => pessoa.id == id);

    // Verifica se a pessoa com o ID fornecido existe na lista
    if (!pessoa) {
        return res.status(404).json({ mensagem: "Pessoa não encontrada." });
    }

    res.json(pessoa);
});


// CREATE - PARA CADASTRAR UMA NOVA PESSOA...
router.post('/pessoas', (req, res) => {
    const dadosPessoa = req.body;

    // Verifica se os dados obrigatórios estão presentes
    if (!dadosPessoa.nome || !dadosPessoa.idade || !dadosPessoa.email || !dadosPessoa.telefone) {
        return res.status(400).json({ mensagem: "Todos os campos (nome, idade, email, telefone) são obrigatórios." });
    }

    const novaPessoa = {
        id: Math.round(Math.random() * 1000),
        nome: dadosPessoa.nome,
        idade: dadosPessoa.idade,
        email: dadosPessoa.email,
        telefone: dadosPessoa.telefone
    };

    listaPessoas.push(novaPessoa);

    res.json({
        mensagem: "Pessoa criada com sucesso!",
        pessoa: novaPessoa
    });
});


// UPDATE - ATUALIZAR UMA PESSOA COM BASE EM SEU ID...
router.put('/pessoas/:id', (req, res) => {
    const id = req.params.id;
    const novosDados = req.body;

    // Verifica se todos os campos obrigatórios foram adicionados aos novos dados...
    if (!novosDados.nome || !novosDados.idade || !novosDados.email || !novosDados.telefone) {
        return res.status(400).json({ mensagem: "Todos os campos (nome, idade, email, telefone) são obrigatórios." });
    }

    const index = listaPessoas.findIndex(pessoa => pessoa.id == id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Pessoa não encontrada" });
    }

    const pessoaAtualizada = {
        id: Number(id),
        nome: novosDados.nome,
        idade: novosDados.idade,
        email: novosDados.email,
        telefone: novosDados.telefone
    };

    listaPessoas[index] = pessoaAtualizada;

    res.json({
        mensagem: "Pessoa atualizada com sucesso!"
    });
});


// DELETE - REMOVER UMA PESSOA COM BASE EM SEU ID...
router.delete('/pessoas/:id', (req, res) => {
    const id = req.params.id;

    const index = listaPessoas.findIndex(pessoa => pessoa.id == id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Pessoa não encontrada" });
    }

    listaPessoas.splice(index, 1);

    res.json({ mensagem: "Pessoa removida com sucesso!" });
});


module.exports = router;