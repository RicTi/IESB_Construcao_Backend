const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    salario: {
        type: Number,
        required: true                      // O comando required: true torna o atributos.
    }
},
{ timestamps: true })

const Cargo = mongoose.model('cargo', schema)

module.exports = Cargo