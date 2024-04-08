// 3. Escreva um script para ler o salário mensal atual de um funcionário e o percentual de reajuste. 
// Calcular e escrever o valor do novo salário.
// Defini um reajuste de 11% sob o valor do salário.
const prompt = require('prompt-sync')();
const salario = parseFloat(prompt('Informe o valor do salário do funcionário: '));

const reajuste = (salario * 11) / 100;
let novoSalario = salario + reajuste;

console.log(`O funcionário que ganhava R$ ${salario.toFixed(2)}, com um rajuste de 11% sob esse valor, passou a ganhar R$ ${novoSalario.toFixed(2)} ...`)


