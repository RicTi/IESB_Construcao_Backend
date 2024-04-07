// Importando o módulo express...
const express = require('express');

// Criando a aplicação express...
const app = express();

// Middlewares -> Intermediários...
// Imprime a data de quando foi feita a requisição.
app.use((req, res, next) => {
    const data = new Date().toISOString()
    console.log(`Data: ${data}`)
    next()
})

// Transformando o intermediário que transforma o corpo da requisição em JSON...
// app.use(express.json())

// Construir a lógica da minha API, que seria o contrato da minha API...
app.get('/', (req, res) => {
    res.send("Porta de resposta 1 funcionando corretamente...")
})

app.get("/nome", (req, res) => {
    res.send("Ricardo A.!")
})

app.post('/nome', (req, res) => {
    console.log(req.body)
    res.json()
})

app.get('/users', (req, res) => {
    const nome = req.query.nome
    res.json({mensagem: `${nome}`})
})

app.get('/aluno', (req, res) => {
    res.send("Aluno: Ricardo Vinícius - Matrícula: 22109758")
})

// PATH PARAM pessoa/gustavo/20
app.get('/pessoa/:nome/:idade', (req, res) => {
    console.log(req.params)
    const nomePessoa = req.params.nome
    const idadePessoa = req.params.idade
    let maiorDe18 = null
    if (idadePessoa >= 18 ) {
        maiorDe18 = "Maior de idade!"
    } else {
        maiorDe18 = "Menor de idade!"
    }

    res.send(`Olá, ${nomePessoa}. Você está bem? Você é ${maiorDe18}`)
})











// Definindo o start da api e a porta na qual será executada dentro do servidor...
app.listen(3000, () => {
    console.log("API iniciada... Rodando em http://localhost:3000")
})