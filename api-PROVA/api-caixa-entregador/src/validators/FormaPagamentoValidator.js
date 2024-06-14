const yup = require('yup');

// Definição do esquema de validação com yup
const schema = yup.object().shape({
    formaPagamento: yup
        .string("O campo forma de pagamento precisa ser um texto!")
        .required("O campo forma de pagamento é obrigatório!")
        .min(2, "A forma de pagamento deve ter pelo menos 2 caracteres!")
        .max(50, "A forma de pagamento deve ter no máximo 50 caracteres!"),
    
    descricao: yup
        .string("O campo descrição precisa ser um texto!")
        .notRequired() // Não é obrigatório
        .max(200, "A descrição deve ter no máximo 200 caracteres!")
});

// Função de middleware para validação
function validarFormaPagamento(req, res, next) {
    schema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch((err) => {
            const erros = err.inner.map((e) => ({
                campo: e.path,
                mensagem: e.message
            }));
            res.status(400).json({
                mensagem: "Erro de validação dos dados fornecidos.",
                erros: erros
            });
        });
}

module.exports = {
    validarFormaPagamento
};
