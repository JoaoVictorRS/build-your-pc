import * as Yup from 'yup'

const EnderecoValidator = Yup.object().shape({
  enderecos: Yup.array().of(
    Yup.object().shape({
      cep: Yup.string()
        .matches(/^\d{5}-\d{3}$/, "CEP inválido")
        .required("CEP é obrigatório"),
      logradouro: Yup.string().required("Logradouro é obrigatório"),
      cidade: Yup.string().required("Cidade é obrigatória"),
      estado: Yup.string().required("Estado é obrigatório"),
      casa: Yup.string()
        .matches(/^[0-9]*$/, "Número inválido")
        .required("Número é obrigatório"),
      complemento: Yup.string().notRequired(),
    })
  ),
});

export default EnderecoValidator