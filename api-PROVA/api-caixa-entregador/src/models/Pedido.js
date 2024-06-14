const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        numeroPedido: {
            type: String,
            required: true,
            unique: true        // garante valor único para cada comanda, evitando a duplicidade.
        },
        regiaoPedido: {
            type: Number,
            required: true
        },
        formaPagamento: {
            type: String,
            required: true
        },
        valorPedido: {
            type: Number,
            required: true
        },
        dataPedido: {
            type: String,
            required: true,
            default: Date.now   // Esse parâmetro define a data atual para dataPedido.
        },
        entregador: {
            type: mongoose.Types.ObjectId,
            ref: 'entregador',
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Pedido = mongoose.model('pedido', schema);

module.exports = Pedido;