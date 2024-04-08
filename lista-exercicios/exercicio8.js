// 8. Faça um script que determine o volume de uma caixa d’água cilíndrica, sendo que o raio e a altura devem ser fornecidos.
// OBS: V = PI * Raio^2 * Altura

const prompt = require ('prompt-sync')();

const pi = 3.14;
const raio = parseFloat(prompt(" Informe o raio da caixa d'água: "));
const altura = parseFloat(prompt(" Informe a altura da caixa d'água: "));
const volume = pi * Math.pow(raio, 2) * altura;

console.log(" O volume total da caixa d'água é de "+volume+" litros.")





console.log("FIM!");