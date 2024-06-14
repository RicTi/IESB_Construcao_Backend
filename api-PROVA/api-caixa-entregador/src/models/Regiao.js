const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        regiaoPedido: {
            type: Number,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        dataCadastro: {
            type: Date,
            required: true
        },
        pedido: {
            type: mongoose.Types.ObjectId,
            ref: 'pedido',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Comissao = mongoose.model('comissao', schema);

module.exports = Comissao;