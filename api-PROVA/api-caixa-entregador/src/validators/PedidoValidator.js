const yup = require('yup')

const schema = yup.object().shape(
    {
        numeroPedido: yup
            .string("Campo número do pedido precisa ser um texto!")
            .required("Campo número do pedido é obrigatório!"),
        regiaoPedido: yup
            .string("Campo área do pedido precisa ser um texto")
            .required("O campo região do pedido vai de 1 a 4 e é obrigatório!")
            .min(1)
            .max(5),
        formaPagamento: yup
            .string("O campo forma de pagamento precisa ser um texto!")
            .required("Campo forma de pagamento é obrigatório!"),
        valorPedido: yup
            .number("Campo valor do pedido precisa ser numérico")
            .required("Campo valor do pedido é obrigatório!")
    }
)

function validarPedido(req, res, next) {
    schema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => res.status(400).json(
            {
                mensagem: "Erro na validação dos campos!",
                erro: err.errors
            }
        ))
}

module.exports = {
    validarPedido
}