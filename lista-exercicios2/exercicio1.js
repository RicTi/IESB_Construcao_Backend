// 1. Faça uma api para calcular o estoque médio de uma peça, sendo que ESTOQUE MÉDIO = (QUANTIDADE MÍNIMA + QUANTIDADE MÁXIMA) /2.
/*
--- Essa é a informação em formato JSON para ser enviada através do corpo da requisição utilizando o POST...
{
    "peca": "Pneu aro 15",
    "quantidadeMinima": 10,
    "quantidadeMaxima": 150
}.
*/
const express = require('express');
const app = express();

app.use(express.json());

app.post('/exercicio1', (req, res) => {
    const corpo = req.body
    console.log(corpo);

    const estoqueMedio = (corpo.quantidadeMinima + corpo.quantidadeMaxima) / 2

    const resposta = {
        peca: corpo.peca,
        estoqueMedio: estoqueMedio
    }

    res.json(resposta);
})

app.listen(3000, () => {
    console.log("API iniciada... Rodando em http://localhost:3000")
});