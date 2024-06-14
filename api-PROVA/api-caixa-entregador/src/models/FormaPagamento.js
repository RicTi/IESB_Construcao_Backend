const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        formaPagamento: {
            type: String,
            required: true
        },
        descricao: {
            type: String
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const FormaPagamento = mongoose.model('formapagamento', schema);

module.exports = FormaPagamento;
