const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true,
            unique: true
        },
        telefone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        dataNascimento: {
            type: String,
            required: true
        },
        dataContratacao: {
            type: Date,
            required: true
        },
        cargo: {
            type: mongoose.Types.ObjectId,
            ref: 'cargo',
            required: true
        }

    },

    { timestamps: true }

)

const Funcionario = mongoose.model('funcionario', schema);

module.exports = Funcionario;