const express = require('express')
const router = express.Router()

const listaCarros = [
   
{
    id: 1,
    marca: "Mitsubishi",
    modelo: "Lancer",
    cor: "Amarelo",
    valor: 150000.0
},

{
    id: 2,
    marca: "Mitsubishi",
    modelo: "L200",
    cor: "Amarelo",
    valor: 180000.00
},

{
    id: 3,
    marca: "Mitsubishi",
    modelo: "Pajero",
    cor: "Amarelo",
    valor: 210000.00
},
]

// READ - BUSCAR TODOS OS PRODUTOS...
router.get('/carros', (req, res) => {
    res.json(listaCarros)
})

// READ - BUSCA DE PRODUTOS POR ID
router.get('/carros/:id', (req, res) => {
    const id = req.params.id
    const carros = listaCarros.find(carros => carros.id == id)
    if(carros){
        res.json(carros)
    } else {
        res.status(404).json({mensagem: "Carro não encontrado"})
    }

    res.json(carros)
})

// CREATE - PARA CRIAR UM NOVO PRODUTO...
router.post('/carros', (req, res) => {
    const dadosCarros = req.body
    
    if (!dadosCarros.marca || !dadosCarros.modelo || !dadosCarros.cor || !dadosCarros.valor || !dadosCarros.preco) {
        return res.status(400).json({mensagem: "Todos os campos são obrigatorios."})
    }

    const novoCarro = {
        id: Math.round(Math.random() *1000),
        marca: dadosCarros.nome,
        modelo: dadosCarros.modelo,
        cor: dadosCarros.cor,
        valor: dadosCarros.valor,
        preco: dadosCarros.preco
    }

    listaCarros.push(novoCarro)

    res.status(201).json (

        {
            mensagem: "Carro criado com sucesso!",
            novoCarro
        }
    )

})

// UPDATE - 
router.put('/carros/:id', (req, res) => {
    const id = req.params.id
    const novosCarros = req.body
    
    if (!dadosCarros.marca || !dadosCarros.modelo || !dadosCarros.cor || !dadosCarros.valor || !dadosCarros.preco) {
        return res.status(400).json({mensagem: "Todos os campos são obrigatórios!"})
    }
    const index = listaCarros.findIndex(carros => carros.id == id)

    if(index == -1) {
        res.status(404).json({mensagem: "Carro não encontrado"})
    }

    const carroAtualizado = {
        id: Number(id),
        marca: dadosCarros.marca,
        modelo: dadosCarros.modelo,
        cor: dadosCarros.cor,
        valor: dadosCarros.valor,
        preco: dadosCarros.preco
    }

    listaCarros[index] = carroAtualizado
    
    res.json({
        mensagem: "Carro ATUALIZADO com sucesso!",
        carroAtualizado
    })
})



// Comando para exportar o módulo "router"...
module.exports = router