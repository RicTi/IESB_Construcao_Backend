const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        veiculo: {
            type: String,
            required: true
        },
        placaVeiculo: {
            type: String,
            required: true,
            unique: true
        },
        funcionario: {
            type: mongoose.Types.ObjectId,
            ref: 'funcionario',
            required: true
        }
    },

    { timestamps: true }
    
)

const Entregador = mongoose.model('entregador', schema)

module.exports = Entregador