// 2. Uma empresa decide dar um aumento de 30% aos funcionários cujo salário é inferior a 1.000 reais. 
// Escreva uma api que receba o salário de um funcionário e imprima o valor do salário reajustado ou uma mensagem 
// caso o funcionário não tenha direito ao aumento..

const express = require('express');
const app = express();

app.use(express.json());

app.post('/exercicio2', (req, res) => {
    const {salario} = req.body;

    if (salario < 1000) {
        const aumento = (salario * 30) / 100;
        const novoSalario = salario + aumento;

        const resposta = {
            mensagem: " Este funcionário tem direito ao aumento de 30% sob salário.",
            salarioAntigo: salario,
            novoSalario: novoSalario
        };
        res.json(resposta);
        
    } else {
        res.json({ mensagem: "Este funcionário não tem direito ao aumento de 30% sob salário."});
        
    }
    
})

app.listen(3000, () => {
    console.log("API INICIALIZANDO AUTOMATICAMENTE... Rodando em http://localhost:3000");
})