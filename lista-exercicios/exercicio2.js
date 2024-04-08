//2. Escreva um script para ler o número total de eleitores de um município, o número de votos brancos, nulos e válidos. 
// Calcular e escrever o percentual que cada um representa em relação ao total de eleitores.

const prompt = require('prompt-sync')();

const totalEleitores = parseInt(prompt('Qual o número total de eleitores? '));
const votosBrancos = parseInt(prompt('Quantos votos em branco foram registrados? '));
const votosNulos = parseInt(prompt('Quantos votos nulos foram registrados? '));
const votosValidos = parseInt(prompt('Quantos votos válidos foram registrados? '));

const percentualBrancos = (votosBrancos / totalEleitores) * 100;
const percentualNulos = (votosNulos / totalEleitores) * 100;
const percentualValidos = (votosValidos / totalEleitores) * 100;

console.log(` ${percentualBrancos.toFixed(2)}% dos votos em branco em relação ao total de eleitores.`);
console.log(` ${percentualNulos.toFixed(2)}% dos votos nulos em relação ao total de eleitores.`);
console.log(` ${percentualValidos.toFixed(2)}% dos votos válidos em relação ao total de eleitores.`);
