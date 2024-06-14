const yup = require('yup');

// Definição do esquema de validação para o cargo
const schema = yup.object().shape({
    nome: yup
        .string("O campo nome precisa ser um texto.")
        .required("O campo nome é obrigatório."),
    descricao: yup
        .string("O campo descrição precisa ser um texto.")
        .nullable(true),
    salarioBase: yup
        .number("O campo salário base precisa ser numérico.")
        .required("O campo salário base é obrigatório.")
        .positive("O campo salário base deve ser um valor positivo.")
});

// Middleware para validar os dados do cargo
function validarCargo(req, res, next) {
    schema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => res.status(400).json({
            mensagem: "Erro na validação dos campos!",
            erros: err.errors
        }));
}

module.exports = {
    validarCargo
};
