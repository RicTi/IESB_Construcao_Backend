const yup = require('yup');

// Esquema de validação para criar ou atualizar uma região
const schema = yup.object().shape({
    codigo: yup
        .number()
        .required('O campo código é obrigatório.')
        .integer('O código da região deve ser um número inteiro.')
        .min(1, 'O código da região deve ser pelo menos 1.')
        .max(4, 'O código da região deve ser no máximo 4.'),
    descricao: yup
        .string()
        .required('O campo descrição é obrigatório.')
});

// Middleware para validar o corpo da requisição
function validarRegiao(req, res, next) {
    schema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => res.status(400).json({
            mensagem: 'Erro na validação dos campos!',
            erro: err.errors
        }));
}

module.exports = {
    validarRegiao
};
