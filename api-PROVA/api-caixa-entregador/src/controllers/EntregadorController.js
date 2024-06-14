const Entregador = require('../models/Entregador');
require('dotenv').config();

// Função para criar um novo entregador
async function criarEntregador(req, res) {
    try {
        const { nome, veiculo, placaVeiculo, funcionario } = req.body;

        const entregador = new Entregador({
            nome,
            veiculo,
            placaVeiculo,
            funcionario
        });

        await entregador.save();
        res.status(201).json({ mensagem: "Entregador criado com sucesso!", entregador });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Função para buscar todos os entregadores
async function buscarTodos(req, res) {
    try {
        const entregadores = await Entregador.find();
        res.status(200).json(entregadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para buscar um entregador por ID
async function buscarPorId(req, res) {
    try {
        const { id } = req.params;
        const entregador = await Entregador.findById(id);
        if (entregador) {
            res.status(200).json(entregador);
        } else {
            res.status(404).json({ mensagem: "Entregador não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para atualizar um entregador
async function atualizarEntregador(req, res) {
    try {
        const { id } = req.params;
        const { nome, veiculo, placaVeiculo, funcionario } = req.body;

        const entregadorAtualizado = await Entregador.findByIdAndUpdate(
            id,
            { nome, veiculo, placaVeiculo, funcionario },
            { new: true, runValidators: true }
        );

        if (entregadorAtualizado) {
            res.status(200).json({ mensagem: "Entregador atualizado com sucesso!", entregadorAtualizado });
        } else {
            res.status(404).json({ mensagem: "Entregador não encontrado!" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Função para excluir um entregador
async function excluirEntregador(req, res) {
    try {
        const { id } = req.params;

        const entregadorExcluido = await Entregador.findByIdAndDelete(id);

        if (entregadorExcluido) {
            res.status(200).json({ mensagem: "Entregador excluído com sucesso!", entregadorExcluido });
        } else {
            res.status(404).json({ mensagem: "Entregador não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    criarEntregador,
    buscarTodos,
    buscarPorId,
    atualizarEntregador,
    excluirEntregador
};
