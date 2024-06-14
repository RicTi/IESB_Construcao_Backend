const yup = require('yup')

// Schema de validação
const registroSchema = yup.object().shape({
    nome: yup
        .string("Campo precisa ser um texto")
        .required("Campo obrigatório"),
    email: yup
        .string("Campo precisa ser um texto")
        .email("E-mail inválido")
        .required("Campo obrigatório"),
    senha: yup
        .string("Campo precisa ser um texto")
        .required("Campo obrigatório"),
});

// Função para validar registro
function validarUsuario(req, res, next) {
    registroSchema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const erros = err.inner.map(e => ({
                campo: e.path,
                erros: e.errors
            }));
            res.status(400).json({
                mensagem: "Falha na validação dos campos",
                erros
            });
        });
}

// Schema de validação para login
const loginSchema = yup.object().shape({
    email: yup
        .string("Campo precisa ser um texto")
        .email("E-mail inválido")
        .required("Campo obrigatório"),
    senha: yup
        .string("Campo precisa ser um texto")
        .required("Campo obrigatório"),
});

// Função para validar login
function validarLogin(req, res, next) {
    loginSchema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const erros = err.inner.map(e => ({
                campo: e.path,
                erros: e.errors
            }));
            res.status(400).json({
                mensagem: "Falha na validação dos campos",
                erros
            });
        });
}

module.exports = {
    validarUsuario,
    validarLogin
}
