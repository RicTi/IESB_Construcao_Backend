const mongoose = require('mongoose');

// Definição do esquema para a comissão
const schema = new mongoose.Schema(
    {
        descricao: {
            type: String
        },
        dataFechamento: {
            type: Date,
            default: Date.now   // Esse parâmetro define a data atual para dataPedido.
        },
        totalEntregas: {
            type: String, // Tipo String, mas geralmente seria melhor usar Number se for um valor numérico
            ref: 'entregador'
        },
        taxaRegiao: {
            type: Number,
            required: true // Campo obrigatório
        },
        taxaEntrega: {
            type: Number,
            required: true // Campo obrigatório
        },
        totalComissao: {
            type: Number,
            required: true // Campo obrigatório
        },
        entregador: {
            type: mongoose.Types.ObjectId,
            ref: 'entregador', // Referência ao modelo 'entregador'
            required: true // Campo obrigatório
        }
    },
    {
        timestamps: true // Adiciona campos `createdAt` e `updatedAt`
    }
);

// Verificação e reutilização do modelo se já estiver compilado
const Comissao = mongoose.models.comissao || mongoose.model('Comissao', schema);

module.exports = Comissao;
