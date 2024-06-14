const yup = require('yup');

// Definição do esquema de validação para o funcionário
const schema = yup.object().shape({
    nome: yup
        .string("O campo nome precisa ser um texto.")
        .required("O campo nome é obrigatório."),
    cpf: yup
        .string("O campo CPF precisa ser um texto.")
        .required("O campo CPF é obrigatório.")
        .matches(/^\d{11}$/, "O CPF deve conter 11 dígitos numéricos."),
    telefone: yup
        .string("O campo telefone precisa ser um texto.")
        .required("O campo telefone é obrigatório.")
        .matches(/^\d{10,11}$/, "O telefone deve conter entre 10 e 11 dígitos numéricos."),
    email: yup
        .string("O campo email precisa ser um texto.")
        .required("O campo email é obrigatório.")
        .email("O campo email deve conter um endereço de email válido."),
    dataNascimento: yup
        .string("O campo data de nascimento precisa ser um texto.")
        .required("O campo data de nascimento é obrigatório.")
        .matches(/^\d{2} \d{2} \d{4}$/, "O campo data de nascimento deve estar no formato DD-MM-AAAA."),
    dataContratacao: yup
        .date("O campo data de contratação precisa ser uma data válida.")
        .required("O campo data de contratação é obrigatório."),
    cargo: yup
        .string("O campo cargo precisa ser um texto.")
        .required("O campo cargo é obrigatório.")
        .matches(/^[a-fA-F0-9]{24}$/, "O campo cargo deve ser um ObjectId válido.")
});

// Middleware para validar os dados do funcionário
function validarFuncionario(req, res, next) {
    schema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => res.status(400).json({
            mensagem: "Erro na validação dos campos!",
            erros: err.errors
        }));
}

module.exports = {
    validarFuncionario
};
