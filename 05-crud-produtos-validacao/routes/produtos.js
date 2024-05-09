/*
Esse arquivo "produtos.js" é o arquivo criado para rotas.
*/
const express = require('express');
const router = express.Router();

const listaProdutos = [
    {
        id: 1,
        nome: "Arroz",
        preco: 29.99
    },
    {
        id:2,
        nome: "Feijão",
        preco: 7.99
    },
    {
        id: 3,
        nome: "Cadeira Gamer",
        preco: 1999.99
    }
]
// READ - BUSCAR TODOS OS PRODUTOS...
router.get('/produtos', (req, res) => {
    res.json(listaProdutos)
})

// READ - BUSCA DE PRODUTOS POR ID
router.get('/produtos/:id', (req, res) => {
    const id = req.params.id
    const produto = listaProdutos.find(produto => produto.id == id)
    if(produto){
        res.json(produto)
    } else {
        res.status(404).json({mensagem: "Produto não encontrado"})
    }

    res.json(produto)
})

// CREATE - PARA CRIAR UM NOVO PRODUTO...
router.post('/produtos', (req, res) => {
    const dadosProduto = req.body
    const novoProduto = {
        id: Math.round(Math.random() * 1000),
        nome: dadosProduto.nome,
        preco: dadosProduto.preco
    }
    listaProdutos.push(novoProduto)
    res.json(
        {
            mensagem: "Produto criado com sucesso!"
        }
    )
})

// UPDATE - PARA ATUALIZAR UM PRODUTO EXISTENTE PELO ID...
router.put('/produtos/:id', (req, res) => {
    const id = req.params.id
    const novosDados = req.body
    
    const index = listaProdutos.findIndex(produto => produto.id == id)

    if(index == -1) {
        res.status(404).json({mensagem: "Produto não encontrado"})
    }

    const produtoAtualizado = {
        id: Number(id),
        nome: novosDados.nome,
        preco: novosDados.preco
    }

    listaProdutos[index] = produtoAtualizado
    
    res.json({
        mensagem: "Produto ATUALIZADO com sucesso!"
    })
})

// DELETE - PARA DELETAR UM PRODUTO PELO ID ESPECÍFICO...
router.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const index = listaProdutos.findIndex(produto => produto.id == id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    listaProdutos.splice(index, 1);

    res.json({ mensagem: "Produto DELETADO com sucesso!" });
});

// Comando para exportar o módulo "router"...
module.exports = router