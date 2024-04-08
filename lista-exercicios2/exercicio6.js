// 6. Construa uma api que calcule o peso ideal de uma pessoa. Dados de entrada: altura e sexo. Fórmulas para cálculo do peso:
//  • peso ideal de homem = (72,7 x altura) – 58
//  • peso ideal da mulher = (62,1 x altura) – 44,7.

const express = require('express');
const app = express();

app.use(express.json());

app.post('/exercicio6', (req, res) => {
    const { altura, sexo } = req.body;
    let pesoIdeal;

    if (sexo.toLowerCase() === 'masculino') {
        pesoIdeal = (72.7 * altura) - 58;
    } else if (sexo.toLowerCase() === 'feminino') {
        pesoIdeal = (62.1 * altura) - 44.7;
    } else {
        return res.status(400).json({ mensagem: "Sexo inválido. Use 'masculino' ou 'feminino'." });
    }

    const resposta = {
        altura: altura,
        sexo: sexo,
        pesoIdeal: pesoIdeal
    };

    res.json(resposta);
});

app.listen(3000, () => {
    console.log("API INICIALIZANDO AUTOMATICAMENTE... Rodando em http://localhost:3000");
});
