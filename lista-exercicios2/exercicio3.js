// 3. Escrever uma api que lê o nome de um vendedor, o seu salário fixo, o total de vendas por ele efetuadas e o percentual 
// que ganha sobre o total de vendas. Calcular o salário total do vendedor. Escrever o nome do vendedor e seu salário total.
const express = require('express');
const app = express();

app.use(express.json());

app.post('/exercicio3', (req, res) => {
    const { nome, salarioFixo, totalVendas, percentual } = req.body;

    const comissao = (totalVendas * percentual) / 100;
    const salarioTotal = salarioFixo + comissao;

    const resposta = {
        nome: nome,
        salarioTotal: salarioTotal
    };

    res.json(resposta);
});

app.listen(3000, () => {
    console.log("API INICIALIZANDO AUTOMATICAMENTE... Rodando em http://localhost:3000");
});
