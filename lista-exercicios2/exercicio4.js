// 4. Faça uma api que leia o nome de um piloto, uma distância percorrida em km e o tempo que o piloto levou para percorrê-la (em horas). 
// O programa deve calcular a velocidade média - Velocidade = Distância / Tempo - em km/h, e exibir a seguinte frase: 
//  A velocidade média do <nome do piloto> foi <velocidade media calculada> km/h..

const express = require('express');
const app = express();

app.use(express.json());

app.post('/exercicio4', (req, res) => {
    const { nomePiloto, distancia, tempo } = req.body;

    const velocidadeMedia = distancia / tempo;

    const resposta = {
        mensagem: `A velocidade média do ${nomePiloto} foi ${velocidadeMedia.toFixed(3)} km/h.`
    };

    res.json(resposta);
});

app.listen(3000, () => {
    console.log("API INICIALIZANDO AUTOMATICAMENTE... Rodando em http://localhost:3000");
});
