import * as Yup from 'yup';

const CadastroValidator = Yup.object().shape({
  nome: Yup.string()
  .min(4,'Nome Curto')
  .max(64, 'Nome muito grande (máximo de 64 letras)')
  .required('Nome é obrigatório'),
  cpf: Yup.string()
  .required('É necessário um CPF'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

export default CadastroValidator