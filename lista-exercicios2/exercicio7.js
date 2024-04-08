// 7. Faça uma api para ler o código e o preço de 15 produtos, calcular e escrever:
// • O maior preço lido; e
// • A média aritmética dos preços dos produtos..

const express = require('express');
const app = express();

app.use(express.json());

app.post('/exercicio7', (req, res) => {
    const produtos = req.body.produtos;

    let maiorPreco = 0;
    let somaPrecos = 0;

    produtos.forEach(produto => {
        if (produto.codigo && produto.preco) {
            if (produto.preco > maiorPreco) {
                maiorPreco = produto.preco;
            }
            somaPrecos += produto.preco;
        }
    });

    const mediaPrecos = somaPrecos / produtos.length;

    res.json({ maiorPreco: maiorPreco, mediaPrecos: mediaPrecos.toFixed(2) });
});

app.listen(3000, () => {
    console.log("API INICIALIZANDO AUTOMATICAMENTE... Rodando em http://localhost:3000");
});
