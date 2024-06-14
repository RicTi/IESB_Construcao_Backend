const Pedido = require('../models/Pedido');
const Comissao = require('../models/Comissao');
require('dotenv').config();

// Função auxiliar para calcular a taxa por região
const calcularTaxaPorRegiao = (regiao) => {
    switch (regiao) {
        case '1':
            return { valor: 4, somarAoPagamento: false };
        case '2':
            return { valor: 5, somarAoPagamento: true };
        case '3':
            return { valor: 6, somarAoPagamento: true };
        case '4':
            return { valor: 8, somarAoPagamento: true };
        default:
            return { valor: 0, somarAoPagamento: false };
    }
};

// Função para criar um novo pedido
async function criarPedido(req, res) {
    try {
        const { numeroPedido, entregador, dataPedido, regiaoPedido, formaPagamento, valorPedido } = req.body;

        const pedido = new Pedido({
            numeroPedido,
            entregador,
            dataPedido: new Date(),
            regiaoPedido,
            formaPagamento,
            valorPedido
        });

        await pedido.save();
        res.status(201).json({ mensagem: "Pedido criado com sucesso!", pedido });
    } catch (error) {
        res.status(400).json({ mensagem: "Pedido já cadastrado!" });
    }
}

// Função para calcular a comissão do entregador
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

        const novaComissao = new Comissao({
            entregador: entregadorId,
            data: new Date(data),
            totalPedidos,
            valorComissao: comissaoCalculada
        });

        await novaComissao.save();

        res.status(200).json({
            mensagem: "Comissão calculada com sucesso!",
            comissao: novaComissao
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para buscar todos os pedidos
async function buscarTodos(req, res) {
    try {
        const pedidos = await Pedido.find();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para buscar um pedido por ID
async function buscarPorId(req, res) {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findById(id);
        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ mensagem: "Pedido não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para atualizar um pedido
async function atualizarPedido(req, res) {
    try {
        const { id } = req.params;
        const { numeroPedido, entregador, dataPedido, regiaoPedido, formaPagamento, valorPedido } = req.body;

        const pedidoAtualizado = await Pedido.findByIdAndUpdate(
            id,
            { numeroPedido, entregador, dataPedido, regiaoPedido, formaPagamento, valorPedido },
            { new: true, runValidators: true }
        );

        if (pedidoAtualizado) {
            res.status(200).json({ mensagem: "Pedido atualizado com sucesso!", pedidoAtualizado });
        } else {
            res.status(404).json({ mensagem: "Pedido não encontrado!" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Função para excluir um pedido
async function excluirPedido(req, res) {
    try {
        const { id } = req.params;

        const pedidoExcluido = await Pedido.findByIdAndDelete(id);

        if (pedidoExcluido) {
            res.status(200).json({ mensagem: "Pedido excluído com sucesso!", pedidoExcluido });
        } else {
            res.status(404).json({ mensagem: "Pedido não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    criarPedido,
    calcularComissao,
    buscarTodos,
    buscarPorId,
    atualizarPedido,
    excluirPedido
};
