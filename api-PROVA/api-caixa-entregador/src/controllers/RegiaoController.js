const Regiao = require('../models/Regiao');
const Pedido = require('../models/Pedido');
require('dotenv').config();

// Função auxiliar para calcular a taxa por região
const calcularTaxaPorRegiao = (regiao) => {
    switch (regiao) {
        case 1:
            return { valor: 4, somarAoPagamento: false };
        case 2:
            return { valor: 5, somarAoPagamento: true };
        case 3:
            return { valor: 6, somarAoPagamento: true };
        case 4:
            return { valor: 8, somarAoPagamento: true };
        default:
            return { valor: 0, somarAoPagamento: false };
    }
};

// Função para criar uma nova região
async function criarRegiao(req, res) {
    try {
        const { codigo, descricao } = req.body;

        const novaRegiao = new Regiao({
            codigo,
            descricao
        });

        await novaRegiao.save();
        res.status(201).json({ mensagem: "Região criada com sucesso!", regiao: novaRegiao });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar a região!", error: error.message });
    }
}

// Função para buscar todas as regiões
async function buscarTodas(req, res) {
    try {
        const regioes = await Regiao.find();
        res.status(200).json(regioes);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar as regiões!", error: error.message });
    }
}

// Função para buscar uma região por ID
async function buscarPorId(req, res) {
    try {
        const { id } = req.params;
        const regiao = await Regiao.findById(id);
        if (regiao) {
            res.status(200).json(regiao);
        } else {
            res.status(404).json({ mensagem: "Região não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar a região!", error: error.message });
    }
}

// Função para atualizar uma região
async function atualizarRegiao(req, res) {
    try {
        const { id } = req.params;
        const { codigo, descricao } = req.body;

        const regiaoAtualizada = await Regiao.findByIdAndUpdate(
            id,
            { codigo, descricao },
            { new: true, runValidators: true }
        );

        if (regiaoAtualizada) {
            res.status(200).json({ mensagem: "Região atualizada com sucesso!", regiao: regiaoAtualizada });
        } else {
            res.status(404).json({ mensagem: "Região não encontrada!" });
        }
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao atualizar a região!", error: error.message });
    }
}

// Função para excluir uma região
async function excluirRegiao(req, res) {
    try {
        const { id } = req.params;

        const regiaoExcluida = await Regiao.findByIdAndDelete(id);

        if (regiaoExcluida) {
            res.status(200).json({ mensagem: "Região excluída com sucesso!", regiao: regiaoExcluida });
        } else {
            res.status(404).json({ mensagem: "Região não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir a região!", error: error.message });
    }
}

// Função para validar a região ao criar ou atualizar um pedido
async function validarRegiao(req, res, next) {
    const { regiaoPedido } = req.body;

    if (![1, 2, 3, 4].includes(regiaoPedido)) {
        return res.status(400).json({
            mensagem: "Região inválida. A região deve ser um número de 1 a 4."
        });
    }

    next();
}

// Função para calcular a comissão com base na região do pedido
async function calcularComissao(req, res) {
    try {
        const { entregadorId, data } = req.params;
        const inicioDia = new Date(data).setHours(0, 0, 0, 0);
        const fimDia = new Date(data).setHours(23, 59, 59, 999);

        const pedidos = await Pedido.find({
            entregador: entregadorId,
            dataPedido: { $gte: inicioDia, $lte: fimDia }
        });

        let totalPedidos = 0;
        let valorComissao = 0;

        pedidos.forEach(pedido => {
            totalPedidos += 1;
            const taxa = calcularTaxaPorRegiao(pedido.regiaoPedido);
            if (taxa.somarAoPagamento) {
                valorComissao += taxa.valor;
            }
        });

        const comissaoCalculada = valorComissao * 0.05;

        res.status(200).json({
            mensagem: "Comissão calculada com sucesso!",
            totalPedidos,
            valorComissao: comissaoCalculada
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao calcular a comissão!", error: error.message });
    }
}

module.exports = {
    criarRegiao,
    buscarTodas,
    buscarPorId,
    atualizarRegiao,
    excluirRegiao,
    validarRegiao,
    calcularComissao
};
