// 4. O custo de um carro novo ao consumidor é a soma do custo de fábrica com a porcentagem do distribuidor e dos impostos 
// (aplicados ao custo de fábrica). Supondo que o percentual do distribuidor seja de 28% e os impostos de 45%, 
// escrever um script para ler o custo de fábrica de um carro, calcular e escrever o custo final ao consumidor.

const prompt = require('prompt-sync')();
const precoFabrica = parseFloat(prompt(" Informe o valor do carro vendido na fábrica: R$ "));
const percentualDistribuidor = (precoFabrica * 28) / 100;
const percentualImpostos = (precoFabrica * 45) / 100;
let precoFinal = precoFabrica+  percentualDistribuidor + percentualImpostos;

console.log("O valor do carro vendido na fábrica é de R$: " + precoFabrica.toFixed(2) + ". Adicionados os custos de 28% referente ao distribuidor e 45% referentes a impostos, o valor total do carro será de R$ " + (precoFinal.toFixed(2)));
