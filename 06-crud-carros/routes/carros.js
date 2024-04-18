const express = require('express')

const router = express.Router()

const listaCarros = [
    {
        id: 1,
        marca: "Porsche",
        modelo:"911 Carrera GT",
        cor: "Azul",
        valor: 1765000000.00
    }
]




// READ - Buscar todos os carros...
router.get('/carros', (req, res) => {
    res.json(listaCarros)
})

// READ - Buscar carro pelo "id"...
router.get('/carros/:id', (req, res) => {
    const id = req.params.id
    const carro = listaCarros.find(carro => carro.id == id)
    if(carro) {
        return res.json(carro)
    }
    return res.status(404).json({ mensagem: "Carro não encontrado!" })
})



module.exports = router