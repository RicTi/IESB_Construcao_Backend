// 7. Faça um script que leia duas notas de um aluno, calcule e escreva a média final deste aluno. Considerar que a média é ponderada 
// e que o peso das notas é 4 e 6.

const prompt = require('prompt-sync')();

const nota1 = Number(prompt(' Digite a primeira nota: '));
const nota2 = Number(prompt(' Digite a segunda nota: '));

const pesoNota1 = 4;
const pesoNota2 = 6;

let media = (nota1 * pesoNota1 + nota2 * pesoNota2) / (pesoNota1 + pesoNota2);

console.log(` A média ponderada do aluno ficou em: ${media} ...`)