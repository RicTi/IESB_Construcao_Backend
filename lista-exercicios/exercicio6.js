// 6. Uma revendedora de carros usados paga a seus funcionários vendedores um salário fixo por mês, mais uma comissão também 
// fixa para cada carro vendido e mais 5% do valor das vendas por ele efetuadas. Escrever um script que leia o número de carros 
// por ele vendidos, o valor total de suas vendas, o salário fixo e o valor que ele recebe por carro vendido. Calcule e escreva 
// o salário final do vendedor.

const prompt = require('prompt-sync')();

const carrosVendidos = Number(prompt(" Informe a quantidade de carros vendidos: "));
const totalVendas = parseFloat(prompt(" Informe o total bruto obtido com a venda dos "+carrosVendidos+" carros. R$: "));
const salarioFixo = parseFloat(prompt(" Informe o valor do salário fixo mensal do funcionário. R$: "));
const comissaoFixa = parseFloat(prompt(" Informe o valor da comissão por cada veículo vendido. R$: "));
let percentualComissao = (totalVendas * 5) / 100;
let comissaoVenda = carrosVendidos * comissaoFixa;
let salarioFinal =  salarioFixo + percentualComissao + comissaoVenda;

console.log(` Este mês foram vendidos ${carrosVendidos} carros, obtendo um total bruto de R$ ${totalVendas.toFixed(2)} .`)
console.log(` O salário fixo mensal do vendedor é R$ ${salarioFixo.toFixed(2)}`);
console.log(` O vendedor ganhou R$ ${comissaoFixa.toFixed(2)} por cada veículo vendido e mais 5% em cima do total obtido nas vendas.`);
console.log(` O salário final do vendedor ficou R$ ${salarioFinal.toFixed(2)} .`);