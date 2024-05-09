// Aqui se inicia a construção do código relacionado a aprendizagem de mongodb...
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

// Middlewares
app.use(express.json())

// Conexão com o MongoDB...
mongoose.connect(`mongodb+srv://:@cluster0.zy0xsib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch(err => console.log("Erro ao conectar ao MongoDB: ", err))

// Schemas...
const Tarefas = mongoose.model('tarefa', { nome: String })

// Rotas...
app.post('/tarefas', async (req, res) => {                  // usar async + await para tornar a função assíncrona
    const tarefa = new Tarefas({nome: req.body.nome})
    const tarefaCriada = await tarefa.save()                // usar await + async para tornar a função assíncrona
    res.json(tarefaCriada)
})

app.listen(PORT, () => {
    console.log(`API Iniciando... Rodando na porta ${PORT}`)
})
