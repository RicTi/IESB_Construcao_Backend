const Cargo = require('../models/Cargo');

// Função para criar um novo cargo
async function criarCargo(req, res) {
    try {
        const { nome, descricao, salarioBase } = req.body;

        const cargo = new Cargo({
            nome,
            descricao,
            salarioBase
        });

        await cargo.save();
        res.status(201).json({ mensagem: "Cargo criado com sucesso!", cargo });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Função para buscar todos os cargos
async function buscarTodos(req, res) {
    try {
        const cargos = await Cargo.find();
        res.status(200).json(cargos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para buscar um cargo por ID
async function buscarPorId(req, res) {
    try {
        const { id } = req.params;
        const cargo = await Cargo.findById(id);
        if (cargo) {
            res.status(200).json(cargo);
        } else {
            res.status(404).json({ mensagem: "Cargo não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para atualizar um cargo
async function atualizarCargo(req, res) {
    try {
        const { id } = req.params;
        const { nome, descricao, salarioBase } = req.body;

        const cargoAtualizado = await Cargo.findByIdAndUpdate(
            id,
            { nome, descricao, salarioBase },
            { new: true, runValidators: true }
        );

        if (cargoAtualizado) {
            res.status(200).json({ mensagem: "Cargo atualizado com sucesso!", cargoAtualizado });
        } else {
            res.status(404).json({ mensagem: "Cargo não encontrado!" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Função para excluir um cargo
async function excluirCargo(req, res) {
    try {
        const { id } = req.params;

        const cargoExcluido = await Cargo.findByIdAndDelete(id);

        if (cargoExcluido) {
            res.status(200).json({ mensagem: "Cargo excluído com sucesso!", cargoExcluido });
        } else {
            res.status(404).json({ mensagem: "Cargo não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    criarCargo,
    buscarTodos,
    buscarPorId,
    atualizarCargo,
    excluirCargo
};
