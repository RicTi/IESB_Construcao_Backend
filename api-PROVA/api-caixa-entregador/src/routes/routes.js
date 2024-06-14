const express = require('express');
const router = express.Router();

// controllers
const PedidoController = require('../controllers/PedidoController');
const EntregadorController = require('../controllers/EntregadorController');
const FuncionarioController = require('../controllers/FuncionarioController');
const CargoController = require('../controllers/CargoController');
const FormaPagamentoController = require('../controllers/FormaPagamentoController');
const RegiaoController = require('../controllers/RegiaoController');



// validators
const { validarID } = require('../validators/IdValidator');
const { validarPedido } = require('../validators/PedidoValidator');
const { validarEntregador } = require('../validators/EntregadorValidator');
const { validarFuncionario } = require('../validators/FuncionarioValidator');
const { validarCargo } = require('../validators/CargoValidator');
const { validarFormaPagamento } = require('../validators/FormaPagamentoValidator');
const { validarRegiao } = require('../validators/RegiaoValidator');


// Pedidos
router.post('/pedido',validarPedido, PedidoController.criarPedido);
router.get('/pedidos', PedidoController.buscarTodos);
router.get('/pedido/:id', validarID, PedidoController.buscarPorId);
router.put('/pedido/:id', validarID, validarPedido, PedidoController.atualizarPedido);
router.delete('/pedido/:id', validarID, PedidoController.excluirPedido);

// Entregador
router.post('/entregador', validarEntregador, EntregadorController.criarEntregador);
router.get('/entregadores', EntregadorController.buscarTodos);
router.get('/entregador/:id', EntregadorController.buscarPorId);
router.put('/entregador/:id', validarEntregador, EntregadorController.atualizarEntregador);
router.delete('/entregador/:id', EntregadorController.excluirEntregador);

// Funcionario
router.post('/funcionario', validarFuncionario, FuncionarioController.criarFuncionario);
router.get('/funcionarios', FuncionarioController.buscarTodos);
router.get('/funcionario/:id', FuncionarioController.buscarPorId);
router.put('/funcionario/:id', validarFuncionario, FuncionarioController.atualizarFuncionario);
router.delete('/funcionario/:id', FuncionarioController.excluirFuncionario);

// Cargo
router.post('/cargo', validarCargo, CargoController.criarCargo);
router.get('/cargos', CargoController.buscarTodos);
router.get('/cargo/:id', validarID, CargoController.buscarPorId);
router.put('/cargo/:id', validarID, validarCargo, CargoController.atualizarCargo);
router.delete('/cargo/:id', validarID, CargoController.excluirCargo);

// Região
router.post('/regiao', validarRegiao, RegiaoController.criarRegiao);
router.get('/regioes', RegiaoController.buscarTodas);
router.get('/regiao/:id', validarID, RegiaoController.buscarPorId);
router.put('/regiao/:id', validarID, RegiaoController.atualizarRegiao);
router.delete('/regiao/:id', validarID, RegiaoController.excluirRegiao);
router.get('/comissao', RegiaoController.calcularComissao);

// Forma de Pagamento
router.post('/formapagamento',validarFormaPagamento, FormaPagamentoController.criarFormaPagamento);
router.get('/formaspagamentos', FormaPagamentoController.buscarTodas);
router.get('/formaspagamento/:id', FormaPagamentoController.buscarPorId);
router.put('/formapagamento/:id', validarFormaPagamento, FormaPagamentoController.atualizarFormaPagamento);
router.delete('/formapagamento/:id', FormaPagamentoController.excluirFormaPagamento);






module.exports = router;
