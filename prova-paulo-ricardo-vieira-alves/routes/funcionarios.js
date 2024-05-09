const express = require('express');

const router = express.Router();

const listaFuncionarios = [
{
    "id": 1,
    "nome": "Ricardo",
    "email": "motoric750@gmail.com",
    "telefone": "(61) 981555555",
    "cargo": "Desenvolvedor",
    "salario": 11000.00
},
{
    "id": 2,
	"nome": "Paulo",
	"email": "paulo123@hotmail.com",
	"telefone": "(61) 996779797",
	"cargo": "Atendente",
	"salario": 2500.00
},
{
    "id": 3,
    "nome": "Maria",
	"email": "maria2024@gmail.com",
	"telefone": "(61) 985777777",
	"cargo": "Gerente",
	"salario": 10000.00
},
{
    "id": 4,
    "nome": "Stanislau",
	"email": "stanislau1234@hotmail.com",
	"telefone": "(61) 993566666",
	"cargo": "Gerente de IA",
	"salario": 35000.00
}
];

// Buscar todos os funcionários...
router.get('/funcionarios', (req, res) => {
    res.json(listaFuncionarios);
});

// Buscar um funcionário específico pelo id...
router.get('/funcionario/:id', (req, res) => {
    const id = req.params.id;

    if(isNaN(id)) {
        return res.status(400).json({mensagem: "ID inválido! O ID deve conter apenas números."});
    }

    const funcionario = listaFuncionarios.find(funcionario => funcionario.id == id);

    if (!funcionario) {
        return res.status(404).json({ mensagem: "Funcionário não encontrado!"});
    }

    res.json(funcionario);

});

// Para cadastrar um novo funcionário...
router.post('/funcionario', (req, res) => {
    const dadosFuncionario = req.body;

    if (!dadosFuncionario.nome || !dadosFuncionario.email || !dadosFuncionario.telefone || !dadosFuncionario.cargo || !dadosFuncionario.salario) {
        return res.status(400).json({ mensagem: " Os campos nome, email, telefone, cargo e salário são obrigatórios!" });
    }

    const novoFuncionario = {
        id: Math.round(Math.random() * 1000),
        nome: dadosFuncionario.nome,
        email: dadosFuncionario.email,
        telefone: dadosFuncionario.telefone,
        cargo: dadosFuncionario.cargo,
        salario: dadosFuncionario.salario
    };

    listaFuncionarios.push(novoFuncionario);

    res.status(201).json({ mensagem: "Funcionário criado com sucesso!",
    funcionario: novoFuncionario
    });
})

// Para atualizar um funcionário existente com base em seu ID...
router.put('/funcionario/:id', (req, res) => {
    const id = req.params.id;
    const novosDados = req.body;

    if (!novosDados.nome || !novosDados.email || !novosDados.telefone || !novosDados.cargo || !novosDados.salario) {
        return res.status(400).json({ mensagem: " Os campos nome, email, telefone, cargo e salário são obrigatórios!" })
    }

    const index = listaFuncionarios.findIndex(funcionario => funcionario.id == id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Funcionário não encontrado! Verifique se os dados estão corretos e tente novamente."})
    }
    const funcionarioAtualizado = {
        id: Number(id),
        nome: novosDados.nome,
        email: novosDados.email,
        telefone: novosDados.telefone,
        cargo: novosDados.cargo,
        salario: novosDados.salario
    };

    listaFuncionarios[index] = funcionarioAtualizado;

    res.json({
        mensagem: "Funcionário atualizado com sucesso"
    })
})

// Para deletar o registro de um funcinário com base em seu ID...
router.delete('/funcionario/:id', (req, res) => {
    const id = req.params.id;

    const index = listaFuncionarios.findIndex(funcionario => funcionario.id == id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Funcionário não encontrado!" });
    }

    listaFuncionarios.splice(index, 1);
    
    res.json({ mensagem: "Funcionário removido com sucesso!" });
});

// Buscar todos os funcionário de mesmo cargo...
router.get('/funcionarios/cargo/:cargo', (req, res) => {
    const cargo = req.params.cargo;

    // Filtrar funcionários com o mesmo cargo
    const funcionariosPorCargo = listaFuncionarios.filter(funcionario => funcionario.cargo === cargo);

    // Verificar se há funcionários com o cargo especificado
    if (funcionariosPorCargo.length === 0) {
        return res.status(404).json({ mensagem: "Nenhum funcionário encontrado para o cargo especificado."});
    }

    res.json(funcionariosPorCargo);
});

router.get('/funcionarios/salarios/media', (req, res) => {
    if (listaFuncionarios.length === 0) {
        return res.status(404).json({ mensagem: "Não há funcionários na lista."});
    }

    const totalSalarios = listaFuncionarios.reduce((total, funcionario) => total + funcionario.salario, 0);
    const mediaSalarial = totalSalarios / listaFuncionarios.length;

    res.json({ mediaSalarial });
});





module.exports = router
