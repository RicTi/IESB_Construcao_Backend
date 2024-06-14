const Funcionario = require('../models/Funcionario');

// Função para criar um novo funcionário
async function criarFuncionario(req, res) {
    try {
        // Extrair informações do corpo da requisição
        const { nome, cpf, telefone, email, dataNascimento, dataContratacao, cargo } = req.body;

        // Criar novo funcionário
        const funcionario = new Funcionario({
            nome,
            cpf,
            telefone,
            email,
            dataNascimento,
            dataContratacao,
            cargo
        });

        // Salvar o funcionário na base de dados
        await funcionario.save();

        // Responder com sucesso
        res.status(201).json({ mensagem: "Funcionário criado com sucesso!", funcionario });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.cpf) {
            // Erro de chave duplicada para o campo 'cpf'
            res.status(400).json({ mensagem: "O CPF informado já está cadastrado em nosso banco de dados! O funcionário já existe!" });
        } else {
            // Outros erros
            res.status(400).json({ mensagem: "Erro ao criar funcionário!", error: error.message });
        }
    }
}

// Função para buscar todos os funcionários
async function buscarTodos(req, res) {
    try {
        const funcionarios = await Funcionario.find().populate('cargo');
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para buscar um funcionário por ID
async function buscarPorId(req, res) {
    try {
        const { id } = req.params;
        const funcionario = await Funcionario.findById(id).populate('cargo');
        if (funcionario) {
            res.status(200).json(funcionario);
        } else {
            res.status(404).json({ mensagem: "Funcionário não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Função para atualizar um funcionário
async function atualizarFuncionario(req, res) {
    try {
        const { id } = req.params;
        const { nome, cpf, telefone, email, dataNascimento, dataContratacao, cargo } = req.body;

        const funcionarioAtualizado = await Funcionario.findByIdAndUpdate(
            id,
            { nome, cpf, telefone, email, dataNascimento, dataContratacao, cargo },
            { new: true, runValidators: true }
        ).populate('cargo');

        if (funcionarioAtualizado) {
            res.status(200).json({ mensagem: "Funcionário atualizado com sucesso!", funcionarioAtualizado });
        } else {
            res.status(404).json({ mensagem: "Funcionário não encontrado!" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Função para excluir um funcionário
async function excluirFuncionario(req, res) {
    try {
        const { id } = req.params;

        const funcionarioExcluido = await Funcionario.findByIdAndDelete(id);

        if (funcionarioExcluido) {
            res.status(200).json({ mensagem: "Funcionário excluído com sucesso!", funcionarioExcluido });
        } else {
            res.status(404).json({ mensagem: "Funcionário não encontrado!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    criarFuncionario,
    buscarTodos,
    buscarPorId,
    atualizarFuncionario,
    excluirFuncionario
};
