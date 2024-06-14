const Comissao = require('../models/Comissao');
const Pedido = require('../models/Pedido');
const Entregador = require('../models/Entregador');

// Função para calcular a comissão
async function calcularComissao(req, res) {
    try {
        const { entregadorId, data } = req.params;

        // Converter a data recebida para um objeto Date válido
        const dia = parseInt(data.substring(0, 2));
        const mes = parseInt(data.substring(2, 4)) - 1; // Mês em JavaScript é 0-indexado
        const ano = parseInt(data.substring(4, 8));
        
        if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
            return res.status(400).json({ mensagem: "Data inválida fornecida!" });
        }

        const dataFormatada = new Date(ano, mes, dia);
        
        if (isNaN(dataFormatada.getTime())) {
            return res.status(400).json({ mensagem: "Data inválida fornecida!" });
        }

        const inicioDia = new Date(dataFormatada.setHours(0, 0, 0, 0));
        const fimDia = new Date(dataFormatada.setHours(23, 59, 59, 999));

        const pedidos = await Pedido.find({
            entregador: entregadorId,
            dataPedido: { $gte: inicioDia, $lte: fimDia },
        });

        if (pedidos.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum pedido encontrado para a data fornecida!" });
        }

        let totalEntregas = pedidos.length;
        let valorTotalTaxaRegiao = 0;
        let valorTotalTaxaEntrega = 0;

        for (let pedido of pedidos) {
            valorTotalTaxaRegiao += pedido.valorTaxaRegiao;
            valorTotalTaxaEntrega += pedido.valorTaxaEntrega;
        }

        const totalComissao = (valorTotalTaxaRegiao + valorTotalTaxaEntrega) * 0.05;

        const novaComissao = new Comissao({
            descricao: `Comissão calculada para entregador ${entregadorId} em ${data}`,
            dataFechamento: dataFormatada,
            totalEntregas,
            taxaRegiao: valorTotalTaxaRegiao,
            taxaEntrega: valorTotalTaxaEntrega,
            totalComissao,
            entregador: entregadorId
        });

        await novaComissao.save();

        res.status(201).json({
            mensagem: "Comissão calculada com sucesso!",
            comissao: novaComissao
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao calcular a comissão!",
            error: error.message
        });
    }
}

module.exports = {
    calcularComissao
};
