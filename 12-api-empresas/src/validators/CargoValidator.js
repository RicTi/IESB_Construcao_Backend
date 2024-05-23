// AQUI DENTRO SERÁ CONSTRUÍDO TODO O SCHEMA DE VALIDAÇÃO DE CARGO.
const yup = require('yup')

const schema = yup.object().shape(
    {
        nome: yup
        .string("Campo nome precisa ser um texto.")
        .required("Campo nome é obrigatório."),         // verifica se é uma string e se é obrigatório...
        descricao: yup.string(),
        salario: yup.number().min(1412).required()
    }
)

function validarCargo(req, res, next) {
    
    schema
    .validate(req.body, {abortEarly: false})
    .then(() => next())
    .catch(err => res.status(400).json())
}

module.exports = {
    validarCargo
}
