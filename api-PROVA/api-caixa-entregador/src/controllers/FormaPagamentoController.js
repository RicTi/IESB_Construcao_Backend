const FormaPagamento = require('../models/FormaPagamento');

// Função para criar uma nova forma de pagamento
async function criarFormaPagamento(req, res) {
    try {
        const { formaPagamento, descricao } = req.body;

        // Criar a nova forma de pagamento
        const novaFormaPagamento = new FormaPagamento({
            formaPagamento,
            descricao,
            dataCadastro: new Date()
        });

        // Salvar a nova forma de pagamento
        await novaFormaPagamento.save();

        res.status(201).json({
            mensagem: "Forma de pagamento criada com sucesso!",
            formaPagamento: novaFormaPagamento
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar a forma de pagamento!",
            error: error.message
        });
    }
}

// Função para buscar todas as formas de pagamento
async function buscarTodas(req, res) {
    try {
        const formasPagamento = await FormaPagamento.find();
        res.status(200).json(formasPagamento);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar formas de pagamento!",
            error: error.message
        });
    }
}

// Função para buscar uma forma de pagamento por ID
async function buscarPorId(req, res) {
    try {
        const { id } = req.params;
        const formaPagamento = await FormaPagamento.findById(id);

        if (!formaPagamento) {
            return res.status(404).json({ mensagem: "Forma de pagamento não encontrada!" });
        }

        res.status(200).json(formaPagamento);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar a forma de pagamento!",
            error: error.message
        });
    }
}

// Função para atualizar uma forma de pagamento
async function atualizarFormaPagamento(req, res) {
    try {
        const { id } = req.params;
        const { formaPagamento, descricao } = req.body;

        // Atualizar a forma de pagamento
        const formaPagamentoAtualizada = await FormaPagamento.findByIdAndUpdate(
            id,
            {
                formaPagamento,
                descricao
            },
            { new: true, runValidators: true }
        );

        if (!formaPagamentoAtualizada) {
            return res.status(404).json({ mensagem: "Forma de pagamento não encontrada!" });
        }

        res.status(200).json({
            mensagem: "Forma de pagamento atualizada com sucesso!",
            formaPagamento: formaPagamentoAtualizada
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar a forma de pagamento!",
            error: error.message
        });
    }
}

// Função para excluir uma forma de pagamento
async function excluirFormaPagamento(req, res) {
    try {
        const { id } = req.params;
        const formaPagamentoRemovida = await FormaPagamento.findByIdAndRemove(id);

        if (!formaPagamentoRemovida) {
            return res.status(404).json({ mensagem: "Forma de pagamento não encontrada!" });
        }

        res.status(200).json({ mensagem: "Forma de pagamento excluída com sucesso!" });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir a forma de pagamento!",
            error: error.message
        });
    }
}

module.exports = {
    criarFormaPagamento,
    buscarTodas,
    buscarPorId,
    atualizarFormaPagamento,
    excluirFormaPagamento
};
