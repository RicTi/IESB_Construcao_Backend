const yup = require('yup');

// Definição do esquema de validação para a comissão
const comissaoSchema = yup.object().shape({
    descricao: yup
        .string()
        .nullable()
        .optional()
        .max(255, "A descrição não pode ter mais de 255 caracteres."),
    dataFechamento: yup
        .date()
        .default(() => new Date())
        .required("O campo data de fechamento é obrigatório!"),
    totalEntregas: yup
        .string()
        .required("O campo total de entregas é obrigatório!")
        .matches(/^\d+$/, "O total de entregas deve ser um número válido em formato string."),
    taxaRegiao: yup
        .number()
        .required("O campo taxa de região é obrigatório!")
        .positive("A taxa de região deve ser um número positivo."),
    taxaEntrega: yup
        .number()
        .required("O campo taxa de entrega é obrigatório!")
        .positive("A taxa de entrega deve ser um número positivo."),
    totalComissao: yup
        .number()
        .required("O campo total de comissão é obrigatório!")
        .positive("O total de comissão deve ser um número positivo."),
    entregador: yup
        .string()
        .required("O campo entregador é obrigatório!")
        .test("is-valid-object-id", "ID de entregador inválido!", value => {
            return /^[0-9a-fA-F]{24}$/.test(value);
        })
});

// Função para validar os dados de comissão usando o esquema definido
async function validarComissao(req, res, next) {
    try {
        await comissaoSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        res.status(400).json({
            mensagem: "Erro de validação dos dados fornecidos.",
            erros: err.inner.map(error => ({
                campo: error.path,
                mensagem: error.message
            }))
        });
    }
}

module.exports = {
    validarComissao
};
