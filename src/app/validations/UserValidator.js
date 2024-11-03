import * as Yup from 'yup'

const UserValidator = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .required("CPF é obrigatório"),
  imagem_perfil: Yup.string().url("URL da imagem inválida").notRequired(),
});

export default UserValidator