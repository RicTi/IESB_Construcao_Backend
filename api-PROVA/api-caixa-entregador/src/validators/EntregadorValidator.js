const yup = require('yup');

// Esquema de validação para o entregador
const schema = yup.object().shape({
    nome: yup
        .string("Campo nome precisa ser um texto!")
        .required("Campo nome é obrigatório!"),
    veiculo: yup
        .string("Campo veículo precisa ser um texto!")
        .required("Campo veículo é obrigatório!"),
    placaVeiculo: yup
        .string("Campo placa do veículo precisa ser um texto!")
        .required("Campo placa do veículo é obrigatório!")
        // Validação de formato da placa (exemplo: ABC1234)
        .matches(/^[A-Z]{3}\d{4}$/, "Formato da placa do veículo deve ser ABC1234"),
    funcionario: yup
        .string("Campo funcionário precisa ser um texto!")
        .matches(/^[0-9a-fA-F]{24}$/, "ID do funcionário deve ser um ObjectId válido")
        .optional()
});

// Middleware para validar entregador
function validarEntregador(req, res, next) {
    schema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => res.status(400).json({
            mensagem: "Erro na validação dos campos!",
            erro: err.errors
        }));
}

module.exports = {
    validarEntregador
};
