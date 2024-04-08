// 5. Faça uma api que calcule e imprima o salário reajustado de um funcionário de acordo com a seguinte regra:
//  • Salários até 2.000, reajuste de 50%
//  • Salários maiores que 2.000, reajuste de 30%.

const express = require('express');
const app = express();

app.use(express.json());

app.post('/exercicio5', (req, res) => {
    const { salario } = req.body;
    let novoSalario;

    if (salario <= 2000) {
        novoSalario = salario * 1.5; // Reajuste de 50%
    } else {
        novoSalario = salario * 1.3; // Reajuste de 30%
    }

    const resposta = {
        salarioAntigo: salario,
        novoSalario: novoSalario
    };

    res.json(resposta);
});

app.listen(3000, () => {
    console.log("API INICIALIZANDO AUTOMATICAMENTE... Rodando em http://localhost:3000");
});
