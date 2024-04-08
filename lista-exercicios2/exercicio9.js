/*
 9. Faça uma api que receba o valor do salário mínimo, o número de horas trabalhadas, o número de dependentes do funcionário e a 
    quantidade de horas extras trabalhadas. Calcule e imprima o salário a receber do funcionário seguindo as regras abaixo:

•  Valor da hora trabalhada é igual a 1/5 do salário mínimo;
•  Salário do mês é igual ao número de horas trabalhadas vezes o valor da hora trabalhada;
•  Para cada dependente acréscimo de 32 reais;
•  Para cada hora extra trabalhada o cálculo do valor da hora trabalhada acrescida de 50 %;
•  Salário bruto é igual ao salário do mês mais os valores dos dependentes mais os valores das horas extras;
•  Cálculo do valor do imposto de renda retido na fonte segue a tabela abaixo:
    IRRF | Salário Bruto
    Isento Inferior a 2.000
    10% De 2.000 a 5.000
    20% Superior a 5.000
• Salário líquido é igual ao salário bruto menos IRRF;
• A gratificação segue a próxima tabela:
      Salário Líquido | Gratificações
      Até 3.500 | 1.000 reais
      Superior a 3.500 | 500 reais
• Salário a receber do funcionário é igual ao salário líquido mais a gratificação.
*/

const express = require('express');
const app = express();

app.use(express.json());

app.post('/exercicio9', (req, res) => {
    const { salarioMinimo, horasTrabalhadas, dependentes, horasExtras } = req.body;

    // Calcula o valor da hora trabalhada
    const valorHora = salarioMinimo / 5;

    // Calcula o salário do mês
    const salarioMes = horasTrabalhadas * valorHora;

    // Calcula o acréscimo por dependente
    const acrescimoDependentes = dependentes * 32;

    // Calcula o valor da hora extra com 50% de acréscimo
    const valorHoraExtra = valorHora * 1.5;

    // Calcula o valor das horas extras
    const valorHorasExtras = horasExtras * valorHoraExtra;

    // Calcula o salário bruto
    const salarioBruto = salarioMes + acrescimoDependentes + valorHorasExtras;

    // Calcula o imposto de renda retido na fonte
    let irrf;
    if (salarioBruto <= 2000) {
        irrf = 0;
    } else if (salarioBruto <= 5000) {
        irrf = salarioBruto * 0.1;
    } else {
        irrf = salarioBruto * 0.2;
    }

    // Calcula o salário líquido
    const salarioLiquido = salarioBruto - irrf;

    // Calcula a gratificação
    let gratificacao;
    if (salarioLiquido <= 3500) {
        gratificacao = 1000;
    } else {
        gratificacao = 500;
    }

    // Calcula o salário a receber do funcionário
    const salarioReceber = salarioLiquido + gratificacao;

    res.json({
        salarioLiquido: salarioLiquido.toFixed(2),
        gratificacao: gratificacao.toFixed(2),
        salarioReceber: salarioReceber.toFixed(2)
    });
});

app.listen(3000, () => {
    console.log("API INICIALIZANDO AUTOMATICAMENTE... Rodando em http://localhost:3000");
});
